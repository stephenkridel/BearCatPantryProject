var express = require( 'express' );
const multer = require( "multer" );
var fs = require( 'fs-extra' );
var item = require( '../models/itemModel' );
var cart = require( '../models/cartModel' )
var router = express.Router();

const upload = multer( {
    dest: 'build/uploads' // this saves your file into a directory called "uploads"
} );

router.get( '/items', function( req, res, next ) {
    //var search = req.query.searchBar;
    var search = req.query.searchBar.replace( /\b\w/g, l => l.toUpperCase() );
    if ( search && search.length > 0 ) {
        item.find( {
            "itemName": {
                "$regex": search,
                "$options": "i"
            }
        }, 'itemName quantity weight img', function( err, items ) {
            convertToImage( items );
            res.render( 'items', {
                items: items,
                title: "Items - Bearcat Pantry",
                searchText: search
            } );
        } );
    } else {
        item.find( {}, 'itemName quantity img', function( err, items ) {
            convertToImage( items );
            res.render( 'items', {
                items: items,
                title: "Items - Bearcat Pantry"
            } );
        } );
    }

} );


// WIP
router.post( '/addToCart', function( req, res, next ) {
    // Use a cookie to get user info & should probs auto create a cart for every user upon initial login or something
    cart.countDocuments( {
        user: process.env.USERNAME
    }, function( err, count ) {
        // Find out if a user already has a cart in mongoDB
        if ( count > 0 ) {
            // Find out if the current user's cart already has the selected item in the cart.
            cart.countDocuments( {
                "user": process.env.USERNAME,
                "items.itemName": req.body.itemName,
            }, function( err, count ) {
                // If item doesnt exist in the cart, push it on
                if ( count === 0 ) {
                    // push new item to cart
                    cart.update( {
                        "user": process.env.USERNAME
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
                            "user": process.env.USERNAME,
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
                        .then( () => {
                            res.sendStatus( 200 );
                        } )
                }
            } )

        } else {
            // Else, initialize a cart for the new user, and add the item
            var myData = new cart( {
                user: process.env.USERNAME,
                items: [ {
                    itemName: req.body.itemName,
                    quantity: 1
                } ],
                status: 0
            } );
            myData.save()
                .then( () => {
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
    item.find( {}, 'itemName barcode quantity weight img', function( err, items ) {
        convertToImage( items )
        res.render( 'manageItems', {
            items: items,
            title: "Manage Items - Bearcat Pantry"
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
        .then( () => {
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
    } ).then( () => {
        res.redirect( "http://localhost:3000/manageItems" );
    } )
} );

router.post( "/addItem", function( req, res, next ) {
    var itemName = "NOITEMNAME";
    var barcode = -99999999999;
    if(req.body.itemName){
        var itemName = req.body.itemName;
    }
    else if(req.body.barcode){
        var barcode = req.body.barcode;
    }
    item.countDocuments( {
        $or:{
            barcode: barcode,
            itemName: itemName
        }
    }, function( err, count ){
        if(count > 0){
            res.render('createItem', {
                barcode: barcode,
                itemName: itemName
            });
        } else{
            res.render('incrementExistingItem', {
                barcode: barcode,
                itemName: itemName
            });
        }
    });
});



// router.post( "/createItem", /*upload.single( 'image' ),*/ function( req, res, next ) {
//     var itemNameFormatted = req.body.itemName.replace( /\b\w/g, l => l.toUpperCase() );
//     var img = fs.readFileSync( req.file.path );
//     item.countDocuments( {
//         itemName: itemNameFormatted
//     }, function( err, count ) {
//         if ( count > 0 ) {
//             // use popupS instead of this things
//             res.send( "Item is already in DB" );
//         } else {
//             var myData = new item( {
//                 itemName: itemNameFormatted,
//                 barcode: req.body.barcode,
//                 quantity: req.body.quantity,
//                 weight: req.body.weight,
//                 img: {
//                     data: img,
//                     contentType: req.file.mimetype,
//                     size: req.file.size,
//                 }
//             } );
//             myData.save()
//                 .then( () => {
//                     res.sendStatus( 200 );
//                 } )
//                 .catch( err => {
//                     res.status( 400 ).send( "unable to save to database" );
//                 } );
//         }
//     } );
//} );

module.exports = router;