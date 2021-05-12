var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

async function getData(){
  var propertiesViewer = require('./couchdb/properties_viewer')
  var viewRes = await propertiesViewer().then(res => {
    console.log('res', res);
    return res;
  })
    .catch(err => {
      console.log(err);
    })
  return viewRes;
}

app.get('/couchdb', function (req, res) {
  getData().then(viewRes => {
    console.log('Avg is', viewRes);
    res.send('Avg is ' + viewRes)
  }).catch(err => {
    console.log(err);
  });
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;