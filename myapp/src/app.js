// cambie var por const
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const cookieMW = require("./middlewares/cookieMW");
const loggedRenderingMw = require('./middlewares/loggedRenderingMW');

const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const memesRouter = require('./routes/memesRouter');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit:'50mb' }));
app.use(cookieParser());
app.use(session({secret: "Aca va la frase de seguridad"}));
app.use(methodOverride('_method'));
app.use(cookieMW);
app.use(loggedRenderingMw);


// En esta linea tuve que agregar ../ ya que al mover todo a src, public queda un nivel arriba de donde esta app.js
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
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
  res.render('error',{title: "Error"});
});


module.exports = app;
