<home>
    <section class="home">
        <div class="empty" if="{ !!isLoading }">
            <img src="http://cdn.nzaom.com/home/notice.png?t=1" alt="" />
            <div class="tips">你造么，程序员GG打了个盹</div>
            <p><a href="/">刷新下试试~</a></p>
        </div>
        <section class="home-group" if="{ !isLoading }">
            <div class="item"></div>
        </section>
        <n-tips></n-tips>
    </section>
    <bottom-menu controller="home"></bottom-menu>
    <script>
        var self = this
        var jsloader = require('../common/jsloader.js')
        var notification = require('../common/notification.js')
        var navigation = require('../common/navigation.js')
        var auth = require('../common/auth.js')
        var INTERFACE = require('../common/interface.js')
        var iscrollUtil = require('../common/iscrollUtil.js')
        var DB = require('../common/store.js')
        this.on('mount',function(){
            self.eventBind()
        })
        eventBind(){
        }
    </script>
</home>
