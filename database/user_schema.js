var crypro = require('crypto');

var Schema = {};

var TAG = '[user_schema]';

Schema.createSchema = function(mongoose){

    var UserSchema = mongoose.Schema({
        email:{type: String, 'default':''}
        , hashed_password: {type: String, require: true, 'default':''}
        , name: {type: String, index: 'hashed', 'default':''}
        , salt: {type: String, required: true}
        , created_at: {type: Date, index: {unique:false}, 'default':Date.now}
        , updated_at: {type: Date, index: {unique:false}, 'default':Date.now}
    });

    UserSchema.virtual('password').set(function(password){
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
        console.log(TAG+'virtual passwod is called : ' + this.hashed_password);
    }).get(function() { return this._password });

	// 스키마에 모델 인스턴스에서 사용할 수 있는 메소드 추가
	// 비밀번호 암호화 메소드
    UserSchema.method('encryptPassword',  function(plainText, inSalt){
        console.log(TAG+'encryptPassword : plainText=%s insSalt=%s',plainText,inSalt);

        if(inSalt){
            return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
        }else{
            return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
        }
    });

    UserSchema.method('makeSalt',function(){
        return Math.round( (new Date().valueOf() * Math.random())) + '';
    });

    UserSchema.method('authenticate', function(plainText, inSalt, hashed_password){

        if (inSalt) {
            console.log(TAG+'authenticate : plainText, this.encryptPassword(plainText, inSalt), hashed_password');
			console.log(TAG+'authenticate : %s -> %s : %s', plainText, this.encryptPassword(plainText, inSalt), hashed_password);
			return this.encryptPassword(plainText, inSalt) === hashed_password;
		} else {
			console.log(TAG+'authenticate : %s -> %s : %s', plainText, this.encryptPassword(plainText), this.hashed_password);
            return this.encryptPassword(plainText) === this.hashed_password;
        }
    });

    var validatePresenceOf = function(value){
        console.log(TAG+'valudatePresenceOf value='+value);
        return value && value.length;
    };

    UserSchema.pre('save', function(next){
        if(!this.isNew) return next();

        if(!validatePresenceOf(this.password)){
            next(new Error('유효하지 않은 password'));
        }else{
            next();
        }
    })
	// 입력된 칼럼의 값이 있는지 확인
	UserSchema.path('email').validate(function (email) {
		return email.length;
	}, 'email 칼럼의 값이 없습니다.');
	
	UserSchema.path('hashed_password').validate(function (hashed_password) {
		return hashed_password.length;
	}, 'hashed_password 칼럼의 값이 없습니다.');
	
	
	// 모델 객체에서 사용할 수 있는 메소드 정의
	UserSchema.static('findByEmail', function(email, callback) {
		return this.find({email:email}, callback);
	});
	
	UserSchema.static('findAll', function(callback) {
		return this.find({}, callback);
	});
	
	console.log(TAG+'UserSchema 정의함.');

	return UserSchema;
};

// module.exports에 UserSchema 객체 직접 할당
module.exports = Schema;