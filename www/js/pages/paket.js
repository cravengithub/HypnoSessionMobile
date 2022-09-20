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
    $('.logout').click(function () {
        localStorage.clear();
    });
});