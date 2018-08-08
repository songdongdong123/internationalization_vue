<template>
<transition name="slide">
  <div class="payrecord">
    <div class="title">
      <div class="titlecontainer">
        <span @click="backUserCenter" class="left icon-fanhui1"></span>
        <!-- 充值记录 -->
        <p>Tus Recargas</p>
      </div>
    </div>
    <scroll
      :data="dealList"
      :listenScroll="true"
      @scrollDown="scrollDowns"
      class="paylist"
      >
      <div>
        <ul class="list" v-if="dealList">
          <li class="item" v-for="list in dealList">
            <div class="left">
              <!-- 订单号 -->
              <p class="top">{{list.name}} Boletos <span class="presentAmount" v-show="list.presentAmount">Regalo {{list.presentAmount}}</span></p>
              <p class="bottom">{{list.tradeTime}}</p>
            </div>
            <div class="right">
              <!-- 金币 -->
              <p class="top">+ {{list.money}} Boletos</p>
              <!-- <p class="bottom">{{list.tradeTime}}</p> -->
            </div>
          </li>
        <div class="loading" v-if="loading">
          <loading></loading>
        </div>
        <div class="nolist" v-if="!dealList.length">
          <!-- 没有更多记录 -->
          <p>{{$t('payrecord.nodata')}}</p>
        </div>
        </ul>
      </div>
    </scroll>
  </div>
</transition>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import { getRechargeRecordList } from 'api/usercenter'
  export default {
    data () {
      return {
        dealList: [],
        tempList: [],
        page: 0,
        loading: false,
        pageCount: 0,
        channelType: ''
      }
    },
    created () {
      // this.$loading('open')
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      this._getRechargeRecordList({})
    },
    methods: {
      backUserCenter () {
        this.$router.push({path: '/usercenter/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
        // this.$router.back()
      },
      scrollDowns () {
        if (this.page < Math.ceil(this.pageCount / 10) - 1) {
          this.page = this.page + 1
          this.loading = true
          this._getRechargeRecordList({page: this.page, pageSize: 10})
        } else {
          this.loading = false
        }
      },
      _getRechargeRecordList ({page = 0, pageSize = 10}) {
        this.loading = true
        getRechargeRecordList({
          page: page,
          pageSize: pageSize
        }).then(res => {
          if (res.data.data) {
            this.tempList = this.tempList.concat(res.data.data.recordList)
            this.dealList = this.tempList
            this.pageCount = res.data.data.totalNum
          }
          this.loading = false
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
  .bottom
    color:$color-weaken-font
    font-size:0.24rem
  .top
    font-size:0.35rem
  .payrecord
    background:$color-bgcolor
    min-height:100vh
    top:0
    width:100%
    color:$color-general-font
    position:absolute
    width:100%
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
    .paylist
      margin-top:0.9rem
      height:9rem
      .list
        background-color:#fff
        .item
          // height:5rem
          padding: 0.3rem 0.2rem
          border-bottom:1px solid #f5f5f5
          display:flex
          justify-content:space-between
          line-height:0.5rem
          .right
            text-align:right
            .top
              font-size:0.3rem
              color:$color-yellow
          .left
            .top
              font-size:0.3rem
              .presentAmount
                color:#FF9933
            .bottom
              font-size:0.24rem
    .nolist
      height:1rem
      font-size:0.24rem
      text-align:center
      line-height:1rem
      color:$color-weaken-font
      background:$color-bgcolor
    .loading
      margin-top:0.2rem
      background:$color-bgcolor
</style>

