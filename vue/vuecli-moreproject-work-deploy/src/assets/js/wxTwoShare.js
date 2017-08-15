import webTools from './mytools-v1.0.0';
var _url = window.location.href;
var isArray = function(o) {
    return Object.prototype.toString.call(o) == '[object Array]'
}

function isWeixinBrowser() {
    return /micromessenger/.test(navigator.userAgent.toLowerCase())
}

function wechatShare(jsApiUrl) {
    var options = {
        url: jsApiUrl || webTools.getAjaxApiUrl('wechat/getJsapi.do'),
        type: 'GET',
        data: {
            url: _url
        }
    }

    webTools.xhr(options, function sucess(res) {
        //res = JSON.parse(res)
        if (!res.errno) {
            var _data = res.data
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wxd42f1708840ee63d', // 必填，公众号的唯一标识
                timestamp: _data.timestamp, // 必填，生成签名的时间戳
                nonceStr: _data.nonceStr, // 必填，生成签名的随机串
                signature: _data.signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
            wx.ready(function() {
                console.log('js_ticket 加载成功')
                    // 分享朋友圈
                wx.onMenuShareTimeline({
                        title: m_share_title, // 分享标题
                        link: share_url, // 分享链接
                        imgUrl: avatar, // 分享图标
                        success: function() {
                            console.log("sharesuccess-分享朋友圈");
                            shareSuccess()
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    })
                    // 分享朋友
                wx.onMenuShareAppMessage({
                        title: title, // 分享标题
                        desc: content, // 分享描述
                        link: share_url, // 分享链接
                        imgUrl: avatar, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function() {
                            console.log("sharesuccess-分享朋友");
                            shareSuccess();
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    })
                    // 分享qq
                wx.onMenuShareQQ({
                        title: title, // 分享标题
                        desc: content, // 分享描述
                        link: share_url, // 分享链接
                        imgUrl: avatar, // 分享图标
                        success: function() {
                            console.log("sharesuccess-分享QQ");
                            shareSuccess();
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    })
                    // 分享微博
                wx.onMenuShareWeibo({
                        title: title, // 分享标题
                        desc: content, // 分享描述
                        link: share_url, // 分享链接
                        imgUrl: avatar, // 分享图标
                        success: function() {
                            console.log("sharesuccess-分享微博");
                            shareSuccess();
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    })
                    // 分享QQ空间
                wx.onMenuShareQZone({
                    title: title, // 分享标题
                    desc: content, // 分享描述
                    link: share_url, // 分享链接
                    imgUrl: avatar, // 分享图标
                    success: function() {
                        console.log("sharesuccess-分享QQ空间");
                        shareSuccess();
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                })
            })
        } else {

        }
    }, function(err) {
        console.log(err)
    })
}
// 微信分享
var title = null
var content = null
var avatar = null
var share_url = null

var wechat_share = function(contentUrl, jsApiUrl) {
    if (isWeixinBrowser()) {
        title = m_share_title;
        content = m_share_content;
        avatar = m_share_avatar;
        share_url = m_share_url || window.location.href;

        wechatShare(jsApiUrl)
    }
}

function shareSuccess() {

    if (m_web2log_info) {
        if (isArray(m_web2log_info)) {
            for (var i = 0; i < m_web2log_info.length; i++) {
                webTools.web2log(m_web2log_info[i].sharetype, m_web2log_info[i].data, false);
            }
        } else {
            webTools.web2log(m_web2log_info.sharetype, m_web2log_info.data, false);
        }
    }
}

var m_share_title = "";
var m_share_content = "";
var m_share_avatar = "";
var m_share_url = "";
var m_web2log_info = null;
export default {
    toShare(obj) {
        m_share_title = obj.title;
        m_share_content = obj.content;
        m_share_avatar = obj.avatar;
        m_share_url = obj.url;
        m_web2log_info = obj.web2log; //微信分享成功需要打点
        wechat_share();
    }

}