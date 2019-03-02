var express = require( 'express' );
var multer = require( "multer" );
var fs = require( 'fs-extra' );
var item = require( '../models/itemModel' );
var cart = require( '../models/cartModel' );
var util = require( '../src/javascript/util.js' );

var router = express.Router();

const upload = multer( {
    dest: 'build/uploads', // this saves your file into a directory called "uploads"
    limits: {
        fileSize: 1000 * 1000 * 1 // Limit file size to 1 mb - Decide on actual size eventually
    }
} );

router.get( '/items', function( req, res, next ) {
    //var search = req.query.searchBar; 
    //var page = req.query.Page;
    var num = 4;
    var pagenum = req.query.Page;// > 0 ? 1 : req.query.Page;
    if (pagenum < 1) pagenum = 1;
    var prev = pagenum -1//pagenum > 1 ? pagenum-- : pagenum;
    if (prev < 1) prev = 1;
    var next = (pagenum -1) + 2 ;//+ parseInt(2)
    var search = req.query.searchBar.replace( /\b\w/g, l => l.toUpperCase() );
        //var skip = (page*num)-num;
    if ( search && search.length > 0 ) {
        item.find( {
            "itemName": {
                "$regex": search,
                "$options": "i"
            }
        }, 'itemName quantity weight img', function( err, items ) {
            convertToImage( items );
            var notFullPage = false;
            if (items.length < num && items.length > 0) notFullPage = true;
            var firstPage = true;
            if (pagenum > 1) firstPage = false;
            res.render( 'items', {
                items: items,
                title: "Items - Bearcat Pantry",
                searchText: search,
                Page: pagenum,
                PrevPage: prev,
                NextPage: next,
                count: notFullPage,
                First: firstPage
            } );
        } ).skip(pagenum > 0 ? ((pagenum - 1) * num) : 0).limit(num);
    } else {
        item.find( {}, 'itemName quantity img', function( err, items ) {
            convertToImage( items );
            var notFullPage = false;
            if (Number(items.length) < num && Number(items.length) > 0) notFullPage = true;
            var firstPage = true;
            if (pagenum > 1) firstPage = false;
            res.render( 'items', {
                items: items,
                title: "Items - Bearcat Pantry",
                Page: pagenum,
                PrevPage: prev,
                NextPage: next,
                count: notFullPage,
                First: firstPage
            } );
        } ).skip(pagenum > 0 ? ((pagenum- 1) * num) : 0).limit(num);
    }

} );

router.post( '/addToCart', function( req, res, next ) {
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
                    cart.updateOne( {
                        "user": process.env.USERNAME
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
    item.countDocuments({
        barcode: req.body.barcode
    }, function(err, count){
        if(err){
            console.log(err);
        }
        if(count > 0){
            res.render('incrementExistingItem', {
                barcode: req.body.barcode,
                itemName: undefined
            });
        }
        else{
            res.render('barcodeNotFound', {
                barcode: req.body.barcode
            });
        }
    })
});

router.post( "/addItemByName", function( req, res, next ) {
    //Initialize itemName and barcode to "none" value
    var itemName = "NOITEMNAME";
    var barcode = -99999999999;
    //If itemName or barcode are in the request, change our values to these
    if(req.body.itemName){
        var itemName = req.body.itemName;
        itemName.replace( /\b\w/g, l => l.toUpperCase() );
        itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1).toLowerCase();
        console.log(itemName);
    }
    if(req.body.barcode){
        var barcode = req.body.barcode;
    }
    //Search for barcode or itemName
    item.countDocuments( {
        itemName: itemName
    }, function( err, count ){
        if(err){
            console.log(err);
        }
        if(count > 0){
            res.render('incrementExistingItem', {
                itemName: itemName,
                barcode: barcode
            });
        } else{
            res.render('createItem', {
                barcode: barcode,
                itemName: itemName
            });
        }
    });
});


router.post( "/createItem", upload.single( 'image' ), function( req, res, next ) {
    var itemNameFormatted = req.body.itemName.replace( /\b\w/g, l => l.toUpperCase() );
    var img = fs.readFileSync( req.file.path );
    var myData = new item( {
        itemName: itemNameFormatted,
        barcode: [req.body.barcode],
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

router.post( "/incrementItem", function( req, res, next ) {
    if(req.body.barcode != -99999999999){ //If we had a valid barcode, update the item quantity 
        //and set the barcode to the valid barcode (in case it didn't exist before)
        
        item.updateOne( {
            "$or":[{
                "barcode": req.body.barcode
            },{
                "itemName": req.body.itemName
            }]
        }, {
            "$addToSet":{
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
    }
    else{
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
});

module.exports = router;