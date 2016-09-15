var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var mongodb       = require('mongodb');
var mongoskin     = require('mongoskin');
var config        = require('./config.json');



if (config && config.database) {
  dbHostName    = config.database.default.host;
  dbPortNumber  = config.database.default.port;
  dbName        = config.database.default.name;
} else {
  dbHostName    = 'localhost';
  dbPortNumber  = 27017;
  dbName        = 'mongoapi';
}
var db              = mongoskin.db('mongodb://'+dbHostName+':'+dbPortNumber+'/'+dbName, {native_parser:true});

var api             = require('./routes/api');

var app = express();

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

app.use(function(req, res, next){
  req.db = db;
  next();
});


app.use('/api/*', api);


// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error:err

    });

  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;