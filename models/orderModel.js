var mongoose = require( 'mongoose' );
var cart = require( '../models/cartModel.js' );

var cartSchema = new mongoose.Schema( {
    user: String,
    items: [ {
        itemName: String,
        quantity: Number
    } ]
} );


// 0 = User is still adding items
// 1 = User clicked checkout and admin needs to physically get the items for the order 

var orderSchema = new mongoose.Schema( {
    cart: cartSchema,
    status: Number,
    creationDate: String
} );

module.exports = mongoose.model( 'Order', orderSchema );