$(function () {

    var $body = $('body');

    $body.find('table[id^="table-services-"]').each(function(i, element){
        $(element).bootstrapTable({
            method: 'get',
            url: '?type='+$(element).attr('data-type'),
            striped: true,
            pagination: false,
            search: false,
            showColumns: false,
            clickToSelect: false,
            columns:
                [
                    {
                        field: 'id',
                        title: '№ услуги',
                        align: 'center',
                    },
                    {
                        field: 'tariff',
                        title: 'Услуга/Название тарифа - Цена',
                        align: 'center',
                        valign: 'inherit',
                        sortable: true,
                        switchable: false
                    },
                    {
                        field: 'create',
                        title: 'Дата создания',
                        align: 'center',
                        valign: 'inherit',
                    },
                    {
                        field: 'activated_date',
                        title: 'Дата начала',
                        align: 'center',
                        valign: 'inherit',
                    },
                    {
                        field: 'deactivated_date',
                        title: 'Дата окончания',
                        align: 'center',
                        valign: 'inherit',
                    },
                    {
                        field: 'contract',
                        title: 'Тип соглашения',
                        align: 'center',
                        valign: 'inherit',
                    },
                    {
                        field: 'request_originals',
                        title: 'Оригиналы документов',
                        align: 'center',
                        valign: 'inherit',
                    },
                    {
                        field: 'status',
                        title: 'Статус',
                        align: 'center',
                        valign: 'inherit',
                    },
                    {
                        field: 'action',
                        title: 'Действия',
                        align: 'center',
                    }],
            onDblClickRow: function (row) {
                var url = $('[data-item-detail="'+ row.id +'"]').attr('href');
                if (url) {
                    window.location.href = url;
                }
            }
        })
    })
        .end()

        // Click "Delete" for order
        .on('click', 'a[name="delete"]', function(e){
            e.preventDefault();
            var pk = $(this).data('order');
            var table = $(this).closest('table');
            $.post(pk+'/delete/', function(data){
                if (data['status'] == 'success') {
                    noty({text: data['responseText'], type: data['status'], layout: 'topRight'});
                    $(table).bootstrapTable('remove', {field: 'id', values: [pk]}).bootstrapTable('refresh', {});
                }
            })

        })

        // // Click "Download" for order
        // .on('click', 'a[name="download"]', function(e){
        //     e.preventDefault();
        //     var pk = $(this).data('order');
        //     window.open('/manage/lk/services/' + pk + '/download/')
        // })
        //
        // // Click "Application to Contract" for order
        // .on('click', 'a[name="application"]', function(e){
        //     e.preventDefault();
        //     var pk = $(this).data('order');
        //     window.open('/manage/lk/services/' + pk + '/application/')
        // });


    $('.service_add').on('click', function(e){
        $('#payment').trigger('click');
    });

    if ($('.switch-default').length) {
        $(".switch-default").bootstrapSwitch({
            onText: 'Да',
            offText: 'Нет'
        });
    }

    if ($('.switch-field').length) {
        $(".switch-field").bootstrapSwitch({
            onText: 'Да',
            offText: 'Нет',
            onSwitchChange: function (event, state) {
                if (state) {
                    $('.switchable-field').css('display', 'none')
                }
                else {
                    $('.switchable-field').css('display', 'block')
                }
            }
        });
    }

    if ($('.select2-default').length) {
        $('.select2-default').select2();
    }

    // Confirmation dialog
    $('#confirm').on('click', function() {
        var url = $(this).data('url');
        bootbox.setDefaults({
            locale: "ru"
        });
        bootbox.confirm('После нажатия на кнопку "Применить" мы подготовим оригиналы ' +
            'документов и отправим их Почтой России заказным. Ответным письмом Вы должны ' +
            'отправить нам подписанные экземпляры оригиналов (контракт/договор, акт об оказании услуг) и гарантийное' +
            ' письмо (в случае, если Вы предоставляли его скан-копию).' +
            '', function(result) {
            if (result) {
                $.post(url, function () {
                    location.reload();
                })
            }
        });
    });
});