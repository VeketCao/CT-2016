/**
 * Created by CAOTAO on 2015-7-29.
 */
define(['sliders','app','text!./main.html','css!./main.css','domReady!'],function(sliders,app,page){
    'use strict';
    var $page,$cont;

    var menus=[
        {id:'detail',title:'test',url:'module/sales/detail/main.js'}
    ];

    //销售链页面动画效果
    var salesamllanimate = function(){
        var wh=$(window).height();
        $(window).scroll(function(){
            var s=wh-$(window).scrollTop();
            if(s<85){
                $(".sale-smallimg-gao").animate({left:'289px'},1000);
                $(".sale-smallimg-kuai").animate({left:'96px'},1000);
                $(".sale-smallimg-quan").animate({right:'96px'},1000);
                $(".sale-smallimg-di").animate({right:'289px'},1000);
            }
        });
    };
    var initApp=function(){
        //salesamllanimate();
        app.ModuleLoader({hash:'/r/sales/:id(/*suffix)',menus:menus,mainCtx:$cont});
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
    }

});