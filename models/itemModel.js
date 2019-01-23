//Require Mongoose
var mongoose = require( 'mongoose' );

var itemSchema = new mongoose.Schema( {
    itemName: String,
    quantity: Number,
    weight: Number,
    img: {
        data: Buffer,
        contentType: String,
        size: Number
    }
} );

//Export function to create "SomeModel" model class
module.exports = mongoose.model( 'Item', itemSchema );