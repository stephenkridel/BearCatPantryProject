var express = require('express');
var mongoose = require("mongoose");
const multer = require("multer");
var fs = require('fs-extra');

var router = express.Router();

const upload = multer({
    dest: 'public/images/uploads' // this saves your file into a directory called "uploads"
});

var itemSchema = new mongoose.Schema({
    itemName: String,
    quantity: Number,
    weight: Number,
    img: {
        data: Buffer,
        contentType: String,
        size: Number
    }
});

var item = mongoose.model("Item", itemSchema);

router.get('/items', function (req, res, next) {
    item.find({}, 'itemName quantity weight img', function (err, items) {
        convertToImage(items)
        res.render('items', {
            items: items
        });
    })
});

router.post('/setCookie', function (req, res, next) {
    res.cookie("cartItems", req.body.itemName);
    res.redirect("http://localhost:3000/items");
});

var convertToImage = function (items) {
    for (i in items) {
        if (items[i].img) {
            items[i].actualImage = Buffer.from(items[i].img.data).toString('base64');
        }
    }
};

router.get('/manageItems', function (req, res, next) {
    item.find({}, 'itemName quantity weight img', function (err, items) {
        convertToImage(items)
        res.render('manageItems', {
            items: items
        });
    })
});

router.post('/updateItem', function (req, res, next) {
    item.updateOne({
            "itemName": req.body.oldItemName
        }, {
            "$set": {
                'itemName': req.body.newItemName,
                'quantity': req.body.quantity,
                "weight": req.body.weight
            }
        })
        .then(item => {
            // Find better way to close modal here rather than a redirect
            res.redirect("http://localhost:3000/manageItems");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

router.post('/deleteItem', function (req, res, next) {
    item.deleteOne({
        itemName: req.body.itemName
    }).then(item => {
        res.redirect("http://localhost:3000/items");
    })
});


router.post("/addItem", upload.single('image'), function (req, res, next) {
    var img = fs.readFileSync(req.file.path);
    var itemNameFormatted = req.body.itemName.replace(/\b\w/g, l => l.toUpperCase());
    item.countDocuments({
        itemName: itemNameFormatted
    }, function (err, count) {
        if (count > 0) {
            item.updateOne({
                    "itemName": itemNameFormatted
                }, {
                    "$inc": {
                        'quantity': req.body.quantity
                    }
                })
                .then(item => {
                    res.redirect("http://localhost:3000/items");
                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });

        } else {
            var myData = new item({
                itemName: itemNameFormatted,
                quantity: req.body.quantity,
                weight: req.body.weight,
                img: {
                    data: img,
                    contentType: req.file.mimetype,
                    size: req.file.size,
                }
            });
            myData.save()
                .then(item => {
                    res.redirect("http://localhost:3000/items");
                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });
        }
    });

});

module.exports = router;