<n-tips>
    <style>
        .n-tips{ width: 100%; position: fixed; left: 0; top: 47%; text-align: center; z-index: 11; }
        .n-tips .n-tips-wrapper{ display: inline-block; background: rgba(0,0,0,0.5); color: #fff; font-size: 14px; padding: 12px; }
    </style>
    <section class="n-tips animated fadeIn" if="{ isShow }">
        <div class="n-tips-wrapper">
            {text}
            <yield/>
        </div>
    </section>
    <script>
        var self = this
        // var notification = require('../../../common/navigation.js')
        this.mixin('notification')
        this.on('tips-show', function(text) {
            self.isShow = true
            self.text = text
            self.update()
        });
        this.on('tips-hide', function() {
            self.isShow = false
            self.text = ""
            self.update()
        });
        this.on('mount', function() {
        });
    </script>
</n-tips>