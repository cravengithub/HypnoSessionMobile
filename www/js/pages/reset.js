$(function () {
    // let host = 'http://localhost:8120';
    var host = 'http://101.50.1.185';
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    Pace.options = {
        ajax: true,
        restartOnRequestAfter: 5
    }
    $('#message-warning').hide();
    $('#btn-proses').click(function () {
        let email = urlParams.get('email');
        // let verification_code = urlParams.get('verification_code');
        let password = $('#password').val();
        let re_password = $('#re-password').val();
        let verification_code = $('#verification_code').val();

        let jsonData = {
            'email': email,
            'verification_code': verification_code,
            'password': password
        }
        // console.log(jsonData);
        if (password != re_password) {
            $('#pesan').text('Password yang dituliskan tidak sama.');
            $('#message-warning').show('slow').slideDown();
        } else {
            Pace.track(function () {
                $.ajax({
                    type: 'POST',
                    url: host + '/rest_api/reset_pass',
                    data: jsonData,
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        console.log(textStatus);
                        if (data.status == 0) {
                            $('#pesan').text(data.message);
                            // $('form').hide();
                            $('#message-warning').show('slow');

                        } else if (data.status == 1) {
                            $('#pesan').text(data.message);
                            $('form').hide();
                            $('#message-warning').show('slow');
                        }
                        // console.log(data);
                    },
                    error: function (data, textStatus, jqXHR) {
                        $('#message-warning').text(data.error);
                    }
                });
            });
        }
    });
    $('#btn-kembali').click(function () {
        $(location).attr('href', 'login.html');
    });
});