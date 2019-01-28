var express = require( 'express' );
var cart = require( '../models/cartModel' )
var _ = require( 'lodash' );


var router = express.Router();

router.get( '/cart', function( req, res, next ) {
    cart.find( {
        "user": "testUser"
    }, 'items', function( err, itemInCart ) {
        res.render( 'cart', {
            itemInCart: itemInCart[ 0 ].items
        } );
    } )
} );

router.get( '/totalCartItems', function( req, res, next ) {
    cart.find( {
        "user": "testUser"
    }, 'items', function( err, itemInCart ) {
        var totalQuantity = 0;
        _.forEach( itemInCart[ 0 ].items, function( item ) {
            totalQuantity += item.quantity;
        } );
        var ret = {
            totalQuantity: totalQuantity
        }

        res.json( ret );
    } )
} );

module.exports = router;