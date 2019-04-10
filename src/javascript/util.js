module.exports = {
    formatDate: function( date ) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();

        return monthNames[ monthIndex ] + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes;
    },

    sendEmail: function( res, nodemailer, to, subject, html ) {
        let emailSettings = {
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_NAME,
                pass: process.env.EMAIL_PW
            }
        };

        var mailOptions = {
            from: process.env.EMAIL_NAME,
            to: to,
            subject: subject,
            html: html
        };

        let transporter = nodemailer.createTransport( emailSettings );

        transporter.sendMail( mailOptions, ( error, info ) => {
            if ( error ) {
                res.sendStatus( 403 );
            }
            res.sendStatus( 200 );
        } );
    }
}