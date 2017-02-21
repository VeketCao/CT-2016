/**
 * Created by CAOTAO on 2015-7-29.
 */
var __initRoute=function(app){
    app.hash=function(v){
        if(!v)return window.location.hash;
        window.location.hash=v;
    };
    /**
     * @param ops:
     * hash：必填，要监听的hash模式：'/r/:id(/*suffix)';
     * menus：必填，包含模块url的菜单项数组，item必须包含id和url属性;
     * mainCtx:必填，容器
     * callback:回调函数
     * @constructor
     */
    app.ModuleLoader=function(ops){

        var getUrl=function(id,menus){
            if(!id||!menus)return;
            var v= '';
            for(var i=0;i<menus.length;i++){
                if(id==menus[i].id) {
                    v=menus[i].url;
                    break;
                }
            }
            return v;
        };

        var r1=new kendo.Router({hashBang:true});

        r1.route(ops.hash,function(id,suffix,query){
            var url= getUrl(id,ops.menus);
            if(url=='')return;
            require([url],function(exports){
                ops.mainCtx.empty();
                $(document).scrollTop(0);
                exports.show(ops.mainCtx,suffix);
                if(ops.callback)ops.callback(id);
            });
        });

        r1.start();
    }

};

var __initLayer=function(app,layer){
    layer.config({ path: 'lib/layer/'});
    app.layer=layer;
};

define(['layer','sha256','jquery','router','jquery.cookie'],function(layer,SHA256){
    var app={};
    $.support.cors = true;//解决ie8兼容问题
    __initRoute(app);
    __initLayer(app,layer);

    app.digest=function(str){//加密
        return SHA256(str).toString();
    };

    app.getCookie = function(name){
        return $.cookie(name);
    };

    app.setCookie = function(name, value){
        var Days = 7;
        var exp = new Date(); //new Date("December 31, 9998");
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        $.cookie(name, value, {expires: exp});
    };
    
    app.http = function (url, data, options) {
        /**
         * @请求url
         * @data 请求参数 json格式
         * @options  {object} 可配置参数
         */
        data = data || {};
        options = options || {};
        var myOptions = {
            "eUrl" : options.eUrl || "",//调用接口错误返回的url地址
            "eCallback": options.eCallback,//调用错误回调函数
            "eMessage": options.eMessage || "",//错误信息
            "project" : options.project || "exam",
            "dataType" : options.dataType || "json",
            "type" : options.type || "GET",
            "jsonpCallback":"jsonpcallback",
            "timeout": options.timeout || 5000
        };
        var dtd = $.Deferred(),
            thisUrl = url ? url : "/js/tempData/devData.json";
        $.ajax({
            url: thisUrl,
            dataType: myOptions.dataType,
            data: data,
            jsonp:myOptions.jsonpCallback,
            cache: false,
            timeout : myOptions.timeout,
            type :myOptions.type
        })
            .done(function (json) {
                if (json && !json.error) {
                    dtd.resolve(json);
                } else {
                    dtd.reject(json);
                    if((!json)||json.error) {
                        var reason = json.error.reason || json.error.message,
                            errorInfo = "";
                        if (!reason || reason === "undefined" || reason === "null") {
                            errorInfo = '网络出现异常，请重试!';
                        } else {
                            errorInfo = reason;
                        }
                        console.log(errorInfo);
                    }
                    return false;
                }
            })
            .fail(function (json) {
                console.log('网络不给力...');
                dtd.reject(json);
            })
            .always(function () {

            });
        return dtd.promise();
    };

    return app;
});