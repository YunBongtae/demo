jQuery.fn.extend({
    /**
     * 알고리즘은 http://blog.naver.com/bohe76?Redirect=Log&logNo=5588545 다음을 참조 하였음
     */
    jexCalendar: function(cmd, opt) {
        var $r = $(this);

        var getMonLen    = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var getWeek        = ["일","월","화","수","목","금","토"];
        var baseDt        = {year:0000, mon:1, dt:1, week:5};    // 기준일자 0000월 1월 1일은 토요일 이었음. (기준일을 변경하면 정상 작동하지 않을수 있음.--로직변경이 필요)

        $r.attr("jexType","Calendar");

        var htmlCode = 
        "<div id='_jex_calendar' style='display:none;position:relative;z-index:20000'>"+
	        "<div id='layer_calendar' class='layerType calendarLayer'>"+
		        "<div class='box'>"+
		            "<div class='calMove'>"+
		        		"<div class='period month'>"+
		        			"<button id='prev_mon' onkeydown='jb_calendar_prev_btn(this,event);' class='month_prev' type='button'><a href='#jbbank'>이전 월</a></button>"+
		        			"<strong class='font_year'></strong>"+
		        			"<strong class='font_month'></strong>"+
		        			"<button id='next_mon' onkeydown='jb_calendar_next_btn(this,event);' class='month_next' type='button'><a href='#jbbank'>이후 월</a></button>"+
		        		"</div>"+
		        	"</div>"+
		            "<table id='dayList' class='calendarSmall' summary='달력'>"+
		                "<caption>달력</caption>"+
		                "<colgroup>"+
		                    "<col width='15%' /><col width='14%' /><col width='14%' /><col width='14%' /><col width='14%' /><col width='14%' /><col width='15%' />"+
		                "</colgroup>"+
		                "<thead>"+
		                    "<tr>"+
		                        "<th class='sun' scope='col'>일</th>"+
		                        "<th scope='col'>월</th>"+
		                        "<th scope='col'>화</th>"+
		                        "<th scope='col'>수</th>"+
		                        "<th scope='col'>목</th>"+
		                        "<th scope='col'>금</th>"+
		                        "<th class='sat' scope='col'>토</th>"+
		                    "</tr>"+
		                "</thead>"+
		                "<tbody>"+
		                "</tbody>"+
		            "</table>"+
		        "</div>"+
		        "<p class='layerClose day'><a id='closeBtn' onkeydown='jb_calendar_close_btn(this,event);' href='#jbbank'>닫기</a></p>"+
		    "</div>"+
		    "<div class='layerType calendarLayer' id='layer_calendar_mon' style='display:none;position:absolute;top:0px;left:0px'>"+
		        "<div class='calMove'>"+
		    		"<div class='period year'>"+
		    			"<button id='prev_year' class='year_prev' onkeydown='jb_calendar_prev_btn(this,event);' type='button'><a href='#jbbank'>이전 년</a></button>"+
		    			"<strong class='font_year'></strong>"+
		    			"<button id='next_year' class='year_next' onkeydown='jb_calendar_next_btn(this,event);' type='button'><a href='#jbbank'>이후 년</a></button>"+
		    		"</div>"+
		    	"</div>"+
		        "<ul class='calYearMonth'>"+
		        	"<li><a href='#jbbank'>1월</a></li>"+
		        	"<li><a href='#jbbank'>2월</a></li>"+
		        	"<li><a href='#jbbank'>3월</a></li>"+
		        	"<li><a href='#jbbank'>4월</a></li>"+
		        	"<li><a href='#jbbank'>5월</a></li>"+
		        	"<li><a href='#jbbank'>6월</a></li>"+
		        	"<li><a href='#jbbank'>7월</a></li>"+
		        	"<li><a href='#jbbank'>8월</a></li>"+
		        	"<li><a href='#jbbank'>9월</a></li>"+
		        	"<li><a href='#jbbank'>10월</a></li>"+
		        	"<li><a href='#jbbank'>11월</a></li>"+
		        	"<li><a href='#jbbank'>12월</a></li>"+
		    	"</ul>"+
		    	"<p class='layerClose mon'><a href='#jbbank' onkeydown='jb_calendar_close_btn(this,event);' id='closeBtn'>닫기</a></p>"+
		    "</div><!--END: 캘린더 레이어 -->"+
		    "<div class='layerType calendarLayer' id='layer_calendar_year' style='display:none;position:absolute;top:0px;left:0px'>"+
		        "<div class='calMove'>"+
		    		"<div class='period years'>"+
		    			"<button id='prev_year_list' class='year_prev' onkeydown='jb_calendar_prev_btn(this,event);' type='button'><a href='#jbbank'>이전 년</a></button>"+
		    			"<strong class='font_year'></strong>"+
		    			"<button id='next_year_list' class='year_next' onkeydown='jb_calendar_next_btn(this,event);' type='button'><a href='#jbbank'>이후 년</a></button>"+
		    		"</div>"+
		    	"</div>"+
		    	"<ul class='calYearMonth'>"+
		    	"</ul>"+
		    	"<p class='layerClose year'><a href='#jbbank' onkeydown='jb_calendar_close_btn(this,event);' id='closeBtn'>닫기</a></p>"+
		    "</div><!--END: 캘린더 레이어 -->"+
        "</div>";

        var jexCalFn={
            show:function(opt) {
                jexCalFn['drawCalendar'](opt);
                var x = $r.offset().left;
                var y = $r.offset().top+$r.height()+3;
    
                if (parseInt($("#_jex_calendar").width(),10)+parseInt(x,10) >parseInt($(window.document).width(),10)) {
                    var tmpX = parseInt($(window.document).width(),10) - (parseInt($("#_jex_calendar").width(),10)+parseInt(x,10));
                    if (tmpX > 0)     x = tmpX;
                    else                x = 0;
                }
    
                $("#_jex_calendar").css("left", x+"px");
                $("#_jex_calendar").css("top",  y+"px");
    
                //$("#_jex_calendar").fadeIn("slow");
                $("#_jex_calendar").show();
                if($("#layer_calendar").css("display") != "none") {
                	$("#layer_calendar").find("#prev_mon").focus();
                }
                if($("#layer_calendar_mon").css("display") != "none") {
                	$("#layer_calendar_mon").find("#prev_year").focus();
                }
                if($("#layer_calendar_year").css("display") != "none") {
                	$("#layer_calendar_year").find("#prev_year_list").focus();
                }
            },
            setIsSetFn:function(opt) {
                $r.data("isSet", opt);
            },
            getIsSetFn:function(opt) {
                var fn = $r.data("isSet");
                if (fn==undefined) {
                    fn = function(yyyy,mm,dd) {
                        return $.trim($r.val())!=""||$.trim($r.html())!="";
                    };
                }
                return fn;
            },
            setTrxFn:function(opt) {
                $r.data("setFn", opt);
            },
            getTrxFn:function(opt) {
                var fn = $r.data("setFn");
                if (fn==undefined) {
                    fn = function(yyyy,mm,dd) {jb_setComboCalendar(cmd, yyyy, mm, dd);};
                }
                return fn;
            },
            setInputFn:function(opt) {
                $r.data("inputFn", opt);
            },
            getInputFn:function(opt) {
                var fn    = $r.data("inputFn");
                var rslt= {};
                if (fn==undefined) {
                    fn = function() {return jb_setCalendarDate(cmd);};
                }
                return fn;
            },
            hide:function(opt) {
                //$("#_jex_calendar").fadeOut("slow");
            	$("#_jex_calendar").hide();
            },
            getDate         :function(opt) {
                return $(this).val().replace(/-/g, "");
            },
            beforeDate     :function(opt) {
                var result = {};
                if(opt.mon==1) {
                    result.year = opt.year - 1;
                    result.mon  = 12;
                } else {
                    result.year = opt.year;
                    result.mon  = opt.mon -1;
                }
                return result;
            },
            nextDate      :function(opt) {
                var result = {};
                if(opt.mon==12) {
                    result.year = opt.year + 1;
                    result.mon  = 1;
                } else {
                    result.year = opt.year;
                    result.mon  = opt.mon+1;
                }
                return result;
            },
            getToday     :function(opt) {
                var result  = {};
                var oDate   = new Date();
                var dYear   = oDate.getFullYear();
                var dMon    = oDate.getMonth()+1;
                var dDay    = oDate.getDate    ();

                result.year = dYear;
                result.mon  = dMon;
                result.day  = dDay;

                return result;
            },
            drawCalendar :function(opt) {
                var today = jexCalFn['getToday']();

                if ($("#_jex_calendar").length == 0) {
                    $(document.body).append(htmlCode);
                    $("#_jex_calendar").css("position", "absolute");
                    $("#_jex_calendar").css("left"    , 10+"px");
                    $("#_jex_calendar").css("top"     , 10+"px");
                }

                $("#_jex_calendar").find("#layer_calendar").find("#closeBtn").unbind('click');
                $("#_jex_calendar").find("#layer_calendar").find("#closeBtn").click(function() {
                    $("#_jex_calendar").hide();

                    if($("#layer_calendar").css("display") != "none") {
                    	$("#layer_calendar").find("#prev_mon").focus();
                    }
                    if($("#layer_calendar_mon").css("display") != "none") {
                    	$("#layer_calendar_mon").find("#prev_year").focus();
                    }
                    if($("#layer_calendar_year").css("display") != "none") {
                    	$("#layer_calendar_year").find("#prev_year_list").focus();
                    }
                });

                $("#_jex_calendar").find("#layer_calendar_mon").find("#closeBtn").unbind('click');
                $("#_jex_calendar").find("#layer_calendar_mon").find("#closeBtn").click(function() {
                    $("#_jex_calendar").find("#layer_calendar_mon").hide();
                    $("#_jex_calendar").find("#layer_calendar").show();
                    
                    if($("#layer_calendar").css("display") != "none") {
                    	$("#layer_calendar").find("#prev_mon").focus();
                    }
                    if($("#layer_calendar_mon").css("display") != "none") {
                    	$("#layer_calendar_mon").find("#prev_year").focus();
                    }
                    if($("#layer_calendar_year").css("display") != "none") {
                    	$("#layer_calendar_year").find("#prev_year_list").focus();
                    }
                });

                $("#_jex_calendar").find("#layer_calendar_year").find("#closeBtn").unbind('click');
                $("#_jex_calendar").find("#layer_calendar_year").find("#closeBtn").click(function() {
                    $("#_jex_calendar").find("#layer_calendar_year").hide();
                    $("#_jex_calendar").find("#"+$("#_jex_calendar").find("#layer_calendar_year").data("target")).show();
                    
                    if($("#layer_calendar").css("display") != "none") {
                    	$("#layer_calendar").find("#prev_mon").focus();
                    }
                    if($("#layer_calendar_mon").css("display") != "none") {
                    	$("#layer_calendar_mon").find("#prev_year").focus();
                    }
                    if($("#layer_calendar_year").css("display") != "none") {
                    	$("#layer_calendar_year").find("#prev_year_list").focus();
                    }
                });

                $("#_jex_calendar").find("#goToday").unbind('click');
                $("#_jex_calendar").find("#goToday").click(function() {
                    jexCalFn['drawCalendar']({year:today.year, mon:today.mon, day:today.day});
                });

                $("#_jex_calendar").find("#layer_calendar").find("#prev_mon").unbind('click');
                $("#_jex_calendar").find("#layer_calendar").find("#prev_mon").click(function() {
                    var beforeDate = jexCalFn['beforeDate']($r.data("opt"));
                    jexCalFn['drawCalendar']({year:beforeDate.year, mon:beforeDate.mon,day:-1});
                });

                $("#_jex_calendar").find("#layer_calendar").find("#next_mon").unbind('click');
                $("#_jex_calendar").find("#layer_calendar").find("#next_mon").click(function() {
                    var nextDate = jexCalFn['nextDate']($r.data("opt"));
                    jexCalFn['drawCalendar']({year:nextDate.year, mon:nextDate.mon,day:-1});
                });

                $("#_jex_calendar").find("#layer_calendar").find("#open_year").unbind('click');
                $("#_jex_calendar").find("#layer_calendar").find("#open_year").click(function() {
                    $("#_jex_calendar").find("#layer_calendar" ).hide();
                    $("#_jex_calendar").find("#layer_calendar_year").show();
                    
                    if($("#layer_calendar").css("display") != "none") {
                    	$("#layer_calendar").find("#prev_mon").focus();
                    }
                    if($("#layer_calendar_mon").css("display") != "none") {
                    	$("#layer_calendar_mon").find("#prev_year").focus();
                    }
                    if($("#layer_calendar_year").css("display") != "none") {
                    	$("#layer_calendar_year").find("#prev_year_list").focus();
                    }

                    $("#_jex_calendar").find("#layer_calendar_year").data("target", "layer_calendar");
                    setYearTbl(parseInt($("#_jex_calendar").find("#layer_calendar").find(".font_year").html(),10));
                });

                $("#_jex_calendar").find("#layer_calendar").find(".font_month").unbind('click');
                $("#_jex_calendar").find("#layer_calendar").find(".font_month").click(function() {
                    $("#_jex_calendar").find("#layer_calendar").hide();
                    $("#_jex_calendar").find("#layer_calendar_mon").show();
                    
                    if($("#layer_calendar").css("display") != "none") {
                    	$("#layer_calendar").find("#prev_mon").focus();
                    }
                    if($("#layer_calendar_mon").css("display") != "none") {
                    	$("#layer_calendar_mon").find("#prev_year").focus();
                    }
                    if($("#layer_calendar_year").css("display") != "none") {
                    	$("#layer_calendar_year").find("#prev_year_list").focus();
                    }

                    $("#_jex_calendar").find("#layer_calendar_mon").find(".font_year").html("<a href='#jbbank' class='point_cerablue'>" + $("#_jex_calendar").find("#layer_calendar").find(".font_year").html() + "</a>");
                });

                $("#_jex_calendar").find("#layer_calendar_mon").find("#prev_year").unbind('click');
                $("#_jex_calendar").find("#layer_calendar_mon").find("#prev_year").click(function() {
                	var yyyy = $("#_jex_calendar").find("#layer_calendar_mon").find(".font_year").html();
                	yyyy = yyyy.substring(yyyy.indexOf(">")+1, yyyy.lastIndexOf("</")).replaceAll("년", "");
                	yyyy = parseInt(yyyy, 10)-1;
                    $("#_jex_calendar").find("#layer_calendar_mon").find(".font_year").html("<a href='#jbbank' class='point_cerablue'>" + yyyy + "년" + "</a>");
                });

                $("#_jex_calendar").find("#layer_calendar_mon").find("#next_year").unbind('click');
                $("#_jex_calendar").find("#layer_calendar_mon").find("#next_year").click(function() {
                	var yyyy = $("#_jex_calendar").find("#layer_calendar_mon").find(".font_year").html();
                	yyyy = yyyy.substring(yyyy.indexOf(">")+1, yyyy.lastIndexOf("</")).replaceAll("년", "");
                	yyyy = parseInt(yyyy, 10)+1;
                    $("#_jex_calendar").find("#layer_calendar_mon").find(".font_year").html("<a href='#jbbank' class='point_cerablue'>" + yyyy + "년" + "</a>");
                });

                $("#_jex_calendar").find("#layer_calendar_mon").find(".font_year").unbind('click');
                $("#_jex_calendar").find("#layer_calendar_mon").find(".font_year").click(function() {
                    $("#_jex_calendar").find("#layer_calendar_mon" ).hide();
                    $("#_jex_calendar").find("#layer_calendar_year").show();
                    
                    if($("#layer_calendar").css("display") != "none") {
                    	$("#layer_calendar").find("#prev_mon").focus();
                    }
                    if($("#layer_calendar_mon").css("display") != "none") {
                    	$("#layer_calendar_mon").find("#prev_year").focus();
                    }
                    if($("#layer_calendar_year").css("display") != "none") {
                    	$("#layer_calendar_year").find("#prev_year_list").focus();
                    }

                    $("#_jex_calendar").find("#layer_calendar_year").data("target", "layer_calendar_mon");

                    var yyyy = $("#_jex_calendar").find("#layer_calendar_mon").find(".font_year").html();
                    yyyy = yyyy.substring(yyyy.indexOf(">")+1, yyyy.lastIndexOf("</"));
                    setYearTbl(yyyy);
                    return false;
                });

                $("#_jex_calendar").find("#layer_calendar_year").find("#prev_year_list").unbind('click');
                $("#_jex_calendar").find("#layer_calendar_year").find("#prev_year_list").click(function() {
                    setYearTbl(parseInt($("#_jex_calendar").find("#layer_calendar_year").data("nYear"),10)-10);
                });

                $("#_jex_calendar").find("#layer_calendar_year").find("#next_year_list").unbind('click');
                $("#_jex_calendar").find("#layer_calendar_year").find("#next_year_list").click(function() {
                    setYearTbl(parseInt($("#_jex_calendar").find("#layer_calendar_year").data("nYear"),10)+10);
                });

                $("#_jex_calendar").find("#layer_calendar_mon").find("ul").find("li").unbind('click');
                $("#_jex_calendar").find("#layer_calendar_mon").find("ul").find("li").click(function() {
                	var yyyy = $("#_jex_calendar").find("#layer_calendar_mon").find(".font_year").html();
                	yyyy = yyyy.substring(yyyy.indexOf(">")+1, yyyy.lastIndexOf("</"));
                    $("#_jex_calendar").find("#layer_calendar").find(".font_month").html($(this).find("a").html());
                    $("#_jex_calendar").find("#layer_calendar_mon").find("#closeBtn").click();
                    jexCalFn['drawCalendar']({year:parseInt(yyyy), mon:parseInt($(this).find("a").html(),10),day:-1});
                    return false;
                });

                function setYearTbl(year) {
                    year = parseInt(year);
                    var strYear = parseInt(parseInt(year,10)/10)*10-1;
                    var endYear = parseInt(parseInt(year,10)/10)*10+10;

                    var titStr = strYear + "년~" + endYear+"년";

                    $("#_jex_calendar").find("#layer_calendar_year").data("nYear",year);

                    $("#_jex_calendar").find("#layer_calendar_year").find(".font_year").html(titStr);

                    $("#_jex_calendar").find("#layer_calendar_year").find("ul").find("li").remove();

                    var tr = $("<li></li>");

                    var insYear = strYear;

                    for (var i=0; i<12; i++) {
                    	var td = $("<a href='#jbbank'>" + (insYear+i) + "년</a>");

                        td.clone().appendTo(tr);
                        tr.clone().appendTo($("#_jex_calendar").find("#layer_calendar_year").find("ul"));
                        tr = $("<li></li>");

                        if(year == (insYear+i)) td.attr("class", "today");
                    }

                    $("#_jex_calendar").find("#layer_calendar_year").find("ul").find("li").find("a").unbind('click');
                    $("#_jex_calendar").find("#layer_calendar_year").find("ul").find("li").find("a").click(function() {
                        $("#_jex_calendar").find("#"+$("#_jex_calendar").find("#layer_calendar_year").data("target")).find(".font_year").html("<a href='#' class='point_cerablue'>" + $(this).html() + "</a>");
                        $("#_jex_calendar").find("#layer_calendar_year").find("#closeBtn").click();

                        if ($("#_jex_calendar").find("#layer_calendar_year").data("target")=="layer_calendar") {
                            var y = parseInt($("#_jex_calendar").find("#"+$("#_jex_calendar").find("#layer_calendar_year").data("target")).find(".font_year").html(),10);
                            var m = parseInt($("#_jex_calendar").find("#"+$("#_jex_calendar").find("#layer_calendar_year").data("target")).find(".font_month").html(),10);
                            jexCalFn['drawCalendar']({year:y, mon:m,day:-1});
                        }
                        return false;
                    });
                }

                if (opt==null || opt==undefined || opt.year==undefined) opt = jexCalFn['getToday']();

                $r.data("opt",opt);

                $("#_jex_calendar").find("#layer_calendar").find(".font_year").html(opt.year+"년");
                $("#_jex_calendar").find("#layer_calendar").find(".font_month").html("<a href='#jbbank' class='point_cerablue'>" + opt.mon+"월" + "</a>");
                $("#_jex_calendar").find("#layer_calendar").find("table").find("tbody").find("tr").remove();

                var fDt = jexCalFn['getFirstDay'  ]({year:opt.year,mon:opt.mon});
                var eDt = jexCalFn['getMonEndDate']({year:opt.year,mon:opt.mon});

                var tr = $("<tr></tr>");
                var dd = 0;    // 일자를 보관
                var cw = 0;    // 요일을 보관

                var cs = 5*7;                   // 1달이 5주
                if (fDt+eDt >= cs) cs = 6*7;    // 1달이 6주

                for (var i=0; i<cs; i++) {
                    var td = $("<td><a href=\'#jbbank\'>&nbsp;</a></td>");
                    if (cw==0) td.attr("class", "sun");
                    if (cw==6) td.attr("class", "sat");
                    if (i>=fDt) dd++;
                    if (dd<=0 || dd>eDt) td.attr("class", "none");
                    if (dd>0 && dd<=eDt) td.find("a").html(dd);
                    if (opt.day==dd) td.attr("class", "selday");
                    if (today.year==opt.year&&today.mon==opt.mon&&today.day==dd) td.attr("class", "today");

                    tr.append(td);
                    if (cw==6) {
                        tr.clone(true).appendTo($("#_jex_calendar").find("#layer_calendar").find("table").find("tbody"));
                        tr = $("<tr></tr>");
                        cw=0;
                        continue;
                    }
                    cw++;
                }
                $("#_jex_calendar").find("#layer_calendar").find("table").find("tbody").find("tr").find("td").unbind('click');
                $("#_jex_calendar").find("#layer_calendar").find("table").find("tbody").find("tr").find("td").click(function() {
                    if (isNaN($(this).find("a").html())) return;

                    var yyyy = $("#_jex_calendar").find("#layer_calendar").find(".font_year").html();
                    var mmm = $("#_jex_calendar").find("#layer_calendar").find(".font_month").html();
                    mmm = mmm.substring(mmm.indexOf(">")+1, mmm.lastIndexOf("</"));
                    mmm  = (parseInt(mmm,10)<10) ? "0" + mmm : mmm;
                    var ddd  = (parseInt($(this).find("a").html(),10) < 10) ? "0"+$(this).find("a").html() : $(this).find("a").html();
                    
                    jexCalFn['getTrxFn']()(yyyy, mmm, ddd);
                    jexCalFn['hide']();
                    return false;
                });
            },
            getMonEndDate:function(opt) {
                if (opt.mon==2&&(opt.year%4==0 && (opt.year%100!=0||opt.year%400==0)))    return 29;
                else                                                                      return getMonLen[opt.mon-1];
            },
            getFirstDay:function(opt) {
                var yearlen       = opt.year - baseDt.year;
                var yun_yearlen = parseInt((opt.year-1)/4,10) - parseInt((opt.year-1)/100,10) + parseInt((opt.year-1)/400,10);
                var dt_cnt        = yearlen + yun_yearlen + 1;

                for (var i=0; i<opt.mon-1; i++) { dt_cnt = dt_cnt+jexCalFn['getMonEndDate']({"year":opt.year, "mon":i+1}); }
                var week          = (baseDt.week+dt_cnt+1)%7;

                return week;
            }
        };
        $r.click(function() {
            opt = jexCalFn['getInputFn']()();
            jexCalFn['show'](opt);
        });
        if (cmd==undefined || cmd=="make" || jb_isNum(cmd)) {
            if (!jexCalFn['getIsSetFn']()()) {
                var today      = jexCalFn['getToday']();
                var mmm        = (parseInt(today.mon,10)<10)?"0"+today.mon:today.mon;
                var ddd        = (parseInt(today.day,10 )<10)?"0"+today.day:today.day;
                var fn         = jexCalFn['getTrxFn']();
                fn(today.year, mmm, ddd);
            }
            return;
        }

        return jexCalFn[cmd](opt);
    }, jexCalendarMon : function(cmd, opt) {
        var $r = $(this);

        var getMonLen    = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var getWeek        = ["일","월","화","수","목","금","토"];
        var baseDt        = {year:0000, mon:1, dt:1, week:5};    // 기준일자 0000월 1월 1일은 토요일 이었음. (기준일을 변경하면 정상 작동하지 않을수 있음.--로직변경이 필요)

        $r.attr("jexType","Calendar");

        var htmlCode = 
        "<div id='_jex_calendar_mon' style='display:none;position:relative;z-index:20000'>"+
	        "<div class='layerType calendarLayer' id='layer_calendar_mon'>"+
		        "<div class='calMove'>"+
		    		"<div class='period year'>"+
		    			"<button id='prev_year' class='year_prev' type='button'>이전 년</button>"+
		    			"<strong class='font_year'></strong>"+
		    			"<button id='next_year' class='year_next' type='button'>이후 년</button>"+
		    		"</div>"+
		    	"</div>"+
		        "<ul class='calYearMonth'>"+
		        	"<li><a href='#jbbank'>1월</a></li>"+
		        	"<li><a href='#jbbank'>2월</a></li>"+
		        	"<li><a href='#jbbank'>3월</a></li>"+
		        	"<li><a href='#jbbank'>4월</a></li>"+
		        	"<li><a href='#jbbank'>5월</a></li>"+
		        	"<li><a href='#jbbank'>6월</a></li>"+
		        	"<li><a href='#jbbank'>7월</a></li>"+
		        	"<li><a href='#jbbank'>8월</a></li>"+
		        	"<li><a href='#jbbank'>9월</a></li>"+
		        	"<li><a href='#jbbank'>10월</a></li>"+
		        	"<li><a href='#jbbank'>11월</a></li>"+
		        	"<li><a href='#jbbank'>12월</a></li>"+
		    	"</ul>"+
		    	"<p class='layerClose'><a href='#jbbank' id='closeBtn'>닫기</a></p>"+
		    "</div><!--END: 캘린더 레이어 -->"+

		    "<div class='layerType calendarLayer' id='layer_calendar_year' style='display:none;position:absolute;top:0px;left:0px'>"+
			    "<div class='calMove'>"+
					"<div class='period years'>"+
						"<button id='prev_year_list' class='year_prev' type='button'>이전 년</button>"+
						"<strong class='font_year'></strong>"+
						"<button id='next_year_list' class='year_next' type='button'>이후 년</button>"+
					"</div>"+
				"</div>"+
				"<ul class='calYearMonth'>"+
				"</ul>"+
				"<p class='layerClose'><a href='#jbbank' id='closeBtn'>닫기</a></p>"+
			"</div><!--END: 캘린더 레이어 -->"+
        "</div>";

        var jexCalFn={
            show:function(opt) {
                jexCalFn['drawCalendar'](opt);
                var x = $r.offset().left;
                var y = $r.offset().top+$r.height()+3;

                if (parseInt($("#_jex_calendar_mon").width(),10)+parseInt(x,10) > parseInt($(window.document).width(),10)) {
                    var tmpX = parseInt($(window.document).width(),10) - (parseInt($("#_jex_calendar_mon").width(),10)+parseInt(x,10));
                    if (tmpX > 0)     x = tmpX;
                    else              x = 0;
                }

                $("#_jex_calendar_mon").css("left", x+"px");
                $("#_jex_calendar_mon").css("top",  y+"px");
                //$("#_jex_calendar_mon").fadeIn("slow");
                $("#_jex_calendar_mon").show();
            },
            setIsSetFn:function(opt) {
                $r.data("isSet", opt);
            },
            getIsSetFn:function(opt) {
                var fn = $r.data("isSet");
                if (fn==undefined) {
                    fn = function(yyyy,mm) {
                        return $.trim($r.val())!=""||$.trim($r.html())!="";
                    };
                }
                return fn;
            },
            setTrxFn:function(opt) {
                $r.data("setFn", opt);
            },
            getTrxFn:function(opt) {
                var fn = $r.data("setFn");
                if (fn==undefined) {
                    fn = function(yyyy,mm) {jb_setComboCalendar(cmd, yyyy, mm);};
                }
                return fn;
            },
            setInputFn:function(opt) {
                $r.data("inputFn", opt);
            },
            getInputFn:function(opt) {
                var fn    = $r.data("inputFn");
                var rslt= {};
                if (fn==undefined) {
                    fn = function() {return jb_setCalendarDate(cmd);};
                }
                return fn;
            },
            hide:function(opt) {
                //$("#_jex_calendar_mon").fadeOut("slow");
            	$("#_jex_calendar_mon").hide();
            },
            getDate         :function(opt) {
                return $(this).val().replace(/-/g, "");
            },
            beforeDate     :function(opt) {
                var result = {};
                if(opt.mon==1) {
                    result.year = opt.year - 1;
                    result.mon  = 12;
                } else {
                    result.year = opt.year;
                    result.mon  = opt.mon -1;
                }
                return result;
            },
            nextDate      :function(opt) {
                var result = {};
                if(opt.mon==12) {
                    result.year = opt.year + 1;
                    result.mon  = 1;
                } else {
                    result.year = opt.year;
                    result.mon  = opt.mon+1;
                }
                return result;
            },
            getToday     :function(opt) {
                var result    = {};
                var oDate    = new Date();
                var dYear    = oDate.getFullYear();
                var dMon    = oDate.getMonth()+1;

                result.year = dYear;
                result.mon  = dMon;

                return result;
            },
            drawCalendar :function(opt) {
                var today = jexCalFn['getToday']();

                if ($("#_jex_calendar_mon").length == 0) {
                    $(document.body).append(htmlCode);
                    $("#_jex_calendar_mon").css("position", "absolute");
                    $("#_jex_calendar_mon").css("left",     10+"px");
                    $("#_jex_calendar_mon").css("top",      10+"px");
                }

                $("#_jex_calendar_mon").find("#layer_calendar_mon").find("#closeBtn").unbind('click');
                $("#_jex_calendar_mon").find("#layer_calendar_mon").find("#closeBtn").click(function() {
                    //$("#_jex_calendar_mon").fadeOut("slow");
                    $("#_jex_calendar_mon").hide();
                });

                $("#_jex_calendar_mon").find("#layer_calendar_year").find("#closeBtn").unbind('click');
                $("#_jex_calendar_mon").find("#layer_calendar_year").find("#closeBtn").click(function() {
                    $("#_jex_calendar_mon").find("#layer_calendar_year").hide();
                    $("#_jex_calendar_mon").find("#"+ $("#_jex_calendar_mon").find("#layer_calendar_year").data("target")).show();
                });

                $("#_jex_calendar_mon").find("#goToday").unbind('click');
                $("#_jex_calendar_mon").find("#goToday").click(function() {
                    jexCalFn['drawCalendar']({year:today.year, mon:today.mon});
                });

                $("#_jex_calendar_mon").find("#layer_calendar_mon").find("#prev_year").unbind('click');
                $("#_jex_calendar_mon").find("#layer_calendar_mon").find("#prev_year").click(function() {
                	var yyyy = $("#_jex_calendar_mon").find("#layer_calendar_mon").find(".font_year").html();
                	yyyy = yyyy.substring(yyyy.indexOf(">")+1, yyyy.lastIndexOf("</")).replaceAll("년", "");
                	yyyy = parseInt(yyyy, 10)-1;

                	$("#_jex_calendar_mon").find("#layer_calendar_mon").find(".font_year").html("<a href='#' class='point_cerablue'>" + yyyy + "년" + "</a>");
                });

                $("#_jex_calendar_mon").find("#layer_calendar_mon").find("#next_year").unbind('click');
                $("#_jex_calendar_mon").find("#layer_calendar_mon").find("#next_year").click(function() {
                    var yyyy = $("#_jex_calendar_mon").find("#layer_calendar_mon").find(".font_year").html();
                	yyyy = yyyy.substring(yyyy.indexOf(">")+1, yyyy.lastIndexOf("</")).replaceAll("년", "");
                	yyyy = parseInt(yyyy, 10)+1;
                	
                    $("#_jex_calendar_mon").find("#layer_calendar_mon").find(".font_year").html("<a href='#' class='point_cerablue'>" + yyyy + "년" + "</a>");
                });

                $("#_jex_calendar_mon").find("#layer_calendar_mon").find(".font_year").unbind('click');
                $("#_jex_calendar_mon").find("#layer_calendar_mon").find(".font_year").click(function() {
                    $("#_jex_calendar_mon").find("#layer_calendar_mon" ).hide();
                    $("#_jex_calendar_mon").find("#layer_calendar_year").show();
                    $("#_jex_calendar_mon").find("#layer_calendar_year").data("target", "layer_calendar_mon");
                    var yyyy = $("#_jex_calendar_mon").find("#layer_calendar_mon").find(".font_year").html();
                    yyyy = yyyy.substring(yyyy.indexOf(">")+1, yyyy.lastIndexOf("</")); 
                    setYearTbl(yyyy);
                    return false;
                });

                $("#_jex_calendar_mon").find("#layer_calendar_year").find("#prev_year_list").unbind('click');
                $("#_jex_calendar_mon").find("#layer_calendar_year").find("#prev_year_list").click(function() {
                    setYearTbl(parseInt($("#_jex_calendar_mon").find("#layer_calendar_year").data("nYear"),10)-10);
                });

                $("#_jex_calendar_mon").find("#layer_calendar_year").find("#next_year_list").unbind('click');
                $("#_jex_calendar_mon").find("#layer_calendar_year").find("#next_year_list").click(function() {
                    setYearTbl(parseInt($("#_jex_calendar_mon").find("#layer_calendar_year").data("nYear"),10)+10);
                });

                function setYearTbl(year) {
                    year = parseInt(year);
                    var strYear = parseInt(parseInt(year,10)/10)*10-1;
                    var endYear = parseInt(parseInt(year,10)/10)*10+10;

                    var titStr = strYear + "년~" + endYear+"년";

                    $("#_jex_calendar_mon").find("#layer_calendar_year").data("nYear",year);

                    $("#_jex_calendar_mon").find("#layer_calendar_year").find(".font_year").html(titStr);

                    $("#_jex_calendar_mon").find("#layer_calendar_year").find("ul").find("li").remove();

                    var tr = $("<li></li>");

                    var insYear = strYear;

                    for (var i=0; i<12; i++) {
                    	var td = $("<a href='#jbbank'>" + (insYear+i) + "년</a>");
                    	td.clone().appendTo(tr);
                        tr.clone().appendTo($("#_jex_calendar_mon").find("#layer_calendar_year").find("ul"));
                        tr = $("<li></li>");

                        if(year == (insYear+i)) td.attr("class", "today");
                    }

                    $("#_jex_calendar_mon").find("#layer_calendar_year").find("ul").find("li").find("a").unbind('click');
                    $("#_jex_calendar_mon").find("#layer_calendar_year").find("ul").find("li").find("a").click(function() {
                        $("#_jex_calendar_mon").find("#"+$("#_jex_calendar_mon").find("#layer_calendar_year").data("target")).find(".font_year").html("<a href='#' class='point_cerablue'>" + $(this).html() + "</a>");
                        $("#_jex_calendar_mon").find("#layer_calendar_year").find("#closeBtn").click();
                    });
                }

                if (opt==null || opt==undefined || opt.year==undefined) opt = jexCalFn['getToday']();

                $r.data("opt",opt);

                $("#_jex_calendar_mon").find("#layer_calendar_mon").find(".font_year").html("<a href='#' class='point_cerablue'>" + opt.year+"년" + "</a>");
                $("#_jex_calendar_mon").find("#layer_calendar_mon").find("ul").find("li").unbind('click');
                $("#_jex_calendar_mon").find("#layer_calendar_mon").find("ul").find("li").click(function() {
                    if (isNaN($(this).find("a").html().replaceAll("월", ""))) {
                    	return;
                    }

                    var yyyy= $("#_jex_calendar_mon").find("#layer_calendar_mon").find(".font_year").html();
                    yyyy = yyyy.substring(yyyy.indexOf(">")+1, yyyy.lastIndexOf("</"));
                    var mmm = (parseInt($(this).find("a").html(), 10) < 10) ? "0"+$(this).find("a").html() : $(this).find("a").html();
                    $r.val(yyyy + "-" + mmm);
                    jexCalFn['getTrxFn']()(yyyy, mmm);
                    jexCalFn['hide']();
                    $r.change();
                });
            },
            getMonEndDate:function(opt) {
                if (opt.mon==2&&(opt.year%4==0 && (opt.year%100!=0||opt.year%400==0))) return 29;
                else                                                                   return getMonLen[opt.mon-1];
            },
            getFirstDay:function(opt) {
                var yearlen        = opt.year - baseDt.year;
                var yun_yearlen = parseInt((opt.year-1)/4,10) - parseInt((opt.year-1)/100,10) + parseInt((opt.year-1)/400,10);
                var dt_cnt        = yearlen + yun_yearlen + 1;

                for (var i=0; i<opt.mon-1; i++) { dt_cnt = dt_cnt+jexCalFn['getMonEndDate']({"year":opt.year, "mon":i+1}); }
                var week        = (baseDt.week+dt_cnt+1)%7;

                return week;
            }
        };
        $r.click(function() {
            opt = jexCalFn['getInputFn']()();
            jexCalFn['show'](opt);
        });
        if (cmd==undefined || cmd=="make" || jb_isNum(cmd)) {
            if (!jexCalFn['getIsSetFn']()()) {
                var today    = jexCalFn['getToday']();
                var mmm        = (parseInt(today.mon,10)<10)?"0"+today.mon:today.mon;
                var ddd        = (parseInt(today.day,10 )<10)?"0"+today.day:today.day;
                var fn         = jexCalFn['getTrxFn']();
                fn(today.year, mmm, ddd);
            }
            return;
        }

        return jexCalFn[cmd](opt);
    }
});
function checkEvent(event) {
	if(navigator.appName == 'Microsoft Internet Explorer') {
        event = window.event;
        event.target = event.srcElement;
        event.which = event.keyCode;
    }

    return event;
}
function jb_calendar_prev_btn(thisobj, event) {
	var e = checkEvent(event);
	if(e.shiftKey) {
		if(e.which == 9) {
			if($(thisobj).attr("id") == "prev_mon") {
				$("#layer_calendar").find("#closeBtn").focus();	
			} else if($(thisobj).attr("id") == "prev_year") {
				$("#layer_calendar_mon").find("#closeBtn").focus();
			} else if($(thisobj).attr("id") == "prev_year_list") {
				$("#layer_calendar_year").find("#closeBtn").focus();
			}
			if(navigator.appName == 'Microsoft Internet Explorer') event.returnValue = false;	
			else e.preventDefault();
		}
	}
}
function jb_calendar_next_btn(thisobj, e) {
}
function jb_calendar_close_btn(thisobj, e) {
	var e = checkEvent(event);
	if(e.shiftKey) {
		
	} else {
		if(e.which == 9) {
			if($(thisobj).parent().attr("class").indexOf("day") > -1) {
				$("#layer_calendar").find("#prev_mon").focus();
			} else if($(thisobj).parent().attr("class").indexOf("mon") > -1) {
				$("#layer_calendar_mon").find("#prev_year").focus();
			} else if($(thisobj).parent().attr("class").indexOf("year") > -1) {
				$("#layer_calendar_year").find("#prev_year_list").focus();
			}
			if(navigator.appName == 'Microsoft Internet Explorer') event.returnValue = false;	
			else e.preventDefault();
		}
	}
}