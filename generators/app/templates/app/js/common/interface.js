var _debug = false; //上线的时候改成false
var DOMAIN = 'http://www.server.com';
DOMAIN = !!_debug ? 'http://192.168.1.131:8888' : DOMAIN
var INTERFACE = {
    jssign: DOMAIN + '/api/weixin/jssign',
}

module.exports = INTERFACE;