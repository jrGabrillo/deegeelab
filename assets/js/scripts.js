$(document).ready(function() {
    (function() {
        [].slice.call(document.querySelectorAll('.tabs')).forEach(function(el) {
            new CBPFWTabs(el);
        });
    })();
    $('#main-nav').sidr();
    $('#fullpage').fullpage({
        'verticalCentered': true,
        'easing': 'easeInOutCirc',
        'css3': false,
        'scrollingSpeed': 1000,
        'slidesNavigation': true,
        'slidesNavPosition': 'bottom',
        'easingcss3': 'ease',
        'navigation': true,
        'anchors': ['home','pillars','contact'],
        'navigationPosition': 'left',
        'scrollOverflow': true,
    });
    $('.screenshots-content, .clients-content').css('height', $(window).height());
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('body').addClass('browser-mobile');
    }
    $(document).mouseup(function(e) {
        if ($(".sidr-open ")[0]) {
            var container = $("#sidr");
            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $(".sidr-open #main-nav").click();
            }
        }
    });
});

$(document).on("ready",function(){
    var toggleMenu = function() {
        $( 'header' ).toggleClass( 'toggle' );
        $( '.main' ).toggleClass( 'push' );
        $( '.overlay' ).toggleClass( 'block' );
        $( '#social, .logo' ).toggleClass( 'reveal' );
    };
    $('.navBtn').click( function() {
        toggleMenu();
    });

    let nodes = $(".nodes").children();
    $.each(nodes,function(x,y){
        var pos = $(y).position(), _x = pos.top, _y = (pos.left)-50;
        $('#nodes').append(`<div class='node' style='position:absolute; top:${_x}px; left:${_y}px;'>${$(y).data('name')}</div>`);
    });

    let date = new Date();
    date.setDate(date.getDate() + 7);
    let mindate = `${date.getFullYear()}-${((date.getMonth()+1)<10?`0${(date.getMonth()+1)}`:(date.getMonth()+1))}-${date.getDate()}`;
    let maxdate = `${date.getFullYear()}-${((date.getMonth()+6)<10?`0${(date.getMonth()+6)}`:(date.getMonth()+6))}-${date.getDate()}`;

    $("#field_date").attr({"min":mindate});
    $("#field_date").attr({"max":maxdate});

    $("#form_query").validate({
        rules: {
            field_name: {required: true,maxlength: 200},
            field_business: {required: true,maxlength: 300},
            field_email: {required: true,maxlength: 300,email:true},
            field_number: {required: true,maxlength: 50},
            field_date: {required: true,maxlength: 40},
            field_message: {required: true,maxlength: 1000},
        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
            var placement = $(element).data('error');
            if(placement){
                $(placement).append(error)
            } 
            else{
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            let _form = $(form).serializeArray();
            let data = system.ajax('assets/harmony/Process.php?set-leads',_form);
            data.done(function(data){
                if(data == 1){
                    Materialize.toast('Thank you. your message has been sent.',2000);
                    system.clearForm();
                    setTimeout(function(){
                        window.location.reload(true);
                    },2000);
                }
                else{
                    Materialize.toast('Cannot process request.',4000);
                }
            });
        }
    });
});