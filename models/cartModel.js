//Require Mongoose
var mongoose = require( 'mongoose' );

// 0 = User is still adding items
// 1 = User clicked checkout and admin needs to physically get the items for the order 

var cartSchema = new mongoose.Schema( {
    user: String,
    items: [ {
        itemName: String,
        quantity: Number
    } ],
    status: Number,
    lastModDate: {
        type: Date,
        default: Date.now
    }
} );

//Export function to create "SomeModel" model class
module.exports = mongoose.model( 'Cart', cartSchema );