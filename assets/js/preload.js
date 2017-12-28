(function() {
  
  $('li').text('');
  
    var co = $('ul').find('li').each(function(){
    var $this = $(this),
        $author = $this.data('item');
    
    var author = $('<span></span>', {
      class: 'item-close',
      text: $author
    }).appendTo( $this.closest('li') );
      
  });
  
  var $close = $('.close'),
      $pop = $('.pop'),
      $iconcube = $('.icon-cube'),
      $iconbox = $('.icon-box'),
      $itemclose = $('.item-close'),
      $button = $('#btn');
  
    $($button).on('click', function() {
        $($close, $pop).toggleClass('close pop');
        $($iconcube, $iconbox).toggleClass('icon-cube icon-box');
        $($itemclose).toggleClass('item-close item-open');
        $($button).toggleClass('active');
     	
    });
    
})();

