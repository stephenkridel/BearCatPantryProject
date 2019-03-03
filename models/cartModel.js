var mongoose = require( 'mongoose' );

// 0 = User is still adding items
// 1 = User clicked checkout and admin needs to physically get the items for the order 

var cartSchema = new mongoose.Schema( {
    user: String,
    items: [ {
        itemName: String,
        quantity: Number
    } ]
} );

module.exports = mongoose.model( 'Cart', cartSchema );