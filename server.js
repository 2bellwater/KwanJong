var express = require('express');

var app = express();

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
var serveStatic = require("serve-static");
var path = require('path');

app.use(serveStatic(path.join(__dirname, '/dist')));

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = require('http').createServer(app);
var io = require('socket.io')(server,{
  pingTimeout: 1000,
});

/////////////////////////
io.on('connection', function(socket){

  // 클라이언트로부터의 메시지가 수신되면
  socket.on('chat', function(data) {
    //var console = require('console')
    console.log('Message from %s: %s', data.name, data.msg);

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
    console.log('user disconnected: ' + socket.name);
  });

});
///////////////////////////
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
//server.on('error', onError);
//server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);
  console.log('a');
  
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
