var express = require( 'express' );
var cart = require( '../models/cartModel' );

var router = express.Router();

function isAuthenticated( req, res, next ) {
    // Check if the user has authentication to see this page
    if ( req.cookies.isAdmin === "true" ) {
        return next();
    }
    // Else redirect to home
    res.redirect( '/' );
}

router.get( '/admin', isAuthenticated, function( req, res, next ) {
    res.render( "admin", {
        title: "Admin - Bearcat Pantry"
    } );
} );

router.get( '/admin/orders', isAuthenticated, ( req, res, next ) => {
    // Get all carts with a status of '1' which means they have checkouted
    cart.find( {
        "status": 1
    }, 'user items lastModDate', function( err, carts ) {
        if ( carts && carts.length > 0 ) {
            res.render( 'orders', {
                carts: carts,
                title: "Active Orders - Bearcat Pantry",
            } );
        }
    } )
} );

module.exports = router;