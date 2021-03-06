let idleTimerID = 0, timer = 0;
let docWidth = $(document).width(), docHeight = $(document).height();
                     
if(window.location.hash == "#footer"){
    let page = window.location.href.replace('footer','home');                                
    window.location.replace(page);    
}

var deegeelab = function(){
    'use strict';
    return {
        ini:function(){
            $('#main-nav').sidr();
            $('#fullpage').fullpage({
                'verticalCentered': true,
                'easing': 'easeInOutCirc',
                'css3': true,
                'navigationPosition': 'right',
                'scrollingSpeed': 1000,
                'slidesNavigation': true,
                'slidesNavPosition': 'bottom',
                'easingcss3': 'ease',
                'navigation': true,
                'anchors': ['home','pillars','contact','footer'],
                'scrollOverflow': true,
                'fitToSection': true,
                onLeave: function(index, nextIndex, direction){
                    let leavingSection = $(this);
                    $("#field_date").datepicker( "hide" );
                    $("input, select, textarea").blur();
                    if(index == 1 && direction =='down'){
                        $('.collapsible').collapsible('close', 0);
                        $("#nodes .list").attr({'class':'list'});
                    }
                },
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
            
            deegeelab.banner();
            _idle.ini();
            pillar.ini();

            let mql = window.matchMedia("(orientation: portrait)");  
            mql.addListener(function(m) {
                $.fn.fullpage.reBuild();
                if(m.matches) {
                    $('.panel').attr({'style':'','class':'panel'});
                }
                else {
                    pillar.ini();
                }
            });          

            let e = {target:{nodeName:"square"}};
            $('.collapsible').collapsible({
                accordion: false,
                onOpen: function(el){
                    $("#nodes .list").attr({'class':'hide list'});
                    _idle.active(e);
                },
                onClose: function(el){
                    _idle.active(e);
                    setTimeout(function(){       
                        $("#nodes .list").attr({'class':'list'});
                    },100);
                }
            });

            let date = new Date();
            date.setDate(date.getDate() + 7);
            let mindate = `${date.getFullYear()}-${((date.getMonth()+1)<10?`0${(date.getMonth()+1)}`:(date.getMonth()+1))}-${date.getDate()}`;
            let maxdate = `${date.getFullYear()}-${((date.getMonth()+6)<10?`0${(date.getMonth()+6)}`:(date.getMonth()+6))}-${date.getDate()}`;

            $("#field_date").datepicker({'dateFormat': "yy-mm-dd",'minDate':mindate,'maxDate':maxdate});

            let hourContent = "<option disabled selected>Hour</option>";
            for(let x = 8; x<=21; x++){
                hourContent += `<option>${x}</option>`;
            }
            $("#field_hour").html(hourContent);
            
            let minuteContent = "<option disabled selected>Minute</option>";
            for(let x = 0; x<=59; x++){
                minuteContent += `<option>${x}</option>`;
            }
            $("#field_minute").html(minuteContent);

            $('select').material_select();
            
            $("#field_hour, #field_minute").on('change',function(e){
                $('select').material_select('close');
            })

            let h = $(".contact-section .fp-tableCell").height()*1.1;
            $("#form_query").validate({
                rules: {
                    field_name: {required: true,maxlength: 200},
                    field_business: {required: true,maxlength: 300},
                    field_email: {required: true,maxlength: 300, email:true},
                    field_number: {required: true, maxlength: 50},
                    field_postal: {required: true, maxlength: 4, number:true},
                    field_date: {required: true, maxlength: 40},
                    field_time: {required: true, maxlength: 40, checkTime:true},
                    field_message: {required: true,maxlength: 1000},
                },
                errorElement : 'div',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    $(".contact-section, .contact-section .fp-scrollable,.contact-section .fp-tableCell").height(h);
                    if(placement){
                        $(placement).append(error)
                    } 
                    else{
                        error.insertAfter(element);
                    }
                },
                submitHandler: function (form) {
                    let _form = $(form).serializeArray();
                    _form = [_form[0]['value'],_form[1]['value'],_form[2]['value'],_form[3]['value'],_form[4]['value'],_form[5]['value'],_form[6]['value'],_form[7]['value']];
                    let data = system.ajax('assets/harmony/Process.php?set-leads',_form);
                    data.done(function(data){
                        if(data == 1){
                            Materialize.toast('Thank you. your message has been sent.',2000);
                            system.clearForm();
                            setTimeout(function(){
                                let page = window.location.href.replace('footer','contact');                                
                                window.location.replace(page);
                                console.log(data);
                            },2000);
                        }
                        else{
                            Materialize.toast('Cannot process request.',4000);
                        }
                    });
                }
            });
        },
        getSVG:function(){
            let svg = system.html('assets/svg/path.svg');
            return svg.responseText;
        },
        applySVG:function(){
            let svg = this.getSVG;
            $('path#path0').attr({"d":svg});
        },
        getPosLeft:function(width, value){ // width = width of the device, value = current position of node, pos = left or right of the device.
            let check = true, a = 10;
            while(check){
                if(0){
                    if(width>value)
                        value = value + a;                
                    else
                        check = false;
                }
                else{
                    if(width<value)
                        value = value - a;
                    else
                        check = false;              
                }
            }
            return value;
        },
        banner:function(posX,posY){
            let nodeWidth = 250, mobileWidth = 0;;
            let nodes = $(".nodes").children('circle.circle-node');
            $.each(nodes,function(x,y){
                var pos = $(y).position(), r = $(y).attr('r'), d = (r*2), _x = pos.top-r+20, _y = (pos.left<(docWidth/2))?pos.left:pos.left+(d);
                
                if(x<3){
                    $('#nodes .list #display_leftNodes').append(`
                        <div class='node animated' data-node='${x}'>
                            <a href="${$(y).data('link')}">
                                <div class='description row'>
                                    <div class='col s8'>
                                        <h6 class='bold'>${$(y).data('name')}</h6>
                                        <p>${$(y).data('desc')}</p>
                                    </div>
                                    <div class='col s4 image' style='background:url(assets/images/services/${$(y).data('image')}) no-repeat;'></div>
                                </div>
                                <span class='title'>${$(y).data('name')}</span>
                            </a>
                        </div>
                    `);                    
                }
                else{
                    $('#nodes .list #display_rightNodes').append(`
                        <div class='node animated' data-node='${x}'>
                            <a href="${$(y).data('link')}">
                                <div class='description row'>
                                    <div class='col s8'>
                                        <h6 class='bold'>${$(y).data('name')}</h6>
                                        <p>${$(y).data('desc')}</p>
                                    </div>
                                    <div class='col s4 image' style='background:url(assets/images/services/${$(y).data('image')}) no-repeat;'></div>
                                </div>
                                <span class='title'>${$(y).data('name')}</span>
                            </a>
                        </div>
                    `);                    
                }
            });

            let r = Math.floor(Math.random()*6);
            $(`#nodes .node[data-node='${r}']`).addClass('active');

            $("circle").mouseover(function(){
                let node = $(this)[0], _node = $(node).data('node');
                $(`.svg-pulse`).attr({'class':'fill-blue svg-pulse'});
                $(`.svg-pulse[data-node='${_node}']`)[0].classList.add('active');
                $(`.node[data-node='${_node}']`).addClass('active');
            }).mouseleave(function(){
                let node = $(this)[0], _node = $(node).data('node');
                $(`.svg-pulse[data-node='${_node}']`)[0].classList.remove('active');
                $(`.node[data-node='${_node}']`).removeClass('active');  
            });

            $(".node").mouseover(function(){
                $(`.node`).removeClass('active');  
                let node = $(this)[0], _node = $(node).data('node');
                $(`.svg-pulse`).attr({'class':'fill-blue svg-pulse'});
                $(`.svg-pulse[data-node='${_node}']`).attr({'class':'fill-blue svg-pulse active'});
                $(`.node[data-node='${_node}']`).addClass('active');
            }).mouseleave(function(){
                let node = $(this)[0], _node = $(node).data('node');
                $(`.svg-pulse[data-node='${_node}']`).attr({'class':'fill-blue svg-pulse'});
                $(`.node`).removeClass('active');  
            });
        },
        randomizeNodes:function(){
            timer = setTimeout(function(){
                deegeelab.showNode();
                deegeelab.randomizeNodes();
            },5000);
            return timer;
        },
        showNode:function(){
            let r = Math.floor(Math.random()*6);
            $(`.node`).removeClass('active');
            $(`.svg-pulse`).attr({'class':'fill-blue svg-pulse'});
            $(`#nodes .node[data-node='${r}']`).addClass('active');
            $(`.svg-pulse[data-node='${r}']`)[0].classList.add('active');
        },
        activate:function(){
            $("#fullpage").removeClass('hide');
            setTimeout(function(){
                deegeelab.ini();
                $('svg').attr({"class":"svg-animation-out"});
            },300);
            setTimeout(function(){
                $(".loading").addClass('zoomOut').remove();
            },300);
        }
    }
}();

var _idle = function(){
    'use strict';
    return {
        ini:function(){
            this.setup();
        },
        setup:function(){
            document.addEventListener("mousemove", _idle.reset);
            document.addEventListener("mousedown", _idle.reset);
            document.addEventListener("keypress", _idle.reset);
            document.addEventListener("DOMMouseScroll", _idle.reset);
            document.addEventListener("mousewheel", _idle.reset);
            document.addEventListener("touchmove", _idle.reset);
            document.addEventListener("MSPointerMove", _idle.reset);
         
            this.startTimer();            
        },
        startTimer:function(){
            idleTimerID = window.setTimeout(_idle.inactive, 2000);
        },
        reset:function(e){
            window.clearTimeout(idleTimerID);
            _idle.active(e);
        },
        inactive:function(){
            deegeelab.showNode();
            deegeelab.randomizeNodes();
        },
        active:function(e){
            if(e.target.nodeName != "circle"){
                // $(`.node`).removeClass('active');
            }
            window.clearTimeout(timer);
            window.clearTimeout(idleTimerID);
            this.startTimer();
        }
    }
}();

var pillar = function(){
    'use strict';
    return {
        ini:function(){
            let column = $('.panel');
            let docWidth = $(document).width(), docHeight = $(document).height();

            if(docWidth>993){
                let a = 100 / column.length;
                $('.panel').css('width', `${a}%`);
                pillar.initHoverBoxes(a);        
            }
        },
        initHoverBoxes:function(sizes) {
            var column = $('.panel');
            column.mouseenter(function() {
                column.removeClass('active').addClass('inactive').css('width', `${(100-(sizes*1.3))/(column.length-1)}%`);
                $(this).css('width', `${(sizes*1.3)}%`);
                $(this).addClass('active').removeClass('inactive');;
            });
            column.mouseleave(function() {
                column.css('width', `${sizes}%`);
                column.removeClass('active inactive');
            });
        }
    }
}();

$(window).on('load',function(){
    let data = localStorage.getItem('deegeelab');
    let date = new Date(), day = date.getUTCDate();

    if((data == null) || (data == "")){
        localStorage.setItem('deegeelab',day);
        let count_timer = 0;
        let hash = window.location.hash;
        let load_timer = setInterval(function(){
            count_timer++;
            $('#display_tagline .progress .determinate').attr({"style":`width:${(count_timer*20)}%`});
            if(count_timer == 5){
                clearInterval(load_timer);
                deegeelab.activate();
            }
        },1000);
    }
    else{
        deegeelab.activate();
    }

    $(window).mousemove(function(e) {      
        let xpos=e.clientX, ypos=e.clientY;       
        xpos=xpos*2; ypos=ypos*2;     
        // $('.bg-section').attr({'style':`top:${(-130+(ypos/100))}px;left:${(-100+(xpos/100))}px`});        
        $('#nodes').attr({'style':`margin:${(5-(ypos/65))}px 0px 0px ${((xpos/200))}px;`});      
    });

    // $(window).on('resize',function(){
    //     window.location.reload();
    //     // setTimeout(function(){
    //     //     deegeelab.repositionNodes();
    //     // },500);
    // });
});