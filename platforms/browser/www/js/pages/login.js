$(function () {
    // var host = "http://localhost:8120";
    var host = 'http://101.50.1.185';
    $('#message-warning').hide();
    $('#btn-login').click(function () {
        var email = $('#email').val();
        var password = $('#password').val()
        // console.log(password);
        Pace.track(function () {
            $.get({
                url: host + "/rest_api/member_login/" + email + '/' + password,
                success: function (data) {
                    if (data.email == email) {
                        jsonString = JSON.stringify(data);
                        localStorage.setItem('member', jsonString);
                        $(location).attr('href', 'index.html');
                    } else {
                        $('#message-warning').hide();
                        $('#pesan').text('Email atau Password tidak sesuai.');
                        $('#message-warning').show('slow');
                    }
                },
                error: function (data) {
                    $('#pesan').text(data);
                    $('#message-warning').show('slow');
                }
            });
        });
    });
    var memberStr = localStorage.getItem('member');
    if (memberStr != null) {
        $(location).attr('href', 'index.html');
    }
});