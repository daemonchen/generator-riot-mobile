var riot = require('riot');
var util = require('./util.js');
var DB = require('./store.js');
module.exports = {
    stacks: [],
    init: function() {
        if (!!this.stacksDB) {
            return;
        }
        this.stacksDB = DB('nzaom-navigation-db');
        this.stacks = this.stacksDB.get();
        if (Object.prototype.toString.call(this.stacks) != '[object Array]') {
            this.stacks = [];
        }
    },
    push: function(page) {
        if (!this.stacksDB) {
            this.init();
        }
        var lastPage = util.parseURL(location.href).hash;
        (!lastPage) && (lastPage = "home");
        this.stacks.push(lastPage);
        this.stacksDB.put(this.stacks);
        riot.route(page);
    },
    pop: function(parent) {
        if (this.stacks.length > 0) {
            var controller = this.stacks.pop();
            this.stacksDB.put(this.stacks);
            riot.route(controller);
            return;
        };
        if (!!parent) { //如果当前页面不是push进来的，而是用户直接打开的，那么就pop到这个页面默认的父页面
            riot.route(parent);
            return;
        }
    },
    clean: function() {
        this.stacksDB = DB('nzaom-navigation-db');
        this.stacks = [];
        this.stacksDB.put(this.stacks);
    }
}