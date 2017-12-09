'use strict';

const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
// const electron     = require('electron');
require('dotenv').config();

const index         = require('./routes/index');
const ip_checker    = require('./routes/ip_checker');
const fb_listener   = require('./routes/fb_listener');
const tw_listener   = require('./routes/tw_listener');
const line_listener = require('./routes/line_listener');
const request     = require('./routes/request');

const app = express();

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
app.use('/ip_checker',  ip_checker);
app.use('/fb_listener', fb_listener);
app.use('/tw_listener', tw_listener);
app.use('/line_listener', line_listener);
app.use('/request', request);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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

app.listen(3000, "127.0.0.1");

/*
electron.app.on("ready", function () {
  var main = new electron.BrowserWindow({width: 800, height: 600});
  main.on("closed", electron.app.quit);
  main.webContents.openDevTools();
  main.loadURL("http://127.0.0.1:3000/");
});
*/

module.exports = app;
