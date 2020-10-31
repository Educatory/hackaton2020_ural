$(function () {

  var $table = $('#table-documents');


  $(".file-input-file").fileinput({
    language: "ru",
    browseClass: 'btn btn-primary btn-icon',
    showRemove: false,
    showPreview: false,
    uploadLabel: '',
    uploadClass: 'btn btn-default btn-icon',
    browseIcon: '<i class="icon-plus22"></i> ',
    uploadIcon: '<i class="icon-file-upload"></i> ',
    removeClass: 'btn btn-danger btn-icon',
    removeIcon: '<i class="icon-cancel-square"></i> ',
    layoutTemplates: {
      caption: '<div tabindex="-1" class="form-control file-caption {class}">\n' + '<span class="icon-file-plus kv-caption-icon"></span><div class="file-caption-name"></div>\n' + '</div>'
    },
    overwriteInitial: true,
    allowedFileExtensions: ['docx', 'doc', 'odt', 'rtf', 'pdf', 'pptx', 'ppt', 'odp', 'xls', 'xlsx', 'ods', 'rar', '7z', 'zip'],
    maxFileSize: 20480
  });

  $('.select2-default').select2();
});
/* ------------------------------------------------------------------------------
 *
 *  # Datatables data sources
 *
 *  Demo JS code for datatable_data_sources.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------
var DatatableDataSources = function () {
  //
  // Setup module components
  //
  // Basic Datatable examples
  var _componentDatatableDataSources = function () {
    if (!$().DataTable) {
      console.warn('Warning - datatables.min.js is not loaded.');
      return;
    }

    // Setting datatable defaults
    $.extend($.fn.dataTable.defaults, {
      autoWidth: true,
      "ordering": true,
      dom: 'fBl<"toolbar"><"datatable-scroll-wrap"t><"datatable-footer"ip>',
      language: {
        search: '<span>Поиск:</span> _INPUT_',
        loadingRecords: "Пожалуйста, подождите - загрузка документов...",
        emptyTable: "Данные отсутствуют в таблице",
        info: "Показаны с _START_ по _END_ из _TOTAL_ документы",
        infoEmpty: "Нет документов",
        infoFiltered: "(отфильтровано из _MAX_ документов)",
        searchPlaceholder: 'Введите для поиска...',
        zeroRecords: "Совпадающих документов не найдено",
        lengthMenu: '<span>Показано:</span> _MENU_',
        paginate: {
          'first': 'First',
          'last': 'Last',
          'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;',
          'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;'
        }
      }
    });


  };

  // Select2 for length menu styling
  var _componentSelect2 = function () {
    if (!$().select2) {
      console.warn('Warning - select2.min.js is not loaded.');
      return;
    }

    // Initialize
    $('.dataTables_length select').select2({
      minimumResultsForSearch: Infinity,
      dropdownAutoWidth: true,
      width: 'auto'
    });
  };


  //
  // Return objects assigned to module
  //

  return {
    init: function () {
      _componentDatatableDataSources();
      _componentSelect2();
    }
  }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function () {
  DatatableDataSources.init();
  var table = $('.datatable-ajax').DataTable({
    ajax: "/manage/api/v1/docs/?format=datatables",
    buttons: [],
    pageLength: 25,
    "columnDefs": [
      {"targets": 0, "data": "id", visible: false},
      {
        "targets": 3, "data": "publish", "render": function (data, type, full) {
          if (data) {
            return '<span class="badge badge-success">На сайте</span>';
          } else {
            return '<span class="badge badge-warning">Скрыто</span>';
          }
        }
      },
      {
        "targets": 2, "data": "dtype", "render": function (data, type, full) {
          if (data) {
            return data;
          } else {
            return '<span class="badge badge-flat border-danger text-danger-600 d-block">Без категории</span>';
          }
        }
      },

    ],
    "fnDrawCallback": function (oSettings) {
      $('#toolbar-categories').prependTo($('#table-_wrapper'));
    },
  });
  $("div.toolbar").html($('.toolbar-categories'));
  $('.btn-filter-catogory').on('click', function () {
        table.dataTable.columns().search('');
        var rel = $(this).attr('rel');
        if (rel) {
          if (rel != 'False') {
            table.columns(2).search(rel, false).draw();
            $('.btn-filter-name').html('Категория: ' + rel);
          } else {
            table.columns(2).search('isnull', false).draw();
            $('.btn-filter-name').html('Категория: -');
          }
        } else {
          $('.btn-filter-name').html('Фильтр по категориям');
          table.draw();
        }
      });
});


