var express = require('express');
var mongoose = require("mongoose");

var router = express.Router();


var itemSchema = new mongoose.Schema({
    itemName: String,
    quantity: Number,
    weight: Number
});

var item = mongoose.model("Item", itemSchema);

router.get('/items', function (req, res, next) {
    item.find({}, 'itemName quantity weight', function (err, items) {
        if (err) return handleError(err);
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

router.post("/addItem", (req, res) => {
    var myData = new item(req.body);
    item.countDocuments({
        itemName: req.body.itemName
    }, function (err, count) {
        console.log(count)
        if (count > 0) {
            var update = {
                itemName: req.body.itemName,
                quantity: req.body.quantity,
                weight: req.body.weight
            }
            item.updateOne(update)
                .then(item => {
                    res.redirect("http://localhost:3000/items");
                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });

        } else {
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