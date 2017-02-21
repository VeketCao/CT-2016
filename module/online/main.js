/**
 * Created by CAOTAO on 2015-7-29.
 */
define(['sliders','slider','app','text!./main.html','css!./main.css','domReady!'],function(sliders,slider,app,page){
    'use strict';
    var $page,$cont;

    var menus=[
        {id:'detail',title:'test',url:'module/online/detail/main.js'}
    ];

    //拼接新闻
    var createNewsList = function (json,ele) {
        json = json || {};
        var href = json;
        var html = '<ul>',
            commomHtm = '';
        if(json.length>0){
            $.each(json, function (i, o) {
                html += '<li class="clearfix">';
                commomHtm = '<a class="info-list-content" href="'+o.href+'" target="_blank">'+ o.title +'</a>'+
                    '<span class="info-list-date">'+ o.createTime.split(' ')[0] +'</span>';
                if(ele == 'newsAttack'){
                    if(i == 0){
                        var content = (o.content).replace(/<\/?.+?>/g,"");
                        if(content.length >=60){
                            content = content.substr(0,60)+'...<a href="'+o.href+'" target="_blank" style="color:#999" >【详细】</a>';
                        }else{
                            content = content+'<a href="'+o.href+'" target="_blank" style="color:#999">【详细】</a>';
                        }
                        html += '<a  style="width: 100%;font-size: 1.5em;" class="info-list-content" href="'+o.href+'" target="_blank">'+ o.title +'</a>' +
                            '<p style="font-size: 14px;margin-bottom: 10px;">'+ content +'</p>';
                    }else{
                        html += commomHtm;
                    }
                }else if(ele == 'fundNews'){
                    if(i == 0){
                        var fnContent = (o.content).replace(/<\/?.+?>/g,""),
                            img = '',
                            w = '65%';
                        if(fnContent.length >=40){
                            fnContent = fnContent.substr(0,40)+'...<a href="'+o.href+'" target="_blank" style="color:#999">【详细】</a>';
                        }else{
                            fnContent = fnContent+'<a href="'+o.href+'" target="_blank" style="color:#999">【详细】</a>';
                        }
                        img = (o.content).match(/<img.+src=\"?(.+\.(jpg|gif|bmp|bnp|png))\"?.+>/i);
                        if(img){
                            img = '<img src="'+img[1]+'" style="float: left;width: 30%;margin-right: 10px;margin-bottom: 10px;display: block;"/>';
                        }else{
                            img = '';
                            w = "100%";
                        }
                        html += img+'<div style="float: left;width: '+w+';"><a  style="font-size: 1.5em;float: none;margin-bottom: -5px;" class="info-list-content" href="'+o.href+'" target="_blank">'+ o.title +'</a>' +
                        '<p style="line-height: 1.5em;width:100%;margin-bottom: 10px;font-size: 14px;">'+ fnContent +'</p></div>';
                    }else{
                        html += commomHtm;
                    }
                }else{
                    html += commomHtm;
                }
                html += '</li>';
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
    var setupOnlineNewsItems = function () {
        //公告
        getNewsInfoAndSetToHtml(
            'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387120481&pageno=1&rowsize=8',
            'infoNotice'
        );
        getNewsInfoAndSetToHtml(
            'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387125088&pageno=1&rowsize=6',
            'newsAttack'
        );
        getNewsInfoAndSetToHtml(
            'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387026916&pageno=1&rowsize=6',
            'fundNews'
        );
        getNewsInfoAndSetToHtml(
            'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387012276&pageno=1&rowsize=8',
            'industrialPolicy'
        );
        getNewsInfoAndSetToHtml(
            'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387022240&pageno=1&rowsize=8',
            'guide'
        );
    };

    //横幅图片
    function loadbanner(){
        var url = 'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?jsonpcallback=xxxxxx&s_bean=kmCulPortalInterfaceDataService&fdId=5386974484&pageNo=1&rowSize=1';
        app.http(url,null,{
            "dataType" : "jsonp"
        })
            .done(function (json) {
                if(json&&!json.error){
                    var html = '<img width="1100px" height="118px" src="'+ json[0].picLink +'">';
                    $("#bannerimg").html(html);
                }
            });
    }

    //页面中部slide
    function middleSilde(){
        var url = 'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?jsonpcallback=xxxxxx&s_bean=kmCulPortalInterfaceDataService&fdId=5386989094&pageNo=1&rowSize=5';
        app.http(url,null,{
            "dataType" : "jsonp"
        })
            .done(function (json) {
                var html = '';
                $.each(json, function (i, o) {
                    html += '<a href="'+ o.pichref +'" target="_blank"><img src="'+ o.picLink +'" data-thumb="'+ o.picLink +'" alt="" title="'+ o.title +'" /></a>';
                });
                $("#slider").html(html).nivoSlider({
                    controlNav: true
                });
            });
    }

    var initApp=function(){
        setupOnlineNewsItems();
        loadbanner();
        middleSilde();
        $('#adSlider').slidesjs({
            play: {
                active: true,
                auto: true,
                interval: 3000,
                pauseOnHover:'false',
                swap: true,
                effect:'slide'  //'silde or fade
            }
        });
        app.ModuleLoader({hash:'/r/online/:id(/*suffix)',menus:menus,mainCtx:$cont});
    };


    return {
        show:function($c){
            $page=$(page);
            $cont = $c||$('#main');
            $page.appendTo($cont);
            initApp();
        },
        hide:function(){
            $page.remove();
        }
    };

});