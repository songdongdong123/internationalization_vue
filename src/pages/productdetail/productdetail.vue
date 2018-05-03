<template>
  <div class="productdetail" :class="{'noScroll': betstate}" @click="closeNavBar($event)">
    <div class="mask" v-show="betstate" @click="hideBet"></div>
    <!-- <div class="loadmark" v-show="loadMark"></div> -->
    <betalert
      :issueNo="issueObj.issueNo"
      :surplusBuy="issueObj.surplusBuy"
      :goldnumber="goldNumber"
      :betstate="betstate" @hideThis="hideBetAlert"></betalert>
    <div class="title">
      <span class="icon-fanhui1 left" @click="returnGoodsList"></span>
      <span class="icon-icon- right" @click="showNavBar"></span>
    </div>
    <div class="navBar" v-show="navBarState">
      <ul class="list">
        <li class="item" @click="refreshData">{{$t('product.reload')}}</li>
        <li class="item" @click="toUserrecord">{{$t('product.prizeRecord')}}</li>
        <li class="item" @click="toHelp">{{$t('product.help')}}</li>
      </ul>
    </div>
    <loading class="loading" v-show="loading"></loading>
    <div class="issue" v-show="state!==1 && !loadMark">
      <span
      :class="{'StateAnnounce': state===3 || 2, 'cancelState': state===5}" 
      class="issue_state">{{stateText}}</span>
    </div>
    <div v-show="!loading">
      <div class="productimg" @click="toProdectImg">
        <mt-swipe :auto="4000" :show-indicators="false">
          <mt-swipe-item v-for="(list, index) in thumbImage" :key="index">
            <img :src="list" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="prizeMsg">
        <p>{{issueObj.goodsName}} <span>No.{{issueObj.snatchNumber}}</span></p>
      </div>
      <div class="productMsg">
        <div class="product_name">
          <p class="name">
            $1 para ganar
          </p>
          <!-- 第多少期 -->
          <del class="name">${{issueObj.curprice}}</del>
          <!-- 商品介绍 -->
          <!-- <p class="explain">{{issueObj.goodsDesc}}</p> -->
        </div> 
      </div>
      <div class="nowing">
        <div class="statistics">
          <!-- 总 -->
          <span>{{$t('newhome.amount')}}:{{issueObj.totalBuy}}</span>
          <!-- 剩 -->
          <span>{{$t('newhome.surplus')}}:{{issueObj.surplusBuy}}</span>
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
                <!-- /计算详情 -->
                <p>{{$t('product.Calculation')}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="participation" @click="betBtn" v-show="state !==3 && state !==2 && state!==5">
        <!-- 立即参与 -->
        <p class="participation_btn">{{$t('product.immediate')}}</p>
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
          <div class="newIssue" v-show="newIssueState">
            <!-- 新的一期正在进行 -->
            <p>{{$t('product.newIssue')}}</p>
            <!-- 立即前往 -->
            <p class="newwIssueBtn" @click="toNewIssue">{{$t('product.Immediately_to')}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import betalert from '@/components/betalert/betalert'
  import loading from '@/components/loading/loading'
  import { getIssueDetail } from 'api/home'
  import { getUserIgouNumberList } from 'api/order'
  // import { loginState } from '@/common/js/android'
  import { getSimpleUserInfo } from 'api/usercenter'
  export default {
    data () {
      return {
        betstate: false,
        thumbImage: [],
        someState: false,
        issueNo: '',
        loading: false,
        bottomLoading: false,
        state: 0,
        issueObj: {},
        pageCount: 0,
        page: 0,
        luckTime: '',
        itemId: 0,
        stateText: '', // 进行中
        previous: false,
        numberList: [],
        cookie: '',
        goodsId: '',
        loadMark: false,
        tag: '',
        loginState: false,
        issueState: false,
        navBarState: false,
        goldNumber: 0,
        newIssueState: false
      }
    },
    created () {
      // this.cookie = getCookie('lkey')
      this.issueNo = this.$route.query.issueNo
      this.previous = this.$route.query.previous
      this._getIssueDetail(this.$route.query.issueNo)
      this._getUserIgouNumberList(this.issueNo)
      scrollTo(0, 0)
      this.tag = this.$route.query.tag
    },
    methods: {
      refreshData () {
        // 刷新页面数据
        this._getIssueDetail(this.$route.query.issueNo)
        this._getUserIgouNumberList(this.issueNo)
      },
      toFormula () {
        // 前往计算详情
        this.$router.push({path: '/formula/' + this.$i18n.locale, query: {issueNo: this.issueNo}})
      },
      toSnatchon () {
        // 前往我的夺宝号
        this.$router.push({path: '/snatchno/' + this.$i18n.locale, query: {issueNo: this.$route.query.issueNo, tag: this.tag}})
      },
      _getSimpleUserInfo () {
        // 获取金币数量
        getSimpleUserInfo({
          nologin: 'no'
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.goldNumber = res.data.data.gold
            this.loginState = true
          } else {
            if (res.data.errCode === 3 && res.data.retCode === 3) {
              this.loginState = false
            }
          }
        })
      },
      _getUserIgouNumberList (issueNo) {
        getUserIgouNumberList({
          issueNo: issueNo,
          nologin: 'no'
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.numberList = res.data.data.numberList
          }
        })
      },
      _getIssueDetail (issueNo) {
        // 获取期号详情
        this.$loading({state: true})
        this.loadMark = true
        getIssueDetail({
          issueNo: issueNo
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            [
              this.thumbImage,
              this.state,
              this.issueObj, this.luckTime, this.itemId, this.goodsId] = [
                res.data.data.imageList,
                res.data.data.state,
                res.data.data, this.$forMatTime(res.data.data.openTime, 'y-m-d-s-m-s'),
                res.data.data.itemId, res.data.data.goodsId]
            this.loadMark = false
            // this.state = 5
            if (this.issueObj.currIssueNo) {
              this.newIssueState = true
            } else {
              this.newIssueState = false
            }
            this.$loading({state: false})
            if (this.$route.query.previous) {
              this.previous = true
            } else {
              if (this.state === 3) {
                this.previous = true
              }
            }
            switch (this.state) {
              case 1:
                // 进行中
                this.stateText = this.$t('product.stateText[0]')
                this._getSimpleUserInfo()
                break
              case 2:
                // 进行中
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
          } else {
            this.loadMark = false
            this.$toast({
              // 商品不存在
              message: this.$t('toast.noproduct'),
              duration: 1000
            })
            this.$loading({state: false})
            this.$router.back()
          }
        })
      },
      toParticipator () {
        // 前往参与者
        this.$router.push({path: '/participator/' + this.$i18n.locale, query: {issueNo: this.issueNo}})
      },
      toProdectImg () {
        // 前往图文详情
        this.$router.push({path: '/prodectImg/' + this.$i18n.locale, query: {goodsId: this.goodsId}})
      },
      returnGoodsList () {
        if (this.tag) {
          this.$router.push({path: '/goodslist/' + this.$i18n.locale, query: {tag: this.tag}})
        } else if (this.$route.query.newIssue) {
          this.$router.push({path: '/home/' + this.$i18n.locale})
        } else {
          this.$router.back()
        }
      },
      toPrevious () {
        this.$router.push({path: '/previous/' + this.$i18n.locale, query: {issueNo: this.$route.query.issueNo, itemId: this.itemId}})
      },
      showNavBar () {
        // 隐藏导航
        this.navBarState = !this.navBarState
      },
      closeNavBar (e) {
        if (e.target.className !== 'icon-icon- right') {
          this.navBarState = false
        }
      },
      toUserrecord () {
        // 前往中奖记录
        // let state = loginState({router: this.$router, issueNo: this.$route.query.issueNo, tag: this.tag})
        if (this.loginState) {
          this.$router.push({path: '/userrecord/' + this.$i18n.locale, query: {issueNo: this.$route.query.issueNo, tag: this.tag}})
        } else {
          this.$router.push({path: '/interim/' + this.$i18n.locale})
        }
      },
      toHelp () {
        // 前往帮助中心
        this.$router.push({path: '/help/' + this.$i18n.locale})
      },
      hideBetAlert (msg) {
        this.betstate = false
        if (msg) {
          this._getIssueDetail(this.$route.query.issueNo)
          this._getUserIgouNumberList(this.issueNo)
        }
      },
      betBtn () {
        // 登录态校验
        // let state = loginState({router: this.$router, issueNo: this.$route.query.issueNo, tag: this.tag})
        // cookie = true
        // let state = true
        if (this.loginState) {
          this.betstate = true
        } else {
          this.$router.push({path: '/interim/' + this.$i18n.locale})
        }
      },
      hideBet () {
        this.betstate = false
      },
      toNewIssue () {
        // 前往最新一期
        this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: this.issueObj.currIssueNo, newIssue: 1}})
        this._getIssueDetail(this.issueObj.currIssueNo)
        this._getUserIgouNumberList(this.issueObj.currIssueNo)
      }
    },
    components: {
      betalert,
      loading
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
  .mask
    position:fixed
    width:100%
    height:100%
    top:0
    left:0
    background:rgba(0,0,0,.5)
    z-index:900
  .noScroll
    position:fixed
    width:100%
    height:100%
    overflow: hidden
  .productdetail
    background:$color-bgcolor
    min-height:100vh
    .loadmark
      position:fixed
      width:100%
      height:100%
      background:rgba(0,0,0,.3)
      top:0
      left:0
      z-index:1000
    .navBar
      position:fixed
      z-index:1000
      // width:3rem
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
    .title
      font-size:$font-meta
      height:$meta-height
      padding: 0 0.32rem 0 0.32rem
      display:flex
      justify-content:space-between
      align-items:center
      position:fixed
      width:6.86rem
      background:$color-white
      color: $color-general-font
      z-index:100
      border-bottom:1px solid $color-border
      .left
        position:absolute
        padding:0.25rem 0.3rem 0.25rem 0.25rem
        left:0
        font-size:0.4rem
        color:$color-meta
      .right
        position:absolute
        right:0
        font-size:0
        padding:0.175rem 0.25rem 0.175rem 0.3rem
        font-size:0.55rem
        color:$color-meta
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
    .prizeMsg
      background:#fff
      font-size:0.24rem
      padding-top:0.2rem
      padding-left:0.2rem
      span
        color:#999999
        padding-left:0.1rem
    .productMsg
      padding:0 0.2rem 0 0.2rem
      line-height:0.4rem
      background:#fff
      .product_name
        display:flex
        justify-content:space-between
        align-items:center
        padding-top:0.2rem
        font-size:0.38rem
        p
          color:$color-general-font
        .issueNo
          font-size:0.3rem
        .name
          display: flex
          align-items: center
          .previousState
            padding:0rem 0.1rem 0rem 0.1rem
            border:1px solid $color-yellow
            color:$color-yellow
            font-size:0.2rem
            margin-left:0.2rem
          .goodsName
            font-size:0.32rem
            // font-weight:bold
        .explain
          font-size:0.24rem
          color:$color-six-font
    .nowing
      // margin:auto 0.2rem
      padding:0 0.2rem 0 0.2rem
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
      margin-top:0.2rem
      background:#fff
      .prizecord
        margin:auto 0.2rem
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
                color:$color-sky-blue
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
      justify-content:center
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
            position:relative
            width:1rem
            // margin-right:0.05rem
            .nums
              display:inline-block
              transform:rotate(-180deg)
              position:absolute
              left:0.45rem
              // top:0.1rem
            .icon-fanhui
              font-size:0.24rem
              color:$color-issue-font
              position:absolute
              right:0.65rem
          .text
            padding-left:0.2rem
        .newIssue
          position:fixed
          background:#fff
          height:1.5rem
          font-size:0.3rem
          display:flex
          padding:0 0.32rem 0 0.32rem
          align-items:center
          justify-content:space-between
          color:$color-weaken-font
          bottom: 0
          left:0
          width:6.86rem
          .newwIssueBtn
            height:0.8rem
            line-height:0.8rem
            text-align:center
            border-radius:0.1rem
            width:2rem
            border:1px solid $color-meta
            color:$color-meta
</style>

