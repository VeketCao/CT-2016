/**
 * Created by ex_lianghy on 2015-8-17
 */
define(['app','text!./main.html','css!./main.css','domReady!'],function(app,page){
    var $page;
    var applylogin=function(){
        app.layer.open({
            title:"登录美的金融门户",
            type: 2,
            area: ['500px', '500px'],//[w,h]
            content: PORTAL_CONFIG.LOGIN_URL
        });
    };

    var initApp=function($c,paras){
        app.http("js/supplyDetail.json")
            .done(function (json) {
                var data = json[paras];
                if(data) {
                    $('.detail-head1',$page).html("<span>首页<span>&nbsp;&gt;&nbsp;</span>供应链链金融<span>&nbsp;&gt;&nbsp;</span>" + data.title + "</span>");
                    $('#detail-title ',$page).html(data.title);
                    $("#detail-apply-btn",$page).addClass("detail-apply-btn");
                    $("#detail-apply-btn",$page).html("<a>立即申请</a>");
                    var list = data.list,
                        htm = "";
                    $.each(list, function (i,v) {
                        htm += '<div class="detail-intro">'+
                            '<div class="detail-intro-title"><span class="main-font">'+v.title+'</span></div>'+
                            '<div class="detail-intro-content"><span class="main-font">' + v.content + '</span></div>'+
                            '</div>';
                    });
                    $('#detail-intro').html(htm);
                }
            });
        $("#detail-apply-btn",$page).bind("click",applylogin);
    };

    return {
        show:function($c,paras){
            $page=$(page);
            $page.appendTo($c||$('#main'));
            initApp($c,paras);
        },
        hide:function(){
            $page.remove();
        }
    }

});