// К сожалению, денег на нормального frontend developer не хватает.
// Поэтому тут написан, полный бред.

$(function () {


  var $table = $('#table-gallery-photos');

  $table.bootstrapTable({
    method: 'get',
    url: $table.attr('data-url') + '?type=' + $table.attr('data-type'),
    striped: true,
    pagination: true,
    pageSize: 10,
    pageList: [10, 50, 100, 200],
    search: true,
    showFooter: false,
    showRefresh: false,
    showColumns: false,
    clickToSelect: true,
    toolbar: "#table-gallery-photos-add, #table-gallery-photos-delete, #table-gallery-photos-on-site",
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
        title: 'Фотография',
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
        sortable: false,
        switchable: false
      },
      {
        field: 'created',
        title: 'Дата создания',
        width: '5%',
        align: 'center',
        valign: 'inherit',
        switchable: true,
        visible: false,
        sortable: true
      },
      {
        field: 'cover',
        title: 'Обложка',
        align: 'center',
        valign: 'inherit',
        width: '1%',
        sortable: false
      },
      {
        field: 'action',
        title: 'Действия',
        align: 'center',
        width: '2%',
        clickToSelect: false
      }],
    onDblClickRow: function (row) {
      window.location.href = $('[data-item-edit="' + row.id + '"]').attr('href');
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
          // new Noty({
          // text: data['responseText'],
          // type: 'success',
          // theme: 'light',
          // layout: 'topRight',
          // }).show();
          noty({text: data['responseText'], type: data['status'], layout: 'bottomRight', timeout: 3000});
        });
        _super($item, container);
      }
    })
    .on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
      $('#table-gallery-photos-delete').prop('disabled', !$table.bootstrapTable('getSelections').length);
    });

  $($table.selector + '-add').on('click', function (e) {
    e.preventDefault();
    window.location.href = $(this).data('url');
  });

  $('#table-gallery-photos-delete').on('click', function (e) {
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
