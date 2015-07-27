<n-mask>
    <style>
        .n-mask{ width: 100%; height: 100%; position: absolute; top: 0; bottom: 0; }
        .n-mask .mask{ width: 100%; height: 100%; position: absolute; background: #000; opacity: .7; z-index: 1; }
    </style>
    <section class="n-mask" show="{opts.show_mask}">
        <div class="mask" onclick="{ opts.dismiss }"></div>
        <yield/>
    </section>
    <script>
        this.on('mount update', function() {
            if (!!opts.container) {
                $('.n-mask').height(Math.max($(window).height(), $(opts.container).height()))
                return;
            }
            $('.n-mask').height(Math.max($(window).height(), $('body').height()))
        });
    </script>
</n-mask>