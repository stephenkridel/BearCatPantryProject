var express = require('express');
var cart = require('../models/cartModel');
var items = require('../models/itemModel')
var _ = require('lodash');
var mongoose = require('mongoose');


var router = express.Router();

router.get('/cart', function (req, res, next) {
    cart.find({
        "user": "testUser"
    }, 'items', function (err, itemInCart) {
        if (itemInCart && itemInCart.length > 0) {
            res.render('cart', {
                itemInCart: itemInCart[0].items,
                title: "Bearcat Pantry - Shopping Cart"

            });
        } else {
            res.render('cart', {
                title: "Bearcat Pantry - Shopping Cart"
            });
        }

    })
});

router.get('/totalCartItems', function (req, res, next) {
    cart.find({
        "user": "testUser"
    }, 'items', function (err, itemInCart) {
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

//Copy of the code in items.js TODO:Probably should create a joined route or remove unnecessary branches
router.post('/updateCartItemQuantities', function (req, res, next) {
    // Use a cookie to get user info & should probs auto create a cart for every user upon initial login or something
    cart.countDocuments({
        user: "testUser"
    }, function (err, count) {
        // Find out if a user already has a cart in mongoDB
        if (count > 0) {
            // Find out if the current user's cart already has the selected item in the cart.
            cart.countDocuments({
                "user": "testUser",
                "items.itemName": req.body.itemName,
            }, function (err, count) {
                // If item doesnt exist in the cart, push it on
                if (count === 0) {
                    // push new item to cart
                    cart.update({
                        "user": "testUser"
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
                    cart.findOneAndUpdate({
                        "user": "testUser",
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

module.exports = router;