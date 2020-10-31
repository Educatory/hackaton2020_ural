$(function () {


    if ($('.switch').length) {
        $(".switch").bootstrapSwitch({
            onText: 'Да',
            offText: 'Нет'
        });

    }

    if ($('.select2-default').length) {

        $('.select2-default').select2()
            .on('change', function(){
                CheckingUchredType();
            });

        CheckingUchredType();
        function CheckingUchredType(){
            var $showable = $('#id_name_uchred');
            if ($('.select2-default').val() == 'YUR'){ $showable.parent().parent().show()}
            else {$showable.parent().parent().hide() }
        }

    }

    if ( $('.file-input').length ) {
        $('.file-input').fileinput({
            language: "ru",
            browseClass: 'btn btn-primary btn-icon',
            showRemove: false,
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
            maxFileSize: 200
        });
    }

    if ( $( "#menu-tree" ).length ) {
        $.getJSON("get_tree_menu/", function (data) {
            $('#menu-tree').treeview({
                data: data,
                enableLinks: true,
                highlightSelected: false,
                showTags: true,
                levels: 5,
                onhoverColor: 'transparent',
            });
        });
    }

    if ( $( "#structure-tree" ).length ) {
        $.getJSON("get_tree_data/", function (data) {
            $('#structure-tree').treeview({
                data: data,
                enableLinks: true,
                highlightSelected: false,
                showTags: true,
                levels: 5,
                onhoverColor: 'transparent',
            });
        });
    }

    $('#custom_boss').on('click', function(e){

        var $boss_wrapper = $('#changeble-fields1');
        var $boss_custom_wrapper = $('#changeble-fields2');
        var $help_block = $('#switch_text')

        if ($boss_wrapper.css('display') == 'none') {
            $boss_wrapper.css('display', 'initial');
            $boss_custom_wrapper.css('display', 'none');
            $help_block.text('Если руководитель не из числа педагогов')
        }
        else if ($boss_wrapper.css('display') != 'none') {
            var select = $boss_wrapper.find('select');

            $boss_wrapper.css('display', 'none');
            $boss_custom_wrapper.css('display', 'initial');
            $help_block.text('Если руководитель из числа педагогов')
        }
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
    })
});