<template>
  <div class="productdetail" :class="{'noScroll': betstate}" @click="closeNavBar($event)">
    <div class="mask" v-show="betstate" @click="hideBet"></div>
    <betalert
      :issueNo="issueObj.issueNo"
      :surplusBuy="issueObj.surplusBuy"
      :goldnumber="goldNumber"
      :channelTypes="channelType"
      :channelTags="channelTag"
      :activityType="4"
      :betstate="betstate" @hideThis="hideBetAlert"></betalert>
    <bigimg
    :piclist="issueObj.imageList"
    :state="bigimgState"
    :detaultimg="detaultimg"
    @hideBigImg="hideBigImg">
    </bigimg>
    <div class="title">
      <div class="left" @click="returnGoodsList">
        <span class="icon-fanhui1"></span>
      </div>
      <div class="center">
        <p v-for="(list, index) in topiconlist"
          @click="chooseProshowmsg(index)" 
          :class="{'pactive': index===iconind}">
          <span :class="list"></span>
        </p>
      </div>
      <div class="right" @click="showNavBar">
        <span class="icon-icon-"></span>
      </div>
      <!-- <div class="titlecontainer">
        <span class="icon-fanhui1 left" @click="returnGoodsList"></span>
        <span class="icon-icon- right" @click="showNavBar"></span>
      </div> -->
    </div>
    <div class="navBar" v-show="navBarState">
      <ul class="list">
        <li class="item" @click="refreshData">{{$t('product.reload')}}</li>
        <li class="item" @click="toUserrecord">
          <span>{{$t('product.prizeRecord')}}</span>
          <p class="dotnums" v-show="nums !== 0">{{nums}}</p>
        </li>
        <li class="item" @click="toHelp">{{$t('product.help')}}</li>
      </ul>
    </div>
    <loading class="loading" v-show="loading"></loading>
    <div
      class="scrollcontent"
      ref="scrollC"
    >
      <div v-show="!loading">
        <div v-show="iconind === 0">
          <div class="productimg">
            <div class="issue" v-show="state!==1 && !loadMark">
              <span
              :class="{'StateAnnounce': state===3 || 2, 'cancelState': state===5}" 
              class="issue_state">{{stateText}}</span>
            </div>
            <mt-swipe :auto="4000" :show-indicators="false">
              <mt-swipe-item v-for="(list, index) in thumbImage" :key="index" @click="toProdectImg(index)">
                <img v-lazy="list" alt=""  @click="toProdectImg(index)">
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <div class="prizeMsg">
            <p class="issueNao">No.{{issueObj.snatchNumber}}</p>
            <p>{{issueObj.goodsDesc}}</p>
          </div>
          <div class="productMsg">
            <div class="product_name">
              <!-- 第多少期 -->
              <p class="name">${{issueObj.curprice}}</p>
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
          <p class="explanatory" v-show="state===1">
            <span>¡Aprovecha ahora!¡Si no ganas te devolvemos tus boletos!</span>
            <!-- <span>Promociones todos los días，participa ya hasta que ganes.</span> -->
          </p>
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
                  <!-- <div class="right" @click="toFormula">
                    <p>{{$t('product.Calculation')}}</p>
                  </div> -->
                </div>
              </div>
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
          <div class="joinflow">
           <joinflow></joinflow>
          </div>
          <logistics></logistics>
        </div>
        <div v-show="iconind === 1">
          <div class="imgcontainer">
            <img v-for="list in imglist"  v-lazy="list" alt="">
          </div>
        </div>
        <div v-show="iconind===2">
          <div v-html="gooldsRoules" class="productsize"></div>
        </div>
      </div>
    </div>
    <div class="newIssue" v-show="newIssueState && loginState">
      <!-- 新的一期正在进行 -->
      <p>{{$t('product.newIssue')}}</p>
      <!-- 立即前往 -->
      <p class="newwIssueBtn" @click="toNewIssue">{{$t('product.Immediately_to')}}</p>
    </div>
    <div class="participation" @click.stop="betBtn" v-show="state !==3 && state !==2 && state!==5 && loginState">
      <!-- 立即参与 -->
      <p class="participation_btn">
        <span>{{$t('product.immediate')}}</span>
        <span class="aimiaticon"></span>
      </p>
    </div>
    <div class="nologinparticipation" @click.stop="betBtn" v-show="!loginState">
      <!-- 未登录 -->
      <!-- <p class="left">El afortunado puedes ser tú.</p> -->
      <p class="right">
        <span>Participar</span>
        <!-- <span class="aimiaticon"></span> -->
      </p>
    </div>
  </div>
</template>

<script>
  import betalert from '@/components/betalert/betalert'
  import loading from '@/components/loading/loading'
  import scroll from '@/components/scroll/scroll'
  import { getIssueDetail } from 'api/home'
  import { getUserIgouNumberList } from 'api/order'
  import { loginState } from '@/common/js/android'
  import { getSimpleUserInfo, getGoodsPicDetails } from 'api/usercenter'
  import { Base64 } from 'js-base64'
  import logistics from '@/components/ad/logistics'
  import joinflow from '@/components/ad/joinflow'
  import bigimg from '@/components/bigimg/bigimg'
  export default {
    data () {
      return {
        topiconlist: ['proicon', 'detailicon', 'sizeicon'],
        bigimgState: false,
        imglist: [],
        iconind: 0,
        listenScroll: true,
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
        newIssueState: false,
        nums: 0,
        channelType: 'q',
        channelTag: '2',
        detaultimg: 0,
        gooldsRoules: ''
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      this.issueNo = this.$route.query.issueNo
      this.previous = this.$route.query.previous
      this._getIssueDetail(this.$route.query.issueNo)
      this._getUserIgouNumberList(this.issueNo)
      this._getSimpleUserInfo()
      scrollTo(0, 0)
      this.tag = this.$route.query.tag
      this.reportProductDetail()
    },
    methods: {
      hideBigImg () {
        this.bigimgState = false
      },
      _getGoodsPicDetails (goodsId) {
        this.$loading({
          state: true
        })
        getGoodsPicDetails({
          goodsId: goodsId
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.imglist = res.data.data.imageList
            if (!this.imglist.length) {
              this.$toast({
                message: this.$t('toast.prodectImgToast'),
                duration: 1000
              })
            }
            this.$loading({
              state: false
            })
          }
        })
      },
      chooseProshowmsg (index) {
        // 选择要展示的商品的内容
        this.iconind = index
        scrollTo(0, 0)
        // this.$refs.scrollC.scrollTo(0, 0)
        switch (index) {
          case 0:
            this._getIssueDetail(this.$route.query.issueNo)
            break
          case 1:
            this._getGoodsPicDetails(this.issueObj.goodsId)
            break
          case 2:
            this._getIssueDetail(this.$route.query.issueNo)
            break
        }
      },
      reportProductDetail () {
        // 上报商品详情访问总数
        if (this.$ga) {
          this.$ga.event({
            eventCategory: '渠道',
            eventAction: `商品详情访问总数`,
            eventLabel: `渠道:${this.channelTag ? this.channelTag : '6_7_0_0'}/商品期号:${this.issueNo}`,
            eventValue: 0
          })
        }
      },
      refreshData () {
        // 刷新页面数据
        this._getIssueDetail(this.$route.query.issueNo)
        this._getUserIgouNumberList(this.issueNo)
      },
      toFormula () {
        // 前往计算详情
        this.$router.push({path: '/formula/' + this.$i18n.locale, query: {issueNo: this.issueNo, channelType: this.channelType, channelTag: this.channelTag}})
      },
      toSnatchon () {
        // 前往我的夺宝号
        this.$router.push({path: '/snatchno/' + this.$i18n.locale, query: {issueNo: this.$route.query.issueNo, tag: this.tag, channelType: this.channelType, channelTag: this.channelTag}})
      },
      _getSimpleUserInfo () {
        // 获取金币数量
        getSimpleUserInfo({
          nologin: 'no'
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.goldNumber = res.data.data.gold
            this.nums = res.data.data.num
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
            this.gooldsRoules = decodeURIComponent(Base64.decode(this.issueObj.goodsRule))
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
        this.$router.push({path: '/participator/' + this.$i18n.locale, query: {issueNo: this.issueNo, channelType: this.channelType, channelTag: this.channelTag}})
      },
      toProdectImg (index) {
        // 前往图文详情
        this.detaultimg = index
        this.bigimgState = true
        console.log(0)
        // this.$router.push({path: '/prodectImg/' + this.$i18n.locale, query: {goodsId: this.goodsId, channelType: this.channelType, channelTag: this.channelTag}})
      },
      returnGoodsList () {
        if (this.$route.query.tag) {
          this.$router.push({path: '/goodslist/' + this.$i18n.locale, query: {tag: this.tag, channelType: this.channelType, channelTag: this.channelTag}})
        } else if (this.$route.query.falg) {
          this.$router.push({path: '/home/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
        } else {
          this.$router.back()
        }
      },
      toPrevious () {
        this.$router.push({path: '/previous/' + this.$i18n.locale, query: {issueNo: this.$route.query.issueNo, itemId: this.itemId, channelType: this.channelType, channelTag: this.channelTag}})
      },
      showNavBar () {
        // 隐藏导航
        this.navBarState = !this.navBarState
      },
      closeNavBar (e) {
        if (e.target.className !== 'icon-icon-' && e.target.className !== 'right') {
          this.navBarState = false
        }
      },
      toUserrecord () {
        // 前往中奖记录
        // console.log(this.loginState)
        // let state = loginState({router: this.$router, issueNo: this.$route.query.issueNo, tag: this.tag})
        if (this.loginState) {
          this.$router.push({path: '/userrecord/' + this.$i18n.locale, query: {issueNo: this.$route.query.issueNo, tag: this.tag, channelType: this.channelType, channelTag: this.channelTag}})
        } else {
          this.$router.push({path: '/interim/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
        }
      },
      toHelp () {
        // 前往帮助中心
        this.$router.push({path: '/help/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      hideBetAlert (msg) {
        this.betstate = false
        if (msg) {
          this._getIssueDetail(this.$route.query.issueNo)
          this._getUserIgouNumberList(this.issueNo)
        }
      },
      isInsideAndroid () {
        if (typeof window.Android !== 'undefined') {
          if (typeof window.Android.getLoginParam !== 'undefined') {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      },
      betBtn () {
        // 登录态校验
        // cookie = true
        // let state = true
        this.$ga.event({
          eventCategory: '渠道',
          eventAction: '点击参与',
          eventLabel: `渠道:${this.channelTag ? this.channelTag : '6_7_0_0'}`,
          eventValue: 0
        })
        let state = loginState({
          router: this.$router,
          issueNo: this.$route.query.issueNo,
          tag: this.tag,
          activityType: 4
        })
        // let isInsideAndroid = this.isInsideAndroid()
        let isInsideAndroid = false
        if (!isInsideAndroid) {
          if (this.loginState) {
            this.betstate = true
          } else {
            this.$router.push({path: '/interim/' + this.$i18n.locale,
              query: {
                channelType: this.channelType,
                channelTag: this.channelTag,
                activityType: 4,
                issueNo: this.$route.query.issueNo}})
          }
        } else {
          if (state) {
            this.betstate = true
          }
        }
      },
      hideBet () {
        this.betstate = false
      },
      toNewIssue () {
        // 前往最新一期
        this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: this.issueObj.currIssueNo, newIssue: 1, channelType: this.channelType, channelTag: this.channelTag}})
        this._getIssueDetail(this.issueObj.currIssueNo)
        this._getUserIgouNumberList(this.issueObj.currIssueNo)
      }
    },
    components: {
      betalert,
      loading,
      scroll,
      logistics,
      bigimg,
      joinflow
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
table {
   width: 100%;
   /* border-collapse: collapse; */
 }
 table>tbody>tr>td{
   width: 50%;
   padding:0.1rem 0.2rem !important;
 }
 .productsize>p>br{
   display: none;
 }

</style>


<style lang="stylus" scoped>
  @import "../../../common/stylus/colorreset"
  @import "../../../common/stylus/fontsize"
  @import "../../../common/stylus/marginAndsize"
  @import "../../../common/stylus/mixin"
  .mask
    position:fixed
    width:100%
    height:100%
    top:0
    left:0
    background:rgba(0,0,0,.5)
    z-index:2000
  .noScroll
    position:fixed
    width:100%
    height:100%
    overflow: hidden
  .productdetail
    position:absolute
    min-height:100vh
    background:$color-bgcolor
    width:100%
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
          display:flex
          align-items:center
          .dotnums
            width:0.4rem
            height:0.4rem
            line-height:0.45rem
            text-align:center
            color:#fff
            font-size:0.2rem
            border-radius:100%
            background:$color-meta
            margin-left:0.1rem
      .list>li:not(:last-child)
        border-bottom:1px solid $color-border
    .title
      height:$meta-height
      line-height:$meta-height
      position:fixed
      width:100%
      background:$color-white
      color: $color-general-font
      z-index:1000
      border-bottom:1px solid $color-border
      display:flex
      justify-content:space-between
      .left
        display:flex
        align-items:center
        width:1rem
        span
          font-size:0.4rem
          color:$color-meta
          margin-left:0.15rem
      .right
        display:flex
        align-items:center
        justify-content:flex-end
        width:1rem
        span
          font-size:0.55rem
          color:$color-meta
          margin-right:0.15rem
      .center
        display:flex
        justify-content:space-between
        align-items:center
        height:0.9rem
        p
          width:1rem
          height:0.9rem
          display:flex
          justify-content:center
          align-items:center
          box-sizing:border-box
          border-bottom:1px solid rgba(0,0,0,0)
          span
            display:inline-block
            background-position:center
            background-repeat:no-repeat
          .proicon
            width:0.26rem
            height:0.32rem
            bg-image('./img/pro')
            background-size:0.26rem 0.32rem
          .detailicon
            width:0.35rem
            height:0.32rem
            bg-image('./img/detail')
            background-size:0.35rem 0.32rem
          .sizeicon
            width:0.28rem
            height:0.32rem
            bg-image('./img/size')
            background-size:0.28rem 0.32rem
        .pactive
          border-bottom:2px solid #666
      .center>p:not(:last-child)
        margin-right:0.5rem
    .loading
      padding-top:1rem
      // background:pink
    .scrollcontent
      padding-bottom:2rem
      .productimg
        width:100%
        height:5rem
        padding-top:0.9rem
        position: relative
        .mint-swipe
          .mint-swipe-items-wrap
            .mint-swipe-item
              width:100%
              img
                width:100%
                height:100%
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
      .prizeMsg
        background:#fff
        font-size:0.24rem
        padding-top:0.2rem
        padding-left:0.2rem
        .issueNao
          color:#999999
          padding-bottom:0.2rem
          // padding-left:0rem
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
          padding-bottom:0.1rem
      .explanatory
        background:#fff
        font-size:0.24rem
        text-align:center
        padding-top:0.15rem
        padding-bottom:0.2rem
        color:#FF9933
        span
          display:block
          line-height:0.35rem
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
      .imgcontainer
        margin-top:0.9rem
        img
          width:100%
      .productsize
        margin:auto 0
        font-size:0.24rem
        box-sizing:border-box
        background:#fff
        padding:0 0.2rem
        padding-bottom:0.2rem
        padding-top:1.1rem
      .joinflow
        font-size:0.3rem
        margin:0.2rem
        background:#fff
        padding:0.3rem 0.2rem
        border-radius:0.1rem 
      .bottom_container
        background:$color-bgcolor
        // padding-bottom:1.6rem
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
      background:#f2f2f2
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
      box-shadow:0px -2px 3px #ccc
      .newwIssueBtn
        height:0.8rem
        line-height:0.8rem
        text-align:center
        border-radius:0.1rem
        width:2rem
        background:$color-meta
        color:#fff
    .participation
      position:fixed
      bottom:0
      left:0
      width:100%
      display:flex
      justify-content:center
      background:#f2f2f2
      height:1.4rem
      align-items:center
      z-index:100
      box-shadow:0px -2px 3px #ccc
      box-sizing:border-box
      padding:0 0.2rem
      .participation_btn
        width:7rem
        height:1rem
        background:$color-meta
        color:#fff
        border-radius:0.1rem
        font-size:0.4rem
        line-height:1rem
        text-align:center
        display:flex
        justify-content:space-between
        align-items:center
        box-sizing:border-box
        padding:0 0.2rem
        .aimiaticon
          display:inline-block
          width:0.4rem
          height:0.4rem
          background-size:0.4rem 0.4rem
          background-position:center
          background-repeat: no-repeat
          bg-image('./img/aimiat')
    .nologinparticipation
      position:fixed
      bottom:0
      left:0
      width:100%
      display:flex
      justify-content:space-between
      background:#f2f2f2
      height:1.4rem
      align-items:center
      z-index:100
      box-shadow:0px -2px 3px #ccc
      font-size:0.3rem
      box-sizing:border-box
      padding:0 0.2rem
      .left
        font-size:0.24rem
      .right
        width:100%
        background:$color-meta
        color:#fff
        height:1rem
        border-radius:0.1rem
        line-height:1rem
        font-size:0.35rem
        box-sizing:border-box
        padding:0 0.2rem
        display:flex
        justify-content:space-between
        align-items:center
        .aimiaticon
          display:inline-block
          width:0.4rem
          height:0.4rem
          background-size:0.4rem 0.4rem
          background-position:center
          background-repeat: no-repeat
          bg-image('./img/aimiat')
</style>

