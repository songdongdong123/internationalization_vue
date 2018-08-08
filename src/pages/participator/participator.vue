<template>
  <div class="participator">
    <div class="title">
      <div class="titlecontainer">
        <span @click="backTo" class="left icon-fanhui1"></span>
        <p>{{$t('product.participator')}}</p>
      </div>
    </div>
    <scroll
      :listenScroll="true"
      :data="dealList"
       @scrollDown="scrollDowns"
      class="content"
    >
      <div>
        <ul class="participator_list">
          <li
            class="participator_item"
            v-for="list in dealList">
            <!-- <div class="image">
              <img :src="list.picture" alt="">
            </div> -->
            <div class="participator_msg">
              <div class="left">
                <p class="name">{{list.name}}</p>
                <p class="time">{{list.time}}</p>
              </div>
              <div class="right">
                <p class="nums">{{list.buyNum}}</p>
              </div>
            </div>
          </li>
        </ul>
        <loading v-if="loading"></loading>
        <div class="nolist" v-if="!dealList.length&&!loading">
            <p>{{$t('recordList.nodata')}}</p>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import { getSimpleDealList } from 'api/order'
  export default {
    data () {
      return {
        page: 0,
        loading: false,
        pageCount: 0,
        issueNo: '',
        tempList: [],
        dealList: []
      }
    },
    created () {
      this.issueNo = this.$route.query.issueNo
      this._getSimpleDealList({})
      scrollTo(0, 0)
    },
    methods: {
      backTo () {
        this.$router.back()
      },
      _getSimpleDealList ({page = 0, pageSize = 10, issueNo = this.issueNo}) {
        getSimpleDealList({
          page: page,
          pageSize: pageSize,
          issueNo: issueNo
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.tempList = this.tempList.concat(res.data.data.dealList)
            this.dealList = this.tempList
            this.pageCount = res.data.data.totalNum
            this.loading = false
          }
        })
      },
      scrollDowns () {
        if (this.page < Math.ceil(this.pageCount / 10) - 1) {
          this.page = this.page + 1
          this.loading = true
          this._getSimpleDealList({page: this.page, pageSize: 10, issueNo: this.issueNo})
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
  .participator
    background:$color-bgcolor
    min-height:100vh
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
      .left
        position:absolute
        padding:0rem 0.3rem 0 0.25rem
        left:0
        font-size:0.4rem
        color:$color-meta
      p
        text-align:center
        width:100%
    .content
      height:11rem
      background:$color-bgcolor
      .participator_list
        padding-top:0.9rem
        background:#fff
        .participator_item
          height:1.5rem
          display:flex
          padding:0 0.32rem
          .participator_msg
            width:100%
            border-bottom:1px solid $color-border
            display:flex
            justify-content:space-between
            align-items:center
            .left
              line-height:0.5rem
              font-size:0.24rem
              .time
                font-size:0.24rem
                // color:$color-weaken-font
            .right
              line-height:0.5rem
              .nums
                font-size:0.24rem
              .share
                font-size:0.24rem
                // color:$color-weaken-font
      .nolist
        width:100%
        height:1rem
        font-size:0.24rem
        text-align:center
        line-height:1rem
        color:$color-weaken-font
</style>
