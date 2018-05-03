<template>
<transition name="fade">
  <div class="loginpage">
    <!-- <div class="mask"></div> -->
    <!-- <div class="title">
      <div class="cancel" @click="toHome">
        <span class="icon-fanhui"></span>
      </div>
      <div class="meta">
        <span>{{$t('login.meta')}}</span>
      </div>
      <div class="cancel" @click="toSigin">
        <span>{{$t('login.sigin')}}</span>
      </div>
    </div> -->
    <div class="title">
      <p class="left closeh5" @click="toHome">
        <span class="icon-fanhui1"></span>
      </p>
      <p class="center">{{$t('login.meta')}}</p>
      <p class="right" @click="toSigin">
        <span>{{$t('login.sigin')}}</span>
      </p>
    </div>
    <div class="content">
      <div class="phone">
        <div class="left base">
          <!-- <span class="icon-yonghu3 icon"></span> -->
          <input type="text" :placeholder="$t('login.username_text')" v-model="username">
        </div>
      </div>
      <div class="phone">
        <div class="left base">
          <!-- <span class="icon-lock icon"></span> -->
          <input :type="iptType" :placeholder="$t('login.password_text')" v-model="password">
          <!-- 显示 -->
          <!-- <span class="showPasd" @click="showPasd">{{$t('login.show')}}</span> -->
        </div>
      </div>
    </div>
    <div class="login_container" @click="Login_s">
      <!-- 登录 -->
      <p>{{$t('login.login_text')}}</p>
    </div>
    <div class="bottom">
      <!-- 忘记密码 -->
      <!-- <p @click="toForgot">{{$t('login.forget_pass')}}</p> -->
    </div>
  </div>
</transition>
</template>

<script>
  import { loginIn, getLoginSecret } from 'api/login'
  import md5 from 'js-md5'
  export default {
    data () {
      return {
        iptType: 'password',
        username: '',
        password: ''
      }
    },
    methods: {
      toHome () {
        // 返回首页
        this.$router.push('/home/' + this.$i18n.locale)
      },
      toSigin () {
        // 进入注册页面
        this.$router.push('/signin/' + this.$i18n.locale)
      },
      toForgot () {
        // 进入忘记密码页面
        this.$router.push('/forget/' + this.$i18n.locale)
      },
      showPasd () {
        // 显示密码
        this.iptType = this.iptType === 'password' ? 'text' : 'password'
      },
      Login_s () {
        // 登录前获取检验串
        getLoginSecret().then((res) => {
          this.$loading({state: true})
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            let secretValue = res.data.data.secretValue
            let secretKey = res.data.data.secretKey
            this._loginIn(secretValue, secretKey)
          }
        })
      },
      _loginIn (secretValue, secretKey) {
        // 登录
        loginIn({
          loginKey: this.username,
          loginExt: md5(md5(this.password) + secretValue),
          userType: 1002,
          loginType: 1,
          secretKey: secretKey
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.$loading({state: false})
            this.$toast({
              message: '登录成功',
              duration: 1000
            })
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
            this.$loading({state: false})
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
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/mixin"
  // .fade-enter-active, .fade-leave-active {
  //   transition: all .5s;
  // }
  // .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  //   transform: translateX(-100%);
  // }
  .loginpage
    min-height:100vh
    background:#f3f3f3
    position:absolute
    width:100%
    .mask
      position:fixed
      width:100%
      height:100%
      background:rgba(0,0,0,.5)
    .title
      font-size:$font-meta
      height:$meta-height
      padding: 0 0.32rem 0 0.32rem
      display:flex
      align-items:center
      position:fixed
      width:6.86rem
      background:$color-white
      color: $color-general-font
      z-index:100
      border-bottom:1px solid $color-border
      .left
        position:absolute
        left:0
        font-size:0
        padding:0.25rem 0.3rem 0.25rem 0.25rem
        font-size:0.4rem
        color:$color-meta
      .center
        width:100%
        text-align:center
        font-size:0.3rem
      .right
        position:absolute
        right:0
        font-size:0
        padding:0.175rem 0.25rem 0.175rem 0.3rem
        font-size:0.3rem
        color:$color-meta
    .content
      background:#fff
      // padding:0 0.2rem
      margin-top:0.9rem
      .phone
        font-size:0.3rem
        height:1rem
        display:flex
        align-items:center
        justify-content:space-between
        border-bottom:1px solid #f3f3f3
        .base
          width:100%
        .left
          display:flex
          // width:100%
          align-items:center
          .icon
            font-size:0.4rem
            margin-right:0.2rem
          input
            width:6.9rem
            padding:0.2rem 0 0.2rem 0.2rem
            margin: auto 0.2rem
          span
            display:inline-block
            width:0.8rem 
            color:$color-issue-font
            text-align:right
            margin-right:0.2rem
    .login_container
      height:0.8rem
      margin:auto 0.2rem
      font-size:0.4rem
      background:$color-meta
      border-radius:0.1rem
      text-align:center
      line-height:0.8rem
      color:#fff
      margin-top:0.3rem
    .bottom
      font-size:0.3rem
      color:$color-sky-blue
      margin:auto 0.2rem
      margin-top:1rem
      text-align:center
</style>

