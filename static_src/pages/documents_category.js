$(function () {

  var $table = $('#table-documents-category');

  $table.bootstrapTable({
    method: 'get',
    url: '?type=' + $table.attr('data-type'),
    striped: false,
    pagination: true,
    pageSize: 10,
    pageList: [10, 50, 100, 200],
    search: true,
    showFooter: false,
    showRefresh: false,
    showColumns: false,
    clickToSelect: true,
    toolbar: "#table-documents-category-add, #table-documents-category-delete, #table-document-add, #table-documents-list",
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
        field: 'docs_count',
        title: 'Кол-во документов',
        align: 'center',
        valign: 'inherit',
        sortable: true,
        switchable: false
      },
      {
        field: 'docs_publish_count',
        title: 'Кол-во опубликованных на сайте документов',
        align: 'center',
        valign: 'inherit',
        sortable: true,
        switchable: false
      },


      {
        field: 'action',
        title: 'Действия',
        align: 'center',
        width: '2%',
        clickToSelect: false,
      }]
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
          backgroundColor: 23232,
          left: position.left - adjustment.left,
          top: position.top - adjustment.top
        })
      },
      onDragStart: function ($item, container, _super) {
        var offset = $item.offset(), pointer = container.rootGroup.pointer;
        adjustment = {
          left: pointer.left - offset.left,
          top: pointer.top - offset.top
        }
        _super($item, container)
      },
      onDrop: function ($item, container, _super) {
        var array = [], lindex = $table.sortable("serialize").get()[0];

        for (var i = 0; i < lindex.length; i++) {
          var iindex = lindex[i]['index'];
          var row = $table.bootstrapTable('getData')[iindex].id;
          array.push({index: iindex, id: row})
        }
        $.post('sort/', JSON.stringify(array), function (data) {
          noty({text: data['responseText'], type: data['status'], layout: 'bottomRight', timeout: 2000});
        });
        _super($item, container);
      }
    })
    .on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
      $('#table-documents-category-delete').prop('disabled', !$table.bootstrapTable('getSelections').length);
    });
  $('#table-documents-category-add').on('click', function (e) {
    e.preventDefault();
    window.location.href = $(this).data('url');
  });

  $('#table-documents-category-delete').on('click', function (e) {
    e.preventDefault();

    var ids = $.map($table.bootstrapTable('getSelections'), function (row) {
      return row.id
    });
    $.redirect('delete/', {
      csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
      items: ids
    }, 'post', '_self');
  });
});
