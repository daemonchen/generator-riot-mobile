<home>
    <section class="home">
        <div class="empty" if="{ !!isLoading }">
            <img src="http://cdn.nzaom.com/home/notice.png?t=1" alt="" />
            <div class="tips">你造么，程序员GG打了个盹</div>
            <p><a href="/">刷新下试试~</a></p>
        </div>
        <section class="home-group" if="{ !isLoading }">
            <div class="item">
                <div class="title">n-button</div>
                <n-button title="按钮文案" clazz="btn btn-black"></n-button>
            </div>
        </section>
        <n-tips></n-tips>
    </section>
    <bottom-menu controller="home"></bottom-menu>
    <script>
        var self = this
        var jsloader = require('../js/common/jsloader.js')
        var notification = require('../js/common/notification.js')
        var navigation = require('../js/common/navigation.js')
        var auth = require('../js/common/auth.js')
        var INTERFACE = require('../js/common/interface.js')
        var DB = require('../js/common/store.js')
        this.on('mount',function(){
            self.eventBind()
        })
        eventBind(){
        }
    </script>
</home>
