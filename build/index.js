$(function() {
    $('.about-page').click(function() {
        TweenLite.to(".blogs", .1, { x: 100, ease: Power1.easeOut, 'display': 'none'});
        TweenLite.to(".work", .1, { x: -60, ease: Power1.easeOut, 'display': 'none'});
        setTimeout(function() {
            TweenLite.to(".about", .1, { x: -10, ease: Power1.easeOut, 'display': 'block'});
            $('.about').css('visiblity', 'visible');
        }, 100);
    });
    $('.home-page').click(function() {
        TweenLite.to(".blogs", .1, { x: 100, ease: Power1.easeOut, 'display': 'none'});
        TweenLite.to(".about", .1, { x: -60, ease: Power1.easeOut, 'display': 'none'});
        TweenLite.to(".work", .1, { x: -60, ease: Power1.easeOut, 'display': 'none'});
        setTimeout(function() {
            TweenLite.to(".blogs", .1, { x: 10, ease: Power1.easeOut, 'display': 'block'});
            $('.home-page').css('visiblity', 'visible');
    }, 200);
    });
    $('.project-page').click(function() {
        TweenLite.to(".blogs", .1, { x: 100, ease: Power1.easeOut, 'display': 'none'});
        TweenLite.to(".about", .1, { x: -60, ease: Power1.easeOut, 'display': 'none'});
        setTimeout(function() {
            TweenLite.to(".work", .1, { x: 10, ease: Power1.easeOut, 'display': 'block'});
            $('.project-page').css('visiblity', 'visible');
    }, 200);
    });
    $('.terminal').click(function() {
        $('#root').toggle('d-block');
    })
});
