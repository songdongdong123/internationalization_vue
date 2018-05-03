<template>
  <transition name="fade">
    <div class="message">
      <div class="messageC">
        <div class="success">
          <span class="icon-pa_success"></span>
        </div>
        <!-- 注册成功 -->
        <p class="successSingin">{{$t('signin.signinsuccess')}}</p>
        <div class="start" @click="toLogin">
          <!-- 登录 -->
          <p>{{$t('login.login_text')}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    props: {
      username: {
        type: String,
        default: ''
      },
      password: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    methods: {
      toLogin () {
        this.setMsgState(false)
        this.$router.push('/login/' + this.$i18n.locale)
      },
      ...mapMutations({
        setMsgState: 'SET_MESSAGE_STATE'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .message
    position:fixed
    width:100%
    height:100%
    display:flex
    justify-content:center
    align-items:center
    z-index:102
    .messageC
      height:4rem
      width:6.5rem
      background:#fff
      border-radius:0.2rem
      .success
        text-align:center
        margin-top:0.4rem
        .icon-pa_success
          font-size:1rem
          color:$color-meta
      .successSingin
        font-size:0.24rem
      p
        text-align:center
        font-size:0.3rem
        color:$color-general-font
        margin-top:0.4rem
      .start
        height:1rem
        background:$color-meta
        width:6rem
        margin: 0 auto
        line-height:1rem
        border-radius:0.1rem
        p
          color:#fff
          font-size:0.35rem
</style>
