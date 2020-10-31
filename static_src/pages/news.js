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
      autoWidth: false,
      dom: '<"datatable-header"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
      language: {
        search: '<span>Поиск:</span> _INPUT_',
        emptyTable: "Данные отсутствуют в таблице",
        info: "Показаны записи с _START_ по _END_ из _TOTAL_ записей",
        searchPlaceholder: 'Введите для поиска...',
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
  var  table = $('.datatable-ajax').dataTable({
      "ajax": '/manage/api/v1/news/?format=datatables',
      "order": [[ 2, "desc" ]],
      buttons: [
        {
          text: 'Добавить новость',
          className: 'btn bg-teal-400',
          action: function (e, dt, node, config) {
            window.location = 'add/';
          }
        }
      ],
      pageLength: 10,
      "columnDefs": [
        {"targets": 0, "data": "id", visible: false},
        {
          "targets": 1, "data": "image", "render": function (url, type, full) {
            return '<img src="' + url + '"/>';
          }
        },
        {
          "targets": 4, "data": "image", "render": function (data, type, full) {
            if (data) {
              return '<span class="badge badge-success">На сайте</span>';
            } else {
              return '<span class="badge badge-warning">Скрыто</span>';
            }
          }
        },

      ],
      "columns": [
        {"data": "id"},
        {"data": "image"},
        {"data": "date"},
        {"data": "title"},
        {"data": "publish"},
        {"data": "show_count"},
      ],
    });
});


