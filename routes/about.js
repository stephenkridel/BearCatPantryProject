var express = require( 'express' );
var nodemailer = require( 'nodemailer' );

var transporter = nodemailer.createTransport( {
    service: 'gmail',
    auth: {
        user: 'bearcatpantry@gmail.com',
        pass: 'pantry98765'
    }
} );

var mailOptions = {
    from: 'bearcatpantry@gmail.com',
    to: 'kumpaw@mail.uc.edu',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

var router = express.Router();

router.get( '/about', function( req, res, next ) {
    res.render( "about", {title: "Bearcat Pantry - About"} );
} );

module.exports = router;