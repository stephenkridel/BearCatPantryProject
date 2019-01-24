var express = require( 'express' );
var cart = require( '../models/cartModel' )


var router = express.Router();

router.get( '/cart', function( req, res, next ) {
    cart.find( {
        "user": "testUser"
    }, 'items', function( err, itemInCart ) {
        res.render( 'cart', {
            itemInCart: itemInCart[0].items
        } );
    } )
} );

module.exports = router;