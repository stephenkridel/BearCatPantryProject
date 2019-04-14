var express = require( 'express' );
var cart = require( '../models/cartModel' );
var order = require( '../models/orderModel' );

var router = express.Router();

function isUser( req, res, next ) {
    if ( req.cookies.userId ) {
        return next();
    }

    res.redirect( '/login' );
}

router.get( '/admin', isUser, function( req, res, next ) {
    res.render( "admin", {
        title: "Admin - Bearcat Pantry"
    } );
} );

router.get( '/admin/carts', isUser, ( req, res, next ) => {
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

router.get( '/admin/orders', isUser, ( req, res, next ) => {
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