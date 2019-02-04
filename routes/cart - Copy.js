var express = require( 'express' );
var cart = require( '../models/cartModel' );
var _ = require( 'lodash' );
var nodemailer = require( 'nodemailer' );
var QRCode = require( 'qrcode' )

var router = express.Router();

router.get( '/cart', function( req, res, next ) {
    cart.find( {
        "user": process.env.USERNAME
    }, 'items status', function( err, cart ) {
        if ( cart && cart.length > 0 ) {
            res.render( 'cart', {
                itemInCart: cart[ 0 ].items,
                title: "Shopping Cart - Bearcat Pantry",
                cartStatus: cart[ 0 ].status
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
        if (itemInCart && itemInCart.length > 0) {
            _.forEach(itemInCart[0].items, function (item) {
                totalQuantity += item.quantity;
            });
        }

        var ret = {
            totalQuantity: totalQuantity
        }

        res.json(ret);
    })
});

router.post( '/updateCartItemQuantities', function( req, res, next ) {
    // Use a cookie to get user info & should probs auto create a cart for every user upon initial login or something
    cart.countDocuments( {
        user: process.env.USERNAME
    }, function( err, count ) {
        // Find out if a user already has a cart in mongoDB
        if (count > 0) {
            // Find out if the current user's cart already has the selected item in the cart.
            cart.countDocuments( {
                "user": process.env.USERNAME,
                "items.itemName": req.body.itemName,
            }, function (err, count) {
                // If item doesnt exist in the cart, push it on
                if (count === 0) {
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
                        }).then(item => {
                            res.sendStatus(200);
                        })
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
                            arrayFilters: [{
                                "elem.itemName": {
                                    $eq: req.body.itemName
                                }
                            }]
                        })
                        .then(item => {
                            res.sendStatus(200);
                        })
                }
            })

        } else {
            // Else, initialize a cart for the new user, and add the item
<<<<<<< HEAD
            var myData = new cart({
                user: "testUser",
                items: [{
                    itemName: req.body.itemName,
                    quantity: 1
                }]
            });
            myData.save()
                .then(item => {
                    res.sendStatus(200);

                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });
        }
    });
});

function IterateCart(userCart) {
    var items = userCart.items;

    for (curItem in items) {
        if (items[curItem].itemName == req.body.itemName) {
            delete (items[curItem])
        }
    }

    cart.save(userCart)

}

router.post('/removeItemFromCart', function (req, res, next) {

    cart.update({ "user": "testUser" }, {
        $pull: {
            items: {
                itemName: req.body.itemName
            }
        }
    }).then(cart => {
        res.sendStatus(200);
    });

});
=======
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

var transporter = nodemailer.createTransport( {
    service: 'gmail',
    auth: {
        user: 'bearcatpantry@gmail.com',
        pass: process.env.EMAIL_PW
    }
} );



// CLEAN ME UP. 
router.post( '/checkout', function( req, res, next ) {
    // checkout ie. change status from 0 -> 1
    // May be better to made an orderModel obj
    cart.updateOne( {
        "user": process.env.USERNAME
    }, {
        $set: {
            "status": 1
        }
    } ).then( () => {
        cart.find( {
            "user": process.env.USERNAME
        }, 'items', function( err, cart ) {
            if ( cart && cart.length > 0 ) {

                var greeting = "Hi. Thank you for your order with the Bearcat Pantry. Your order contains the following items: <br><br>";
                var orderDetails = "";
                _.forEach( cart[ 0 ].items, function( item ) {
                    if ( item ) {
                        orderDetails += `${item.itemName}x${item.quantity}<br>`;
                    }
                } );
                var final = "<br>Your order can be found at localhost:3000/cart<br>Please come to the Pantry to pick up your order.<br><br> Thanks,<br>The Bearcat Pantry Team"
                var message = greeting + orderDetails + final;


                QRCode.toDataURL( process.env.USERNAME, function( err, url ) {
                    var qrHtml = `<p>${message}</p><br><img src='${url}' height='232px' width='232px'></img>`;
                    var mailOptions = {
                        from: 'bearcatpantry@gmail.com',
                        // Get user's email
                        to: 'kumpaw@mail.uc.edu',
                        subject: `${process.env.USERNAME}'s Pantry Order`,
                        html: qrHtml
                    };
                    transporter.sendMail( mailOptions, function( error, info ) {
                        if ( error ) {
                            console.log( error );
                        } else {
                            res.sendStatus( 200 );
                            console.log( 'Order created and email sent: ' + info.response );
                        }
                    } );
                } )

            } else {
                console.log( "failed" );
                res.sendStatus( 403 );
            }
        } )
    } )
} );


router.post( '/cancelOrder', function( req, res, next ) {
    cart.update( {
        "user": process.env.USERNAME
    }, {
        $set: {
            "status": 0
        }
    } ).then( item => {
        res.sendStatus( 200 );
    } )
} );
>>>>>>> e3e44fc4c915402f13fd9c7ae6dd436d32a3c7b9

module.exports = router;