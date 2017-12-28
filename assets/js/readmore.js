    $(".read-more").on("click", function(){
  // declare text for read more label 
  var text_more;
  // declare target collapsible content
  var content_collapse = $(this).data("target");
  // declare text for close label
  var text_close = $("[data-collapse="+content_collapse+"]").data("text-close");
        
    // if content is not collapsed  
  if(!$(this).hasClass('collapse-open')){
        $(this).data("text-more", $(this).html());
      text_more = $(this).data("text-more");
            $(this).addClass('collapse-open');  
            $(this).html(text_close);
            $("[data-collapse="+content_collapse+"]").slideDown(300);
            
                            
        } else {
      // if content is collapsed
      text_more = $(this).data("text-more");
            $(this).html(text_more);    
            $(this).removeClass('collapse-open');
            $("[data-collapse="+content_collapse+"]").slideUp(300);
        }


    })