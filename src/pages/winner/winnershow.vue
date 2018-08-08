<template>
  <div class="winnershow">
    <bigimg
      :state="bigimgState"
      :piclist="picList"
      @hideBigImg="hideBigImg"
    ></bigimg>
    <div class="title">
      <div class="titlecontainer">
        <span @click="backHome" class="left icon-fanhui1"></span>
        <!-- 晒单分享 -->
        <p>{{$t('winnershowe.meta')}}</p>
      </div>
    </div>
    <div class="container">
      <scroll
        :listenScroll="listenScroll"
        class="content"
        :data="dealList"
        @scrollDown="scrollDowns"
        @pullDown="pullDown"
      >
        <div class="shareConten">
          <div class="loading">
            <loading v-show="loading2"></loading>
          </div>
          <!-- <div class="share">
            <p>{{$t('winnershowe.share')}}({{pageCount}})</p>
          </div> -->
          <ul class="sharelist">
            <li class="shareitem" v-for="list in dealList">
              <div class="shareitem">
                <div class="user">
                  <div class="left">
                    <!-- <img v-lazy="list.userPic" alt=""> -->
                    <span>{{list.nickName}} </span>
                  </div>
                  <p class="toptime">{{list.time}} {{list.goodsName}}</p>
                </div>
                <p class="comment">{{list.remark}}</p>
                <div class="imglist" @click="showBigImg(list.userRemarkPic)">
                  <div class="imgbox" v-for="item in list.userRemarkPic">
                    <img v-lazy="item" alt="">
                  </div>
                </div>
                <!-- <p class="goodsname">{{list.goodsName}}</p> -->
              </div>
            </li>
          </ul>
          <loading v-if="loading"></loading>
          <!-- <div class="desc" v-else>
            <p>{{$t('winnershowe.toast')}}</p>
          </div> -->
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import bigimg from '@/components/bigimg/bigimg'
  import { queryShowDeal } from 'api/shareorder'
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        listenScroll: true,
        bigimgState: false,
        page: 0,
        test: [1, 2, 3, 4],
        loading: true,
        loading2: false,
        pageCount: 0,
        tempList: [],
        dealList: [],
        picList: [],
        channelType: '',
        channelTag: ''
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      if (Number(this.$route.query.type) === 0) {
        this.getQueryShowDeal({})
      } else {
        this.getQueryShowDeal({type: 1})
      }
      this.setSuccessPage(false)
    },
    methods: {
      showBigImg (picList) {
        this.picList = picList
        this.bigimgState = !this.bigimgState
      },
      hideBigImg () {
        this.bigimgState = false
      },
      getQueryShowDeal ({page = 0, pageSize = 10, type = 0}) {
        queryShowDeal({
          page: page,
          pageSize: pageSize,
          type: type
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.tempList = this.tempList.concat(res.data.data.list)
            this.dealList = this.tempList
            this.pageCount = res.data.data.totalNum
            this.loading = false
            this.loading2 = false
          }
        })
      },
      pullDown () {
        // 下拉刷新
        this.loading2 = true
        this.timer = setTimeout(() => {
          this.tempList = []
          this.dealList = []
          if (Number(this.$route.query.type) === 0) {
            this.getQueryShowDeal({})
          } else {
            this.getQueryShowDeal({type: 1})
          }
        }, 1500)
      },
      scrollDowns () {
        // 上拉加载
        if (this.page < Math.ceil(this.pageCount / 10) - 1) {
          this.page = this.page + 1
          this.loading = true
          this.getQueryShowDeal({page: this.page, pageSize: 10})
        } else {
          this.loading = false
        }
      },
      backHome () {
        // 返回首页
        if (this.$route.query.type !== 1) {
          this.$router.back()
        } else {
          this.$router.push({path: '/userrecord/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
        }
      },
      ...mapMutations({
        setSuccessPage: 'SUCCESS_PAGE_STATE'
      })
    },
    components: {
      scroll,
      loading,
      bigimg
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .winnershow
    background:$color-bgcolor
    min-height:100vh
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
    .container
      padding-top:$meta-height
      .content
        height:11rem
        .shareConten
          .share
            height:0.8rem
            font-size:0.3rem
            line-height:0.8rem
            background:#fff
            border-top:1px solid $color-border
            padding: 0 0.32rem 0 0.32rem
          .sharelist
            padding-bottom:0.3rem
            .shareitem
              // min-height:3.5rem
              background:#fff
              padding-bottom:0.2rem
              .shareitem
                margin:auto 0.32rem
                border-top:1px solid $color-border
                .user
                  font-size:0.24rem
                  color:$color-issue-font
                  margin-top:0.2rem
                  .left
                    display:flex
                    align-items:center
                    span
                      color:$color-sky-blue
                  .toptime
                    margin-top:0.2rem
                    line-height:0.35rem
                .comment
                  font-size:0.3rem
                  word-wrap:break-word
                  margin:0.2rem 0rem
                .imglist
                  font-size:0
                  display:flex
                  margin-top:0.2rem
                  .imgbox
                    width:2rem
                    height:1.5rem
                    overflow: hidden
                    margin-right:0.1rem
                    position:relative
                    img
                      width:100%
                      position:absolute
                .goodsname
                  font-size:0.24rem
                  color:$color-issue-font
                  padding-top:0.2rem
                  padding-bottom:0.2rem
          .desc
            font-size:0.24rem
            text-align:center
            margin-top:0.5rem
            color:$color-weaken-font
</style>

