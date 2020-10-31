$(function () {


    var $panel = $('.card.card-ticket');
    var unread = $panel.find('.unread');

    if (unread.length > 0) {
        $('html').animate({scrollTop: $(unread[0]).offset().top}, 500);
        unread.each(function (index, element) {
            $(element).animate({backgroundColor: "#FFF"}, 3000, function () {
                $.ajax({
                    async: true,
                    type: "GET",
                    url: '',
                    // dataType: "json",
                    data: {'unread': $(element).data('id')},
                    success: function (json) {
                        console.log(json);
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log('error ajax unread');
                    }
                });
            });
        });

    }

    // // Скролим к концу сообщений при раскрытии тикета.
    // $('.panel.panel-ticket').on('shown.bs.collapse', function (e) {
    //     var $panel = $(this)
    //     var $tickets = $(this).find('[id^="ticket-message"]');
    //
    //     $tickets.each(function(index, element){
    //         if (index === $tickets.length - 1) {
    //             $('body').animate({scrollTop: $(element).position().top});
    //             $('#collapsible-' + $panel.attr('data-ticket') + ' .media-list').animate({scrollTop: $(element).position().top});
    //         }
    //     })
    // })


    $(".file-input").fileinput({
        language: "ru",
        browseClass: 'btn btn-primary btn-icon',
        showCancel: false,
        showZoom: false,
        showClose: false,
        showUpload: false,
        uploadLabel: '',
        indicatorNew: '',
        uploadClass: 'btn btn-default btn-icon',
        browseIcon: '<i class="icon-plus22"></i> ',
        uploadIcon: '<i class="icon-file-upload"></i> ',
        removeClass: 'btn btn-danger btn-icon',
        removeIcon: '<i class="icon-cancel-square"></i> ',
        layoutTemplates: {
            caption: '<div tabindex="-1" class="form-control file-caption {class}">\n' + '<span class="icon-file-plus kv-caption-icon"></span><div class="file-caption-name"></div>\n' + '</div>',
            footer: ''
        },
        overwriteInitial: true,
        maxFileSize: 600
    })
        .on('fileclear', function (event) {
            $('input[name$="-clear"]').each(function (index, element) {
                $(element).prop('checked', true);
                console.log(element)
            })
            console.log("fileclear");
        });

    $('form').on('submit', function () {
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
});