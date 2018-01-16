$(function() {
    let column = $('.panel');
    let docWidth = $(document).width(), docHeight = $(document).height();
        // let d = ()

    if(docWidth>993){
        let a = 100 / column.length;
        $('.panel').css('width', `${a}%`);
        initHoverBoxes(a);        
    }
});

function initHoverBoxes(sizes) {
    var column = $('.panel');
    column.mouseenter(function() {
        console.log((100 - (sizes * 1.3)) / column.length);
        column.removeClass('active').addClass('inactive').css('width', `${(100-(sizes*1.3))/(column.length-1)}%`);
        $(this).css('width', `${(sizes*1.3)}%`);
        $(this).addClass('active').removeClass('inactive');;
    });
    column.mouseleave(function() {
        column.css('width', `${sizes}%`);
        column.removeClass('active inactive');
    });
}