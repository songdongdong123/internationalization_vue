<template>
<transition name="fade">
  <div class="singinsuccess">
    <div class="successicon">
      <span class="icon-pa_success"></span>
    </div>
    <!-- 您已完成一元夺宝注册 -->
    <p class="successtext">Registro Exitoso</p>
    <p class="Gracias">¡Ya puedes participar! ¡Gracias por usar 1PESO.MX!</p>
    <div class="center">
      <span class="bigemail"></span>
    </div>
    <!-- <div class="usemsg">
      <p>{{names}} {{surname}}</p>
      <p class="email">{{username}}</p>
    </div> -->
    <div class="bottom" @click="toHome">
      <!-- 完成 -->
      <p>Continuar</p>
      <!-- <p>{{channelTag}}</p> -->
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
      },
      channelType: {
        type: String,
        default: null
      },
      channelTag: {
        type: String,
        default: null
      },
      issueNo: {
        type: String,
        default: ''
      },
      activityType: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    methods: {
      toHome () {
        if (!this.issueNo) {
          if (this.channelTag && this.channelType) {
            this.$router.replace({path: '/home/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag, falg: 'home'}})
            return
          }
          if (this.channelType) {
            this.$router.replace({path: '/home/' + this.$i18n.locale, query: {channelType: this.channelType, falg: 'home'}})
            return
          }
          if (this.channelTag) {
            this.$router.replace({path: '/home/' + this.$i18n.locale, query: {channelTag: this.channelTag, falg: 'home'}})
            return
          }
          this.$router.replace({path: '/home/' + this.$i18n.locale, query: {falg: 'home'}})
        } else {
          if (this.activityType) {
            if (this.channelTag && this.channelType) {
              this.$router.replace({path: '/activityproduct/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag, falg: 'home', issueNo: this.issueNo}})
              return
            }
            if (this.channelType) {
              this.$router.replace({path: '/activityproduct/' + this.$i18n.locale, query: {channelType: this.channelType, falg: 'home', issueNo: this.issueNo}})
              return
            }
            if (this.channelTag) {
              this.$router.replace({path: '/activityproduct/' + this.$i18n.locale, query: {channelTag: this.channelTag, falg: 'home', issueNo: this.issueNo}})
              return
            }
            this.$router.replace({path: '/activityproduct/' + this.$i18n.locale, query: {falg: 'home', issueNo: this.issueNo}})
          } else {
            if (this.channelTag && this.channelType) {
              this.$router.replace({path: '/productdetail/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag, falg: 'home', issueNo: this.issueNo}})
              return
            }
            if (this.channelType) {
              this.$router.replace({path: '/productdetail/' + this.$i18n.locale, query: {channelType: this.channelType, falg: 'home', issueNo: this.issueNo}})
              return
            }
            if (this.channelTag) {
              this.$router.replace({path: '/productdetail/' + this.$i18n.locale, query: {channelTag: this.channelTag, falg: 'home', issueNo: this.issueNo}})
              return
            }
            this.$router.replace({path: '/productdetail/' + this.$i18n.locale, query: {falg: 'home', issueNo: this.issueNo}})
          }
        }
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
      margin-top:3rem
      display:flex
      justify-content:center
      .icon-pa_success
        font-size:0.8rem
        color:$color-meta
    .successtext
      margin:auto 1.58rem
      font-size:0.4rem
      color:#333
      margin-top:0.4rem
      text-align:center
      line-height:0.5rem
    .Gracias
      font-size:0.24rem
      text-align:center
      line-height:0.35rem
      margin:auto 0.5rem
      margin-top:0.5rem
      // font-weight: bold
    .usemsg
      font-size:0.3rem
      color:#666666
      margin-top:0.5rem
      text-align:center
      .email
        margin-top:0.3rem
    .bottom
      position:absolute
      width: 100%
      bottom: 2rem
      text-align: center
      font-size: 0.35rem
      color: #ff2700
      display: flex
      justify-content: center
      p
        width: 2.7rem
        height: 0.8rem
        background: #ff2700
        line-height: 0.8rem
        border-radius: 0.1rem
        color: #fff
</style>

