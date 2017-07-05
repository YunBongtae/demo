$(function() {
	var calendarSpan = $("span");
	var JSON_Calendar = undefined;
	
	if(calendarSpan.length > 0) {
		$.each(calendarSpan, function(i,v) {
			/**
		     * 페이지 로딩시 span id가 "jex.selectYyyyMmCalendar" 인 것을 찾아서 년,월만 나오는 셀렉트 박스를 그려준다.
		     */
			if(jb_null2void($(this).attr("class")).indexOf("jex.selectYyyyMmCalendar") > -1) {
				JSON_Calendar = JSON.parse($(this).attr("class"));

				if(jb_null2void(JSON_Calendar.bfGab) == "") {
					alert("bfGab 속성값을 입력해 주세요.");
	                return false;
	            }
				if(jb_null2void(JSON_Calendar.afGab) == "") {
	                alert("afGab 속성값을 입력해 주세요.");
	                return false;
	            }

	            var bfGab = JSON_Calendar.bfGab.split(",");
	            var afGab = JSON_Calendar.afGab.split(",");

	            if(bfGab.length != 2) {
	                alert("bfGab 속성값을 \"0,0\"의 방식으로 입력해 주세요.");
	                return false;
	            }
	            if(afGab.length != 2) {
	                alert("afGab 속성값을 \"0,0\"의 방식으로 입력해 주세요.");
	                return false;
	            }

	            var selectHtml = jb_getSelectMonth(JSON_Calendar.yearName, JSON_Calendar.monthName, bfGab, afGab);

	            $(this).html(selectHtml);
			}
			/**
		     * 페이지 로딩시 span id가 "jex.selectYyyyMmCalendar" 인 것을 찾아서 년,월만 나오는 셀렉트 박스를 그려준다.
		     */
			if(jb_null2void($(this).attr("class")).indexOf("jex.selectMmYyyyCalendar") > -1) {
				JSON_Calendar = JSON.parse($(this).attr("class"));

				if(jb_null2void(JSON_Calendar.bfGab) == "") {
					alert("bfGab 속성값을 입력해 주세요.");
	                return false;
	            }
				if(jb_null2void(JSON_Calendar.afGab) == "") {
	                alert("afGab 속성값을 입력해 주세요.");
	                return false;
	            }

	            var bfGab = JSON_Calendar.bfGab;
	            var afGab = JSON_Calendar.afGab;

	            if(!bfGab) {
	                alert("bfGab 속성값을 \"0\"의 방식으로 입력해 주세요.");
	                return false;
	            }
	            if(!afGab) {
	                alert("afGab 속성값을 \"0\"의 방식으로 입력해 주세요.");
	                return false;
	            }

	            var selectHtml = jb_getSelectCardMonth(JSON_Calendar.yearName, JSON_Calendar.monthName, bfGab, afGab);

	            $(this).html(selectHtml);
			}
			/**
		     * 페이지 로딩시 span id가 "selectYyyyMmDdCalendar" 인 것을 찾아서 년,월,일이 나오는 셀렉트 박스를 그려준다.
		     */
			if(jb_null2void($(this).attr("class")).indexOf("jex.selectYyyyMmDdCalendar") > -1) {
				JSON_Calendar = JSON.parse($(this).attr("class"));
				
				if(jb_null2void(JSON_Calendar.bfGab) == "") {
					alert("bfGab 속성값을 입력해 주세요.");
	                return false;
	            }
				if(jb_null2void(JSON_Calendar.afGab) == "") {
	                alert("afGab 속성값을 입력해 주세요.");
	                return false;
	            }

	            var bfGab = JSON_Calendar.bfGab.split(",");
	            var afGab = JSON_Calendar.afGab.split(",");

	            if(bfGab.length != 3) {
	            	alert("bfGab 속성값을 \"0,0,0\"의 방식으로 입력해 주세요.");
	                return false;
	            }
	            if(afGab.length != 3) {
	                alert("afGab 속성값을 \"0,0,0\"의 방식으로 입력해 주세요.");
	                return false;
	            }

	            var selectHtml = jb_getSelectYMD(JSON_Calendar.yearName,JSON_Calendar.monthName,JSON_Calendar.dateName, bfGab, afGab);

	            $(this).html(selectHtml);
        	}
			/**
		     * 페이지 로딩시 span id가 "calendarBtn" 인 것을 찾아서 달력상단 표시버튼을 그려준다.
		     */
			if(jb_null2void($(this).attr("class")).indexOf("jex.calendarBtn") > -1) {
        		JSON_Calendar = JSON.parse($(this).attr("class"));

        		var btnGab  = "";
                var btnDate = "";
                var index   = "";

                if(jb_null2void(JSON_Calendar.Gab) != "") {
                    btnGab = JSON_Calendar.Gab.split(",");
                    index  = JSON_Calendar.index;

                    btnDate += "<p class=\"mgb10\">";
                    for(var idx=0; idx<btnGab.length; idx++) {
                        bfGab = JSON_Calendar.bfGab;
                        afGab = JSON_Calendar.afGab;

                        var btn_name = btnGab[idx].replaceAll("-", "").replaceAll("T", "당일").replaceAll("Y", "년").replaceAll("M", "개월").replaceAll("D", "일");
                        if(btn_name == "7일") {
                    		btn_name = "1주일";
                    	}
                        if(btnGab[idx].indexOf("-") > -1) {
                            btnDate += "<a href=\"#jbbank\" class=\"btn_07\" onclick=\"javascript:jb_setComboDate('" + index + "', '" + btnGab[idx] + "', '" + bfGab + "', '" + afGab + "'); return false;\" id=\"_btn_bf_" + btnGab[idx].replaceAll("-", "") + "\"><span>" + btn_name + "전" + "</span></a>";
                        } else {
                        	btnDate += "<a href=\"#jbbank\" class=\"btn_07\" onclick=\"javascript:jb_setComboDate('" + index + "', '" + btnGab[idx] + "', '" + bfGab + "', '" + afGab + "'); return false;\" id=\"_btn_af_" + btnGab[idx].replaceAll("-", "") + "\"><span>" + btn_name + "</span></a>";
                        }

                        if(idx != btnGab.length-1) {
                        	btnDate += "\r\n";    	
                        }
                    }
                    btnDate += "</p>";
                }

                $(this).html(btnDate);
        	}
			/**
		     * 페이지 로딩시 span id가 "calendarBtn" 인 것을 찾아서 달력상단 표시버튼을 그려준다.[항상 현재일자를 기준으로 처리한다.]
		     */
			if(jb_null2void($(this).attr("class")).indexOf("jex.calendarBtnToday") > -1) {
        		JSON_Calendar = JSON.parse($(this).attr("class"));

        		var btnGab  = "";
                var btnDate = "";
                var index   = "";

                if(jb_null2void(JSON_Calendar.Gab) != "") {
                    btnGab = JSON_Calendar.Gab.split(",");
                    index  = JSON_Calendar.index;

                    btnDate += "<p class=\"mgb10\">";
                    for(var idx=0; idx<btnGab.length; idx++) {
                        bfGab = JSON_Calendar.bfGab;
                        afGab = JSON_Calendar.afGab;

                        var btn_name = btnGab[idx].replaceAll("-", "").replaceAll("T", "당일").replaceAll("Y", "년").replaceAll("M", "개월").replaceAll("D", "일");
                        if(btn_name == "7일") {
                    		btn_name = "1주일";
                    	}
                        if(btnGab[idx].indexOf("-") > -1) {
                            btnDate += "<a href=\"#jbbank\" class=\"btn_07\" onclick=\"javascript:jb_setComboDate('" + index + "', '" + btnGab[idx] + "', '" + bfGab + "', '" + afGab + "', true); return false;\" id=\"_btn_bf_" + btnGab[idx].replaceAll("-", "") + "\"><span>" + btn_name + "전" + "</span></a>";
                        } else {
                        	btnDate += "<a href=\"#jbbank\" class=\"btn_07\" onclick=\"javascript:jb_setComboDate('" + index + "', '" + btnGab[idx] + "', '" + bfGab + "', '" + afGab + "', true); return false;\" id=\"_btn_af_" + btnGab[idx].replaceAll("-", "") + "\"><span>" + btn_name + "</span></a>";
                        }

                        if(idx != btnGab.length-1) {
                        	btnDate += "\r\n";    	
                        }
                    }
                    btnDate += "</p>";
                }

                $(this).html(btnDate);
        	}
		});
	}
});
/**
 * 달력 상단 날짜버튼 클릭 이벤트
 * @param index
 * @param flag
 */
function jb_setComboDate(index, flag, bGab, aGab, istoday) {
	var isMonth = false;
    var idx  = index.split(",");
    var yGab = "0";
    var mGab = "0";
    var dGab = "0";

    var bfGab = bGab.split(",");
    var afGab = aGab.split(",");
    var today = "";
    
    if(istoday==undefined || istoday==null ){
    	istoday = false;
    }

    if(!istoday){
    	// 년,월만 나오는 달력 여부
        if(bfGab.length == 2) isMonth = true;

        // 이전으로 가는 버튼을 누를 경우는 기준일자가 조회종료일자(과거로 가는 버튼)
        if(flag.indexOf("-") > -1) {
        	if(isMonth) today = jb_getBoundDate(afGab[0], afGab[1], 0);
        	else today = jb_getBoundDate(afGab[0], afGab[1], afGab[2]);
        // 이후로 가는 버튼을 누를 경우는 기준일자가 조회시작일자(미래로 가는 버튼)
        } else {
        	if(isMonth) today = jb_getBoundDate(bfGab[0], bfGab[1], 0);
        	else today = jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2]);
        }

        if(flag.indexOf("T") > -1) {
        	today = _TODAY_;
        }
    }else{
    	today = _TODAY_;
    }
    

    // 달력이 하나만 나오는 경우
    if(idx.length == 1) {
        if(flag.indexOf("-") > -1) {
            // 시작일
            if(flag.indexOf("Y") > -1) {
                yGab = flag.replaceAll("Y", "");
                mGab = "0";
                if(!isMonth) dGab = "0";
            } else if(flag.indexOf("M") > -1) {
                yGab = "0";
                mGab = flag.replaceAll("M", "");
                if(!isMonth) dGab = "0";
            } else if(flag.indexOf("D") > -1) {
                yGab = "0";
                mGab = "0";
                if(!isMonth) dGab = flag.replaceAll("D", "");
            }

            $("select[id='jex.selectYyyy']")[Number(idx[0])].value = jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4);
            if(!isMonth) {
                jb_YMDreplaceSelectMM($("select[id='jex.selectMm']")[Number(idx[0])], jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4), jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6), jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2], today), jb_getBoundDate(afGab[0], afGab[1], afGab[2]));
            } else {
                jb_MonthreplaceSelectMM($("select[id='jex.selectMm']")[Number(idx[0])], jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4), jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6), jb_getBoundDate(bfGab[0], bfGab[1], 0, today), jb_getBoundDate(afGab[0], afGab[1], 0));
            }

            $("select[id='jex.selectMm']")[Number(idx[0])].value   = jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6);
            if(!isMonth) {
                jb_YMDreplaceSelectDd($("select[id='jex.selectDd']")[Number(idx[0])], jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4), jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6), jb_getBoundDate(yGab, mGab, dGab, today).substring(6), jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2], today), jb_getBoundDate(afGab[0], afGab[1], afGab[2]));
                $("select[id='jex.selectDd']")[Number(idx[0])].value   = jb_getBoundDate(yGab, mGab, dGab, today).substring(6);
            }
        } else {
            // 종료일
            if(flag.indexOf("Y") > -1) {
                yGab = flag.replaceAll("Y", "");
                mGab = "0";
                if(!isMonth) dGab = "0";
            } else if(flag.indexOf("M") > -1) {
                yGab = "0";
                mGab = flag.replaceAll("M", "");
                if(!isMonth) dGab = "0";
            } else if(flag.indexOf("D") > -1) {
                yGab = "0";
                mGab = "0";
                if(!isMonth) dGab = flag.replaceAll("D", "");
            } else if(flag.indexOf("T") > -1) {
                yGab = "0";
                mGab = "0";
                if(!isMonth) dGab = "0";
            }

            $("select[id='jex.selectYyyy']")[Number(idx[0])].value = jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4);
            if(!isMonth) {
                jb_YMDreplaceSelectMM($("select[id='jex.selectMm']")[Number(idx[0])], jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4), jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6), jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2], today), jb_getBoundDate(afGab[0], afGab[1], afGab[2]));
            } else {
                jb_MonthreplaceSelectMM($("select[id='jex.selectMm']")[Number(idx[0])], jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4), jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6), jb_getBoundDate(bfGab[0], bfGab[1], 0, today), jb_getBoundDate(afGab[0], afGab[1], 0));
            }

            $("select[id='jex.selectMm']")[Number(idx[0])].value   = jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6);
            if(!isMonth) {
                jb_YMDreplaceSelectDd($("select[id='jex.selectDd']")[Number(idx[0])], jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4), jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6), jb_getBoundDate(yGab, mGab, dGab, today).substring(6), jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2], today), jb_getBoundDate(afGab[0], afGab[1], afGab[2]));
                $("select[id='jex.selectDd']")[Number(idx[0])].value   = jb_getBoundDate(yGab, mGab, dGab, today).substring(6);
            }
        }
    // 달력이 2개 나오는 경우
    } else if(idx.length == 2) {
        if(flag.indexOf("-") > -1) {
            // 시작일
            if(flag.indexOf("Y") > -1) {
                yGab = flag.replaceAll("Y", "");
                mGab = "0";
                if(!isMonth) dGab = "0";
            } else if(flag.indexOf("M") > -1) {
                yGab = "0";
                mGab = flag.replaceAll("M", "");
                if(!isMonth) dGab = "0";
            } else if(flag.indexOf("D") > -1) {
                yGab = "0";
                mGab = "0";
                if(!isMonth) dGab = flag.replaceAll("D", "");
            }

            $("select[id='jex.selectYyyy']")[Number(idx[0])].value = jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4);
            if(!isMonth) {
                jb_YMDreplaceSelectMM($("select[id='jex.selectMm']")[Number(idx[0])], jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4), jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6), jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2], today), jb_getBoundDate(afGab[0], afGab[1], afGab[2]));
            } else {
                jb_MonthreplaceSelectMM($("select[id='jex.selectMm']")[Number(idx[0])], jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4), jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6), jb_getBoundDate(bfGab[0], bfGab[1], 0, today), jb_getBoundDate(afGab[0], afGab[1], 0));
            }

            $("select[id='jex.selectMm']")[Number(idx[0])].value   = jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6);
            if(!isMonth) {
                jb_YMDreplaceSelectDd($("select[id='jex.selectDd']")[Number(idx[0])], jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4), jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6), jb_getBoundDate(yGab, mGab, dGab, today).substring(6), jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2], today), jb_getBoundDate(afGab[0], afGab[1], afGab[2]));

                // 초일로 변경
                if(flag.indexOf("M")>-1 && _PT_WSVC_ID_.indexOf("INQ113011_11")>-1 || _PT_WSVC_ID_.indexOf("INQ113511_10")>-1) {
                	$("select[id='jex.selectDd']")[Number(idx[0])].value   = "01";	
                } else {
                	$("select[id='jex.selectDd']")[Number(idx[0])].value   = jb_getBoundDate(yGab, mGab, dGab, today).substring(6);
                }
            }

            // 종료일
            $("select[id='jex.selectYyyy']")[Number(idx[1])].value = today.substring(0,4);
            $("select[id='jex.selectMm']")[Number(idx[1])].value   = today.substring(4,6);
            $("select[id='jex.selectDd']")[Number(idx[1])].value   = today.substring(6);
            
            if(!isMonth) {
                jb_YMDreplaceSelectMM($("select[id='jex.selectMm']")[Number(idx[1])], today.substring(0,4), today.substring(4,6), jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2], today), jb_getBoundDate(afGab[0], afGab[1], afGab[2]));
            } else {
                jb_MonthreplaceSelectMM($("select[id='jex.selectMm']")[Number(idx[1])], today.substring(0,4), today.substring(4,6), jb_getBoundDate(bfGab[0], bfGab[1], 0, today), jb_getBoundDate(afGab[0], afGab[1], 0));
            }

            if(!isMonth) {
           		jb_YMDreplaceSelectDd($("select[id='jex.selectDd']")[Number(idx[1])], today.substring(0,4), today.substring(4,6), today.substring(6), jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2], today), jb_getBoundDate(afGab[0], afGab[1], afGab[2]));            		
            }
        } else {
            // 시작일
            $("select[id='jex.selectYyyy']")[Number(idx[0])].value = today.substring(0,4);
            $("select[id='jex.selectMm']")[Number(idx[0])].value   = today.substring(4,6);
            $("select[id='jex.selectDd']")[Number(idx[0])].value   = today.substring(6);

            if(!isMonth) {
                jb_YMDreplaceSelectMM($("select[id='jex.selectMm']")[Number(idx[0])], today.substring(0,4), today.substring(4,6), jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2], today), jb_getBoundDate(afGab[0], afGab[1], afGab[2]));
            } else {
                jb_MonthreplaceSelectMM($("select[id='jex.selectMm']")[Number(idx[0])], today.substring(0,4), today.substring(4,6), jb_getBoundDate(bfGab[0], bfGab[1], 0, today), jb_getBoundDate(afGab[0], afGab[1], 0));
            }

            if(!isMonth) {
                jb_YMDreplaceSelectDd($("select[id='jex.selectDd']")[Number(idx[0])], today.substring(0,4), today.substring(4,6), today.substring(6), jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2], today), jb_getBoundDate(afGab[0], afGab[1], afGab[2], today));
            }

            // 종료일
            if(flag.indexOf("Y") > -1) {
                yGab = flag.replaceAll("Y", "");
                mGab = "0";
                if(!isMonth) dGab = "0";
            } else if(flag.indexOf("M") > -1) {
                yGab = "0";
                mGab = flag.replaceAll("M", "");
                if(!isMonth) dGab = "0";
            } else if(flag.indexOf("D") > -1) {
                yGab = "0";
                mGab = "0";
                if(!isMonth) dGab = flag.replaceAll("D", "");
            } else if(flag.indexOf("T") > -1) {
                yGab = "0";
                mGab = "0";
                if(!isMonth) dGab = "0";
            }

            $("select[id='jex.selectYyyy']")[Number(idx[1])].value = jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4);
            if(!isMonth) {
                jb_YMDreplaceSelectMM($("select[id='jex.selectMm']")[Number(idx[1])], jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4), jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6), jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2], today), jb_getBoundDate(afGab[0], afGab[1], afGab[2]));
            } else {
                jb_MonthreplaceSelectMM($("select[id='jex.selectMm']")[Number(idx[1])], jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4), jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6), jb_getBoundDate(bfGab[0], bfGab[1], 0, today), jb_getBoundDate(afGab[0], afGab[1], 0));
            }

            $("select[id='jex.selectMm']")[Number(idx[1])].value   = jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6);
            if(!isMonth) {
                jb_YMDreplaceSelectDd($("select[id='jex.selectDd']")[Number(idx[1])], jb_getBoundDate(yGab, mGab, dGab, today).substring(0,4), jb_getBoundDate(yGab, mGab, dGab, today).substring(4,6), jb_getBoundDate(yGab, mGab, dGab, today).substring(6), jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2], today), jb_getBoundDate(afGab[0], afGab[1], afGab[2]));
                $("select[id='jex.selectDd']")[Number(idx[1])].value   = jb_getBoundDate(yGab, mGab, dGab, today).substring(6);
            }
        }
    }
}
/**
 * 년,월,일 달력 콤보박스를 그려준다.
 * @param yearName
 * @param monthName
 * @param dayName
 * @param Gab
 * @returns {String}
 */
function jb_getSelectYMD(yearName, monthName, dayName, bfGab, afGab) {
	//var today           = _TODAY_;
	var today           = jb_getBoundDate(afGab[0], afGab[1], afGab[2]);
    var currentYyyy     = today.substring(0,4);
    var currentMm       = today.substring(4,6);
    var currentDd       = today.substring(6);

    var optionYyyyHtml  = "";
    var optionMmHtml    = "";
    var optionDdHtml    = "";

    var bfDate          = jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2]); // 조회시작일자
    var bfYyyy          = bfDate.substring(0,4);                         // 조회시작 년
    var bfMm            = bfDate.substring(4,6);                         // 조회시작 월
    var bfDd            = bfDate.substring(6);                           // 조회시작 일

    var afDate          = jb_getBoundDate(afGab[0], afGab[1], afGab[2]); // 조회종료일자
    var afYyyy          = afDate.substring(0,4);                         // 조회종료 년
    var afMm            = afDate.substring(4,6);                         // 조회종료 월
    var afDd            = afDate.substring(6);                           // 조회종료 일

    var inqSYyyy        = "";
    var inqEYyyy        = "";

    var inqSMm          = "";
    var inqEMm          = "";

    var inqSDd          = "";
    var inqEDd          = "";

    var inToday         = false;

    if(Number(bfDate) <= Number(_TODAY_) && Number(afDate) >= Number(_TODAY_)) {
        inToday = true; // 오늘날짜를 포함하고 있는 경우
    }

    // 년 콤보박스 세팅 범위
    inqSYyyy = bfYyyy;
    inqEYyyy = afYyyy;

    // 월 콤보박스 세팅 범위
    if(inToday) {
        if(currentYyyy < afYyyy && currentYyyy > bfYyyy) {
            inqSMm = 1;
            inqEMm = 12;
        } else if(currentYyyy == afYyyy && currentYyyy == bfYyyy) {
            inqSMm = bfMm;
            inqEMm = afMm;
        } else if(currentYyyy == bfYyyy && currentYyyy < afYyyy) {
            inqSMm = bfMm;
            inqEMm = 12;
        } else if(currentYyyy == afYyyy && currentYyyy > bfYyyy) {
            inqSMm = 1;
            inqEMm = afMm;
        }
    } else {
    	//if(Number(bfDate) < Number(_TODAY_) && Number(afDate) < Number(_TODAY_))
    	inqSMm = bfMm;
        //if(bfYyyy == afYyyy) {
            inqEMm = afMm;
        //} else {
            //inqEMm = 12;
        //}
    }

    // 일 콤보박스 세팅 범위
    if(inToday) {
        if(currentYyyy < afYyyy && currentYyyy > bfYyyy) {
            inqSDd = 1;
            inqEDd = jb_getLastDate(currentYyyy, currentMm);
        } else if(currentYyyy == afYyyy && currentYyyy == bfYyyy) {
            if(currentMm < afMm && currentMm > bfMm) {
                inqSDd = 1;
                inqEDd = jb_getLastDate(currentYyyy, currentMm);
            } else if(currentMm == afMm && currentMm == bfMm) {
                inqSDd = 1;
                inqEDd = afDd;
            } else if(currentMm == bfMm && currentMm < afMm) {
                inqSDd = 1;
                inqEDd = jb_getLastDate(currentYyyy, currentMm);
            } else if(currentMm == afMm && currentMm > bfMm) {
                inqSDd = 1;
                inqEDd = afDd;
            }
        } else if(currentYyyy == bfYyyy && currentYyyy < afYyyy) {
            if(currentMm == bfMm) {
                inqSDd = 1;
                inqEDd = jb_getLastDate(currentYyyy, currentMm);
            } else {
                inqSDd = 1;
                inqEDd = jb_getLastDate(currentYyyy, currentMm);
            }
        } else if(currentYyyy == afYyyy && currentYyyy > bfYyyy) {
            if(currentMm == afMm) {
                inqSDd = 1;
                inqEDd = afDd;
            } else {
                inqSDd = 1;
                inqEDd = jb_getLastDate(currentYyyy, currentMm);
            }
        }
    } else {
        inqSDd = 1;
        //if(bfYyyy == afYyyy && bfMm == afMm) {
            inqEDd = afDd;
        //} else {
            //inqEDd = jb_getLastDate(bfYyyy, bfMm);
        //}
    }

    for(var i=inqSYyyy; i<=inqEYyyy; i++) {
        if(/*inToday && */i==currentYyyy) {
            optionYyyyHtml += "<option value='"+i+"' selected>"+i+"</option>";
        } else {
            optionYyyyHtml += "<option value='"+i+"'>"+i+"</option>";
        }
    }
    for(var i=Number(inqSMm); i<=Number(inqEMm); i++) {
        var value = String(i).length==1? "0"+String(i) : i;
        if(/*inToday && */value==currentMm) {
            optionMmHtml += "<option value='"+value+"' selected>"+value+"</option>";
        } else {
            optionMmHtml += "<option value='"+value+"'>"+value+"</option>";
        }
    }
    for(var i=Number(inqSDd); i<=Number(inqEDd); i++) {
        var value = String(i).length==1? "0"+String(i) : i;
        if(/*inToday && */value==currentDd) {
            optionDdHtml += "<option value='"+value+"' selected>"+value+"</option>";
        } else {
            optionDdHtml += "<option value='"+value+"'>"+value+"</option>";
        }
    }

    var func = "";
    if(typeof uf_chgCalendarSelBox == "function") {
    	func = "uf_chgCalendarSelBox(this);";
    }

    return "<select id=\"jex.selectYyyy\" class=\"selbox2 wid60\" name=\""+yearName+"\" onchange=\"jb_changeSelectYMDCanendar(this, '" + bfDate + "', '" + afDate + "');"+func+"\" title=\"년\">"+ optionYyyyHtml+"</select>년&nbsp;" + "<select id=\"jex.selectMm\" class=\"selbox2 wid45\" name=\""+monthName+"\" onchange=\"jb_changeSelectYMDCanendar(this, '" + bfDate + "', '" + afDate + "');"+func+"\" title=\"월\">"+ optionMmHtml+"</select>월&nbsp;" + "<select id=\"jex.selectDd\" class=\"selbox2 wid45\" name=\""+dayName+"\" title=\"일\" onchange=\""+func+"\">"+ optionDdHtml+"</select>일";
}
/**
 * 년,월만 나오는 콤보박스를 그려준다.
 * @param YyyyName
 * @param Mmname
 * @param Gab
 * @returns {String}
 */
function jb_getSelectMonth(YyyyName, Mmname, bfGab, afGab) {
    var value           = "";
    var optionYyyyHtml  = "";
    var optionMmHtml    = "";

    var today           = _TODAY_;
    var currentYyyy     = today.substring(0,4);

    var bfDate          = jb_getBoundDate(bfGab[0], bfGab[1], 0);
    var bfYyyy          = bfDate.substring(0,4);
    var bfMm            = bfDate.substring(4,6);

    var afDate          = jb_getBoundDate(afGab[0], afGab[1], 0);
    var afYyyy          = afDate.substring(0,4);
    var afMm            = afDate.substring(4,6);

    var inqSYyyy        = "";
    var inqEYyyy        = "";
    var inqSMm          = "";
    var inqEMm          = "";

    var inToday         = false;
    if(Number(bfDate.substring(0,6)) <= Number(_TODAY_.substring(0,6)) && Number(afDate.substring(0,6)) >= Number(_TODAY_.substring(0,6))) {
        inToday = true; // 오늘날짜를 포함하고 있는 경우
    }

    // 년도 콤보박스 세팅
    inqSYyyy = bfYyyy;
    inqEYyyy = afYyyy;
    // 월 콤보박스 세팅
    if(inToday) {
        if(currentYyyy < afYyyy && currentYyyy > bfYyyy) {
            inqSMm = 1;
            inqEMm = 12;
        } else if(currentYyyy == afYyyy && currentYyyy == bfYyyy) {
            inqSMm = bfMm;
            inqEMm = afMm;
        } else if(currentYyyy == bfYyyy && currentYyyy < afYyyy) {
            inqSMm = bfMm;
            inqEMm = 12;
        } else if(currentYyyy == afYyyy && currentYyyy > bfYyyy) {
            inqSMm = 1;
            inqEMm = afMm;
        }
    } else {
        inqSMm = bfMm;
        //if(bfYyyy == afYyyy) {
            inqEMm = afMm;
        //} else {
            //inqEMm = 12;
        //}
    }

    for(var i=inqSYyyy; i<=inqEYyyy; i++) {
        if(inToday && i==_TODAY_.substring(0,4)) {
            optionYyyyHtml += "<option value='"+i+"' selected>"+i+"</option>";
        } else {
            optionYyyyHtml += "<option value='"+i+"'>"+i+"</option>";
        }
    }
    for(var i=inqSMm; i<=inqEMm; i++) {
        value = String(i).length==1? "0"+String(i) : i;
        if(inToday && value==_TODAY_.substring(4,6)) {
            optionMmHtml += "<option value='"+value+"' selected>"+value+"</option>";
        } else {
            optionMmHtml += "<option value='"+value+"'>"+value+"</option>";
        }
    }

    return "<select id=\"jex.selectYyyy\" class=\"selbox2 wid60\" name=\""+YyyyName+"\" onchange=\"jb_changeSelectMonthCanendar(this, " + bfDate + ", " + afDate + ");\" title=\"년\">"+ optionYyyyHtml+"</select>년" + "&nbsp;" + "<select id='jex.selectMm' class=\"selbox2 wid45\" name='"+Mmname+"' title='월'>"+ optionMmHtml+"</select>월" + "<select id=\"jex.selectDd\" class=\"selbox2 wid45\" style=\"display:none\" name=\"blank\" title=\"일\"></select>";
}
/**
 * 카드 유효일자
 * @param YyyyName
 * @param Mmname
 * @param bfGab
 * @param afGab
 * @returns {String}
 */
function jb_getSelectCardMonth(YyyyName, Mmname, bfGab, afGab) {
    var value           = "";
    var optionYyyyHtml  = "";
    var optionMmHtml    = "";

    var today           = _TODAY_;
    var currentYyyy     = today.substring(0,4);

    var bfDate          = jb_getBoundDate(bfGab, 0, 0);
    var bfYyyy          = bfDate.substring(0,4);
    var bfMm            = 1;

    var afDate          = jb_getBoundDate(afGab, 0, 0);
    var afYyyy          = afDate.substring(0,4);
    var afMm            = 12;

    var inqSYyyy        = "";
    var inqEYyyy        = "";
    var inqSMm          = "";
    var inqEMm          = "";

    // 년도 콤보박스 세팅
    inqSYyyy = bfYyyy;
    inqEYyyy = afYyyy;
    // 월 콤보박스 세팅
    inqSMm = 1;
    inqEMm = 12;

    for(var i=inqSYyyy; i<=inqEYyyy; i++) {
        if(i == afYyyy) {
            optionYyyyHtml += "<option value='"+i+"' selected>"+i+"</option>";
        } else {
            optionYyyyHtml += "<option value='"+i+"'>"+i+"</option>";
        }
    }
    for(var i=inqSMm; i<=inqEMm; i++) {
        value = String(i).length==1? "0"+String(i) : i;
        if(value==inqEMm) {
            optionMmHtml += "<option value='"+value+"' selected>"+value+"</option>";
        } else {
            optionMmHtml += "<option value='"+value+"'>"+value+"</option>";
        }
    }

    return "<select id='jex.selectMm' class=\"selbox2 wid45\" name='"+Mmname+"' title='월'>"+ optionMmHtml+"</select>월" + "&nbsp;" + "<select id=\"jex.selectYyyy\" class=\"selbox2 wid60\" name=\""+YyyyName+"\" title=\"년\">"+ optionYyyyHtml+"</select>년" + "<select id=\"jex.selectDd\" class=\"selbox2 wid45\" style=\"display:none\" name=\"blank\" title=\"일\"></select>";	
}
/**
 * 년/월/일 셀렉트박스 change 이벤트
 */
function jb_changeSelectYMDCanendar(selector, bfDate, afDate) {
    var selectors = $("select[id='"+ $(selector).attr("id") +"']");
    $.each(selectors, function(i, v) {
        if(this == selector) {
            if($(selector).attr("id") == "jex.selectYyyy") { // 년도가 변경되면 월도 바꿔줌
                var targetSelectMM = $("select[id='jex.selectMm']")[i];
                jb_YMDreplaceSelectMM(targetSelectMM, $($("select[id='jex.selectYyyy']")[i]).val(), $(targetSelectMM).val(), bfDate, afDate);
            }

            var targetSelectBox = $("select[id='jex.selectDd']")[i];
            jb_YMDreplaceSelectDd(targetSelectBox, $($("select[id='jex.selectYyyy']")[i]).val(), $($("select[id='jex.selectMm']")[i]).val(), $(targetSelectBox).val(), bfDate, afDate);
        }
    });
}
/**
 * 년/월 셀렉트박스 change 이벤트
 */
function jb_changeSelectMonthCanendar(selector, bfDate, afDate) {
    var selectors = $("select[id='"+ $(selector).attr("id") +"']");
    $.each(selectors, function(i, v) {
        if(this == selector) {
            if($(selector).attr("id") == "jex.selectYyyy") { // 년도가 변경되면 월도 바꿔줌
                var targetSelectMM = $("select[id='jex.selectMm']")[i];
                jb_MonthreplaceSelectMM(targetSelectMM, $($("select[id='jex.selectYyyy']")[i]).val(), $(targetSelectMM).val(), bfDate, afDate);
            }
        }
    });
}
/**
 * 년/월 셀렉트박스 change 이벤트(년도변경시)
 */
function jb_MonthreplaceSelectMM(selector, year, month, bfDate, afDate) {
    $(selector).children().remove();

    var value    = "";
    var today    = _TODAY_;
    var mm       = today.substring(4,6);
    var cnt      = 0;

    var bfYyyy = String(bfDate).substring(0, 4);
    var bfMm   = String(bfDate).substring(4, 6);
    var afYyyy = String(afDate).substring(0, 4);
    var afMm   = String(afDate).substring(4, 6);

    for(var i=1; i<=12; i++) {
        if(!(year > bfYyyy && year < afYyyy)) {
        	if(year == bfYyyy || year == afYyyy) {
        		if(year == bfYyyy) {
        			if(bfMm > i) continue;
                }
        		if(year == afYyyy) {
        			if(afMm < i) continue;
                }
            }
        }

        value=String(i).length==1?"0"+String(i):i;

        if(value != month) {
            $(selector).append("<option value='"+value+"'>"+value+"</option>");
        } else {
            $(selector).append("<option value='"+value+"' selected='selected'>"+value+"</option>");
            cnt++;
        }
    }

    if(cnt == 0) {
        $(selector).val(mm);
    }
}
/**
 * 년/월/일 셀렉트박스 change 이벤트(년도변경시)
 */
function jb_YMDreplaceSelectMM(selector, year, month, bfDate, afDate) {
    $(selector).children().remove();

    var value    = "";
    var today    = _TODAY_;
    var curMm    = today.substring(4,6);
    var cnt      = 0;
    var bfYyyy   = String(bfDate).substring(0, 4);
    var bfMm     = String(bfDate).substring(4, 6);

    var afYyyy   = String(afDate).substring(0, 4);
    var afMm     = String(afDate).substring(4, 6);

    for(var i=1; i<=12; i++) {
        if(!(year > bfYyyy && year < afYyyy)) {
        	if(year == bfYyyy || year == afYyyy) {
        		if(year == bfYyyy) {
        			if(Number(bfMm) > i) continue;
                }
        		if(year == afYyyy) {
        			if(Number(afMm) < i) continue;
                }
            }
        }

        value = (String(i).length == 1 ? "0"+String(i) : i);

        if(value != month) {
            $(selector).append("<option value='"+value+"'>"+value+"</option>");
        } else {
            $(selector).append("<option value='"+value+"' selected='selected'>"+value+"</option>");
            cnt++;
        }
    }

    if(cnt == 0) {
        $(selector).val(curMm);
    }
}
/**
 * 년/월/일 셀렉트박스 change 이벤트(월 변경시)
 */
function jb_YMDreplaceSelectDd(selector, year, month, day, bfDate, afDate) {
    $(selector).children().remove();

    var lastDate = jb_getLastDate(year, month);
    var value    = "";

    var today    = _TODAY_;
    var curDd    = today.substring(6);
    var cnt      = 0;

    var bfYyyy   = String(bfDate).substring(0, 4);
    var bfMm     = String(bfDate).substring(4, 6);
    var bfDd     = String(bfDate).substring(6);

    var afYyyy   = String(afDate).substring(0, 4);
    var afMm     = String(afDate).substring(4, 6);
    var afDd     = String(afDate).substring(6);

    for(var i=1; i<=lastDate; i++) {
        if(!(year > bfYyyy && year < afYyyy)) {
        	if(year == bfYyyy || year == afYyyy) {
        		if(year == bfYyyy) {
                    if(bfMm == month) {
                        //if(bfDd > i) continue;
                    }
                }
        		if(year == afYyyy) {
                    if(afMm == month) {
                        if(afDd < i) continue;
                    }
                }
            }
        }

        value=String(i).length == 1 ? "0"+String(i) : i;

        if(value != day) {
            $(selector).append("<option value='"+value+"'>"+value+"</option>");
        } else {
            $(selector).append("<option value='"+value+"' selected='selected'>"+value+"</option>");
            cnt++;
        }
    }

    if(cnt == 0) {
        $(selector).val(curDd);
    }
}
/**
 * 콤보에 선택된 날을 가져와서 달력이 그년/월부터 보여줌
 * @param {Object} idx jex.selectYyyyMmDdCalendar의 index
 */
function jb_setCalendarDate(idx) {
    var result = {};

    var selectYyyy = $("select[id='jex.selectYyyy']")[idx];
    var selectMm   = $("select[id='jex.selectMm']")[idx];
    var selectDd   = $("select[id='jex.selectDd']")[idx];

    result.year    = Number($(selectYyyy).val(),10);
    result.mon     = Number($(selectMm).val(),10);
    result.day     = Number($(selectDd).val(),10);

    return result;
}
/**
 * jexCalendar에서 선택된 날을 콤보에 뿌려줌
 * @param {Object} idx jex.selectYyyyMmDdCalendar의 index
 * @param {Object} yyyy 년
 * @param {Object} mm 월
 * @param {Object} dd 일
 */
function jb_setComboCalendar(idx, yyyy, mm, dd) {
	var monthYN    = false;
    if(jb_null2void(dd) == "") monthYN = true;
    var selectYyyy = $("select[id='jex.selectYyyy']")[idx];
    var selectMm   = $("select[id='jex.selectMm']")[idx];
    var selectDd   = $("select[id='jex.selectDd']")[idx];
    var year       = String(yyyy).replaceAll("년", "");
    var month      = String(mm).replaceAll("월", "");
    var day        = monthYN == true ? "" : String(dd).replaceAll("일", "");

    var bfGab      = JSON.parse($(selectYyyy).parent().attr("class")).bfGab.split(",");
    var afGab      = JSON.parse($(selectYyyy).parent().attr("class")).afGab.split(",");
    var afDate     = "";
    var bfDate     = "";

    if(!monthYN) {
        afDate   = jb_getBoundDate(afGab[0], afGab[1], afGab[2]);
        bfDate   = jb_getBoundDate(bfGab[0], bfGab[1], bfGab[2]);
    } else {
        afDate   = jb_getBoundDate(afGab[0], afGab[1], 0);
        bfDate   = jb_getBoundDate(bfGab[0], bfGab[1], 0);
    }

    var minYyyy = bfDate.substring(0,4);
    var minMm   = bfDate.substring(4,6);
    var minDd   = (monthYN == true ? "" : "01");

    var maxYyyy = afDate.substring(0,4);
    var maxMm   = afDate.substring(4,6);
    var maxDd   = monthYN == true ? "" : afDate.substring(6);

    if(!monthYN) {
    	if(Number(year+month+day) < Number(minYyyy+minMm+minDd)) {
            alert(minYyyy+"-"+minMm+"-"+minDd+ " 이후부터 선택하실수 있습니다.");
            return false;
        }
        if(Number(year+month+day) > Number(maxYyyy+maxMm+maxDd)) {
            alert(maxYyyy+"-"+maxMm+"-"+maxDd+ " 까지만 선택하실수 있습니다.");
            return false;
        }        
    } else {
    	if(Number(year+month) < Number(minYyyy+minMm)) {
            alert(minYyyy+"-"+minMm+" 이후부터 선택하실수 있습니다.");
            return false;
        }
        if(Number(year+month) > Number(maxYyyy+maxMm)) {
            alert(maxYyyy+"-"+maxMm+" 까지 선택하실수 있습니다.");
            return false;
        }
    }

    $(selectYyyy).val(year);
    if(!monthYN) {
        jb_YMDreplaceSelectMM(selectMm, year, month, bfDate, afDate);
    } else {
        jb_MonthreplaceSelectMM(selectMm, year, month, bfDate, afDate);
    }
    $(selectMm).val(month);

    if(!monthYN) {
        jb_YMDreplaceSelectDd(selectDd, year, month, day, bfDate, afDate);
        $(selectDd).val(day);
    }
    
    if(typeof uf_chgCalendarImg == "function") {
    	uf_chgCalendarImg();
    }
    
    $("#jexCalendar"+idx).focus();
}
/**
 * 달력 날짜콤보박스 value 세팅시
 * @param index
 * @param ymd
 * @param bfGab
 * @param afGab
 * @example jb_changeDate(0, "20120101", "0,-3,0", "0,0,0");
 */
function jb_changeDate(index, ymd, bfGab, afGab) {
	var bfDate = "";
	var afDate = "";
	var isMonth = false;
	if(ymd.length == 6) {
		isMonth = true;
		bfDate = jb_getBoundDate(bfGab.split(",")[0], bfGab.split(",")[1], 0);
		afDate = jb_getBoundDate(afGab.split(",")[0], afGab.split(",")[1], 0);
	} else {
		bfDate = jb_getBoundDate(bfGab.split(",")[0], bfGab.split(",")[1], bfGab.split(",")[2]);
		afDate = jb_getBoundDate(afGab.split(",")[0], afGab.split(",")[1], afGab.split(",")[2]);
	}

	$("select[id='jex.selectYyyy']")[Number(index)].value = ymd.substring(0,4);
    if(!isMonth) {
        jb_YMDreplaceSelectMM($("select[id='jex.selectMm']")[Number(index)], ymd.substring(0,4), ymd.substring(4,6), bfDate, afDate);
    } else {
        jb_MonthreplaceSelectMM($("select[id='jex.selectMm']")[Number(index)], ymd.substring(0,4), ymd.substring(4,6), bfDate, afDate);
    }

    $("select[id='jex.selectMm']")[Number(index)].value   = ymd.substring(4,6);
    if(!isMonth) {
        jb_YMDreplaceSelectDd($("select[id='jex.selectDd']")[Number(index)], ymd.substring(0,4), ymd.substring(4,6), ymd.substring(6), bfDate, afDate);
        $("select[id='jex.selectDd']")[Number(index)].value   = ymd.substring(6);
    }
}