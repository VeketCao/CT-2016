/**
 * Created by CAOTAO on 2015-7-29.
 */
define(['app','text!./main.html','css!./main.css','domReady!'],function(app,page){
    var $page,$mainCtx;

    var menus=[
        {id:'m1',title:'test',url:'module/plms/m1/main.js'}
    ];

    var initApp=function(){
        $mainCtx=$("#m-ctx",$page);
        app.ModuleLoader({hash:'/r/plms/:id(/*suffix)',menus:menus,mainCtx:$mainCtx});
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