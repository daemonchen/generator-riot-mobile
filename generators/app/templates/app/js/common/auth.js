// Login API

var riot = require('riot');

var DB = require('./store.js');
var nzaomUserDB = DB('nzaom-user');

var INTERFACE = require('./interface.js');
var notification = require('./notification.js');

var auth = riot.observable();

auth.userObj = nzaomUserDB.get();

/*
    userObj = {
        returnUrl: '',
        xAuthToken: '',
        isLogin: false

    }
*/
auth.login = function(params) {
    $.ajax({
        type: "POST",
        url: INTERFACE.login,
        data: JSON.stringify(params),
        success: function(response, status, xhr) {
            if (response.code != '2000' && response.msg) {
                auth.trigger('login-fail', response)
                notification.tips.show(response.msg, 3000);
                return
            }
            self.setXauthToken(response.result, function() {
                auth.trigger('login-success', response);
            })
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            auth.trigger('login-fail', response)
        }
    })
}

auth.register = function(params) {
    var self = this;
    $.ajax({
        type: "POST",
        url: INTERFACE.register,
        data: JSON.stringify(params),
        success: function(response, status, xhr) {
            if (response.code != '2000' && response.msg) {
                auth.trigger('register-fail', response)
                notification.tips.show(response.msg, 3000);
                return
            };
            self.setXauthToken(response.result, function() {
                auth.trigger('register-success', response);
            })
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            auth.trigger('register-fail', response)
        }
    })
}

auth.cleanAuth = function() {
    auth.userObj.isLogin = false;
    auth.userObj.xAuthToken = '';
    auth.setAjax();
    nzaomUserDB.put(auth.userObj);
}

auth.setAjax = function() { //如果接口需要登录，需要调用一次，以确保总是能够拿到最新的xAuthToken
    if ($.ajaxSetup) {
        $.ajaxSetup({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-Request-With', null)
                xhr.setRequestHeader('x-platform', 'H5')
                xhr.setRequestHeader('x-auth-token', auth.userObj.xAuthToken || '')
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            contentType: 'application/json'
        });
    } else { //for zepto
        $.ajaxSettings = $.extend($.ajaxSettings, {
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-Request-With', null)
                xhr.setRequestHeader('x-platform', 'H5')
                xhr.setRequestHeader('x-auth-token', auth.userObj.xAuthToken || '')
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            contentType: 'application/json'
                // whatever
        });
    }
}

auth.setXauthToken = function(token, cb) {
    this.userObj.isLogin = true;
    this.userObj.xAuthToken = token;
    this.setAjax();
    nzaomUserDB.put(this.userObj);
    !!cb && cb()
}

riot.mixin('auth', auth);

module.exports = auth;