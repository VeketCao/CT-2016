require.config({
    'paths':{
        'jquery':'lib/jquery/jquery.min',
        'jquery.cookie':'lib/jquery/jquery.cookie',
        'placeholder':'lib/jquery/jquery.placeholder.min',
        'router':'lib/router/kendo.router.min',
        'layer':'lib/layer/layer',
        'valid':'lib/valid/validform.min',
        'sha256':'lib/cryptojs/sha256',
        'pagination':'lib/pagination/jquery.pagination',
        'slider':'lib/nivo-slider/jquery.nivo.slider.pack',
        'unslider':'lib/unslider/unslider.min',
        'sliders':'lib/slider/jquery.slides.min',

        /**配置require插件**/
        'text': 'lib/requirejs/text.min',
        'css': 'lib/requirejs/css.min',
        'domReady': 'lib/requirejs/domReady.min',

        /**自定义模块**/
        'app':'js/app-util'
    },
    'shim':{
        'jquery':{'exports':'$'},
        'layer':{'deps':['jquery']},
        'valid':{'deps':['jquery']},
        'pagination':{'deps':['jquery']},
        'slider':{'deps':['jquery']},
        'unslider':{'deps':['jquery']},
        'sliders':{'deps':['jquery']}
    },
    urlArgs:'v=1.0.0'
});

/**
 * LOGIN_URL:产业链登陆界面地址
 * @type {{LOGIN_URL: string}}
 */
var PORTAL_CONFIG={
    LOGIN_URL:"http://jinrong.midea.com/ifspscf/login/login_door.html"
};

//后台服务器-验证码
var SERVICE_CONFIG={
    SERVICE_URL:"http://10.9.59.54:9999",
    FUND_PORTAL:"fund-portal"
};