$(document).ready(function () {
    $('#image').change(function () {
        var i = $(this).prev('label').clone();
        var file = $('#image')[0].files[0].name;
        $(this).prev('label').text(file);
    });
});

