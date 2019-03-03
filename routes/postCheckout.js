var express = require( 'express' );

var router = express.Router();

router.get( '/postCheckout', function( req, res, next ) {
    res.render( "postCheckout", {
        title: "Post Checkout - Bearcat Pantry"
    } );
} );

module.exports = router;