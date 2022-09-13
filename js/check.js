$('.slider').each(function(){
    var $this = $(this);
    var $group = $this.find('.slide-group');
    var $slides = $this.find('.slide');
    var buttonArray = [];
    var currentIndex = 0;
    var timeout;

    function move(newIndex) {
        var animateLeft, slideLeft;

        advance();

        if ($group.is(':animated') || currentIndex === newIndex) {
            return;
        }

        buttonArray[currentIndex].removeClass('active');
        buttonArray[newIndex].addClass('active');

        if(newIndex > currentIndex){
            slideLeft = '100%';
            animateLeft = '-100%';
        } else {
            slideLeft = '-100%';
            animateLeft = '100%'
        }
        $slises.eq(newIndex).css({left : slideLeft, display: 'blook'});

        $group.animate({left: animateLeft}, function(){
            $slises.eq(currentIndex).css({display:'none'});
            $slises.eq(newIndex).css({left: 0});
            currentIndex = newIndex;
        })
    }
    function advance(){
        clearTimeout(timeout);
        timeout = setTimeout(function(){
            if (currentIndex < ($slises.length - 1)){
                move(currentIndex + 1);
            }else{
                move(0);
            }
        },4000);
    }
    $.each($slises, function(index){
        var $button = $('<button type = "button" class = "slide-btn">&bull;</button>' );
        if (index === currentIndex){
            $button.addClass('active');
        }
        $button.on('click',function(){
            move(index);

        }).appendTo('.slide-buttons');
    });
    advance();
})