var express = require('express');
var mongoose = require("mongoose");
const multer = require("multer");
var fs = require('fs-extra');
var blob = require('blob');

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
        if (err) return handleError(err);
        var pic = items[0].img.data.toString('utf8');
        res.render('items', {
            items: items,
        });
    })
});

router.get('/addNewItem', function (req, res, next) {
    res.render("newItem")
});

router.get('/updateItem', function (req, res, next) {
    res.render("updateItem")
});

router.post("/addItem", upload.single('image'), function (req, res, next) {
    var img = fs.readFileSync(req.file.path);
    item.countDocuments({
        itemName: req.body.itemName
    }, function (err, count) {
        if (count > 0) {
            var update = {
                itemName: req.body.itemName,
                quantity: req.body.quantity,
                weight: req.body.weight,
                img: {
                    data: img,
                    contentType: req.file.mimetype,
                    size: req.file.size,
                }
            }
            item.updateOne(update)
                .then(item => {
                    res.redirect("http://localhost:3000/items");
                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });

        } else {
            var myData = new item({
                itemName: req.body.itemName,
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