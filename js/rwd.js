$(function(){

    // 햄메뉴 여닫기
    $("#ham_btn a").on("click",function(){
        $("#modal").css("display","block");
        $("#ham_wrap").animate({right:0},300);
        $("body").addClass('body_lock')
        return false;
    });
    $(".xi-hamburger-out, #modal").on("click",function(){
        $("#modal").css("display","none");
        $("#ham_wrap").animate({right:-80+"%"},300);
        $("body").removeClass('body_lock')
        return false;
    });

    // 햄메뉴 -> 서브메뉴 여닫기
    $(".ham_main").on("click",function(){
        if ($(this).next().is(':visible')){
            $(this).next().stop().slideUp();
            $(this).find(".xi-caret-down-min").animate({rotate:0+"deg"},300)
        } else {
            $(this).next().stop().slideDown();
            $(this).find(".xi-caret-down-min").animate({rotate:180+"deg"},300)
        }
    });

    // 풀메뉴 마우스 엔터
    $("#main_menu li").on("mouseenter",function(){
        const a = $(this).index();
        const sub = $("#sub_menu ul").eq(a)
        $("#main_menu li").css("color","#414141").css("border-bottom","none")
        $(this).css("color","#005BAE").css("border-bottom","5px solid #005bae")
        $("#sub_menu").slideDown();
        $("#sub_menu ul").css("display","none");
        sub.css("display","block");
    });
    $("#full_menu").on("mouseleave",function(){
        $("#main_menu li").css("color","#414141").css("border-bottom","none");
        $("#sub_menu").slideUp();
        $("#sub_menu ul").css("display","none");
    });
    
    // // 풀메뉴 클릭 이벤트
    // $("#main_menu li").on("click",function(){
    //     const a = $(this).index();
    //     const sub = $("#sub_menu ul").eq(a);
    //     if (sub.is(':visible')){
    //         $("#main_menu li").css("color","#414141").css("border-bottom","none");
    //         $("#sub_menu").slideUp();
    //         $("#sub_menu ul").css("display","none");
    //     } else {
    //         $("#main_menu li").css("color","#414141").css("border-bottom","none");
    //         $(this).css("color","#005BAE").css("border-bottom","5px solid #005bae");
    //         $("#sub_menu").slideDown();
    //         $("#sub_menu ul").css("display","none");
    //         sub.css("display","block");
    //     }
    // });

    // 배너(slick)
    $('#slide_banner').slick({
        dots: true, // 인디케이터 활성화
        autoplay: true,
        infinite: true,
        autoplaySpeed: 3000,
        slidesToShow: 3, // 한 화면에 보여줄 아이템 수
        slidesToScroll: 1,  // 한번에 슬라이드 시킬 아이템 수
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1
                    }
            },

        ]
    });
});