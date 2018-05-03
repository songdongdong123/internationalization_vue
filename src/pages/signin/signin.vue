<template>
<transition name="fade">
  <div class="signin">
    <div class="mask" v-show="messageState"></div>
    <message
      :username="userName"
      :password="password" 
      v-show="messageState"></message>
    <div class="title">
      <div class="cancel" @click="backLogin">
        <span class="icon-fanhui"></span>
      </div>
      <div class="meta">
        <p class="text">{{$t('signin.meta')}}</p>
      </div>
    </div>
    <div class="signin_container">
      <div class="phone">
        <div class="left">
          <!-- 邮箱 -->
          <p class="p_title">{{$t('signin.mailBox')}}</p>
          <input class="phone_ipt" type="text" 
            v-model="userName"
            :placeholder="$t('signin.mailBox')">
        </div>
      </div>
      <div class="phone">
        <div class="left">
          <!-- 密码 -->
          <p class="p_title">{{$t('signin.password')}}</p>
          <input type="password" 
            v-model="password"
            :placeholder="$t('signin.password')">
        </div>
      </div>
    </div>
    <div class="checkout">
      <span class="fangkuang" :class="{'activeIcon': choosed}" @click="readyThis"></span>
      <!-- <input type="checkbox" v-model="choosed"> -->
      <!-- 我已阅读并同意网站的 -->
      <span>{{$t('supplement.rlusAcepto')}}<span class="clause" @click="touserlus">{{$t('supplement.rlusAcepto')}}</span></span>
    </div>
    <div class="next" @click="registration" >
      <p class="nextbtn" :class="{'defalut':choosed}">{{$t('signin.nextstep')}}</p>
    </div>
    <!-- <p class="forgetps" @click="toForgotPage">{{$t('signin.forgetpassword')}}</p> -->
  </div>
</transition>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import message from '@/components/message/message'
  import { regUser } from 'api/login'
  import { verificaEmail } from '@/common/js/verify'
  import md5 from 'js-md5'
  export default {
    data () {
      return {
        authText: this.$t('signin.auchcode_text'),
        times: 60,
        timer: false,
        timers: '',
        userName: '',
        password: '',
        choosed: false
      }
    },
    created () {

    },
    computed: {
      ...mapGetters([
        'messageState'
      ])
    },
    methods: {
      readyThis () {
        // 阅读网站条款
        this.choosed = !this.choosed
      },
      getAuthcode () {
        // 获取验证码
        this.timer = true
        clearInterval(this.timers)
        if (this.timer) {
          this.authText = this.$t('signin.again')
          this.timers = setInterval(() => {
            this.times--
            if (this.times <= 0) {
              clearInterval(this.timers)
              this.timer = false
              this.times = 60
            }
          }, 1000)
        }
      },
      registration () {
        let state = verificaEmail(this.userName)
        if (state) {
          regUser({
            userName: this.userName,
            userType: 1002,
            authCode: '110',
            password: md5(this.password)
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.setMsgState(true)
            } else {
              this.$toast({
                message: res.data.msg,
                duration: 1000
              })
            }
          })
        } else {
          this.$toast({
            message: this.$t('toast.signInToast'),
            duration: 1000
          })
        }
      },
      toForgotPage () {
        // 前往重置密码页
        this.$router.push('/forget/' + this.$i18n.locale)
      },
      touserlus () {
        // 查看使用条款
        this.$router.push('/userlus/' + this.$i18n.locale)
      },
      backLogin () {
        this.$router.back()
      },
      ...mapMutations({
        setMsgState: 'SET_MESSAGE_STATE'
      })
    },
    components: {
      message
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  // .fade-enter-active, .fade-leave-active {
  //   transition: all .5s;
  // }
  // .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  //   transform: translateX(100%);
  // }
  .signin
    min-height:100vh
    background:#f3f3f3
    position:absolute
    width:100%
    .mask
      position:fixed
      width:100%
      height:100%
      z-index:100
      background:rgba(0,0,0,.5)
      left:0
      top:0
    .title
      height:1rem
      background:#fff
      padding:0 0.2rem
      font-size:0.3rem
      display:flex
      align-items:center
      justify-content:center
      color:$color-meta
      .meta
        font-size:0.35rem
        font-weight: bold
      .cancel
        position:absolute
        height:1rem
        left:0rem
        font-size:0.5rem
        display:flex
        align-items:center
    .signin_container
      background:#fff
      // padding:0 0.2rem
      margin-top:0.2rem
      .phone
        font-size:0.3rem
        height:1.5rem
        display:flex
        align-items:center
        justify-content:space-between
        border-bottom:1px solid #f3f3f3
        .left
          // display:flex
          width:100%
          // align-items:center
          input
            width:6.9rem
            // border-bottom:1px solid #f3f3f3
            padding:0.2rem 0 0.2rem 0.2rem
            margin:auto 0.2rem
          .p_title
            padding-left:0.2rem
            color:$color-yellow
        .authcode
          color:$color-meta
        .authcodeClass
          color:#ccc
    .checkout
      height:1rem
      display:flex
      align-items:center
      padding: 0 0.2rem
      background:#fff
      .fangkuang
        width:0.35rem
        height:0.35rem
        border:1px solid #666
        border-radius:0.1rem
        font-size:0.4rem
        margin-right:0.15rem
        color:#333
        background-repeat: no-repeat
        background-position: center center
        background-size: 0.3rem 0.3rem
      .activeIcon
        background-image:url('choose.png') 
      span
        font-size:0.24rem
        color:#333
      .clause
        color:$color-sky-blue
    .next
      margin:auto 0.2rem
      margin-top:0.3rem
      .nextbtn
        height:0.8rem
        background:#999
        border-radius:0.1rem
        color:#fff
        font-size:0.4rem
        line-height:0.8rem
        text-align:center
      .defalut
        background:$color-meta
    .forgetps
      margin:auto 0.2rem
      margin-top:0.2rem
      color:#737373
      font-size:0.3rem
      text-align:right
</style>

