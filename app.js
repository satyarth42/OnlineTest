var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var socket_io    = require( 'socket.io' );
var mongoose = require('mongoose');
var crypto = require('crypto');

mongoose.connect('mongodb://127.0.0.1:27017/quiz');
var userdata = require('./models/userdata');

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/dmnpnl');

var app = express();
var io = socket_io();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection',function(socket){

  socket.on('start_test', function () {
      socket.broadcast.emit('startTest');
  });
  socket.on('stop_test',function () {
      socket.broadcast.emit('stop_test');
  });
  socket.on('submission',function (data) {
    console.log(data);
      if(data.user){
          var candidate = new userdata({
              "name":data.user.uname,
              "roll":data.user.roll,
              "contact":data.user.contact,
              "email":data.user.mail,
              "answers":data.answers,
              "score":0
          });
          candidate.save(function (err, updated) {
              if (err) console.log(err);
          });
      }
  });
  socket.on('disconnect',function(){
    console.log("user disconnected");
  });
});

module.exports = app;
