
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////    변수     ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
/* 값이 남아있어야 하는 부분에 관련하여 객체로 저장 */
var publish = { 
		slideData :[],
		moveValue : true,
		nowIndex : 0,
		boolean: true
}  

//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////      ready, load       //////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
/* 도큐먼트 레디 이벤트 */
$(document).ready(function(){
	madeSlide();
	randomTab();
	moveListMade();
});

/* 윈도우 로드 이벤트 */
$(window).load(function(){ 
	
});

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////    이벤트    ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

/* 한번만 실행되면 되는 이벤트 */
(function(){
	//tab 이벤트
	$('div[data-action="tab"] button').on('click',function(){
		var thisObject = $(this);
		normalTab(thisObject);
	});
	
	//레이아웃변경 이벤트
	$('[data-action="layerChange"]').on('click',function(){
		if($('[data-type="changeBox"]').hasClass('ty2')){
			$('[data-type="changeBox"]').removeClass('ty2');
		}else{
			$('[data-type="changeBox"]').addClass('ty2');
		}
	});
	
	/* 슬라이드 이벤트 */
	/* 이전버튼 */
	$('[data-action="slide"] .prev').on('click',function(){
		var thisVal = $(this);
		var thisParentNum = thisVal.parents('[data-action="slide"]').index();
		
		moveSlide(thisVal, publish.slideData[thisParentNum][1]-1);
	});
	
	/* 다음 버튼 */
	$('[data-action="slide"] .next').on('click',function(){
		var thisVal = $(this);
		var thisParentNum = thisVal.parents('[data-action="slide"]').index();
		moveSlide(thisVal, publish.slideData[thisParentNum][1]+1);
	});
	
	/* 슬라이드 하단 페이지 뷰 클릭 */
	$('[data-action="slide"] .page-list li').on('click',function(){
		var thisVal = $(this);
		var thisNum = $(this).index();
		moveSlide(thisVal, thisNum);
	});
	
	/* 쿠폰 움직이기 */
	$('[data-action="move-btn"] button').on('click',function(){
		var thisVal = $(this);
		var thisData = $(this).attr('data-type');
		moveShow(thisVal, thisData);
	});
	
	/* 회원가입 버튼 클릭 */
	$('[data-action="submitBtn"]').on('click', function(e){
		formCheck(e);
		e.preventDefault();
	});
	
	/* 팝업 닫기 */
	$(document).on('click','.popup-close, .popup-box .btn', function(){
		var focusInput;
		var popupData = $(this).parents('.popup-wrap').attr('data-type');
		focusInput = $('.popup-content span').eq(0).attr('data-type');
		$('#wrap').find('[data-name="normal-popup"]').detach();
		$('#'+focusInput).focus();
	});

	/* 인풋에 입력할 때 체크 */
	$('.phone-box input').on('keyup',function(){
		var inputValue,//input에 들어있는 값
			valueData,//input 넣어줄 값
			inputData,//input에 들어간 값 배열로 나눔
			checkVal,//숫자인지 확인
			i;
		i= 0;
		inputValue = $(this).val();
		inputData = inputValue.split('');
		inputDatabefore = inputData.slice(0,inputData.length-1);
		valueData = inputData.length < 5 ?  '' : inputDatabefore.join('');
		
		while (i<inputData.length) {
			checkVal = Number(inputData[i]);
			if( isNaN(checkVal)== false && inputData.length < 5 ){
				valueData = valueData+inputData[i];
			}
			$(this).val(valueData);
			i++;
		}
	});
	
	/* input 포커스 떠날 때 폼 체크 */
	$('input').on('focusout',function(e){
		var inputValue,//input에 들어간 값
			inputId,//input id
			inputData,//input에 들어간 값 배열로 나눔
			inputBoolean,//값이 있는지 없는지 체크
			inputmes;//input 아래 경고 메세지
		
		inputValue = $(this).val();
		inputId = $(this).attr('id');
		inputData = inputValue.split('');
		inputMsg = $(this).parents('td').find('.mes');
		switch (inputId) {
		case 'joinId' :
			if(isNaN(Number(inputData[0]))==false){
				inputMsg.text('앞자리는 숫자 안됨').show();
			}else{
				inputMsg.text('').hide();
			}
			break;
		case 'joinEmailLast' :
			inputBoolean = inputValue.split('.')[1];
			if(inputBoolean =='net' || inputBoolean =='com' || inputBoolean =='kr' || inputBoolean =='co'){
				inputMsg.text('').hide();
			}else{
				inputMsg.text('이메일주소 형식에 맞지 않습니다.').show();
			}
			break;
		case 'joinPassword' :
			if(inputData.length < 10){
				inputMsg.text('비밀번호는 10자리 이상 입력').show();
			}else{
				inputMsg.text('').hide();
			}
			break;
		case 'joinPasswordCheck' :
			if($('#joinPassword').val() !== $(this).val()){
				inputMsg.text('비밀번호가 다릅니다.').show();
	    	}else{
	    		inputMsg.text('').hide();
			}
			break;
		}
	});
})();

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////   함수     //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

/* 슬라이드 정의 */
var madeSlide = function(){
	 //슬라이드 여러개 일 수도 있는 것 방지
	$('[data-action="slide"]').each(function(){
		var thisNumber,//슬라이드 찾기 html찾기
			slideList,//슬라이드 리스트
			slideNev,//슬라이드 네비
			slideHeight,//슬라이드 높이
			slideWidth,//슬라이드 넓이
			slideNum;//슬라이드 길이
		thisNumber = $(this).index();
		slideList = $(this).find('[data-action="pages"]');
		slideNev = $(this).find('[data-action="list-nev"]');
		slideHeight = slideList.find('li').outerHeight();
		slideWidth = slideList.find('li').outerWidth();
		slideNum = slideList.find('li').length;
	
		$('.page-list').css({ width: slideNum*80});
		slideList.css({'height':slideHeight, 'width':slideNum*slideWidth});
		$(this).find('.slide').css({'height':slideHeight, 'width':slideWidth});
		$(this).find('.slide-list img').css({'height':slideHeight-2, 'width':slideWidth-2});
		return publish.slideData[thisNumber] = [slideNum,0];
	});
}

/* 슬아이드 움직이기 */
var moveSlide = function(thisVal, moveNum){
	var slideParent,//슬라이드 최상단
		moveSlideBox,//슬라이드
		movePageBox,//슬라이드 페이지 리스트
		afterPage,//다음 슬라이트 페이지
		afterPageLink,//다음 슬라이드 페이지
		afterPagePosition,//다음 슬라이드 페이지 위치
		afterPageLinkPosition,//다음 슬라이트 페이지위치
	slideParent = thisVal.parents('[data-action="slide"]');
	moveSlideBox = slideParent.find('[data-action="pages"]');
	movePageBox = slideParent.find('[data-action="list-nev"]').find('.page-list');
	afterPage = moveSlideBox.find('li').eq(moveNum);
	afterPageLink = movePageBox.find('li').eq(moveNum);
	afterPagePosition = afterPage.position().left;
	afterPageLinkPosition = afterPageLink.position().left;
	
	moveSlideBox.animate({left: -afterPagePosition},300);
	movePageBox.animate({left: -afterPageLinkPosition},300,function(){
		afterPageLink.addClass('on').siblings('li').removeClass('on');
		return publish.slideData[slideParent.index()][1] = moveNum;
	});
	return slideBtn(moveNum,slideParent.index(),slideParent);
}

/* 슬라이드 버튼제어 */
var slideBtn = function(nowIndex,num,slideParent){
	if(nowIndex==0){
		slideParent.find('.prev').hide();
	}else if(nowIndex==publish.slideData[num][0]-1){
		slideParent.find('.next').hide();
	}else{
		slideParent.find('.next').show();
		slideParent.find('.prev').show();
	}
}

/* 탭 변경 */
var normalTab = function(objName){
	var thisData;//클릭 된 탭 데이터
	thisData = objName.attr('data-tab');
	
	$('.'+thisData).css({'display':'block'});
	$('.'+thisData).siblings('.inner-box').css({'display':'none'});
	objName.addClass('on');
	objName.siblings('button').removeClass('on');
}

/* 탭 랜덤으로 보여지기 */
var randomTab = function(){
	var tabNum,//탭 갯수
		randomNum;//뱁 순서 랜덤으로 가져오기
	tabNum = $('[data-action="tab-head"] button').length;
	randomNum = Math.floor(Math.random()*tabNum);
	$('[data-action="tab-head"] button').eq(randomNum).addClass('on');
	normalTab($('[data-action="tab-head"] button').eq(randomNum));
}

/* 움직이는 리스트 */
var moveListMade = function(){
	$('[data-action="move-list"] li').each(function(){
		var thisIndex,//현재 index
			thisLength;//리스트 갯수
		thisIndex = $(this).index();
		thisLength= $('[data-action="move-list"] li').length;
		
		$(this).css({'position':'absolute','left':thisIndex*5, 'top':thisIndex*5, 'z-index':thisLength-thisIndex,'float':'none'})
	});
	$('[data-action="move-list"] li').removeClass('right').addClass('left');
	$('[data-action="move-list"]').addClass('on').removeClass('off');
}

/* 쿠폰 움직이기(모듬) */
var moveShow = function(thisVal,thisData){
	/* 쿠폰 이동 */
	var movePoupon = function(around1,around2,moveData, moveVal){
		var moveLength,//움직일 리스트 갯수
			moveIndex,//움직일 리스트 선택
			listLength,//모든 리스트 갯수
			thisIndex,//움직일 리스트 위치
			moveValue,//움직일 값
			moveZIndex,//움직이는 리스트 z-index 값
			/* 값 넣음 */
		moveLength = moveVal ? $('[data-action="move-list"] li.'+around1).length-1 : 0;
		moveIndex = $('[data-action="move-list"] li.'+around1).eq(moveLength);
		listLength = $('[data-action="move-list"] li').length;
		thisIndex = moveIndex.index();
		moveValue = moveVal ? thisIndex :listLength-thisIndex;
		moveZIndex = moveVal ? (listLength+1)-thisIndex :thisIndex+1;
		
		if(publish.boolean){
			moveIndex.css({'float':'none'});
			if(moveVal){
				moveIndex.css({'z-index':moveZIndex});
			}
			moveIndex.animate({left: (moveData)+(moveValue)*5},300,function(){
				if(moveVal==false){
					moveIndex.css({'z-index':moveZIndex});
				}
				moveIndex.animate({top: (moveValue)*5},300);
			});
			moveIndex.removeClass(around1).addClass(around2);
		}
	}
	switch (thisData) {
    case 'move-view' :
    	$('[data-action="move-list"] li').css({'position':'relative','top':'0','left':'0','float':'left'});
    	$('[data-action="move-list"]').addClass('off').removeClass('on');
    	publish.boolean = false;
    	break;
    case 'move-right' :
    	movePoupon('left','right',350, false);
    	break;
    case 'move-left' :
    	movePoupon('right','left',0, true);
    	break;
    case 'move-reset' :
    	moveListMade();
    	publish.boolean = true;
    	break;
  }
}

/* 기본 팝업 넣기 */
var normalPopup = function(alertTitle, alertText,thisPopup){
	var normalText;//팝업에 들어갈 html
	normalText = '<div class="popup-wrap show" data-name="normal-popup">'+
						'<div class="popup-box">'+
							'<div class="popup-head">'+
								'<h2 class="popup-title">'+alertTitle+'</h2>'+
							'</div>'+
							'<div class="popup-body">'+
								'<p class="popup-content">'+alertText+'</p>'+
							'</div>'+
							'<button type="button" class="popup-close"></button>'+
							'<div class="btn-box">'+
							'<button class="btn btn-s">확인</button>'+
							'</div>'+
						'</div>'+
					'</div>'
	$('#wrap').append(normalText);
	popupFixFun(thisPopup);
	return false;
}

/* 팝업 고정 */
var popupFixFun = function(){
	var popupWidth,//사용할 팝업 넓이
		popupheight;//사용할 팝업 높이
	popupWidth = $('.popup-wrap.show .popup-box').outerWidth();
	popupheight = $('.popup-wrap.show .popup-box').outerHeight();
	$('.popup-wrap.show .popup-box').css({'margin-left':-(popupWidth/2),'margin-top':-(popupheight/2)});
	return false;
};

/* 폼 체크 - 입력 안된 것 확인 */
var formCheck = function(event){
	var inputCheckText = '';
	$('input,select').each(function(e){
		if($(this).attr('type') == 'checkbox' && $(this).prop('checked')==false){
			inputCheckText += '<span data-type="'+$(this).attr('id')+'">'+$(this).attr('title')+'</span> 체크 안됨</br>'
		}
		if($(this).val()== null || $(this).val()==''){
			inputCheckText += '<span data-type="'+$(this).attr('id')+'">'+$(this).attr('title')+'</span> 입력 안됨</br>'
		}
	});
	if(inputCheckText){
		normalPopup('가입 실패',inputCheckText,'normal-popup');
		event.preventDefault();
	}else{
		normalPopup('가입 성공','가입되었습니다.','normal-popup');
	}
}
