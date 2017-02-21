/**
 * Created by CAOTAO on 2015-7-29.
 */
var loginUrl="module/login/main.js";
require(['app',loginUrl,'jquery'],function(app,LoginForm){
    var $mainCtx,$nav,$sub,loginForm;
    var menus=[
        {id:'home',title:'首页',url:'module/home/main.js'},
        {id:'plms',title:'员工金融',url:'module/plms/main.js'},
        {id:'supply',title:'供应链金融',url:'module/supply/main.js'},
        {id:'sales',title:'销售金融',url:'module/sales/main.js'},
        {id:'online',title:'咨询在线',url:'module/online/main.js'}
    ];

    var changeLi=function(id){
        $('li',$nav).removeClass('active');
        $('#li-'+id,$nav).addClass('active');
    };

    var loginHandle=function(){
        loginForm.show($("#popup-win"));
        /*app.layer.open({
            title:"登录美的金融门户",
            type: 2,
            area: ['500px', '500px'],//[w,h]
            content: PORTAL_CONFIG.LOGIN_URL
        });*/
    };

    var loginClose=function(e){
        console.log(e);
    };

    var addfavorite=function(){
        var url = window.location;
        var title = document.title;
        var info="您的浏览器不支持,请按 Ctrl+D 手动收藏!";
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("360se") > -1) {
            app.layer.alert(info, {icon: 7});
        }else if (ua.indexOf("msie 8") > -1) {
            window.external.AddToFavoritesBar(url, title); //IE8
        }else if (document.all) {
            try{
                window.external.addFavorite(url, title);
            }catch(e){
                app.layer.alert(info, {icon: 7});
            }
        }else if (window.sidebar&& typeof(window.sidebar.addPanel)=="function") {
            window.sidebar.addPanel(title, url, "");
        }else {
            app.layer.alert(info, {icon: 7});
        }
    };

    var clearSubMenu=function(){
        $("#li-supply",$sub).removeClass("li-hover");
        $("#li-supply-sub",$sub).hide();
        $("#li-sales",$sub).removeClass("li-hover");
        $("#li-sales-sub",$sub).hide();
    };

    var showSubMenu=function(e){
        clearSubMenu();
        $(this).addClass("li-hover");
        $("#"+e.currentTarget.id+"-sub",$sub).show();
    };

    var hideSubMenu=function(e){
        $(this).removeClass("li-hover");
        //$("#"+e.currentTarget.id+"-sub",$sub).hide();
    };

    var subMenuEnter=function(e){
        var temp = e.currentTarget.id.split("-");
        $("#"+temp[0]+"-"+temp[1]).addClass("li-hover");
        $(this).show();
    };

    var subMenuLeave=function(e){
        var temp = e.currentTarget.id.split("-");
        $("#"+temp[0]+"-"+temp[1]).removeClass("li-hover");
        $(this).hide();
    }

    var bindEvent=function(){
        $("#login-a").bind("click",loginHandle);
        $("#add-book").bind("click",addfavorite);
        $("li",$nav).bind("mouseenter",showSubMenu);
        $("li",$nav).bind("mouseleave",hideSubMenu);
        $(".sub-menu",$sub).bind("mouseenter",subMenuEnter);
        $(".sub-menu",$sub).bind("mouseleave",subMenuLeave);
        $("a",$sub).bind("mouseenter",function(){$(this).addClass("border")});
        $("a",$sub).bind("mouseleave",function(){$(this).removeClass("border")});
        $(".g-toolbar").bind("mouseenter",function(){clearSubMenu();});
        loginForm.on("loginCloseEvent",loginClose);
    };
    var ueserLoginInfo = function(){
        var name = $.cookie("name");
        name =  decodeURI(name);
        console.log(name);
        if(name != undefined && name !="undefined"){
            console.log(name);
            $(".lg-div").hide();
            var html = '<div class="log-info" id="log-info-tag">'+
                '<div class="profile-ava"><img alt="" src="img/default/getPhotoByUid_small.jpg"></div>'+
                '<span class="log-info-username" style="">'+name+'</span>'+
                '</div>';
            $(".gn-login").append(html);
            userinfohref();
        }
    };

    var userinfohref = function(){
        $("#log-info-tag").click(function(){
            //正式http://efms.midea.com/
            var url = "http://10.16.68.114/main.html";
            var employeeNoval = $.cookie("employeeNo");
            var userIDval = $.cookie("userID");
            var nameval = $.cookie("name");
            var sessionIDval = $.cookie("sessionID");
            url = url+"?employeeNo="+employeeNoval+"&userID="+userIDval+"&name="+nameval+"&userToken="+sessionIDval;
            window.open(url);
        });
    };

    var initApp=function(){
        $mainCtx = $("#main");
        $nav=$(".gn-nav");
        $sub=$("#sub-menu");
        app.ModuleLoader({hash:'/r/:id(/*suffix)',menus:menus,mainCtx:$mainCtx,callback:changeLi});
        if(window.location.toString().indexOf('#!/r')==-1) app.hash('#!/r/home');
        loginForm=LoginForm();
        bindEvent();
        ueserLoginInfo();
    };

    initApp();
});