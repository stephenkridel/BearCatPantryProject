var express = require( 'express' );
var multer = require( "multer" );
var fs = require( 'fs-extra' );
var _ = require( 'lodash' );
var item = require( '../models/itemModel' );
var cart = require( '../models/cartModel' );

var router = express.Router();

const upload = multer( {
    dest: 'build/uploads', // this saves your file into a directory called "uploads"
    limits: {
        fileSize: 1000 * 1000 * 1 // Limit file size to 1 mb - Decide on actual size eventually
    }
} );

function isUser( req, res, next ) {
    if ( req.cookies.userId ) {
        return next();
    }

    res.redirect( '/login' );
}


router.get( '/items', function( req, res, next ) {
    if ( req.cookies.userId ) {
        var numberPerPage = 20;
        var pagenum = 1;
        if ( req.query.Page != undefined ) {
            pagenum = req.query.Page;
        }
        if ( pagenum < 1 ) pagenum = 1;
        var prev = pagenum - 1;
        if ( prev < 1 ) prev = 1;
        var next = ( pagenum - 1 ) + 2;
        var search = req.query.searchBar.replace( /\b\w/g, l => l.toUpperCase() );
        if ( search && search.length > 0 ) {
            item.find( {
                "itemName": {
                    "$regex": search,
                    "$options": "i"
                },
                "quantity": {
                    "$gt": 0
                }
            }, 'itemName quantity weight img', function( err, items ) {
                convertToImage( items );
                _.forEach( items, function( item ) {
                    item.itemName = item.itemName.replace( /_/g, " " );
                } );
                item.count( {
                    "itemName": {
                        "$regex": search,
                        "$options": "i"
                    },
                    "quantity": {
                        "$gt": 0
                    }
                }, function( err, count ) {
                    var forwardButton = true;
                    var backButton = false;
                    var itemCount = count;
                    var pageCount = Math.ceil( itemCount / numberPerPage );

                    if ( pagenum == pageCount ) {
                        backButton = true;
                        forwardButton = false;
                    }
                    if ( pageCount == 1 ) {
                        backButton = false;
                        forwardButton = false;
                    }
                    if (pageCount > 1 && pagenum < pageCount){
                        backButton = true;
                        forwardButton = true;
                    }
                    if (pageCount > 1 && pagenum == 1) {
                        backButton = false;
                        forwardButton = true;
                    }
                    res.render( 'items', {
                        items: items,
                        title: "Items - Bearcat Pantry",
                        Page: pagenum,
                        searchText: search,
                        PrevPage: prev,
                        NextPage: next,
                        ForwardPage: forwardButton,
                        BackPage: backButton,
                        Skip: itemCount
                    } );
                } );
            } ).skip( pagenum > 0 ? ( ( pagenum - 1 ) * numberPerPage ) : 0 ).limit( numberPerPage );
        } else {
            item.find( {
                "quantity": {
                    "$gt": 0
                }
            }, 'itemName quantity weight img', function( err, items ) {
                convertToImage( items );

                _.forEach( items, function( item ) {
                    item.itemName = item.itemName.replace( /_/g, " " ); // uiValue
                } );
                item.count( {
                    "itemName": {
                        "$regex": search,
                        "$options": "i"
                    },
                    "quantity": {
                        "$gt": 0
                    }
                }, function( err, count ) {
                    var forwardButton = true;
                    var backButton = false;
                    var itemCount = count;
                    var pageCount = Math.ceil( itemCount / numberPerPage );

                    if ( pagenum == pageCount ) {
                        backButton = true;
                        forwardButton = false;
                    }
                    if ( pageCount == 1 ) {
                        backButton = false;
                        forwardButton = false;
                    }
                    if (pageCount > 1 && pagenum < pageCount){
                        backButton = true;
                        forwardButton = true;
                    }
                    if (pageCount > 1 && pagenum == 1) {
                        backButton = false;
                        forwardButton = true;
                    }
                    res.render( 'items', {
                        items: items,
                        title: "Items - Bearcat Pantry",
                        searchText: search,
                        Page: pagenum,
                        PrevPage: prev,
                        NextPage: next,
                        ForwardPage: forwardButton,
                        BackPage: backButton,
                        Skip: itemCount
                    } );
                } );
            } ).skip( pagenum > 0 ? ( ( pagenum - 1 ) * numberPerPage ) : 0 ).limit( numberPerPage );
        }
    } else {
        res.redirect( '/login' );
    }

} );

router.get( '/getItem', function( req, res, next ) {
    // Does not return img currently for performance reasons
    item.find( {
        "itemName": req.query.itemName
    }, 'itemName barcode quantity weight', function( err, item ) {
        var ret = {
            item: item
        }
        res.json( ret );
    } )
} );


router.post( '/addToCart', function( req, res, next ) {
    item.find( {
        "itemName": req.body.itemName
    }, 'quantity', function( err, foundItem ) {
        if ( foundItem[ 0 ].quantity < 1 ) {
            res.status( 400 ).send( "There are currently 0 of that item in the pantry" );
        } else {
            cart.countDocuments( {
                user: req.cookies.userId
            }, function( err, count ) {
                // Find out if a user already has a cart in mongoDB
                if ( count > 0 ) {
                    // Find out if the current user's cart already has the selected item in the cart.
                    cart.countDocuments( {
                        "user": req.cookies.userId,
                        "items.itemName": req.body.itemName,
                    }, function( err, count ) {
                        // If item doesnt exist in the cart, push it on
                        if ( count === 0 ) {
                            // push new item to cart
                            cart.updateOne( {
                                "user": req.cookies.userId
                            }, {
                                "$push": {
                                    items: {
                                        'itemName': req.body.itemName,
                                        'quantity': 1,
                                    }
                                }
                            } ).then( () => {
                                res.sendStatus( 200 );
                            } )
                        } else {
                            // First, validate adding this item to the cart wont put it over the amount available
                            item.find( {
                                "itemName": req.body.itemName
                            }, 'quantity', function( err, found ) {
                                let foundItem = found[ 0 ];
                                cart.find( {
                                    "user": req.cookies.userId
                                }, 'user items', function( err, foundCart ) {
                                    if ( foundCart && foundCart.length > 1 ) {
                                        res.status( 400 ).send( "Somehow found 2 carts for this user" );
                                    }
                                    var usersCart = foundCart[ 0 ];
                                    var amtInCart = usersCart.items.filter( e => e.itemName === req.body.itemName )[ 0 ].quantity
                                    if ( amtInCart + 1 <= foundItem.quantity ) {
                                        cart.findOneAndUpdate( {
                                                "user": req.cookies.userId,
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
                                    } else {
                                        res.sendStatus( 500 );
                                    }
                                } )
                            } )
                        }
                    } )
                } else {
                    // Else, initialize a cart for the new user, and add the item
                    var myData = new cart( {
                        user: req.cookies.userId,
                        items: [ {
                            itemName: req.body.itemName,
                            quantity: 1
                        } ]
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
        }
    } )

} );

var convertToImage = function( items ) {
    for ( i in items ) {
        if ( items[ i ].img ) {
            items[ i ].actualImage = Buffer.from( items[ i ].img.data ).toString( 'base64' );
        }
    }
};

router.get( '/manageItems', isUser, function( req, res, next ) {
    item.find( {}, 'itemName barcode quantity weight', function( err, items ) {
        res.render( 'manageItems', {
            items: items,
            title: "Manage Items - Bearcat Pantry"
        } );
    } )
} );

router.post( '/updateItem', function( req, res, next ) {
    var barcodes = req.body.barcode.split( ',' ).map( Function.prototype.call, String.prototype.trim );
    req.body.newItemName = req.body.newItemName.replace( / /g, "_" ); //dbValue
    console.log( barcodes );
    item.updateOne( {
            "itemName": req.body.oldItemName
        }, {
            "$set": {
                'barcode': barcodes,
                'itemName': req.body.newItemName,
                'quantity': req.body.quantity,
                "weight": req.body.weight
            }
        } )
        .then( () => {
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

router.post( "/addItemByBarcode", function( req, res, next ) {
    item.countDocuments( {
        barcode: req.body.barcode
    }, function( err, count ) {
        if ( err ) {
            console.log( err );
        }
        if ( count > 0 ) {
            res.render( 'incrementExistingItem', {
                barcode: req.body.barcode,
                itemName: undefined,
                title: "Increment Item - Bearcat Pantry"

            } );
        } else {
            res.render( 'barcodeNotFound', {
                barcode: req.body.barcode,
                title: "No Barcode - Bearcat Pantry",
            } );
        }
    } )
} );

router.post( "/addItemByName", function( req, res, next ) {
    //Initialize itemName and barcode to "none" value
    var itemName = "NOITEMNAME";
    var barcode = -99999999999;
    //If itemName or barcode are in the request, change our values to these
    if ( req.body.itemName ) {
        var itemName = req.body.itemName;
        itemName.replace( /\b\w/g, l => l.toUpperCase() );
        var itemSplitName = itemName.split( " " );
        itemName = "";
        //Capatalize the first letter of each word
        for ( i = 0; i < itemSplitName.length; i++ ) {
            if ( i === 0 ) {
                itemName = itemSplitName[ i ].charAt( 0 ).toUpperCase() + itemSplitName[ i ].slice( 1 );
            } else {
                itemName = itemName + "_" + itemSplitName[ i ].charAt( 0 ).toUpperCase() + itemSplitName[ i ].slice( 1 );
            }

        }
    }
    if ( req.body.barcode ) {
        var barcode = req.body.barcode;
    }
    //Search for barcode or itemName
    item.countDocuments( {
        itemName: itemName
    }, function( err, count ) {
        if ( err ) {
            console.log( err );
        }
        if ( count > 0 ) {
            res.render( 'incrementExistingItem', {
                itemName: itemName,
                barcode: barcode,
                title: "Increment Existing - Bearcat Pantry",

            } );
        } else {
            res.render( 'createItem', {
                barcode: barcode,
                itemName: itemName,
                title: "Create Item - Bearcat Pantry"
            } );
        }
    } );
} );


router.post( "/createItem", upload.single( 'image' ), function( req, res, next ) {
    var itemNameFormatted = req.body.itemName.replace( /\b\w/g, l => l.toUpperCase() );
    var img = fs.readFileSync( req.file.path );
    var myData = new item( {
        itemName: itemNameFormatted,
        barcode: [ req.body.barcode ],
        quantity: req.body.quantity,
        weight: req.body.weight,
        img: {
            data: img,
            contentType: req.file.mimetype,
            size: req.file.size,
        }
    } );
    myData.save()
        .then( () => {
            res.redirect( "http://localhost:3000/manageItems" );
        } )
        .catch( err => {
            res.status( 400 ).send( "unable to save to database" );
        } );
} );

router.post( "/decrementItemQuantity", function( req, res, next ) {
    cart.find( {
        "user": req.cookies.userId
    }, 'user items', function( err, foundCart ) {
        if ( foundCart && foundCart.length > 1 ) {
            res.status( 400 ).send( "Somehow found 2 carts for this user" );
        }

        var usersCart = foundCart[ 0 ];
        var itemsToDecrement = [];
        _.forEach( usersCart.items, function( item ) {
            var itemObj = {
                itemName: item.itemName,
                quantity: item.quantity
            }
            itemsToDecrement.push( itemObj )
        } );

        itemsToDecrement.forEach( function( thisItem ) {
            item.updateOne( {
                    "itemName": thisItem.itemName,
                }, {
                    $inc: {
                        "quantity": -Math.abs( thisItem.quantity )
                    }
                } )
                .then( () => {
                    // Sends a response after 1st update. Figure out how to resolve only after all have been updated
                    res.sendStatus( 200 );
                } )
        } );
    } )
} );

router.post( "/incrementItem", function( req, res, next ) {
    if ( req.body.barcode != -99999999999 ) { //If we had a valid barcode, update the item quantity 
        //and set the barcode to the valid barcode (in case it didn't exist before)
        item.updateOne( {
                "$or": [ {
                    "barcode": req.body.barcode
                }, {
                    "itemName": req.body.itemName
                } ]
            }, {
                "$addToSet": {
                    'barcode': req.body.barcode
                },
                "$inc": {
                    'quantity': req.body.quantity
                }
            } )
            .then( () => {
                res.redirect( "http://localhost:3000/manageItems" );
            } )
            .catch( err => {
                res.status( 400 ).send( "unable to save to database" );
            } );
    } else {
        item.updateOne( {
                "itemName": req.body.itemName
            }, {
                "$inc": {
                    'quantity': req.body.quantity
                }
            } )
            .then( () => {
                res.redirect( "http://localhost:3000/manageItems" );
            } )
            .catch( err => {
                res.status( 400 ).send( "unable to save to database" );
            } );
    }
} );



module.exports = router;