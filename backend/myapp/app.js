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
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// basic routing taste
app.get('/about', function (req, res) {
  res.send('We are Team 9')
})

// display couchdb views
// TODO: display the the minPriceCounter to webpage
async function getData(){
  var minPriceViewer = require('./couchdb/couchdb_views/create_views')
  var minPriceCounter = await minPriceViewer().then(res => {
    console.log('res',res);
    console.log('在promise中')
    return res;
  })
    .catch(err => {
      console.log(err);
    })
  console.log(minPriceCounter, 'hello');
  return minPriceCounter;
}


app.get('/couchdb', function (req, res) {
  getData().then(minPriceCounter => {
    console.log('minPriceCounter', minPriceCounter);
    res.send('There are ' + minPriceCounter + 'records')
  }).catch(err => {
    console.log(err);
  });
})

// initialise couchdb 
/* var initCouch = require('./couchdb/init_couch');
initCouch(function(err) {  
  if (err) {
    throw err
  }
  else {
    console.log('Couchdb initialized');
  }
}); */


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
