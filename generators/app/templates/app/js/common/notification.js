var riot = require('riot');
var notification = riot.observable();

notification.tips = {
    show: function(text, delay) {
        var self = this
        var delay = delay || 3000
        notification.trigger('tips-show', text)
        setTimeout(function() {
            self.hide()
        }, delay)
    },
    hide: function() {
        notification.trigger('tips-hide')
    }
}

notification.confirm = {
    show: function(text, callback) {
        notification.trigger('confirm-show', {
            text: text,
            callback: callback
        })
    },
    hide: function() {
        notification.trigger('confirm-hide')
    }
}

riot.mixin('notification', notification);
module.exports = notification;