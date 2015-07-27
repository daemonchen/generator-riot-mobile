<n-avatar>
    <style>
        .n-avatar{ width: 60px; }
        .n-avatar .input-btn{ display: none;}
        .n-avatar img.avatar-image{ width:48px; height: 48px; margin-top: 6px; }
    </style>
    <section class="n-avatar">
        <img class="avatar-image" src="{opts.avatar}" />
        <input type="file" accept="image/*;capture=camera" onchange="{ fileReaderHandler }" class="input-btn" />
    </section>
    <script>
        var self = this
        this.afterFileChange = opts.after_file_change
        this.on('mount', function() {
            self.eventBind()
        })
        eventBind(){
            $('.n-avatar .avatar-image').click(function(){
                $('.n-avatar .input-btn').trigger('click')
            })
        }
        fileReaderHandler(e){
            var file = e.target.files[0]
            var reader = new FileReader()
            reader.onload=function(){
                var url = reader.result;
                self.storeAvatarDataToDom(url)
                self.afterFileChange()
            }
            reader.readAsDataURL(file)
        }
        storeAvatarDataToDom(data){
            if ($('#avatar-hidden-data').length > 0) {
                $('#avatar-hidden-data').text(data)
            }else{
                var hiddenDataSpan = $('<span style="display:none;" id="avatar-hidden-data"></span>').text(data)
                $('body').append(hiddenDataSpan)

            }
        }
    </script>
</n-avatar>