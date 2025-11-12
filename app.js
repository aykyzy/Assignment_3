//main server entry point for the app
//sets up express, mongo, middleware as well as routes

//standard requries
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//loading environemnt table
require('dotenv').config();

//connecting to mongo
const connectDB = require('./config/db');
connectDB();

//routers
var indexRouter = require('./routes/index');
var recipesRouter = require('./routes/recipes');

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

//route handlers
app.use('/', indexRouter);
app.use('/recipes', recipesRouter);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//error handler
app.use(function(err, req, res, next) {
    //setting locals, only getting error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    //rendering error page
    res.status(err.status || 500);
    res.render('error', {title:'Error'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Recipe Manager is running at http://localhost:${PORT}`);
});

module.exports = app;
