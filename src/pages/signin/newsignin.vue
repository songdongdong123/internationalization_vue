<template>
  <div class="newsignin">
    <singinsuccess 
      :names="names"
      :surname="surname"
      :username="username"
      :channelType="channelType"
      :channelTag="channelTag"
      :activityType="activityType"
      :issueNo="issueNo"
      v-if="siginsuccess"></singinsuccess>
    <div class="title">
      <div class="titlecontainer" @click="backUserCenter">
        <span class="left icon-fanhui1"></span>
      </div>
    </div>
    <div class="container">
      <!-- 创建帐号 -->
      <p class="createtitle">{{$t('newsigin.createaccount')}}</p>
      <div class="email border-1px" :class="{'errorBorder':usernameState}">
        <input type="text" 
          v-on:input="checkoutState(0)"
          :placeholder="$t('newsigin.email')" 
          v-model="username">
        <div class="clear" v-show="username"  @click="clearThis(1)">
          <span></span>
        </div>
      </div>
      <div class="AuthCode" >
        <div class="Autcodeleft" :class="{'errorBorder':AuthcodeState}">
          <input type="text" 
            v-on:input="checkoutState(5)"
            placeholder="Código de verificación" 
            v-model="Autcode">
          <div class="clear" v-show="Autcode"  @click="clearThis(5)">
            <span></span>
          </div>
        </div>
        <p class="sendauthcode" @click.stop="_sendAuthCode" :class="{'activeAuthButton':AuthButtonState}">
          <span>{{AuthbuttonText}}</span>
        </p>
        <!-- emalistate -->
         <div class="autosuffix" v-show="emalistate">
           <ul class="email_list">
            <li v-for="list in emalilist.map(v=>{
              if (username) {
                  let reg = new RegExp(username)
                  v = username.split('@')[0] + v
                  if (reg.test(v)) {
                    return v
                  }
                }
              })" @click.stop="chooseThisEmail(list)" v-show="list">{{list}}</li>

           </ul>
        </div>
      </div>
      <div class="names">
        <div class="name" :class="{'nameerror':namesState}">
          <input type="text" 
            v-on:input="checkoutState(1)"
            :placeholder="$t('newsigin.names')" 
            v-model="names">
          <div class="clear" v-show="names"  @click="clearThis(2)">
            <span></span>
          </div>
        </div>
        <div class="surname" :class="{'surnameError': surnameState}">
          <input type="text"
            v-on:input="checkoutState(2)" 
            :placeholder="$t('newsigin.surname')" 
            v-model="surname">
          <div class="clear" v-show="surname" @click="clearThis(3)">
            <span></span>
          </div>
        </div>
      </div>
      <div class="password" :class="{'passwordError': passwordState}">
        <input 
          :type="passtype"
          v-on:input="checkoutState(3)" 
          :placeholder="$t('newsigin.password')" 
          v-model="password">
        <div class="show" v-show="password" @click="showThis(1)">
          <span></span>
        </div>
      </div>
      <div class="password">
        <input 
          type="tel"
          v-on:input="checkoutState(3)" 
          placeholder="Código de invitación (Opcional)" 
          v-model="Invitationcode">
      </div>
      <div class="userrlus">
        <div class="usertoast">
          <span class="fangkuang" :class="{'activeIcon': choosed}" @click="chooseThis"></span>
          <p @click="touserlus">
            <span class="usertext" >{{$t('supplement.rlusAcepto')}}</span><span class="blue">{{$t('supplement.rlusMeta')}}</span>
          </p>
        </div>
      </div>
      <div class="signinbtn" :class="{'activeBtn':submitState}" @click="registration">
        <!-- 注册 -->
        <p>{{$t('newsigin.create')}}</p>
      </div>
      <p class="seguridad">Por la seguridad de la cuenta y la eficiencia del envío, favor de regirstrarse con su propio correo electrónico.</p>
    </div>
  </div>
</template>

<script>
  import singinsuccess from '@/components/successpage/singinsuccess'
  import { mapGetters, mapMutations } from 'vuex'
  import { regUser, sendAuthCode } from 'api/login'
  import md5 from 'js-md5'
  import Fingerprintjs2 from 'fingerprintjs2'
  export default {
    data () {
      return {
        choosed: false,
        username: '',
        time: 60,
        AuthbuttonText: 'Obtener código de verificación',
        AuthButtonState: true,
        names: '',
        surname: '',
        Autcode: '',
        Invitationcode: '',
        password: '',
        usernameState: false,
        AuthcodeState: false,
        namesState: false,
        surnameState: false,
        passwordState: false,
        submitState: false,
        passtype: 'password',
        tempUserMsg: {},
        channelType: '',
        emalistate: false,
        activityType: '',
        emalilist: [
          '@gmail.com',
          '@hotmail.com',
          '@yahoo.com'
        ]
      }
    },
    computed: {
      ...mapGetters([
        'siginsuccess',
        'createUserMsg'
      ])
    },
    created () {
      [
        this.channelType,
        this.channelTag,
        this.issueNo,
        this.activityType
      ] = [
        this.$route.query.channelType,
        this.$route.query.channelTag,
        this.$route.query.issueNo,
        this.$route.query.activityType
      ]
    },
    mounted () {
      this.username = this.createUserMsg.userName
      this.password = this.createUserMsg.password
      this.names = this.createUserMsg.names
      this.surname = this.createUserMsg.surname
    },
    methods: {
      backUserCenter () {
        if (this.$route.query.activity === 'activity') {
          this.$router.replace({path: '/activity/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
          return
        }
        this.$router.back()
      },
      _sendAuthCode () {
        // 获取验证码
        let regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        let usernameState = regExp.test(this.username)
        if (usernameState) {
          if (this.time === 60) {
            this.AuthButtonState = true
            let timer = setInterval(() => {
              this.AuthbuttonText = this.time
              this.time--
              if (this.time === 0) {
                this.AuthbuttonText = 'Reenviar'
                this.AuthButtonState = false
                this.time = 60
                clearInterval(timer)
              }
            }, 1000)
            sendAuthCode({
              mobile: this.username,
              type: 2
            }).then(res => {
              if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
                this.$toast({
                  message: 'El código de verificación ha sido enviado, preste atención para verificar el buzón.',
                  duration: 2000
                })
              } else {
                this.AuthbuttonText = 'Reenviar'
                this.AuthButtonState = false
              }
            })
          }
        } else {
          this.usernameState = true
          this.$toast({
            message: this.$t('newsigin.emailErr'),
            duration: 2000
          })
        }
      },
      showThis (type) {
        // 显示密码
        switch (type) {
          case 1:
            this.passtype = this.passtype === 'password' ? 'text' : 'password'
            break
        }
      },
      clearThis (type) {
        // 清除输入框
        switch (type) {
          case 1:
            this.username = ''
            break
          case 2:
            this.names = ''
            break
          case 3:
            this.surname = ''
            break
          case 4:
            this.password = ''
            break
          case 5:
            this.Autcode = ''
            break
        }
      },
      chooseThisEmail (v) {
        // 选择一个邮箱后缀
        this.username = v
        this.AuthButtonState = false
        this.emalistate = false
        this.usernameState = false
      },
      checkoutState (type) {
        let regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        let usernameState = regExp.test(this.username)
        switch (type) {
          case 0:
            if (usernameState) {
              this.AuthButtonState = false
              this.usernameState = false
              this.emalistate = false
            } else {
              this.emalistate = true
              this.AuthButtonState = true
            }
            break
          case 1:
            if (this.names) {
              this.namesState = false
            }
            break
          case 2:
            if (this.surname) {
              this.surnameState = false
            }
            break
          case 3:
            if (this.password.length >= 6 && this.password.length <= 20) {
              this.passwordState = false
            }
            break
          case 5:
            if (this.Autcode.length === 4) {
              this.AuthcodeState = false
            }
            break
        }
        if (this.username && this.names && this.surname && this.password && this.choosed && this.Autcode) {
          this.submitState = true
        } else {
          this.submitState = false
        }
      },
      touserlus () {
        // 查看使用条款
        this.setCreateUserMsg({
          userName: this.username,
          password: this.password,
          names: this.names,
          surname: this.surname
        })
        this.$router.push({path: '/userlus/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      registration () {
        // 注册
        this.errorToast()
        this.checkoutform()
        if (!this.usernameState && !this.namesState && !this.surnameState && !this.passwordState && this.choosed && !this.AuthcodeState) {
          this.$loading({
            state: true
          })
          const _selt = this
          new Fingerprintjs2().get(function (result, components) {
            regUser({
              deviceId: result,
              userName: _selt.username,
              userType: 1002,
              authCode: _selt.Autcode,
              invCode: _selt.Invitationcode,
              password: md5(_selt.password),
              nickName: `${_selt.names} ${_selt.surname}`
            }).then(res => {
              if (res.data.errCode === _selt.$ERR_CODE && res.data.retCode === _selt.$RET_CODE) {
                _selt.setsigin(true)
                // 注册成功后上报渠道
                _selt.$loading({
                  state: false
                })
                if (_selt.$ga) {
                  _selt.$ga.event({
                    eventCategory: '渠道',
                    eventAction: '注册成功',
                    eventLabel: _selt.$route.query.channelType,
                    eventValue: 0
                  })
                }
              } else {
                _selt.$loading({
                  state: false
                })
                _selt.$toast({
                  message: res.data.msg,
                  duration: 2000
                })
              }
            })
          })
        }
      },
      checkoutform () {
        // 校验表单数据
        let regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (!regExp.test(this.username)) {
          this.usernameState = true
        }
        if (this.password) {
          if (this.password.length < 6 || this.password.length > 20) {
            this.passwordState = true
          }
        }
      },
      errorToast () {
        // 表单错误提示
        let regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (!regExp.test(this.username)) {
          this.$toast({
            message: this.$t('newsigin.emailErr'),
            duration: 2000
          })
          return false
        }
        if (!this.Autcode) {
          // 验证码
          this.AuthcodeState = true
          this.$toast({
            message: 'Por favor ingrese el código de verificación',
            duration: 2000
          })
          return false
        }
        if (!this.names) {
          this.namesState = true
          this.$toast({
            message: this.$t('newsigin.names'),
            duration: 2000
          })
          return false
        }
        if (!this.surname) {
          this.surnameState = true
          this.$toast({
            message: this.$t('newsigin.surname'),
            duration: 2000
          })
          return false
        }
        if (this.password.length < 6 || this.password.length > 20) {
          this.$toast({
            message: this.$t('newsigin.passerr'),
            duration: 2000
          })
          return false
        }
        if (!this.choosed) {
          this.$toast({
            message: 'Por favor acepte la política de privacidad',
            duration: 2000
          })
          return false
        }
      },
      chooseThis () {
        // 统一使用条款
        this.choosed = !this.choosed
        if (Boolean(this.username) && this.names && this.surname && this.password && this.choosed) {
          this.submitState = true
        } else {
          this.submitState = false
        }
      },
      ...mapMutations({
        setsigin: 'SET_SIGIN_SUCCESS',
        setCreateUserMsg: 'SET_CREATE_USER_MSG'
      })
    },
    components: {
      singinsuccess
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
        height:0.9rem
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
        font-size:0.36rem
        padding-top:0.3rem
        color:#333
      .email
        height:1.2rem
        font-size:0.3rem
        display:flex
        justify-content:space-between
        align-items:flex-end
        position: relative
        transition:all .5s
        // position: relative
        input
          display:inline-block
          height:0.8rem
          width:6rem
        .clear
          width:0.8rem
          height:0.8rem
          position:relative
          // align-items:center
          span
            right:0
            top:50%
            transform:translateY(-50%)
            position:absolute
            line-height:0.8rem
            display:inline-block
            width:0.22rem
            height:0.23rem
            bg-image('../../common/image/close')
            background-size: cover           
      .border-1px
        border-bottom:1px solid #cccccc
      .errorBorder
        border-bottom:1px solid $color-meta
    .names
      font-size:0.3rem
      display:flex
      justify-content:space-between
      height: 1rem
      width:100%
      position: relative
      .name
        display:flex
        align-items:flex-end
        justify-content:space-between
        width:3.28rem
        border-bottom:1px solid #cccccc
        position: relative
        transition:all .5s
        input
          display:inline-block
          width:2.9rem
          height:0.8rem
        .clear
          width:0.8rem
          height:0.8rem
          position: relative
          span
            right:0
            top:50%
            transform:translateY(-50%)
            position:absolute
            display:inline-block
            width:0.22rem
            height:0.23rem
            bg-image('../../common/image/close')
            background-size: cover
      .nameerror
          border-bottom:1px solid $color-meta
      .surname
        display:flex
        align-items:flex-end
        justify-content:space-between
        width:3.28rem
        border-bottom:1px solid #cccccc
        position: relative
        transition:all .5s
        input
          display:inline-block
          width:2.9rem
          height:0.8rem
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
      .surnameError
        border-bottom:1px solid $color-meta
        // opacity:0.3
    .AuthCode
      height:1rem
      font-size:0.3rem
      display:flex
      justify-content:space-between
      align-items:flex-end
      position: relative
      transition:all .5s
      .Autcodeleft
        display:flex
        align-items:flex-end
        justify-content:space-between
        width:3.28rem
        border-bottom:1px solid #cccccc
        transition:all .5s
        input
          display:inline-block
          height:0.8rem
          width:2.9rem
        .clear
          width:0.8rem
          height:0.8rem
          position:relative
          span
            right:0
            top:50%
            transform:translateY(-50%)
            position:absolute
            line-height:0.8rem
            display:inline-block
            width:0.22rem
            height:0.23rem
            bg-image('../../common/image/close')
            background-size: cover
      .errorBorder
        border-bottom:1px solid $color-meta
      .sendauthcode
        font-size:0.24rem
        width:2.9rem
        background:$color-meta
        color:#fff
        height 0.7rem
        display:flex
        align-items:center
        justify-content:center
        text-align:center
        border-radius:0.1rem
        word-wrap:break-word
      .activeAuthButton
        background:#ccc
        width:2.9rem
        word-wrap:break-word
      .autosuffix
        position:absolute
        width:100%
        // height:3rem
        background:#fff
        top:0rem
        z-index 1000
        left:0
        .email_list>li
          height:0.8rem
          line-height:0.8rem
    .password
      font-size:0.3rem
      height:1rem
      display:flex
      align-items:flex-end
      justify-content:space-between
      border-bottom:1px solid #cccccc
      position: relative
      transition:all .5s
      input
        height:0.8rem
        width:6.5rem
      .show
        width:0.8rem
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
    .passwordError
      border-bottom:1px solid $color-meta
    .userrlus
      margin-top:0.62rem
      font-size:0.24rem
      .usertoast
        display:flex
        align-items:center
        height:0.5rem
        p
          height:0.5rem
          line-height:0.5rem
        .usertext
          color:#999999
        .blue
          color:$color-sky-blue
          margin-left:0.05rem
        .fangkuang
          display:inline-block
          width:0.36rem
          height:0.36rem
          border:1px solid #ccc
          font-size:0.4rem
          margin-right:0.25rem
          background-repeat: no-repeat
          background-position: center center
          background-size: 0.3rem 0.3rem
          transition:all .5s
        .activeIcon
          background-image:url('choose.png')
          border:1px solid $color-meta
    .signinbtn
      font-size:0.4rem
      height:0.9rem
      text-align:center
      line-height:0.9rem
      background:#ccc
      color:#fff
      border-radius:0.1rem
      margin-top:0.25rem
    .activeBtn
      background:$color-meta 
    .seguridad
      font-size:0.24rem
      margin-top:0.3rem
      text-align:center
      line-height:0.3rem
      color:#999
</style>

