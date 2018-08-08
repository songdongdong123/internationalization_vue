<template>
  <div class="recordlist">
    <div class="title">
      <div class="titlecontainer">
        <span @click="backUserCenter" class="left icon-fanhui1"></span>
        <!-- 夺宝记录 -->
        <p>Guardar</p>
      </div>
    </div>
    <scroll
      :listenScroll="listenScroll"
      class="container"
    >
      <div>
        <p class="containertitle">Puede visitar y marcar “$1 para ganar” de las siguientes maneras</p>
        <div class="imglist">
          <ul class="list">
            <li class="item">
              <p>1,Ingresar directamente 1peso.mx</p>
              <img class="img1" src="./img/1.png" alt="">
            </li>
            <li class="item">
              <p>2.Guardar el nombre de dominio</p>
              <img class="img2" src="./img/2.png" alt="">
            </li>
            <li class="item items">
              <img class="img3" src="./img/3.png" alt="">
            </li>
            <li class="item">
              <p>3,Agregar al escritorio de celular</p>
              <img class="img4" src="./img/4.png" alt="">
            </li>
            <li class="item">
              <p>4.Encontrarnos en Noticias Águila</p>
              <img class="img5" src="./img/5.png" alt="">
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  export default {
    data () {
      return {
        imglist: [1, 2, 3, 4],
        listenScroll: true
      }
    },
    created () {
      if (this.$ga) {
        this.$ga.event({
          eventCategory: '渠道',
          eventAction: '进入教程页面',
          // 上报充值自定义金额
          eventLabel: this.$route.query.channelTag ? this.$route.query.channelTag : '6_7_0_0',
          eventValue: 0
        })
      }
    },
    methods: {
      backUserCenter () {
        this.$router.back()
      }
    },
    components: {
      scroll
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .recordlist
    color:$color-general-font
    background:#6699cc
    min-height:100vh
    position:absolute
    width:100%
    .title
      font-size:$font-meta
      height:$meta-height
      line-height:$meta-height
      position:fixed
      width:100%
      background:$color-white
      color: $color-general-font
      z-index:1001
      border-bottom:1px solid $color-border
      .titlecontainer
        display:flex
        justify-content:space-between
        align-items:center
        margin:auto 0.32rem
        .left
          position:absolute
          padding:0 0.3rem 0 0.25rem
          left:0
          font-size:0.4rem
          color:$color-meta
        p
          text-align:center
          width:100%
    .container
      margin-top:0.9rem
      height:10rem
      .containertitle
        font-size:0.3rem
        color:#fff
        text-align:center
        padding:0.35rem 0.4rem 0 0.4rem
        line-height:0.3rem
      .imglist
        .list
          .item
            position: relative
            text-align:center
            margin-top:0.8rem
            p
              color:#fff
              font-size:0.24rem
              margin-bottom:0.5rem
            img
              height:6.45rem
              // position:absolute
              top:0
            .img1
              width:3.48rem
            .img2
              width:3.79rem
              margin-left:0.5rem
            .img3
              width:3.26rem
            .img4
              width:4.03rem
              margin-left:0.75rem
            .img5
              width:4.06rem
              height:13.5rem
              margin-left:0.5rem
          .items
            margin:0
</style>
