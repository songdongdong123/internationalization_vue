<template>
  <div class="previous">
    <!-- <div class="meta">
      <div class="returnIcon" @click="backPrevePage">
        <span class="icon-fanhui"></span>
        <span class="backText">{{$t('previous.returnText')}}</span>
      </div>
    </div> -->
    <div class="title">
      <span @click="backPrevePage" class="left icon-fanhui1"></span>
      <p>{{$t('previous.meta')}}</p>
    </div>
    <div class="previouslist">
      <scroll
        :data="dealList"
        :listenScroll="true"
        @scrollDown="scrollDowns"
        class="list">
        <ul>
          <li class="item" 
            @click="toPreviousPro(list.issueNo, list.activityType)"
            v-for="list in dealList">
            <div class="left">
              <img v-lazy="list.thumbImage" alt="">
            </div>
            <div class="right">
              <div class="prizemsg">
                <!-- 期号 -->
                <p>{{$t('previous.issueNo')}}:{{list.issueNo}}</p>
                <!-- 获奖者 -->
                <p>{{$t('previous.luckyMan')}}:{{list.name}}</p>
                <!-- 幸运码 -->
                <p>{{$t('previous.Fortuna')}}:{{list.luckyNumber}}</p>
              </div>
              <div class="prizestate">
                <p class="special">{{$t('previous.HasAnnounced')}}</p>
                <p class="time">{{list.time}}</p>
              </div>
            </div>
          </li>
          <loading v-if="loading"></loading>
          <div class="nodata" v-if="!dealList.length&&!loading">
            <!-- 没有更多记录 -->
            <p>{{$t('previous.nodata')}}</p>
          </div>
        </ul>
      </scroll>
    </div>
  </div>
</template>
<script>
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import { getOldIssueList } from 'api/order'
  export default {
    data () {
      return {
        testArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9],
        dealList: [],
        tempList: [],
        page: 0,
        loading: false,
        pageCount: 0
      }
    },
    created () {
      this.itemId = this.$route.query.itemId
      this._getOldIssueList({})
      scrollTo(0, 0)
    },
    methods: {
      backPrevePage () {
        this.$router.back()
        // this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: this.$route.query.issueNo}})
      },
      toPreviousPro (issueNo, activityType) {
        // this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: issueNo, previous: 1}})
        if (activityType === 0) {
          this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: issueNo, previous: 1}})
        } else {
          this.$router.push({path: '/freeproduct/' + this.$i18n.locale, query: {issueNo: issueNo, freestate: 1, pro: 'pro'}})
        }
      },
      _getOldIssueList ({page = 0, pageSize = 10}) {
        this.loading = true
        getOldIssueList({
          itemId: this.itemId,
          page: page,
          pageSize: pageSize
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.tempList = this.tempList.concat(res.data.data.issueList)
            this.dealList = this.tempList
            this.pageCount = res.data.data.totalNum
            this.loading = false
          } else {
            this.loading = false
          }
        })
      },
      scrollDowns () {
        if (this.page < Math.ceil(this.pageCount / 10) - 1) {
          this.page = this.page + 1
          this.loading = true
          this._getOldIssueList({page: this.page, pageSize: 10})
        } else {
          this.loading = false
        }
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
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .previous
    background:$color-bgcolor
    color:$color-issue-font
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
    .previouslist
      padding-top:0.9rem
      .list
        height:10.5rem
        .item
          padding:0.2rem 0.2rem
          // height:1.8rem
          background:#fff
          border-bottom:1px solid #f5f5f5
          display:flex
          justify-content:space-between
          align-items:center
          // background:pink
          .left
            width:1rem
            height:1rem
            img
              width:100%
              height:100%
          .right
            width:5.7rem
            font-size:0.25rem
            display:flex
            justify-content:space-between
            align-items:center
            position: relative
            .prizemsg
              width:3rem
              color:$color-general-font
              font-size:0.24rem
            p
              width:100%
              overflow: hidden
              text-overflow:ellipsis
              white-space: nowrap
              height:0.4rem
              line-height:0.4rem
            .prizemsg>p:not(:last-child)
              margin-bottom:0.15rem
            .prizestate
              text-align:right
              width:100%
              font-size:0.24rem
              height:100%
              position:absolute
              .special
                color:$color-general-font
                position:absolute
                top:0
              .time
                color:$color-weaken-font
                position:absolute
                bottom:0
      .nodata
        height:1rem
        font-size:0.24rem
        text-align:center
        line-height:1rem
        color:#ccc
</style>

