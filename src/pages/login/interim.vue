<template>
  <div class="interim">
    <div class="titles">
      <div class="titlecontainer" @click="backUserCenter">
        <span  class="left icon-fanhui1"></span>
      </div>
    </div>
    <div class="ganar">
      <p class="logo">1PESO.MX</p>
      <!-- <p>$1 Para ganar</p> -->
    </div>
    <div class="tost">
      <p class="Registrar">¡Estás a 1 Peso de obtener lo que siempre has deseado!</p>
      <p class="credito">Contamos con artículos de gama alta completamente nuevos y entregados totalmente gratis a la puerta de tu casa.</p>
    </div>
    <div class="createuser" @click="toCreatUser">
      <!-- 创建邮箱账户 -->
      <p><span class="email"></span>Regístrate</p>
    </div>
    <div class="hasaccount" @click="toNewLogin">
      <!-- 已有账户？点击这里登录 -->
      <p><span class="tologin">Inicia Sesión</span></p>
    </div>
    <div class="facebooklogin" @click="toFacebookLogin">
      <!-- 已有账户？点击这里登录 -->
      <p><span class="tologin">facebook</span></p>
    </div>
  </div>
</template>

<script>
  import { unionFacebookLogin } from 'api/login'
  export default {
    data () {
      return {
        channelType: ''
      }
    },
    created () {
      [this.channelType, this.channelTag, this.activityType] = [this.$route.query.channelType, this.$route.query.channelTag, this.$route.query.activityType]
    },
    methods: {
      toFacebookLogin () {
        // facebook登录
        let _self = this
        window.FB.getLoginStatus(function (response) {
          if (response.status === 'connected') {
            unionFacebookLogin({
              accessToken: response.authResponse.accessToken
            }).then(res => {
              if (res.data.errCode === _self.$ERR_CODE && res.data.retCode === _self.$RET_CODE) {
                _self.$router.push({path: '/home/' + _self.$i18n.locale, query: {channelType: _self.channelType, channelTag: _self.channelTag}})
              }
            })
          } else {
            window.FB.login(function (responseface) {
              console.log(responseface)
              unionFacebookLogin({
                accessToken: responseface.authResponse.accessToken
              }).then(res => {
                if (res.data.errCode === _self.$ERR_CODE && res.data.retCode === _self.$RET_CODE) {
                  _self.$router.replace({path: '/home/' + _self.$i18n.locale, query: {channelType: _self.channelType, channelTag: _self.channelTag}})
                }
              })
            }, {scope: 'public_profile,email'})
          }
        })
      },
      backUserCenter () {
        this.$router.push({path: '/home/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      toNewLogin () {
        this.$router.push({path: '/newlogin/' + this.$i18n.locale,
          query: {
            channelType: this.channelType,
            channelTag: this.channelTag,
            issueNo: this.$route.query.issueNo,
            activityType: this.activityType
          }})
      },
      toCreatUser () {
        this.$router.push({path: '/newsignin/' + this.$i18n.locale,
          query: {
            channelType: this.channelType,
            channelTag: this.channelTag,
            issueNo: this.$route.query.issueNo,
            activityType: this.activityType
          }})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/mixin"
  .interim
    min-height:100vh
    position:absolute
    width:100%
    .titles
      font-size:$font-meta
      position:fixed
      width:100%
      background:$color-white
      color: $color-general-font
      z-index:100
      .titlecontainer
        height:$meta-height
        line-height:$meta-height
        display:flex
        justify-content:space-between
        // position: relative
        align-items:center
        margin:auto 0.32rem
        .left
          position:absolute
          left:0.25rem
          font-size:0.4rem
          color:$color-meta
    .ganar
      padding-top:0.4rem
      font-size:0.6rem
      color:#333
      font-weight: bold
      text-align:center
      margin-top:0.75rem
      display:flex
      justify-content:center
      align-items:center
      .logo
        // width:1.59rem
        // height:0.7rem
        // bg-image('./img/logo')
        // background-size:1.59rem 0.7rem
        // background-position center
        // background-repeat: no-repeat
    .tost
      text-align:center
      margin-top:0.5rem
      .Registrar
        font-size:0.35rem
        margin:auto 0.2rem
        line-height:0.4rem
      .credito
        font-size:0.24rem
        margin:auto 0.32rem
        line-height:0.4rem
        margin-top:0.3rem
    .createuser
      font-size:0.3rem
      font-weight: bold
      width:6.2rem
      height:1.4rem
      margin: 0.5rem auto
      margin-top:0.6rem
      border-radius:1.4rem
      background:$color-meta
      color:#fff
      p
        text-align:center
        line-height:1.4rem
        position: relative
    .hasaccount
      border:1px solid $color-meta
      height:1.2rem
      line-height:1.2rem
      width:6.2rem
      margin:0 auto
      margin-top:1rem
      font-size:0.33rem
      text-align:center
      border-radius:1.4rem
      bottom:0rem
      color:$color-meta
      font-weight: bold
    .facebooklogin
      height:1.2rem
      line-height:1.2rem
      width:6.2rem
      margin:0 auto
      margin-top:1rem
      font-size:0.33rem
      text-align:center
      border-radius:1.4rem
      bottom:0rem
      color:#fff
      font-weight: bold
      background:#576b95
</style>
