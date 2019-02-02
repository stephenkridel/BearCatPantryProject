var express = require( 'express' );

var router = express.Router();

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