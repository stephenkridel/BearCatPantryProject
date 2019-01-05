var express = require('express');
var mongoose = require("mongoose");

var router = express.Router();


var itemSchema = new mongoose.Schema({
    itemName: String,
    price: String
});

var item = mongoose.model("Item", itemSchema);

router.get('/items', function (req, res, next) {
    item.find({}, 'itemName price', function (err, items) {
        if (err) return handleError(err);
        res.render('items', {
            items: items
        });
      })
});

router.get('/addNewItem', function (req, res, next) {
    res.render("newItem")
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

module.exports = router;