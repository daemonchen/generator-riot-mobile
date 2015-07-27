<bottom-menu>
<style>
    bottom-menu{ position:fixed;z-index:2;bottom:0px;width:100%;height:55px; overflow: hidden; }
    .bottom-menu{background:#f9f9f9;opacity:0.95;border-top:2px solid #eee;padding-left:5%;padding-right:5%;text-align:center;}
    .bottom-menu ul{padding:3px}
    .bottom-menu-item{width:30%;height:60px;display:inline-block;position:relative;line-height:80px;color:#575656;font-size:13px; -webkit-tap-highlight-color: rgba(0,0,0,0); }
    .bottom-menu-item.current{color:#38d5f4}
    .bottom-item-home{background:url("http://cdn.nzaom.com/home/ico_home_black.png?t=1") no-repeat top;background-size:30px}
    .bottom-item-home.current{background:url("http://cdn.nzaom.com/home/ico_home_blue.png?t=1") no-repeat top;background-size:30px}
    .bottom-item-cart{background:url("http://cdn.nzaom.com/home/cart_black.png?t=1") no-repeat top;background-size:30px}
    .bottom-item-cart.current{background:url("http://cdn.nzaom.com/home/cart_blue.png?t=1") no-repeat top;background-size:30px}
    .bottom-item-profile{background:url("http://cdn.nzaom.com/home/ico_me_black.png?t=1") no-repeat top;background-size:30px}
    .bottom-item-profile.current{background:url("http://cdn.nzaom.com/home/ico_me_blue.png?t=1") no-repeat top;background-size:30px}
</style>
    <div class="bottom-menu">
        <ul>
            <li class="bottom-menu-item bottom-item-home {current: opts.controller=='home'} " data-controller="home">首页</li>
            <li class="bottom-menu-item bottom-item-cart  {current: opts.controller=='cart'} " data-controller="cart">购物车</li>
            <li class="bottom-menu-item bottom-item-profile  {current: opts.controller=='user'} " data-controller="user">我</li>
        </ul>
    </div>
<script>
    this.on('mount',function(){
        $('.bottom-menu-item').click(function(){
            $(this).addClass('current').siblings().removeClass('current');
            riot.route($(this).attr('data-controller'));
        })
    })
</script>
</bottom-menu>