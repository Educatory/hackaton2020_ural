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
    })


    $(".switch").bootstrapSwitch({
        onText: 'Да',
        offText: 'Нет'
    });

    $('.select2-default').select2();

});