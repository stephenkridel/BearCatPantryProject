var express = require( 'express' );
var config = require( '../src/config.json' );

var router = express.Router();

router.get( '/login', function( req, res, next ) {
    res.render( "login", {
        title: "Login - Bearcat Pantry"
    } );
} );
router.post( '/tokenvalidate', function( req, res, next ) {
    const {
        OAuth2Client
    } = require( 'google-auth-library' );
    var CLIENT_ID = '39635603607-2jungqsvmbkg3emd35usggvh8lug6eh3.apps.googleusercontent.com'
    const client = new OAuth2Client( CLIENT_ID );
    async function verify() {
        const ticket = await client.verifyIdToken( {
            idToken: req.body.idtoken,
            audience: CLIENT_ID,
            // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        } );
        const payload = ticket.getPayload();
        const userid = payload[ 'sub' ];

        if ( config.adminEmails.includes( payload.email ) ) {
            res.cookie( 'userEmail', payload.email );
            res.cookie( 'isAdmin', true );
        }

        // If request specified a G Suite domain:
        //const domain = payload['hd'];
        res.cookie( 'userId', userid );
        res.send( '200' );
    }


    verify().catch( console.error );
} );


module.exports = router;