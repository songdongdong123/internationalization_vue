<template>
<transition name="fade">
  <div class="sendsuccess">
    <div class="closecontain" @click="closeThis">
      <span class="close"></span>
    </div>
    <div class="center">
      <span class="bigemail"></span>
    </div>
    <div class="bottom">
      <!-- 请查看您的邮件，完成重置密码操作 -->
      <p>{{$t('login.sendsuccess')}}</p>
    </div>
  </div>
</transition>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {}
    },
    methods: {
      closeThis () {
        this.$router.replace('/newlogin/' + this.$i18n.locale)
        this.setSendsuccess(false)
      },
      ...mapMutations({
        setSendsuccess: 'SET_SEND_SUCCESS'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/mixin"
  @import "../../common/stylus/fontsize"
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .sendsuccess
    position:fixed
    height:100%
    width:100%
    background:#fff
    z-index:1000
    top:0
    left:0
    .closecontain
      position:relative
      height:0.9rem
      .close
        position:absolute
        left:0.3rem
        top:0.3rem
        width:0.24rem
        height:0.24rem
        display:inline-block
        bg-image('../../common/image/closes')
        background-size: cover
    .center
      display:flex
      justify-content:center
      align-items:center
      margin-top:1rem
      .bigemail
        display:inline-block
        width:1.19rem
        height:0.94rem
        bg-image('../../common/image/bigemail')
        background-size: cover
    .bottom
      margin:auto 0.7rem
      margin-top:0.9rem
      text-align:center
      font-size:0.3rem
</style>

