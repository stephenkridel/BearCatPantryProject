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
}