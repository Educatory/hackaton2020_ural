//Bootstrap-table
$.extend($.fn.bootstrapTable.defaults, {
  locale: 'ru-RU',
  buttonsAlign: 'left',
  // buttonsClass: 'primary',
  searchAlign: 'left',
  showRefresh: true,
  iconSize: 'xs',
  dataField: "results",
  sortable: true,
  pagination: "true",
  pageSize: 25,
  pageList: [10, 25, 50, 100, 200],
  search: "true",
  idField: "id",
  showColumns: false,
  loadingFontSize: '14px',
  // serverSort: 'false',
  showButtonIcons: 'true',
  // showExtendedPagination: 'true',
  showFooter: 'false',
  // showPaginationSwitch: 'true',
  // showFullscreen: "true",
  // sidePagination: 'server',
  // silentSort: 'false',
  theadClasses: 'thead-light',
  toolbar: '#toolbar',
  toolbarAlign: 'right',
  // totalField: 'count',
  // showToggle: 'true',
  visibleSearch: 'true',
  // queryParams: 'queryParams',
  classes: 'table table-bordered table-hover table-sm'
});

$(document).ready(function () {
  const $table = $('.table-btdata');
  if ($table.length) {
    // console.log($table);
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
      $('#table-data-ajax-delete').prop('disabled', !$table.bootstrapTable('getSelections').length);
    });
  }
  $('#table-data-ajax-delete').on('click', function (e) {
    e.preventDefault();
    const table = $('table-btdata');
    var ids = $.map($table.bootstrapTable('getSelections'), function (row) {
      return row.id
    });
    $.redirect('delete/', {
      csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
      items: ids
    }, 'post', '_self');
  });
});

function queryParams(params) {
  params.format = 'datatables';
  params.length = params.limit;
  params.start = params.offset;
  return params
}

function publishFormatter(value) {
  if (value == true) {
    return '<span class="badge badge-success">На сайте</span>'
  } else {
    return '<span class="badge badge-secondary">Скрыт</span>'
  }
}

function anonymousFormatter(value) {
  if (value == true) {
    return '<span class="badge badge-flat border-success text-success-600">' +
      'Ананимно</span>'
  } else {
    return '<span class="badge badge-flat border-secondary text-secondary-600">Доступен всем</span>'
  }
}
