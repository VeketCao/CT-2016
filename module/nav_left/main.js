/**
 * Created by CAOTAO on 2015-8-25.
 */
define(['text!./main.html','css!./main.css','domReady!'],function(page){
    var $page;

    var initApp=function(){
        var $nav = $('#nav-left-module'),
            $navH = $nav.find('h1'),
            $navRight = $nav.find('.nav-right'),
            i = 0;
        $navH.mouseover(function(){
            var $this = $(this);
            $this.addClass('target');
            i = $navH.index($this);
            $navRight.eq(i).show();
        }).mouseleave(function(){
            var $this = $(this);
            $this.removeClass('target');
            i = $navH.index($this);
            $navRight.eq(i).hide();
        });
        $navRight.mouseover(function(){
            $(this).show();
            $navH.eq(i).addClass('target');
        }).mouseleave(function(){
            $(this).hide();
            $navH.eq(i).removeClass('target');
        });
    };

    return {
        show:function($c){
            $page=$(page);
            $page.appendTo($c||$('#main'));
            initApp();
        },
        hide:function(){
            $page.remove();
        }
    }

});