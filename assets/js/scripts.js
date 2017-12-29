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
        'navigationPosition': 'left'
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
jQuery(window).load(function() {
    // jQuery('#preloader').fadeOut();
});

$(document).on("ready",function(){
    $('#modal_services').modal({
        ready:function(e){
            $.fn.fullpage.setMouseWheelScrolling(false);
            $.fn.fullpage.setAllowScrolling(false);
        },
        complete:function(e){
            $.fn.fullpage.setMouseWheelScrolling(true);
            $.fn.fullpage.setAllowScrolling(true);
        }
    });

//     $("body").particleground({
//         dotColor: '#878892',
//         lineColor: '#65666d',
//         density:7500,
//         parallax:true
//     });

    $('.carousel').carousel({fullWidth: true});

    // portfolio  carousel
    $("a[data-cmd='prev']").on('click',function(){
        $('.carousel').carousel('prev');
        console.log("xxx");
    });

    $("a[data-cmd='next']").on('click',function(){
        $('.carousel').carousel('next');
        console.log("xxx");
    });

    var services = {
        "web-creation-and-maintenance":{
            "description":"We provide web maintenance services such as:",
            "state":"service",
            "image":"webcreation.png",
            "services":{
                "service1":"Updates to meet your market needs. ",
                "service2":"Overall site performance update",
                "service3":"Product Services/ Ecommerce, and interactive site conversion.",
            }
        },
        "software-solution":{
            "description":"We offer software solutions that can help your organization be more efficient and help minimize your manual labor cost.",
            "state":"solution",
            "image":"software.png",
            "process":{
                "service1":"Review current system and present ideas for improvement, including cost benefit analysis",
                "service2":"Analyze and specify user requirements",
                "service3":"Produce detailed specifications",
                "service1":"Develop software system for the required solution and test the software solution thoroughly",
                "service2":"Prepare user training materials, train users, and present software solution to users",
                "service3":"Install, implement and maintain the software system",
            }
        },
        "digital-marketing-consultancy":{
            "description":"We offer a complete package for Digital Marketing Plan from Website Creation, Social Media Management to SEO link building. ",
            "state":"service",
            "image":"digital.png",
            "services":{
                "service1":"Brand Building",
                "service2":"Website Creation",
                "service3":"Marketing Plan for the next 6 months",
                "service3":"Social Media Management",
                "service3":"SEO",
            }
        },
        "seo":{
            "description":"We provide SEO service to help you improve your website ranking in any search engine.",
            "state":"service",
            "image":"seo.png",
            "services":{
                "service1":"Web server and on-page analysis & reporting",
                "service2":"Keyphrase research and selection",
                "service3":"Meta tags (Title & description)",
                "service3":"Google Analytics traffic analysis",
            }
        },
        "social-media-management":{
            "description":"We offer a complete package for Digital Marketing Plan from Website Creation, Social Media Management to SEO link building. ",
            "state":"service",
            "image":"social.png",
            "services":{
                "service1":"Brand Building",
                "service2":"Website Creation",
                "service3":"Marketing Plan for the next 6 months",
                "service3":"Social Media Management",
                "service3":"SEO",
            }
        }
    }

    $("a[data-cmd='services']").on('click',function(){
        var data = $(this).data('node');
        var titleContent = "";
        var descriptionContent = "";
        var imageContent = "";

        $('#modal_services').modal('open');

        $("#modal_services .modal-content").height("400px").perfectScrollbar({
            suppressScrollX: true,
            wheelPropagation:true
        });

        $("#modal_services").particleground({
            dotColor: '#ccc',
            lineColor: '#eee',
            density:7500,
            parallax:true
        });

        titleContent = $(this).data('services');
        if(services[data].state == "service"){
            $.each(services[data].services,function(i,v){
                descriptionContent += "<li><i class='material-icons'>check_box</i> <span>"+v+"</span></li>";
            })
            imageContent = "<img src='assets/images/services/"+services[data].image+"' width='200'>";
            descriptionContent = services[data].description+"<ul>"+descriptionContent+"</ul>";
        }
        else{
            $.each(services[data].process,function(i,v){
                descriptionContent += "<li><i class='material-icons'>check_box</i> <span>"+v+"</span></li>";
            })
            imageContent = "<img src='assets/images/services/"+services[data].image+"' width='200'>";
            descriptionContent = services[data].description+"<ul>"+descriptionContent+"</ul>";
        }

        $("#modal_services .title").html(titleContent);
        $("#modal_services .image").html(imageContent);
        $("#modal_services .description").html(descriptionContent);
    });

    $("a[data-cmd='processes']").on('click',function(){
        var descriptionContent = "";
        var imageContent = "";
        $('#modal_services').modal('open');

        $("#modal_services").particleground({
            dotColor: '#ccc',
            lineColor: '#eee',
            density:7500,
            parallax:true
        });
        imageContent = "<img src='assets/images/rnrdigitalconsultancy2.png' width='300' class='logo'>";
        descriptionContent = "<ul>"+
                                "<li>Step 1: Information Gathering"+
                                "   <ol type='a'>"+
                                "       <li>Set goals for your website</li>"+
                                "       <li>Define your target market</li>"+
                                "   </ol>"+
                                "</li>"+
                                "<li>Step 2: Planning"+
                                "   <ol type='a'>"+
                                "       <li>Create a Sitemap sketch</li>"+
                                "       <li>Create a wireframe/mock up site</li>"+
                                "       <li>Select Technology to be used (Framework, CMS, Programming Language)</li>"+
                                "   </ol>"+
                                "</li>"+
                                "<li>Step 3: Design"+
                                "   <ol type='a'>"+
                                "       <li>Create page layouts</li>"+
                                "       <li>Review the layouts</li>"+
                                "       <li>Get client’s feedback on the layouts</li>"+
                                "   </ol>"+
                                "</li>"+
                                "<li>Step 4: Content Writing and Assembly"+
                                "   <ol type='a'>"+
                                "       <li>Create new content</li>"+
                                "       <li>Get content ready for migration</li>"+
                                "   </ol>"+
                                "</li>"+
                                "<li>Step 5: Coding"+
                                "   <ol type='a'>"+
                                "       <li>Build and deploy</li>"+
                                "       <li>Add special features and interactivity</li>"+
                                "       <li>SEO for the website</li>"+
                                "   </ol>"+
                                "</li>"+
                                "<li>Step 6: Testing, Review and Launch"+
                                "   <ol type='a'>"+
                                "       <li>Test the created website</li>"+
                                "       <li>Upload the website to go on live</li>"+
                                "   </ol>"+
                                "</li>"+
                                "<li>Step 7: Maintenance and Regular Updating"+
                                "   <ol type='a'>"+
                                "       <li>Add user report system</li>"+
                                "       <li>Fix bugs asap</li>"+
                                "       <li>Keep website up to day</li>"+
                                "   </ol>"+
                                "</li>"+
                             "</ul>";

        $("#modal_services .title").html("Our processes in making brand online");
        $("#modal_services .image").html(imageContent);
        $("#modal_services .description").html(descriptionContent);
    });

    $("button[data-cmd='portfolio']").on('click',function(){
        var data = $(this).data('site');
        var win = window.open(data,'_blank');
    });

    $("#form_query").validate({
        rules: {
            field_name: {required: true,maxlength: 200},
            field_lastname: {required: true,maxlength: 20},
            field_email: {required: true,maxlength: 100,email:true},
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
            var _form = $(form).serializeArray();
            console.log(_form);
            var data = system.ajax('assets/harmony/Process.php?set-leads',_form);
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

    // var data = ['.rnr-parallax1','.rnr-parallax2','.rnr-parallax3','.rnr-parallax4','.rnr-parallax5','.rnr-parallax6'];
    // $.each(data,function(i,v){
    //     var scene = $(v).get(0);
    //     var parallax = new Parallax(scene);
    // })
});