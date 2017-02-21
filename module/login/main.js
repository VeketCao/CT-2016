/**
 * Created by CAOTAO on 2015-7-29.
 */
define(['app','text!./main.html','placeholder','css!./main.css','domReady!'],function(app,page){
    return function(){
        var o=$({});
        var $page,$container,checkCode,$tab;

        var popupWin =function(){//弹出窗
            app.layer.open({
                title:"登录美的金融门户",
                type: 1,
                area: ['510px', '580px'],//[w,h]
                content: $container,
                cancel:function(index){
                    deleteCheckCode();
                    $page.remove();
                }
            });
        };

        var deleteCheckCode=function(){//删除验证码
            var getImgName=function(imagePath){
                return imagePath.substring(imagePath.indexOf("/")+1, imagePath.indexOf("."));
            };
            if(checkCode&&checkCode.imagePath){
                var url= SERVICE_CONFIG.SERVICE_URL+'/'+SERVICE_CONFIG.FUND_PORTAL + "/image/"+getImgName(checkCode.imagePath);
                $.ajax({url:url,type:'DELETE',contentType: "application/json",
                    success: function(data){}
                });
            }
        };

        var getCheckCode=function(){//获取验证码
            var url= SERVICE_CONFIG.SERVICE_URL+'/'+SERVICE_CONFIG.FUND_PORTAL + "/image";
            $.ajax({
                url:url,
                type:'GET',
                success: function(rtn){
                    if(rtn.success&&rtn.data){
                        checkCode = rtn.data;
                        $("#yzm-img",$page).attr({src:SERVICE_CONFIG.SERVICE_URL+'/'+checkCode.imagePath});
                    }
                },
                error:function(rtn){alert("验证码获取失败。");}
            });
        };

        var nextCheckCode=function(){//下一个验证码
            $('#yzm-ipt',$page).val("");
            $('#yzm-ipt',$page).removeClass("validYzm-wrong");
            $('#yzm-ipt',$page).removeClass("validYzm-right");
            deleteCheckCode();
            getCheckCode();
        };

        var addOrRemoveValidClass=function($d){
            if($d.val()){
                $d.removeClass("valid-error");
            }else{
                $d.addClass("valid-error");
            }
            if($d[0].id=="yzm-ipt"){//验证码
                var v = $.trim($d.val()).toUpperCase();
                var c= "";
                if(checkCode&&checkCode.randCheckCode) c=checkCode.randCheckCode.toUpperCase();
                if(c&&v==c){
                    $d.removeClass("valid-error");
                    $d.removeClass("validYzm-wrong");
                    $d.addClass("validYzm-right");
                }else{
                    $d.removeClass("validYzm-right");
                    $d.addClass("validYzm-wrong");
                    $d.addClass("valid-error");
                }
            }
        };

        var changeLi=function(e){
            var id = e.currentTarget.id;
            $('li',$tab).removeClass('active');
            $("#"+id,$tab).addClass('active');

            $("#c-person",$tab).hide();
            $("#c-company",$tab).hide();

            switch(id){
                case "person":
                    $("#c-person",$tab).show();
                    break;
                case "company":
                    $("#c-company",$tab).show();
                    break;
            }
        };

        var doValidate=function(){//校验
            addOrRemoveValidClass($('#username',$page));
            addOrRemoveValidClass($('#password',$page));
            addOrRemoveValidClass($('#yzm-ipt',$page));
            if($('.valid-error',$page).length!=0) return false;
            return true;
        };

        var sendLoginInfo=function(loginInfo){//发送登录请求
            console.log(JSON.stringify(loginInfo));
            var url ="http://10.16.68.115:8080/plms-user/login";
            //ajax调用登陆接口，登陆成功写cookie
            //http://10.16.68.115:8080/plms-user/login
/*            $.ajax({
                url: url,
                type: 'POST',
                data: loginInfo,// 数据
                contentType: "application/json",
                processData: false,// 防止 data 被预处理
                success: function (data) {
                    console.log(data);
                }
            });*/
            $.ajax({
                url:url,
                data:JSON.stringify(loginInfo),
                type:'POST',
                contentType: "application/json",
                success: function(data){
                    if(data.success == false){
                        app.layer.open({
                            title: '登录提示',
                            content: '登录出错'
                        });
                    }else{
                        var getinfo = data.data.userCookies;
                        closeHandle("success");
                        setCookie(getinfo);
                        //ueserLoginInfo();
                        location.reload();
                    }
                },
                error:function(data){
                }
            });
        };

        var setCookie = function(getinfo){
            $.cookie("employeeNo", getinfo.employeeNo, 0);
            $.cookie("userID", getinfo.userID, 0);
            $.cookie("name", encodeURI(getinfo.name), 0);
            $.cookie("sessionID", getinfo.sessionID, 0);
        };

        var closeHandle=function(flag){//关闭弹出页，并且抛出事件,flag:成功或者失败的标记
            var event=$.Event("loginCloseEvent",{rtn:flag});
            o.trigger(event);
            if(event.isDefaultPrevented()) return;
            o.hide();
        };

        var loginClick=function(){//登陆
           //if(!doValidate()) return ;
            var loginInfo={
                userID: $.trim($("#username",$page).val()),
                passwd: $.trim($("#password",$page).val())
            } ;
            sendLoginInfo(loginInfo);
            $("#lg-btn",$page).html("登录中...");
            $("#lg-btn",$page).unbind("click");
        };

        var enterClick=function(e){
            if(e.keyCode=="13"){
                loginClick();
            }
        };

        var bindEvent=function(){
            $("li",$page).bind("click",changeLi);
            $("#lg-btn",$page).bind("click",loginClick);
            $page.bind("keyup",enterClick);//回车键
            $("#yzm-next",$page).bind("click",nextCheckCode);
            $('input',$page).on("blur",function(){addOrRemoveValidClass($(this))});
        };

        var initApp=function(){
            $("input",$page).placeholder();
            $tab=$(".tab",$page);
            bindEvent();
            getCheckCode();
            popupWin();
        };

        o.show=function($c){
            $page=$(page);
            $container =  $c||$("main");
            $page.appendTo($container);
            initApp();
        };

        o.hide=function(){
            layer.closeAll();
            $page.remove();
        };

        return o;
    }
});