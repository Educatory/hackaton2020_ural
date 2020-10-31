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

    if ($('.switch').length) {
        $(".switch").bootstrapSwitch({
            onText: 'Да',
            offText: 'Нет'
        });
    }
    if ($('.select2-default').length) {
        $('.select2-default').select2();
    }

    if ($('.datetimepicker').length) {
        $('.datetimepicker').datetimepicker({
            locale: 'ru',
            format: 'YYYY-MM-DD HH:mm',
        });
    }
    // #######################

    $('a#new_answer').click(function(e){
        e.preventDefault();
        var action=$(this).attr('data-action');
        var poll=$(this).attr('data-object-id');
        var item=$('input#new-item').val();
        if (item.length <  2){
            $('div.new-item').addClass('has-warning')
        }
        else {
            $('div.new-item').removeClass('has-warning');
            $.post('',{'action': action, 'poll': poll, 'item': item}, function(responseText) {
                if (responseText.status == 'success') {
                    $('ul#list-answeds').append(
                        '<li data-pk="'+responseText.item_id+'" class="list-group-item"> <i class="icon-comment-discussion"></i><a href="#" data-url="edit/" id="text-field" data-type="text" data-inputclass="form-control" data-pk="'+responseText.item_id+'" data-title="Изменить" class="editable editable-click" data-original-title="" title="">'+responseText.item_status+'</a><a href="#"  data-pk="'+responseText.item_id+'" class="pull-right deleted-answer"> <i class=" text-warning icon-x"> </i> </a> <span title="Количество голосов" class="badge badge-primary mr-10">0</span></li>'
                    );
                    ul_li_empty($('#list-answeds'));
                    $('input#new-item').val("");
                    $('.editable').editable();

                }
                else {
                    noty({text: responseText['text'], type: responseText['status'], layout: 'bottomRight'});
                }
            });
        }
    });


    $('body').on('click','a.deleted-answer', function() {
        var item = $(this).data('pk');
        swal({
                title: "Вы уверены?",
                text: "Вы действительно хотите удалить выбранный ответ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#EF5350",
                confirmButtonText: "Да, удалить!",
                cancelButtonText: "Нет, отмена!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    $.post('',{'action': 'deleted-answer', 'item': item }, function(responseText) {
                        if (responseText.status == 'success') {
                            $('ul#list-answeds > li[data-pk=' + item + ']').remove();
                            ul_li_empty($('#list-answeds'));
                            swal({
                                title: "Удален!",
                                text: "Выбранный вариант ответа успешно удален.",
                                confirmButtonColor: "#66BB6A",
                                type: "success"
                            });
                        }
                        else {
                            noty({text: responseText['text'], type: responseText['status'], layout: 'bottomRight'});
                        }
                    });
                }
                else {
                    swal({
                        title: "Отменено",
                        text: "В следующий раз будьте решительнее =).",
                        confirmButtonColor: "#2196F3",
                        type: "error"
                    });
                }
            });
    });

    ul_li_empty($('#list-answeds'));
    function ul_li_empty($elem) {
        if($elem.has("li").length == 0) {
            $elem.html("<span class='poll-answer-empty text-muted'>Нет вариантов ответа</span>");

        }
        else {
            $('.poll-answer-empty').remove();
            $elem.css("display", "block");
        }
    }

// ######################
    $('#modals_wrapper').on('submit', '#question_add_modal form', function () {

        // Clear Errors
        $('.modal-body')
            .find('.alert').remove().end()
            .find('label').removeClass('text-danger').end()
            .find('.help-block span').remove();


        var options = {success: function (data) {
            if (data.success) {
                location.reload();
            }
            else {
                for (var k in data['errors']){
                    $('[name="'+ k + '"]')
                        .parent()
                        .find('.help-block')
                        .html('<span class="text-danger">' + data['errors'][k] + '</span>').end()
                    $('label[for="id_' + k + '"]').addClass('text-danger');

                }
                if (data.errors_formset['min_forms']) {
                    $('.modal-body').prepend(
                        '<div class="alert alert-warning alert-styled-left alert-bordered mb-10">'+ data.errors_formset.min_forms +'</div>'
                    )
                }

                if (data.errors_formset['choice']) {
                    $('.modal-body').find('input[name^="answer"][name$="-choice"]').each(function (i, element){
                        if ($(element).val() == ''){
                            $(element).parent().find('.help-block')
                                .html('<span class="text-danger">' + data.errors_formset['choice'] + '</span>')
                        }
                    })
                }

                // console.log(data.errors_formset)
            }

        }};
        $(this).ajaxSubmit(options);
        return false;
    });
    // Удаление вопроса
    $('.remove-question').on('click', function (e) {
        e.preventDefault();

        var $item = $(this);
        var item_pk = $item.data('id');

        swal({
                title: "Вы уверены?",
                text: "Вы действительно хотите удалить этот вопрос?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#EF5350",
                confirmButtonText: "Да, удалить!",
                cancelButtonText: "Нет, отмена!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    $.post('question/'+ item_pk + '/delete/', function(responseText) {
                        if (responseText.status) {
                            $item.closest('.list-group').remove();
                            swal({
                                title: "Удален!",
                                text: "Выбранный вопрос успешно удален.",
                                confirmButtonColor: "#66BB6A",
                                type: "success"
                            });
                        }
                        else {
                            noty({text: responseText['text'], type: responseText['status'], layout: 'bottomRight'});
                        }
                    });
                }
                else {
                    swal({
                        title: "Отменено",
                        text: "В следующий раз будьте решительнее =).",
                        confirmButtonColor: "#2196F3",
                        type: "error"
                    });
                }
            });
    });

    // Сортировка вопросов
    $('div.questions-list').sortable({
        group: 'questions-list',
        containerSelector: 'div.questions-list',
        placeholder: '<div class="question-list-placeholder text-center list-group-header">Переместить сюда</div>',
        handle: 'i.icon-sort',
        itemSelector: 'ul.question-item',
        onDrag: function ($item, position) {
            $item.css({
                left: position.left - adjustment.left,
                top: position.top - adjustment.top
            })
        },
        onDragStart: function ($item, container, _super) {
            var offset = $item.offset(), pointer = container.rootGroup.pointer;
            adjustment = {
                left: pointer.left - offset.left,
                top: pointer.top - offset.top
            }
            _super($item, container)
        },
        onDrop: function  ($item, container, _super) {
            var array = [];
            var $input_value = $('input[name="question-sortable-input"]');
            var sortable_array = $('div.questions-list').sortable("serialize").get()[0];

            for(var i = 0; i < sortable_array.length; i++){
                var item = sortable_array[i]['parent'];
                array.push({index: i, id: item})
            }
            $input_value.val(JSON.stringify({'ordered_questions': array}));
            console.log($input_value.val())
            _super($item, container);
        }
    });


    // Сортировка категорий
    $('div.category-list').sortable({
        group: 'category-list',
        containerSelector: 'div.category-list',
        placeholder: '<div class="category-list-placeholder text-center list-group-header">Переместить сюда</div>',
        handle: 'i.icon-sort',
        itemSelector: 'div.category-list .card',
        onDrag: function ($item, position) {
            $item.css({
                left: position.left - adjustment.left,
                top: position.top - adjustment.top
            })
        },
        onDragStart: function ($item, container, _super) {
            var offset = $item.offset(), pointer = container.rootGroup.pointer;
            adjustment = {
                left: pointer.left - offset.left,
                top: pointer.top - offset.top
            }
            _super($item, container)
        },
        onDrop: function  ($item, container, _super) {
            var array = [];
            var sortable_array = $('div.category-list').sortable("serialize").get()[0];

            for(var i = 0; i < sortable_array.length; i++){
                var item = sortable_array[i]['parent'];
                array.push({index: i, id: item})
            }
            $.post($('div.category-list').data('sort'), {'data': JSON.stringify({'ordered_polls': array})}, function (data) {
                if (data.success) {
                    noty({text: 'Сортировка успешно сохранена.', type: 'success', layout: 'bottomRight'});
                }
                else {
                    noty({text: 'При сохранении произошла ошибка, попробуйте позже.', type: 'error', layout: 'bottomRight'});
                }
            })
            _super($item, container);
        }
    });


});
