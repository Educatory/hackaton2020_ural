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
      errMode:"throw",
      serverSide: true,
      autoWidth: true,
      responsive: {
        details: false
      },
      ordering: true,
      processing: true,
      dom: 'fB<"toolbar"><""t>r<"datatable-footer"ipl>',
      showSearchClearButton: true,
      buttons: [],
      select: {
        style: 'multi',
      },
      language: {
        search: '<span>Поиск:</span> _INPUT_',
        loadingRecords: "Пожалуйста, подождите",
        emptyTable: "Данные отсутствуют в таблице",
        info: "Показаны с _START_ по _END_ из _TOTAL_ записи",
        infoEmpty: "Нет записей",
        infoFiltered: "(отфильтровано из _MAX_ документов)",
        searchPlaceholder: 'Введите для поиска...',
        zeroRecords: "Нет данных",
        lengthMenu: '<span>Показано:</span> _MENU_',
        paginate: {
          'first': 'First',
          'last': 'Last',
          'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;',
          'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;'
        },
        processing: "<i class='fas fa-spinner fa-pulse'></i><h3>Загрузка данных...</h3>",
        loadingRecords: "Пожалуйста, подождите - загрузка..."
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
  };
}();


// Initialize module
// ------------------------------
document.addEventListener('DOMContentLoaded', function () {
  DatatableDataSources.init();
  var table = $('table.datatable-ajax');
  if (table.length > 0) {
    var $table = table.DataTable({
      autoWidth: true,
      "fnDrawCallback": function (oSettings) {
        $('#toolbar-categories').prependTo($('#table-_wrapper'));
        var api = this.api();
        // Пытаемся сделать рендер для столбцов
        // var data = api.cells().render();
        // console.log( data );
        // $(api.rows().data()).each(function (index, data) {
        //   console.log(index + '-> ' + data);
        //   if (data.on_main) {
        // api.columns.data('on_main').render=function (data, type, row) {
        //   return '$' + data;
        // }
        //   }
        // });
        // console.log(api.rows({page: 'current'}).data());

        // Если таблице есть switch активируем и вешаем на него пост запрос
        if ($('.datatable-ajax .switch').length) {
          $(".switch")
            .bootstrapSwitch({
              onText: 'Да',
              offText: 'Нет',
            })
            .on('switchChange.bootstrapSwitch', function (event, state) {
              console.log(event, state);
              $form = $(this).closest("form");
              if (state == true) {
                data = {'state': state};
              } else {
                data = {}
              }
              action = $form[0].action;
              $.ajax({
                type: 'POST',
                url: action,
                data: data,
                success: function (data) {
                  if (data.status) {
                    noty({text: data['responseText'], type: 'success', layout: 'topRight', timeout: 3000});
                  } else {
                    noty({text: data['responseText'], type: 'warning', layout: 'topRight', timeout: 3000});
                  }
                  api.ajax.reload();
                },
                error: function (response) {
                  console.log(response);
                }
              });
              // $(this).closest("form").submit();
              // $.blockUI({
              //   message: '<span class="text-semibold"><i class="icon-spinner4 spinner position-left"></i>&nbsp; Пожалуйста, подождите ...</span>',
              //   overlayCSS: {
              //     backgroundColor: '#1b2024',
              //     opacity: 0.8,
              //     cursor: 'wait'
              //   },
              //   css: {
              //     border: 0,
              //     color: '#fff',
              //     padding: 0,
              //     backgroundColor: 'transparent'
              //   }
              // });
            });
        }
      },
    });

    $("div.toolbar").html($('#toolbar'));

    // Фильтер по категориям в документах
    $('.btn-filter-catogory').on('click', function () {
      $table.columns().search('');
      var rel = $(this).attr('rel');
      if (rel) {
        if (rel != 'False') {
          $table.columns(3).search(rel, false).draw();
          $('.btn-filter-name').html('Категория: ' + rel);
        } else {
          $table.columns(3).search('isnull', false).draw();
          $('.btn-filter-name').html('Категория: -');
        }
      } else {
        $('.btn-filter-name').html('Фильтр по категориям');
        $table.draw();
      }
    });

    // Фильтер по статусу для всех таблиц с полем publish
    $('.btn-filter-status').on('click', function () {
      // console.log($.trim(this.text));
      var _title_btn = $.trim(this.text)
      var action = $(this).data("action");
      // Паттерн для поля поиска нужному поля
      // Сначло проверяем по полю on_main
      if (action) {
        var publish_name = $table.columns(action + ':name')
        if (publish_name[0].length > 0) {
          var search_filed = action + ':name';
          var btn_action = '.btn-filter-on_main'
          var rel = $(this).attr('rel');

        }
      } else {
        // Далее по полям publish и visible
        var publish_name = $table.columns('publish:name')
        var visible_name = $table.columns('visible:name')
        var teacher_name = $table.columns('teacher:name')
        if (publish_name[0].length > 0) {
          var search_filed = 'publish:name';
          var btn_action = '.btn-filter-publish'
          var rel = $(this).attr('rel');
        }
        if (visible_name[0].length > 0) {
          var search_filed = 'visible:name';
          var btn_action = '.btn-filter-publish'
          var rel = $(this).attr('rel');
        }
        if (teacher_name[0].length > 0) {
          var search_filed = 'teacher:name';
          var btn_action = '.btn-filter-publish'
          var rel = $(this).attr('rel');
        }
      }
      if (rel) {
        serch_publish(rel, search_filed, btn_action)
      } else {
        $(btn_action).html('<i class="fas fa-filter"></i>');
        $table.columns().search('');
        $table.draw();
      }

      function serch_publish(rel, column, btn_action) {
        // $table.columns().search('');
        if (rel != 'False') {
          $table.columns(search_filed).search(rel, false).draw();
          $(btn_action).html('<i class="fas fa-filter text-success"></i>'+_title_btn);
        } else {
          $table.columns(search_filed).search(rel, false).draw();
          $(btn_action).html('<i class="fas fa-filter text-danger"></i>'+_title_btn);
        }
      }
    });

    // Deleted button
    $table.on('select deselect', function () {
      var selectedRows = $table.rows({selected: true}).count();
      $('#table-data-ajax-delete').enable(selectedRows > 0);
    });
    $('#table-data-ajax-delete').on('click', function (e) {
      e.preventDefault();
      var selectedRows = $.map($table.rows({selected: true}).data(), function (row) {
        return row.id
      });
      // console.log(selectedRows)
      $.redirect('delete/', {
        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
        items: selectedRows
      }, 'post', '_self');
    });
    $table.data()
    // Дебаг
    // var n = document.createElement('script');
    // n.setAttribute('language', 'JavaScript');
    // n.setAttribute('src', '//debug.datatables.net/debug.js');
    // document.body.appendChild(n);
  }
});


