<template>
<transition name="slide">
  <div class="index">
    <div class="pesosilder">
      <transition name="silder">
        <!-- :class="{'navsilderactive': tabNav}" -->
        <div class="navsilder" @touchmove.prevent v-show="tabNav">
          <div
            class="ul_content"
          >
            <div class="navcontainer">
              <div class="navtitle">
                <p class="PESO" >
                  <span class="icon-icon40" @click.stop="chooseThisNav(0)"></span>
                  <span @click="returnHome">1PESO.MX</span>
                </p>
                <p class="navitem">
                  <span @click.stop="chooseThisNav(1)">Categorías de artículos</span>
                </p>
              </div>
              <scroll
                :data="navlist"
                :listenScroll="true"
                class="listcontainer"
              >
              <ul class="navlist">
                <li v-for="(list, index) in navlist" @click="toGoodslist(list, index)">
                  <span>{{list.name}}</span>
                  <p>
                    <span class="number">{{list.number}}</span>
                    <span class="arrow"></span>
                  </p>
                </li>
              </ul>
              </scroll>
              <p class="returnNoticiasApp" v-if="isAndroid" @click.stop="closeH5">
                <span class="icon-fanhui"></span>
                <span>Noticias Aquila</span>
              </p>
            </div>
          </div>
        </div>
      </transition>
      <div class="touchmove" @touchmove.prevent @click="showNavsilder" v-show="tabNav"></div>
      <div class="routerconainer" :class="{'routerconainer_silder':tabNav}">
        <div class="newhometitle">
          <div class="container">
            <p class="iconcontainer" @click="showNavsilder">
              <span class="icon-caidan"></span>
            </p>
            <span class="icon_logo" @click="returnHome">1PESO.MX</span>
            <div class="usercontainer" @click="toUserCenter">
              <div v-if="loginstate" class="activelogin">
                <span class="icon-yonghu3" ></span>
                <p>{{userMsg.gold}}B</p>
              </div>
              <div v-else class="Acceder">
                <p >Acceder</p>
              </div>
            </div>
          </div>
        </div>
        <div class="title_container"></div>
        <div class="routerview">
          <router-view/>
        </div>
      </div>
    </div>
    <div class="diago" @touchmove.prevent v-show="downloadstate">
      <div>
        <p class="Programa">Programa en el proceso de desarrollo, más sorpresa está por venir.</p>
        <p class="submit" @click="hideDiago">Sé</p>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  import { getGoodsClassify } from 'api/home'
  import { mapMutations, mapGetters } from 'vuex'
  import { getCookie } from '@/common/js/common'
  import { getSimpleUserInfo } from 'api/usercenter'
  export default {
    data () {
      return {
        tabNav: false,
        Inicio: false,
        allgoods: true,
        loginstate: false,
        navlist: [],
        userMsg: {},
        isAndroid: false
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      this.checkoutLoginState()
      this.isAndroidFun()
    },
    computed: {
      ...mapGetters([
        'downloadstate'
      ])
    },
    methods: {
      isAndroidFun () {
        // 浏览器中打开屏蔽返回按钮
        if (window.Android) {
          this.isAndroid = true
        } else {
          this.isAndroid = false
        }
      },
      closeH5 () {
        if (typeof window.Android !== 'undefined') {
          if (typeof window.Android.closeCurrentActivity !== 'undefined') {
            window.Android.closeCurrentActivity()
          }
        }
      },
      hideDiago () {
        this.setDownLoadState(false)
      },
      _getSimpleUserInfo () {
        this.$loading({state: true})
        getSimpleUserInfo({}).then(res => {
          this.$loading({state: false})
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.userMsg = res.data.data
          }
        })
      },
      checkoutLoginState () {
        // 校验登录态
        let cookie = getCookie('lkey')
        if (!cookie) {
          this.loginstate = false
        } else {
          this._getSimpleUserInfo()
          this.loginstate = true
        }
      },
      toUserCenter () {
        // 进入用户中心
        // console.log(this.channelTag)
        this.$router.push({path: '/usercenter/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      returnHome () {
        // alter(0)
        [this.tabNav] = [false]
        let navmsg = {}
        this.setnavmsg(navmsg)
        this.$router.replace({path: '/home/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      chooseThisNav (type) {
        switch (type) {
          case 0:
            [this.tabNav] = [false]
            this.$router.replace({path: '/home/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
            break
          case 1:
            [this.Inicio, this.allgoods] = [false, true]
            break
        }
      },
      toGoodslist (list, index) {
        // 前往商品分类页面
        [this.tabNav] = [false]
        let navmsg = {
          navindex: index,
          classifyId: list.id,
          className: list.name
        }
        if (this.$ga) {
          this.$ga.event({
            eventCategory: '商品分类左侧导航',
            eventAction: `商品分类ID:${list.id}`,
            // 上报充值自定义金额
            eventLabel: `商品分类名称:${list.name}`,
            eventValue: 0
          })
        }
        this.setnavmsg(navmsg)
        if (this.$route.name !== 'goodslist') {
          this.$router.push({
            path: '/goodslist/' + this.$i18n.locale,
            query: {
              channelType: this.channelType,
              channelTag: this.channelTag,
              navindex: index,
              classifyId: list.id
            }
          })
        } else {
          this.$router.replace({
            path: '/goodslist/' + this.$i18n.locale,
            query: {
              channelType: this.channelType,
              channelTag: this.channelTag
            }
          })
        }
      },
      showNavsilder () {
        this._getGoodsClassify()
      },
      _getGoodsClassify () {
        if (!this.tabNav) {
          getGoodsClassify({
            type: 2
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.navlist = res.data.data.list
              this.tabNav = true
            }
          })
        } else {
          this.tabNav = !this.tabNav
        }
      },
      ...mapMutations({
        setnavmsg: 'SET_NAV_MSG',
        setDownLoadState: 'SET_DOWN_LOAD'
      })
    },
    components: {
      scroll
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/mixin"
  .silder-enter-active, .silder-leave-active {
    transition: all .2s;
    transform:translateX(0);
  }
  .silder-enter, .silder-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform:translateX(-100%);
  }
  .index
    .pesosilder
      .touchmove
        position:fixed
        width:100%
        height:100%
        z-index:3000
        top:0
        left:0
        background:rgba(0,0,0,.3)
      .navsilder
        z-index:9998
        background:#fff
        position:fixed
        width:5.6rem
        min-height:100%
        // transform:translateX(0)
        .ul_content
          height:100vh
          .navcontainer
            .navtitle
              height:2rem
              font-size:0.3rem
              background:$color-meta
              color:#fff
              position: relative
              z-index:1000
              .PESO
                font-size:0.4rem
                text-align:center
                padding-top:0.3rem
                position: relative
                .icon-icon40
                  position:absolute
                  left:0.2rem
                  font-size:0.5rem
              .navitem
                position:absolute
                bottom 0.15rem
                span
                  font-size:0.35rem
                  display:inline-block
                  padding:0.05rem 0.3rem
                  // margin-left:0.2rem
                  border-width:0
                .spanactive
                  border-bottom:2px solid #fff
            .listcontainer
              height:75vh
              .navlist
                padding-bottom:1rem
                li
                  display:flex
                  justify-content:space-between
                  align-items:center
                  padding:0 0.3rem
                  color:#333
                  font-size:0.24rem
                  height:0.8rem
                  line-height:0.8rem
                  .arrow
                    display:inline-block
                    width:0.11rem
                    height:0.22rem
                    background-size:0.11rem 0.22rem
                    background-repeat:no-repeat
                    background-position: center
                    bg-image('./img/arrow')
                    margin-left:0.2rem
                  .number
                    color:#ccc
              .navlist>li:not(:last-child)
                border-bottom:1px solid #f3f3f3
            .returnNoticiasApp
              position:fixed
              bottom:0
              font-size:0.3rem
              background:$color-meta
              width:5.6rem
              height:0.8rem
              display:flex
              justify-content:space-between
              align-items:center
              padding:0 0.3rem
              box-sizing:border-box
              color:#fff
              .icon-fanhui
                font-size:0.4rem
                margin-left:-0.1rem
      .routerconainer
        transition: all .2s
        left:0
        z-index:200
        position: absolute
        width:100%
        min-height:100vh
        .title_container
          height:0.9rem
        .newhometitle
          width:100%
          position:fixed
          height:0.9rem
          background:$color-meta
          z-index:1000
          top:0
          .container
            height:100%
            display:flex
            justify-content:center
            align-items:center
            position: relative
            .icon_logo
              display:inline-block
              font-size:0.35rem
              color:#fff
              font-weight: bold
            .iconcontainer
              width:0.9rem
              height:0.9rem
              position:absolute
              display:flex
              align-items:center
              z-index:1000
              top:0
              left:0
              .icon-caidan
                color:#fff
                font-size:0.5rem
                margin-left:0.2rem
            .usercontainer
              height:100%
              position:absolute
              padding-right:0.2rem
              display:flex
              align-items:center
              right:0
              color:#fff
              .activelogin
                position: relative
                height:100%
                width:1rem
                text-align:center
                .icon-yonghu3
                  font-size:0.45rem
                  position:absolute
                  top:0.15rem
                  left:50%
                  transform:translateX(-50%)
                p
                  font-size:0.2rem
                  position:absolute
                  bottom:0.1rem
                  width:100%
                  overflow: hidden
                  text-overflow:ellipsis
                  white-space: nowrap
              .Acceder
                font-size:0.3rem
    .diago
      position:fixed
      width:100%
      height:100%
      z-index:9999
      background:rgba(0,0,0,.5)
      display:flex
      justify-content:center
      align-items:center
      div
        width:6rem
        background:#fff
        position: relative
        padding:0 0.5rem
        box-sizing:border-box
        border-radius:0.1rem
        font-size:0.3rem
        height:3rem
        .Programa
          margin-top:0.5rem
          text-align:center
          line-height:0.4rem
        .submit
          width:1.5rem
          padding:0.2rem
          background:$color-meta
          position: absolute
          bottom:0.3rem
          left:50%
          transform:translateX(-50%)
          text-align:center
          border-radius:0.1rem
          color:#fff
</style>
