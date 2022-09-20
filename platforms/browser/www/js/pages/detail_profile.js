$(function () {
    // let host = 'http://localhost:8120';
    var host = 'http://101.50.1.185';
    $("#mobile-section").sticky({
        topSpacing: 1,
        zIndex: 99999
    });
    Pace.options = {
        ajax: true,
        restartOnRequestAfter: 5
    }
    var dataMember = localStorage.getItem('member');
    var memberJSON = JSON.parse(dataMember);
    if (dataMember == null) {
        $(location).attr('href', 'login.html');
    }

    $('#message-alert').hide();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var id_member = urlParams.get('id_member');
    // console.log(id_paket);
    $.get(host + "/rest_api/member_load/" + id_member, function (data) {
        // console.log(data);
        // console.log(data.id + '======================')
        $('#id_nama').val(data.nama);
        $('#id_kota_domisili').val(data.kota_domisili);
        $('#id_alamat').val(data.alamat);
        $('#id_tanggal_lahir').val(data.tanggal_lahir);
        $('#id_tempat_lahir').val(data.tempat_lahir);
        $('#id_email').val(data.email);
        $('#id_no_telepon').val(data.no_telepon);
        if (data.jenis_kelamin) {
            $('#id_jenis_kelamin_1').attr('checked', 'checked');
        } else {
            $('#id_jenis_kelamin_0').attr('checked', 'checked');
        }
        $('#img-foto').attr('src', data.foto_src);
        $('#id_foto_src').val(data.foto_src);
    });
    $('#foto').change(function (evt) {
        console.clear();
        var filename = evt.target.files[0];
        var output = $('#img-foto');
        output.width(150);
        output.height(150);
        var foto_src = $('#id_foto_src');
        var reader = new FileReader();
        reader.addEventListener('load', function (e) {
            output.attr('src', e.target.result);
            foto_src.val(e.target.result);
        });
        var res = reader.readAsDataURL(filename);
    });
    $('#btn-simpan').click(function () {
        var dataForm = $('form').serializeArray();
        var json = {};
        $.each(dataForm, function (i, v) {
            json[v.name] = v.value;
        });
        // console.log(json);
        Pace.track(function () {
            $.ajax({
                url: host + '/rest_api/member_update/' + memberJSON.id,
                data: json,
                dataType: 'json',
                method: 'PUT',
                success: function (data, textStatus, jqXHR) {
                    console.log('Success');
                    console.log(textStatus);
                    let pesan = 'Data telah tersimpan';
                    $('#pesan').text(pesan);
                    $('#message-alert').show('slow');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('Error');

                }
            });
        });
    });
    $('.logout').click(function () {
        localStorage.clear();
    });
});