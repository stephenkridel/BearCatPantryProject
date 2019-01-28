var express = require( 'express' );

var router = express.Router();

router.get( '/home', function( req, res, next ) {
    res.render( "home", {
        title: "Bearcat Pantry - Home"
    } );
} );

router.get( '/', function( req, res ) {
    res.render( "home", {
        title: "Bearcat Pantry - Home"
    } );
} );

module.exports = router;