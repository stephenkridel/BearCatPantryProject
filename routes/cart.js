var express = require('express');

var router = express.Router();

router.get('/cart', function (req, res, next) {
    console.log(req.cookies)
    res.render("cart");
});

module.exports = router;
