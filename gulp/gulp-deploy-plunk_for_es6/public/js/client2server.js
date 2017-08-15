import $ from 'jquery';
import myTools from './mytools-v1.0.0';

export default {
    //关注操作
    toFollow(_myuserid, _touserid, _successCallback, _errorCallback) {
        var getImg = {
            url: myTools.getAjaxApiUrl("activity/toFollow.do?"),
            type: 'POST',
            data: {
                'uid': _touserid,
                'userid': _myuserid
            }
        }
        myTools.xhr(getImg, function sucess(res) {
            _successCallback(res);
        }, function error(err) {
            _errorCallback(err);
        })
    }
}