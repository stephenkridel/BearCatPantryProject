var mongoose = require( 'mongoose' );

var itemSchema = new mongoose.Schema( {
    itemName: String,
    barcodes: [ Number ],
    quantity: Number,
    weight: Number,
    img: {
        data: Buffer,
        contentType: String,
        size: Number
    }
} );

module.exports = mongoose.model( 'Item', itemSchema );