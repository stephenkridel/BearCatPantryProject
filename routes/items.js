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
    item.find({}, 'itemName quantity', function (err, items) {
        if (err) return handleError(err);
        console.log(items);
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
    myData.save()
        .then(item => {
            res.redirect("http://localhost:3000/items");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

router.post("/updateExistingItem", (req, res) => {
    item.updateMany({
            itemName: req.body.itemName
        }, {
            quantity: req.body.quantity
        }, function (err) {
            console.log("you messed up")
        })
        .then(() => {
            res.redirect("http://localhost:3000/items");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

module.exports = router;