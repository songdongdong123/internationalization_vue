<template>
  <div class="newhome">
    <div class="productcontainer">
      <scroll 
        :listenScroll="listenScroll"
        :list="issueList"
        ref="content"
        @pullDown="pullDowns"
        @scrollEnd="scrollEnded"
        @scrollDown="scrollDowns"
        class="content">
        <div>
          <div class="banners" @click="toActivity">
            <swipe
              :data="bannerlist"
              class="swipehome">
              <div v-for="(list, index) in bannerlist">
                <img :src="list.homeImg" alt="" @click="toActivity(list)">
              </div>
            </swipe>
          </div>
          <div class="homenavlist">
            <ul>
              <li @click="toGoodList">
                <span class="PESO"></span>                
                <p>Todos los productos</p>
              </li>
              <li @click="toGame">
                <span class="GAME"></span>
                <p>Sala de juegos</p>
              </li>
              <li @click="toActivityList">
                <span class="ACTIVE"></span>
                <p>Eventos de promoción</p>
              </li>
              <li @click="toWinnerShow">
                <span class="evaluate"></span>
                <p>Opiniones sobre el artículo</p>
              </li>
            </ul>
          </div>
          <div class="winnercom" @click="toWinner">
            <p>Número de ganadores de hoy: <span class="number">{{opensum}}</span></p>
            <p>
              <span>Da clic para verlos</span>
              <span class="icon-arrow"></span>
            </p>
          </div>
          <div class="recommendprolist">
            <ul class="porlist" ref="list">
              <li class="proitem" v-for="(list,index) in issueList" @click="toProductDetail(list.issueNo, list.activityType)">
                <div class="proimg">
                  <img v-lazy="list.thumbImage" alt="">
                  <p class="proname">{{list.goodsName}}</p>
                  <p class="pronummsg">
                    {{$t('newhome.surplus')}}:{{list.surplusBuy}}
                  </p>
                  <div class="proess">
                    <mt-progress :value="list.progress" :bar-height="5"></mt-progress>
                  </div>
                </div>
              </li>
            </ul>
            <p class="Volver" @click="toGoodList">Ver más artículos</p>
          </div>
          <ad></ad>
          <bottomad></bottomad>
          <loading  v-show="loadingbottom"></loading>
        </div>
      </scroll>
    </div>
  </div>
</template>


<script>
  import scroll from '@/components/scroll/scroll'
  import swipe from '@/components/scroll/swipe'
  import { getFistRollPic, getIssueList } from 'api/home'
  import adInfo from '@/components/ad/ad_inform'
  import { mapGetters, mapMutations } from 'vuex'
  import loading from '@/components/loading/loading'
  import ad from '@/components/ad/bottomAd'
  import bottomad from '@/components/ad/ad'
  export default {
    data () {
      return {
        listenScroll: true,
        issueList: [],
        bannerlist: [],
        loadingtop: false,
        loadingbottom: false,
        pageCount: 0,
        tempIssue: [],
        page: 0,
        count: 0,
        opensum: ''
      }
    },
    computed: {
      ...mapGetters([
        'prizeState',
        'homescrollY'
      ])
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      scrollTo(0, 0)
      this._getFistRollPic()
      this._getRecomendList({})
    },
    methods: {
      _getFistRollPic () {
        // 获取首页轮播图
        getFistRollPic({
          type: 1
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.bannerlist = res.data.data
            this.opensum = res.data.opensum
          }
        })
      },
      toWinnerShow () {
        if (this.$ga) {
          this.$ga.event({
            eventCategory: '首页导航',
            eventAction: '晒单分享',
            // 上报充值自定义金额
            eventLabel: ``,
            eventValue: 0
          })
        }
        this.$router.push({path: '/winnershow/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      toWinner () {
        if (this.$ga) {
          this.$ga.event({
            eventCategory: '中奖列表',
            eventAction: '',
            // 上报充值自定义金额
            eventLabel: ``,
            eventValue: 0
          })
        }
        this.$router.push({path: '/winner/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      toGoodList () {
        if (this.$ga) {
          this.$ga.event({
            eventCategory: '首页导航',
            eventAction: '商品分类',
            // 上报充值自定义金额
            eventLabel: ``,
            eventValue: 0
          })
        }
        this.$router.push({path: '/goodslist/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      toActivityList () {
        if (this.$ga) {
          this.$ga.event({
            eventCategory: '首页导航',
            eventAction: '活动列表',
            // 上报充值自定义金额
            eventLabel: ``,
            eventValue: 0
          })
        }
        this.$router.push({path: '/activitylist/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      toGame () {
        if (this.$ga) {
          this.$ga.event({
            eventCategory: '首页导航',
            eventAction: '游戏',
            // 上报充值自定义金额
            eventLabel: ``,
            eventValue: 0
          })
        }
        this.$router.push({path: '/game/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      _getRecomendList ({page = 0, pageSize = 20}) {
        // 获取推荐商品列表
        this.$loading({
          state: true
        })
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
            this.$loading({
              state: false
            })
          }
        })
      },
      toActivity (list) {
        // 前往注册页面 首页banner进入活动落地页
        let articId = ''
        this.$ga.event({
          eventCategory: '渠道',
          eventAction: '首页banner进入活动落地页',
          // 上报充值自定义金额
          eventLabel: `渠道:${this.channelTag ? this.channelTag : '6_7_0_0'}`,
          eventValue: 0
        })
        // 不同的活动跳转至不同的活动落地页
        if (list.homeAddress) {
          let routeString = list.homeAddress.split('?')
          let reg = new RegExp('(^|&)' + 'id' + '=([^&]*)(&|$)', 'i')
          let targteRouter = routeString[0]
          // 获取文章id
          if (routeString[1]) {
            let r = routeString[1].match(reg)
            articId = unescape(r[2])
          }
          this.$router.push({path: `/${targteRouter}/` + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag, id: articId}})
        }
      },
      toProductDetail (issueNo, activityType) {
        // 前往商品详情
        if (activityType === 4) {
          this.$router.push({path: '/activityproduct/' + this.$i18n.locale, query: {issueNo: issueNo, falg: 'home', channelType: this.channelType, channelTag: this.channelTag}})
        } else {
          this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: issueNo, falg: 'home', channelType: this.channelType, channelTag: this.channelTag}})
        }
      },
      toUserCenter () {
        // 进入用户中心
        // console.log(this.channelTag)
        this.$router.push({path: '/usercenter/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      pullDowns () {
        // 下拉刷新
        this.loadingtop = true
        this.timer = setTimeout(() => {
          this.issueList = []
          this.tempIssue = []
          this.page = 0
          this.pageCount = 0
          this.loadingtop = false
          this._getRecomendList({})
          // this._getFreeJoinList()
          // this._getTotalSaleNum()
        }, 1500)
      },
      scrollEnded (pos) {
        // 滚动监听
        // console.log(pos)
        this.setHomeScrollY(pos)
        if (pos < 0) {
          // 下滑上报
          if (this.$ga) {
            this.$ga.event({
              eventCategory: '渠道',
              eventAction: '首页滑动统计',
              // 上报充值自定义金额
              eventLabel: `渠道:${this.channelTag ? this.channelTag : '6_7_0_0'}/滑动距离:${pos}px`,
              eventValue: 0
            })
          }
        }
      },
      scrollDowns (pos) {
        // 触底加载
        // if (this.page < Math.ceil(this.pageCount / 10) - 1) {
        //   this.page = this.page + 1
        //   this.loading2 = true
        //   this._getRecomendList({page: this.page, pageSize: 10})
        // } else {
        //   this.loading2 = false
        // }
      },
      ...mapMutations({
        setPrizeState: 'SET_PRIZE_STATE',
        setHomeScrollY: 'SET_HOME_SCROLLY'
      })
    },
    components: {
      scroll,
      loading,
      ad,
      adInfo,
      bottomad,
      swipe
    }
  }
</script>

<style>
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
  .newhome
    background:$color-bgcolor
    padding-bottom:1rem
    width:100%
    position:absolute
    min-height:100vh
    .scrollcontainer
      height:0.7rem
      overflow: hidden
      font-size:0.24rem
    .productcontainer
      .content
        height:10rem
        .banners
          position:relative
          width:100%
          height:2.5rem
          overflow: hidden
          img
            width:7.5rem
            height:2.5rem
            // height:100%
        .nomargin
          margin-top:0
        .homenavlist
          background:#fff
          font-size:0.24rem
          padding:0 0.1rem
          ul
            display:flex
            padding:0.3rem 0
            justify-content: space-around
            li
              position: relative
              text-align:center
              width:25%
              span 
                display:inline-block
                width:1rem
                height:1rem
                background-repeat:no-repeat
                background-position:center
                background-size:1rem 1rem
              .PESO
                bg-image('./img/PESO')
              .GAME
                bg-image('./img/GAME')
              .ACTIVE
                bg-image('./img/ACTIVE')
              .evaluate
                bg-image('./img/evaluate')
              p
                margin-top:0.1rem
        .winnercom
          background:#fff
          font-size:0.24rem
          box-shadow:0 -4px 9px #f5f5f5
          padding:0 0.2rem
          box-sizing:border-box
          display :flex
          justify-content:space-between
          height:0.6rem
          line-height:0.6rem
          z-index:500
          .number
            color:$color-yellow
        .recommendprolist
          box-sizing:border-box
          background:$color-bgcolor
          margin:auto 0.2rem
          .porlist
            display:flex
            justify-content:space-between
            flex-wrap:wrap
            box-sizing:border-box
            padding-top:0.2rem
            .proitem
              width:3.45rem
              height:4.6rem
              background:#fff
              margin-bottom:0.2rem
              padding-bottom:0.2rem
              border-radius:0.1rem
              overflow: hidden
              border:1px solid #eee
              .proimg
                width:100%
                img
                  width:100%
              .proname
                height:0.3rem
                line-height:0.3rem
                font-size:0.24rem
                box-sizing:border-box
                width:100%
                overflow: hidden
                text-overflow: ellipsis
                white-space:nowrap
                padding:0rem 0.15rem
                font-weight: bold
              .pronummsg
                height:0.5rem
                font-size:0.24rem
                box-sizing:border-box
                width:100%
                overflow: hidden
                text-overflow: ellipsis
                white-space:nowrap
                padding:0rem 0.15rem
                line-height:0.5rem
              .proess
                margin:auto 0.15rem
                .mt-progress
                  height:0.15rem
                  border-radius:0.15rem;
                  overflow: hidden
          .Volver
            height:1rem
            line-height:1rem
            font-size:0.3rem
            color:#999
            background:#fff
            border-radius:0.1rem
            margin-bottom:0.2rem
            text-align:center
</style>
