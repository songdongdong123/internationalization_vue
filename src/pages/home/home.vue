<template>
<transition name="slide">
  <div class="home">
    <!-- <inform v-show="prizeState"></inform> -->
    <div class="title">
      <p class="left closeh5" @click="closeH5" v-if="isAndroid">
        <span class="icon-fanhui1"></span>
      </p>
      <p class="center" @click="changeLangage">{{$t('newhome.meta')}}</p>
      <p class="right">
        <span class="icon-liebiao" @click="toUserCenter"></span>
      </p>
    </div>
    <div class="container">
      <scroll 
        :listenScroll="listenScroll"
        :list="issueList"
        :data="activityList"
        ref="content"
        @pullDown="pullDowns"
        @scrollDown="scrollDowns"
        class="content">
        <div>
          <loading v-show="loading1"></loading>
          <div class="swipe">
            <mt-swipe :auto="4000" :show-indicators="false">
              <mt-swipe-item v-for="(list, index) in bannerlist" :key="index">
                <img :src="list.homeImg" alt="">
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <div class="sales" @click="toWinnerShow">
            <p class="sales_title">{{$t('newhome.salesnum')}}</p>
            <p class="sales_num">{{SaleNum}} <span>{{$t('newhome.sharelist')}}</span></p>
          </div>
          <div class="transition"></div>
          <div class="free_entry" v-if="activityList.length">
            <!-- 免费夺宝 -->
            <p class="freep">{{$t('newhome.freeSnatch')}}</p>
            <!-- 获奖者 -->
            <p class="lucker" @click="toWinner"><span>{{$t('newhome.winner')}}</span></p>
          </div>
          <div class="freecontainer" v-if="activityList.length">
            <ul class="freelist">
              <li class="freeitem" 
                v-for="(list, index) in activityList" 
                @click="toFreeProduct(list.issueNo, list.state)">
                <!-- <div class="proMsk" v-show="recomendIndex === index"></div> -->
                <div class="goodsimg">
                  <!-- 已抢完 -->
                  <img :src="list.activityImg" alt="">
                </div>
                <div class="goodsmsg">
                  <p class="goodsname">{{list.goodsName}}</p>
                  <!-- 累计送出 -->
                  <p class="sendtoal">{{$t('newhome.totalOpened')}}:{{list.totalOpened}}</p>
                  <!-- 今日库存 -->
                  <p class="sendtoal stock">{{$t('newhome.todayLeft')}}:{{list.todayLeft}}</p>
                  <!-- 免费参与 -->
                  <p class="participation" v-show="list.state===0"  @click="toFreeProduct(list.issueNo, list.state)">
                    <span class="btnPar">{{$t('newhome.FreeParticipation')}}</span>
                  </p>
                  <p class="participation11" 
                    @click="toFreeProduct(list.issueNo, list.state)"
                    v-show="list.state===1">
                    <!-- 已参与 -->
                    <span class="payState" v-show="list.state === 1">{{$t('newhome.involvedIn')}}</span></p>
                  <p class="participation2" v-show="list.state===2">{{$t('newhome.nextIssueTime')}}:{{list.beginTime}}</p>
                  <!-- 夺宝结束 -->
                  <p class="snatchEnd" v-show="list.state===4">{{$t('newhome.snatchEnd')}}</p>
                  <p class="snatchEnd" v-show="list.state===3">{{$t('newhome.beginTime')}}:{{list.beginTime}}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="navBar">
            <ul class="navlist">
              <li class="navitem" 
                @click="toGoodsList(0)">
                <!-- <div class="proMsk" v-show="recomendIndex === index"></div> -->
                <div>
                  <p class="icon">
                  <span :class="$t('newhome.navBarList')[0].icon"></span>
                  </p>
                  <p class="navText">
                    <!-- 所有商品 -->
                    <span>{{$t('newhome.navBarList')[0].name}}</span>
                  </p>
                </div>
              </li>
              <li class="navitem" 
                @click="toGoodsList(1)">
                <!-- <div class="proMsk" v-show="recomendIndex === index"></div> -->
                <div>
                  <p class="icon">
                    <span :class="$t('newhome.navBarList')[1].icon"></span>
                  </p>
                  <p class="navText">
                    <!-- 所有商品 -->
                    <span>{{$t('newhome.navBarList')[1].name}}</span>
                  </p>
                </div>
              </li>
              <li class="navitem" 
                @click="toGoodsList(2)">
                <!-- <div class="proMsk" v-show="recomendIndex === index"></div> -->
                <div>
                  <p class="icon">
                    <span :class="$t('newhome.navBarList')[2].icon"></span>
                  </p>
                  <p class="navText">
                    <!-- 所有商品 -->
                    <span>{{$t('newhome.navBarList')[2].name}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="free_entry">
            <!-- 推荐 -->
            <p class="freep">{{$t('newhome.Recommend')}}</p>
            <!-- 用户晒单 -->
            <!-- <p class="lucker" @click="toWinnerShow"><span>{{$t('newhome.sharelist')}}</span></p> -->
          </div>
            <div class="recommend">
              <ul class="recommendlist" ref="list">
                <li class="recommenditem"
                  v-for="(list, index) in issueList" 
                  @click="toProductDetail(list.issueNo)">
                  <div class="proMsk" v-show="recomendIndex === index"></div>
                  <div class="goodsimg">
                    <img v-lazy="list.thumbImageBig" alt="">
                    <!-- <img src="./test.png" alt=""> -->
                    <!-- <p class="productName">{{list.goodsName}}</p> -->
                  </div>
                  <p class="productName">{{list.goodsName}}</p>
                  <div class="goodsMsg">
                    <p class="delbase">$1 para ganar</p>
                    <del class="delbase">${{list.curprice}}.00</del>
                  </div>
                  <div class="proess">
                    <div class="leabel">
                      <!-- 总份数 -->
                      <span>{{$t('newhome.amount')}}:{{list.totalBuy}}</span>
                      <!-- 剩余份数 -->
                      <span>{{$t('newhome.surplus')}}:{{list.surplusBuy}}</span>
                    </div>
                    <mt-progress :value="list.progress" :bar-height="5"></mt-progress>
                  </div>
                </li>
              </ul>
              <div class="toTop" v-show="!loading2">
                <!-- 回到顶部 -->
                <p @click="scrollTos">{{$t('newhome.backToTop')}}</p>
              </div>
              <loading v-show="loading2"></loading>
            </div>
        </div>
      </scroll>
    </div>
  </div>
</transition>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import inform from '@/components/inform/inform'
  // import ad from '@/components/ad/ad'
  // import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import { getFreeJoinList } from 'api/free'
  import { getIssueList, getFistRollPic, getTotalSaleNum } from 'api/home'
  import { logOut, unionLogin } from 'api/login'
  export default {
    data () {
      return {
        listenScroll: true,
        activityList: [],
        loading1: false,
        loading2: false,
        pageCount: 0,
        tempIssue: [],
        page: 0,
        count: 0,
        SaleNum: 0,
        issueList: [],
        bannerlist: [],
        isAndroid: false,
        recomendIndex: '',
        navBarList: this.$t('newhome.navBarList')
      }
    },
    created () {
      this._unionLogin()
      this.isAndroidFun()
    },
    computed: {
      ...mapGetters([
        'prizeState'
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
      changeLangage () {
        // 切换语言
        let lang = this.$route.path.split('/')[2]
        const language = localStorage.getItem('ELEMENT_LANGUAGE')
        if (language === 'zh') {
          localStorage.setItem('ELEMENT_LANGUAGE', 'mx')
          this.$i18n.locale = 'mx'
        } else {
          localStorage.setItem('ELEMENT_LANGUAGE', 'zh')
          this.$i18n.locale = 'zh'
        }
        this.$router.push(this.$route.path.replace(lang, this.$i18n.locale))
        location.reload()
      },
      touchstart (index) {
        this.recomendIndex = index
      },
      touchend () {
        this.recomendIndex = ''
      },
      _unionLogin () {
        // 获取app登录态（首页续作单独处理）
        // unionLogin({}).then(res => {})
        if (typeof window.Android !== 'undefined') {
          if (typeof window.Android.getLoginParam !== 'undefined') {
            unionLogin({
              params: window.Android.getLoginParam()
            }).then(res => {
              if (res.data.errCode === 0 && res.data.retCode === 0) {
                this.getHomeDate()
              } else {
                this.getHomeDate()
              }
            })
          }
        } else {
          this.getHomeDate()
        }
      },
      getHomeDate () {
        // 获取首页数据
        this._getRecomendList({})
        this._getFreeJoinList()
        this._getFistRollPic()
        this._getTotalSaleNum()
      },
      closeH5 () {
        if (typeof window.Android !== 'undefined') {
          if (typeof window.Android.closeCurrentActivity !== 'undefined') {
            window.Android.closeCurrentActivity()
          }
        }
      },
      logOut_H5 () {
        // 退出登录
        logOut().then(res => {
          console.log(res)
        })
      },
      _getTotalSaleNum () {
        // 获取首页销量
        getTotalSaleNum({}).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.SaleNum = res.data.data.SaleNum
          }
        })
      },
      _getFistRollPic () {
        // 获取首页轮播图
        getFistRollPic({}, this).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.bannerlist = res.data.data
            // console.log(this.bannerlist)
          }
        })
      },
      _getRecomendList ({page = 0, pageSize = 10}) {
        // 获取推荐商品列表
        getIssueList({
          page: page,
          pageSize: pageSize,
          tag: this.tag,
          sort: this.sort
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.tempIssue = this.tempIssue.concat(res.data.data.issueList)
            this.issueList = this.tempIssue
            this.pageCount = res.data.data.totalNum
            this.loading2 = false
            this.loading1 = false
            // this.$nextTick(() => {
            //   let lists1 = this.$refs.list.children[0]
            //   let AdVuecom = Vue.extend(ad)
            //   let vm1 = new AdVuecom().$mount()
            //   let nodeDom = document.querySelector('#ad')
            //   if (nodeDom) {
            //     lists1.remove(nodeDom)
            //   }
            //   lists1.before(vm1.$el)
            // })
          }
        })
      },
      _getFreeJoinList () {
        // 获取活动列表
        // this.$loading('open')
        this.loading1 = true
        getFreeJoinList({}).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.activityList = res.data.data.activityList
            // this.$loading('close')
            this.loading1 = false
          }
        })
      },
      scrollTos () {
        // 回到顶部
        this.$refs.content.scrollTo(0, 0, 300)
      },
      scrollDowns () {
        // 触底加载
        if (this.page < Math.ceil(this.pageCount / 10) - 1) {
          this.page = this.page + 1
          this.loading2 = true
          this._getRecomendList({page: this.page, pageSize: 10})
        } else {
          this.loading2 = false
        }
      },
      pullDowns () {
        // 下拉刷新
        this.loading1 = true
        this.timer = setTimeout(() => {
          this.issueList = []
          this.tempIssue = []
          this._getRecomendList({})
          this._getFreeJoinList()
          this._getTotalSaleNum()
        }, 1500)
      },
      toUserCenter () {
        // 进入用户中心
        this.$router.push({path: '/usercenter/' + this.$i18n.locale})
      },
      toHelp () {
        // 进入帮助中心
        this.$router.push({path: '/help/' + this.$i18n.locale})
      },
      toFreeProduct (issueNo, state) {
        // 进入活动商品投注页面
        if (state === 2) {
          this.$toast({
            message: '未到活动开始时间',
            duration: 1000
          })
        } else if (state === 3) {
          this.$toast({
            message: '未到活动开始时间',
            duration: 1000
          })
        } else {
          this.$router.push({path: '/freeproduct/' + this.$i18n.locale, query: {issueNo: issueNo, freestate: state}})
        }
      },
      toWinner () {
        // 进入获奖者页面
        this.$router.push({path: '/winner/' + this.$i18n.locale})
      },
      toWinnerShow () {
        // 进入晒单列表页面
        this.$router.push({path: '/winnershow/' + this.$i18n.locale, query: {type: 0}})
      },
      toGoodsList (tag) {
        // tag商品类型
        if (tag !== 3) {
          this.$router.push({path: '/goodslist/' + this.$i18n.locale, query: {tag: tag}})
        }
      },
      showInform () {
        // 展示中奖弹窗
        this.setPrizeState(true)
      },
      toProductDetail (issueNo) {
        this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: issueNo, falg: 'home'}})
      },
      ...mapMutations({
        setPrizeState: 'SET_PRIZE_STATE'
      })
    },
    components: {
      scroll,
      inform,
      loading
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    }
  }
</script>

<style>
.mint-swipe-indicator{
    width:0.06rem;
    height:0.06rem;
    border:2px solid rgba(0,0,0,0);
    background:rgba(0,0,0,0.4);
    opacity: 1;
  }
.mt-progress-progress{
  background-color:#FFCA3E !important;
}
.mt-progress-runway{
  height:0.15rem !important;
  border-radius:0.15rem;
}
.mt-progress-progress{
  height:0.15rem !important;
  border-radius:0.15rem;
}
</style>


<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/mixin"
  .home
    color:$color-general-font
    background:$color-bgcolor
    min-height:100vh
    position:absolute
    width:100%
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
      .right
        position:absolute
        right:0
        font-size:0
        padding:0.175rem 0.25rem 0.175rem 0.3rem
        font-size:0.55rem
        color:$color-meta
    .container
      padding-top:$meta-height
      .test
        transform: skew(45deg)
        p
          transform: skew(-45deg)
      .content
        height:11rem
        .swipe
          height:3.5rem
          img
            width:100%
            height:100%
        .sales
          height:1.8rem
          background:#fff
          font-size:0.24rem
          box-shadow 0px 1px 10px #ccc
          color:#333
          .sales_title
            text-align:center
            padding-top:0.3rem
          .sales_num
            text-align:center
            font-size:0.55rem
            font-weight: bold
            margin-top:0.3rem
            position: relative
            // width:100%
            span
              position: absolute
              font-size:0.24rem
              right:0.2rem
              bottom:0rem
              color:#999
        .transition
          height:0.2rem
        .free_entry
          height:0.8rem
          display:flex
          line-height:0.8rem
          font-size:$font-general
          // padding: 0 0.32rem 0 0.32rem
          color:$color-six-font
          margin:auto 0.2rem;
          justify-content:space-between
          // border-bottom:1px solid $color-border
          // background:#fff
          .freep
            width:5.8rem
          .lucker
            width:2rem
            // border-left:1px solid $color-border
            text-align:right
            font-size:0.24rem
            color:$color-sky-blue
        .freecontainer
          // background:#fff
          .freelist
            .proMsk
              position:absolute
              width:100%
              height:100%
              background:rgba(0,0,0,.3)
              z-index:1000
            .freeitem
              height:3.4rem
              // border-bottom:1px solid $color-border
              margin:auto 0.2rem
              display:flex
              align-items:center
              background:#fff
              border-radius:0.1rem
              position:relative
              .goodsimg
                width:3rem
                height:3rem
                position: relative
                // border:1px solid red
                img
                  width:100%
                  height:100%
              .goodsmsg
                height 2.4rem
                width:3.5rem
                margin-left:0.5rem
                position: relative
                .goodsname
                  font-size:0.3rem
                  font-weight:bold
                  height:0.6rem
                  line-height:0.6rem
                  width:100%
                  overflow: hidden
                  text-overflow:ellipsis
                  white-space: nowrap
                .sendtoal
                  font-size:0.24rem
                  margin-top:0.25rem
                .stock
                  margin-top:0.3rem
                .snatchEnd
                  font-size:0.24rem
                  position:absolute
                  bottom:0
                .participation
                  font-size:0.3rem
                  bottom:0
                  text-align:center
                  line-height:0.6rem
                  color:#fff
                  position:absolute
                  // width:3rem
                  padding: 0 0.2rem
                  height:0.6rem
                  border-radius:0.1rem
                  background: linear-gradient(#FF0000, #C10000)
                  // border:1px solid $color-meta
                  display:inline-block
                  margin-top:0.2rem
                .participation11
                  font-size:0.3rem
                  bottom:0
                  text-align:center
                  // line-height:0.6rem
                  color:$color-sky-blue
                  position:absolute
                  // width:2.8rem
                  // height:0.6rem
                  border-radius:0.1rem
                  // border:1px solid $color-progress
                  display:inline-block
                  .payState
                    color:$color-sky-blue
                    margin-right:0.2rem
                    font-size:0.24rem
                .participation1
                  font-size:0.3rem
                  bottom:0
                  text-align:center
                  line-height:0.6rem
                  color:$color-meta
                  position:absolute
                  width:2.8rem
                  height:0.6rem
                  display:inline-block
                .participation2
                  position:absolute
                  font-size:0.24rem
                  bottom:0
                  // line-height:0.6rem
            .freeitem:active
              box-shadow: inset 0 0 1000px rgba(0, 0, 0, .5)
          .freelist>li:not(:last-child)
            margin-bottom:0.2rem
        .navBar
          // border-bottom:1px solid $color-border
          padding: 0 0.2rem 0 0.2rem
          .navlist
            // height:3rem
            display:flex
            justify-content:space-between
            padding:0.5rem 0
            .navitem
              display:flex
              align-items:center
              justify-content:center
              width:2.22rem
              height:2.22rem
              background:#fff
              border-radius:0.1rem
              .proMsk
                position:absolute
                widows 100%
                height:100%
                background:rgba(0,0,0,.3)
                z-index:1000
              .navText
                font-size:0.24rem
                text-align:center
                word-wrap:break-word
                margin-top:0.25rem
              .icon
                text-align:center
                font-size:0.5rem
                color:$color-six-font
        .recommend
          // margin-top:0.1rem
          .recommendlist
            .recommenditem
              background:#fff
              margin:auto 0.2rem
              margin-bottom:0.2rem
              border-radius:0.1rem
              position:relative
              overflow: hidden
              padding-bottom:0.3rem
              .goodsimg
                // width:100%
                position: relative
                height:4.2rem
                img
                  width:100%
                  height:100%
              .productName
                z-index:100
                font-size:0.24rem
                color:#999
                padding-top:0.2rem
                margin:auto 0.2rem
                width:100%
                overflow: hidden
                text-overflow:ellipsis
                white-space: nowrap
              .goodsMsg
                // width:6.86rem
                margin:auto 0.2rem
                font-size:0.35rem
                margin-top:0.2rem
                display:flex
                justify-content:space-between
                .delbase
                  font-weight: 400
                  color:#000
              .proess
                // width:6.86rem
                margin:auto 0.2rem
                font-size:0.24rem
                .leabel
                  display:flex
                  justify-content:space-between
                  color:$color-six-font
                  margin-top:0.2rem
                .mt-progress
                  height:0.2rem
                  margin-top:0.15rem
          .toTop
            background:$color-boder
            height:0.5rem
            text-align:center
            font-size:0.24rem
            color:$color-weaken-font
            line-height:0.5rem
</style>  

