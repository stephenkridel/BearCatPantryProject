var express = require( 'express' );
const multer = require( "multer" );
var fs = require( 'fs-extra' );
var item = require( '../models/itemModel' );
var cart = require( '../models/cartModel' )
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

var router = express.Router();

const upload = multer( {
    dest: 'public/images/uploads' // this saves your file into a directory called "uploads"
} );

router.get( '/items', function( req, res, next ) {
    //var search = req.query.searchBar;
    var search = req.query.searchBar.replace( /\b\w/g, l => l.toUpperCase() );
    if  (search && search.length > 0){
        console.log("Search string:"+ search)
        item.find( {"itemName": { "$regex": search, "$options": "i"}}, 'itemName quantity weight img', function( err, items ) {
            convertToImage( items );
            res.render( 'items', {
                items: items,
                title: "Bearcat Pantry - Items",
                searchText: search
            } );
        } );
    }
    else{
    item.find( {}, 'itemName quantity weight img', function( err, items ) {
        convertToImage( items )
        res.render( 'items', {
            items: items,
            title: "Bearcat Pantry - Items"
        } );
    } );
    }
    
} );


// WIP
router.post( '/addToCart', function( req, res, next ) {
    // Use a cookie to get user info & should probs auto create a cart for every user upon initial login or something
    cart.countDocuments( {
        user: "testUser"
    }, function( err, count ) {
        // Find out if a user already has a cart in mongoDB
        if ( count > 0 ) {
            // Find out if the current user's cart already has the selected item in the cart.
            cart.countDocuments( {
                "user": "testUser",
                "items.itemName": req.body.itemName,
            }, function( err, count ) {
                // If item doesnt exist in the cart, push it on
                if ( count === 0 ) {
                    // push new item to cart
                    cart.update( {
                        "user": "testUser"
                    }, {
                        "$push": {
                            items: {
                                'itemName': req.body.itemName,
                                'quantity': 1,
                            }
                        }
                    } ).then( item => {
                        res.sendStatus( 200 );
                    } )
                } else {
                    // else, update existing shopping cart item to increment 1 time
                    cart.findOneAndUpdate( {
                            "user": "testUser",
                        }, {
                            $inc: {
                                "items.$[elem].quantity": 1
                            }
                        }, {
                            upsert: true,
                            arrayFilters: [ {
                                "elem.itemName": {
                                    $eq: req.body.itemName
                                }
                            } ]
                        } )
                        .then( item => {
                            res.sendStatus( 200 );
                        } )
                }
            } )

        } else {
            // Else, initialize a cart for the new user, and add the item
            var myData = new cart( {
                user: "testUser",
                items: [ {
                    itemName: req.body.itemName,
                    quantity: 1
                } ]
            } );
            myData.save()
                .then( item => {
                    res.sendStatus( 200 );

                } )
                .catch( err => {
                    res.status( 400 ).send( "unable to save to database" );
                } );
        }
    } );
} );

var convertToImage = function( items ) {
    for ( i in items ) {
        if ( items[ i ].img ) {
            items[ i ].actualImage = Buffer.from( items[ i ].img.data ).toString( 'base64' );
        }
    }
};

router.get( '/manageItems', function( req, res, next ) {
    var scripts = [ {
        script: '/javascripts/barcodeScanner.js'
    } ];
    item.find( {}, 'itemName barcode quantity weight img', function( err, items ) {
        convertToImage( items )
        res.render( 'manageItems', {
            items: items,
            title: "Bearcat Pantry - Manage Items",
            scripts: scripts
        } );
    } )
} );

router.post( '/updateItem', function( req, res, next ) {
    item.updateOne( {
            "itemName": req.body.oldItemName
        }, {
            "$set": {
                'itemName': req.body.newItemName,
                'quantity': req.body.quantity,
                "weight": req.body.weight
            }
        } )
        .then( item => {
            // Find better way to close modal here rather than a redirect
            res.redirect( "http://localhost:3000/manageItems" );
        } )
        .catch( err => {
            res.status( 400 ).send( "unable to save to database" );
        } );
} );

router.post( '/deleteItem', function( req, res, next ) {
    item.deleteOne( {
        itemName: req.body.oldItemName
    } ).then( item => {
        res.redirect( "http://localhost:3000/manageItems" );
    } )
} );


router.post( "/createItem", upload.single( 'image' ), function( req, res, next ) {
    var img = fs.readFileSync( req.file.path );
    var itemNameFormatted = req.body.itemName.replace( /\b\w/g, l => l.toUpperCase() );
    item.countDocuments( {
        itemName: itemNameFormatted
    }, function( err, count ) {
        if ( count > 0 ) {
            // use popupS instead of this things
            res.send( "Item is already in DB" );
        } else {
            var myData = new item( {
                itemName: itemNameFormatted,
                barcode: req.body.barcode,
                quantity: req.body.quantity,
                weight: req.body.weight,
                img: {
                    data: img,
                    contentType: req.file.mimetype,
                    size: req.file.size,
                }
            } );
            myData.save()
                .then( item => {
                    console.log( "item created" )
                } )
                .catch( err => {
                    res.status( 400 ).send( "unable to save to database" );
                } );
        }
    } );

} );

module.exports = router;