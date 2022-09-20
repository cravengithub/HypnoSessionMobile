$(function () {
    // var host = 'http://localhost:8120';
    var host = 'http://101.50.1.185';
    Pace.options = {
        ajax: true,
        restartOnRequestAfter: 5
    }

    $('#btn-kembali').click(function () {
        $(location).attr('href', 'login.html');
    });
    $('#message-warning').hide();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var email = urlParams.get('email');

    $('#btn-proses').click(function () {
        var data = {
            'verification_code': $('#verification_code').val(),
            'email': email,
        }
        console.log(data);
        Pace.track(function () {
            $.ajax({
                type: 'POST',
                url: host + '/rest_api/verifikasi_akun',
                data: data,
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    console.log(textStatus);
                    if (data.status == 0) {
                        $('#pesan').text(data.message);
                        // $('form').hide();
                        $('#message-warning').show('slow');

                    } else if (data.status == 1) {
                        var jsonString = JSON.stringify(data.data);
                        localStorage.setItem('member', jsonString);
                        $(location).attr('href', 'index.html');
                    }
                    console.log(data);
                }
            });
        });
    });

});