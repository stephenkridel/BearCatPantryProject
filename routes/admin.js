var express = require( 'express' );
var cart = require( '../models/cartModel' );
var order = require( '../models/orderModel' );

var router = express.Router();

function isAuthenticated( req, res, next ) {
    // Check if the user has authentication to see this page
    if ( req.cookies.isAdmin === "true" ) {
        return next();
    }
    // Else redirect to home
    res.redirect( '/login' );
}

router.get( '/admin', isAuthenticated, function( req, res, next ) {
    res.render( "admin", {
        title: "Admin - Bearcat Pantry"
    } );
} );

router.get( '/admin/carts', isAuthenticated, ( req, res, next ) => {
    cart.find( {}, 'user items', function( err, carts ) {
        if ( carts && carts.length > 0 ) {
            res.render( 'allCarts', {
                carts: carts,
                title: "Active Carts - Bearcat Pantry",
            } );
        } else {
            res.sendStatus( '404' );
        }
    } )
} );

router.get( '/admin/orders', isAuthenticated, ( req, res, next ) => {
    order.find( {}, 'cart status creationDate', function( err, orders ) {
        if ( orders && orders.length > 0 ) {
            res.render( 'allOrders', {
                orders: orders,
                title: "Active Carts - Bearcat Pantry",
            } );
        } else {
            res.sendStatus( '404' );
        }
    } )
} );

module.exports = router;