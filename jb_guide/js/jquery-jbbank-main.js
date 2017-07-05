$(document).ready(function(){
	viewport_size();
	main_fast();
	main_banner();
	main_proprietary();
	//main_news();
	//alert($('#header').height());

	var $mcontainer = $(".main_container");
	var $mlistCont = $(".banner_cont");
	var $msection = $(".new_main section");
	function list_resize(){
		$mcontainer.height($mlistCont.outerHeight());
		
		$('#content').css({ paddingTop:$('#header').outerHeight() });

		var section = $(window).height();
		
		$msection.height($("body").height() - $("#header").outerHeight() - $(".top_box").outerHeight());
		/*
		if (section <= $msection.height() ) {
			$msection.height($(".main_container").outerHeight() + $(".main_news").outerHeight());
		} else {
			$msection.height($("body").height() - $("#header").outerHeight() - $(".top_box").outerHeight());
			
		}*/
		viewport_size();
//		$(".main_news").height($("body").height() - $("#header").outerHeight() - $(".main_container").outerHeight() - $(".top_box").outerHeight());
	}
	$(window).on("load resize orientationchange", list_resize);
});
var viewport_size = function(){
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('iphone')>-1) {
		var viewport = $('meta[name="viewport"]').attr('content');
		var windowRatio = window.screen.width/320;
		console.log(viewport);
		$('meta[name="viewport"]').attr('content','width=320px, initial-scale='+windowRatio+', maximum-scale='+windowRatio+', minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi');
	}else if (ua.indexOf('android')>-1) {
		return false;
	}
} 
function main_fast(e) {
	
	var $new_main = $(".new_main");
	var $event = $(".fast_area");
	var $list = $event.find(".pagebox_area");
	var $listUl = $event.find(".pagebox");
	var $listLi = $listUl.children(".pagebox_list");
	var $listTab = $listLi.children(".tab");
	var $listCont = $listLi.children(".fast_list");
	var $arrow = $event.find(".arrow");
	var $event_btn = $event.find(".banner_btn");
	var $event_bg = $listLi.find(".top_bg");

	var UITotal = $listUl.length;
	var listTotal = $listLi.length;
	var listNum = 1;
	var listOld = 0;
	var isChange = false;
	var isDrag = false;
	var autoDuration = 5;
	
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
		
		if ($new_main.is(".plsmb_bg")) {
			$new_main.removeClass("plsmb_bg0" + listOld).addClass("plsmb_bg0" + listNum);
		} else {
			$new_main.removeClass("cosmb_bg0" + listOld).addClass("cosmb_bg0" + listNum);
		}
		
		if ($listLi.eq(listNum).is(":first-child")) {
			$(".prev").fadeOut(300);
			if ($listLi.eq(listNum).is(":last-child")) {$(".next").fadeIn(300);}
		} else {
			$(".prev").fadeIn(300);
		}
		if ($listLi.eq(listNum).is(":last-child")) {
			$(".next").fadeOut(300);
			if ($listLi.eq(listNum).is(":first-child")) {$(".prev").fadeIn(300);}
		} else {
			$(".next").fadeIn(300);
		}

	}
	
	function list_change_complete(){
		isChange = false;
	}

	// 드래그
	if (listTotal > 1) {
		$list.hammer({ dragLockToAxis:true, behavior:{ tapHighlightColor:"rgba(0, 0, 0, 0)" } }).on("click mousedown dragstart dragend dragleft dragright", function(e){
			
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
						list_change(e.gesture.direction, 0.6, Cubic.easeOut);
					} else {
						var direction = (e.gesture.direction == "left") ? "right" : "left";
						list_change(direction, 0.6);
					}
				break;
				case "dragleft":
				case "dragright":
					e.gesture.preventDefault();
					$listCont.each(function(i){
						
						$(this).css({ left:$(this).width() });
						if (i == listNum) {
							$(this).css({ left:e.gesture.deltaX });
						}
						/*
						if (e.gesture.direction == "left") {
							listOld = (listNum == listTotal - 1) ? 0 : listNum + 1;
							if (i == listOld) $(this).css({ left:$(this).width() + e.gesture.deltaX });
						} else {
							listOld = (listNum == 0) ? listTotal - 1 : listNum - 1;
							if (i == listOld) $(this).css({ left:-$(this).width() + e.gesture.deltaX });
						}*/

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

	// 클릭, 포커스
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
	
	if (listTotal > 1) {
		$arrow.on("click", function(e){

			e.preventDefault();
			if (!isChange){
				listOld = listNum;
				if ($(this).hasClass("next")){
					listNum = (listNum == listTotal - 1) ? 0 : listNum + 1;
					list_change("next");
				} else {
					listNum = (listNum == 0) ? listTotal - 1 : listNum - 1;
					list_change("prev");
				}
			}
			if ($listLi.eq(listNum).is(":first-child")) {
				$(".prev").fadeOut(300);
			} else {
				if ($listLi.eq(listNum).is(":last-child")) {
					$(".next").fadeOut(300);
				} else {
					$(".prev, .next").fadeIn(300);
				}
			}
		});
	} else {
		$arrow.hide();
	}
	
	$list.on("mouseenter mouseleave focusin focusout", function(e){
		
		switch(e.type){
			case "mouseleave" :
			case "focusout" :
			break;
		}
		
	});
	
	function list_resize(){
		var $lr_listLi = $listUl.children(".pagebox_list:nth-child(2)");
		var $lr_listCont = $lr_listLi.children(".fast_list");
		
		$list.height($lr_listCont.outerHeight());
		$listTab.css({ marginTop:$event.height() - parseInt($list.css("padding-top")) });
		list_change("next", 0);
		
	}
	$(window).on("load resize orientationchange", list_resize);

}

function main_banner(e) {
	
	var $event_wrap = $(".banner_area");
	var $event = $(".banner_pagebox");
	var $list = $event.find(".pagebox_area");
	var $listUl = $event.find(".pagebox");
	var $listLi = $listUl.children(".pagebox_list");
	var $listTab = $listLi.children(".tab");
	var $listCont = $listLi.children(".banner_cont");
	
	var $event2 = $(".banner_list");
	var $event_btn = $event_wrap.find(".banner_btn");
	
	var listTotal = $listLi.length;
	var listNum = 0;
	var listOld =-1;
	var isChange = false;
	var isDrag = false;
	
	if ($event_wrap.is(".banner_pagebox")) {
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
								list_change(e.gesture.direction, 0.6, Cubic.easeOut);
							} else {
								var direction = (e.gesture.direction == "left") ? "right" : "left";
								list_change(direction, 0.6);
							}
						break;
						case "dragleft":
						case "dragright":
							e.gesture.preventDefault();
							$listCont.each(function(i){

								$(this).css({ left:$(this).width() });
								if (i == listNum) $(this).css({ left:e.gesture.deltaX });
								/*
								if (e.gesture.direction == "left") {
									listOld = (listNum == listTotal - 1) ? 0 : listNum + 1;
									if (i == listOld) $(this).css({ left:$(this).width() + e.gesture.deltaX });
								} else {
									listOld = (listNum == 0) ? listTotal - 1 : listNum - 1;
									if (i == listOld) $(this).css({ left:-$(this).width() + e.gesture.deltaX });
								}*/
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

	}

	$(".new_main section").css({overflow:'scroll'});
	$event_btn.bind("mousedown", function(){
		var value15 = 15;
		if ($event_wrap.is(".banner_pagebox")) {
			$(".new_main section").css({overflow:'visible'});
			$list.animate({height: $listCont.outerHeight() * 2 + value15}, 1000, 'easeOutExpo');
			$event_wrap.css({position:'absolute'}).animate({top: - $list.outerHeight() - value15}, 1000, 'easeOutExpo');
			$(this).parents(".banner_area").removeClass("banner_pagebox").addClass("banner_list");
			$listTab.hide();
			$(this).removeClass("up").addClass("down").text("슬라이드 목록보기");
			$listUl.css({ marginTop: "0" });
			$listCont.attr("style", "");
		} else {
			$list.animate({height: $listCont.outerHeight()}, 1000, 'easeOutExpo');
			$event_wrap.css({position:'relative'}).animate({top: '0'}, 1000, 'easeOutExpo', function(){
				$event_btn.parents(".banner_area").removeClass("banner_list").addClass("banner_pagebox");
				$listTab.show();
				$event_btn.removeClass("down").addClass("up").text("전체 목록보기");
				$listUl.css({ marginTop:$listCont.height() - $listUl.height() - parseInt($listUl.css("margin-bottom")) });
				$(".new_main section").css({overflow:'scroll'});
			});
			$listCont.each(function(i){
				$(this).css({ left:$listCont.width() * i });
				if ($(this).hasClass("on")) listNum = i;
			});
		}
		
	});
	
	function list_resize(){

		$list.height($listCont.outerHeight());
		$listUl.css({ marginTop:$list.height() - $listUl.height() - parseInt($listUl.css("margin-bottom")) });
		list_change("next", 0);

	}
	$(window).on("load resize", list_resize);

}
function main_proprietary(e) {
	
	var $event = $(".pro_slider");
	var $list = $event.find(".ps_inner");
	var $listUl = $event.find(".ps_list");
	var $listLi = $listUl.children("li");
	var $event_btn = $event.find(".btn_pro_slider");

	var listTotal = $listLi.length;
	var listNum = 0;
	var listOld =-1;
	var isChange = false;
	var isDrag = false;
	var autoDuration = 5; // 자동롤링 시간 (초)
	
	$listLi.each(function(i){

		$(this).css({ top:$listLi.width() * i });
		if ($(this).hasClass("on")) listNum = i;

	});

	// 내용 변경 (이동할 방향/순서, 화면전환 시간)
	function list_change(_direction, _time, _ease){
		
		isChange = true;
		var time = (_time == undefined) ? 0.6 : _time;
		var ease = (_ease == undefined) ? Cubic.easeInOut : _ease;
		
		var target = (_direction == "next" || _direction == "up") ? $listLi.width() : -$listLi.width();
		TweenMax.to($listLi.eq(listOld), time, { top:-target, ease:ease });

		if (_direction == "next" || _direction == "prev") $listLi.eq(listNum).css({ top:target });
		TweenMax.to($listLi.eq(listNum), time, { top:0, ease:ease, onComplete:list_change_complete });

		$listLi.removeClass("on").eq(listNum).addClass("on");
		
		timer.stop();
		timer.start();

	}
	
	function list_change_complete(){

		isChange = false;

	}

	// 드래그
	if (listTotal > 1) {
		$list.hammer({ dragLockToAxis:true, behavior:{ tapHighlightColor:"rgba(0, 0, 0, 0)" } }).on("click mousedown dragstart dragend dragup dragdown", function(e){
			
			timer.stop();
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
						timer.start();
					}, 1);
					if (Math.abs(e.gesture.deltaX) > $listLi.width() * 0.3) {
						var temp = listNum;
						listNum = listOld;
						listOld = temp;
						list_change(e.gesture.direction, 0.3, Cubic.easeOut);
					} else {
						var direction = (e.gesture.direction == "up") ? "down" : "up";
						list_change(direction, 0.3);
					}
				break;
				case "dragup":
				case "dragdown":
					e.gesture.preventDefault();
					$listLi.each(function(i){

						$(this).css({ top:$(this).width() });
						if (i == listNum) $(this).css({ top:e.gesture.deltaX });
						if (e.gesture.direction == "up") {
							listOld = (listNum == listTotal - 1) ? 0 : listNum + 1;
							if (i == listOld) $(this).css({ top:$(this).width() + e.gesture.deltaX });
						} else {
							listOld = (listNum == 0) ? listTotal - 1 : listNum - 1;
							if (i == listOld) $(this).css({ top:-$(this).width() + e.gesture.deltaX });
						}

					});
				break;
			}

		});
	}

	// 포커스
	$listLi.on("focusin", function(e){

		listOld = listNum;
		listNum = $listLi.index(this);
		var direction = (listNum > listOld) ? "next" : "prev";
		list_change(direction, 0);

	});

	// 자동 롤링
	var timerInterval;
	var timer = {
		start : function(){
			timer.stop();
			if (listTotal > 1) {
				timerInterval = setInterval(function(){
					listOld = listNum;
					listNum = (listNum == listTotal - 1) ? 0 : listNum + 1;
					list_change("next");
				}, autoDuration * 1000);
			}
		},
		stop : function(){
			clearInterval(timerInterval);
		}
	}
	timer.start();
	
	$list.on("mouseenter mouseleave focusin focusout", function(e){
		
		timer.stop();
		if ($event_btn.is(".btn_stop")) {
			switch(e.type){
				case "mouseleave" :
				case "focusout" :
					timer.start();
				break;
			}
		} else {
			switch(e.type){
				case "mouseleave" :
				case "focusout" :
					timer.stop();
				break;
			}
		}

	});
	
	$event_btn.bind("mousedown", function(){
		
		if ($event_btn.is(".btn_stop")) {
			timer.stop();
			$(this).removeClass("btn_stop").addClass("btn_play").text("play");
			$list.on("mouseenter mouseleave focusin focusout", function(e){
		
				timer.stop();
				switch(e.type){
					case "mouseleave" :
					case "focusout" :
						timer.stop();
					break;
				}

			});
		} else {
			timer.start();
			$(this).removeClass("btn_play").addClass("btn_stop").text("stop");
			$list.on("mouseenter mouseleave focusin focusout", function(e){
		
				timer.stop();
				switch(e.type){
					case "mouseleave" :
					case "focusout" :
						timer.start();
					break;
				}

			});
		}
		
	});

	// 리사이즈
	function list_resize(){
		$list.height($listLi.outerHeight());
		list_change("next", 0);
	}
	$(window).on("load resize orientationchange", list_resize);

}

function main_news() {
	var $list;
	var oneDepthNum = -1;
	var rNum = -1;
	var oneDepthLen = -1;
	$list = $('.main_news ul li');
	oneDepthLen = $list.length;
	
	rNum = Math.floor( Math.random()*oneDepthLen);
	
	$list.find("a").unbind("mouseenter").bind("mouseenter", function(e){
		$(this).addClass("on");
	})
	$list.eq(rNum).find("a").trigger("mouseenter");
}

