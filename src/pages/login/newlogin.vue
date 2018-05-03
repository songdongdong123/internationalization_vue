<template>
  <div class="newsignin">
    <div class="title">
      <span @click="backUserCenter" class="left icon-fanhui1"></span>
    </div>
    <div class="container">
      <p class="createtitle">$1.00 Para ganar</p>
      <div class="email border-1px">
        <input type="text" :placeholder="$t('login.username_text')" v-model="username">
        <div class="clear" @click="clearContent(1)" v-show="username">
          <span></span>
        </div>
      </div>
      <div class="password">
        <input 
          :type="type" :placeholder="$t('login.password_text')" v-model="password">
        <div class="clear" @click="clearContent(2)" v-show="password">
          <span></span>
        </div>
        <div class="show" @click="showPassword" v-show="password">
          <span></span>
        </div>
      </div>
      <p class="olvide" @click="toForgotPass">Olvide mi contraseña</p>
      <div class="signinbtn" @click="getSecretStr">
        <!-- 登录 -->
        <p>{{$t('login.login_text')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { loginIn, getLoginSecret } from 'api/login'
  import md5 from 'js-md5'
  export default {
    data () {
      return {
        choosed: true,
        username: '',
        password: '',
        type: 'password'
      }
    },
    methods: {
      toForgotPass () {
        this.$router.push('/newforgot/' + this.$i18n.locale)
      },
      backUserCenter () {
        this.$router.back()
      },
      clearContent (type) {
        // 清除内容
        if (type === 1) {
          this.username = ''
        } else {
          this.password = ''
        }
      },
      showPassword () {
        // 显示密码
        this.type = this.type === 'password' ? 'text' : 'password'
        console.log(this.type)
      },
      getSecretStr () {
        // 获取登录的检验串
        getLoginSecret().then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            let secretValue = res.data.data.secretValue
            let secretKey = res.data.data.secretKey
            this._loginIn(secretValue, secretKey)
          } else {
            this.$toast({
              message: res.data.msg,
              duration: 2000
            })
          }
        })
      },
      _loginIn (secretValue, secretKey) {
        this.$loading({state: true})
        loginIn({
          loginKey: this.username,
          loginExt: md5(md5(this.password) + secretValue),
          userType: 1002,
          loginType: 1,
          secretKey: secretKey,
          autoJump: 0
        }).then(res => {
          this.$loading({state: false})
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            // 登录成功后的跳转到指定页面
            if (this.$route.query.name === 'usercenter') {
              this.$router.replace('/usercenter/' + this.$i18n.locale)
            } else if (this.$route.query.name === 'recordlist') {
              this.$router.replace('/recordlist/' + this.$i18n.locale)
            } else if (this.$route.query.name === 'productdetail') {
              this.$router.replace({
                path: '/productdetail/' + this.$i18n.locale,
                query: {
                  issueNo: this.$route.query.issueNo
                }
              })
            } else {
              this.$router.replace('/home/' + this.$i18n.locale)
            }
          } else {
            this.$toast({
              message: res.data.msg,
              duration: 1000
            })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/mixin"
  @import "../../common/stylus/fontsize"
  .newsignin
    min-height:100vh
    position:absolute
    width:100%
    .title
      font-size:$font-meta
      height:$meta-height
      padding: 0 0.32rem 0 0.32rem
      display:flex
      justify-content:space-between
      align-items:center
      position:fixed
      // width:6.86rem
      background:$color-white
      color: $color-general-font
      z-index:100
      .left
        position:absolute
        padding:0.25rem 0.3rem 0.25rem 0.25rem
        left:0
        font-size:0.4rem
        color:$color-meta
    .container
      margin:auto 0.3rem
      margin-top:0.9rem
      .createtitle
        font-size:0.36rem
        padding-top:0.75rem
        color:#cccccc
        text-align:center
      .email
        height:1.2rem
        font-size:0.3rem
        display:flex
        align-items:flex-end
        justify-content:space-between
        position: relative
        margin-top:0.4rem
        input
          display:inline-block
          height:0.8rem
          width:6rem
        .clear
          width:0.8rem
          height:0.8rem
          position: relative
          span
            display:inline-block
            right:0
            top:50%
            transform:translateY(-50%)
            position:absolute
            width:0.22rem
            height:0.23rem
            bg-image('../../common/image/close')
            background-size: cover           
      .border-1px
        border-bottom:1px solid #cccccc
    .password
      font-size:0.3rem
      height:1.34rem
      display:flex
      align-items:flex-end
      border-bottom:1px solid #cccccc
      position: relative
      justify-content:space-between
      input
        height:0.8rem
        width:5.4rem
      .clear
        width:0.8rem
        height:0.8rem
        position: relative
        span
          display:inline-block
          right:0.3rem
          top:50%
          transform:translateY(-50%)
          position:absolute
          width:0.22rem
          height:0.23rem
          bg-image('../../common/image/close')
          background-size: cover           
      .show
        width:0.6rem
        height:0.8rem
        position: relative
        span
          display:inline-block
          right:0
          top:50%
          transform:translateY(-50%)
          position:absolute
          width:0.44rem
          height:0.26rem
          bg-image('../../common/image/eyes')
          background-size: cover
    .olvide
      font-size:0.24rem
      color:#999
      text-align:right
      margin-top:0.2rem
    .signinbtn
      font-size:0.4rem
      height:0.9rem
      text-align:center
      line-height:0.9rem
      background:$color-meta
      color:#fff
      border-radius:0.1rem
      margin-top:0.58rem
</style>

