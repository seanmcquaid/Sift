var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const foodRouter = require('./routes/food');
const activeRouter = require("./routes/active");
const cultureRouter = require("./routes/culture");
const eventsRouter= require('./routes/events')

var app = express();

const helmet = require('helmet');
app.use((helmet()));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/food', foodRouter);
app.use("/active", activeRouter);
app.use('/events', eventsRouter);
app.use("/culture", cultureRouter);

app.use((req, res)=>{
	res.redirect(`/?route=${req.path}`);
});


module.exports = app;
