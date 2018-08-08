<template>
  <div class="ad" id="ad">
    <div class="adcomtainer">
      <div class="collect">
        <span></span>
        <p class="netadds">1PESO.MX</p>
        <span></span>
      </div>
      <div class="footer">
        <div class="footer_top">
          <p>Síguenos</p>
          <div class="logocontainer">
            <!-- @click="shareFacebook" -->
            <a class="facebook" href="https://www.facebook.com/1peso.mx/" target="_bank"></a>
            <!-- <span class="twitter" @click="shareTwitter" id="new-button"></span> -->
            <a class="twitter" href=" https://twitter.com/1pesoMX" target="_bank"></a>
          </div>
        </div>
      </div>
      <div class="top">
        <div class="item">
          <div class="itemcontainer">
            <div class="iconcontainer">
              <span class="icon1"></span>
            </div>
            <p class="text">100% justo</p>
          </div>
        </div>
        <div class="item">
          <div class="itemcontainer">
            <div class="iconcontainer">
              <span class="icon2"></span>
            </div>
            <p class="text">100% original garantizado</p>
          </div>
        </div>
        <div class="item">
          <div class="itemcontainer">
            <div class="iconcontainer">
              <span class="icon3"></span>
            </div>
            <p class="text">Envío gratis dentro del país</p>
          </div>
        </div>
      </div>
      <div class="download">
        <p>Descargar la app</p>
        <div class="downloadicon">
          <span class="base ios" @click="showDiago(0)"></span>
          <!-- <span class="android"></span> -->
          <a class="base android" href="http://mx-common.oss-us-west-1.aliyuncs.com/igou_apk/igou_android_20180802012654.apk"></a>
        </div>
      </div>
      <div class="payway">
        <p>Formas de pago</p>
        <span class="paylogo"></span>
      </div>
      <div class="secreto">
        <ul class="secretolist">
          <li @click="touserlus">Términos de uso</li>
          <span></span>
          <li @click="toprotocol">Políticas de privacidad</li>
          <span></span>
          <li @click="toHelp">Ayuda</li>
          <!-- <li>Preguntas frecuentes</li> -->
        </ul>
        <p class="Nombre">Nombre de la compañía：RIMBO TECH SA DE CV</p>
        <p>Dirección de la oficina registrada：169 Blvd. Miguel de Cervantes Saavedra, 11520 Mexico City, Distrito Federal </p>
        <!-- <p>Reforma Polanco, C.P. 11560, CDMX</p> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        diagostate: false
      }
    },
    methods: {
      showDiago (type) {
        if (this.$ga) {
          this.$ga.event({
            eventCategory: 'APP下载按钮次数',
            eventAction: type,
            // 上报充值自定义金额
            eventLabel: ``,
            eventValue: 0
          })
        }
        this.setDownLoadState(true)
      },
      shareFacebook () {
        window.FB.ui({
          method: 'share',
          // mobile_iframe: true,
          href: 'https://1peso.mx'
          // href: 'https://1peso.mx'
        }, function (response) {
          if (response && !response.error_message) {
            console.log('success')
          } else {
            console.log('error')
          }
        })
      },
      shareTwitter () {
        const twTitle = 'ICUALQUIER PRODUCTO PUEDE SER TUYO POR ¡SÓLO I PESO！'
        const twUrl = 'https://1peso.mx'
        window.open(`https://twitter.com/intent/tweet?text=${twTitle}&url=${twUrl}`, 'sharer', 'toolbar=0,status=0,width=626,height=436')
      },
      shareWhatsapp () {},
      showclectcoantiner () {
        this.$router.push({path: '/course/' + this.$i18n.locale, query: {channelType: this.$route.query.channelType, channelTag: this.$route.query.channelTag}})
      },
      toHelp () {
        // 前往帮助中心
        this.$router.push({path: '/help/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      touserlus () {
        // 前往隐私条款
        this.$router.push({path: '/userlus/' + this.$i18n.locale})
      },
      toprotocol () {
        // 前往隐私条款
        this.$router.push({path: '/protocol/' + this.$i18n.locale})
      },
      ...mapMutations({
        setDownLoadState: 'SET_DOWN_LOAD'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .ad
    margin-bottom:0.2rem
    position: relative
    .adcomtainer
      // margin:auto 0.2rem
      .top
        background:#fff
        display:flex
        align-items:center
        justify-content:center
        padding:0.2rem 0
        margin: auto 0.2rem
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
            height:1.2rem
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
              width:0.57rem
              height:0.35rem
              bg-image('img/balance')
              background-size: 0.57rem 0.35rem
              top:0.05rem
            .icon2
              width:0.42rem
              height:0.52rem
              bg-image('img/safety')
              background-size: 0.42rem 0.52rem
              // top:0.1rem
            .icon3
              width:0.60rem
              height:0.42rem
              bg-image('img/car')
              top:0.05rem
              background-size: 0.60rem 0.42rem
      .top>div:not(:last-child)
        border-right:1px solid #f3f3f3
      .collect
        height:1rem
        line-height:1rem
        display:flex
        justify-content:space-around
        align-items:center
        p
          font-size:0.3rem
          text-align:center
        .netadds
          color:#333
          font-size:0.42rem
          font-weight: bold
        span
          display:inline-block
          width:1.8rem
          border-bottom:1px solid #666
      .footer
        background:#fff
        margin:0.2rem
        margin-top:0
        border-radius:0.1rem
        .footer_top
          p
            font-size:0.24rem
            color:#333
            // margin-left:0.3rem
            text-align:center
            padding-top:0.4rem
          .logocontainer
            margin:auto 0.2rem
            margin-top:0.2rem
            display:flex
            justify-content:space-around
            padding-bottom:0.3rem
            // border-bottom:1px solid #ccc
            a:hover, a:visited, a:link, a:active
              text-decoration:underline
              background-repeat:no-repeat
              background-position: center
            span
              display:inline-block
              background-position: center
              background-repeat:no-repeat
            .facebook
              width:0.75rem
              height:0.75rem
              background-size:0.75rem 0.75rem
              bg-image('./img/Facebook')
            .twitter
              width:0.85rem
              height:0.71rem
              background-size:0.85rem 0.71rem
              bg-image('./img/Twitter')
              text-decoration:underline
            .whatsapp
              width:0.77rem
              height:0.76rem
              background-size:0.77rem 0.76rem
              bg-image('./img/whatsapp')
          .service
            font-size:0.24rem
            padding:0
            // margin-top:0.3rem
            color:#999
            text-align:left
            margin-left:0.6rem
          .company
            font-size:0.24rem
            color:#999
            padding:0
            margin-top:0.2rem
            text-align:left
            margin-left:0.6rem
            line-height:0.4rem
          .secreto
            display:flex
            margin-top:0.1rem
            margin-left:0.5rem
            .secretoitem
              height:1.1rem
              display:flex
              align-items:center
            .secretoitem>p
              padding:0
              padding:0 0.1rem
              font-size:0.24rem
              height:0.3rem
            .secretoitem>.p1
              border-right:1px solid #ccc
      .download
        background:#fff
        margin:0.2rem
        font-size:0.24rem
        text-align:center
        padding:0.3rem 0
        .downloadicon
          display:flex
          justify-content: space-around
          margin-top:0.35rem
          .base
            display:inline-block
            width:2.2rem
            height:0.7rem
            background-position: center
            background-repeat: no-repeat
            background-size:2.2rem 0.7rem
          .ios
            bg-image('./img/ios')
          .android
            bg-image('./img/android')
      .payway
        background:#fff
        margin:0.2rem
        font-size:0.24rem
        text-align:center
        padding:0.3rem 0
        .paylogo
          margin-top:0.4rem
          display:inline-block
          width:6.86rem
          height:0.7rem
          background-position: center
          background-repeat: no-repeat
          background-size:6.86rem 0.7rem
          bg-image('./img/payway')
      .secreto
        margin:auto 0.5rem 
        font-size:0.2rem
        padding:0.3rem 0
        .secretolist
          display:flex
          justify-content: space-around
          li
            text-align:center
          span
            border-left:1px solid #666
        p
          text-align:center
          // line-height:0.4rem
          // margin-top:0.25rem
          line-height:0.3rem
        .Nombre
          margin-top:0.25rem
</style>

