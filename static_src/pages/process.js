$(function () {

  const $table = $('#table-process');

  $table.bootstrapTable({
        method: 'get',
        url: '?type=' + $table.attr('data-type'),
        striped: true,
        pagination: true,
        pageSize: 10,
        pageList: [10, 50, 100, 200],
        search: true,
        showFooter: false,
        showRefresh: false,
        showColumns: false,
        clickToSelect: true,
        toolbar: "#table-process-add, #table-data-ajax-delete #table-process-on-site",
        columns: [
            {
                field: 'state',
                checkbox: true,
                width: '1%'
            },
            {
                field: 'id',
                visible: false
            },
            {
                field: 'image',
                title: 'Изображение',
                align: 'left',
                valign: 'inherit',
                width: '7%',
                sortable: false,
                switchable: false
            },
            {
                field: 'name',
                title: 'Название',
                align: 'left',
                valign: 'inherit',
                sortable: true,
                switchable: false
            },
            {
                field: 'category',
                title: 'Категория',
                align: 'left',
                valign: 'inherit',
                width: '15%',
                sortable: true,
                switchable: false
            },
            {
                field: 'created',
                title: 'Дата создания',
                width: '5%',
                align: 'center',
                valign: 'inherit',
                switchable: true,
                visible: true,
                sortable: true
            },
            {
                field: 'changed',
                title: 'Дата изменения',
                width: '5%',
                align: 'center',
                valign: 'inherit',
                switchable: true,
                visible: true,
                sortable: true
            },
            {
                field: 'status',
                title: 'Статус на сайте',
                align: 'center',
                valign: 'inherit',
                width: '5%',
                sortable: true
            },
            {
                field: 'action',
                title: 'Действия',
                align: 'center',
                width: '2%',
                clickToSelect: false
            }],
        onDblClickRow: function (row) {
            window.location.href = $('[data-item-edit="'+ row.id +'"]').attr('href');
        }
    })
        .sortable({
            pullPlaceholder: false,
            containerSelector: 'table',
            itemPath: '> tbody',
            itemSelector: 'tr',
            delay: '200',
            placeholder: '<tr class="placeholder"/>',
            onDrag: function ($item, position) {
                $item.css({
                    left: position.left - adjustment.left,
                    top: position.top - adjustment.top
                });
            },
            onDragStart: function ($item, container, _super) {
                var offset = $item.offset(), pointer = container.rootGroup.pointer;
                adjustment = {
                    left: pointer.left - offset.left,
                    top: pointer.top - offset.top
                }
                _super($item, container)
            },

            onDrop: function  ($item, container, _super) {
                var array = [], lindex = $table.sortable("serialize").get()[0];

                for(var i = 0; i < lindex.length; i++){
                    var iindex = lindex[i]['index'];
                    var row = $table.bootstrapTable('getData')[iindex].id;
                    array.push({index: iindex, id: row})
                }
                $.post('sort/', JSON.stringify(array), function(data){
                    noty({text: data['responseText'], type: data['status'], layout: 'bottomRight', timeout: 2000});
                });
                _super($item, container);
            }
        })
        .on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
            $($table.selector + '-delete').prop('disabled', !$table.bootstrapTable('getSelections').length);
        });

    $($table.selector + '-add').on('click', function(e){
        e.preventDefault();
        window.location.href = $(this).data('url');
    });

    $($table.selector + '-delete').on('click', function(e){
        e.preventDefault();

        var ids = $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
        $.redirect('delete/', {csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(), items: ids }, 'post', '_self');
    });

    $('form').on('submit', function(){
        $.blockUI({
            message: '<span class="text-semibold"><i class="icon-spinner4 spinner position-left"></i>&nbsp; Пожалуйста, подождите ...</span>',
            overlayCSS: {
                backgroundColor: '#1b2024',
                opacity: 0.8,
                cursor: 'wait'
            },
            css: {
                border: 0,
                color: '#fff',
                padding: 0,
                backgroundColor: 'transparent'
            }
        });
    });


    $('.select2-default').select2();
});
