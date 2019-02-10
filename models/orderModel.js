var mongoose = require( 'mongoose' );
var cart = require( '../models/cartModel.js' );

var cartSchema = new mongoose.Schema( {
    user: String,
    items: [ {
        itemName: String,
        quantity: Number
    } ]
} );


// 0 = Order has just been created
// 1 = Order has been recieved by user

var orderSchema = new mongoose.Schema( {
    cart: cartSchema,
    status: Number,
    creationDate: String
} );

module.exports = mongoose.model( 'Order', orderSchema );