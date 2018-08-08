<template>
  <div class="productdetail" :class="{'noScroll': betstate}" @click="closeNavBar($event)">
    <!-- 投注成功弹窗 -->
    <successPage :part="part" :msg="successMsg" :buttonText="buttonMsg" v-show="successPage" :falg="1"></successPage>
    <div class="loadMask" v-show="loadMark"></div>
    <div class="title">
      <p class="left" @click="backHome">
        <span class="icon-fanhui1"></span>
      </p>
      <!-- 免费参与夺宝 -->
      <p class="center">{{$t('product.freeParticipations')}}</p>
      <p class="right" @click="showNavBar">
        <span class="icon-icon-"></span>
      </p>
    </div>
    <div class="navBar" v-show="navBarState">
      <ul class="list">
        <!-- <li class="item" @click="toRecordlist">夺宝记录</li> -->
        <li class="item" @click="refreshData">{{$t('product.reload')}}</li>
        <li class="item" @click="toUserrecord">{{$t('product.prizeRecord')}}</li>
        <li class="item" @click="toHelp">{{$t('product.help')}}</li>
      </ul>
    </div>
    <div class="issue" v-show="state!==1 && !loadMark">
      <span
        :class="{ 'StateAnnounce': state===3 || 2, 'cancelState': state===5}" 
        class="issue_state">{{stateText}}</span>
    </div>
    <div v-show="!loading" >
      <div class="productimg" @click="toProdectImg">
        <mt-swipe :auto="4000" :show-indicators="false">
          <mt-swipe-item v-for="(list, index) in thumbImage" :key="index">
            <img :src="list" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="productMsg">
        <div class="product_name">
          <p class="name">
            <span class="goodsName">{{issueObj.goodsName}} </span>
            <!-- <span class="previousState" v-if="state===3">{{stateText}}</span> -->
          </p>
          <!-- 第多少期 -->
          <p class="issueNo">{{$t('previous.issueNo')}}:{{issueObj.snatchNumber}}</p>
          <!-- 商品简介 -->
          <!-- <p class="explain">{{issueObj.goodsDesc}}</p> -->
        </div>
      </div>
      <div class="nowing">
        <div class="statistics">
          <!-- 总 -->
          <span>{{$t('product.overall')}}:{{issueObj.totalBuy}}</span>
          <!-- 剩 -->
          <span>{{$t('product.remain')}}:{{issueObj.surplusBuy}}</span>
        </div>
        <mt-progress :value="issueObj.progress" :bar-height="5"></mt-progress>
      </div>
      <!-- 满员后抽取一名获奖者 -->
      <p class="explanatory" v-show="state===1">{{$t('newhome.full_commission')}}</p>
      <div class="usercode" v-show="state===3">
        <div class="prizecord">
          <div class="winnermsg">
            <div class="left">
              <!-- 参与者 -->
              <p class="winnerTitle">{{$t('product.luckyMan')}}</p>
              <p class="winnerName">{{issueObj.name}}</p>
            </div>
            <!-- <div class="img">
              <img :src="issueObj.picture" alt="">
            </div> -->
          </div>
          <div class="lucknum">
            <div>
              <!-- 幸运号码 -->
              <p class="top">{{$t('product.Fortuna')}}</p>
              <p class="nums">{{issueObj.luckyNumber}}</p>
            </div>
          </div>
          <div class="lucknum">
            <div>
              <!-- 参与份数/总数 -->
              <p class="top">{{$t('product.numtoast')}}</p>
              <p class="nums">{{issueObj.userBuyNum}}/{{issueObj.totalBuy}}</p>
            </div>
          </div>
          <div class="lucknum">
            <div class="count">
              <div class="left">
                <!-- 参与人数 -->
                <p class="top">{{$t('product.participations')}}</p>
                <p class="nums">{{issueObj.userNum}}</p>
              </div>
              <div class="right" @click="toFormula">
                <!-- 计算详情 -->
                <p>{{$t('product.Calculation')}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="participation">
        <!-- 立即参与 -->
        <p class="participation_btn" @click="betFree" v-if="freeState && freestate===0">{{$t('free.freeBtn')}}</p>
        <div class="already" v-else>
          <!-- 您已参与了该期活动每期活动仅限参与1次 -->
          <p class="explain" v-show="!proClassState && myNumberCount">{{$t('product.The_Egmont_Group')}}</p>
          <!-- 更多商品 -->
          <p class="morePro" :class="{'proMorePro': proClassState || !myNumberCount}" @click="toAllGoods">{{$t('newhome.moreProduct')}}</p>
        </div>
      </div>
      <div class="bottom_container">
        <div class="content">
          <div class="base" v-if="issueObj.myNumberCount > 0" @click="toSnatchon">
            <!-- 我的夺宝号码 -->
            <span class="text">{{$t('product.mySnatch')}}</span>
            <p class="route">
              <span class="icon-fanhui"></span>
              <span class="nums">{{issueObj.myNumberCount}}</span>
            </p>
          </div>
          <div class="base" @click="toParticipator">
            <!-- 参与者 -->
            <span class="text">{{$t('product.participator')}}</span>
            <p class="route"><span class="icon-fanhui"></span></p>
          </div>
          <div class="base" @click="toPrevious" v-if="!previous">
            <!-- 往期揭晓 -->
            <span class="text">{{$t('product.ToPhaseOut')}}</span>
            <p class="route"><span class="icon-fanhui"></span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import loading from '@/components/loading/loading'
  import { getIssueDetail } from 'api/home'
  import { createDeal } from 'api/pay'
  import { loginState, unionLoginState } from '@/common/js/android'
  import successPage from '@/components/successpage/successpage'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        betstate: false,
        thumbImage: [],
        someState: false,
        issueNo: '',
        loading: false,
        state: 0,
        issueObj: {},
        page: 0,
        luckTime: '',
        itemId: 0,
        stateText: this.$t('product.stateText[0]'), // 进行中
        previous: false,
        cookie: '',
        returnText: this.$t('product.returnText[0]'), // 首页
        goodsId: '',
        loadMark: false,
        successMsg: this.$t('successPage.participateIn'),
        navBarState: false,
        buttonMsg: this.$t('successPage.checkOrder'),
        freeState: false,
        myNumberCount: 0,
        unionLoginState: unionLoginState,
        proClassState: false,
        freestate: 0,
        part: '1',
        channelType: ''
      }
    },
    computed: {
      ...mapGetters([
        'successPage'
      ])
    },
    watch: {
      successPage (oldV, newV) {
        if (!oldV) {
          this._getIssueDetail(this.$route.query.issueNo)
        }
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      this.issueNo = this.$route.query.issueNo
      this.previous = this.$route.query.previous
      this._getIssueDetail(this.$route.query.issueNo)
      scrollTo(0, 0)
      if (this.$route.query.pro) {
        this.proClassState = true
      } else {
        this.proClassState = false
      }
      this.checkoutfreestate()
    },
    methods: {
      checkoutfreestate () {
        this.freestate = Number(this.$route.query.freestate)
        // console.log(this.freestate)
      },
      refreshData () {
        // 刷新页面数据
        this._getIssueDetail(this.$route.query.issueNo)
      },
      toParticipator () {
        // 前往参与者页面
        this.$router.push({path: '/participator/' + this.$i18n.locale, query: {issueNo: this.issueNo, channelType: this.channelType, channelTag: this.channelTag}})
      },
      toFormula () {
        // 前往计算详情
        this.$router.push({path: '/formula/' + this.$i18n.locale, query: {issueNo: this.issueNo, channelType: this.channelType, channelTag: this.channelTag}})
      },
      toSnatchon () {
        // 前往我的夺宝号
        this.$router.push({path: '/snatchno/' + this.$i18n.locale, query: {issueNo: this.$route.query.issueNo, channelType: this.channelType, channelTag: this.channelTag}})
      },
      showNavBar () {
        // 显示隐藏导航
        this.navBarState = !this.navBarState
      },
      toAllGoods () {
        // 前往商品列表
        this.$router.push({path: '/goodslist/' + this.$i18n.locale, query: {tag: 0, channelType: this.channelType, channelTag: this.channelTag}})
      },
      toUserrecord () {
        // 前往中奖记录
        let state = loginState({router: this.$router, issueNo: this.$route.query.issueNo, tag: this.tag, channelType: this.channelType, channelTag: this.channelTag})
        if (state) {
          this.$router.push({path: '/userrecord/' + this.$i18n.locale, query: {issueNo: this.$route.query.issueNo, channelType: this.channelType, channelTag: this.channelTag}})
        }
      },
      toHelp () {
        // 前往帮助中心
        this.$router.push({path: '/help/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      _getIssueDetail (issueNo) {
        // 获取期号详情
        this.loadMark = true
        this.$loading({state: true})
        getIssueDetail({
          issueNo: issueNo
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            [
              this.thumbImage,
              this.state,
              this.issueObj, this.luckTime, this.itemId, this.goodsId, this.myNumberCount] = [
                res.data.data.imageList,
                res.data.data.state,
                res.data.data, this.$forMatTime(res.data.data.openTime, 'y-m-d-s-m-s'),
                res.data.data.itemId, res.data.data.goodsId, res.data.data.myNumberCount]
            if (this.$route.query.previous) {
              this.previous = true
            } else {
              if (this.state === 3) {
                this.previous = true
              }
            }
            // 判断是否具有参与资格
            if (this.myNumberCount === 1 || (this.state === 2 || this.state === 3 || this.state === 4)) {
              this.freeState = false
            } else {
              this.freeState = true
            }
            this.loadMark = false
            switch (this.state) {
              case 1:
                // 进行中
                this.stateText = this.$t('product.stateText[0]')
                break
              case 2:
                // 即将揭晓
                this.stateText = this.$t('product.stateText[2]')
                break
              case 3:
                // 已揭晓
                this.stateText = this.$t('product.stateText[1]')
                break
              case 5:
                // 已取消
                this.stateText = this.$t('product.stateText[3]')
                break
            }
            this.$loading({state: false})
          } else {
            this.$toast({
              // 商品不存在
              message: this.$t('toast.noproduct'),
              duration: 1000
            })
            this.loadMark = false
            this.$loading({state: false})
            this.$router.back()
          }
        })
      },
      toProdectImg () {
        // 前往图文详情
        this.$router.push({path: '/prodectImg/' + this.$i18n.locale, query: {goodsId: this.goodsId, channelType: this.channelType, channelTag: this.channelTag}})
      },
      backHome () {
        if (this.$route.query.pro) {
          this.$router.back()
        } else {
          this.$router.push({path: '/home/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
        }
      },
      toPrevious () {
        this.$router.push({path: '/previous/' + this.$i18n.locale, query: {issueNo: this.$route.query.issueNo, itemId: this.itemId, channelType: this.channelType, channelTag: this.channelTag}})
      },
      hideBetAlert () {
        this.betstate = false
      },
      closeNavBar (e) {
        // 关闭更多菜单
        if (e.target.className !== 'icon-icon-') {
          this.navBarState = false
        }
      },
      betFree () {
        // 登录态校验
        let state = loginState({router: this.$router, issueNo: this.$route.query.issueNo, free: 'free'})
        if (state) {
          createDeal({
            issueNo: this.$route.query.issueNo,
            buyNum: 1,
            payAmount: 0
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.setSuccessPage(true)
            } else {
              this.$toast({
                message: res.data.msg,
                duration: 1000
              })
            }
          })
        }
      },
      ...mapMutations({
        setSuccessPage: 'SUCCESS_PAGE_STATE'
      })
    },
    components: {
      loading,
      successPage
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
.mint-swipe-indicator.is-active{
  background:rgba(0,0,0,.1)
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
  .noScroll
    position:fixed
    width:100%
    height:100%
    overflow: hidden
  .productdetail
    background:$color-bgcolor
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
      .right
        position:absolute
        right:0
        font-size:0
        padding:0.175rem 0.25rem 0.175rem 0.3rem
        font-size:0.55rem
        color:$color-meta
      .center
        width:100%
        text-align:center
    .loadMask
      position:fixed
      width:100%
      height:100%
      top:0
      left:0
      background:rgba(0,0,0,.5)
      z-index:900
    .navBar
      position:fixed
      z-index:1000
      // width:2.5rem
      background:#fff
      box-shadow:0px 0px 8px #ccc
      top:1.1rem
      right:0.2rem
      font-size:0.3rem
      .list
        .item
          height:0.9rem
          line-height:0.9rem
          padding-left:0.2rem
          padding-right:0.2rem
      .list>li:not(:last-child)
        border-bottom:1px solid $color-border
    .issue
      position:fixed
      z-index:1000
      font-size:0.3rem
      top:1.07rem
      color:$color-issue-font
      .issue_state
        padding:0.15rem 0.3rem 0.15rem 0.3rem
      .stateNowing
        border:1px solid $color-meta
        color:$color-meta
      .StateAnnounce
        // border:1px solid $color-yellow
        background:$color-yellow
        color:#fff
      .cancelState
        background:$color-issue-font
        color:#fff
      .stateCancel
        border:1px solid $color-issue-font
        color:$color-issue-font
    .loading
      padding-top:1rem
      // background:pink
    .productimg
      width:100%
      height:5rem
      padding-top:0.9rem
      .mint-swipe
        .mint-swipe-items-wrap
          .mint-swipe-item
            width:100%
            img
              width:100%
              height:100%
    .productMsg
      padding:0 0.2rem
      background:#fff
      line-height:0.4rem
      .product_name
        display:flex
        justify-content:space-between
        p
          font-size:0.32rem
          margin-top:0.2rem
          color:$color-general-font
        .issueNo
          font-size:0.3rem
          font-weight: bold
        .name
          // font-size:0.32rem
          margin-top:0.2rem
          color:$color-general-font
          display: flex
          align-items: center
          .previousState
            padding:0rem 0.1rem 0rem 0.1rem
            // height:0.4rem
            border:1px solid $color-yellow
            color:$color-yellow
            font-size:0.2rem
            margin-left:0.2rem
          .goodsName
            font-size:0.32rem
            font-weight:bold
        .explain
          font-size:0.24rem
          color:$color-six-font
    .nowing
      padding:0 0.2rem
      background:#fff
      .statistics
        padding-top:0.2rem
        display:flex
        justify-content:space-between
        color:$color-six-font
        font-size:0.24rem
      .mt-progress
        height:0.1rem
        margin-top:0.15rem
        padding-bottom:0.3rem
    .explanatory
      background:$color-bgcolor
      font-size:0.24rem
      text-align:center
      padding-top:0.3rem
      padding-bottom:0.1rem
      color:$color-issue-font
    .usercode
      padding:0 0.2rem
      background:#fff
      margin-top:0.2rem
      .prizecord
        margin:auto 0.2rem
        margin-bottom:0.3rem
        .winnermsg
          display:flex
          align-items:center
          justify-content:space-between
          height:1.2rem
          .left
            line-height:0.5rem
            .winnerTitle
              font-size:0.24rem
              color:$color-weaken-font
            .winnerName
              font-size:0.3rem
              color:$color-general-font
              font-weight: bold
          .img
            img
              display:inline-block
              width:0.7rem
              height:0.7rem
              // background:pink
              border-radius:100%
        .lucknum
          height:1.2rem
          display:flex
          align-items:center
          line-height:0.5rem
          .top
            font-size:0.24rem
            color:$color-weaken-font
          .nums
            font-size:0.3rem
            color:$color-general-font
            font-weight: bold
          .count
            display:flex
            justify-content:space-between
            align-items:flex-end
            width:100%
            .right
              font-size:0.24rem
              color:$color-weaken-font
              p
                span
                  margin-left:0.1rem
      .showall
        height:1rem
        line-height:1rem
        border-top:1px solid #f5f5f5
        font-size:0.3rem
        text-align:center
        color:$color-meta
    .participation
      position:fixed
      bottom:0
      left:0
      width:100%
      display:flex
      // justify-content:center
      background:#fff
      height:1.4rem
      align-items:center
      z-index:100
      .participation_btn
        width:7rem
        height:1rem
        // background:$color-meta
        border:1px solid $color-meta
        border-radius:0.2rem
        color:$color-meta
        font-size:0.4rem
        line-height:1rem
        text-align:center
        margin:0 auto
      .already
        width:100%
        margin:0 0.32rem 0 0.32rem
        display:flex
        align-items:center
        position:relative
        .explain
          font-size:0.24rem
          width:4rem
          line-height:0.3rem
          color:$color-issue-font 
          position:absolute
          left:0
        .morePro
          font-size:0.3rem
          // width:2rem
          padding:0 0.2rem
          height:0.8rem
          line-height:0.8rem
          text-align:center
          border:1px solid #ff2700
          color:#ff2700
          position:absolute
          border-radius:0.1rem
          right:0
        .proMorePro
          width:6.4rem
    .bottom_container
      background:$color-bgcolor
      padding-bottom:1.6rem
      .content
        border-top:0.2rem solid $color-bgcolor
        .base
          display:flex
          justify-content:space-between
          align-items:center
          height:1rem
          font-size:0.3rem
          background:#fff
          border-bottom:1px solid #f5f5f5
          color:$color-six-font
          .route
            transform:rotate(180deg)
            display:flex
            align-items:center
            margin-right:0.05rem
            position:relative
            .nums
              display:inline-block
              transform:rotate(-180deg)
              position:absolute
              left:0.45rem
            .icon-fanhui
              font-size:0.24rem
              color:$color-issue-font
              position:absolute
              left:0.1rem
          .text
            padding-left:0.2rem
</style>

