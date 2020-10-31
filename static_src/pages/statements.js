$(function () {

    var $body = $('body');

    $body.find('table[id^="table-services-"]').each(function (i, element) {
        $(element).bootstrapTable({
            method: 'get',
            url: '?type=' + $(element).attr('data-type'),
            striped: true,
            pagination: true,
            search: false,
            showColumns: false,
            clickToSelect: false,
            columns:
                [
                    {
                        field: 'id',
                        title: '№ заявления',
                        align: 'center',
                        sortable: true,
                    },
                    {
                        field: 'date',
                        title: 'Дата заявления',
                        align: 'center',
                        valign: 'inherit',
                        sortable: true,
                    },
                    {
                        field: 'fp_name',
                        title: 'Заявитель',
                        align: 'center',
                        valign: 'inherit',
                        sortable: true,
                        switchable: false
                    },
                    {
                        field: 'ch_name',
                        title: 'Ребенок',
                        align: 'center',
                        valign: 'inherit',
                    },
                    {
                        field: 'parallel',
                        title: 'Параллель',
                        align: 'center',
                        valign: 'inherit',
                        sortable: true,
                    },
                    {
                        field: 'action',
                        title: 'Документы',
                        align: 'center',
                    }],
            onDblClickRow: function (row) {
                var url = $('[data-item-detail="' + row.id + '"]').attr('href');
                if (url) {
                    window.location.href = url;
                }
            }
        });
    })
        .end()

        // Click "Delete" for order
        .on('click', 'a[name="delete"]', function (e) {
            e.preventDefault();
            var pk = $(this).data('order');
            var table = $(this).closest('table');
            $.post(pk + '/delete/', function (data) {
                if (data['status'] == 'success') {
                    noty({text: data['responseText'], type: data['status'], layout: 'topRight'});
                    $(table).bootstrapTable('remove', {field: 'id', values: [pk]}).bootstrapTable('refresh', {});
                }
            })

        })

});
