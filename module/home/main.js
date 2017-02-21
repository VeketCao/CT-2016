/**
 * Created by CAOTAO on 2015-7-29.
 */
var leftNavUrl="../nav_left/main.js";
define([leftNavUrl,'sliders','app','text!./main.html','css!./main.css','domReady!'],function(leftNav,sliders,app,page){
    var $page;

    //员工金融tab切换方法
    var stafftab =function(){
        $('#tab-title .tab-title-s',$page).click(function(){
            $(this,$page).addClass("tab-title-selected").siblings().removeClass('tab-title-selected');
            $("#tab-content > ul",$page).hide().eq($('#tab-title .tab-title-s',$page).index(this)).show();
        });
        $("#arrow-right").click(function(){
            var eqindex=$('#tab-title .tab-title-s',$page).index($('#tab-title .tab-title-selected',$page)[0])+1;
            if(eqindex==4){
                eqindex=0;
            }
            $("#tab-content ul",$page).hide().eq(eqindex).show();
            $('#tab-title .tab-title-s',$page).removeClass('tab-title-selected').eq(eqindex).addClass('tab-title-selected');
        });
        $("#arrow-left").click(function(){
            var eqindex=$('#tab-title .tab-title-s',$page).index($('#tab-title .tab-title-selected',$page)[0])-1;
            if(eqindex==-1){
                eqindex=3;
            }
            $("#tab-content ul",$page).hide().eq(eqindex).show();
            $('#tab-title .tab-title-s',$page).removeClass('tab-title-selected').eq(eqindex).addClass('tab-title-selected');
        });

    };

    //员工金融跳转
    var staffhref = function(){
        $(".staff-title-img").click(function(){
            //正式http://efms.midea.com/
            var url = "http://10.16.68.114/main.html";
            var employeeNoval = $.cookie("employeeNo");
            var userIDval = $.cookie("userID");
            var nameval = $.cookie("name");
            var sessionIDval = $.cookie("sessionID");
            url = url+"?employeeNo="+employeeNoval+"&userID="+userIDval+"&name="+nameval+"&userToken="+sessionIDval;
            window.open(url);
        });
    };

    //详情块的显示
    var showSupplyLable=function(e){
        var i=e.currentTarget.parentNode.id;
        var supplylable=e.currentTarget.id;
        app.http("js/homeLable.json")
            .done(function (json) {
                data = json;
                $("."+supplylable,$page).html(
                   // '<div class="lable-title"><span class="main-font">'+data["detail"+i].list[0]+'</span></div>'+
                    '<div class="lable-supply-brief">'+
                    '<div class="lable-brief"><span class="main-font">随借随还</span></div>'+
                    '<div class="lable-brief"><span class="main-font">手续简单</span></div>'+
                    '<div class="lable-brief"><span class="main-font">放款快捷</span></div>'+
                    '</div>'+
                    '<div class="lable-intro"><span>'+data["detail"+i].list[1]+'</span> </div>'+
                    '<div class="lable-intro-b"> <span class="main-font">借款期限：'+data["detail"+i].list[2]+'</span></div>'+
                    '<div class="lable-detail-btn"><a class="main-font"  href="'+data["detail"+i].list[5]+'">查看详情</a></div>'
                );
                $(".lable").hide();
                $("."+supplylable,$page).show();
                $("."+supplylable,$page).css("margin-top",data["detail"+i].list[4]);
            });
    };

    var hideSupplyLable=function(e){
        var supplylableout=e.currentTarget.childNodes[1].id;
        if(supplylableout==null||supplylableout==""||supplylableout==undefined||supplylableout=="null"){
            supplylableout=e.currentTarget.childNodes[0].id
        }
        $("."+supplylableout,$page).hide();
    };

    var showSaleLable=function(e){
        var i=e.currentTarget.parentNode.id;
        var salelable=e.currentTarget.id;
        app.http("js/homeLable.json")
            .done(function (json) {
                data = json;
                $("."+salelable,$page).html(
                   // '<div class="lable-title"><span class="main-font">'+data["detail"+i].list[0]+'</span></div>'+
                    '<div class="lable-sale-brief">'+
                    '<div class="lable-intro"><span>'+data["detail"+i].list[1]+'</span> </div>'+
                    '<div class="lable-intro-b"> <span>借款期限：'+data["detail"+i].list[2]+'</span></div>'+
                    '<div class="lable-intro-b"> <span>申请条件：</span> <span>'+data["detail"+i].list[3]+'</span></div>'+
                    '</div>'+
                    '<div class="lable-detail-btn"><a class="main-font"  href="'+data["detail"+i].list[5]+'">查看详情</a></div>'
                );
                $(".lable2").hide();
                $("."+salelable,$page).show();
                $("."+salelable,$page).css("margin-top",data["detail"+i].list[4]);
            });
    };

    var hideSaleLable=function(e){
        var salelableout=e.currentTarget.childNodes[1].id;
        if(salelableout==null||salelableout==""||salelableout==undefined||salelableout=="null"){
            salelableout=e.currentTarget.childNodes[0].id
        }
        $("."+salelableout,$page).hide();
    };

    var detaileffect=function(){
        $(".supply-lable-btn",$page).bind("mouseenter",showSupplyLable);
        $(".supply-lable-out",$page).bind("mouseleave",hideSupplyLable);
        $(".sale-lable-btn",$page).bind("mouseenter",showSaleLable);
        $(".sale-lable-out",$page).bind("mouseleave",hideSaleLable);
    };

    //供应链模块动画
    var supplyanimate=function(){
        var wh=$(window).height();
        $(window).scroll(function(){
            var s=wh-$(window).scrollTop();
            if(s<85){
                $(".supply-img-gao").animate({left:'167px'},1000);
                $(".supply-img-kuai").animate({left:'57px'},1000);
                $(".supply-img-di").animate({right:'57px'},1000);
                $(".supply-img-sheng").animate({right:'167px'},1000);
            }
        });
    };

    //销售链模块动画
    var saleanimate=function(){
        var wh=$(window).height();
        $(window).scroll(function(){
            var s=wh-$(window).scrollTop();
            if(s<-605){
                $(".sale-img-gao").animate({left:'167px'},1000);
                $(".sale-img-kuai").animate({left:'57px'},1000);
                $(".sale-img-quan").animate({right:'57px'},1000);
                $(".sale-img-di").animate({right:'167px'},1000);
            }
        });
    };

    //资讯在线接口
    var createNewsList = function (json,ele) {
        json = json || {};
        var href = json;
        var html = '<ul>';
        if(json.length>0){
            $.each(json, function (i, o) {
                html += '<li><a class="content" href="'+o.href+'" target="_blank">'+ o.title +'</a><a class="date">'+ o.createTime.split(' ')[0] +'</a></li>';
            });
        }
        html += '</ul>';
        $('#'+ele).html(html);
    };
    var getNewsInfoAndSetToHtml = function (url,ele) {
        app.http(url,null,{
            "dataType" : "jsonp"
        })
            .done(function (json) {
                if(json&&!json.error){
                    createNewsList(json,ele);
                }
            });
    };
    var OnlineNewsItems = function () {
        getNewsInfoAndSetToHtml(
            'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387120481&pageno=1&rowsize=4',
            'announcement-policy-content1'
        );
        getNewsInfoAndSetToHtml(
            'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387125088&pageno=1&rowsize=4',
            'announcement-policy-content2'
        );
        getNewsInfoAndSetToHtml(
            'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387026916&pageno=1&rowsize=3',
            'consultation-strategy-content1'
        );
        getNewsInfoAndSetToHtml(
            'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387012276&pageno=1&rowsize=3',
            'consultation-strategy-content2'
        );
        getNewsInfoAndSetToHtml(
            'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387022240&pageno=1&rowsize=2',
            'consultation-strategy-content3'
        );
    };

    var initApp=function(){
        stafftab();
        detaileffect();
        staffhref();
        //supplyanimate();
        //saleanimate();
        OnlineNewsItems();
        leftNav.show($('#left-nav',$page));
    };
    return {
        show:function($c){
            $page=$(page);
            $page.appendTo($c||$('#main'));
            initApp();
            $('#adSlider').slidesjs({
                play: {
                    active: true,
                    auto: true,
                    interval: 3000,
                    swap: true,
                    pauseOnHover:'false',
                    effect:'slide'  //'silde or fade
                }
            });
        },
        hide:function(){
            $page.remove();
        }
    }

});


