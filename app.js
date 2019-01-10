var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
let handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var helmet = require('helmet');

// Testing Adam Kowalski
var session=require('express-session');
var passsport=require('passport');
var ExpressValidator=require('express-validator');
var LocalStratergy=require('passport-local');
var multer=require('multer');
var upload=multer({dest:'./upload'});
var flash=require('connect-flash');
var mongo=require('mongodb');
var db=mongoose.connection;


// Routes
var itemsRouter = require('./routes/items');
var aboutRouter = require('./routes/about');
var registerRouter = require('./routes/register');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://bearcatAdmin:ferrari275@bearcatpantry-ahnj6.mongodb.net/test?retryWrites=true", {
  useNewUrlParser: true
}).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
  err => { console.log(err) }
);

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.engine('hbs', handlebars({
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  defaultLayout: 'layout.hbs',
  partialsDir: [path.join(__dirname, 'views')]
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

//Handle Sessions by Kowalski

app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));
//Passport authentication system by Kowalski
app.use(passsport.initialize());
app.use(passsport.session());
//validator by Kowalski
app.use(ExpressValidator({
  errorFormatter:function(param, msg, value){
    var namespace=param.split('.'), 
    root=namespace.shift(),
    formParam=root;
    while(namespace.length){
      formParam+='['+namespace.shift()+']';
    }
    return{
      param:formParam,
      msg:msg,
      value:value
    };
  }
}));
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// setup the routes
app.use('/', itemsRouter);
app.use('/', aboutRouter);
app.use('/', registerRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;