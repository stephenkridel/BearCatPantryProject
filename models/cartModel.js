//Require Mongoose
var mongoose = require( 'mongoose' );
var item = require( '../models/itemModel' );

var cartSchema = new mongoose.Schema( {
    user: String,
    items: [ {
        itemName: String,
        quantity: Number
    } ]
} );

//Export function to create "SomeModel" model class
module.exports = mongoose.model( 'Cart', cartSchema );