// cambie var por const
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// comentario de coco

const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const memesRouter = require('./routes/memesRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// En esta linea tuve que agregar ../ ya que al mover todo a src, public queda un nivel arriba de donde esta app.js
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
// Agrego el enrutador de productos en productsRouter
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/memes', memesRouter);

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
