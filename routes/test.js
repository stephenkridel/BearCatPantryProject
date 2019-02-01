var express = require( 'express' );

var router = express.Router();

router.get( '/test', function( req, res, next ) {
    const username = process.env.USERNAME;
    console.log( username );
    res.render( "test", {title: "Bearcat Pantry - testing page"} );
} );

module.exports = router;