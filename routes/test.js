var express = require( 'express' );
var nodemailer = require( 'nodemailer' );

var router = express.Router();


var transporter = nodemailer.createTransport( {
    service: 'gmail',
    auth: {
        user: 'bearcatpantry@gmail.com',
        pass: ''
    }
} );

var mailOptions = {
    from: 'bearcatpantry@gmail.com',
    to: 'kumpaw@mail.uc.edu',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

router.get( '/test', function( req, res, next ) {
    res.render( "test", {
        title: "DEV TESTING - Bearcat Pantry"
    } );
} );

router.post( '/sendMail', function( req, res, next ) {
    transporter.sendMail( mailOptions, function( error, info ) {
        if ( error ) {
            console.log( error );
        } else {
            console.log( 'Email sent: ' + info.response );
        }
    } );
} );

module.exports = router;