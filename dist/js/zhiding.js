$(document).ready(function(){

    $(".footer").hide();

    $(function () {

    $(window).scroll(function(){

    if ($(window).scrollTop()>100){

    $(".footer").fadeIn(500);

    }

    else

    {

    $(".footer").fadeOut(500);

    }

    });

    $(".footer").click(function(){

    $('body,html').animate({scrollTop:0},100);

    return false;

    });

    });

    });
    