<template>
  <div class="forgotpassword">
    <div class="title">
      <div class="return" @click="toLogin">
        <span class="icon-fanhui"></span>
      </div>
      <div class="meta">
        <!-- 一元夺宝-重置密码 -->
        <p class="meta_test">{{$t('forgotpassword.meta')}}</p>
      </div>
      <div class="omit">
        <span class="icon-shenglve"></span>
      </div>
    </div>
    <div class="content">
      <div class="phone">
        <div class="left">
          <span class="icon-shouji icon"></span>
          <!-- 请输入您的手机号 -->
          <input type="text" :placeholder="$t('forgotpassword.phone_text')">
        </div>
        <span class="authcode"
          :class="{'authcodeClass': timer}"
          @click="getAuthcode">{{authText}}<span v-if="timer">({{times}})</span></span>
      </div>
      <div class="phone">
        <div class="left base">
          <span class="icon-yuechi icon"></span>
          <!-- 请输入手机短信中的验证码 -->
          <input type="text" :placeholder="$t('forgotpassword.authcode_text')">
        </div>
      </div>
      <div class="phone base">
        <div class="left base">
          <span class="icon-lock icon"></span>
          <!-- 请输入4个字符或以上的新密码 -->
          <input type="text" :placeholder="$t('forgotpassword.new_code')">
        </div>
      </div>
      <div class="phone base">
        <div class="left base">
          <span class="icon-lock icon"></span>
          <!-- 请再次输入新密码 -->
          <input type="text" :placeholder="$t('forgotpassword.repeat_new_code')">
        </div>
      </div>
    </div>
    <div class="reset">
      <!-- 重置密码 -->
      <p class="resetbtn">{{$t('forgotpassword.reset')}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        authText: this.$t('forgotpassword.getauth_text'),
        times: 60,
        timer: false,
        timers: ''
      }
    },
    methods: {
      getAuthcode () {
        // 获取验证码
        this.timer = true
        clearInterval(this.timers)
        if (this.timer) {
          this.authText = this.$t('forgotpassword.again')
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
      toLogin () {
        // 前往登录页面
        this.$router.push('/login/' + this.$i18n.locale)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .forgotpassword
    min-height:100vh
    background:#f3f3f3
    .title
      height: 1rem
      font-size:0.4rem
      display:flex
      justify-content:space-between
      align-items:center
      background:#fff
      padding:0 0.2rem
      color:#d93a55
    .content
      background:#fff
      padding:0 0.2rem
      margin-top:0.2rem
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
            width:100%
            // border-bottom:1px solid #f3f3f3
            padding:0.2rem 0
        .authcode
          color:#d93a55
        .authcodeClass
          color:#ccc
    .reset
      background:#d93a55
      margin:auto 0.2rem
      margin-top:0.3rem
      border-radius:0.1rem
      color:#fff
      font-size:0.4rem
      height:0.8rem
      line-height:0.8rem
      text-align:center
</style>
