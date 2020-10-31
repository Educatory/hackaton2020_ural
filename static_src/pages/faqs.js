$(function () {


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
    if ($('.file-input-alone').length) {
        $(".file-input-alone").fileinput({
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
            maxFileSize: 20480
        });
    };

    $(".switch").bootstrapSwitch({
        onText: 'Да',
        offText: 'Нет'
    });

    // $('.select2-default').select2();

});
