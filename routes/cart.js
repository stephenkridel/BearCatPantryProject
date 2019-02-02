var express = require( 'express' );
var cart = require( '../models/cartModel' );
var _ = require( 'lodash' );


var router = express.Router();

router.get( '/cart', function( req, res, next ) {
    cart.find( {
        "user": process.env.USERNAME
    }, 'items', function( err, itemInCart ) {
        if ( itemInCart && itemInCart.length > 0 ) {
            res.render( 'cart', {
                itemInCart: itemInCart[ 0 ].items,
                title: "Shopping Cart - Bearcat Pantry"

            } );
        } else {
            res.render( 'cart', {
                title: "Shopping Cart - Bearcat Pantry"
            } );
        }

    } )
} );

router.get( '/totalCartItems', function( req, res, next ) {
    cart.find( {
        "user": process.env.USERNAME
    }, 'items', function( err, itemInCart ) {
        var totalQuantity = 0;
        if ( itemInCart && itemInCart.length > 0 ) {
            _.forEach( itemInCart[ 0 ].items, function( item ) {
                totalQuantity += item.quantity;
            } );
        }

        var ret = {
            totalQuantity: totalQuantity
        }

        res.json( ret );
    } )
} );

router.post( '/updateCartItemQuantities', function( req, res, next ) {
    // Use a cookie to get user info & should probs auto create a cart for every user upon initial login or something
    cart.countDocuments( {
        user: process.env.USERNAME
    }, function( err, count ) {
        // Find out if a user already has a cart in mongoDB
        if ( count > 0 ) {
            // Find out if the current user's cart already has the selected item in the cart.
            cart.countDocuments( {
                "user": process.env.USERNAME,
                "items.itemName": req.body.itemName,
            }, function( err, count ) {
                // If item doesnt exist in the cart, push it on
                if ( count === 0 ) {
                    // push new item to cart
                    cart.update( {
                        "user": process.env.USERNAME
                    }, {
                        "$push": {
                            items: {
                                'itemName': req.body.itemName,
                                'quantity': 1,
                            }
                        }
                    } ).then( item => {
                        res.sendStatus( 200 );
                    } )
                } else {
                    // else, update existing shopping cart item to increment 1 time
                    cart.findOneAndUpdate( {
                            "user": process.env.USERNAME,
                        }, {
                            $set: {
                                "items.$[elem].quantity": req.body.quantity
                            }
                        }, {
                            upsert: true,
                            arrayFilters: [ {
                                "elem.itemName": {
                                    $eq: req.body.itemName
                                }
                            } ]
                        } )
                        .then( item => {
                            res.sendStatus( 200 );
                        } )
                }
            } )

        } else {
            // Else, initialize a cart for the new user, and add the item
            var myData = new cart( {
                user: process.env.USERNAME,
                items: [ {
                    itemName: req.body.itemName,
                    quantity: 1
                } ],
                status: 0
            } );
            myData.save()
                .then( item => {
                    res.sendStatus( 200 );
                } )
                .catch( err => {
                    res.status( 400 ).send( "unable to save to database" );
                } );
        }
    } );
} );

router.post( '/removeItemFromCart', function( req, res, next ) {
    cart.deleteOne( {
            "user": process.env.USERNAME,
            'itemName': req.body.itemName
        }, function( err, obj ) {} )
        .then( item => {
            res.sendStatus( 200 );
        } )
} );

module.exports = router;