// 引入riot
var riot = require('riot');

var navigation = require('./common/navigation.js')
navigation.clean();


// 业务视图
var app = require('../views/app.tag');
var home = require('../views/home.tag');
var cart = require('../views/cart/cart.tag');
var user = require('../views/user/user.tag');

// 公共组件
var bottomMenu = require('../views/common/bottom-menu.tag');
var navigationTag = require('../views/common/navigation.tag');

// util 下是工具组件
var nButton = require('../views/common/util/n-button.tag');
var nMask = require('../views/common/util/n-mask.tag');
var nAvatar = require('../views/common/util/n-avatar.tag');
var nTips = require('../views/common/util/n-tips.tag');
var nConfirm = require('../views/common/util/n-confirm.tag');
var nRaw = require('../views/common/util/n-raw.tag');

riot.mount('app');