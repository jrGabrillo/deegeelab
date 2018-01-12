let idleTimerID = 0, timer = 0;
let docWidth = $(document).width(), docHeight = $(document).height();

var deegeelab = function(){
    'use strict';
    return {
        ini:function(){
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
                onLeave: function(index, nextIndex, direction){
                    let leavingSection = $(this);
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

            $("circle").mouseover(function(){
                let node = $(this)[0], _node = $(node).data('node');
                $(`.node[data-node='${_node}']`).addClass('active');
            }).mouseleave(function(){
                let node = $(this)[0], _node = $(node).data('node');
                $(`.node[data-node='${_node}']`).removeClass('active');        
            });

            $(window).on('ready resize',function(){
                deegeelab.banner();
                _idle.ini();
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
            $('#nodes .list').html('');
            let nodeWidth = 250, mobileWidth = 0;;
            let nodes = $(".nodes").children('circle.circle-node');
            $.each(nodes,function(x,y){
                var pos = $(y).position(), r = $(y).attr('r'), d = (r*2), _x = pos.top-r+20, _y = (pos.left<(docWidth/2))?pos.left:pos.left+(d);
                $('#nodes .list').append(`
                    <div class='node animated' data-node='${x}' style='top:${(_x-150)}px; left:${_y}px;'>
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

                if(pos.left<(docWidth/2)){
                    let this_node = $(`#nodes .node[data-node='${x}']`)[0], currentWidth = $(this_node).width(), descPos = (docWidth>601)?-100:(deegeelab.getPosLeft(0,(_y+nodeWidth)))+10, _posLeft = (docWidth>601)?(_y-currentWidth):(deegeelab.getPosLeft(0,(_y+nodeWidth)))+10;
                    $(this_node).css(`left`,`${(_posLeft)}px`);
                    $(`#nodes .node[data-node='${x}'] .description`).attr({'style':`left:${descPos}px`});
                }
                else{
                    let this_node = $(`#nodes .node[data-node='${x}']`)[0], currentWidth = $(this_node).width(), _posLeft = (docWidth>601)?(_y):(deegeelab.getPosLeft((docWidth-50),(_y+nodeWidth)))-100;
                    $(this_node).css(`left`,`${_posLeft}px`);
                    $(`#nodes .node[data-node='${x}'] .description`).attr({'style':`left:-${30}px`});
                }
            });

            $("circle").mouseover(function(){
                let node = $(this)[0], _node = $(node).data('node');
                $(`.svg-pulse`).attr({'class':'fill-blue svg-pulse'});
                $(`.svg-pulse[data-node='${_node}']`)[0].classList.add('active');
            }).mouseleave(function(){
                let node = $(this)[0], _node = $(node).data('node');
                $(`.svg-pulse[data-node='${_node}']`)[0].classList.remove('active');
            });

            $(".node").mouseover(function(){
                let node = $(this)[0], _node = $(node).data('node');
                $(`.svg-pulse`).attr({'class':'fill-blue svg-pulse'});
                $(`.svg-pulse[data-node='${_node}']`).attr({'class':'fill-blue svg-pulse active'});
            }).mouseleave(function(){
                let node = $(this)[0], _node = $(node).data('node');
                $(`.svg-pulse[data-node='${_node}']`).attr({'class':'fill-blue svg-pulse'});
            });
        },
        repositionNodes:function(posX,posY){
            let nodeWidth = 250, mobileWidth = 0;;
            let nodes = $(".nodes").children('circle.circle-node');
            $.each(nodes,function(x,y){
                var pos = $(y).position(), r = $(y).attr('r'), d = (r*2), _x = pos.top-r+20, _y = (pos.left<(docWidth/2))?pos.left:pos.left+(d);
                if(pos.left<(docWidth/2)){
                    let this_node = $(`#nodes .node[data-node='${x}']`)[0], currentWidth = $(this_node).width(), descPos = (docWidth>601)?-100:(deegeelab.getPosLeft(0,(_y+nodeWidth)))+10, _posLeft = (docWidth>601)?(_y-currentWidth):(deegeelab.getPosLeft(0,(_y+nodeWidth)))+10;
                    $(`#nodes .node[data-node='${x}']`).attr({'style':`top:${(pos.top-190)}px; left:${pos.left-165}px`});
                }
                else{
                    let this_node = $(`#nodes .node[data-node='${x}']`)[0], currentWidth = $(this_node).width(), _posLeft = (docWidth>601)?(pos.left+(d)):(deegeelab.getPosLeft((docWidth-50),(_y+nodeWidth)))-100;
                    $(`#nodes .node[data-node='${x}']`).attr({'style':`top:${(pos.top-190)}px; left:${_posLeft+165}px`});
                }
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
                $(`.node`).removeClass('active');
            }
            window.clearTimeout(timer);
            window.clearTimeout(idleTimerID);
            this.startTimer();
        }
    }
}();

$(window).on('load',function(){
    let count_timer = 0;
    let hash = window.location.hash;
    if(hash == "#loaded"){
        $("#why-deegeelab").removeClass('hide');
        $(".main-section").attr({"style":""});
        deegeelab.ini();
        $('svg').attr({"class":"svg-animation-out"});
        setTimeout(function(){
            $("#display_tagline").removeClass('loading');
            $(".btn-flat").removeClass('hide');
            $(".pillar-section").removeClass('hide');
            $(".contact-section").removeClass('hide');
        },500);
    }
    else{
        let load_timer = setInterval(function(){
            count_timer++;
            $('#display_tagline .progress .determinate').attr({"style":`width:${(count_timer*20)}%`});
            if(count_timer == 5){
                clearInterval(load_timer);
                $("#why-deegeelab").removeClass('hide');
                $(".main-section").attr({"style":""});
                deegeelab.ini();
                $('svg').attr({"class":"svg-animation-out"});
                setTimeout(function(){
                    $("#display_tagline").removeClass('loading');
                    $(".btn-flat").removeClass('hide');
                    $(".pillar-section").removeClass('hide');
                    $(".contact-section").removeClass('hide');
                },500);
            }
        },2000);        
    }

    $(window).mousemove(function(e) {
        let xpos=e.clientX, ypos=e.clientY;
        xpos=xpos*2; ypos=ypos*2;
        deegeelab.repositionNodes();
        $('.bg-section').attr({'style':`top:${(-130+(ypos/100))}px;left:${(-100+(xpos/100))}px`});
        $('#nodes').attr({'style':`position:relative; top:${(5-(ypos/65))}px; left:${((xpos/200))}px`});
    });
});