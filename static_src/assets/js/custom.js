$(function () {

    // Выставляет активными родительские пункты меню относительно активного таба
    const active_ident = $('#nav_active').text();

    const sidebar = $('.sidebar-main').find("[data-active='" + active_ident + "']");
    sidebar.addClass('active');
    if (sidebar.closest('div.sidebar-user-material').length > 0) {
        $('.sidebar-user-material').find('.collapse').addClass('show');
    } else {
        const sidebar_parents = sidebar.parents('li.nav-item-submenu');
        sidebar_parents.addClass('nav-item-open');
        const nav_group_sub = sidebar_parents.find('ul.nav.nav-group-sub');
        nav_group_sub.css({display: "block"});
    }
    // TODO: Описать
    var $dynamic_fields = $('#changeable-fields');

    if ($('#id_type').val() == 'FZ') {
        $dynamic_fields.hide();
    }

    // Получение состояние сайдбара из куков и запись в них
    // console.log($.cookie('sidebar'));
    if (typeof $.cookie('sidebar') == 'undefined') {
        $.cookie('sidebar', '', {expires: 180, path: '/manage/'});
    } else {
        $('body').addClass($.cookie('sidebar'));
    }

    $('.sidebar-control').on('click', function () {
        if ($('body').hasClass('sidebar-xs')) {
            $.cookie('sidebar', 'sidebar-xs', {expires: 180, path: '/manage/'});
        } else {
            $.cookie('sidebar', '', {expires: 180, path: '/manage/'});
        }
    });

    // Получение состояние правого сайдбара из куков и запись в них
    if (typeof $.cookie('sidebar-right') == 'undefined') {
        $.cookie('sidebar-right', '', {expires: 180, path: '/manage/'});
    } else {
        $('body').addClass($.cookie('sidebar-right'));
    }

});

Dropzone.autoDiscover = false;

// Ajax csrf handler record for cookie
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

// Получает URL параметры(аргументы)
// Использование:
// при URL "?to=email&why=because&first=John&Last=smith"
// getUrlVar("to") вернет "email"
$.getUrlVar = function (key) {
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && unescape(result[1]) || "";
};


$(document).ready(function () {


    $('select.select2-default').select2();

    function disableButton(data, $form, opts) {
        $form.find('input:submit').val("Please wait...").click(function (e) {
            e.preventDefault();
            return true;
        });
    };

    $('#role_selector').on('change', function () {
        Cookies.set('role', $( "#role_selector option:selected" ).val());
        location.reload();
    })

});



// Setup module
// ------------------------------
var InputsCheckboxesRadios = function () {
    var _componentUniform = function() {
        if (!$().uniform) {
            console.warn('Warning - uniform.min.js is not loaded.');
            return;
        }

        // Default initialization
        $('.form-check-input-styled').uniform();


        //
        // Contextual colors
        //

        // Primary
        $('.form-check-input-styled-primary').uniform({
            wrapperClass: 'border-primary-600 text-primary-800'
        });

        // Danger
        $('.form-check-input-styled-danger').uniform({
            wrapperClass: 'border-danger-600 text-danger-800'
        });

        // Success
        $('.form-check-input-styled-success').uniform({
            wrapperClass: 'border-success-600 text-success-800'
        });

        // Warning
        $('.form-check-input-styled-warning').uniform({
            wrapperClass: 'border-warning-600 text-warning-800'
        });

        // Info
        $('.form-check-input-styled-info').uniform({
            wrapperClass: 'border-info-600 text-info-800'
        });

        // Custom color
        $('.form-check-input-styled-custom').uniform({
            wrapperClass: 'border-indigo-600 text-indigo-800'
        });
    };
    var _componentSwitchery = function () {
        if (typeof Switchery == 'undefined') {
            console.warn('Warning - switchery.min.js is not loaded.');
            return;
        }

        // Initialize multiple switches
        var elems = Array.prototype.slice.call(document.querySelectorAll('.form-check-input-switchery'));
        elems.forEach(function (html) {
            var switchery = new Switchery(html);
        });

        // // Colored switches
        // var primary = document.querySelector('.form-check-input-switchery-primary');
        // var switchery = new Switchery(primary, {color: '#2196F3'});
        //
        // var danger = document.querySelector('.form-check-input-switchery-danger');
        // var switchery = new Switchery(danger, {color: '#EF5350'});
        //
        // var warning = document.querySelector('.form-check-input-switchery-warning');
        // var switchery = new Switchery(warning, {color: '#FF7043'});
        //
        // var info = document.querySelector('.form-check-input-switchery-info');
        // var switchery = new Switchery(info, {color: '#00BCD4'});
    };
    return {
        initComponents: function () {
            _componentSwitchery();
            _componentUniform();
        }
    }
}();
var Gallery = function() {


    //
    // Setup module components
    //

    // Lightbox
    var _componentFancybox = function() {
        if (!$().fancybox) {
            console.warn('Warning - fancybox.min.js is not loaded.');
            return;
        }

        // Image lightbox
        $('[data-popup="lightbox"]').fancybox({
            padding: 3
        });
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentFancybox();
        }
    }
}();

document.addEventListener('DOMContentLoaded', function () {
    InputsCheckboxesRadios.initComponents();
    Gallery.init();
});
