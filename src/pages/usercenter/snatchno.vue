<template>
  <div class="snatchno">
    <div class="title">
      <div class="titlecontainer">
        <span @click="backUserCenter" class="left icon-fanhui1"></span>
        <!-- 我的夺宝号 -->
        <p>{{$t('snatchno.mySnatch')}}</p>
      </div>
    </div>
    <div class="mynumber">
      <scroll
        :listenScroll="true"
        :data="numberList"
        class="numberC"
      >
        <div class="content">
          <div class="goodsMsg">
            <!-- 商品 -->
            <p class="label">Producto</p>
            <p class="labelMsg">
              <span class="labelMsgpro">{{goodsName}}</span>
              <span>{{$t('snatchno.issueNo')}}：{{issueNo}}</span>
            </p>
          </div>
          <div class="goodsMsg">
            <p class="label">Tus Boletos/Total</p>
            <p class="labelMsg">{{currentBuy}}/{{totalBuy}}</p>
          </div>
          <div class="numberContent">
            <p class="label">Folios de tus Boletos</p>
            <p class="cotainer"> 
              <span v-for="list in numberList">{{list}}</span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <!-- <p>没有更多记录</p> -->
            </p>
          </div>
          <!-- <div class="nolist">
            <p>{{$t('userRecord.nodata')}}</p>
          </div> -->
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import { getUserIgouNumberList, getIssueSampleInfo } from 'api/order'
  export default {
    data () {
      return {
        issueNo: '',
        numberList: [],
        goodsName: '',
        currentUsers: 0,
        metaText: '',
        currentNumbers: 0,
        currentBuy: '',
        totalBuy: '',
        channelType: ''
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      this.issueNo = this.$route.query.issueNo
      this._getUserIgouNumberList(this.$route.query.issueNo)
      this._getIssueSampleInfo(this.$route.query.issueNo)
      if (this.$route.query.pro === 'pro') {
        // 商品详情
        this.metaText = this.$t('snatchno.prodetail')
      } else {
        // 夺宝记录
        this.metaText = this.$t('snatchno.snatchRecord')
      }
    },
    methods: {
      backUserCenter () {
        if (this.$route.query.pro === 'pro') {
          this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: this.$route.query.issueNo, channelType: this.channelType, channelTag: this.channelTag}})
        } else {
          // this.$router.push('/recordlist/' + this.$i18n.locale)
          this.$router.back()
        }
      },
      _getIssueSampleInfo (issueNo) {
        getIssueSampleInfo({
          issueNo: issueNo
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.goodsName = res.data.data.goodsName
            // this.currentBuy = res.data.data.currentBuy
            this.totalBuy = res.data.data.totalBuy
          }
        })
      },
      _getUserIgouNumberList (issueNo) {
        this.$loading({state: true})
        getUserIgouNumberList({
          issueNo: issueNo
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.numberList = res.data.data.numberList
            this.currentNumbers = res.data.data.totalNum
            this.currentBuy = res.data.data.buyNum
            this.$loading({state: false})
          }
        })
      }
    },
    components: {
      scroll,
      loading
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/fontsize"
  .snatchno
    background:$color-bgcolor
    min-height:100vh
    color:$color-general-font
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
        justify-content:space-between
        align-items:center
        margin:auto 0.32rem
        .left
          position:absolute
          padding:0 0.3rem 0 0.25rem
          left:0
          font-size:0.4rem
          color:$color-meta
        p
          text-align:center
          width:100%
    .mynumber
      padding-top:0.9rem
      .numberC
        height:11rem
        .content
          .goodsMsg
            background:#fff
            padding:0.3rem 0.32rem
            margin-top:0.2rem
            .label
              font-size:0.3rem
              font-weight:bold
            .labelMsg
              font-size:0.24rem
              display:flex
              justify-content:space-between
              margin-top:0.3rem
              color:$color-weaken-font
              .labelMsgpro
                width:50%
                overflow: hidden
                text-overflow:ellipsis
                white-space: nowrap
          .numberContent
            background:#fff
            margin-top:0.2rem
            padding:0.3rem 0.32rem
            .label
              font-weight: bold
              margin-bottom:0.3rem
              font-size:0.3rem
            .cotainer
              word-wrap:break-word
              font-size:0.3rem
              margin:0 auto
              display:flex
              flex-wrap:wrap
              justify-content:space-between
              align-items:center
              span
                color:$color-weaken-font
                font-family:Consolas, Monaco, monospace
                display:inline-block
                height:0.6rem
                line-height:0.6rem
                width:0.8rem
                font-size:0.24rem
              span:empty
                height:0
                width:0.8rem
                border:none
        .nolist
          width:100%
          height:1rem
          font-size:0.24rem
          text-align:center
          line-height:1rem
          color:$color-weaken-font
</style>

