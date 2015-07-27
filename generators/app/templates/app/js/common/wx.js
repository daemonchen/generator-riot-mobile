var INTERFACE = require('./interface.js')
var notification = require('./notification.js')
var WeChatObj = {
    signatureUrl: '',
    init: function(obj) {
        this.eventBind();
        this.fetchConfig();
        this.hasConfigWx = false;
    },
    fetchConfig: function() {
        var self = this;
        this.signatureUrl = location.href.split('#')[0];
        var params = JSON.stringify({
            url: this.signatureUrl
        });
        $.ajax({
            type: "POST",
            url: INTERFACE.jssign,
            data: params,
            success: function(response, status, xhr) {
                if (response.code != '2000' && response.msg) {
                    notification.tips.show(response.msg, 3000)
                    return
                };
                self.setConfig(response.result)
            }
        });
    },
    setConfig: function(obj) {
        this.timestamp = obj.timestamp;
        this.nonceStr = obj.nonceStr;
        wx.config({
            debug: false,
            appId: "yourAppIdStuff",
            timestamp: obj.timestamp,
            nonceStr: obj.nonceStr,
            signature: obj.signature,
            jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'chooseImage',
                    'uploadImage',
                    'chooseWXPay'
                ] // 功能列表，我们要使用JS-SDK的什么功能
        });
    },
    eventBind: function() {
        var self = this;
        wx.ready(function() {
            self.hasConfigWx = true;
        });
    }
}

module.exports = WeChatObj;