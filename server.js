// FOR SERVER 
var express = require('express')
, http = require('http')
, path = require('path');

var bodyParser = require('body-parser')
, cookieParser = require('cookie-parser')
, errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

var app = express();

// 모듈로 분리한 설정 파일 불러오기
var config = require('./config');

var TAG = '[server]';
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
// extended:false URL-encoded를 querystring 모듈로 쿼리스트링을 해석
// extended:true 이면 qs모듈 사용(querystring 모듈의 기능을 확장한 외장모듈)
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// cookie-parser 설정
//app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));

// 모듈로 분리한 데이터베이스 파일 불러오기
//var database = require('./database/database');



app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
var serveStatic = require("serve-static");

app.use(serveStatic(path.join(__dirname, '/dist')));



/**
 * Create HTTP server.
 */

// 시작된 서버 객체를 리턴받도록 합니다. 
var server = http.createServer(app).listen(process.env.PORT || app.get('port'), function(){
	console.log(TAG+'server start. port : ' + app.get('port'));

	// 데이터베이스 초기화
	//database.init(app,config);
   
});

var io = require('socket.io')(server,{
  pingTimeout: 1000,
});

/////////////////////////
io.on('connection', function(socket){

  // 클라이언트로부터의 메시지가 수신되면
  socket.on('chat', function(data) {
    //var console = require('console')
    console.log(TAG+'Message from %s: %s', data.name, data.msg);

    var msg = {
      from: {
        name: data.name,
      },
      msg: data.msg
    };

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    socket.broadcast.emit('chat', msg);
  });

  socket.on('disconnect', function() {
    console.log(TAG+'user disconnected: ' + socket.name);
  });

});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


/**
 * jongsoo
 * add cors
 */

var cors = require('cors');
app.use(cors);

/**
 * jongsoo
 * Passport
 */

 var passport = require('passport');
 var flash = require('connect-flash');

 app.use(passport.initialize());  //passport init
 app.use(passport.session()); //save user session
 app.use(flash());  //user flash msg


