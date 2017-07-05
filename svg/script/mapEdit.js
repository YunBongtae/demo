
/* 맵 수정 */
(function ($) {
	/* 위젯 안에 있는 메소드만 실행 시킬 때는  */
	/* 전역 선언 */
	var kendo = window.kendo,
	ui = kendo.ui,
	Widget = ui.Widget;
	
	var svgModify = Widget.extend({
		/* 부를 때 실행 */
		init : function(element, options){
			kendo.ui.Widget.fn.init.call(this, element, options);
			options = this.options;
			
			/* 이벤트 실행시  */
			console.log($(this))
			if(true){
			//	this.svgModify()
			}
			if(true){
				//this.svgModifyEnd()
			}
			
			
		},
		events:[
	        "svgChange",
	        "svgDroppabled",
	        "onDropped"
	         ],
		options: {
	   	  /* 실행될 때 쓰는 이름 */
			name: "SvgModify",
			motion :  null,
			beforePoint :null
		},
		svgModifyStart : function(selectObject){
			
		    var sns="http://www.w3.org/2000/svg",
		    xns="http://www.w3.org/1999/xlink",
		    rootTop = this,
		    root = this.element.children("svg")[0],
		    targetObject = selectObject,
		    selectObj = targetObject[0],
		    rootMatrix,
		    parentId = $(targetObject).parent().attr('id'),
		    originalPoints = [],
		    setWidthLength = [],
		    setHeightLength = [],
		    setWidth = 0,
	        setHeight = 0;
		    
		    
		   if($(targetObject).hasClass('zoonMap')){
			   coordinateLength =selectObj.points.numberOfItems;
			   transformedPoints = [];
			   
			   if($(targetObject).closest('g').find('use').length == 0){
				   $(targetObject).attr({'stroke':'rgb(0,129,198)','stroke-opacity' : '1','stroke-width':"2"});
				    for(var j = 0; j < coordinateLength; j++){
				    	setWidthLength.push(selectObj.points[j].x)
				    	setHeightLength.push(selectObj.points[j].y)
				    }
					for (var i = 0; i < coordinateLength; i++) {
					    var handle = document.createElementNS(sns, 'use'),
					        point = selectObj.points.getItem(i),
					        newPoint = root.createSVGPoint(),
					    	pointName = 'movePoint',
					    	pointPosition = 0;
					    
					    handle.x.baseVal.value = newPoint.x = point.x+pointPosition;
					    handle.y.baseVal.value = newPoint.y = point.y+pointPosition;
					    if(i ==4 || i ==9 || i ==14 || i ==19){
					    	if(i == 4){
					    		pointName = 'movePoint0';
					    	}
					    	if(i == 9){
					    		pointName = 'movePoint1';
					    	}
					    	if(i == 14){
					    		pointName = 'movePoint2';
					    	}
					    	if(i == 19){
					    		pointName = 'movePoint3';
					    	}
					    	handle.x.baseVal.value = newPoint.x = (point.x+pointPosition)-5;
						    handle.y.baseVal.value = newPoint.y = (point.y+pointPosition)-5;
					    }
					   
					    $(targetObject).parent().attr('data-width', setWidth);
					    $(targetObject).parent().attr('data-height', setHeight);
					    $(targetObject).attr('data-setting','old');
					    handle.setAttributeNS(xns, 'href', '#'+pointName);
					    handle.setAttribute('class', pointName);
					    handle.setAttribute('data-moveName', parentId);
					    handle.setAttribute('data-index', i);
					    originalPoints.push(newPoint);
					    selectObj.parentElement.appendChild(handle);
	
					}
			   }		
				/* 점 포인트 움직이기 */
				interact(root).on('mousedown', applyTransforms).on('touchstart', applyTransforms);
				interact('.movePoint')
			    .draggable({
			        onstart: function (event) {
			            root.setAttribute('class', 'dragging');
			            event.target.classList.add( 'nowdraggable' );
			        },
			        onmove: function (event) {
			            var i = event.target.getAttribute('data-index')|0,
			                point = selectObj.points.getItem(i);
			            point.x += event.dx; 
			            point.y += event.dy; 
			            event.target.x.baseVal.value = point.x;
			            event.target.y.baseVal.value = point.y;
			        },
			        onend: function (event) {
			            root.setAttribute('class', '');
			            var parentNodeName =  event.target.parentElement.getAttribute('id');
			            var changeTarget =  $('#'+parentNodeName).find('polygon')
			            if(changeTarget.attr('data-name') !=='newGroup'){
			            	changeTarget.attr('change-bool','true');
			            	console.log('change')
			            }
			            if($('.action-bottom [data-button="Save"] button').attr('data-action') == 'buttonAction'){
			            	$('.action-bottom [data-button="Save"] button').attr('disabled',false);
			            	$('.action-bottom [data-button="Exit"] button').css({'display':'none'});
			            	$('.action-bottom [data-button="Cancel"] button').css({'display':'block'});
			            }
			            $('html').css({'cursor':'default'});
			            rootTop.deviceOwnership();
			        },
			        snap: {
			            targets: originalPoints,
			            range: 10,
			         relativePoints: [ { x: 0.5, y: 0.5 } ]
			        },
			        restrict: { restriction: document.rootElement }
			    })
			    .styleCursor(false);
				
				
				/* 위로 늘리기 */
					interact('.movePoint0, .movePoint1, .movePoint2, .movePoint3')
				    .draggable({
				        onstart: function (event) {
				            root.setAttribute('class', 'dragging');
				            event.target.classList.add( 'nowdraggable' );
				            
				            var parentPolygon = $(event.target.parentNode).find('polygon')[0].points,
					            size = polygonSizeCheck(parentPolygon),
					            scaleNumX = Number((0.9/size.width).toFixed(5)),
					            scaleNumY = Number((0.9/size.height).toFixed(5)),
				            moveNumY=0
				            this.movePointInfo = {
				            	beforeX : event.clientX,
				            	beforeY : event.clientY,
				            	width: Number(size.width),
				            	height: Number(size.height),
				            	scaleSpeedX : scaleNumX,
				            	scaleSpeedY: scaleNumY,
				            	
				            	moveSpeedX : Number(size.leftNum),
				            	moveSpeedY: Number(size.topNum)
				            }
				            $('.movePoint').hide();
				        },
				        onmove: function (event) {
				            var dragMovePoint,
				            moveTarget = event.target,
				            afterX =  event.pageX,
				            afterY =  event.pageY,
				            balanceX, balanceY,afterInfo={},
				            scaleX = (parseFloat(moveTarget.getAttribute('data-mW')) || 1),
				            scaleY = (parseFloat(moveTarget.getAttribute('data-mH')) || 1);
				            
				            this.movePointInfo.afterX = afterX;
				            this.movePointInfo.afterY = afterY;
				            this.movePointInfo.scaleX = scaleX;
				            this.movePointInfo.scaleY = scaleY;
				            afterInfo = sizeChangeMove(moveTarget,this.movePointInfo,event);
				            
				            this.movePointInfo.balanceX = afterInfo.balanceX;
				            this.movePointInfo.balanceY = afterInfo.balanceY;
				            this.movePointInfo.scaleX = afterInfo.scaleX;
				            this.movePointInfo.scaleY = afterInfo.scaleY;
				        },
				        onend: function (event) {
				            root.setAttribute('class', '');
				            sizeChangeSet(event,
				            	{
					            	x:this.movePointInfo.scaleX,
					            	y:this.movePointInfo.scaleY,
				            		balanceX:this.movePointInfo.balanceX,
				            		balanceY:this.movePointInfo.balanceY
				            	})
				            $('.movePoint').show();
				            if($('.action-bottom [data-button="Save"] button').attr('data-action') == 'buttonAction'){
				            	$('.action-bottom [data-button="Save"] button').attr('disabled',false);
				            	$('.action-bottom [data-button="Exit"] button').css({'display':'none'});
				            	$('.action-bottom [data-button="Cancel"] button').css({'display':'block'});
				            }
				        }
				    }).styleCursor(false);
					
					/* zone 크기 변경  */
					var sizeChangeMove = function(targetObj,info,event){
						var moveInfo=info;
						var movePoint,changeCheck,changeType,changeScaleX,changeScaleY,leftCheck,rightCheck,topCheck,bottomCheck,
						widthSizeSet,heightSizeSet,widthSizeMove,heightSizeMove,
						increaseScaleX, decreaseScaleX, increaseScaleY, decreaseScaleY,
						sizeCheckW,sizeCheckH;
						if(!moveInfo.balanceY){
							moveInfo.balanceY = 0;
						}
						if(!moveInfo.balanceX){
							moveInfo.balanceX = 0;
						}
						changeScaleX = ((moveInfo.beforeX-moveInfo.afterX)*moveInfo.scaleSpeedX).toFixed(5);
						changeScaleY = ((moveInfo.beforeY-moveInfo.afterY)*moveInfo.scaleSpeedY).toFixed(5);
						topCheck = $(targetObj).hasClass( 'movePoint0');
						rightCheck = $(targetObj).hasClass( 'movePoint1');
						bottomCheck = $(targetObj).hasClass( 'movePoint2');
						leftCheck = $(targetObj).hasClass( 'movePoint3');
						
						increaseScaleX = moveInfo.scaleX+Math.abs(changeScaleX);
						decreaseScaleX = moveInfo.scaleX-Math.abs(changeScaleX);
						increaseScaleY = moveInfo.scaleY+Math.abs(changeScaleY);
						decreaseScaleY = moveInfo.scaleY-Math.abs(changeScaleY);
						/* 사이즈 작아지는 것 제한 */
			            sizeCheckW = (moveInfo.width * decreaseScaleX) < 60;
			            sizeCheckH = (moveInfo.height * decreaseScaleY) < 60;
			            
						/* 높이 넓이 체크 */
						if(topCheck || bottomCheck){
							changeCheck = moveInfo.beforeY-moveInfo.afterY;
							if(topCheck){
								movePoint = 'height';
								if( changeCheck > 0){
									changeType = 'increase'
								}else{
									changeType ='decrease'
								}
							}else if(bottomCheck){
								movePoint = 'height';
								if( changeCheck > 0){
									changeType ='decrease'
								}else{
									changeType = 'increase'
								}
							}
						}
						
						if(rightCheck ||leftCheck){
							changeCheck = moveInfo.beforeX-moveInfo.afterX;
							if(rightCheck){
								movePoint = 'width';
								if( changeCheck > 0){
									changeType ='decrease'
								}else{
									changeType = 'increase'
								}
							}else if(leftCheck){
								movePoint = 'width';
								if( changeCheck > 0){
									changeType = 'increase'
								}else{
									changeType ='decrease'
								}
							}
						}
						
						if(movePoint == 'height' && changeType == 'increase'){
							moveInfo.scaleX = 1;
							moveInfo.scaleY = increaseScaleY;
							moveInfo.balanceX = 0;
							heightSizeSet = -((moveInfo.moveSpeedY*Number(moveInfo.scaleY))-moveInfo.moveSpeedY);
							heightSizeMove = heightSizeSet-((moveInfo.height*Number(moveInfo.scaleY))-moveInfo.height);
							if(topCheck){
								moveInfo.balanceY = heightSizeMove;
							}else{
								moveInfo.balanceY = heightSizeSet;
							}
						}
						if(movePoint == 'height' && changeType == 'decrease'){
							moveInfo.scaleX = 1;
							moveInfo.scaleY = decreaseScaleY;
							moveInfo.balanceX = 0;
							heightSizeSet = -((moveInfo.moveSpeedY*Number(moveInfo.scaleY))-moveInfo.moveSpeedY);
							heightSizeMove = heightSizeSet-((moveInfo.height*Number(moveInfo.scaleY))-moveInfo.height);
							if(topCheck){
								moveInfo.balanceY = heightSizeMove
							}else{
								moveInfo.balanceY = heightSizeSet
							}
				            if(sizeCheckH){
				            	interact.stop();
				            	sizeChangeSet(event,
						            	{
							            	x:moveInfo.scaleX,
							            	y:moveInfo.scaleY,
						            		balanceX:moveInfo.balanceX,
						            		balanceY:moveInfo.balanceY
						            	})
						        $(targetObj).parents('svg').attr('class', '');    	
				            	$('.movePoint').show();
				            	if($('.action-bottom [data-button="Save"] button').attr('data-action') == 'buttonAction'){
				            		$('.action-bottom [data-button="Save"] button').attr('disabled',false);
				            		$('.action-bottom [data-button="Exit"] button').css({'display':'none'});
					            	$('.action-bottom [data-button="Cancel"] button').css({'display':'block'});
				            	}
				            	//event.target.classList.remove( 'nowdraggable' );
				            	return false;
				            }
						}
						
						if(movePoint == 'width' &&  changeType == 'increase'){
							moveInfo.scaleY = 1;
							moveInfo.scaleX = increaseScaleX;
							moveInfo.balanceY = 0;
							widthSizeSet = -((moveInfo.moveSpeedX*Number(moveInfo.scaleX))-moveInfo.moveSpeedX);
							widthSizeMove = widthSizeSet-((moveInfo.width*Number(moveInfo.scaleX))-moveInfo.width);
							if(rightCheck){
								moveInfo.balanceX = widthSizeSet
							}else{
								moveInfo.balanceX = widthSizeMove
							}
						}
						if(movePoint == 'width' &&  changeType == 'decrease'){
							moveInfo.scaleY = 1;
							moveInfo.scaleX = decreaseScaleX;
							moveInfo.balanceY = 0;
							widthSizeSet = -((moveInfo.moveSpeedX*Number(moveInfo.scaleX))-moveInfo.moveSpeedX);
							widthSizeMove = widthSizeSet-((moveInfo.width*Number(moveInfo.scaleX))-moveInfo.width);
							if(rightCheck){
								moveInfo.balanceX = widthSizeSet
							}else{
								moveInfo.balanceX = widthSizeMove
							}
			            	if(sizeCheckW){
			            		interact.stop();
				            	sizeChangeSet(event,
						            	{
						            		x:moveInfo.scaleX,
							            	y:moveInfo.scaleY,
						            		balanceX:moveInfo.balanceX,
						            		balanceY:moveInfo.balanceY
						            	})
						        $(targetObj).parents('svg').attr('class', '');     	
				            	$('.movePoint').show();
				            	if($('.action-bottom [data-button="Save"] button').attr('data-action') == 'buttonAction'){
				            		$('.action-bottom [data-button="Save"] button').attr('disabled',false);
				            		$('.action-bottom [data-button="Exit"] button').css({'display':'none'});
					            	$('.action-bottom [data-button="Cancel"] button').css({'display':'block'});
				            	}
				           // 	event.target.classList.remove( 'nowdraggable' );
				            	return false;
				            }
						}
						//console.log(moveNumX)
				        targetObj.parentNode.style.webkitTransform =
				        	targetObj.parentNode.style.transform =
					        	'translate('+moveInfo.balanceX+'px,' + moveInfo.balanceY + 'px) scale('+ moveInfo.scaleX +','+ moveInfo.scaleY +')';
			            $(targetObj.parentNode).attr({
			            	'data-mH' : moveInfo.scaleY,
			            	'data-mW' : moveInfo.scaleX
			            })
			            
			            return {
			            	balanceX : moveInfo.balanceX,
					        balanceY : moveInfo.balanceY,
					        scaleX : moveInfo.scaleX,
					        scaleY : moveInfo.scaleY
			            }
					}
				/* 크기 조절 set */
				var sizeChangeSet = function(event,afterData){
					 var parentOffsetY =  $(event.target).closest('svg').offset().top,
						parentOffsetX =  $(event.target).closest('svg').offset().left,
						targetOffsetX = event.pageX,
						targetOffsetY = event.pageY,
						pointBox = $(event.target.parentNode).find('polygon')[0],
						pointList = $(event.target.parentNode).find('polygon')[0].points,
						pointListLength = $(event.target.parentNode).find('polygon')[0].points.length,
						targetPositionX,targetPositionY,
						targetPointX = targetOffsetX-parentOffsetX,
						targetPointY =  targetOffsetY-parentOffsetY;
					 
					for(var i =- 0 ; i< pointListLength; i++){
						//pointList[i].x = pointList[i].x +(( targetPointX-pointList[i].x) *scale.x)
						//pointList[i].y = pointList[i].y+(( targetPointY-pointList[i].y) *scale.y)
						pointList[i].x = pointList[i].x*afterData.x+afterData.balanceX;
						pointList[i].y = pointList[i].y*afterData.y+afterData.balanceY;
						
						$(event.target.parentNode).find('use').eq(i).attr({
							x : pointList[i].x,
							y : pointList[i].y
						});
						if(i ==4 || i ==9 || i ==14 || i ==19){
							$(event.target.parentNode).find('use').eq(i).attr({
								x : pointList[i].x-5,
								y : pointList[i].y-5
							});
					    }
					}
					$(event.target.parentNode).find('.zoneNameText').attr({
						'dx': $('.movePoint0').attr('x')-30,
						'dy': $('.movePoint1').attr('y')
					});
					event.target.parentNode.style.webkitTransform =
						event.target.parentNode.style.transform ='translate(0px, 0px) scale(1, 1)';
					$('html').css({'cursor':'initial'});
					rootTop.deviceOwnership();
				}
		   }
				
		  
		    /* zone 크기 체크 */
		   function polygonSizeCheck (point) {
			   var polygonPoint = point,
			   		polygonPointLength = point.length,
			   		polygonXList = [],
			   		polygonYList = [],
			   		polygonWidth,
			   		polygonHeight,
			   		leftNum,rightNum,topNum,bottomNum;
			   		
			   
			   for(var i =0;i < polygonPointLength; i++){
				   polygonXList.push(polygonPoint[i].x);
				   polygonYList.push(polygonPoint[i].y);
			   }
			   polygonXList.sort(function(a, b){return a-b});
			   polygonYList.sort(function(a, b){return a-b});
			   leftNum = polygonXList[0]
			   rightNum = polygonXList[polygonXList.length-1]
			   topNum = polygonYList[0]
			   bottomNum = polygonYList[polygonYList.length-1]
			   
			   polygonWidth = rightNum - leftNum;
			   polygonHeight = bottomNum - topNum;
			   
			   return { width : polygonWidth.toFixed(1), height:polygonHeight.toFixed(1), leftNum:leftNum, rightNum:rightNum, topNum:topNum, bottomNum:bottomNum }
		   }
		function applyTransforms (event) {
		    rootMatrix = root.getScreenCTM();
		    transformedPoints = originalPoints.map(function(point) {
		        return point.matrixTransform(rootMatrix);
		    });
		    interact('.movePoint').draggable({
		        snap: {
		            targets: transformedPoints,
		            range: 20
		        }
		    });
		}
		 /* zone move function */
		 function polygonMoveListener (event) {
		        var targets = event.target,
		            // keep the dragged position in the data-x/data-y attributes
		            x = (parseFloat(targets.getAttribute('data-x')) || 0) + event.dx,
		            y = (parseFloat(targets.getAttribute('data-y')) || 0) + event.dy,
			        mW = (parseFloat(targets.getAttribute('data-mW')) || 1),
				    mH = (parseFloat(targets.getAttribute('data-mH')) || 1);
			    var targetName = $('.zoneNameText[data-name="group'+$(targets).find('polygon').attr('data-id')+'"]');    
		        targets.style.webkitTransform =
		        targets.style.transform =
		        	'translate(' + x + 'px,' + y + 'px) scale('+ mW +','+ mH +')';
		        targetName.css({
					 'transform': 'translate(' + x + 'px,' + y + 'px)'
					 
				 })
		        // update the posiion attributes
		        targets.setAttribute('data-x', x);
		        targets.setAttribute('data-y', y);
		        targets.setAttribute('data-mH', mH);
		        targets.setAttribute('data-mW', mW);
		      }
		 
		 /* zone 이름 움직이기 */
		 function zoneNameMoveListener (event) {
			 var targets = event.target,
			 x = (parseFloat(targets.getAttribute('data-x')) || 0) + event.dx,
			 y = (parseFloat(targets.getAttribute('data-y')) || 0) + event.dy;
			 targets.style.webkitTransform =
				 targets.style.transform =
					 'translate(' + x + 'px,' + y + 'px)';
			 targets.setAttribute('data-x', x);
			 targets.setAttribute('data-y', y);
			 if($('.action-bottom [data-button="Save"] button').attr('data-action') == 'buttonAction'){
	            	$('.action-bottom [data-button="Save"] button').attr('disabled',false);
	            	$('.action-bottom [data-button="Exit"] button').css({'display':'none'});
	            	$('.action-bottom [data-button="Cancel"] button').css({'display':'block'});
	            }
		 }
		 
		 /* device move function */
		 function circleMoveListener (event) {
			console.log('device move')
			 var targets = event.target,
			 targetInfo = $(targets).parents('svg').parent().find('[data-position="'+$(targets).attr('data-name')+'"]')
			 x = (parseFloat(targets.getAttribute('data-x')) || 0) + event.dx,
			 y = (parseFloat(targets.getAttribute('data-y')) || 0) + event.dy;
			 
			 targets.style.webkitTransform =
				 targets.style.transform =
					 'translate(' + x + 'px,' + y + 'px)';
			 if($(targets).prev('circle').hasClass('svgCircle')){
				 $(targets).prev('circle').css({'transform':'translate(' + x + 'px,' + y + 'px)'})
			 }
			 
			 targetInfo.css({
				 'transform':'translate(' + x + 'px,' + y + 'px)'
				 })
			 // update the posiion attributes
			 targets.setAttribute('data-x', x);
			 targets.setAttribute('data-y', y);
			 //targets.setAttribute('data-x', x);
			 //targets.setAttribute('data-y', y);
		 }
		 var moveTargetId,moveTargetListener,targetRestriction,zoneNameId,polygonNode;
		/*도형 움직이기*/ 
		 
		 if($(targetObject).hasClass('zoonMap')){
			 /* polygon set */
			 moveTargetId = $(targetObject).parent('g')[0];
			 targetRestriction = 'parent';
			 moveTargetListener = polygonMoveListener;
			 /* zone Name 음직이기 */
			 console.log($(root),$(targetObject).attr('data-id'))
			 zoneNameId = $(root).find('.zoneNameText[data-name="group'+$(targetObject).attr('data-id')+'"]')[0];
			 $(zoneNameId).addClass('on')
		 }else{
			 /* circle set */
			// moveTargetId =targetObject.selector
			// $(targetObject).attr('data-name')
			 if($('image[data-name="'+$(targetObject).attr('data-name')+'"]').hasClass('circleImg')){
				 moveTargetId = $('image[data-name="'+$(targetObject).attr('data-name')+'"]')[0];
			 }else{
				 moveTargetId = $('circle[data-name="'+$(targetObject).attr('data-name')+'"]')[0];
			 }
			 
			 
			 targetRestriction = 'self';
				moveTargetListener = circleMoveListener;
		 }
		 
		 interact(moveTargetId)
		    .draggable({
		        inertia: true,
		        restrict: {
		          restriction: targetRestriction,
		          endOnly: true,
		          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
		        },
		        autoScroll: true,
		        onstart:function(e){
		        	var parentNodeName =  e.target.getAttribute('id');
		            var changeTarget =  $('#'+parentNodeName).find('polygon');
		            changeTarget.addClass( 'nowdraggable' );
		        },
		        onmove: moveTargetListener,
		        onend: function (event) {
		        	moveSet(event);
		        	var parentNodeName =  event.target.getAttribute('id');
		            var changeTarget =  $('#'+parentNodeName).find('polygon');
		            if(changeTarget.attr('data-name') !=='newGroup'){
		            	changeTarget.attr('change-bool','true');
		            }
		            if($('.action-bottom [data-button="Save"] button').attr('data-action') == 'buttonAction'){
		            	$('.action-bottom [data-button="Save"] button').attr('disabled',false);
		            	$('.action-bottom [data-button="Exit"] button').css({'display':'none'});
		            	$('.action-bottom [data-button="Cancel"] button').css({'display':'block'});
		            }
		        }
		    });
		 
		 /* zone 이름 움직이기 - 주석처리 */
		if($(targetObject).hasClass('zoonMap')){
			 polygonNode = $(zoneNameId).closest('svg')[0] 
			 console.log(zoneNameId)
			 interact(zoneNameId)
			    .draggable({
			        inertia: true,
			        restrict: {
			          restriction: polygonNode,
			          endOnly: true,
			          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
			        },
			        autoScroll: false,
			        onstart:function(e){
			        	event.target.classList.add( 'nowdraggable' );
			        },
			        onmove: zoneNameMoveListener,
			        onend: function (event) {
			        	moveSet(event);
			        	event.target.classList.remove( 'nowdraggable' );
			        }
			    });
		 }
		
		
		var moveRestrictCheck = function(target,targetParent){
			var  item = target;
			var  itemParent = targetParent;
			var itemParentRight, itemParentBottom
			var itemPosition = []
			itemPosition.push(Number(item.attr('dx')),Number(item.attr('dy'))-20, Number(item.attr('dx'))-20,Number(item.attr('dy')))
			itemParentRight = targetParent.width()-item[0].textLength.baseVal.value
			itemParentBottom = targetParent.height()
			if(itemPosition[0]< 0){
				item.attr('dx',0);
			}
			if(itemPosition[1]< 0){
				item.attr('dy',20);
			}
			if(itemPosition[2]> itemParentRight){
				item.attr('dx',itemParentRight);
			}
			if(itemPosition[3]> itemParentBottom){
				item.attr('dy',itemParentBottom);
			}
		}
		
		var moveSet = function(eventPush){
/*			var target = eventPush.target,
			rootTarget = target.getAttribute('id'),
			targetId = rootTarget,
			//targetId = $('#'+rootTarget).find('polygon').attr('id'),
			childrenName = targetId.split('moveBox')[1],
			moveTarget = document.getElementById(targetId),
			
*/			
			console.log(eventPush)
		
			var target = eventPush.target,
			translateX = target.getAttribute('data-x'),//이동 비율 width
			translateY = target.getAttribute('data-y'),//이동 비율 height
			zoneNameText,moveTarget;
			var circleEndData = []
			
			
			if($(target).find('polygon').hasClass('zoonMap')){
				var targetId = target.getAttribute('id'),
				childrenName = targetId.split('moveBox')[1],
				moveTarget = $(target).children('polygon')[0],
				parentId = $(target).parent('g').attr('id'),
				zoneNameText = $(target).find('.zoneNameText'),
				pushPolygon = '',
				afterX,beforeX,
				afterY,beforeY,targetZoneName,
				comma='';
				var circleInfo;
				for(var i = 0 ; i < coordinateLength; i++){
					beforeX = moveTarget.points.getItem(i).x;
					beforeY = moveTarget.points.getItem(i).y;
					afterX = beforeX+Number(translateX);
					afterY = beforeY+Number(translateY);
					if(i > 0){
						comma =','
					}
					pushPolygon = pushPolygon + comma+afterX+' '+afterY;
					
					$(target).find('use').eq(i).attr({
						x : afterX,
						y : afterY
					});
					
					 if(i ==4 || i ==9 || i ==14 || i ==19){
						 $(target).find('use').eq(i).attr({
								x : afterX-5,
								y : afterY-5
						 });
					 }
				}
				$(target).attr({
					'data-x':'0',
					'data-y':'0',
					'data-mw': 1,
					'data-mh': 1,
				});
				
				targetZoneName = $('.zoneNameText[data-name="group'+$(target).find('polygon').attr('data-id')+'"]');
				targetZoneName.attr({
					'dx': Number(targetZoneName.attr('dx'))+Number(translateX),
					'dy': Number(targetZoneName.attr('dy'))+Number(translateY)
				}).css({'transform':'translate(0px, 0px)'});
				moveRestrictCheck(targetZoneName, targetZoneName.closest('svg'))
				/* 리스트 이동 작업 */
				var checkbox = $('.floor-list').find(".k-checkbox");
		    	var checked = $('.floor-list').find(".k-checkbox:checked");
		    	var checkedLength = $('.floor-list').find(".k-checkbox:checked").length;
				var lastChecked = $('.floor-list').find('.k-checkbox:checked').eq(checkedLength-1).closest('li').index();
				
		    	if(checkedLength-1 == lastChecked){
		    		$('.view-list-line').find('.list-move-bottom button[data-action="top"]').attr('disabled',true);
		    		$('.view-list-line').find('.list-move-bottom button[data-action="up"]').attr('disabled',true);
		    	}
		    	if(checked.eq(0).closest('li').index() == checkbox.length-checkedLength){
		    		$('.view-list-line').find('.list-move-bottom button[data-action="down"]').attr('disabled',true)
		    		$('.view-list-line').find('.list-move-bottom button[data-action="bottom"]').attr('disabled',true)
		    	}
			}
			if($(target).hasClass('zoneNameText')){
				$(target).attr({
					'dx':$(target).prop('dx').baseVal[0].value+Number(translateX),
					'dy':$(target).prop('dy').baseVal[0].value+Number(translateY),
					'data-x':'0',
					'data-y':'0'
				});
			}
			if(zoneNameText && zoneNameText.hasClass('zoneNameText')){
				zoneNameText.attr({
					'dx':zoneNameText.prop('dx').baseVal[0].value+Number(translateX),
					'dy':zoneNameText.prop('dy').baseVal[0].value+Number(translateY)
				});
			}
			
			
			if($(target).hasClass('circleImg') || $(target).hasClass('svgCircle')){
				
				circleInfo = $('[data-position="'+$(target).attr('data-name')+'"]');
				
				
				if($(target).hasClass('circleImg') ){
					circleEndData[0] = Number($(target).prev('circle').attr('cx'))+Number(translateX);
					circleEndData[1] = Number($(target).prev('circle').attr('cy'))+Number(translateY);
					$(target).attr({
						'x':Number($(target).attr('x'))+Number(translateX),
						'y':Number($(target).attr('y'))+Number(translateY)
					})
					$(target).prev('circle').attr({
						'cx':circleEndData[0],
						'cy':circleEndData[1]
					})
					$(target).prev('circle').css({
						'transform':'translate(0px, 0px) scale(1, 1)'
					});
				}
				if($(target).hasClass('svgCircle')){
					circleEndData[0] = Number($(target).attr('cx'))+Number(translateX);
					circleEndData[1] = Number($(target).attr('cy'))+Number(translateY);
					$(target).attr({
						'cx':circleEndData[0],
						'cy':circleEndData[1]
					})
					$(target).css({
						'transform':'translate(0px, 0px) scale(1, 1)'
					});
				}
				
				circleInfo.css({
					'left':Number(circleInfo.css('left').split('px')[0])+Number(translateX),
					'top':Number(circleInfo.css('top').split('px')[0])+Number(translateY),
					'transform':'translate(0px, 0px) scale(1, 1)'
					})
				$(target).attr({
					'data-x':'0',
					'data-y':'0'
				});
				rootTop.trigger("onDropped", { coordinates : circleEndData });
			}
			
			if(moveTarget){
				moveTarget.setAttribute('points',pushPolygon);
			}
			
			$(target).css({
				'transform':'translate(0px, 0px) scale(1, 1)'
			});
			rootTop.deviceOwnership();
		}
		

		    var onClick =function(){
		    	console.log('onClick');
		    }
		    var onShapeFeatureCreated =function(){
		    	console.log('onShapeFeatureCreated');
		    }
		    var onZoomStart =function(){
		    	console.log('onZoomStart');
		    }
		    var onZoomEnd =function(){
		    	$('.km-scroll-container .k-layer').css({'width':'','height':''})
		    }
		},
		
		svgNewMade : function(selectObject){
			 var svgAccount="http://www.w3.org/2000/svg",
			    xns="http://www.w3.org/1999/xlink",
			    root = this.element.children("svg")[0],
			    rootId = this.element.children("svg").attr('id')
			    svgNewParent = document.createElementNS(svgAccount, 'g'), 
			    svgText = document.createElementNS(svgAccount, 'text'),
			    svgNewNum = $(root).find('g').length,
			    newPolygonLength = $(root).find('[data-name="newGroup"]').length;
			 	var newListUid = $('#spaceModulePage').find('.floor-list li[data-uid="'+selectObject.split('new')[1]+'"]').find('.name').text();
			 	
			    svgNewParent.setAttribute('id','moveBoxNew'+svgNewNum);
			    svgNewMade = document.createElementNS(svgAccount, 'polygon');
			    svgNewMade.setAttribute('stroke','rgb(0,129,198)');
			 	svgNewMade.setAttribute('stroke-width','2');
			 	svgNewMade.setAttribute('stroke-opacity' , '1');
			 	svgNewMade.setAttribute('stroke-linejoin','bevel');
			 	svgNewMade.setAttribute('fill','rgb(0,129,198)');
			 	svgNewMade.setAttribute('fill-opacity','0.2');
			 	svgNewMade.setAttribute('fill-rule','nonzero');
			 	svgNewMade.setAttribute('data-bool','true');
			 	svgNewMade.setAttribute('class','zoonMap');
			 	svgNewMade.setAttribute('data-name','newGroup');
			 	svgNewMade.setAttribute('id',selectObject);
			 	svgNewMade.setAttribute('data-setting','new');
			 	svgNewMade.setAttribute('points','470 340,470 300,510 300,550 300,590 300,630 300,670 300,710 300,710 340,710 380,710 420,710 460,670 460,630 460,590 460,550 460,510 460,470 460,470 420,470 380');
			 	
			 	svgText.setAttribute('class','zoneNameText');
	            svgText.setAttribute('filter','red');
	            svgText.setAttribute('font-size','16px');
	            svgText.setAttribute('data-name','group'+selectObject);
	            
	            svgText.textContent  = newListUid;
	            svgText.setAttribute('dx','545');
	            svgText.setAttribute('dy','385');
	             
			 	$(root).append(svgNewParent);
			 	svgNewParent.append(svgNewMade);
			 	root.append(svgText);
			 	
			 	/* text 위치설정 */
			 	
			 	/* 신규 생성 */
		},
		svgReset : function(){
			/* reset 메소드 */
			//mapMade에서 걸리는 이벤트 제거시 $('#map-view-block').off()
			this.element.children("svg").find('use').remove();
			interact('.movePoint, g, polygon').draggable(false);
			interact('.movePoint, g,polygon').resizable(false);
			interact('.dropzone, g,polygon').dropzone(false);
			interact('#'+parentId).draggable(false);
			
		},
		svgModifyEnd : function(selectObject){
			var nowModifyObj = selectObject;
			var nowModifyParentObj = nowModifyObj.closest('g')[0];
			var afterPoint = nowModifyObj.attr('points');
			var zoneNameText = $('.zoneNameText[data-name="group'+nowModifyObj.attr('data-id')+'"]')[0]
			$(zoneNameText).removeClass('on')
			selectObj = document.getElementById(selectObject);
			//	point = selectObj.points.getItem(i);
			//	console.log(document.event)
			console.log(nowModifyObj)
			nowModifyObj.parent('g').find('use').remove();
			
			interact(nowModifyParentObj).draggable(false);
			interact(nowModifyParentObj).resizable(false);
			interact(zoneNameText).draggable(false);
			$('html').css({'cursor':'initial'});
		/*	interact($('#'+selectObject).parent()).resizemove(false);*/
		},
		deviceOwnership : function(data){
			var deviceList = $('.svgCircle');
			var zoneList = $('polygon');
			var returnDevie;
			var changeDevice,deviceName,deviceGroupName, zonePoint, devicePoint,deviceDataOn,deviceDataOff;
			var deviceClass;
			/* 디바이스는 적어도 하나이상 존은 하나 혹은 모두 */
			var deviceLocation = data;
			
			
			if(deviceLocation){
				if(deviceLocation.type == 'reset'){
					for(var i = 0; i < deviceLocation.data.length; i++){
						deviceGroupName = deviceLocation.data[i].foundation_space_zones_id;
						deviceId = deviceLocation.data[i].id;
						deviceClass = $('[data-id="'+deviceId+'"]');
						changeDevice = deviceClass.attr('data-name');
						deviceClass.attr({'data-group':deviceGroupName});
						$('[data-name="'+changeDevice+'"]').attr('data-group',deviceGroupName);
						$('[data-position="'+changeDevice+'"]').attr('data-group',deviceGroupName);
					}
				}
				if(deviceLocation.type == 'del'){
					console.log(deviceLocation.delId)
					for(var i = 0; i < deviceLocation.data.length; i++){
						deviceGroupName = deviceLocation.data[i].foundation_space_zones_id;
						deviceId = deviceLocation.data[i].id;
						deviceClass = $('[data-id="'+deviceId+'"]');
						changeDevice = deviceClass.attr('data-name');
						
						for(var j = 0 ; j< deviceLocation.delId.length ;j++){
							if(deviceGroupName == deviceLocation.delId.attr('data-id')){
								deviceClass.attr({'data-group':''});
								$('[data-name="'+changeDevice+'"]').attr('data-group','');
								$('[data-position="'+changeDevice+'"]').attr('data-group','');
							}
						}
					}
				}
				
				
			}else{
				for(var i = 0; i < zoneList.length; i++){
					zonePoint = coordinateFunction(zoneList[i].points);
					deviceName = zoneList[i].getAttribute('data-name').split('group')[1];
					deviceDataOn = { 'stroke' : 'rgb(0,129,198)', 'stroke-width' :'10', 'stroke-opacity' :'0.4', 'data-bool':'false','data-group':deviceName };
					deviceDataOff = { 'stroke' : 'rgb(0, 0, 0)', 'stroke-width' :'0', 'stroke-opacity' :'0.4' , 'data-bool':'true','data-group':''};
					
					for(var j = 0; j < deviceList.length; j++){
						devicePoint = [Number(deviceList[j].cx.baseVal.value.toFixed(1)),	Number(deviceList[j].cy.baseVal.value.toFixed(1))];
						changeDevice = deviceList[j].getAttribute('data-name');
						deviceGroupName = deviceList[j].getAttribute('data-group');
						
						if(checkDevice(devicePoint,zonePoint) && deviceName !== deviceGroupName){
							$(deviceList[j]).attr(deviceDataOn);
							$('[data-name="'+changeDevice+'"]').attr('data-group',deviceName);
							$('[data-position="'+changeDevice+'"]').attr('data-group',deviceName);
						}
						if(checkDevice(devicePoint,zonePoint) == false && deviceName == deviceGroupName){
							$(deviceList[j]).attr(deviceDataOff);
							$('[data-name="'+changeDevice+'"]').attr('data-group','');
							$('[data-position="'+changeDevice+'"]').attr('data-group','');
						}
					}
				}
			}
			
			/* point는 device, vs는 zone  */
			function checkDevice (point, vs) {
				var x = point[0], y = point[1];
	            var inside = false;
	            for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
	                var xi = vs[i][0], yi = vs[i][1];
	                var xj = vs[j][0], yj = vs[j][1];
	                var intersect = ((yi > y) != (yj > y))
	                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
	                if (intersect) inside = !inside;
	            }
	            return inside;
			}
			function coordinateFunction (madeArray) {
		            var toFloatPoint = function(val){
		                val += ".1";
		                return parseFloat(val);
		            };
		            
		            var madeList = madeArray,
		            afterArray = [];
		            for(var i = 0; i < madeList.length ; i++){
		                afterArray.push([toFloatPoint(Math.round(madeList[i].x)),toFloatPoint(Math.round(madeList[i].y))]);
		            }
		            var x = toFloatPoint(Math.round(madeList[0].x));
		            var y = toFloatPoint(Math.round(madeList[0].y));
		            afterArray.push([x, y]);
		            return afterArray;
			}
		},
		
		destroy : function(){
            //부모 함수 호출
			kendo.ui.Widget.fn.destroy.call(this);
        }  
});
 ui.plugin(svgModify);
})(jQuery);



