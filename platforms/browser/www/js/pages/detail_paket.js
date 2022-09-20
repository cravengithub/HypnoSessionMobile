$(function () {
    // var host = "http://localhost:8120";
    var host = 'http://101.50.1.185';
    $("#mobile-section").sticky({
        topSpacing: 1,
        zIndex: 99999
    });
    var dataMember = localStorage.getItem('member');
    var memberJSON = JSON.parse(dataMember);
    if (dataMember == null) {
        $(location).attr('href', 'login.html');
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var id_paket = urlParams.get('id_paket');

    $.get({
        url: host + "/rest_api/paket_terapi_load/" + id_paket,
        success: function (data) {
            $('#nama').text(data.nama);
            $('#deskripsi').html(data.deskripsi);
            $('.avatar img').attr('src', data.ikon_src);
        }
    });

    // $.get(host + "/rest_api/paket_terapi_load/" + id_paket, function (data) {
    //     $('#nama').text(data.nama);
    //     $('#deskripsi').html(data.deskripsi);
    //     $('.avatar img').attr('src', data.ikon_src);
    // });
    $.get(host + "/rest_api/audio_list/" + id_paket, function (data) {
        var audioControl = "";
        $.each(data, function (i, item) {
            audioControl = audioControl + '<audio id="id_audio-' + item.id + '" controls controlsList="nodownload">' +
                '<source ' +
                'src="' + host + '/static/audio/' + item.filename +
                '" type="audio/mpeg" />' +
                '</audio>';
        });
        $('#audio-list').html(audioControl);
    });
    $('.logout').click(function () {
        localStorage.clear();
    });
});