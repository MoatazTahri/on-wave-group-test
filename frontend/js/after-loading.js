$(document).ready(function () {
    $.ajax({
        url: 'http://numbersapi.com/1/30/date?json',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('.card-title').text(data.year);
            $('.card-content').html(data.text);
        }
    })
})