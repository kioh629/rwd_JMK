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

    // 날짜 선택 창 
        // 현재 날짜로 설정하기
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth()+1;
    const date = now.getDate();
    $('input#ticket_time').attr('value',year+'-'+month+'-'+date);
    $('input#ticket_time').attr('min',year+'-'+month+'-'+date);
    $('input#depart_day').attr('value',year+'-'+month+'-'+date);
    $('input#depart_day').attr('min',year+'-'+month+'-'+date);
    $('input#arrival_day').attr('min',year+'-'+month+'-'+date);
        // 편도 - 왕복 선택
    $('.select_date_top .ticket_btn a:last-child').on('click',function(){
        $('.select_date_top .ticket_btn a').removeClass('btn_selected');
        $(this).addClass('btn_selected');
        $('.oneway_trip').css('display','none');
        $('.round_trip').css('display','block');
        return false;
    });
    $('.select_date_top .ticket_btn a:first-child').on('click',function(){
        $('.select_date_top .ticket_btn a').removeClass('btn_selected');
        $(this).addClass('btn_selected');
        $('.round_trip').css('display','none');
        $('.oneway_trip').css('display','flex');
        return false;
    });

    // 승객 연령 및 좌석 선택
        // 창 여닫기
    $('.select_num').on('click', function(){
        if ($('.select_num_window').is(':visible')){
            $('.select_num_window').stop().slideUp();
        } else {
            $('.select_num_window').stop().slideDown();
        }
    })
    $(".select_num_window .close_win").on("click",function(){
        $('.select_num_window').stop().slideUp();
    });
        // 인원 - + 버튼 작동
    $(".add_num .xi-minus-min").on("click",function(){
        let num = $(this).parent().next().attr('value');
        if (num > 0) {
            num--;
            $(this).parent().next().attr('value',num)
        }
    });
    $(".add_num .xi-plus-min").on("click",function(){
        let num = $(this).parent().prev().attr('value');
        if (num < 9) {
            num++;
            $(this).parent().prev().attr('value',num)
        }
    });
        // 인원 선택 시 밸류값 변경 (단독 연령일 경우 - 연령 이름도 반영)
    setInterval(function(){
        let sum = 0;
        $('.num').each(function(){
            sum += parseInt($(this).val());
        });
        if (sum-parseInt($('#adult').val()) == 0){
            $('.select_num input').attr('value','어른 '+sum+'명')
        } else if (sum-parseInt($('#child').val()) == 0){
            $('.select_num input').attr('value','어린이 '+sum+'명')
        } else if (sum-parseInt($('#bady').val()) == 0){
            $('.select_num input').attr('value','유아 '+sum+'명')
        } else if (sum-parseInt($('#senior').val()) == 0){
            $('.select_num input').attr('value','경로 '+sum+'명')
        } else if (sum-parseInt($('#s-disabled').val()) == 0){
            $('.select_num input').attr('value','중증장애인 '+sum+'명')
        } else if (sum-parseInt($('#m-disabled').val()) == 0){
            $('.select_num input').attr('value','경증장애인 '+sum+'명')
        }
        else {
            $('.select_num input').attr('value','총 '+sum+'명');
        }
    });

    // 열차유형 선택
    $("#select_train_box").on("click",function(){
        if ($(".select_train_window").is(':visible')) {
            $('.select_train_window').stop().slideUp();
        } else {
            $('.select_train_window').stop().slideDown();
        }
    });
    $(".select_train_window .close_win").on("click",function(){
        $('.select_train_window').stop().slideUp();
    });
    $(".train_category li").on("click",function(){
        let tname = $(this).text();
        $('#select_train_box').attr('value',tname);
        $('.select_train_window').stop().slideUp();
    });
        // 단일-환승
    $('.round_btn').on("click",function(){
        $('.select_train_top .ticket_btn a').removeClass('btn_selected');
        $(this).addClass('btn_selected');
        $('#select_train_box').attr('value','환승경로');
        return false;
    });
    $('.oneway_btn').on("click",function(){
        $('.select_train_top .ticket_btn a').removeClass('btn_selected');
        $(this).addClass('btn_selected');
        $('#select_train_box').attr('value','KTX');
        return false;
    });

    // 여행상품 - 국내/국외 버튼
    $('.int_btn').on("click",function(){
        $('.trip_btn a').removeClass('p_btn_selected');
        $(this).addClass('p_btn_selected');
        $('#trip_overseas').css('display','none');
        $('#trip_internal').css('display','block');
        return false;

    });
    $('.ove_btn').on("click",function(){
        $('.trip_btn a').removeClass('p_btn_selected');
        $(this).addClass('p_btn_selected');
        $('#trip_internal').css('display','none');
        $('#trip_overseas').css('display','block');
        return false;
    });
});