import $ from 'jquery';
var util = {
    ua: function() {
        return navigator.userAgent.toLowerCase()
    },
    isIphone: function(ua) {
        return /iphone|ipad|ipod/.test(ua)
    },
    isAndroid: function(ua) {
        return /android/.test(ua)
    },
    isWechat: function(ua) {
        return ua.match(/MicroMessenger/i) == 'micromessenger'
    }
};
export default {
    //检测手机
    detect_phone_number(_val) {
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|(18[0-9]{1}))+\d{8})$/
        if (!myreg.test(_val)) {
            return false
        }
        return true
    },
    //读取cookid方法
    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    // 读取url参数方法
    get_URL_query(name) {
        if (name === "undefined" || name === undefined) {
            var url = location.search; //获取url中"?"符后的字串   
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                let strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;

        } else {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
            var r = window.location.search.substr(1).match(reg)
            if (r != null) return unescape(r[2]);
            return null
        }
    },
    // ajax 公共方法
    xhr(options, success_callback, error_callback) {
        return $.ajax({
            url: options.url,
            type: options.type || 'GET',
            dataType: 'json',
            data: options.data,
            success: function(data) {
                success_callback(data)
            },
            error: function(err) {
                error_callback(err)
            }
        })
    },
    //去下载客户端
    goToDownLoadClient() {
        window.location.href = 'http://html5.dreamlive.tv/config/download.php'
    },
    // ios跳转客户端
    gotoClient(options) {
        var _options = $.extend({}, options)
        var _cover = _options.cover
        var _liveid = _options.liveid
        var _avatar = _options.avatar
        var _anchorId = _options.anchorId
        var _name = _options.name
        var _liveUrl = _options.liveUrl
        window.location.href = 'http://www.dreamlive.tv/room/enter.php?cover=' + _cover + '&liveid=' + _liveid + '&avatar=' + _avatar + '&anchorId=' + _anchorId + '&name=' + _name + '&liveUrl=' + _liveUrl;
    },
    //拼ajax地址
    getAjaxApiUrl(_api) {
        var activity_str = "activity.dreamlive.tv";
        var html5_str = "html5.dreamlive.tv";
        var ishttps = 'https:' == document.location.protocol ? true : false;
        if (window.location.href.indexOf(activity_str) > 0) {
            if (ishttps) {
                return "https://activity.dreamlive.tv/" + _api;
            } else {
                return "http://activity.dreamlive.tv/" + _api;
            }

        } else if (window.location.href.indexOf(html5_str) > 0) {
            if (ishttps) {
                return 'https://html5.dreamlive.tv/activity/' + _api;
            } else {
                return 'http://html5.dreamlive.tv/activity/' + _api;
            }

        } else {
            if (ishttps) {
                return "https://activity.dreamlive.tv/" + _api;
            } else {
                return "http://activity.dreamlive.tv/" + _api;
            }

        }

    },
    //打点公共方法 type - 例:"h5_banner"  obj-打点传参   isload-点打完跳转下载.
    web2log(type, obj, isload, _callfun) {
        var options = {};
        var newobj = $.extend(options, obj);
        var geturl = '';
        if (!/^http:\/\//.test(type)) {
            var ishttps = 'https:' == document.location.protocol ? true : false;
            if (ishttps) {
                geturl = "https://log.dreamlive.tv/" + type
            } else {
                geturl = "http://log.dreamlive.tv/" + type
            }

        } else {
            geturl = type
        }
        $.get(geturl, newobj,
            function(data) {
                if (_callfun) {
                    _callfun(data)
                }

                if (isload) {
                    window.location.href = 'http://html5.dreamlive.tv/config/download.php';
                }
            });
    },
    // 小的提示 公共方法
    alert_layer_war(_str) {
        /*
        页面需要引用
        <link href="https://cdn.bootcss.com/layer/3.0.1/mobile/need/layer.min.css" rel="stylesheet">
        <script src="https://cdn.bootcss.com/layer/3.0.1/mobile/layer.min.js"></script>
        */
        layer.open({
            skin: 'msg',
            content: _str,
            time: 2
        })
    },
    //检测是否是iphone
    checkIsIphone() {
        return util.isIphone(util.ua());
    },
    //检测是否是安卓
    checkIsAndroid() {
        return util.isAndroid(util.ua());
    },
    checkisWechat() {
        return util.isWechat(util.ua());
    }



}