$(function(){

// 햄메뉴
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

// 풀메뉴
    // 풀메뉴 마우스 엔터
    $("#main_menu li").on("mouseenter",function(){
        const a = $(this).index();
        const sub = $("#sub_menu ul").eq(a)
        $("#main_menu li").css("color","#414141").css("border-bottom","none")
        $(this).css("color","#005BAE").css("border-bottom","5px solid #005bae")
        $("#sub_menu").slideDown();
        $("#sub_menu ul").css("display","none");
        sub.css("display","block");
        return false;
    });
    $("#full_menu").on("mouseleave",function(){
        $("#main_menu li").css("color","#414141").css("border-bottom","none");
        $("#sub_menu").slideUp();
        $("#sub_menu ul").css("display","none");
    });
    
//  빠른 예매 상단 범주 선택
        // 클릭 시 흰색으로
    $('#ticket_category li').on("click",function(){
        $('#ticket_category li').removeClass('ticket_selected');
        $(this).addClass('ticket_selected');
    });
    setInterval(function(){
        if ($('.four_man').hasClass('ticket_selected')){
            $('#select_NumberOfPeople>li').text('총 4명의 인원을 선택하세요')
        } else {
            $('#select_NumberOfPeople>li').text('승객 연령 및 좌석')
        }
        if ($('.tour_train').hasClass('ticket_selected')){
            $('.select_train_top .ticket_sub').text('관광열차를 선택해주세요')
            $('.select_train_top .ticket_btn').css('display','none')
        } else {
            $('.select_train_top .ticket_sub').text('열차유형')
            $('.select_train_top .ticket_btn').css('display','block')
        }
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
    function windowSlide(a,b){
        $(a).on("click",function(){
            if ($(b).is(':visible')){
                $(b).stop().slideUp();
            } else if ($(".window").not(b).is(':visible')){
                $(".window").not(b).stop().fadeOut();
                $(this).next().stop().slideDown();
            } else {
                $(this).next().stop().slideDown();
            }
        });
        $(".close_win").on("click",function(){
            $(b).stop().slideUp();
            return false;
        });
    } 
    windowSlide('#depart','.select_station_window');
    windowSlide('#arrival','.select_station_window');

    // 버튼클릭 여닫기
    $(".close_win").on("click",function(){
        $(".select_station_window").stop().slideUp();
        return false;
    });
    // 검색어 필터
    const $station = $('.station li')
    const $departSearch = $('#depart_search');
    const $arrivalSearch = $('#arrival_search');
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
    $departSearch.on('keyup',filter)
    $arrivalSearch.on('keyup',filter)
    
    // 선택창에서 역 클릭 시 밸류값 변경 + 검색창 및 필터 초기화
    function stationValue(a,b){
        $(a).on("click",function(){
            let station = $(this).text();
            $(b).attr('value',station);
            $(b).attr('placeholder',station);
            $(".select_station_window").stop().slideUp();
            $departSearch.val('');
            $arrivalSearch.val('');
            $('.station li').css('display','block');
        });
    }
    stationValue(".select_depart .search_filter ul li","#depart");
    stationValue(".select_arrival .search_filter ul li","#arrival");
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
        // month, date가 한 자리수가 되면 value값에 입력이 되지 않으므로 -> 앞에 0을 붙임
        if (date < 10){
            $('#ticket_time,#depart_day,#arrival_day').attr('value',year+'-'+month+'-'+'0'+date);
            $('#ticket_time,#depart_day,#arrival_day').attr('min',year+'-'+month+'-'+'0'+date);
        } else if (month < 10){
            $('#ticket_time,#depart_day,#arrival_day').attr('value',year+'-'+'0'+month+'-'+date);
            $('#ticket_time,#depart_day,#arrival_day').attr('min',year+'-'+'0'+month+'-'+date);
        } else if (date < 10 && month < 10) {
            $('#ticket_time,#depart_day,#arrival_day').attr('value',year+'-'+'0'+month+'-'+'0'+date);
            $('#ticket_time,#depart_day,#arrival_day').attr('min',year+'-'+'0'+month+'-'+'0'+date);
        } else {
            $('#ticket_time,#depart_day,#arrival_day').attr('value',year+'-'+month+'-'+date);
            $('#ticket_time,#depart_day,#arrival_day').attr('min',year+'-'+month+'-'+date);
        }
        // 편도 - 왕복 선택
    $('.select_date_top .ticket_btn a:last-child').on('click',function(){
        $('.select_date_top .ticket_btn a').removeClass('btn_selected');
        $(this).addClass('btn_selected');
        $('#oneway_trip').css('display','none');
        $('#round_trip').css('display','block');
        return false;
    });
    $('.select_date_top .ticket_btn a:first-child').on('click',function(){
        $('.select_date_top .ticket_btn a').removeClass('btn_selected');
        $(this).addClass('btn_selected');
        $('#round_trip').css('display','none');
        $('#oneway_trip').css('display','flex');
        return false;
    });

// 승객 연령 및 좌석 선택
        // 창 여닫기
    windowSlide('.select_num','.select_num_window')
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
        // 인원 선택 시 밸류값 변경
    setInterval(function(){
        let sum = 0;
        $('.num').each(function(){
            sum += parseInt($(this).val());
        });
        if (sum-parseInt($('#adult').val()) == 0){
            $('.select_num input').attr('value','어른 '+sum+'명')
        } else if (sum-parseInt($('#senior').val()) == 0) {
            $('.select_num input').attr('value','경로 '+sum+'명')
        }
        else {
            $('.select_num input').attr('value','총 '+sum+'명');
        }
    });

// 할인 선택창
        // 할인 선택 -> 할인 유형 및 인원으로 변경
    setInterval(function(){
        if($('.discount_ticket').hasClass('ticket_selected')){
            $('#select_NumberOfPeople').css('display','none');
            $('#select_discount').css('display','block');
        } else {
            $('#select_NumberOfPeople').css('display','block');
            $('#select_discount').css('display','none');
        }
    });
        // 할인유형 - 여닫기
     windowSlide('.select_dis','.select_dis_window')
        // 할인유형 - 밸류값 변경
    $(".discount_category li").on("click",function(){
        let disName = $(this).text();
        $("#discount").attr('value',disName);
        $(".select_dis_window").stop().slideUp();
    });
        // 인원 - 여닫기
    windowSlide('.select_num_dis','.select_num_window_discount')
        // 인원 - + 버튼 작동
        $(".dis_add_num .xi-minus-min").on("click",function(){
            let num = $(this).parent().next().attr('value');
            if (num > 0) {
                num--;
                $(this).parent().next().attr('value',num)
            }
        });
        $(".dis_add_num .xi-plus-min").on("click",function(){
            let num = $(this).parent().prev().attr('value');
            if (num < 9) {
                num++;
                $(this).parent().prev().attr('value',num)
            }
        });

// 열차유형 선택
    windowSlide('.train','.select_train_window')
        // 밸류 변경
    $(".select_train_window .train_category li").on("click",function(){
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

// 관광열차 변경 시
    setInterval(function(){
        if ($('.tour_train').hasClass('ticket_selected')){
            $('.select_train_window #train_wrap .normal_train').css('display','none');
            $('.select_train_window #train_wrap .tour_train').css('display','block');
        } else {
            $('.select_train_window #train_wrap .tour_train').css('display','none');
            $('.select_train_window #train_wrap .normal_train').css('display','block');
        }
    });
    $('.tour_train li:first-child').on('click',function(){
        $('#depart').attr('value','강릉')
        $('#arrival').attr('value','분천')
    });
    $('.tour_train li:nth-child(2)').on('click',function(){
        $('#depart').attr('value','용산')
        $('#arrival').attr('value','군산')
    });
    $('.tour_train li:nth-child(3)').on('click',function(){
        $('#depart').attr('value','분천')
        $('#arrival').attr('value','철암')
    });
    $('.tour_train li:nth-child(4)').on('click',function(){
        $('#depart').attr('value','부산')
        $('#arrival').attr('value','보성')
    });
    $('.tour_train li:nth-child(5)').on('click',function(){
        $('#depart').attr('value','도라산')
        $('#arrival').attr('value','서울')
    });
    $('.tour_train li:last-child').on('click',function(){
        $('#depart').attr('value','청량리')
        $('#arrival').attr('value','정선')
    });

// 여행상품 - 국내/국외 구분 버튼
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

// 맨 위로 버튼
    $("#scrl_top").on("click",function(){
        $("html, body").animate({scrollTop:0},500);
    })
});