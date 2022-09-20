$(function () {
    var host = 'http://101.50.1.185';
    Pace.options = {
        ajax: true,
        restartOnRequestAfter: 5
    }
    // let host = 'http://localhost:8120';
    $('#message-warning').hide();
    // let email = $('#email').val();
    // console.log(email);
    $('#btn-submit').click(function () {
        var data = {
            // 'verification_code': $('#verification_code').val(),
            'email': $('#email').val()
        }
        // console.log(data);
        Pace.track(function () {
            $.ajax({
                type: 'POST',
                url: host + '/rest_api/forget_pass',
                data: data,
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    console.log(textStatus);
                    if (data.status == 0) {
                        $('#pesan').text(data.message);
                        // $('form').hide();
                        $('#message-warning').show('slow');

                    } else if (data.status == 1) {
                        let jsonData = data.data;
                        // var jsonString = JSON.stringify(data.data);
                        // localStorage.setItem('member', jsonString);
                        // $(location).attr('href', 'reset.html?email=' + jsonData.email + '&verification_code=' + jsonData.verification_code);
                        $(location).attr('href', 'reset.html?email=' + jsonData.email);
                    }
                    console.log(data);
                },
                error: function (data, textStatus, jqXHR) {
                    $('#message-warning').text(data.error);
                }
            });
        });
    });
    $('.logout').click(function () {
        localStorage.clear();
    });

});