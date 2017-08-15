function init() {
    try {
        // 注册事件监听
        function connectWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge)
            } else {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady',
                    function() {
                        callback(WebViewJavascriptBridge)
                    },
                    false
                )
            }
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge)
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback)
            }
            window.WVJBCallbacks = [callback]
            var WVJBIframe = document.createElement('iframe')
            WVJBIframe.style.display = 'none'
            WVJBIframe.src = 'https://__bridge_loaded__'
            document.documentElement.appendChild(WVJBIframe)
            setTimeout(function() {
                document.documentElement.removeChild(WVJBIframe)
            }, 0)
        }

        // 注册回调函数，第一次连接时调用 初始化函数
        connectWebViewJavascriptBridge(function(bridge) {
            // 初始化
            bridge.init(function(message, responseCallback) {
                var data = {
                    'Javascript Responds': 'Wee!'
                }
                responseCallback(data);
            })

            // 接收安卓发来的消息   并返回给安卓通知
            bridge.registerHandler('76', function(data, responseCallback) {
                // alert(data);
                var responseData = '我接受到了安卓的调用'
                responseCallback(responseData)
            })
        })
    } catch (e) {
        console.log("operation error:", e);
    }
}

//获取位置
function prive_getUserPos(obj) {
    try {
        window.WebViewJavascriptBridge.callHandler(
            'getData', {
                'type': 1,
                'data': '获取用户信息地理位置'
            },
            function(responseData) {
                console.log('弹出用户地理位置');
                if (obj.callFun) {
                    obj.callFun(responseData);
                }
                //alert(responseData);

            }
        )
    } catch (e) {
        console.log("获取用户信息地理位置-error:", e);
    }

}
//获取用户信息测试
function prive_getUserInfo(obj) {
    try {
        window.WebViewJavascriptBridge.callHandler(
            'getData', {
                'type': 2,
                'data': '获取用户信息'
            },
            function(responseData) {
                console.log('弹出用户信息')
                if (obj.callFun) {
                    obj.callFun(responseData);
                }
                //alert(responseData);
            }
        )
    } catch (e) {
        console.log("获取用户信息-error:", e);
    }

}
//获取用户设备id
function prive_getUserDeviceId(obj) {
    try {
        window.WebViewJavascriptBridge.callHandler(
            'getData', {
                'type': 3,
                'data': '获取设备id'
            },
            function(responseData) {
                console.log('弹出设备id')
                if (obj.callFun) {
                    obj.callFun(responseData);
                }
                //alert(responseData)
            }
        )
    } catch (e) {
        console.log("获取设备id-error:", e);
    }

}
//获取版本号
function prive_getUserAppVersion(obj) {
    try {
        window.WebViewJavascriptBridge.callHandler(
            'getData', {
                'type': 4,
                'data': '获取版本号'
            },
            function(responseData) {
                //alert('弹出设备id')
                //alert(responseData)
                console.log('弹出设备id')
                if (obj.callFun) {
                    obj.callFun(responseData);
                }
            }
        )
    } catch (e) {
        console.log("获取版本号-error:", e);
    }

}
//保存图片到手机
function prive_saveImg2AppClient(obj) {
    try {
        window.WebViewJavascriptBridge.callHandler(
            'saveImage', obj.data,
            function(responseData) {
                console.log(responseData);
                if (obj.callFun) {
                    obj.callFun(responseData);
                }
            }
        )
    } catch (e) {
        console.log("保存图片-error:", e);
    }

}
//默认显示右上角分享设置
function prive_setAppDefaultShare(obj) {
    try {
        window.WebViewJavascriptBridge.callHandler(
            'pushData', {
                shareStatus: true,
                shareContent: obj.data
            },
            function(responseData) {
                console.log(responseData);
                if (obj.callFun) {
                    obj.callFun(responseData);
                }
                //alert(responseData)
            }
        )
    } catch (e) {
        console.log("设置默认分享-error:", e);
    }

}
//跳转个人中心
function prive_goUserPersonal(obj) {
    try {
        window.WebViewJavascriptBridge.callHandler(
            'gotoNative', {
                type: 1,
                data: {
                    uid: obj.id
                }
            },
            function(responseData) {
                console.log(responseData);
                if (obj.callFun) {
                    obj.callFun(responseData);
                }
                //alert('这个按钮跳转个人中心')
                //alert(responseData)
            }
        )
    } catch (e) {
        console.log("跳转个人中心-error:", e);
    }

}
//跳转视频直播
function prive_goUserLiveRoom(obj) {
    try {
        window.WebViewJavascriptBridge.callHandler(
            'gotoNative', {
                type: 2,
                data: obj.data
            },
            function(responseData) {
                console.log(responseData);
                if (obj.callFun) {
                    obj.callFun(responseData);
                }
                // alert('这里跳转直播间')
                // alert(responseData)
            }
        )
    } catch (e) {
        console.log("跳转直播间-error:", e);
    }

}

function prive_copy2Clipboard(obj) {
    try {
        window.WebViewJavascriptBridge.callHandler(
            'doAction', {
                type: 1,
                content: obj.data.content
            },
            function(responseData) {
                console.log(responseData);
                if (obj.callFun) {
                    obj.callFun(responseData);
                }
                // alert('复制剪贴板成功')
                // alert(responseData)
            }
        )
    } catch (e) {
        console.log("复制到剪贴板-error:", e);
    }

}

//拉起分享,用户点击分享按钮的那种
function prive_activeShareClick(obj) {
    try {
        window.WebViewJavascriptBridge.callHandler(
            'doAction', {
                type: 2,
                shareContent: obj.data
            },
            function(responseData) {
                // alert('调取页面上的分享操作')
                // alert(responseData)
                console.log(responseData);
                if (obj.callFun) {
                    obj.callFun(responseData);
                }
            }
        )
    } catch (e) {
        console.log("分享错误-error:", e);
    }

}
var setTimeoutTime = 1000;
export default {
    //创建与端内连接
    creat() {
        init();
    },
    //检测是否在端内
    getIsApp() {
        var app = window.WebViewJavascriptBridge ? true : false;
        return app;
    },
    //获取位置
    getUserPos(obj) {
        setTimeout(prive_getUserPos(obj), setTimeoutTime);
    },
    //获取用户信息
    getUserInfo(obj) {
        setTimeout(prive_getUserInfo(obj), setTimeoutTime);
    },
    //获取用户设备id
    getUserDeviceId(obj) {
        setTimeout(prive_getUserDeviceId(obj), setTimeoutTime);
    },
    //获取版本号
    getUserAppVersion(obj) {
        setTimeout(prive_getUserAppVersion(obj), setTimeoutTime);
    },
    //保存图片到手机
    saveImg2AppClient(obj) {
        //obj.data.picName 图片名字
        //obj.data.base64 图片的base64
        //obj.callFun 保存成功
        if (obj.data.picName && obj.data.base64) {
            setTimeout(prive_saveImg2AppClient(obj), setTimeoutTime);
        } else {
            if (obj.callFun) {
                obj.callFun("error:", obj.data.picName, ",", obj.data.base64)
            }
        }
    },
    //设置一进页面.title最右边的默认分享 
    setAppDefaultShare(obj) {
        //obj.data.content 分享内容显示
        //obj.data.photo 分享图片
        //obj.data.title 分享标题
        //obj.data.url 地址
        if (obj.data.content && obj.data.photo && obj.data.title && obj.data.url) {
            setTimeout(prive_setAppDefaultShare(obj), setTimeoutTime);
        } else {
            if (obj.callFun) {
                obj.callFun("error:", obj.data.content, ",", obj.data.photo, ",", obj.data.title, ",", obj.data.url);
            }
        }
    },
    //跳转个人中心
    goUserPersonal(obj) {
        //obj.id  跳转的主播id

        if (obj.id) {
            setTimeout(prive_goUserPersonal(obj), setTimeoutTime);
        } else {
            if (obj.callFun) {
                obj.callFun("error:", obj.id);
            }
        }
    },
    //跳转直播间
    goUserLiveRoom(obj) {
        //obj.data.liveid 
        //obj.data.cover .jpg
        //obj.data.liveUrl   .m3u8
        if (obj.data.liveid && obj.data.cover && obj.data.liveUrl) {
            setTimeout(prive_goUserLiveRoom(obj), setTimeoutTime);
        } else {
            if (obj.callFun) {
                obj.callFun("error:", obj.data.liveid, ",", obj.data.cover, ",", obj.data.liveUrl);
            }
        }
    },
    //复制到剪贴板
    copy2Clipboard(obj) {
        //obj.data.content //要复制的内容
        if (obj.data.content) {
            setTimeout(prive_copy2Clipboard(obj), setTimeoutTime);
        } else {
            if (obj.callFun) {
                obj.callFun("error:", obj.data.content);
            }
        }
    },
    //用户点击分享按钮
    activeShareClick(obj) {
        // obj.data.content: 分享内容,
        // obj.data.photo: 分享图标,
        // obj.data.title: 分享标题,
        // obj.data.url: 分享出去之后点击的打开的url
        if (obj.data.content && obj.data.photo && obj.data.title && obj.data.url) {
            setTimeout(prive_activeShareClick(obj), setTimeoutTime);
        } else {
            if (obj.callFun) {
                obj.callFun("error:", obj.data.content);
            }
        }
    }
}