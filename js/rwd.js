$(function(){

    // 햄메뉴 여닫기
    $("#ham_btn a").on("click",function(){
        $("#modal").css("display","block");
        $("#ham_wrap").animate({right:0},300);
        return false;
    });
    $(".xi-hamburger-out, #modal").on("click",function(){
        $("#modal").css("display","none");
        $("#ham_wrap").animate({right:-80+"%"},300);
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

    // 풀메뉴 여닫기
    $("#main_menu li").on("mouseenter",function(){
        const a = $(this).index();
        $("#main_menu li").css("color","#414141").css("border-bottom","none")
        $(this).css("color","#005BAE").css("border-bottom","5px solid #005bae")
        $("#sub_menu").slideDown();
        $("#sub_menu ul").css("display","none");
        $("#sub_menu ul").eq(a).css("display","block");
    });

    $("#full_menu").on("mouseleave",function(){
        const a = $(this).index();
        $("#main_menu li").css("color","#414141").css("border-bottom","none");
        $("#sub_menu").slideUp();
        $("#sub_menu ul").css("display","none");
    });
});