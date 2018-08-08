<template>
  <div class="ad" id="ad">
    <div class="adcomtainer">
      <div class="flow">
        <div class="base regis">
          <span class="baseicon icon1"></span>
          <p class="text">Registro</p>
          <span class="arrowbase arrow1"></span>
        </div>
        <div class="base indian">
          <span class="baseicon icon2"></span>
          <p class="text">Selección de regalos</p>
          <span class="arrowbase arrow1"></span>
        </div>
        <div class="base public">
          <span class="baseicon icon3"></span>
          <p class="text">Publicación de los ganadores</p>
          <span class="arrowbase arrow1"></span>
        </div>
        <div class="base entrga">
          <span class="baseicon icon4"></span>
          <p class="text">Entrega a domicilio</p>
        </div>
      </div>
      <div class="top">
        <div class="item">
          <div class="itemcontainer">
            <div class="iconcontainer">
              <span class="icon1"></span>
            </div>
            <p class="text">Garantía de Bienes</p>
          </div>
        </div>
        <div class="item">
          <div class="itemcontainer">
            <div class="iconcontainer">
              <span class="icon2"></span>
            </div>
            <p class="text">Recibe tu Premio de 5 a 10 días</p>
          </div>
        </div>
        <div class="item">
          <div class="itemcontainer">
            <div class="iconcontainer">
              <span class="icon3"></span>
            </div>
            <p class="text">Envío Gratis</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer_top">
          <p>Cooperación</p>
          <div class="logocontainer">
            <div>
              <img class="img1" src="./img/1-1.png" alt="">
              <img class="img2" src="./img/1-2.png" alt="">
            </div>
            <div>
              <img class="img3" src="./img/2-1.png" alt="">
              <img class="img4" src="./img/2-2.png" alt="">
            </div>
            <div>
              <img class="img5" src="./img/3-1.png" alt="">
              <img class="img6" src="./img/3-2.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="serve">
        <p class="service">Comentarios y Sugerencias：serios@1peso.com.mx</p>
        <p class="company">Grupo Financiero Inbursa, SA de CV.</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      showclectcoantiner () {
        // this.setcelectstate(true)
        this.$router.push({path: '/course/' + this.$i18n.locale, query: {channelType: this.$route.query.channelType, channelTag: this.$route.query.channelTag}})
      },
      touserlus () {
        // 前往隐私条款
        this.$router.push({path: '/userlus/' + this.$i18n.locale})
      },
      toprotocol () {
        // 前往隐私条款
        this.$router.push({path: '/protocol/' + this.$i18n.locale})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .ad
    margin-bottom:0.2rem
    // margin-top:-0.5rem
    .adcomtainer
      margin:auto 0.2rem
      .top
        background:#fff
        display:flex
        align-items:center
        justify-content:center
        padding:0.5rem 0
        border-radius:0.1rem
        .item
          padding:0.2rem 0
          width:2.5rem
          height:1.5rem
          box-sizing: border-box
          display:flex
          align-items:center
          justify-content:space-around
          .itemcontainer
            position: relative
            height:1.5rem
            width:2rem
            span
              display:block
              text-align:center
              margin:0 auto
              position:absolute
              top:0
              left:50%
              transform:translateX(-50%)
              height:0.6rem
              background-position:center center
              background-repeat: no-repeat
            .text
              font-size:0.24rem
              color:#666
              height:.5rem
              margin:0 auto
              line-height:0.3rem
              position:absolute
              text-align:center
              bottom:0
              width:100%
            .icon1
              width:0.42rem
              height:0.52rem
              bg-image('img/a')
              background-size: 0.42rem 0.52rem
            .icon2
              width:0.6rem
              height:0.42rem
              bg-image('img/b')
              background-size: 0.6rem 0.42rem
              top:0.1rem
            .icon3
              width:0.53rem
              height:0.64rem
              bg-image('img/c')
              background-size: 0.53rem 0.64rem
      .top>div:not(:last-child)
        border-right:1px solid #f3f3f3
      .footer
        // height:4rem
        background:#fff
        margin-top:0.2rem
        padding-bottom:0.4rem
        border-radius:0.1rem
        .footer_top
          p
            font-size:0.35rem
            color:#333
            text-align:center
            padding-top:0.4rem
          .logocontainer
            margin:auto 0.2rem
            margin-top:0.4rem
            display:flex
            justify-content:space-between
            padding-bottom:0.1rem
            div
              position: relative
              font-size:0
              height:1rem
              width:2rem
              img
                position:absolute
                left:50%
                transform:translateX(-50%)
              .img1
                width:1.18rem
                height:0.33rem
                top:0
              .img2
                width:1.68rem
                height:0.27rem
                bottom:0
              .img3
                width:1.5rem
                height:0.34rem
                top:0
              .img4
                width:1.45rem
                height:0.47rem
                bottom:-0.05rem
              .img5
                width:1.12rem
                height:0.5rem
                top:-0.05rem
              .img6
                width:1.58rem
                height:0.33rem
                bottom:0
          .service
            font-size:0.24rem
            padding:0
            margin-top:0.3rem
            color:#999
            text-align:center
          .company
            font-size:0.24rem
            color:#999
            padding:0
            margin-top:0.2rem
            text-align:center
      .serve
        font-size:0.24rem
        color:#fff
        text-align:center
        line-height:0.5rem
        margin-top:0.2rem
      .flow
        background:#fff
        margin-top:0.2rem
        margin-bottom:0.2rem
        display:flex
        justify-content:space-around
        padding: 0.5rem 0
        border-radius:0.1rem
        .base
          width:25%
          position: relative
          height:1.5rem
          span
            display:inline-block
          .baseicon
            background-position:center center
            background-repeat: no-repeat
            position:absolute
            top:0
            left:50%
            transform:translateX(-50%)
          .icon1
            background-size: 0.51rem 0.53rem
            bg-image('./img/h')
            width:0.51rem
            height:0.53rem
          .icon2
            background-size: 0.39rem 0.52rem
            bg-image('./img/g')
            width:0.39rem
            height:0.52rem
          .icon3
            background-size: 0.51rem 0.51rem
            bg-image('./img/e')
            width:0.51rem
            height:0.51rem
          .icon4
            background-size: 0.6rem 0.42rem
            bg-image('./img/b')
            width:0.6rem
            height:0.42rem
            top:0.1rem
          .text
            font-size:0.24rem
            color:#666
            height:.5rem
            margin:0 auto
            line-height:0.3rem
            position:absolute
            text-align:center
            bottom:0
            width:100%
          .arrowbase
            display:inline-block
            width:0.57rem
            height:0.21rem
            bg-image('./img/k')
            background-position:center center
            background-repeat: no-repeat
            background-size: 0.57rem 0.21rem
            position:absolute
          .arrow1
            top:0.2rem
            right:-0.3rem
</style>

