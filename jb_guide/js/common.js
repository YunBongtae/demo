
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////    변수    //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
var publish = { 
		scroll:undefined,
		scrollPosition:undefined,
		contentH: undefined,
		contentH2: undefined,
		contentW: $(window).width(),
		//windowH: $(window).height(),
		listHide: undefined,
		ratio: undefined,
		swiper: undefined,
		swiper2: undefined
}
var appTimeData = []
var appTimeDataOffset = []
var touch = { 
		StartX:undefined,
		StartY:undefined,
		MoveX:undefined,
		MoveY:undefined,
		resultEnd:true
}
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////      ready, load       //////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){ 
	//di_size();
	iPhoneCheck();
	/*document.ontouchmove = function(event){
        event.preventDefault();
    }*/
	allScroll();
	mainSilde();
	search_tab();
	tabBar();
	
	//swiper_container();
	if($('.my_agreement.ty1').children().hasClass('swiper-container')){
		var mainSwiper = $('.my_agreement.ty1 .swiper-container');
			publish.swiper = new Swiper(mainSwiper, {
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			slidesPerView: 2,
			centeredSlides: true,
			paginationClickable: true,
			spaceBetween: 12,
			loop: true
		});
	}
	js_keypad();
	//메인 
	$('.main_list > li').css({'width':publish.contentW});
	$('.main_list').css({'width':publish.contentW*2});
	if($('.main_page .view_box').hasClass('swiper-container')){
		var mainSwiper = $('.view_box.swiper-container');
		dddswiper = new Swiper(mainSwiper, {
			nextButton: '.main_btn_right',
			prevButton: '.main_btn_left',
			slidesPerView: 1,
			centeredSlides: true,
			paginationClickable: true,
			spaceBetween: 0,
			onTransitionEnd :function(){
				if($('.main_list > li').hasClass('news')){
					if($('.news').hasClass('swiper-slide-active')){
						$('.main_btn_left').removeClass('dim');
						$('.main_btn_right').addClass('dim');
						$('.goods').attr('aria-hidden',true);
						$('.news').attr('aria-hidden',false);
						publish.myScroll.refresh();
					}else{
						$('.news').attr('aria-hidden',true);
						$('.goods').attr('aria-hidden',false);
						$('.main_btn_right').removeClass('dim');
						$('.main_btn_left').addClass('dim');
						publish.myScroll.refresh();
					}
				}
			}
		});
	}
	//금융상품몰
	if($('.goods_main .view_box').hasClass('swiper-container')){
		var mainSwiper = $('.view_box.ty1.swiper-container');
		dddswiper = new Swiper(mainSwiper, {
			nextButton: '.main_btn_right',
			prevButton: '.main_btn_left',
			slidesPerView: 1,
			centeredSlides: true,
			paginationClickable: true,
			spaceBetween: 0,
			onTransitionEnd :function(){
				if($('.main_list > li').hasClass('recommend')){
					if($('.view_box.ty1 .best').hasClass('swiper-slide-active')){
						$('.view_box.ty1 .main_btn_right').removeClass('dim');
						$('.view_box.ty1 .main_btn_left').addClass('dim');
						$('.view_box.ty1 .recommend').attr('aria-hidden',true);
						$('.view_box.ty1 .best').attr('aria-hidden',false);
						publish.myScroll.refresh();
					}else{
						$('.view_box.ty1 .best').attr('aria-hidden',true);
						$('.view_box.ty1 .recommend').attr('aria-hidden',false);
						
						$('.view_box.ty1 .main_btn_left').removeClass('dim');
						$('.view_box.ty1 .main_btn_right').addClass('dim');
						publish.myScroll.refresh();
					}
				}
			}
		});
	}
	
	$(document).on('click','.date .ui-state-default',function(){
		//alert('ff')
		$(this).parents('.date').find('.ui-datepicker-inline.ui-datepicker').css({'display':'none'});
		var select_day = ui-state-active;
		
	});
	var appScrollTop;
	//0305 수정
	//$('div[data-rel="app_scroll"]').scrollTop(appScrollTop)
	appScroll();
	
	$('div[data-rel="app_scroll"]').scroll(function(e){
		appScrollTop = $('div[data-rel="app_scroll"]').scrollTop();
		var scrollTop = $('div[data-rel="app_scroll"]').scrollTop();
			if(scrollTop > 0){
				$('.bank_book_box').slideUp(function(){
					appScroll();
				});
			}else{
				$('.bank_book_box').slideDown(function(){
					appScroll();
				});
			}
		var ulOffset =$('.app_bank_account').position().top;
		var ulHeight =$('.app_bank_account').height();
		
		var liFirstList = $('.app_bank_account li[data-rel="liList"]').eq(0);
		var liFirstListHeight = $('.app_bank_account li[data-rel="liList"]').eq(0).height();
		var liprevIndex = liFirstList.index();
	
	});
	
	
	$(document).on('click','.date .ui-state-default',function(){
		//alert('ff')
		$(this).parents('.date').find('.ui-datepicker-inline.ui-datepicker').css({'display':'none'});
		var select_day = ui-state-active;
		
	});
	
	$(document).on('click','.opt_form.two_small',function(e){
		
		var wrapperName = $(this).parents('.clause_content');
		var inputNum = $(this).parents('.clause_content').find('.opt_form.two_small:not(.ds_none)').index(this);
		var inputLength = $(this).parents('.clause_content').find('.opt_form.two_small:not(.ds_none)').length;
		
		var inputPrev = $(this).parents('.clause_content').find('.opt_form.two_small:not(.ds_none)').eq(inputNum-1);
		var inputNext = $(this).parents('.clause_content').find('.opt_form.two_small:not(.ds_none)').eq(inputNum+1);
		var inputNextNext = $(this).parents('.clause_content').find('.opt_form.two_small:not(.ds_none)').eq(inputNum+2);
		
		var thisPosition = $(this).parents('.clause_content > div').offset().top
		var thisTop = $(this).offset().top;
		var prevTop = inputPrev.offset().top;
		
		if((inputNum+1) !== inputLength){
			var nextTop = inputNext.offset().top;
		}
		//console.log(inputNum+2)
		if((inputNum+2) < inputLength){
			var nextNextTop = inputNextNext.offset().top;
		}
		var thisChecked = $(this).find('span:last').find('input').prop('checked');
		var prevChecked = inputPrev.find('span:last').find('input').prop('checked');
		var nextChecked = inputNext.find('span:last').find('input').prop('checked');
		if(thisChecked){
			if(prevChecked ==false && (inputNum-1) !== -1){
				//console.log('이전꺼 안되어 있다.')
				var prevTop = inputPrev.offset().top;
				$(this).parents('.clause_content').animate({scrollTop:prevTop-thisPosition-50},300);
			}else if(nextChecked){
				//console.log('다음꺼 ok')
				$(this).parents('.clause_content').animate({scrollTop:nextNextTop-thisPosition-50},300)
			}else if(thisChecked){
				//console.log('지금꺼 ok')
				$(this).parents('.clause_content').animate({scrollTop:nextTop-thisPosition-50},300)
			}else{
				//console.log('다음꺼 안되어 있다')
				if((inputNum+1) !== inputLength){
					$(this).parents('.clause_content').scrollTop(nextNextTop-thisPosition-50, 300);
				}
			}
		}
	});
	
	/* 금융상품몰 슬라이드*/
	if($('.goods_banner.ty1').hasClass('swiper-container')){
		var mainSwiper = $('.goods_banner.ty1.swiper-container');
		publish.swiper = new Swiper(mainSwiper, {
			nextButton: '.banner_btn_right',
			prevButton: '.banner_btn_left',
			slidesPerView: 1,
			pagination: '.swiper-pagination',
			centeredSlides: true,
			paginationClickable: true,
			spaceBetween: 0,
			onTransitionEnd :function(){
				$('.goods_banner.ty1 .swiper-slide').attr('aria-hidden',true);
				$('.goods_banner.ty1 .swiper-slide-active').attr('aria-hidden',false);
				if($('.goods_banner.ty1 .swiper-wrapper li').eq(0).hasClass('swiper-slide-active') == false){
					$('.banner_btn_left').css({'opacity':'1'});
				}
				var bannerLength = $('.goods_banner.ty1 .swiper-wrapper li').length-1;
				if($('.goods_banner.ty1 .swiper-wrapper li').eq(bannerLength).hasClass('swiper-slide-active') == false){
					$('.banner_btn_right').css({'opacity':'1'});
				}
			},
			onReachBeginning :function(){
				$('.banner_btn_left').css({'opacity':'.2'});
			},
			onReachEnd :function(){
				$('.banner_btn_right').css({'opacity':'.2'});
			}
		});
	}
	
	goodsMain();
	mainSilde();
	/* mod : 20160219 Jerrold begin */
	if($('.app_start > div').hasClass('swiper-container')){
		var mainSwiper = $('.swiper-container');
		publish.swiper = new Swiper(mainSwiper, {
			nextButton: '.app_btn_right',
			prevButton: '.app_btn_left',
			slidesPerView: 1,
			pagination: '.swiper-pagination',
			centeredSlides: false,
			paginationClickable: false,
			spaceBetween: 0,
			onTransitionStart :function(){
				$('.app_start .swiper-slide').attr('aria-hidden',true);
				$('.app_start .swiper-slide-active').attr('aria-hidden',false);
				var listLength = $('.swiper-wrapper > li').length
				if($('.swiper-wrapper .swiper-slide').eq(0).hasClass('swiper-slide-active') == false){
					$('.app_btn_left, .mobile_event .app_btn_left').show();
				}
				//console.log(listLength)
				if($('.swiper-wrapper li').eq(listLength-2).hasClass('swiper-slide-active')){
					$('.app_btn_right, .mobile_event .app_btn_right').show();
				}
				var pageNumber = $('.swiper-pagination-bullet-active').index();
				$('.swiper-pagination-bullet').html('');
				$('.swiper-pagination-bullet-active').html('<b>'+(listLength)+'페이지 중 '+(pageNumber+1)+'번째 페이지</b>');
				
			},
			onReachBeginning :function(){
				$('.app_btn_left, .mobile_event .swiper-container .app_btn_left').hide();
				var listLength = $('.swiper-wrapper').length
				var pageNumber = $('.swiper-pagination-bullet-active').index();
				$('.swiper-pagination .swiper-pagination-bullet').eq(0).html('<b>'+(listLength+1)+'페이지 중 1번째 페이지</b>');
			},
			onReachEnd :function(){
				$('.app_btn_right, .mobile_event .swiper-container .app_btn_right').hide();
			}
		});
	}
	/* mod : 20160219 Jerrold end */
	if(/*$('.app_start > div').hasClass('swiper-container') || */$('.app_bank_start > div').hasClass('swiper-container') || $('.mobile_event > div').hasClass('swiper-container')){
		var mainSwiper = $('.swiper-container');
		publish.swiper = new Swiper(mainSwiper, {
			nextButton: '.app_btn_right',
			prevButton: '.app_btn_left',
			slidesPerView: 1,
			pagination: '.swiper-pagination',
			centeredSlides: true,
			paginationClickable: true,
			spaceBetween: 0,
			onTransitionStart :function(){
				$('.app_start .swiper-slide').attr('aria-hidden',true);
				$('.app_start .swiper-slide-active').attr('aria-hidden',false);
				/*if($('.news').hasClass('swiper-slide-active')){
					$('.main_btn_left').removeClass('dim');
					$('.main_btn_right').addClass('dim');
					$('.goods').attr('aria-hidden',true);
					$('.news').attr('aria-hidden',false);
					publish.myScroll.refresh();
				}else{
					$('.news').attr('aria-hidden',true);
					$('.goods').attr('aria-hidden',false);
					$('.main_btn_right').removeClass('dim');
					$('.main_btn_left').addClass('dim');
					publish.myScroll.refresh();
				}*/
				var listLength = $('.swiper-wrapper li').length
				if($('.swiper-wrapper .swiper-slide').eq(0).hasClass('swiper-slide-active') == false){
					$('.app_btn_left, .mobile_event .app_btn_left').show();
				}
				console.log(listLength)
				if($('.swiper-wrapper li').eq(listLength-2).hasClass('swiper-slide-active')){
					$('.app_btn_right, .mobile_event .app_btn_right').show();
				}
				var pageNumber = $('.swiper-pagination-bullet-active').index();
				$('.swiper-pagination-bullet').html('');
				$('.swiper-pagination-bullet-active').html('<b>'+(listLength+1)+'페이지 중 '+(pageNumber+1)+'번째 페이지</b>');
				//swiper-pagination-bullet swiper-pagination-bullet-active
			},
			onReachBeginning :function(){
				$('.app_btn_left, .mobile_event .swiper-container .app_btn_left').hide();
				var listLength = $('.swiper-wrapper').length
				var pageNumber = $('.swiper-pagination-bullet-active').index();
				$('.swiper-pagination .swiper-pagination-bullet').eq(0).html('<b>'+(listLength+1)+'페이지 중 1번째 페이지</b>');
			},
			onReachEnd :function(){
				$('.app_btn_right, .mobile_event .swiper-container .app_btn_right').hide();
			}
		});
	}
	$('.app_bank_start .app_next_btn').click(function(){
		$('.app_bank_start .app_btn_right').trigger('click');
	});
	//tab 이벤트
	if ($('[data-rel="tab_box"] ul li, [data-rel="tab_btn"] li').is(".on")) {
		var $base_choise = $('[data-rel="tab_box"] ul li');
		var thisNum = $base_choise.index();
		var tabNum = $base_choise.length;
		var $TabBtn_cho = $('[data-rel="tab_btn"] li');
		var TabBtnThis = $TabBtn_cho.index();
		var TabBtnNum = $TabBtn_cho.parent().children('li').length;
		var $Tab2Btn_cho = $('.tab01 [data-rel="tab_btn"] li');
		var Tab2BtnThis = $Tab2Btn_cho.index();
		var Tab2BtnNum = $Tab2Btn_cho.parent().children('li').length;

		$base_choise.attr('title','');
		$TabBtn_cho.attr('title','');
		$('[data-rel="tab_box"] ul li.on').attr('title',(tabNum) + '개탭 중 ' + (thisNum+1) + '번째 탭 선택됨');
		$('[data-rel="tab_btn"] ul li.on').attr('title',(TabBtnNum) + '개탭 중 ' + (TabBtnThis+1) + '번째 탭 선택됨');
		$('.tab01 [data-rel="tab_btn"] ul li.on').attr('title',(Tab2BtnNum) + '개탭 중 ' + (Tab2BtnThis+1) + '번째 탭 선택됨');
		$('.tab02 [data-rel="tab_btn"] ul li.on').attr('title',(Tab2BtnNum) + '개탭 중 ' + (Tab2BtnThis+1) + '번째 탭 선택됨');
	}

	$('.tab01 .banner_area').addClass('sub_banner');
	if ($(".sub_banner").is(':visible')) {
		sub_banner();
	}
});

$(window).load(function(){ 
	allScroll();
	stepMake();
	tabHeight();
	selectStart();
	scrollTopMade();
	//content_padding();
	if($('.app_start > div').hasClass('swiper-container')){
		publish.swiper.update();
	}
	//160216
	scrollPosition();
});

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////    이벤트    //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

//약관 자동스크롤


//tab 버튼 클릭 이벤트
$('[data-rel="tab_btn"] ul li:not(.btn_no), [data-rel="tab_btn"] li:not(.btn_no)').on('click',function(){
	var thisNum = $(this).index();
	var tabNum = $(this).parent().children('li').length;
	$(this).attr('title',(tabNum) + '개탭 중 ' + (thisNum+1) + '번째 탭 선택됨');
	$(this).siblings('li').attr('title','');
	$(this).addClass('on');
	$(this).siblings('li').removeClass('on');
});
$('[data-rel="tab2_btn"] li').on('click',function(){
	var thisNum = $(this).index();
	var tabNum = $('[data-rel="tab2_btn"] li').length;
	$(this).attr('title',(tabNum) + '개탭 중 ' + (thisNum+1) + '번째 탭 선택됨');
	$(this).siblings('li').attr('title','');
	$(this).addClass('on');
	$(this).siblings('li').removeClass('on');
});
//tab-btn 버튼 클릭 이벤트
$('[data-rel="tab3_btn"] > li:not(.btn_no)').on('click',function(){
	var thisNum = $(this).index();
	var tabNum = $(this).parent().children('li').length;

	if ($(this).is('.btn_all')) {
		$(this).siblings('li').attr('title','');
		$(this).attr('title',(tabNum) + '개탭 중 ' + (thisNum+1) + '번째 유형 선택됨');
		$(this).addClass('on');
		$(this).siblings('li').removeClass('on');
	} else {
		if ($(this).is('.on')) {
			$(this).attr('title',(tabNum) + '개탭 중 ' + (thisNum+1) + '번째 유형 선택됨');
			$(this).toggleClass('on').attr('title','');
			$(this).parent().children('.btn_all').removeClass('on');
		} else {
			$(this).attr('title','');
			$(this).attr('title',(tabNum) + '개탭 중 ' + (thisNum+1) + '번째 유형 선택됨');
			$(this).toggleClass('on');
			$(this).parent().children('.btn_all').removeClass('on');
		}
	}
	
});
//리스트 클릭 이벤트
$('ul[data-rel="list_on"] li').on('click touchend',function(e){
	if(e.type === 'touchend' || e.type === 'click'){
		var thisNum = $(this).index();
		var thisOrder =  $(this).parent('ul').find('li').length;
		$(this).attr('title',thisOrder+'개 리스트 중에 '+(thisNum+1)+'번째 리스트');
		$(this).siblings('li').attr('title','');
		$(this).addClass('on');
		$(this).siblings('li').removeClass('on');
		//console.log(thisNum);
	}
});

var setTimecursor;
//number_input
$('[data-rel="number_input"]').on('touchend click',function(){
	$(this).find('input').focus();
	/*setTimecursor = setInterval(function(){  
		if($('.cursor_view').css('display') == 'block'){
			$('.cursor_view').css({'display':'none'});
		}else{
			$('.cursor_view').css({'display':'block'});
		}
		$('[data-rel="number_input"] input').on('focusout',function(){
			clearInterval(setTimecursor);
			$('.cursor_view').css({'display':'none'});
		});
	}, 600);*/
	$(this).find('.cursor_view').css({'display':'block'});
	$('[data-rel="number_input"] input').on('focusout',function(){
		$(this).parents('[data-rel="number_input"]').find('.cursor_view').css({'display':'none'});
	});
	
});
$('[data-rel="number_input"] input').on('keypress keyup',function(e){
	//console.log(e.keyCode)
	//console.log('fff')
	var numValue = $(this).val().length;
	var numChange = '';
	for(var i=0 ; i < numValue; i++){
		numChange = numChange +'*';
	}
	$(this).parents('[data-rel="number_input"]').find('.fake_input .password_view').html(numChange);
});

//휴대폰 본인인증 전체동의
$(document).on('click', '.all_check_box', function(){
	$('[data-rel="all_check_list]').slideToggle();
});

// 휴대폰 본인인증 선택해제
$(document).on('click', '.all_check_box input', function(){
	if($('.all_check_box input').is(':checked')==true){
		$('div[data-rel="all_check_list"] input').prop('checked',true);
		$('div[data-rel="all_check_list"]').slideUp();
		
		//$('.total_check').siblings('div').slideDown();
	}else{
		$('div[data-rel="all_check_list"] input').prop('checked',false);
		$('div[data-rel="all_check_list"]').slideDown();
	};
});
$(document).on('click', 'div[data-rel="all_check_list"] input', function(){
	if($(this).prop('checked') == false){
		$('.all_check_box input').prop('checked',false);
	}else if($('div[data-rel="all_check_list"] input:checked').length == $('div[data-rel="all_check_list"] input').length ){
		$('.all_check_box input').prop('checked',true);
	}
});


//약관 전체동의 선택해제
$(document).on('click', '[data-rel="all_check_input"] input', function(){
	if($(this).parents('[data-rel="all_check_input"]').find('input:not([data-type="inner_radio"])').is(':checked')==true){
		$(this).parents('[data-type="check_select"]').find('[data-rel="all_check_list"] input:not([data-type="inner_radio"])').prop('checked',true);
		$(this).parents('[data-type="check_select"]').find('input[data-type="inner_radio"]').removeAttr('disabled');
	}else{
		$(this).parents('[data-type="check_select"]').find('[data-rel="all_check_list"] input:not([data-type="inner_radio"])').prop('checked',false);
		$(this).parents('[data-type="check_select"]').find('input[data-type="inner_radio"]').attr('disabled','disabled');
	};
});

$(document).on('click', '[data-rel="all_check_list"] input', function(){
	if($(this).attr('data-type') !== 'inner_radio'){
		if($(this).prop('checked') == false){
			$(this).parents('[data-type="check_select"]').find('[data-rel="all_check_input"] input').prop('checked',false);
		}else if($(this).parents('[data-type="check_select"]').find('[data-rel="all_check_list"] input:checked:not([data-type="inner_radio"])').length == $(this).parents('[data-type="check_select"]').find('[data-rel="all_check_list"] input:not([data-type="inner_radio"])').length ){
			$(this).parents('[data-type="check_select"]').find('[data-rel="all_check_input"] input').prop('checked',true);
		} 
		if($(this).parents('[data-type="check_select"]').find('[data-rel="all_check_list"] input:not([data-type="inner_radio"])').is(':checked')==false ){
			$(this).parents('[data-type="check_select"]').find('input[data-type="inner_radio"]').attr('disabled','disabled');
		}else{ 
			$(this).parents('[data-type="check_select"]').find('input[data-type="inner_radio"]').removeAttr('disabled');
		}
	}
});

//약관 전체동의 안에 선택해제
$(document).on('click', '[data-rel="form_list_box"] div[data-rel="all_check_input2"] input[data-type="inner_radio"]', function(){
	if($('div[data-rel="all_check_input2"] input[data-type="inner_radio"]').is(':checked')==true){
		$(this).parents('[data-rel="form_list_box"]').find('[data-rel="all_check_list2"] input[data-type="inner_radio"]').prop('checked',true);
	}else{
		$(this).parents('[data-rel="form_list_box"]').find('[data-rel="all_check_list2"] input[data-type="inner_radio"]').prop('checked',false);
	};
});

$(document).on('click', '[data-rel="all_check_list2"] input', function(){
	if($(this).prop('checked') == false){
		//console.log('ffff')
		$(this).parents('[data-rel="form_list_box"]').find('[data-rel="all_check_input2"] input').prop('checked',false);
	}else if($(this).parents('[data-rel="all_check_list2"]').find('input:checked[data-type="inner_radio"]').length == $(this).parents('[data-rel="all_check_list2"]').find('input[data-type="inner_radio"]').length ){
		$(this).parents('[data-rel="form_list_box"]').find('[data-rel="all_check_input2"] input').prop('checked',true);
	} 

});

//휴대폰 인증 slide
$('.phone_slide').on('click',function(){
	$('div[data-rel="all_check_list"]').slideToggle();
	$(this).toggleClass('on');
})

//search_tab 클릭 이벤트
$('.search_tab[data-rel="tab_box"] li.tab_arrow').on('click',function(e){
	//console.log(e)
	var liBtn = $('.search_tab .tab_arrow').width();
	var liW = (publish.contentW - liBtn)/3;
	if($(this).hasClass('left')){
		$(this).removeClass('left');
		$(this).parents('[data-rel="tab_box"]').find('.move_tab').css({'left':'0px','-webkit-transition': 'left 400ms','transition': 'left 400ms'});
		$(this).parents('[data-rel="tab_box"]').find('.tab_bar').css({'left':'0px'});
		$('.tab01').css({'display':'block'});
		$('.tab01').siblings('div').css({'display':'none'});
		$('.move_tab li').removeClass('on');
		$('li[data-rel="tab01"]').addClass('on');
		$('[data-rel="tab_box"] li').attr('title','');
		$('li[data-rel="tab01"]').attr('title','6개 중에 1번째 탭');
	}else{
		$(this).addClass('left');
		$(this).parents('[data-rel="tab_box"]').find('.move_tab').css({'left':-liW*3,'-webkit-transition': 'left 400ms','transition': 'left 400ms'});
		$(this).parents('[data-rel="tab_box"]').find('.tab_bar').css({'left':'42px'});
		$('.tab04').css({'display':'block'});
		$('.tab04').siblings('div').css({'display':'none'});
		$('.move_tab li').removeClass('on');
		$('li[data-rel="tab04"]').addClass('on');
		$('[data-rel="tab_box"] li').attr('title','');
		$('li[data-rel="tab04"]').attr('title','6개 중에 4번째 탭');
	}
});

//하단 버튼 클릭시 상단이동
$(document).on('click','.scroll_top', function(){
	$('#content section').scrollTop(0);
});

//숨김 테이블 보여주기
$(document).on('click','button[data-rel="btn_open"]', function(){
	if($(this).hasClass('on')){		
		 var tableLength = $(this).parents('.table3').find('tbody tr').length;
		 for(var i = publish.listHide; i< tableLength+1; i++){
			 $(this).parents('.table3').find('tbody tr').eq(i).css({'display':'none'})
		 }
		$(this).removeClass('on');
		$(this).parents('[data-type="btn_hidden"]').find('.btn_center').css({'display':'none'})
		$(this).parents('[data-type="btn_hidden"]').find('button[data-rel="btn_open"]').removeClass('borBot')
	}else{
		$(this).parents('.table3').find('tr').css({'display':'table-row'});
		$(this).addClass('on');
		$(this).parents('.table3').find('tr').eq(publish.listHide+1).focus();
		$(this).parents('[data-type="btn_hidden"]').find('.btn_center').css({'display':'block'})
		$(this).parents('[data-type="btn_hidden"]').find('button[data-rel="btn_open"]').addClass('borBot')
	}
});
//tab 클릭 이벤트
$('div[data-rel="tab_box"] ul li').on('click',function(){
	if($(this).hasClass('tab_arrow') == false){
		if($(this).parents('ul').hasClass('move_tab')){
			if($('.move_tab').hasClass('ty2')){
				var liLeft = $(this).position()['left'];
				$('.tab_bar').css({'left':liLeft+1,'-webkit-transition': 'left 300ms','transition': 'left 300ms'});
			}else{
				var liLeft = $(this).offset()['left'];
				$('.tab_bar').css({'left':liLeft,'-webkit-transition': 'left 300ms','transition': 'left 300ms'});
			}
		}
		var $base_choise = $('[data-rel="tab_box"] ul li')
		var thisNum = $(this).index();
		var tabNum = $base_choise.length;
		$(this).attr('title',(tabNum) + '개탭 중 ' + (thisNum+1) + '번째 탭 선택됨')
		$(this).siblings('li').attr('title','')
		var thisData = $(this).attr('data-rel');
		$(this).siblings('li').removeClass('on').removeClass('liBorN');
		$(this).addClass('on').removeClass('liBorN');
		$('.'+thisData).css({'display':'block'});
		$('.'+thisData).siblings('div').css({'display':'none'});
		$(this).parents('.tab_box2').find('ul li').eq(thisNum+1).addClass('liBorN');
		
		$('.banner_area').removeClass('sub_banner');
		$('.'+thisData).find('.banner_area').addClass('sub_banner'/* + (thisNum+1)*/);

		swiper_container();
		swiper_container02();
		
		var $event = $(".sub_banner");
		var $list = $event.find(".pagebox_area");
		var $listUl = $event.find(".pagebox");
		var $listLi = $listUl.children(".pagebox_list");
		var $listTab = $listLi.children(".tab");
		var $listCont = $listLi.children(".banner_cont");
		var $contImg = $listCont.find("img");
		
		var listTotal = $listLi.length;
		var listNum = 0;
		var listOld =-1;
		var isChange = false;
		var isDrag = false;

		if ($('.sub_banner').is(':visible')) {
			$('.sub_banner .pagebox_list:not(:eq(0))').removeClass('on');
			$('.sub_banner .pagebox_list:first-child').addClass('on');
			$list.height($contImg.outerHeight());
			$listUl.css({ marginTop:$list.height() - $listUl.height() - parseInt($listUl.css("margin-bottom")) });
			sub_banner();
		}
	}
	
});

/* 약관 체크 클릭시 약관 내려옴*/
$('[data-rel="inner_check_all"]').on('click', function(e){
	//스크롤 수정
	if($(this).find('input').is(':checked')==false ){
		$(this).next('[data-rel="inner_scroll_all"]').slideDown(300);
		$(this).removeClass('on')
	}else{
		$(this).next('[data-rel="inner_scroll_all"]').slideUp(300);
		$(this).addClass('on')
	}
});

$('div[data-rel="inner_check"]').on('click', function(){
	//스크롤 수정
	if($(this).find('input').is(':checked')==false){
		/*$(this).parents('div[data-rel="inner_scroll"]').find('div[data-rel="scroll_box"]').slideDown(300,function(){
			var clauseID = $(this).parents('div[data-rel="inner_scroll"]').find('div[data-rel="scroll_box"]').attr('id');
			if(clauseID == 'clause_scroll05' ||clauseID == 'clause_scroll06'){
				if($('#'+clauseID).attr('data-rel') == "scroll_box"){
					publish.myScroll = new IScroll('#'+clauseID, function (e) { e.preventDefault(); });
				}
			}
		});*/
		$(this).parents('div[data-rel="inner_scroll"]').find('div[data-rel="scroll_box"]').slideDown(300);
		
		$(this).parents('div[data-rel="inner_scroll"]').removeClass('down');
		if($(this).find('label').html() == '확인완료'){
			$(this).find('label').html('약관확인')
		}
		if($(this).find('label').html() == '내용확인'){
			$(this).find('label').html('내용보기')
		}
		/*publish.myScroll.refresh();*/
	}else{
		$(this).parents('div[data-rel="inner_scroll"]').find('div[data-rel="scroll_box"]').slideUp(300);
		if($(this).find('label').html() == '약관확인'){
			$(this).find('label').html('확인완료')
		}
		if($(this).find('label').html() == '내용보기'){
			$(this).find('label').html('내용확인')
		}
		$(this).parents('div[data-rel="inner_scroll"]').addClass('down');
	}
});
/* 약관 타이틀 클릭시 약관 내려옴*/
/* choi kyeong-rak */
/*
$(document).ready(function(){ 
	var $clause_tit = $('.clause_title');
	var $clause_name = $clause_tit.find('.name');
	var $clause_cont = $('.clause_content');
	
	if ($clause_tit.parent().find('.clause_content')){
		$clause_name.append('<span class="color_tp">내용닫기</span>');
		$clause_name.css({cursor: 'pointer'});
	} else {
		$clause_name.css({cursor: 'auto'});
	}
});*/
$('.clause_title .name').on('click', function(){
	if($(this).parents('div[data-rel="inner_scroll"]').hasClass('down')){
		//스크롤 수정
		/*var clauseScroll;
		$(this).parents('div[data-rel="inner_scroll"]').find('div[data-rel="scroll_box"]').slideDown(300,function(){
			var clauseID = $(this).parents('div[data-rel="inner_scroll"]').find('div[data-rel="scroll_box"]').attr('id');
			if(clauseID == 'clause_scroll05' ||clauseID == 'clause_scroll06'){
				if($('#'+clauseID).attr('data-rel') == "scroll_box"){
					clauseScroll = new IScroll('#'+clauseID, function (e) { e.preventDefault(); });
				}
			}
		});*/
		$(this).parents('div[data-rel="inner_scroll"]').find('div[data-rel="scroll_box"]').slideDown(300);
		
		$(this).parents('div[data-rel="inner_scroll"]').removeClass('down');
		$(this).find('.color_tp').text('내용닫기');
		
	}else{
		$(this).parents('div[data-rel="inner_scroll"]').find('div[data-rel="scroll_box"]').slideUp(300);
		$(this).parents('div[data-rel="inner_scroll"]').addClass('down');
		$(this).find('.color_tp').text('내용열기');
	}
});

//탭버튼 박스
$('div[data-rel="slide_box"] div[data-rel="slide_title"], div[data-rel="slide_box"] a[data-rel="slide_title"]').on('click',function(){
	$(this).toggleClass('on');
	$(this).siblings('div').slideToggle();
	$(this).parent('[data-rel="slide_box"]').siblings('div').find('div[data-rel="slide_title"]').removeClass('on');
	$(this).parent('[data-rel="slide_box"]').siblings('div').find('.slide_content').slideUp();
	if($('div[data-rel="slide_title"]').hasClass('on')){
		$(this).find('.hidden_text, .slide_arrow').html('내용닫기');
	}else{
		$(this).find('.hidden_text, .slide_arrow').html('내용열기');
	}
	//console.log('dd')
});

//1207 일단 보류
$('div[data-rel="slide_box1"] div[data-rel="slide_title"], div[data-rel="slide_box1"] a[data-rel="slide_title"]').on('click',function(){
	$(this).toggleClass('on');
	$(this).siblings('div').slideToggle();
	if($('div[data-rel="slide_title"]').hasClass('on')){
		$(this).find('.hidden_text').html('내용닫기');
	}else{
		$(this).find('.hidden_text').html('내용열기');
	}
});

//리스트 이동
$(document).on('click','ul[data-rel="move_list"] li.on .up_down_btn > button,ul[data-rel="move_list"] li ',function(){
	if($(this).parents('li').hasClass('on')){
		var thisBox =  $('ul[data-rel="move_list"] li.on');		
		var thisNum =  $('ul[data-rel="move_list"] li.on').attr('data-rel');
		var liLength = $('ul[data-rel="move_list"] li').length
		var thisObjTop = Number(thisBox.css('top').split('px')[0]);
		var changLi;
		
		if($(this).hasClass('btn_up')){
			if($(this).parents('li').attr('data-rel') !== '1'){
				var prevObjTop = Number($('li[data-rel="'+(Number(thisNum)-1)+'"]').css('top').split('px')[0]);
				//위에 li 움직임
				$('li[data-rel="'+(Number(thisNum)-1)+'"]').css({'top':thisObjTop, 'transition':'top 200ms'}).attr('data-rel',thisNum);
				//선택 된 li 움직임
				$('li.on[data-rel="'+thisNum+'"]').css({'top':prevObjTop, 'transition':'top 200ms'}).attr('data-rel',Number(thisNum)-1);			
				changLi = Number(Number(thisNum)-1)
			}
		}else if($(this).hasClass('btn_down')){
			if($(this).parents('li').attr('data-rel') !== String(liLength)){
				var nextObjTop = Number($('li[data-rel="'+(Number(thisNum)+1)+'"]').css('top').split('px')[0]);
				//아래 li 움직임
				$('li[data-rel="'+(Number(thisNum)+1)+'"]').css({'top':thisObjTop, 'transition':'top 200ms'}).attr('data-rel',thisNum);
				//선택 된 li 움직임
				$('li.on[data-rel="'+thisNum+'"]').css({'top':nextObjTop, 'transition':'top 200ms'}).attr('data-rel',Number(thisNum)+1);
				changLi = Number(thisNum)+1
			}
		}
	//	if(Number($(this).parents('li').attr('data-rel')) <= liLength && Number($(this).parents('li').attr('data-rel')) == 1){
			setTimeout(function(){
				var moveList = []
				
				$('ul[data-rel="move_list"] li').each(function(){
					var innerLi = $(this).html();
					var listNum = $(this).attr('data-rel');
					moveList[Number(listNum)-1] = innerLi;
				});
				$('ul[data-rel="move_list"] li').each(function(){
					var listNum2 = $(this).index();
					//console.log(listNum2);
					$(this).html(moveList[Number(listNum2)]);
					$(this).attr('data-rel',listNum2+1);
				});
				$('ul[data-rel="move_list"] li').css({'transition':'top 0ms'}).removeClass('on');
				$('ul[data-rel="move_list"] li').eq(changLi-1).addClass('on');
				selectStart();
			},300);
	//	}
	}else{
		$(this).addClass('on');
		$(this).siblings('li').removeClass('on');
	}
	return false;
});

/* 약관 타이틀 클릭시 약관 내려옴*/
$('.search_enter').on('click', function(){
	if($('.bank_book_search').hasClass('on')){
		$('.bank_book_search').css({'top':'-208px'}).removeClass('on');
	}else{
		$('.bank_book_search').css({'top':'0'}).addClass('on');
	}
});

/* 앱통장 찾기*/
$('.app_inquiry .app_btn').on('click', function(){
	$(this).parent('.app_period').css({'display':'none'})
	$(this).parents('.app_inquiry').find('.app_search').css({'display':'block'})
});

$('.app_inquiry .app_search input').on('keyup', function(){
	var searchText = $(this).val();
	var searchTextLength = searchText.length;
	if(searchTextLength > 0){
		$('.app_btn_box').show();
	}else{
		$('.app_btn_box').hide();
	}
});

$('.app_inquiry .input_del').on('click', function(){
	console.log('dd')
	$('.app_inquiry .app_search input').val('');
	$('.app_btn_box').hide();
	$(this).parent('.app_search').css({'display':'none'})
	$(this).parents('.app_inquiry').find('.app_period').css({'display':'block'})
});
/* 모바일 웹 메뉴*/
$('.mobile_menu_list > li em a, .languages_menu_list > li em a, .search_result_list > li em a').on('click', function(){
	if($(this).parents('li').hasClass('sub_menuN')==false){
		if($(this).parents('li').hasClass('on')){
			$(this).parent('em').siblings('ul').slideUp(); 
			$(this).parents('li').removeClass('on'); 
		}else{
			$(this).parent('em').siblings('ul').slideDown(); 
			$(this).parents('li').addClass('on'); 
		}
	}
});

//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////    함수    //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// 화면 전체 스크롤
var allScroll = function() {
	
	var headH = $('#header').outerHeight(true);
	var popupHeadH = $('#header').outerHeight(true);
	var topBox = $('.top_box').outerHeight(true);
	var windowH = $('#wrap').height()
	publish.contentH = windowH-headH-topBox;
	publish.contentH2 = windowH-popupHeadH-topBox;
	
	$('#popup_content section').css({'height':publish.contentH2});
	/* del : 20160225 Jerrold 
	$('#content section, #popup_content section').css({'height':publish.contentH}); 
	$('.main #content section').css({'height':publish.contentH});
	*/
	
}

// 디바이스 체크( 아이폰, 안드로이드, 그 외 )
var iPhoneCheck = function(ua) {
	var ua = ua || navigator.userAgent,
		android = ua.match(/Android\s([0-9\.]*)/), //안드로이드 버전을 알려줌
		iphone = ua.match(/(iPad|iPhone|iPod)/g); //아이폰인지만 확인 'iPhone'을 반환
	if(iphone !== null){
		iphone_scroll(this);
		//iphoneBounceNo();
		//console.log('dddd')
	}else{
		//console.log('그외')
	}
	if(android == null && iphone == null) return false;
	return android ? android[1] : iphone[1];
	
}

//시작시 tab 모양 이동
var tabBar = function(){
	if($('div[data-rel="tab_box"]').find('span').hasClass('tab_bar') && $('.move_tab li').hasClass('on')){
		var onData = $('div[data-rel="tab_box"] li.on').attr('data-rel');
		$('div[data-rel="tab_box"]').each(function(){
			var liWidth = $(this).find('ul li.on').outerWidth(true);
			var liLeft = $(this).find('ul li.on').offset().left;
			if($('.move_tab').hasClass('ty2')){
				$(this).find('.tab_bar').css({'left':liLeft+1,'background-color':'#004c98','width':liWidth-2,'-webkit-transition': 'left 0ms', 'transition': 'left 0ms' });
			}else{
				$(this).find('.tab_bar').css({'left':liLeft,'background-color':'#004c98','width':liWidth,'-webkit-transition': 'left 0ms', 'transition': 'left 0ms' });
			}
		});
		var liNum = $('[data-rel="tab_box"]').find('li.on').index();
		var liLength = $('[data-rel="tab_box"] li:not(.tab_arrow)').length;
		$('[data-rel="tab_box"] li.on').attr('title',liLength+'개 탭 중에 '+(liNum+1)+'번째 선택됨');
		$('.'+onData).css({'display':'block'});
		$('.'+onData).siblings('div').css({'display':'none'});
	}
	$('.tab_box2[data-rel="tab_box"] ul li').eq(1).addClass('liBorN');
}

//step 박스 
var stepMake = function(){
	if($('div').hasClass('step_box')){
		var ulData = $('.step_box').find('ul').attr('data-rel');
		var ulClass = $('.step_box').find('ul').attr('class');
		var ulNum = ulClass.split('step0')[1];
		for(var i = 0; i < Number(ulData); i++){
			$('.step_box').find('ul').append('<li>');
		}
		$('.step_box ul.step0'+ulNum+' li:nth-child('+ulNum+')').html(ulData+'단계 중에 '+ulNum+'번째 단계입니다.');
	}
}
//search_tab 
var search_tab = function(){
	var liBtn = $('.search_tab .tab_arrow').width();
	var liW = (publish.contentW - liBtn)/3
	$('.search_tab ul li').css({'width':liW})
	$('.search_tab ul li.tab_arrow').css({'width':liBtn})
	$('.search_tab ul').css({'width':(liW*6)+liBtn+6})
}

//tab 박스들 크기 설정
var tabHeight = function(){
	var otherH = $('.tab_over').height();
	$('div[data-rel="tab_height"] > div').css({'min-height':publish.contentH-otherH})
}

//리스트 이동(처음 리스트 정렬)
var selectStart = function(){
	var moveLiH = $('ul[data-rel="move_list"] li').outerHeight(true);
	var moveLiNum = $('ul[data-rel="move_list"] li').length;
	$('ul[data-rel="move_list"]').css({'height':moveLiH*moveLiNum});
	$('ul[data-rel="move_list"] li').each(function(){
		var thisIndex = $(this).index();
		$(this).css({'top': moveLiH*thisIndex}).attr('data-rel',thisIndex+1);
	});
}

//popup 띄우기
var popupShow = function(scrollView){
	var popH = $('.popup').outerHeight(true);
	$('.popup').css({'margin-top':-popH/2})
	$('.popup .popup_head h3').trigger('focus');
	
	if(scrollView !== undefined ){
		if(scrollView == 'scrollStart'){
			var popScrollID = $('.popup_scroll').attr('id');
			publish.myScroll = new IScroll('#'+popScrollID, function (e) { e.preventDefault(); });
		}
	}else{
		//console.log('스크롤 안생김');
	}
}
var popupShow1 = function(scrollView){
	var popH = $('.popupTy').outerHeight(true);
	$('.popupTy').css({'margin-top':-popH/2})
	$('.popupTy .popup_headTy h3').trigger('focus');
	
	if(scrollView !== undefined ){
		if(scrollView == 'scrollStart'){
			var popScrollID = $('.popup_scroll').attr('id');
			publish.myScroll = new IScroll('#'+popScrollID, function (e) { e.preventDefault(); });
		}
	}else{
		//console.log('스크롤 안생김');
	}
}

var popupShow2 = function(scrollView){
	if($('.dl_box').attr('data-rel') =='inner_box'){
		var innerBox = $('.dl_box[data-rel="inner_box"]').outerHeight(true);
		var innerTop = $('.dl_box[data-rel="inner_box"]').position().top;
		$('.popup_back[data-rel="inner_popup"]').css({'position': 'absolute','height':innerBox, 'top':innerTop})
	}
}

//하단 scroll top 버튼
 var scrollTopMade = function(scrollView){
	 if($('#wrap').hasClass('main' == false)){
		 $('body').append('<button type="button" class="scroll_top">가장 위로 이동</button>')
	 }
}

 
//웹접근성 관련 탭에 정보 제공
 var tabTextInsert1 = function(){
	 var liLength = $('[data-rel="tab_box"] li').length;
	 var liNum = $('[data-rel="tab_box"]').find('li.on').index();
	 $('[data-rel="tab_box"]').find('li.on').attr('title',liLength+'개 탭버튼 중에 '+(liNum+1)+'번째');
 }
 
//숨김리스트 
 var tabTextInsert = function(value){
	// $('ul[data-rel="btn_open"]').
	 publish.listHide = value;
	 $('ul[data-rel="hide_list"] li').each(function(){
		 var tableLength = $(this).find('.table3 tbody tr').length;
		 for(var i = value; i< tableLength+1; i++){
			 $(this).find('.table3 tbody tr').eq(i).css({'display':'none'})
		 }
	 });
 }

/* 메인 슬라이드 */
 var mainSilde = function(){
	 publish.contentW = $(window).width();
	 $('.main_list').css({'width':publish.contentW*2})
	 $('.main_list > li').each(function(){
		 var mainScroll = publish.contentH - 47
		// $(this).css({'width':publish.contentW})
		 $(this).children('div').children('div').css({'height':mainScroll,'overflow': 'hidden'})
		 /*if($(this).children('div').hasClass('goods_list') == false){
			 $(this).children('div').children('div').css({'height':mainScroll,'overflow': 'hidden'})
		 }else {
			 $(this).children('div').children('div').css({'height':mainScroll,'overflow': 'hidden'})
		 }*/
		 var mainScrollID = $(this).children('div').children('div').attr('id');
		 publish.myScroll = new IScroll('#'+mainScrollID, { 
			 preventDefault : true, 
			 preventDefaultException : {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|EM|SPAN)$/}
		 });
	 });
	 
 }
 
 /* 메인 슬라이드 */
 var bgAdd = function(){
	$('.li_bg').parents('li').css({'background-color':'#ecf6fb'});
 }
 /* 금융상품몰메인 */
 var goodsMain = function(){
	var goodsWidth = $('.goods_list li').width();
	//console.log(goodsWidth)
	$('.goods_main .view_box').css({'height':(goodsWidth*2)+57});
	$('.goods_list li a').css({'height':goodsWidth});
	$('.goods_main .main_list >li >div').css({'height':(goodsWidth*2)+57});
 }
 
 /* 앱통장 메인 */
 var appScroll = function(){
	var noScroll = $('[data-rel="app_cover"]').outerHeight(true);
	var appTopFix = $('.app_top_fix').outerHeight(true);
	var numAppH = publish.contentH-(noScroll+appTopFix)
	$('.app_bank_scroll div[data-rel="app_scroll"]').css({'height':numAppH-20})
 }
 
var mystyle01;
 var iphone_scroll = function(global) {
		// Stores the Y position where the touch started
		var startY = 0;
		var event_target;
		// Store enabled status
		var enabled = false;

		var handleTouchmove = function(evt) {
			//more
			// Get the element that was scrolled upon
			var el = evt.target;
			//event_target = evt;
			//console.log(evt)
			// Check all parent elements for scrollability
			while (el !== document.body) {
				// Get some style properties
				var style = window.getComputedStyle(el);

				if (!style) {
					// If we've encountered an element we can't compute the style for, get out
					break;
				}

				var scrolling = style.getPropertyValue('-webkit-overflow-scrolling');
				var overflowY = style.getPropertyValue('overflow-y');
				var height = parseInt(style.getPropertyValue('height'), 10);

				// Determine if the element should scroll
				mystyle01 = height;
				var isScrollable = scrolling === 'touch' && (overflowY === 'auto' || overflowY === 'scroll');
				var canScroll = el.scrollHeight > el.offsetHeight;

				if (isScrollable && canScroll) {
					// Get the current Y position of the touch
					var curY = evt.touches ? evt.touches[0].screenY : evt.screenY;

					// Determine if the user is trying to scroll past the top or bottom
					// In this case, the window will bounce, so we have to prevent scrolling completely
					var isAtTop = (startY <= curY && el.scrollTop === 0);
					var isAtBottom = (startY >= curY && el.scrollHeight - el.scrollTop === height);

					// Stop a bounce bug when at the bottom or top of the scrollable element
					if (isAtTop || isAtBottom) {
						evt.preventDefault();
						//console.log('안움직이기')
					}

					// No need to continue up the DOM, we've done our job
					return;
				}

				// Test the next parent
				el = el.parentNode;
			}

			// Stop the bouncing -- no parents are scrollable
			evt.preventDefault();
			
		};
		
		var handleTouchstart = function(evt) {
			// Store the first Y position of the touch
			startY = evt.touches ? evt.touches[0].screenY : evt.screenY;
		};

		var enable = function() {
			// Listen to a couple key touch events
			window.addEventListener('touchstart', handleTouchstart, false);
			window.addEventListener('touchmove', handleTouchmove, false);
			enabled = true;
		};

		var disable = function() {
			// Stop listening
			window.removeEventListener('touchstart', handleTouchstart, false);
			window.removeEventListener('touchmove', handleTouchmove, false);
			enabled = false;
		};

		var isEnabled = function() {
			return enabled;
		};
		
		// Enable by default if the browser supports -webkit-overflow-scrolling
		// Test this by setting the property with JavaScript on an element that exists in the DOM
		// Then, see if the property is reflected in the computed style
		var testDiv = document.createElement('div');
		document.documentElement.appendChild(testDiv);
		testDiv.style.WebkitOverflowScrolling = 'touch';
		var scrollSupport = 'getComputedStyle' in window && window.getComputedStyle(testDiv)['-webkit-overflow-scrolling'] === 'touch';
		document.documentElement.removeChild(testDiv);

		if (scrollSupport) {
			enable();
		}

		// A module to support enabling/disabling iNoBounce
		var iNoBounce = {
			enable: enable,
			disable: disable,
			isEnabled: isEnabled
		};

		if (typeof module !== 'undefined' && module.exports) {
			// Node.js Support
			module.exports = iNoBounce;
		}
		if (typeof global.define === 'function') {
			// AMD Support
			(function(define) {
				define(function() { return iNoBounce; });
			}(global.define));
		}
		else {
			// Browser support
			global.iNoBounce = iNoBounce;
		}
		
		var handlePrevent = function(evt) {
			// Store the first Y position of the touch
			evt.preventDefault();
		};
		//console.log(handleTouchmove())
		
	};

	var di_size = function(){
		var viewport = $('meta[name="viewport"]').attr('content');
		var windowRatio = window.screen.width/320;
		console.log(viewport)
		$('meta[name="viewport"]').attr('content','width=320px, initial-scale='+windowRatio+', maximum-scale='+windowRatio+', user-scalable=no')
		
	}
var swiper_container = function(){
	if($('.my_agreement.ty1').children().hasClass('swiper-container')){
		var mainSwiper = $('.my_agreement.ty1 .swiper-container');
			publish.swiper = new Swiper(mainSwiper, {
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			slidesPerView: 2,
			centeredSlides: true,
			paginationClickable: true,
			spaceBetween: 12,
			loop: true
		});
	}
	if($('.my_agreement').hasClass('ty2')){
		var mainSwiper2 = $('.my_agreement.ty2 .swiper-container');
		publish.swiper2 = new Swiper(mainSwiper2, {
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			slidesPerView: 2,
			centeredSlides: true,
			paginationClickable: true,
			spaceBetween: 12,
			loop: true
		});
	}
}
var swiper_container02 = function(){
	if($('.goods_banner.ty2').hasClass('swiper-container') && $('.goods_banner.ty2').attr('data-rel') !== 'madeSlide'){
		$('.goods_banner.ty2').attr('data-rel','madeSlide')
		var mainSwiper = $('.goods_banner.ty2.swiper-container');
		publish.swiper2 = new Swiper(mainSwiper, {
			nextButton: '.banner_btn_right2',
			prevButton: '.banner_btn_left2',
			slidesPerView: 1,
			pagination: '.swiper-pagination2',
			centeredSlides: true,
			paginationClickable: true,
			spaceBetween: 0,
			onTransitionEnd :function(){
				$('.goods_banner.ty2 .swiper-slide').attr('aria-hidden',true);
				$('.goods_banner.ty2 .swiper-slide-active').attr('aria-hidden',false);
				if($('.goods_banner.ty2 .swiper-wrapper li').eq(0).hasClass('swiper-slide-active') == false){
					$('.banner_btn_left2').css({'opacity':'1'});
				}
				var bannerLength = $('.goods_banner.ty2 .swiper-wrapper li').length-1;
				if($('.goods_banner.ty2 .swiper-wrapper li').eq(bannerLength).hasClass('swiper-slide-active') == false){
					$('.banner_btn_right2').css({'opacity':'1'});
				}
			},
			onReachBeginning :function(){
				$('.banner_btn_left2').css({'opacity':'.2'});
			},
			onReachEnd :function(){
				$('.banner_btn_right2').css({'opacity':'.2'});
			}
		});
	}
	if($('.goods_main .view_box').hasClass('swiper-container')){
		var mainSwiper = $('.view_box.ty2.swiper-container');
		dddswiper = new Swiper(mainSwiper, {
			nextButton: '.main_btn_right',
			prevButton: '.main_btn_left',
			slidesPerView: 1,
			centeredSlides: true,
			paginationClickable: true,
			spaceBetween: 0,
			onTransitionEnd :function(){
				if($('.main_list > li').hasClass('recommend')){
					if($('.view_box.ty2 .best').hasClass('swiper-slide-active')){
						$('.view_box.ty2 .main_btn_right').removeClass('dim');
						$('.view_box.ty2 .main_btn_left').addClass('dim');
						$('.view_box.ty2 .recommend').attr('aria-hidden',true);
						$('.view_box.ty2 .best').attr('aria-hidden',false);
						publish.myScroll.refresh();
					}else{
						$('.view_box.ty2 .best').attr('aria-hidden',true);
						$('.view_box.ty2 .recommend').attr('aria-hidden',false);
						
						$('.view_box.ty2 .main_btn_left').removeClass('dim');
						$('.view_box.ty2 .main_btn_right').addClass('dim');
						publish.myScroll.refresh();
					}
				}
			}
		});
	}
}
function js_keypad(e) {
	//e.stopPropagation();
	var agent = navigator.userAgent.toLowerCase();
	//self = $(e.currentTarget);
	if (agent.match(/iphone/) != null || agent.match(/ipod/) || agent.match(/ipad/) != null) {
		$(function(){
			$('.js_keypad > input').focus(function(){
				$('#content section').scrollTop(0);
			});
		});
	} else {
		$(function(){
			$('.js_keypad > input').focus(function(){
				$('#content section').animate({scrollTop:'150'});
			});
		});
	}
}

//160216 스크롤 위치 잡는 함수
function scrollPosition() {
	$('.clause_box').each(function(){
		if($('.clause_content').attr('data-rel') == "scroll_box"){
			if($(this).find('.opt_form').hasClass('two_small')){
				var radioPosition =  $(this).find('.opt_form.two_small').eq(0).offset().top
				//var radioPosition2 =  $(this).find('.opt_form').eq(0).position().top
				var thisPosition = $(this).offset().top
				console.log(radioPosition-thisPosition)
				$(this).find('.clause_content').scrollTop(radioPosition-thisPosition-120);
			}
		}
	});
}

/* sub logo 생성 */
$("document").ready(function(){
	
	sub_logo();

	function js_resize(){
		
		$("#wrap:not('.new_main') #content:not('.mw')").css({ paddingTop:$('#header').outerHeight() });
		if ($(".top_box").is(':visible')) {
			$("#wrap:not('.new_main') section, .bottom_pop section").height( $("body").height() - $("#header").outerHeight() - $(".top_box").outerHeight() );
		} else {
			$("#wrap:not('.new_main') section, .bottom_pop section").height( $("body").height() - $("#header").outerHeight() );
		}
		
		
	}
	$(window).on("load resize orientationchange", js_resize);
	
});
function sub_logo() {
	var $ly_header = $("#wrap:not('.new_main, .main, .languages_main') #header:not('.mobile, .all_popup')");
	
	$ly_header.find('h1').removeClass('ds_none');
	//$ly_header.find('h1').replaceWith(function(){return $("<h2 class='hd_tit'>").append($(this).contents());});
	//$ly_header.find('h2').before("<h1 class='logo'><img src='../../img/icon_logo.png' alt='전북은행'></h1>");
	
}

function sub_banner(e) {
	
	var $event = $(".sub_banner");
	var $list = $event.find(".pagebox_area");
	var $listUl = $event.find(".pagebox");
	var $listLi = $listUl.children(".pagebox_list");
	var $listTab = $listLi.children(".tab");
	var $listCont = $listLi.children(".banner_cont");
	var $contImg = $listCont.find("img");
	
	var listTotal = $listLi.length;
	var listNum = 0;
	var listOld =-1;
	var isChange = false;
	var isDrag = false;
	
	$listCont.each(function(i){

		$(this).css({ left:$listCont.width() * i });
		if ($(this).hasClass("on")) listNum = i;

	});
	
	function list_change(_direction, _time, _ease){
		
		isChange = true;
		var time = (_time == undefined) ? 0.6 : _time;
		var ease = (_ease == undefined) ? Cubic.easeInOut : _ease;
		
		var target = (_direction == "next" || _direction == "left") ? $listCont.width() : -$listCont.width();
		TweenMax.to($listCont.eq(listOld), time, { left:-target, ease:ease });

		if (_direction == "next" || _direction == "prev") $listCont.eq(listNum).css({ left:target });
		TweenMax.to($listCont.eq(listNum), time, { left:0, ease:ease, onComplete:list_change_complete });

		$listLi.removeClass("on").eq(listNum).addClass("on");
		$listTab.removeAttr("title").eq(listNum).attr("title", "선택됨");
		
	}
	
	function list_change_complete(){

		isChange = false;

	}
	
	if (listTotal > 1) {
		if ($event.is(".banner_pagebox")) {
			$list.hammer({ dragLockToAxis:true, behavior:{}}).on("click mousedown dragstart dragend dragleft dragright", function(e){
				
				switch(e.type){
					case "click":
						if (isDrag) e.preventDefault();
					break;
					case "mousedown":
						e.preventDefault();
					break;
					case "dragstart" :
						isDrag = true;
					break;
					case "dragend":
						setTimeout(function(){
							isDrag = false;
						}, 1);
						if (Math.abs(e.gesture.deltaX) > $listCont.width() * 0.1) {
							var temp = listNum;
							listNum = listOld;
							listOld = temp;
							list_change(e.gesture.direction, 0.3, Cubic.easeOut);
						} else {
							var direction = (e.gesture.direction == "left") ? "right" : "left";
							list_change(direction, 0.3);
						}
					break;
					case "dragleft":
					case "dragright":
						e.gesture.preventDefault();
						$listCont.each(function(i){

							$(this).css({ left:$(this).width() });
							if (i == listNum) $(this).css({ left:e.gesture.deltaX });
							
							if ($listLi.eq(listNum).is(":first-child")) {
								if (e.gesture.direction == "left") {
									listOld = (listNum == listTotal - 1) ? 0 : listNum + 1;
									if (i == listOld) $(this).css({ left:$(this).width() + e.gesture.deltaX });
								} else {
									listOld = (listNum == listTotal - 0) ? 0 : listNum + 0;
									if (i == listOld) $(this).css({ left: '0' });
								}
							} else {
								if ($listLi.eq(listNum).is(":last-child")) {
									if (e.gesture.direction == "left") {
										listOld = (listNum == listTotal - 0) ? 0 : listNum + 0;
										if (i == listOld) $(this).css({ left: '0' });
									} else {
										listOld = (listNum == 0) ? listTotal - 1 : listNum - 1;
										if (i == listOld) $(this).css({ left:-$(this).width() + e.gesture.deltaX });
									}
								} else {
									if (e.gesture.direction == "left") {
										listOld = (listNum == listTotal - 1) ? 0 : listNum + 1;
										if (i == listOld) $(this).css({ left:$(this).width() + e.gesture.deltaX });
									} else {
										listOld = (listNum == 0) ? listTotal - 1 : listNum - 1;
										if (i == listOld) $(this).css({ left:-$(this).width() + e.gesture.deltaX });
									}
								}
							}

						});
					break;
				}

			});
		}
	}
	
	$listTab.on("click", function(e){
		
		if (!isChange && listNum != $listTab.index(this)) {
			listOld = listNum;
			listNum = $listTab.index(this);
			var direction = (listNum > listOld) ? "next" : "prev";
			list_change(direction);
		}

	});

	$listLi.on("focusin", function(e){

		listOld = listNum;
		listNum = $listLi.index(this);
		var direction = (listNum > listOld) ? "next" : "prev";
		list_change(direction, 0);

	});
	
	$list.on("mouseenter mouseleave focusin focusout", function(e){
		
		switch(e.type){
			case "mouseleave" :
			case "focusout" :
			break;
		}

	});
	
	function list_resize(){

		$list.height($contImg.outerHeight());
		$listUl.css({ marginTop:$list.height() - $listUl.height() - parseInt($listUl.css("margin-bottom")) });
		list_change("next", 0);

	}
	$(window).on("load resize", list_resize);

}


var lotto = [6];
var overlap = true;
for(var c = 0; c < 6; c++){
   var random = Math.ceil(Math.random()*45);
   for(var i = 0; i < c; i++){
      if(lotto[i] == random) overlap = false;
   }
   if(overlap){
      lotto[c] = random;
   }
}