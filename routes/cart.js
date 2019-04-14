var express = require( 'express' );
var cart = require( '../models/cartModel' );
var order = require( '../models/orderModel' );
var item = require( '../models/itemModel' );
var nodemailer = require( 'nodemailer' );
var _ = require( 'lodash' );
var QRCode = require( 'qrcode' );
var util = require( '../src/javascript/util.js' );

var router = express.Router();
var globalCart;


function isUser( req, res, next ) {
    // Check if the user has authentication to see this page
    if ( req.cookies.userId != null ) {
        return next();
    }
    // Else redirect to home
    res.redirect( '/login' );
}

router.get( '/cart',isUser, function( req, res, next ) {
    cart.find( {
        "user": req.cookies.userId
    }, 'items', function( err, cart ) {
        if ( cart && cart.length > 0 ) {
            _.forEach( cart[ 0 ].items, function( item ) {
                item.itemName = item.itemName.replace(/_/g, " "); // uiValue
            } );
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

router.get( '/totalCartItems', isUser, function( req, res, next ) {
    cart.find( {
        "user": req.cookies.userId
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

router.post( '/updateCartItemQuantities',isUser, function( req, res, next ) {
    cart.countDocuments( {
        user: req.cookies.userId
    }, function( err, count ) {
        // Find out if a user already has a cart in mongoDB
        if ( count > 0 ) {
            // Find out if the current user's cart already has the selected item in the cart.
            cart.countDocuments( {
                "user": req.cookies.userId,
                "items.itemName": req.body.itemName,
            }, function( err, count ) {
                // If item doesnt exist in the cart, push it on
                if ( count === 0 ) {
                    // push new item to cart
                    cart.update( {
                        "user": req.cookies.userId
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
                            "user": req.cookies.userId,
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
                user: req.cookies.userId,
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

router.post( '/removeItemFromCart',isUser, function( req, res, next ) {
    cart.update( {
        "user": req.cookies.userId
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

router.get( '/validateOrder', isUser, function( req, res, next ) {
    cart.find( {
        "user": req.cookies.userId
    }, 'items', function( err, cart ) {
        var itemsToFind = [];
        globalCart = cart[ 0 ];
        _.forEach( globalCart.items, function( iteratedItem ) {
            itemsToFind.push(
                iteratedItem.itemName
            )
        } );
        item.find( {
            'itemName': {
                $in: itemsToFind
            }
        }, 'itemName quantity', function( err, foundItems ) {
            var errorsFound = [];
            _.forEach( foundItems, function( iteratedItem ) {
                var itemInCart = globalCart.items.find( function( element ) {
                    return element.itemName === iteratedItem.itemName;
                } );
                if ( itemInCart.quantity > iteratedItem.quantity || itemInCart.quantity < 1 ) {
                    errorsFound.push( `${itemInCart.itemName} in your cart: ${itemInCart.quantity}. Amount available: ${iteratedItem.quantity}` )
                }
            } );
            if ( errorsFound.length > 0 ) {
                res.status( 500 ).send( errorsFound )
            } else {
                res.sendStatus( 200 );
            }
        } );
    } )
} );

router.post( '/createNewOrder', isUser, function( req, res, next ) {
    cart.find( {
        "user": req.cookies.userId
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
                _.forEach( itemsInCart, function( item ) {
                    item.itemName = item.itemName.replace(/_/g, " "); // uiValue
                } );
                for ( var i = 0; i < itemsInCart.length; i++ ) {
                    orderDetails += `${itemsInCart[i].itemName} - ${itemsInCart[i].quantity}<br>`;
                }
                var final = `<br>Come to the Pantry to pick up your order as soon as possible. Present the QRCode below upon arrival.<br> The Pantry is located in Stratford Heights Building 16 Rm 007. If you have questions regarding directions or procedures, you may call 513-556-5064 or 556-3780 to speak with a respresentative regarding directions or procedures.<br><br> Please consider taking this survery to help improve the pantry:<br>${process.env.SURVEY_LINK} <br><br>Thanks,<br>The Bearcat Pantry Team`
                var message = greeting + orderDetails + final;

                // Create a QRCode with the username as it's data
                QRCode.toDataURL( req.cookies.userEmail, function( err, url ) {
                    var html = `<p>${message}</p><br><img src='${url}' height='232px' width='232px'></img>`;
                    var subject = `${req.cookies.userEmail}'s Bearcat Pantry Order`
                    // Send to 6+2 email! TODO
                    util.sendEmail( res, nodemailer, req.cookies.userEmail, subject, html );
                } )
            } )
            .catch( err => {
                res.status( 400 ).send( "unable to save to database" );
            } );


        // Take away that many items from itmes quantity
    } )
} );

// Empty out a user's cart
router.post( '/clearCart', isUser, function( req, res, next ) {
    cart.update( {
        "user": req.cookies.userId
    }, {
        $set: {
            "items": []
        }
    } ).then( () => {
        res.sendStatus( 200 );
    } )
} );


router.post( '/cancelOrder', isUser, function( req, res, next ) {
    cart.update( {
        "user": req.cookies.userId
    }, {
        $set: {
            "status": 0
        }
    } ).then( () => {
        res.sendStatus( 200 );
    } )
} );

module.exports = router;