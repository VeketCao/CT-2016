/**
 * Created by CAOTAO on 2015-7-29.
 */
define(['pagination','app','text!./main.html','css!./main.css','domReady!'],function(pagination,app,page){
    'use strict';
    var $page;

    var maxPage,
        pageNum = 1,
        pageSize = 10,
        url = '',
        htm = '',
        par = '', //paras
        firstLoad = true, //firstLoad
        titleArr = ['通知公告','公司政策','金融动态','产业政策','投资指南'],
        titleIndex = 0;

    //选择接口类型，页码，页数
    var setUrl = function(paras,pageNum,pageSize){
        switch (paras){
            case 'notice':
                url = 'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387120481&pageno='+pageNum+'&rowsize='+pageSize;
                titleIndex = 0;
                break;
            case 'raiders':
                url = 'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387125088&pageno='+pageNum+'&rowsize='+pageSize;
                titleIndex = 1;
                break;
            case 'financialDynamics':
                url = 'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387026916&pageno='+pageNum+'&rowsize='+pageSize;
                titleIndex = 2;
                break;
            case 'industrialPolicy':
                url = 'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387012276&pageno='+pageNum+'&rowsize='+pageSize;
                titleIndex = 3;
                break;
            case 'investmentGuide':
                url = 'http://mip.midea.com.cn/mip/sys/common/datajson.jsp?s_bean=sysPortalInterfaceDataService&fdId=5387022240&pageno='+pageNum+'&rowsize='+pageSize;
                titleIndex = 4;
                break;
        }
    };

    function createhtml(json){
        $.each(json,function(i,v){
            htm += '<div class="detail_box">'+
                '<h2>'+ v.title+'</h2>'+
                '<h5 class="Release">发布时间：<span>'+ v.createTime.split(" ")[0]+'</span>发布人：<span>'+ v.fd_name +'</span></h5>'+
                '<p>'+ (v.content).replace(/<\/?.+?>/g,"")+'<a target="_blank" href="'+ v.href +'">【详细】</a></p>'+
                '</div>';
        });
        $("#Searchresult").html(htm);
        htm = '';
    }

    //选择页码回调函数
    var pageselectCallback = function(page_index){
        if(!firstLoad){
            pageNum = page_index+1;
            setUrl(par,pageNum,pageSize);
            app.http(url,null,{
                "dataType" : "jsonp"
            })
                .done(function(json){
                    if(json && !json.error){
                        createhtml(json);
                    }
                });
        }
    };

    //初始化分页
    var initPagination = function(paras){
        setUrl(paras,pageNum,pageSize);
        $('.detailTit_name,#detailTit_name').text(titleArr[titleIndex]);
        app.http(url,null,{
            "dataType" : "jsonp"
        })
            .done(function(json){
                if(json && !json.error){
                    maxPage = Math.ceil(json[0].selectcount/pageSize);
                    $("#Pagination").pagination(maxPage,{
                        num_edge_entries: 3,
                        num_display_entries: 3,
                        callback: pageselectCallback,
                        items_per_page:1
                    });
                    createhtml(json);
                    firstLoad = false;
                }
            });

        //跳转至某页功能
        $(document).on('keyup','#setPage',function(e){
            if(e.which === 13){
                var pageNum = $("#setPage").val()-1;
                if(pageNum !== ""){
                    $("#Pagination").trigger('setPage',[pageNum]);
                }
            }
        });
    };

    var initApp = function(paras){
        par = paras ;
        initPagination(par);
    };

    return {
        show:function($c,paras){
            $page=$(page);
            $page.appendTo($c||$('#main'));
            initApp(paras);
        },
        hide:function(){
            $page.remove();
        }
    };

});