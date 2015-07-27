<n-confirm>
    <style>
        .n-confirm{ width: 100%; position: fixed; left: 0; top: 37%; text-align: center; z-index: 11; }
        .n-confirm .n-confirm-wrapper{ display: inline-block; width: 85%; background: #fff; color: #212121; font-size: 14px; padding: 20px; box-shadow: 0 0 15px rgba(0,0,0,0.2); }
        .n-confirm .n-confirm-wrapper .content{ padding: 20px; background: transparent; }
        .n-confirm .n-confirm-wrapper .button-wrapper{ padding-top: 10px; }
        .n-confirm n-button{ width: 47%; display: block; float: left; }
        .n-confirm n-button.fr{ float: right; }
        .n-confirm .n-confirm-wrapper .button-wrapper .btn{ width: 100%; padding: 0 10px; }
    </style>
    <section class="n-confirm animated fadeIn" if="{ isShow }">
        <div class="n-confirm-wrapper">
            <div class="content">{text}</div>
            <div class="button-wrapper">
                <n-button title="确 定" clazz="btn btn-black" onclick="{ doCallback }"></n-button>
                <n-button title="取 消" clazz="btn btn-gray-border" onclick="{ hide }" class="fr"></n-button>
            </div>
        </div>
    </section>
    <script>
        var self = this
        this.mixin('notification')
        this.on('confirm-show', function(options) {
            self.isShow = true
            self.text = options.text
            self.doCallback = options.callback
            // self.doCancelCallback = options.doCancelCallback
            self.update()
        });
        this.on('confirm-hide', function() {
            self.isShow = false
            self.text = ""
            self.doCallback = null
            // self.doCancelCallback = null
            self.update()
        });
        hide(){
            self.isShow = false
            self.text = ""
            self.doCallback = null
            // self.doCancelCallback = null
            self.update()
        }
        this.on('mount', function() {
        });
    </script>
</n-confirm>