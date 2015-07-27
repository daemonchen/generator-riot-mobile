<navigation>
    <style>
        .navigation{width:100%;height:48px;background:#212121;color:#fff;font-size:15px;line-height:48px; position: relative; }
        .navigation .back-btn{ height: 48px; float: left; text-align: center; padding-top: 3px; cursor: pointer; }
        .navigation .back-btn img{height:42px;margin-right:0; margin-top:3px; position:relative; float: left; display: block; }
        .navigation .back-btn span{ float: left; display: block; }
    </style>
        <div class="navigation clearfix">
            <div class="back-btn" onclick="{ pop }">
                <img src="http://cdn.nzaom.com/navigation/arrow.png?t=1"/>
                <span>{opts.title}</span>
            </div>
            <yield/>
        </div>
    <script>
        var navigation = require('../../js/common/navigation.js')
        this.on('mount update', function() {
            navigation.init()
        })
        pop(){
            navigation.pop(opts.parent)
        }
    </script>
</navigation>