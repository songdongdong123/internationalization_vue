<template>
<transition name="slide">
  <div class="payrecord">
    <div class="title">
      <span @click="backUserCenter" class="left icon-fanhui1"></span>
      <!-- 充值记录 -->
      <p>{{$t('payrecord.payrecord')}}</p>
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
              <p class="top">{{$t('payrecord.orderNo')}}</p>
              <p class="bottom">NO:{{list.orderId}}</p>
            </div>
            <div class="right">
              <!-- 金币 -->
              <p class="top">{{list.money}}</p>
              <p class="bottom">{{list.tradeTime}}</p>
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
        pageCount: 0
      }
    },
    created () {
      // this.$loading('open')
      this._getRechargeRecordList({})
    },
    methods: {
      backUserCenter () {
        this.$router.push('/usercenter/' + this.$i18n.locale)
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
      p
        text-align:center
        width:100%
    .paylist
      padding-top:0.9rem
      height:10.5rem
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
              font-size:0.24rem
          .left
            .top
              font-size:0.24rem
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

