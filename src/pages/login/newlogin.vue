<template>
  <div class="newsignin">
    <div class="title">
      <div class="titlecontainer" @click="backUserCenter">
        <span  class="left icon-fanhui1"></span>
      </div>
    </div>
    <div class="container">
      <p class="createtitle">
        <span class="logo">1PESO.MX</span>
      </p>
      <p class="Este" v-show="nosignstate">Este buzón no registrados</p>
      <div class="email border-1px" :class="{'errorborder': nosignstate}">
        <input type="text"
          v-on:input="checkoutstate" 
          :placeholder="$t('login.username_text')" v-model="username">
        <div class="clear" @click="clearContent(1)" v-show="username">
          <span></span>
        </div>
      </div>
      <p class="contrasea" v-show="passwordstate">Error de contraseña</p>
      <div class="password" :class="{'errorborder':passwordstate}">
        <div class="emaillist" v-show="emalistate">
          <ul class="list">
            <li class="item" v-for="list in emalilist.map(v => {
              if (username) {
                let reg = new RegExp(username)
                v = username.split('@')[0] + v
                if (reg.test(v)) {
                  return v
                }
              }
              
            })" @click="chooseThisEmail(list)" v-show="list">{{list}}</li>
          </ul>
        </div>
        <input
          v-on:input="passwordInput" 
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
    <p class="Crear" @click="toSigin">Regístrate</p>
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
        type: 'password',
        channelType: '',
        emalilist: [
          '@gmail.com',
          '@hotmail.com',
          '@yahoo.com'
        ],
        emalistate: false,
        nosignstate: false,
        passwordstate: false
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
    },
    methods: {
      toForgotPass () {
        this.$router.push({path: '/newforgot/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      toSigin () {
        // 前往注册页面
        this.$router.replace({path: '/newsignin/' + this.$i18n.locale,
          query: {
            channelType: this.channelType,
            channelTag: this.channelTag,
            issueNo: this.$route.query.issueNo,
            activityType: this.$route.query.activityType
          }})
      },
      passwordInput () {
        this.passwordstate = false
      },
      backUserCenter () {
        this.$router.back()
      },
      checkoutstate () {
        this.nosignstate = false
        if (this.username) {
          this.emalistate = true
        } else {
          this.emalistate = false
        }
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
      },
      chooseThisEmail (v) {
        // 选择一个邮箱后缀
        this.username = v
        this.emalistate = false
        this.usernameState = false
      },
      getSecretStr () {
        // 获取登录的检验串
        if (this.username && this.password) {
          getLoginSecret({}).then(res => {
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
        } else {
          if (!this.username) {
            this.$toast({
              message: 'Por favor ingrese su dirección de correo electrónico',
              duration: 2000
            })
            this.nosignstate = true
            return
          }
          if (!this.password) {
            this.$toast({
              message: 'Por favor ingrese su contraseña',
              duration: 2000
            })
            this.passwordstate = true
          }
        }
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
              this.$router.replace({path: '/usercenter/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
            } else if (this.$route.query.name === 'recordlist') {
              this.$router.replace({path: '/recordlist/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
            } else if (this.$route.query.activityType) {
              this.$router.replace({
                path: '/activityproduct/' + this.$i18n.locale,
                query: {
                  issueNo: this.$route.query.issueNo,
                  channelType: this.channelType,
                  channelTag: this.channelTag,
                  falg: 'home'
                }
              })
              return null
            } else if (this.$route.query.issueNo) {
              this.$router.replace({
                path: '/productdetail/' + this.$i18n.locale,
                query: {
                  issueNo: this.$route.query.issueNo,
                  channelType: this.channelType,
                  channelTag: this.channelTag,
                  falg: 'home'
                }
              })
              return null
            } else {
              this.$router.replace({path: '/home/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
            }
          } else {
            switch (res.data.retCode) {
              case 1508:
                this.nosignstate = true
                break
              case 1510:
                this.passwordstate = true
                break
              default:
                this.$toast({
                  message: res.data.msg,
                  duration: 1000
                })
            }
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
  @media (max-height: 400px) { 
	  .Crear {
	    	display: none;
	  }
	}
  .newsignin
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
      z-index:100
      .titlecontainer
        display:flex
        justify-content:space-between
        align-items:center
        height:100%
        margin:auto 0.32rem
        .left
          position:absolute
          padding:0 0.3rem 0 0.25rem
          left:0
          font-size:0.4rem
          color:$color-meta
    .container
      margin:auto 0.3rem
      margin-top:0.9rem
      .createtitle
        font-size:0.6rem
        padding-top:0.75rem
        color:#333
        text-align:center
        margin-bottom:0.4rem
        .logo
          // display:inline-block
          // width:1.59rem
          // height:0.7rem
          // bg-image('./img/logo')
          // background-size:1.59rem 0.7rem
          // background-position center
          // background-repeat: no-repeat
      .email
        height:1rem
        font-size:0.3rem
        display:flex
        align-items:flex-end
        justify-content:space-between
        position: relative
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
      .errorborder
        border-color:$color-meta
      .Este
        font-size:0.24rem
        margin-top:1rem
        color:$color-meta
    .password
      font-size:0.3rem
      height:1rem
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
    .errorborder
      border-color:$color-meta
    .contrasea
      font-size:0.24rem
      color:$color-meta
      margin-top:0.3rem
    .emaillist
      position:absolute
      width:100%
      background:#fff
      top:0
      .list
        .item
          height:0.8rem
          line-height:0.8rem
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
    .Crear
      position:absolute
      height:1rem
      line-height:1rem
      width:100%
      bottom:0
      text-align:center
      font-size:0.3rem
      color:$color-sky-blue
</style>

