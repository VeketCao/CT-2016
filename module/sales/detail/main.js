/**
 * Created by CAOTAO on 2015-7-29.
 */
define(['app','text!./main.html','css!./main.css','domReady!'],function(app,page){
    'use strict';
     var $page;

    var detailApplyBtn = function(){
        $('#detailApplyBtn').click(function(){
            app.layer.open({
                title:"登录美的金融门户",
                type: 2,
                area: ['500px', '500px'],//[w,h]
                content: PORTAL_CONFIG.LOGIN_URL
            });
        });
    }

    var initApp=function($c,paras){

        $page=$(page);
        $page.appendTo($c||$('#main'));
        app.http("js/saleDetail.json")
            .done(function (json) {
                console.log(json);
                var data = json[paras];
                $("#webSiteName,.detailTit_name").text(data.title);
                var list = data.list,
                    htm = "";
                $.each(list, function (i,v) {
                    htm += "<div class='detail_box'>"+
                            "<h2>"+ v.title+"</h2>"+
                            "<p>"+ v.content+"</p>"+
                            "</div>";
                });
                $('#detail_box').html(htm);
            });

        //立即申请按钮
        detailApplyBtn();
    }

    return {
        show:function($c,paras){
            initApp($c,paras);
        },
        hide:function(){
            $page.remove();
        }
    };

});