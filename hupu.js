// ==UserScript==
// @name         安静看手机虎扑
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  我只想不注册不下载APP看虎扑
// @author       soundEgg
// @require http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @require  https://cdn.jsdelivr.net/npm/xgplayer@2.9.6/browser/index.js
// @match         *://m.hupu.com/*
// ==/UserScript==

(function() {
    'use strict';
    var window_url = window.location.href;
    var website_host = window.location.host;
    // Your code here...
    //移除APP打开
    //$('.open-app-suspension').remove();
    document.cookie='sc=2;';
    try {
        setTimeout(function() {

            //移除首次打开提示页面
            $('.test-mask').remove();
            //移除APP打开页面
            $('.open-app-suspension').remove();
            //移除广告
            $('div[class^="_"]').remove()
            //移除下载app
            $('.homeDownloadApp').remove();
            $('.plate-nav').remove();
            $('.topic-nav').remove();
            $('.hp-m-header')[0].style.cssText='position:relative;top:0;';
            if(document.querySelector('.home-nav')){$('.home-nav')[0].style.cssText='margin-top:0;';};
            //移除帖子中的顶端诱导app打开
            $('.swiper-header').remove();
            $('.detail-nav').remove();
            //移除帖子内热门话题
            $('.hot-topic-wrapper').remove();
            //移除广告栏
            //帖子中的 打开亮评 广告 推荐 排行
            var a =['.open-btn-under-reply','div.hupu-m-detail-content div[class^="_"]' ,'.recommand-new-style','.hot-ranking-new']
            a.forEach(function(e) {
                var obj = $(e);
                if (obj) {
                    obj.remove();
                }
            });

            // u ? i.props.clickReflow('mwapreflow_view', 'reply')  : i.toCommentaryPage()

            document.querySelectorAll('.watch-discuss').forEach(function(e){
                if(e){
                    e.onclick=function(){
                        u ? i.props.clickReflow('mwapreflow_view', 'reply')  : i.toCommentaryPage();
                    };
                };
            });
            //移除播放限制
            newvideo();


        }, 500);
    } catch(e) {
        console.log('发生了异常:', e);
    };
    function newvideo(){
        var o = $('.thread-video-wrap');
        if(o){
            o.remove();
            $('.normal')[0].insertAdjacentHTML("afterEnd", `
<div id="newvideo" class="thread-video-wrap" style="width: 100%;display: block;"></div>
`)
            var k = JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
            var mp4url=k.props.pageProps.thread.t_detail.content.match("src='(.*)' con")[1];
            let player = new Player({
                id: 'newvideo',
                url: mp4url,
                volume: 0.6,
                width: '100%',
                height: '220px',
                controls:true,
                playsinline: !0,
                //fluid: true,
                disableProgress: false,
            });

        };


    };

})();
