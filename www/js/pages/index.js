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


    // console.log(sessionStorage.getItem('member'));

    $.get(host + "/rest_api/artikel_list")
        .done(function (data) {
            $.each(data, function (i, item) {
                let str = "<a href='detail_artikel.html?id_artikel=" + item.id + "'>" +
                    "<div class ='au-message__item unread'>" +
                    "<div class = 'au-message__item-inner'>" +
                    "<div class = 'au-message__item-text'>" +
                    "<div class = 'avatar-wrap'>" +
                    "<div class='avatar'>" +
                    "<img src='" + item.ikon_src + "' alt='John Smith'>" +
                    "</div>" +
                    "</div>" +
                    "<div class='text'>" +
                    "<h5 class='name'>" + item.penulis + "</h5>" +
                    "<p>" + item.judul + "</p>" +
                    "</div>" +
                    "</div>" +
                    "<div class='au-message__item-time'>" +
                    "<span>" + item.publikasi + "</span>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</a>";
                $('#artikel-list').append(str);
            });
        });
    $.get(host + "/rest_api/paket_terapi_list")
        .done(function (data) {
            $.each(data, function (i, item) {
                var str = "<a href='detail_paket.html?id_paket=" + item.id + "'>" +
                    "<div class ='au-message__item unread'>" +
                    "<div class = 'au-message__item-inner'>" +
                    "<div class = 'au-message__item-text'>" +
                    "<div class = 'avatar-wrap'>" +
                    "<div class='avatar'>" +
                    "<img src='" + item.ikon_src + "' alt='John Smith'>" +
                    "</div>" +
                    "</div>" +
                    "<div class='text'>" +
                    "<h5 class='name'>" + item.nama + "</h5>" +
                    "<p>" + item.deskripsi + "</p>" +
                    "</div>" +
                    "</div>" +
                    "<div class='au-message__item-time'>" +
                    "<span>Rp&nbsp;" + item.harga.toLocaleString() + ",-/bulan</span>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</a>";
                $('#paket-list').append(str);
            });
        });
    $.get(host + "/rest_api/member_load/" + memberJSON.id, function (data) {
        $('#img-foto').attr('src', data.foto_src);
        $('#nama').text(data.nama);
        $('#email').text(data.email);
        $('#kota-domisili').text(data.kota_domisili);
        // console.log(data.foto_src);
    });

    var link = '<a id="link-profile" href="detail_profile.html?id_member=' + memberJSON.id + '" class="au-btn au-btn-load">load more</a>';
    $('.au-message__footer').append(link);

    $('.logout').click(function () {
        localStorage.clear();
    });

});