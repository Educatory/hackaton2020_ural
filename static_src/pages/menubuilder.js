$(function () {

  // if ($("#menu_tree").length) {
  //   function get_menu_tree() {
  //     $.getJSON("get_tree_data/", function (data) {
  //       $('#menu_tree').treeview({
  //         data: data,
  //         enableLinks: true,
  //         highlightSelected: false,
  //         onhoverColor: '#ccc',
  //         showTags: true,
  //         levels: 10,
  //         borderColor: '#fff',
  //         showBorder: true
  //       }).on('click', '.menu-status', function (e) {
  //         e.preventDefault();
  //         var $link = $(this);
  //         $.post($link.attr('href'), function (response) {
  //           if (response.status = 'success') {
  //             get_menu_tree();
  //             $('#jstree_div').jstree('destroy');
  //             sort_menu_tree();
  //             move_node_jstree();
  //             $.jGrowl(response.text, {
  //               header: 'Элемент сохранен',
  //               theme: 'alert-styled-left alert-arrow-left alert-' + response.type + ' border-lg'
  //             });
  //             // noty({text: response.text, type: response.type, layout: 'topCenter', timeout: 2500});
  //           }
  //         })
  //       });
  //       $('#menu_tree').treeview('collapseNode', [1]);
  //
  //     });
  //   }
  // }
  //
  // get_menu_tree();


  //
  // $.jstree.defaults.core.themes.variant = "large";

  function blockUI() {
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
  }

  $('#jstree_div').on("move_node.jstree.jstree", function (e, data) {
      data = $(this).jstree().get_json('#', {flat: true});
      blockUI();
      $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        url: 'jstree_sort/',

        success: function (data) {
          // get_menu_tree();
          $.unblockUI();
          noty({text: data['responseText'], type: data['status'], layout: 'topRight', timeout: 2000});

        }
      })
    });


  function sort_menu_tree() {
    $.ajax({
      async: true,
      type: "GET",
      url: $('#jstree_div').data('json-url'),
      dataType: "json",
      success: function (json) {
        createMenuTree(json);
      },


      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
    });
  };

  function createMenuTree(jsonData) {
    $('#jstree_div').jstree({
      // var jsonData = sort_menu_tree();
      "core": {
        "strings": {
          'Loading ...': 'Пожалуйста, подождите ...'
        },
        "animation": 200,
        "themes": {"stripes": true},
        'load_open': true,
        "check_callback": function (operation, node, node_parent, node_position, more) {
          if (operation == 'move_node') {
            if (node_parent.type == 'dropabble' || node_parent.type == 'full_dnd') {
              return true
            } else
              return false;
          }
        },
        "data": jsonData,
      },
      "types": {
        "default": {
          "icon": "icon-blocked text-muted"
        },
        "root_draggable": {
          "icon": "icon-menu4 text-success",
          'valid_children': ['root']
        },
        "full_dnd": {
          "icon": "icon-menu4 text-primary",
          'valid_children': ['full_dnd']
        },
        "dropabble": {
          "icon": "icon-menu3 text-success",
          'valid_children': ['root_draggable', 'full_dnd']
        }
      },
      "dnd": {
        "is_draggable": function (node) {
          if ((node[0].type != 'root_draggable') && (node[0].type != 'full_dnd')) {
            // noty('Этот пункт меню не может быть перемещён.');
            noty({text: 'Этот пункт меню не может быть перемещён.', type: 'error', layout: 'topRight', timeout: 2000});
            return false;
          }
          return true;
        }
      },
      "plugins": [
        "dnd",
        "state",
        "types",
        'wholerow',
        // 'contextmenu'
      ]
    });
  };

  sort_menu_tree();

  $('body').on('onchange', '.nodeInfo', function (event) {
    event.preventDefault();
    event.stopPropagation();
    alert('test');
  });
//   $('#jstree_div').on("hover_node.jstree", function (e, data) {
//     console.log(data, e)
// });
  var $checkbox = $('.show-menu input[type=checkbox]').on('change', function () {
    // $checkbox.not(this).prop('checked', false).click();
    var changebox = $checkbox.not(this);
    changebox.each(function (index) {
       if (this.checked){
         this.click();
       }
    });
    if (this.checked === true) {
      var url_path = $('#jstree_div').data('json-url') + '?menu=' + $(this).data('menu')
    } else {
      var url_path = $('#jstree_div').data('json-url')
    }

    $.ajax({
      async: true,
      type: "GET",
      url: url_path,
      dataType: "json",
      success: function (json) {
        $('#jstree_div').jstree('destroy');
        if (json.length > 0) {
          createMenuTree(json);
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
    });
  });
  $('#jstree_div').on('click', 'a.btn-action', function () {
    location.href(this.href);
  });

});
