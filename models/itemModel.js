var mongoose = require( 'mongoose' );

var itemSchema = new mongoose.Schema( {
    itemName: String,
<<<<<<< HEAD
    barcodes: [ Number ],
=======
    barcode: [Number],
>>>>>>> 7f9036c448903ae2e14cea296ad27d2c64403176
    quantity: Number,
    weight: Number,
    img: {
        data: Buffer,
        contentType: String,
        size: Number
    }
} );

module.exports = mongoose.model( 'Item', itemSchema );