// connect mongodb
var mongoose = require('mongoose');

var database = {};

var TAG='[database]';

database.init = function(app, config){
    console.log(TAG+'init()');
    connect(app, config);
};

function connect(app, config){
    console.log(TAG+'connect()');
    
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db_url);
    database.db =mongoose.connection;

    database.db.on('error', console.error.bind(console,TAG+'mongoose connection error'));
    database.db.on('open', function(){
        console.log(TAG+'database is connected : '+config.db_url);

        // config에 등록된 스키마 및 모델 객체 생성
        createSchema(app,config);
    });
    database.db.on('disconnected',function(){
        console.log(TAG+'database is disconnected');
        console.log(TAG+'try connectiong database.. : '+config.db_url);
        connect(app,config);
    });
};

function createSchema(app, config){
    var schemaLen = config.db_schemas.length;
    console.log(TAG+'number of setted schema : %d',schemaLen);
    
    for(var i=0;i<schemaLen;i++){
        /**
         * db_schemas: [
	     * {file:'./user_schema', collection:'users5', schemaName:'UserSchema', modelName:'UserModel'}	],
         */
        var curItem = config.db_schemas[i];
        console.log(TAG+'curItem=');
        console.dir(curItem);

        var curSchema = require(curItem.file).createSchema(mongoose);
        console.log(TAG+'collection is defined : %s',curItem.collection);
        //console.log(TAG+'curSchema=');
        //console.dir(curSchema);

        //User model 정의  
        var curModel = mongoose.model(curItem.collection, curSchema);

        // curItem.file 불러와서 createSchema 함수를 통해 스키마생성
        var curSchema = require(curItem.file).createSchema(mongoose);
        console.log(TAG+"%s module is called and set schema", curItem.file);
        
        database[curItem.schemaName] = curSchema;
        database[curItem.modelName] = curModel;

        console.log('Schema Name=[%s], ModelName=[%s] is setted in database attribution', curItem.schemaName, curItem.modelName);
    }

    app.set('database',database);
    console.log(TAG+ 'database is setted in app');
}

// database 객체를 module.exports에 할당
module.exports = database;