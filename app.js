var createError = require( 'http-errors' );
var express = require( 'express' );
var path = require( 'path' );
var cookieParser = require( 'cookie-parser' );
var logger = require( 'morgan' );
var mongoose = require( "mongoose" );
let handlebars = require( 'express-handlebars' );
var bodyParser = require( 'body-parser' );
var helmet = require( 'helmet' );
var compression = require( 'compression' );
var dotenv = require( 'dotenv' ).config();

var webpack = require( 'webpack' );
var webpackConfig = require( './webpack.config' );
var compiler = webpack( webpackConfig );


// Routes
var itemsRouter = require( './routes/items' );
var aboutRouter = require( './routes/about' );
var cartRouter = require( './routes/cart' );
var homeRouter = require( './routes/home' );
var testRouter = require( './routes/test' );
var adminRouter = require( './routes/admin' );
var postCheckoutRouter = require( './routes/postCheckout' );


var app = express();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
    extended: true
} ) );

app.use( require( "webpack-dev-middleware" )( compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
} ) );

mongoose.Promise = global.Promise;
mongoose.connect( `mongodb+srv://bearcatAdmin:${process.env.DB_PW}@bearcatpantry-ahnj6.mongodb.net/Pantry?retryWrites=true`, {
    useNewUrlParser: true
} ).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    },
    err => {
        console.log( err )
    }
);

// view engine setup
app.set( 'views', path.join( __dirname, '/views' ) );
var hbsObj = handlebars.create({
    helpers: {
        hasBarcode: function(barcode, options){
            if (barcode != -99999999999){
                return options.fn();
            }
            else{
                return options.inverse();
            }
        }
    },
    extname: 'hbs',
    layoutsDir: path.join( __dirname, 'views', 'layouts' ),
    defaultLayout: 'layout.hbs',
    partialsDir: [ path.join( __dirname, 'views' ) ]
});
app.engine( 'hbs', hbsObj.engine );
app.set( 'view engine', 'hbs' );

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( {
    extended: false
} ) );

app.use( cookieParser() );


app.use( helmet() );
app.use( compression() );   
app.use( express.static( path.join( __dirname, 'build' ) ) );

// This is where we would set cookies on login?
// This sets a cookie everytime you route. As route definition order matters. 
// Will need to be refactored once login works
app.use( function( req, res, next ) {
    if ( process.env.USERNAME === 'admin' || process.env.USERNAME === 'kump' ) {
        res.cookie( 'isAdmin', true );
    } else {
        res.clearCookie( "isAdmin" );
    }

    next();
} );


// setup the routes
app.use( '/', itemsRouter );
app.use( '/', aboutRouter );
app.use( '/', cartRouter );
app.use( '/', homeRouter );
app.use( '/', testRouter );
app.use( '/', adminRouter );
app.use( '/', postCheckoutRouter );


// catch 404 and forward to error handler
app.use( function( req, res, next ) {
    next( createError( 404 ) );
} );

// error handler
app.use( function( err, req, res, next ) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

    // render the error page
    res.status( err.status || 500 );
    res.render( 'error' );
} );

module.exports = app;