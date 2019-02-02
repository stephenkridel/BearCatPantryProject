//Require Mongoose
var mongoose = require( 'mongoose' );

// 0 = User is still adding items
// 1 = User clicked checkout and admin needs to physically get the items for the order 
// 2 = User has picked up the order and it is now finished

// Or should this make an orderModel?

var cartSchema = new mongoose.Schema( {
    user: String,
    items: [ {
        itemName: String,
        quantity: Number
    } ],
    status: Number
} );

//Export function to create "SomeModel" model class
module.exports = mongoose.model( 'Cart', cartSchema );