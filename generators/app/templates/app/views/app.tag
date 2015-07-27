<app>
  <div id="view"></div>

  <script>
  var self = this
  self.mountedTag = null

  this.on('mount', function(){
    riot.route.exec(function(controller, id) {
      self.renderView(controller || 'home')
    })
  })

  renderView(controller) {
    this.mountedTag = riot.mount('#view', controller)[0]
    if (!this.mountedTag) {//404 route
        riot.route('home')
    }
  }

  riot.route(function(controller) {
    self.renderView(controller)
    self.update()
  })
  </script>
</app>
