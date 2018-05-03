<template>
  <div class="interim">
    <div class="titles">
      <span @click="backUserCenter" class="left icon-fanhui1"></span>
    </div>
    <div class="ganar">
      <p>$1.00 Para ganar</p>
    </div>
    <div class="createuser" @click="toCreatUser">
      <!-- 创建邮箱账户 -->
      <p><span class="email"></span>{{$t('newLogin.creatAccount')}}</p>
    </div>
    <div class="hasaccount" @click="toNewLogin">
      <!-- 已有账户？点击这里登录 -->
      <p>{{$t('newLogin.hasAccount')}}<span class="tologin">{{$t('newLogin.tologin')}}</span></p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      backUserCenter () {
        this.$router.back()
      },
      toNewLogin () {
        this.$router.push('/newlogin/' + this.$i18n.locale)
      },
      toCreatUser () {
        this.$router.push('/newsignin/' + this.$i18n.locale)
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
      height:$meta-height
      padding: 0 0.32rem 0 0.32rem
      display:flex
      justify-content:space-between
      align-items:center
      position:fixed
      width:6.86rem
      background:$color-white
      color: $color-general-font
      z-index:100
      .left
        position:absolute
        padding:0.25rem 0.3rem 0.25rem 0.25rem
        left:0
        font-size:0.4rem
        color:$color-meta
    .ganar
      padding-top:0.9rem
      font-size:0.6rem
      color:#cccccc
      font-weight: bold
      text-align:center
      margin-top:0.5rem
    .createuser
      font-size:0.24rem
      font-weight: bold
      width:6.2rem
      height:1.4rem
      margin: 0.5rem auto
      margin-top:2.4rem
      border-radius:1.4rem
      box-shadow:1px 1px 25px #bbb
      // position: relative
      p
        text-align:center
        line-height:1.4rem
        position: relative
      .email
        position:absolute
        display:inline-block
        width:0.58rem
        height:0.46rem
        bg-image('../../common/image/email')
        background-size: cover
        top:50%
        transform:translateY(-50%)
        left:0.3rem
        font-weight: bold
    .hasaccount
      position:absolute
      height:1rem
      line-height:1rem
      width:100%
      font-size:0.24rem
      text-align:center
      bottom:0rem
      color:#333
      font-weight: bold
      .tologin
        color:$color-sky-blue
</style>
