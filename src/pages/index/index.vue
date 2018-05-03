<template>
<transition name="slide">
  <div class="index" :class="{'noScroll': tabNav}">
        <div class="title">
          <div class="navbar" @click="showTab">
          <div class="top">
              <span  :class="{'icon-close':tabNav,'icon-fenlei1':!tabNav}"></span>
              <!-- <span class="triangle" v-show="tabNav"></span> -->
          </div>
          </div>
          <div class="meta" @click="shareContent">
          </div>
          <p class="quit" @click="closeCurrentActivity">关闭h5</p>
        </div>
        <div class="tab" :class="{'activetab': tabNav}" @click="toTabPage">
            <!-- 首页 -->
            <router-link class="p1 specific" :to="'/home/' + $i18n.locale" tag="p">
              <span class="icon-shouye icon"></span>
              <!-- <span>{{$t('navigator.index')}}</span> -->
            </router-link>
            <!-- 夺宝记录 -->
            <router-link class="p1" :to="'/recordlist/' + $i18n.locale" tag="p">
              <span class="icon-jilu icon"></span>
              <!-- <span>{{$t('navigator.record')}}</span> -->
            </router-link>
            <!-- 用户中心 -->
            <router-link class="p1" :to="'/usercenter/' + $i18n.locale" tag="p">
              <span class="icon-yonghu3 icon"></span>
              <!-- <span>{{$t('navigator.shopmall')}}</span> -->
            </router-link>
            <!-- 帮助 -->
            <router-link class="p1" :to="'/help/' + $i18n.locale" tag="p">
              <span class="icon-wenhao icon"></span>
              <!-- <span>{{$t('navigator.help')}}</span> -->
            </router-link>
          <!-- <p class="" @click="changeLange">切换语言</p> -->
        </div>
        <router-view></router-view>
  </div>
</transition>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  // import { logOut } from 'api/login'
  export default {
    data () {
      return {
        tabNav: false,
        routers: localStorage.getItem('currentpath'),
        listenScroll: true,
        testArr: [],
        userMsg: {}
      }
    },
    created () {
      this.$i18n.locale = this.$route.params.lang === 'zh' ? 'zh' : 'en'
    },
    watch: {
      scrollState (oldV, newV) {
        if (oldV) {
          window.addEventListener('touchmove', function (event) {
            event.preventDefault()
          })
        } else {
          window.addEventListener('touchmove', function (event) {
            event.returnValue = true
          })
        }
      }
    },
    computed: {
      lang () {
        return '/' + this.$i18n.locale
      },
      ...mapGetters([
        'scrollState'
      ])
    },
    methods: {
      closeCurrentActivity () {
        // 关闭h5
        window.Android.closeCurrentActivity()
      },
      shareContent () {
        // 分享h5页面
        window.Android.shareDialog('12346789', '首页', 'https://h5.peralppay.com/home/zh', 'https://h5.peralppay.com/home/zh', '测试')
      },
      toTabPage (falg) {
        this.setScrollState(false)
        this.tabNav = false
      },
      changeLange () {
        // 处理路由
        this.$i18n.locale = this.$i18n.locale === 'zh' ? 'en' : 'zh'
        let str = this.$router.history.current.path
        this.$router.replace(str.substring(0, str.length - 2) + this.$i18n.locale)
      },
      showTab () {
        // 显示导航
        this.tabNav = !this.tabNav
        this.setScrollState(this.tabNav)
      },
      ...mapMutations({
        setScrollState: 'SET_SCROLL_STATE'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  .active
    color:$color-meta
  .toFixed
    position:fixed
    width:100%
  .noScroll
    height:100vh
    overflow: hidden
  .scroll
    position:fixed
    height:100%
    width:100%
  .index
    // position:fixed
    // height:100%
    // width:100%
    // // position: relative
    // position:absolute
    width:100%
    height:100%
    .title
      // position:absolute
      // width:100%
      height:1rem
      background:$color-meta
      font-size:0.4rem
      color:#fff
      // padding: 0 0.4rem
      z-index:1007
      // width:100%
      line-height:1rem
      .meta
        text-align:center
      .navbar
        display:flex
        justify-content:center
        align-items:center
        position:absolute
        width:1rem
        // left:0.05rem
      .quit
        position:absolute
        top:0
        right:0.3rem
      .close
        position:absolute
        top:0
        left:0.7rem
    .tab
      width:100%
      background:rgb(255,255,255)
      font-size:0.4rem
      // z-index:1006
      color:$color-general-font
      transition:all .3s
      z-index:0
      opacity:0
      height:0
      overflow: hidden
      // padding-top:1rem
      .p1
        padding:0.3rem 0.2rem 0.3rem 0.4rem
        font-size:0.35rem
        .icon
          margin-right:0.3rem
    .activetab
      opacity:1
      height:4rem
      
</style>
