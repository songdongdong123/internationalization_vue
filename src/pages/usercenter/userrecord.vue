<template>
<transition name="slide">
  <div class="userrecord">
    <div class="mask" v-show="submitbox"></div>
    <submitbox
      :orderNo="orderNo"
      :orderIncrId="orderIncrId"
      @updata="updata"
      v-show="submitbox"></submitbox>
      <!-- 中奖记录 -->
    <!-- <div class="title">
      <span class="icon-fanhui left" @click="backUserCenter"></span>
      <p class="meta">{{$t('userRecord.prizeRecord')}}</p>
    </div> -->
    <div class="title">
      <span @click="backUserCenter" class="left icon-fanhui1"></span>
      <p>{{$t('userRecord.prizeRecord')}}</p>
    </div>
    <div class="usercard">
      <img src="./img/banner.jpg" alt="">
    </div>
    <div class="prizepro">
      <scroll
        :data="dealList"
        :listenScroll="true"
        @scrollDown="scrollDowns"
        class="prizelist"
      >
        <ul>
          <li 
            v-for="(list, index) in dealList"
            v-if="list.state===2"
            class="prizeitem">
            <div class="priimg">
              <img :src="list.thumbImage" alt="">
            </div>
            <div class="right">
              <div class="primsg">
                <!-- 商品名 -->
                <p class="base">{{list.goodName}}</p>
                <!-- 参与期号 -->
                <p class="base weaken">{{$t('userRecord.partakeIssue')}}:{{list.issueNo}}</p>
                <!-- 幸运号码 -->
                <p class="base weaken">{{$t('userRecord.Fortuna')}}:{{list.luckyNumber}}</p>
                <!-- 时间 -->
                <p class="base weaken">{{$t('userRecord.winnerTime')}}:{{list.time}}</p>
              </div>
              <div class="stateMsg">
                <div class="stateMsg_left">
                     <!-- 确认收货地址 -->
                  <span v-if="list.sendGoodsState === 1" class="btn" @click="toSubmitAddress(list)">{{$t('userRecord.ConfirmReceiptAddress')}}</span>
                    <!-- 收货状态 -->
                  <span class="delivery" v-if="list.sendGoodsState!==1">{{list.proStateText}}</span>
                    <!-- 确认收货 -->
                  <span v-if="list.sendGoodsState === 3" class="btn" @click="toReceiving(list)">{{$t('userRecord.submitText')}}</span>
                </div>
                <div class="stateMsg_right" 
                  v-show="list.sendGoodsState===4 && !list.isShow" 
                  @click="toShareOrderPage(list.orderNo, list.goodName, list.thumbImage)">
                  <p>{{$t('userRecord.shareImg')}}</p>
                </div>
              </div>
            </div>
          </li>
          <loading v-if="loading"></loading>
          <div class="nolist" v-if="!dealList.length&&!loading">
            <p>{{$t('userRecord.nodata')}}</p>
          </div>
        </ul>
      </scroll>
    </div>
  </div>
</transition>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import submitbox from '@/components/message/submitbox'
  import { queryUserIgouDealList } from 'api/usercenter'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        dealList: [],
        tempList: [],
        page: 0,
        loading: false,
        pageCount: 0,
        orderNo: '',
        orderIncrId: 0
      }
    },
    computed: {
      ...mapGetters(['submitbox'])
    },
    created () {
      this._queryUserIgouDealList({})
      this.nickName = this.$route.query.nickName
      this.userName = this.$route.query.userName
    },
    methods: {
      toShareOrderPage (orderNo, goodsName, thumbImage) {
        // 进入晒单页面
        this.$router.push({path: '/shareorder/' + this.$i18n.locale, query: {orderNo: orderNo, goodsName: goodsName, thumbImage: thumbImage}})
      },
      backUserCenter () {
        // this.$router.push('/usercenter/' + this.$i18n.locale)
        if (this.$route.query.issueNo) {
          this.$router.back()
        } else {
          this.$router.push('/usercenter/' + this.$i18n.locale)
        }
      },
      toReceiving (currentlist) {
        // 确认收货
        [this.orderNo, this.orderIncrId] = [currentlist.orderNo, currentlist.orderIncrId]
        this.setSubmitBox(true)
      },
      updata (msg) {
        // 更新收货状态
        for (let list of this.dealList) {
          if (list.orderNo === msg) {
            list.sendGoodsState = 4
            list.proStateText = this.$t('userRecord.proStateText[3]')
          }
        }
      },
      _queryUserIgouDealList ({page = 0, pageSize = 10}) {
        this.loading = true
        queryUserIgouDealList({
          page: page,
          pageSize: pageSize
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.tempList = this.tempList.concat(res.data.data.dealList)
            this.dealList = this.tempList
            this.pageCount = res.data.data.totalNum
            this.loading = false
            for (let list of this.dealList) {
              switch (list.sendGoodsState) {
                case 1:
                  list.proStateText = this.$t('userRecord.proStateText[0]')
                  break
                case 2:
                  list.proStateText = this.$t('userRecord.proStateText[1]')
                  break
                case 3:
                  list.proStateText = this.$t('userRecord.proStateText[2]')
                  break
                case 4:
                  list.proStateText = this.$t('userRecord.proStateText[3]')
                  break
                case 5:
                  list.proStateText = this.$t('userRecord.proStateText[4]')
                  break
                default:
                  list.proStateText = this.$t('userRecord.proStateText[5]')
              }
            }
          }
        })
      },
      scrollDowns () {
        // 上拉加载
        if (this.page < Math.ceil(this.pageCount / 10) - 1) {
          this.page = this.page + 1
          this.loading = true
          this._queryUserIgouDealList({page: this.page, pageSize: 10})
        } else {
          this.loading = false
        }
      },
      toSubmitAddress (list) {
        // 进入地址确认页面
        this.$router.push({path: '/submitaddress/' + this.$i18n.locale,
          query: {
            goodName: list.goodName,
            thumbImage: list.thumbImage,
            orderIncrId: list.orderIncrId,
            orderNo: list.orderNo,
            issueNo: this.$route.query.issueNo
          }})
      },
      ...mapMutations({
        setSubmitBox: 'SET_SUBMIT_BOX'
      })
    },
    components: {
      scroll,
      loading,
      submitbox
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/fontsize"
  .userrecord
    background:$color-bgcolor
    min-height:100vh
    position:absolute
    width:100%
    .mask
      position:fixed
      width:100%
      height:100vh
      background:rgba(0,0,0,.5)
      top:0
      z-index:1500
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
      z-index:1001
      border-bottom:1px solid $color-border
      .left
        position:absolute
        padding:0.25rem 0.3rem 0.25rem 0.25rem
        left:0
        font-size:0.4rem
        color:$color-meta
      p
        text-align:center
        width:100%
    .usercard
      height:1.5rem
      padding-top:0.9rem
      display:flex
      align-items:center
      font-size:0.3rem
      position:fixed
      z-index:1000
      img
        width:100%
        height:100%
    .prizepro
      padding-top:2.4rem
      .prizelist
        // position:fixed
        height:9rem
        .prizeitem
          padding:0.4rem 0.3rem
          border-bottom:1px solid #f5f5f5
          font-size:0.25rem
          display:flex
          justify-content:space-between
          background:#fff
          .priimg
            width:1.2rem
            height:1.2rem
            img
              width:100%
              height:100%
          .right
            width:5.4rem
            position:relative
            .primsg
              font-size:0.24rem
              .base
                padding-bottom:0.2rem
              .weaken
                padding-bottom:0.2rem
            .stateMsg
              display:flex
              justify-content:space-between
              align-items:center
              .stateMsg_left
                .btn
                  display:inline-block
                  padding:0.15rem 0.2rem
                  // background:$color-meta
                  border-radius:0.1rem
                  color:$color-meta
                  border:1px solid $color-meta
                  // color:#fff
                .delivery
                  color:$color-weaken-font
                  margin-right:0.1rem
            .stateMsg_right
              color:$color-sky-blue
              position:absolute
              right:-0.5rem
              bottom:-0.5rem
              padding:0.5rem
      .nolist
        height:1rem
        font-size:0.24rem
        text-align:center
        line-height:1rem
        color:$color-weaken-font
        background:$color-bgcolor
</style>

