$(document).ready(function () {
    $('#image').change(function () {
        var i = $(this).prev('label').clone();
        var file = $('#image')[0].files[0].name;
        $(this).prev('label').text(file);
    });
});

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

