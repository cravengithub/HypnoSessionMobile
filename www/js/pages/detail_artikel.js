$(function () {
    var host = "http://101.50.1.185";
    // var host = 'http://localhost:8000';
    $("#mobile-section").sticky({
        topSpacing: 1,
        zIndex: 99999
    });
    var dataMember = localStorage.getItem('member');
    // dataDummy = {
    //     'id': 29,
    //     'email': 'utama738@gmail.com'
    // }
    var memberJSON = JSON.parse(dataMember);
    // var memberJSON = dataDummy;
    if (dataMember == null) {
        $(location).attr('href', 'login.html');
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var id_artikel = urlParams.get('id_artikel');

    // var xHTTP = new XMLDocument();
    // xHTTP.open('GET', host + "/rest_api/komentar_load/" + id_artikel, Math.random(), true);
    // xHTTP.send();
    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open(host + "/rest_api/artikel_load/" + id_artikel, Math.random(), true);
    // xmlhttp.send();

    $.get(host + "/rest_api/artikel_load/" + id_artikel, function (data) {
        // console.log(data);
        // console.log(data.id + '======================')
        $('#judul').text(data.judul);
        $('#penulis').text(data.penulis);
        $('#publikasi').text(data.publikasi);
        $('#konten').html(data.konten);
        $('.avatar img').attr('src', data.ikon_src);
    });
    function komentar_list() {
        $.get(host + "/rest_api/komentar_load/" + id_artikel, function (data) {
            // console.log('data:===========================\n');
            // console.log(data);

            // console.log(data.id + '======================')
            var ct = "";
            $.each(data, function (i, item) {
                // console.log(item.member);
                ct = ct + "<spin>" + item.member + "</spin>&nbsp;<span class='mess-time'>" + item.publikasi + "</span>";
                if (i % 2 == 0) {
                    ct = ct + "<div class='recei-mess'>" + item.konten + "</div>";
                } else {
                    ct = ct + "<div class='send-mess'>" + item.konten + "</div>";
                }
            });
            $('#komentar-list').html(ct);
        });
    }
    komentar_list();
    $('#btn-kirim').click(function () {
        var komentarJSON = {
            "member": memberJSON.id,
            "artikel": id_artikel,
            "konten": $('#komentar-field').val()
        };
        // console.log(komentarJSON);
        $.post({
            url: host + "/rest_api/komentar_add",
            data: komentarJSON,
            success: function (data, textStatus, jqXHR) {
                // console.log('success');
                // $('#komentar-field').val('');
                // $(location).attr('href', 'detail_artikel.html?id_artikel=' + id_artikel);
                komentar_list()
            }
        });
    });
});