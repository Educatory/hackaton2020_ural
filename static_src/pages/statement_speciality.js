$(function () {

    var $table = $('#table-specialities');

    $table.bootstrapTable({
        method: 'get',
        url: '?type=' + $table.attr('data-type'),
        striped: true,
        pagination: true,
        pageSize: 10,
        pageList: [10, 50, 100, 200],
        search: true,
        showFooter: false,
        showRefresh: true,
        showColumns: true,
        clickToSelect: true,
        toolbar: "#table-specialities-add",
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
                field: 'name',
                title: 'Название',
                align: 'left',
                valign: 'inherit',
                sortable: true,
                switchable: false
            },
            {
                field: 'edu_program',
                title: 'Образовательная программа',
                align: 'left',
                valign: 'inherit',
                sortable: true,
            },
            {
                field: 'active',
                title: 'Статус',
                valign: 'inherit',
                width: '1%',
                sortable: true,
            },
            {
                field: 'action',
                title: 'Действия',
                align: 'center',
                width: '2%',
                clickToSelect: false,
            }]
    })

    $($table.selector + '-add').on('click', function(e){
        e.preventDefault();
        window.location.href = $(this).data('url');
    });
});