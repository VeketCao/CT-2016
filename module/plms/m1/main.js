/**
 * Created by CAOTAO on 2015-7-29.
 */
define(['text!./main.html','css!./main.css','domReady!'],function(page){
    var $page;

    var initApp=function(){
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