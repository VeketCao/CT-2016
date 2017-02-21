/**
 * Created by CAOTAO on 2015-7-29.
 */

define(['sliders','app','text!./main.html','css!./main.css','domReady!'],function(sliders,app,page){
    var $page,$mainCtx;
    var menus=[
        {id:'detail',title:'test',url:'module/supply/detail/main.js'}
    ];

    //供应链动画效果
    var supplysamllanimate=function(){
        var wh=$(window).height();
        $(window).scroll(function(){
            var s=wh-$(window).scrollTop();
            if(s<85){
                $(".supply-smallimg-gao").animate({left:'289px'},1000);
                $(".supply-smallimg-kuai").animate({left:'96px'},1000);
                $(".supply-smallimg-di").animate({right:'96px'},1000);
                $(".supply-smallimg-sheng").animate({right:'289px'},1000);
            }
        });
    };

    var initApp=function(){
        $mainCtx = $("#main");
        app.ModuleLoader({hash:'/r/supply/:id(/*suffix)',menus:menus,mainCtx:$mainCtx});
        //supplysamllanimate();
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

