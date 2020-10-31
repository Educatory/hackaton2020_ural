// К сожалению, денег на нормального frontend developer не хватает.
// Поэтому тут написан, полный бред.

$(function () {

    var $fm_modal = $('#file_manager_modal'),
        $fm_modal_form = $('#file_manager_form'),
        $table = $('#ImageManager-table');
    var s_add, s_edit, s_delete;

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

        var dom_target = $(this).data('dom');
        var ids = $(this).data('ids');

        $fm_modal.modal('show');

        $fm_modal.on('hide.bs.modal');

        $fm_modal.on('shown.bs.modal', function(){

            var radio = $table.attr('data-radio'),
                checkbox = $table.attr('data-checkbox');

            s_add = [];
            s_delete = [];
            s_edit = [];

            $table.bootstrapTable({
                method: 'get',
                striped: true,
                pagination: true,
                pageSize: 10,
                pageList: [10, 50, 100, 200],
                search: true,
                showFooter: false,
                showRefresh: false,
                showColumns: false,
                clickToSelect: true,
                toolbar: "#ImageManager-add , .ImageManager-submit",
                columns: [
                    {
                        field: 'state',
                        checkbox: checkbox,
                        radio: radio,
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
                    }],
                onDblClickRow: function () {
                    $fm_modal.modal('hide');
                }
            })
                .on('check.bs.table uncheck.bs.table', function () {
                    $('.ImageManager-submit').prop('disabled', !$table.bootstrapTable('getSelections').length);
                });
        });

        $('.ImageManager-submit').on('click', function(){
            $fm_modal.modal('hide');
        });

        // Удаление объекта ФМ.
        $table.on('click', '.fm-delete-item', function(e){
            e.preventDefault();
            $.post($(this).data('url'), function(data){
                noty({text: data.statusText, type: data.status, layout: 'bottomRight', timeout: 2000});
                $table.bootstrapTable('refresh');
                s_delete.push(data.obj); // Собираем удаленные объекты.
                CheckFMdeleted(dom_target, data.obj); // Проверяем, не удален ли выбранный до этого объект.
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
                    maxFileSize: 10000
                });
            });
        });

        // После успешной загрузки данных для таблицы, если есть выбранный объект, выбираем его и в таблице.
        $table.on('load-success.bs.table', function(){
            if (ids != 'None'){
                $table.bootstrapTable('checkBy', {field:"pk", values:[ids]});
            }
        });

        // Если модаль ФМ закрыватся кликом на X или кнопкой Закрыть, то закрываем ее проверяя на совершенные действия.
        $('.btn-close-fm').on('click', function(){
            CheckFMaction($fm_modal, s_add, s_delete);
        });

        // Окончание работы с ФМ, закрытие ФМ:
        $fm_modal.on('hide.bs.modal', function(){
            var row = $table.bootstrapTable('getSelections')[0];
            // Если были добавленные объекты, проходимся по ним, и добавляем их в селект.
            if (typeof s_add !== 'undefined' && s_add.length > 0) {
                $.each(s_add, function( index, value ){
                    $('#' + dom_target).append(
                        $("<option></option>")
                            .attr("value",value.pk)
                            .text(value['image_path']));
                });
            }
            // Если были удаленные объекты, проходимся по ним, и удалем их селекта.
            if (typeof s_delete !== 'undefined' && s_delete.length > 0) {
                $.each(s_delete, function( index, value ){
                    $("#" + dom_target + " option[value='" + value.pk +"']").remove();
                });
            }

            if (typeof row != 'undefined') {
                $('#' + dom_target).val(row.pk).change();
                $('#' + dom_target + '_preview').attr({"src":row['image_path'], "height":'100%' }).css('display', 'block');
            }
        });
    });

    // Если модаль ФМ закрыватся кликом за пределами модали, то закрываем ее проверяя на совершенные действия.
    $(document).click( function(event){
        if (event.target === $fm_modal[0] && $('body').hasClass('modal-open')) {
            CheckFMaction($fm_modal, s_add, s_delete);
        }
    });

    // Очищаем превью выбранного и ставим пустой селект, по клику на кнопку "Очистить"
    $('#unselect').on('click', function(){
        var dom_target = $(this).data('dom');
        unselectItem(dom_target);
    });

    // Если были какие то действия(добавление, удаление, изменение), передаем обработать event'y на закрытие модали,
    // если нет, то отключаем event и закрываем модаль.
    function CheckFMaction($fm_modal, s_add, s_delete) {
        if (typeof s_delete !== 'undefined' && s_delete.length > 0){
            $fm_modal.modal('hide');
            return;
        }
        else if (typeof s_add !== 'undefined' && s_add.length > 0) {
            $fm_modal.modal('hide');
            return;
        }
        else if (typeof s_edit !== 'undefined' && s_edit.length > 0) {
            $fm_modal.modal('hide');
            return;
        }
        $fm_modal.off('hide.bs.modal');
        $fm_modal.unbind('hide');
        $fm_modal.modal('hide');
    }

    // Если файл удален из ФМ, а до этого был выбран, удаляет его превью
    function CheckFMdeleted(dom_target, obj) {
        if ($('#' + dom_target).val() == obj.pk){
            unselectItem(dom_target);
        }
    }

    // Очистка выбранного
    function unselectItem(dom_target) {
        $('#' + dom_target).val('').change();                               // "//:0" используется, потому что при пустом
        $('#' + dom_target + '_preview').attr({"src":'//:0', 'height': 0}); // src, появляется пустой серый квадрат.
    }

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
    $("#dropzonefiles2").dropzone({
        paramName: "upload", // The name that will be used to transfer the file
        dictDefaultMessage: "Перетащите сюда файлы изображений <span>или КЛИКНИТЕ</span>",
        dictFallbackMessage: "Ваш браузер не поддерживает drag'n'drop загрузку.",
        dictInvalidFileType: "Тип файла не поддерживается",
        dictFileTooBig: "Слишком большой размер файла {{filesize}}MB. Максимум {{maxFilesize}}MB.",
        dictMaxFilesExceeded: "Слишком много файлов для загрузки",
        maxFilesize: 10, // MB
        filesizeBase: 1024,
        acceptedFiles: 'image/jpeg,image/png,image/gif',
        maxFiles: 100,
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