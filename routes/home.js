var express = require( 'express' );

var router = express.Router();

router.get( '/home', function( req, res, next ) {
    res.render( "home", {
        title: "Home - Bearcat Pantry"
    } );
} );

router.get( '/', function( req, res ) {
    res.render( "home", {
        title: "Home - Bearcat Pantry"
    } );
} );


module.exports = router;