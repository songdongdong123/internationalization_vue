<template>
<transition name="fade">
  <div class="singinsuccess">
    <div class="successicon">
      <span class="icon"></span>
    </div>
    <!-- 您已完成一元夺宝注册 -->
    <p class="successtext">{{$t('login.signinsuccess')}}</p>
    <div class="center">
      <span class="bigemail"></span>
    </div>
    <div class="usemsg">
      <p>{{names}} {{surname}}</p>
      <p class="email">{{username}}</p>
    </div>
    <div class="bottom" @click="toHome">
      <!-- 完成 -->
      <p>{{$t('payform.accomplish')}}</p>
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
      names: {
        type: String,
        default: ''
      },
      surname: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    methods: {
      toHome () {
        this.$router.replace('/home/' + this.$i18n.locale)
        this.setsigin(false)
      },
      ...mapMutations({
        setsigin: 'SET_SIGIN_SUCCESS'
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
  .singinsuccess
    position:fixed
    height:100%
    width:100%
    background:#fff
    z-index:1000
    top:0
    left:0
    .successicon
      margin-top:1.7rem
      display:flex
      justify-content:center
      .icon
        display:inline-block
        width:0.6rem
        height:0.6rem
        bg-image('../../common/image/success')
        background-size:cover
    .successtext
      margin:auto 1.58rem
      font-size:0.36rem
      color:$color-meta
      margin-top:0.4rem
      text-align:center
    .usemsg
      font-size:0.3rem
      color:#666666
      margin-top:0.5rem
      text-align:center
      .email
        margin-top:0.3rem
    .bottom
      position:absolute
      bottom:0.5rem
      height:0.9rem
      width:6.86rem
      border:1px solid $color-meta
      text-align:center
      font-size:0.4rem
      margin:auto 0.3rem
      border-radius:0.1rem
      line-height:0.9rem
      color:$color-meta
</style>

