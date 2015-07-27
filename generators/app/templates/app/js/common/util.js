// 工具函数在这里，在这里
module.exports = {
    parseURL: function(url) {
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function() {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1')
        };
    },
    ellipsisString: function(string, number, ellipsis) {
        var number = number ? number : 30;
        var ellipsis = ellipsis ? ellipsis : '...';
        return string.substring(0, number) + ellipsis;
    },
    os: {
        isAndroid: function() {
            return /Android/i.test(navigator.userAgent);
        },
        isBlackBerry: function() {
            return /BlackBerry/i.test(navigator.userAgent);
        },
        isiOS: function() {
            return /iPhone|iPad|iPod/i.test(navigator.userAgent);
        },
        isWindows: function() {
            return /IEMobile/i.test(navigator.userAgent);
        }
    }
}