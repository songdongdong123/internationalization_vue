<template>
  <div class="recordlist">
    <div class="title">
      <span @click="backUserCenter" class="left icon-fanhui1"></span>
      <!-- 夺宝记录 -->
      <p>{{$t('recordList.recordListText')}}</p>
    </div>
    <div class="navlist">
      <ul class="list">
        <li class="item"
          @click="chooseItem(index)"
          :class="{'itemActive': index === ind}" 
          v-for="(list, index) in navlist">
          {{list}}
        </li>
      </ul>
    </div>
    <div class="snatch_container">
      <scroll
        :data="dealList"
        :listenScroll="true"
        @scrollDown="scrollDowns"
        class="snatch_list"
      >
      <ul >
        <li class="snatch_item" v-for="(list, index) in dealList">
          <div class="top">
            <div class="left" @click="toProductDetail(list.issueNo, list.activityType)">
              <img :src="list.thumbImage" alt="">
            </div>
            <div class="right">
              <div class="proMsg">
                <!-- 商品名 -->
                <p class="productName">{{list.goodName}}</p>
                <!-- 期号 -->
                <p class="weaken">{{$t('recordList.issueNo')}}:{{list.issueNo}}</p>
                <!-- 夺宝时间 -->
                <p class="weaken">{{$t('recordList.snatchTime')}}:{{list.time}}</p>
                <!-- 份数 -->
                <p class="weaken weakenNumber" @click="toSnatchon(list.issueNo)">{{$t('recordList.copies')}}:<span>{{list.buyNum}}</span></p>
              </div>
              <div class="prostate"
                :class="{'nowingState': list.state === 1 || 2, 'announceState': list.state === 3, 'cancelState': list.state===5}">
                <p>{{list.stateText}}</p>
              </div>
            </div>
          </div>
          <div class="getPrize" v-if="list.state === 3">
            <!-- 获奖者 -->
            <p>{{$t('recordList.luckyMan')}}:{{list.name}}</p>
            <!-- 幸运号码 -->
            <p>{{$t('recordList.Fortuna')}}:{{list.luckyNumber}}</p>
            <!-- 开奖时间 -->
            <p>{{$t('recordList.outoftime')}}:{{list.openTime}}</p>
          </div>
          <div class="getPrize" v-if ="false">
            <p>{{$t('recordList.cancelthetime')}}:{{list.time}}</p>
          </div>
        </li>
        <loading v-if="loading"></loading>
        <div class="nolist" v-if="!dealList.length&&!loading">
            <p>{{$t('recordList.nodata')}}</p>
        </div>
      </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import { getAllIgouDealList } from 'api/order'
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        ind: 0,
        navlist: this.$t('recordTab'),
        dealList: [],
        tempList: [],
        page: 0,
        loading: false,
        pageCount: 0,
        stateText: ''
      }
    },
    created () {
      // this.$i18n.locale = this.$route.params.lang === 'zh' ? 'zh' : 'en'
      this._getAllIgouDealList({})
      // this.$loading()
      this.setSuccessPage(false)
    },
    methods: {
      chooseItem (index) {
        this.ind = index
        this.dealList = []
        this.tempList = []
        this.page = 0
        this._getAllIgouDealList({page: 0, pageSize: 10, tag: this.ind})
      },
      backUserCenter () {
        this.$router.push('/usercenter/' + this.$i18n.locale)
        // if (this.$route.query.type !== 2) {
        //   this.$router.back()
        // } else {
        //   this.$router.push({path: '/usercenter/' + this.$i18n.locale})
        // }
      },
      toProductDetail (issueNo, activityType) {
        // 前往商品详情
        if (activityType === 0) {
          this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: issueNo, pro: 'record'}})
        } else {
          this.$router.push({path: '/freeproduct/' + this.$i18n.locale, query: {issueNo: issueNo, freestate: 1, pro: 'record'}})
        }
      },
      toSnatchon (issueNo) {
        // 前往我的夺宝号
        this.$router.push({path: '/snatchno/' + this.$i18n.locale, query: {issueNo: issueNo}})
      },
      _getAllIgouDealList ({page = 0, pageSize = 10, tag = this.ind}) {
        this.loading = true
        getAllIgouDealList({
          page: page,
          pageSize: pageSize,
          tag: tag
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.tempList = this.tempList.concat(res.data.data.dealList)
            this.dealList = this.tempList
            this.pageCount = res.data.data.totalNum
            this.loading = false
            for (let list of this.dealList) {
              switch (list.state) {
                case 1:
                  list.stateText = this.$t('recordState[0]')
                  break
                case 2:
                  list.stateText = this.$t('recordState[0]')
                  break
                case 3:
                  list.stateText = this.$t('recordState[1]')
                  break
                case 5:
                  list.stateText = this.$t('recordState[2]')
                  break
              }
            }
          }
        })
      },
      scrollDowns () {
        if (this.page < Math.ceil(this.pageCount / 10) - 1) {
          this.page = this.page + 1
          this.loading = true
          this._getAllIgouDealList({page: this.page, pageSize: 10, tag: this.ind})
        } else {
          this.loading = false
        }
      },
      ...mapMutations({
        setSuccessPage: 'SUCCESS_PAGE_STATE'
      })
    },
    components: {
      scroll,
      loading
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .recordlist
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
    .navlist
      z-index:1000
      position:fixed
      padding-top:$meta-height
      background:#fff
      .list
        display:flex
        font-size:0.3rem
        height:1rem
        line-height:1rem
        border-bottom:1px solid #f5f5f5
        .item
          width:2.5rem
          text-align:center
        .itemActive
          border-bottom:2px solid $color-meta
          color:$color-meta
          font-size:0.32rem
    .snatch_container
      padding-top:1.9rem
      .snatch_list
        // padding:0 0.2rem 0 0.2rem
        height:9.5rem
        .snatch_item
          padding:0.2rem
          background:#fff
          // padding-top:0.2rem
          border-bottom:1px solid #f5f5f5
          .top
            display:flex
            font-size:0.25rem
            .left
              width:2rem
              height:2rem
              img
                width:100%
                height:100%
            .right
              width:4.9rem
              margin-left:0.2rem
              display:flex
              justify-content:space-between
              align-items:flex-start
              line-height:0.5rem
              .proMsg
                font-size:0.24rem
                .myno
                  color:$color-sky-blue
                  span
                    color:$color-sky-blue
                .productName
                  width:3rem
                  overflow: hidden
                  overflow: hidden
                  text-overflow:ellipsis
                  white-space: nowrap
                .weakenNumber
                  span
                    color:$color-sky-blue
              .prostate
                p
                  // padding:0rem 0.2rem 0 0.2rem
              .nowingState
                p
                  // border:1px solid $color-meta
                  color:$color-meta
              .cancelState
                p
                  color:$color-issue-font
              .announceState
                p
                  // border:1px solid $color-yellow
                  color:$color-yellow
          .getPrize
            font-size:0.25rem
            background:#f5f5f5
            width:4.7rem
            margin-left:2.2rem
            margin-top:0.3rem
            line-height:0.5rem
            padding:0.2rem 0
            padding-left:0.2rem
            color:$color-issue-font
            font-size:0.24rem
      .nolist
        width:100%
        height:1rem
        font-size:0.24rem
        text-align:center
        line-height:1rem
        color:$color-weaken-font
</style>
