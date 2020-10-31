// К сожалению, денег на нормального frontend developer не хватает.
// Поэтому тут написан, полный бред.

$(function () {


    var $fm_modal = $('#file_manager_modal'),
        $fm_modal_form = $('#file_manager_form'),
        $table = $('#ImageManager-table');

    // ???Если открывается несколько диалогов, после закрытия, предшествующий диалог не скролится.
    // Данный "кусок" решает эту проблему.
    $('body')
        .on('hidden.bs.modal', '.modal', function () {
            var activeModal = $('.modal.in:last', 'body').data('bs.modal');
            if (activeModal) {
                activeModal.$body.addClass('modal-open');
                activeModal.enforceFocus();
                activeModal.handleUpdate();
            }
        })
        // Сабмит формы редактирования файла в ФМ
        .on('submit', '#file_manager_form_edit form', function(e){
            e.preventDefault();
            var options = {
                success: function(data) {
                    $('#file_manager_form_edit').modal('hide');
                    $table.bootstrapTable('refresh');
                    s_edit.push(data);
                }
            };
            $(this).ajaxSubmit(options)
        });

    $('#get_file_manager').on('click', function(){

        // var dom_target = $(this).data('dom');
        var images_ids = $(this).data('ids');

        $fm_modal.modal('show');

        $fm_modal.on('hide.bs.modal');

        $fm_modal.on('shown.bs.modal', function(){

            var radio = $table.attr('data-radio'),
                checkbox = $table.attr('data-checkbox');

            $table.bootstrapTable({
                method: 'get',
              // showColumns: true,
                clickToSelect: true,
                toolbar: "#ImageManager-add , .ImageManager-submit",
                columns: [
                    {
                        field: 'state',
                        checkbox: checkbox,
                        radio: radio,
                        sortable: true,
                        order: 'asc',
                        width: '1%'
                    },
                    {
                        field: 'pk',
                        visible: false
                    },
                    {
                        field: 'image_html',
                        title: 'Изображение',
                        align: 'center',
                        width: '1%',
                        sortable: false,
                        switchable: false
                    },
                    {
                        field: 'name',
                        title: 'Название',
                        align: 'left',
                        valign: 'inherit',
                        sortable: true,
                        switchable: false
                    },
                    {
                        field: 'date_created',
                        title: 'Дата создания',
                        width: '5%',
                        align: 'center',
                        valign: 'inherit',
                        switchable: true,
                        sortable: true
                    },

                    {
                        field: 'size',
                        title: 'Размер',
                        align: 'center',
                        valign: 'inherit',
                        width: '5%',
                        sortable: true,
                        sorter: sizeSorter
                    },
                    {
                        field: 'action',
                        title: 'Действия',
                        align: 'center',
                        width: '2%',
                        clickToSelect: false
                    }]
            })
        });

        $('.ImageManager-submit').on('click', function(){
            var ids = $.map($table.bootstrapTable('getSelections'), function (row) {
                return row.pk
            });

            $.post('.', {'data':ids, csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()}, function(data){
                window.location.replace(data['success_url']);
            })
        });

        // Удаление объекта ФМ.
        $table.on('click', '.fm-delete-item', function(e){
            e.preventDefault();
            $.post($(this).data('url'), function(data){
                noty({text: data.statusText, type: data.status, layout: 'bottomRight', timeout: 2000});
                $table.bootstrapTable('refresh');
            })
        });

        // Редактирование объекта ФМ.
        $table.on('click', '.fm-edit-item', function(e){
            e.preventDefault();
            $('#file_manager_form_edit').remove();
            $.get($(this).data('url'), function(data){
                $('#modals_wrapper').append(data.modal);
                $('#file_manager_form_edit').modal('show');
                $(".file-input-image").fileinput({
                    language: "ru",
                    browseClass: 'btn btn-primary btn-icon',
                    showRemove: false,
                    showPreview: false,
                    uploadLabel: '',
                    uploadClass: 'btn btn-default btn-icon',
                    browseIcon: '<i class="icon-plus22"></i>',
                    uploadIcon: '<i class="icon-file-upload"></i>',
                    removeClass: 'btn btn-danger btn-icon',
                    removeIcon: '<i class="icon-cancel-square"></i>',
                    layoutTemplates: {
                        caption: '<div tabindex="-1" class="form-control file-caption {class}">\n' + '<span class="icon-file-plus kv-caption-icon"></span><div class="file-caption-name"></div>\n' + '</div>'
                    },
                    overwriteInitial: true,
                    allowedFileExtensions: ['gif', 'jpeg', 'jpg', 'pjpeg', 'png', 'svg+xml', 'tiff'],
                    maxFileSize: 400
                });
            });
        });

        // После успешной загрузки данных для таблицы, если есть выбранный объект, выбираем его и в таблице.
        $table.on('load-success.bs.table', function(){
            if (images_ids != 'None'){
                $table.bootstrapTable('checkBy', {field:"pk", values:images_ids});
            }
        });

       // Окончание работы с ФМ, закрытие ФМ:
        $fm_modal.on('hide.bs.modal', function(){
            location.reload();
        });

    });

    // Сортировка по размеру файла
    function sizeSorter(a, b) {
        a = +a.substring(0, a.length - 1); // remove SIZE format
        b = +b.substring(0, b.length - 1);
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    }

    // При закрытии модали загрузка файлов, обновляем таблицу ФМ.
    $fm_modal_form.on('hide.bs.modal', function(){
        $table.bootstrapTable('refresh');
        return true;
    });

    // Загрузчик файлов multiple
    $("#dropzone_files").dropzone({
        paramName: "upload", // The name that will be used to transfer the file
        dictDefaultMessage: "Перетащите сюда файлы изображений <span>или КЛИКНИТЕ</span>",
        dictFallbackMessage: "Ваш браузер не поддерживает drag'n'drop загрузку.",
        dictInvalidFileType: "Тип файла не поддерживается",
        dictFileTooBig: "Слишком большой размер файла {{filesize}}MB. Максимум {{maxFilesize}}MB.",
        dictMaxFilesExceeded: "Слишком много файлов для загрузки",
        maxFilesize: 10, // MB
        filesizeBase: 1024,
        acceptedFiles: 'image/*',
        maxFiles: 10,
        parallelUploads: 1,
        uploadMultiple: false,
        autoProcessQueue: true,
        init: function() {
            this.on("success", function(file, response) {
                s_add.push(response);  // Собираем добавленные объекты.
            });
        }
    });
});
