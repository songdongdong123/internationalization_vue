<template>
  <div class="goodslist">
    <div class="goods_top">
      <div class="title">
        <span class="icon-fanhui1 left" @click="backHome"></span>
      </div>
      <div class="navbar">
        <ul class="navlist">
          <li 
            class="navitem" 
            :class="{'navactive': index === ind}"
            @click="choosebar(index)"
            v-for="(list, index) in navBar">{{list.name}}
            <div v-if="index === 2" class="iconCon">
            </div>
            </li>
        </ul>
      </div>
    </div>
    <div class="insignificance"></div>
    <div class="hideBar" v-show="fixed"></div>
    <scroll
      :listenScroll="true"
      :data="issueList"
      @scrollDown="scrollDowns"
      @pullDown="pullDowns"
      class="product"
    >
    <div>
      <div class="loading" v-show="loading1">
        <loading></loading>
      </div>
      <ul class="product_list">
        <li class="product_item" 
          @click="toProductDetail(list.issueNo)"
          v-for="(list, index) in issueList">
            <div class="pic">
              <img v-lazy="list.thumbImage" alt="">
              <!-- <p class="product_name">{{list.goodsName}}</p> -->
            </div>
            <div class="product_name">
              <p class="text">$1 para ganar</p>
            </div>
              <del>${{list.curprice}}.00</del>
            <div class="statistics">
              <!-- 总 -->
              <!-- <span>{{$t('home.overall')}}:{{list.totalBuy}}</span> -->
              <!-- 剩 -->
              <!-- <span>{{$t('home.remain')}}:{{list.surplusBuy}}</span> -->
            </div>
            <mt-progress :value="list.progress" :bar-height="5"></mt-progress>
        </li>
      </ul>
      <loading v-if="loading2"></loading>
      <div class="nolist" v-if="nodataState">
        <p>{{$t('recordList.nodata')}}</p>
      </div>
    </div>
    </scroll>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // import { getScroll } from 'common/js/native'
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import { getIssueList } from 'api/home'
  export default {
    data () {
      return {
        issueList: [],
        navBar: this.$t('navBar'),
        ind: 0,
        fixed: false,
        loading1: false,
        loading2: false,
        pageCount: 0,
        tempIssue: [],
        page: 0,
        tag: 0,
        nodataState: false
      }
    },
    created () {
      // this.$i18n.locale = this.$route.params.lang === 'zh' ? 'zh' : 'en'
      this.ind = Number(this.$route.query.tag)
      this.tag = Number(this.$route.query.tag)
      this._getIssueList({})
      scrollTo(0, 0)
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    computed: {
      ...mapGetters([
        'scrollState'
      ])
    },
    methods: {
      backHome () {
        this.$router.push({path: '/home/' + this.$i18n.locale})
      },
      _getIssueList ({page = 0, pageSize = 10}) {
        this.$loading({state: true})
        this.loading = true
        getIssueList({
          page: page,
          pageSize: pageSize,
          tag: this.tag
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.tempIssue = this.tempIssue.concat(res.data.data.issueList)
            this.issueList = this.tempIssue
            if (this.issueList.length === 0) {
              this.nodataState = true
            } else {
              this.nodataState = false
            }
            this.pageCount = res.data.data.totalNum
            this.loading1 = false
            this.loading2 = false
            this.$loading({state: false})
          }
        })
      },
      choosebar (index) {
        this.ind = index
        this.tag = index
        this.issueList = []
        this.tempIssue = []
        this.page = 0
        this._getIssueList({})
        // 人气排序
      },
      pullDowns () {
        // 下拉刷新
        this.loading1 = true
        this.timer = setTimeout(() => {
          this.issueList = []
          this.tempIssue = []
          this._getIssueList({})
        }, 1500)
      },
      scrollDowns () {
        // 触底加载
        if (this.page < Math.ceil(this.pageCount / 10) - 1) {
          this.page = this.page + 1
          this.loading2 = true
          this._getIssueList({page: this.page, pageSize: 10})
        } else {
          this.loading2 = false
        }
      },
      toProductDetail (issueNo) {
        this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: issueNo, tag: this.tag}})
      },
      handleScroll () {
        // 顶部导航固定
        // let top = getScroll().top
        // if (top >= 50) {
        //   this.fixed = true
        // } else {
        //   this.fixed = false
        // }
      }
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    components: {
      scroll,
      loading
    }
  }
</script>
<style>
.mt-progress-progress{
  background-color:#FFCA3E !important;
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
  @import "../../common/stylus/mixin"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/fontsize"
  .mask
    position:fixed
    bottom:0
    left:0
    background:rgba(0,0,0,.5)
    width:100%
    height:100%
    z-index:1000
  .goodslist
    background:$color-bgcolor
    min-height:100vh
    position:absolute
    width:100%
    .insignificance
      height:1.9rem
    .goods_top
      position:fixed
      z-index:100
      .title
        font-size:$font-meta
        height:$meta-height
        padding: 0 0.32rem 0 0.32rem
        display:flex
        align-items:center
        justify-content:space-between
        width:6.86rem
        background:$color-white
        color: $color-general-font
        text-align:center
        border-bottom:1px solid $color-border
        .left
          position:absolute
          padding:0.25rem 0.3rem 0.25rem 0.25rem
          left:0
          font-size:0.4rem
          color:$color-meta
      .navbar
        border-bottom:1px solid #f5f5f5
        // border-top:1px solid #f5f5f5
        font-size:0
        z-index:1000
        .navlist
          display: flex
          font-size:0
          height:1rem
          line-height:1rem
          background:#fff
          .navitem
            font-size:0.3rem
            width:2.5rem
            text-align:center
            color:$color-general-font
            position: relative
            .iconCon
              position:absolute
              top 0.34rem
              right:0.6rem
              // height:100%
              display:flex
              // align-items:center
          .navactive
            border-bottom:2px solid $color-meta
            color:$color-meta
            font-size:0.32rem

    .product
      padding:0 0.2rem
      background:$color-bgcolor
      height:10rem
      .loading
        margin:0
        padding-top:0.25rem  
      .product_list
        display:flex
        justify-content:space-between
        flex-wrap:wrap
        .product_item
          // height:5rem
          width:3.45rem
          position: relative
          overflow: hidden
          font-size:0.3rem
          background:#fff
          margin-top:0.2rem
          border-radius:0.1rem
          padding-bottom:0.2rem
          .pic
            width:3.45rem
            height:3.45rem
            position: relative
            img
              width:100%
              height:100%
          .product_name
            padding:0 0.2rem
            margin-top:0.1rem
            font-size:0.26rem
            // color:$color-general-font
            display:flex
            justify-content:space-between
            align-items:center
            .text
              height:0.5rem
              line-height:0.5rem
              color:#000
          del
            padding-left:0.2rem
            color:$color-issue-font
            font-size:0.24rem
          .statistics
            margin-top:0.2rem
            // margin:auto 0.2rem
            // margin-top:0.2rem
            // display:flex
            // justify-content:space-between
            // color:$color-six-font
            // font-size:0.22rem
            // height:0.25rem
          .mt-progress
            margin:auto 0.2rem
            height:0.1rem
            margin-top:0.15rem
    .productFixed
      position:fixed
      padding-top:1rem
    .nolist
        width:100%
        height:1rem
        font-size:0.24rem
        text-align:center
        line-height:1rem
        color:$color-weaken-font
</style>
