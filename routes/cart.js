var express = require( 'express' );
var cart = require( '../models/cartModel' );
var order = require( '../models/orderModel' );

var nodemailer = require( 'nodemailer' );
var _ = require( 'lodash' );
var QRCode = require( 'qrcode' );
var util = require( '../src/javascript/util.js' );


var router = express.Router();

router.get( '/cart', function( req, res, next ) {
    cart.find( {
        "user": process.env.USERNAME
    }, 'items', function( err, cart ) {
        if ( cart && cart.length > 0 ) {
            res.render( 'cart', {
                itemInCart: cart[ 0 ].items,
                title: "Shopping Cart - Bearcat Pantry",
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
                    } ).then( () => {
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
                        .then( () => {
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
                } ]
            } );
            myData.save()
                .then( () => {
                    res.sendStatus( 200 );
                } )
                .catch( err => {
                    res.status( 400 ).send( "unable to save to database" );
                } );
        }
    } );
} );

router.post( '/removeItemFromCart', function( req, res, next ) {
    cart.update( {
        "user": process.env.USERNAME
    }, {
        $pull: {
            items: {
                itemName: req.body.itemName
            }
        }
    } ).then( () => {
        res.sendStatus( 200 );
    } );
} );

router.post( '/createNewOrder', function( req, res, next ) {
    cart.find( {
        "user": process.env.USERNAME
    }, 'user items', function( err, foundCart ) {
        if ( foundCart && foundCart.length > 1 ) {
            res.status( 400 ).send( "Somehow found 2 carts for this user" );
        }
        // Create a new order schema 
        var usersCart = foundCart[ 0 ];
        var newCart = new order( {
            cart: new cart( usersCart ),
            status: 0,
            creationDate: util.formatDate( new Date() )
        } );
        newCart.save()
            .then( ( order ) => {
                // Send an email to the user the contents of their cart
                var greeting = "Hi. Thank you for your order with the Bearcat Pantry. Your order contains the following items: <br><br>";
                var orderDetails = "";
                var itemsInCart = order.cart.items;
                for ( var i = 0; i < itemsInCart.length; i++ ) {
                    orderDetails += `${itemsInCart[i].itemName} - ${itemsInCart[i].quantity}<br>`;
                }
                var final = "<br>Your order can be found at localhost:3000/cart<br>Please come to the Pantry to pick up your order.<br><br> Thanks,<br>The Bearcat Pantry Team"
                var message = greeting + orderDetails + final;

                // Create a QRCode with the username as it's data
                QRCode.toDataURL( process.env.USERNAME, function( err, url ) {
                    var html = `<p>${message}</p><br><img src='${url}' height='232px' width='232px'></img>`;
                    var subject = `${process.env.USERNAME}'s Bearcat Pantry Order`
                    // Send to 6+2 email! TODO
                    util.sendEmail( res, nodemailer, process.env.EMAIL_TO, subject, html );
                } )
            } )
            .catch( err => {
                res.status( 400 ).send( "unable to save to database" );
            } );


        // Take away that many items from itmes quantity
    } )
} );

// Empty out a user's cart
router.post( '/clearCart', function( req, res, next ) {
    cart.update( {
        "user": process.env.USERNAME
    }, {
        $set: {
            "items": []
        }
    } ).then( () => {
        res.sendStatus( 200 );
    } )
} );


router.post( '/cancelOrder', function( req, res, next ) {
    cart.update( {
        "user": process.env.USERNAME
    }, {
        $set: {
            "status": 0
        }
    } ).then( () => {
        res.sendStatus( 200 );
    } )
} );

module.exports = router;