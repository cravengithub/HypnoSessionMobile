$(function () {
    var host = 'http://101.50.1.185';
    // var host = 'http://localhost:8120';
    Pace.options = {
        ajax: true,
        restartOnRequestAfter: 5
    }
    $('#message-warning').hide();
    $('#btn-kembali').click(function () {
        $(location).attr('href', 'login.html');
    });
    $('#btn-daftar').click(function () {


        var dataJSON = {
            'nama': $('#nama').val(),
            'email': $('#email').val(),
            'password': $('#password').val()
        }
        // console.log(data);
        Pace.track(function () {
            $.ajax({
                type: 'POST',
                url: host + '/rest_api/akun_add',
                data: dataJSON,
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    // console.log(textStatus);
                    if (data.status == 2) {
                        $('#message-warning').text(data.message);
                        $('form').hide();
                        $('#message-warning').show('slow');

                    } else if (data.status == 1) {
                        $(location).attr('href', 'verification.html?email=' + dataJSON.email);
                    }
                    // console.log(data.status);
                },
                error: function (data, textStatus, jqXHR) {
                    $('#message-warning').text(data);
                }
            });
        });


    });
});