<template>
<transition name="slide">
  <div class="usercenter" @click="closeNavBar($event)">
    <div class="title">
      <div class="titlecontainer">
        <p class="left" @click="backToHome">
          <span class="icon-fanhui1"></span>
        </p>
        <p class="center">{{$t('userCenter.meta')}}</p>
        <p class="right">
          <span class="icon-icon-"  @click="showNav"></span>
        </p>
      </div>
    </div>
    <div class="empty"></div>
    <div class="goldnum">
      <div class="container">
        <div class="userName">
          <p class="nickname">{{$t('userCenter.hello')}}，{{userMsg.nickname}}</p>
          <span>{{userMsg.username}}</span>
        </div>
        <div class="golditem">
          <!-- 金币 -->
          <div class="goldnums">
            <span class="gold">{{userMsg.gold}}</span>
            <p class="goldtext">Boletos</p>
          </div>
          <p class="payBtn" @click="toPayPage">{{($t('userCenter.payText'))}}</p>
        </div>
        <!-- 充值 -->
      </div>
      <div class="navBar" v-show="navState">
        <!-- 刷新 -->
        <!-- <p @click="refreshData">{{$t('product.reload')}}</p> -->
        <!-- 地址管理 -->
        <p @click="toAddressList">{{$t('userCenter.ipam')}}</p>
        <!-- 我的晒单 -->
        <p @click="toWinnerShow">{{$t('newhome.sharelist')}}</p>
        <!-- 使用条款 -->
        <!-- <p @click="touserlus">Términos y condiciones</p> -->
        <!-- 退出登录 -->
        <p @click="exitH5">Salir</p>
      </div>
    </div>
    <div class="usermsg_list">
      <ul class="user_list">
        <li class="user_item" @click="toSnatchRecord">
          <div class="iconitem">
            <!-- <span class="icon-jilu icon"></span> -->
            <!-- 夺宝记录 -->
            <span class="icon_text">Historial</span>
          </div>
          <div class="arrow_left">
            <span class="icon-arrow icon"></span>
          </div>
        </li>
        <li class="user_item" @click="toPrizeRecord">
          <div class="iconitem">
            <!-- <span class="icon-tubiao207 icon"></span> -->
            <!-- 中奖记录 -->
            <span class="icon_text">Tus Premios</span>
          </div>
          <div class="arrow_left">
            <div class="nums" v-show="userMsg">
              <p class="numsContainer" v-show="userMsg.num">
                <span>{{userMsg.num}}</span>
                <span v-show="userMsg.num>99">+</span>
              </p>
            </div>
            <span class="icon-arrow icon"></span>
          </div>
        </li>
        <li class="user_item" @click="toPayRecord">
          <div class="iconitem">
            <!-- <span class="icon-dizhi1 icon"></span> -->
            <!-- 充值记录 -->
            <span class="icon_text">Tus Recargas</span>
          </div>
          <div class="arrow_left">
            <span class="icon-arrow icon"></span>
          </div>
        </li>
        <li class="user_item" @click="toMyInvita">
          <div class="iconitem">
            <!-- <span class="icon-jilu icon"></span> -->
            <!-- 夺宝记录 -->
            <span class="icon_text">Mi código de invitación</span>
          </div>
          <div class="arrow_left">
            <span class="icon-arrow icon"></span>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <!-- 客服邮箱 -->
      <!-- <p>{{$t('question.customerServiceEm')}}：servicio@1peso.com.mx</p> -->
    </div>
  </div>
  </transition>
</template>

<script>
  import { getSimpleUserInfo } from 'api/usercenter'
  import { logOut } from 'api/login'
  export default {
    data () {
      return {
        userMsg: {},
        navState: false,
        loading: false,
        isAndroid: false,
        channelType: ''
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      this._getSimpleUserInfo()
      this.checkoutIsAndrio()
    },
    methods: {
      checkoutIsAndrio () {
        // 检测是否在app内部
        if (window.Android) {
          this.isAndroid = false
        } else {
          this.isAndroid = true
        }
      },
      toMyInvita () {
        this.$router.push({path: '/myInvita/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      exitH5 () {
        // 退出登录
        logOut({}).then(res => {
          if (res.data.errCode === 0 && res.data.retCode === 0) {
            localStorage.removeItem('Nums')
            this.$router.push({path: '/home/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
          }
        })
      },
      touserlus () {
        // 查看使用条款
        this.$router.push({path: '/userlus/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      refreshData () {
        this._getSimpleUserInfo()
      },
      toSnatchRecord () {
        // 夺宝记录
        this.$router.push({path: '/recordlist/' + this.$i18n.locale,
          query: {
            nickName: this.userMsg.nickname,
            userName: this.userMsg.username,
            channelType: this.channelType,
            channelTag: this.channelTag
          }})
      },
      closeNavBar (e) {
        if (e.target.className !== 'icon-icon-') {
          this.navState = false
        }
      },
      backToHome () {
        // 返回首页
        this.$router.push({path: '/home/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      toShare () {
        // 进入晒单页面
        this.$router.push({path: '/shareorder/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      toPrizeRecord () {
        // 中奖记录
        this.$router.push({path: '/userrecord/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      toAddressList () {
        // 进入地址列表页面
        this.$router.push({path: '/addresslist/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      toWinnerShow () {
        // 进入晒单列表页面
        this.$router.push({path: '/winnershow/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      toPayRecord () {
        // 充值记录
        this.$router.push({path: '/payrecord/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      toPayPage () {
        // 进入充值选项页面
        this.$router.push({path: '/pay/' + this.$i18n.locale,
          query: {
            channelType: this.channelType,
            channelTag: this.channelTag,
            usercenter: true
          }})
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
      showNav () {
        // 显示导航
        this.navState = !this.navState
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .leftmask
    position absolute
    top:0.9rem
    height: 40%;
    width: 0;
    border-left: 7.5rem solid #e5c3b2;
    border-top: 1px solid transparent;
    border-bottom: 110px solid transparent;
  .rightmask
    position: absolute;
    bottom: 0rem;
    height: 40%;
    width: 0;
    border-right: 7.5rem solid red;
    border-top: 0px solid transparent;
    border-bottom: 0px solid transparent;
    // transform:rotate(180deg);
  .icon
    font-size:0.4rem
  .usercenter
    height:100vh
    background: $color-bgcolor
    color:$color-general-font
    position:absolute
    width:100%
    min-height:100vh
    .mark
      position:fixed
      height:100%
      width:100%
      background:rgba(0,0,0,.3)
      top:0
      left:0
      z-index:1000
      transition:all .5s
    .title
      font-size:$font-meta
      height:$meta-height
      line-height:$meta-height
      position:fixed
      width:100%
      background:$color-white
      color: $color-general-font
      z-index:100
      border-bottom:1px solid $color-border
      .titlecontainer
        display:flex
        align-items:center
        margin:auto 0.32rem
        .left
          position:absolute
          left:0
          font-size:0
          padding:0 0.3rem 0 0.25rem
          font-size:0.4rem
          color:$color-meta
        .center
          width:100%
          text-align:center
        .right
          position:absolute
          right:0
          font-size:0
          padding:0 0.25rem 0 0.3rem
          font-size:0.55rem
          color:$color-meta
    .empty
      padding-top:0.9rem
    .goldnum
      background:#fff
      font-size:0.3rem
      padding:0 0.32rem
      position:relative
      margin-top:0.2rem
      .navBar
        position:absolute
        min-width:2.5rem
        background:#fff
        box-shadow:0px 0px 8px #ccc
        top:0rem
        right:0.2rem
        z-index:1000
        p
          height:0.9rem
          line-height:0.9rem
          padding:0 0.2rem
      .navBar>p:not(:last-child)
        border-bottom:1px solid $color-border
      .container
        // display:flex
        // justify-content:space-between
        // align-items:flex-end
        width:100%
        .golditem
          display:flex
          align-items:center
          justify-content:space-between
          height:1.5rem
        .userName
          // height:1rem
          // line-height:1rem
          line-height:0.5rem
          border-bottom:1px solid $color-border
          font-size:0.32rem
          .nickname
            padding-top:0.3rem
          span
            font-size:0.24rem
            color:#333
        .payBtn
          height:0.8rem
          line-height:0.8rem
          width:2rem
          // background:$color-meta
          text-align:center
          border-radius:0.1rem
          border:1px solid $color-meta
          color:$color-meta
        .golditem
          // display:flex
          // align-items:center
          .gold
            display:inline-block
            font-size:0.35rem
            color:$color-progress
            margin-bottom:0.2rem
          .goldtext
            color:$color-six-font
            font-size:0.24rem
    .usermsg_list
      background:#fff
      margin-top:0.2rem
      .user_list
        .user_item
          height:1rem
          // border-top:1px solid #f5f5f5
          border-bottom:1px solid #f5f5f5
          display:flex
          justify-content:space-between
          padding:0 0.31rem
          font-size:0.3rem
          line-height:1rem
          color:$color-six-font
          position: relative
          .arrow_left
            .nums
              position: absolute
              right:0.8rem
              display:inline-block
              border-radius:100%
              color:#fff
              text-align:center
              top:50%
              transform:translateY(-50%)
              font-size:0.2rem
              .numsContainer
                background:$color-meta
                width:0.4rem
                height:0.4rem
                line-height:0.46rem
                border-radius:100%
                position: relative
              .numsContainer>span:nth-child(2)
                position:absolute
                color:$color-meta
                top:-0.1rem
                right:-0.15rem
                font-size:0.35rem
          .icon
            font-size:0.45rem
          .icon-arrow
            position:absolute
            font-size:0.24rem
            right:0.25rem
    .bottom
      position:absolute
      font-size:0.24rem
      text-align:center
      width:100%
      color:$color-weaken-font
      background:$color-bgcolor
      height:1rem
      line-height:1rem
      bottom:0
</style>

