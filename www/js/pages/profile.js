$(function () {
    // var host = 'http://localhost:8120';
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
    // console.log('percobaan');
    $.get(host + "/rest_api/member_load/" + memberJSON.id, function (data) {
        $('#img-foto').attr('src', data.foto_src);
        $('#nama').text(data.nama);
        $('#email').text(data.email);
        $('#kota-domisili').text(data.kota_domisili);

        // $('#link-profile').attr('href', '"detail_profile.html?id_member=' + memberJSON.id + '"');
        var link = '<a id="link-profile" href="detail_profile.html?id_member=' + memberJSON.id + '" class="au-btn au-btn-load">load more</a>';

        $('.au-message__footer').append(link);
        // console.log('==========================' + $('#link-profile').attr('href'))

    });
    $('.logout').click(function () {
        localStorage.clear();
    });

});