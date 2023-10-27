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

    // 역 선택 창
    // input클릭 여닫기
    $("#depart").on("click",function(){
        if ($(".select_station_window").is(':visible')){
            $(".select_station_window").stop().slideUp();
        } else {
            $(this).next().stop().slideDown();
        }
    });
    $("#arrival").on("click",function(){
        if ($(".select_station_window").is(':visible')){
            $(".select_station_window").stop().slideUp();
        } else {
            $(this).next().stop().slideDown();
        }
    });
    // 버튼클릭 여닫기
    $(".close_win").on("click",function(){
        $(".select_station_window").stop().slideUp();
        return false;
    });
    // 검색어 필터
    const $station = $('.station li')
    const $search = $('#station_search');
    const cache = [];
    $station.each(function(){
        cache.push({
            element: this,
            text: $(this).text().trim()            
        })
    });
    function filter(){
        const query = this.value.trim();
        cache.forEach(function(li){
            let index = 0;
            if (query) {
                index = li.text.indexOf(query);
            }
            li.element.style.display = index === -1 ? 'none':'';
        });
    };
    $search.on('keyup',filter)
    // 선택창에서 역 클릭 시 밸류값 변경
    $(".select_depart .search_filter ul li").on("click",function(){
        let departure = $(this).text();
        $("#depart").attr('value',departure);
        $("#depart").attr('placeholder',departure);
        $(".select_station_window").stop().slideUp();
    });
    $(".select_arrival .search_filter ul li").on("click",function(){
        let arrival = $(this).text();
        $("#arrival").attr('value',arrival);
        $("#arrival").attr('placeholder',arrival);
        $(".select_station_window").stop().slideUp();
    });
    // 체인지 버튼 클릭 시 출발지-도착지 변경
    $("#select_station>div").on("click",function(){
        let dum = $("#depart").attr("value");
        $("#depart").attr("value",$("#arrival").attr("value"));
        $("#arrival").attr("value",dum); 
    });
});