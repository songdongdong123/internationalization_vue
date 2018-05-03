<template>
  <div class="winner">
    <div class="title">
      <span @click="backHome" class="left icon-fanhui1"></span>
      <!-- 获奖者 -->
      <p>{{$t('userRecord.winners')}}</p>
    </div>
    <div class="container">
      <scroll
        :listenScroll="listenScroll"
        :data="dealList"
        @scrollDown="scrollDowns"
        class="content"
      >
        <div class="card">
          <!-- <div class="loading" v-show="loading1">
            <loading></loading>
          </div> -->
          <ul class="winnerlist">
            <li class="winneritem" v-for="(list, index) in dealList"
            :class="{'winneritemAvtive': touchState&&index === ind}"
            @touchstart="touchstart(index)" 
            @touchend="touchevent(index)">
              <div class="left">
                <div class="img">
                  <img :src="list.thumbImage" alt="">
                </div>
              </div>
              <div class="right">
                <div class="goodsmsg">
                  <!-- 期号 -->
                  <p class="top">{{$t('userRecord.issueNum')}}：{{list.issueNo}}</p>
                  <!-- 获奖者： -->
                  <p class="top">{{$t('userRecord.winners')}}：{{list.winnerName}}</p>
                  <!-- 幸运号码 -->
                  <p>{{$t('userRecord.luckNum')}}：{{list.luckyNo}}</p>
                </div>
                <!-- <p class="Announced"></p> -->
                <p class="time">{{list.openTime}}</p>
              </div>
            </li>
          </ul>
          <div class="loading" v-if="loading2">
            <loading></loading>
          </div>
          <div class="nolist" v-if="!dealList.length&&!loading2">
            <p>{{$t('userRecord.nodata')}}</p>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import { queryAllWinner } from 'api/usercenter'
  export default {
    data () {
      return {
        listenScroll: true,
        test: [1, 2, 3, 4, 5, 6, 6, 7],
        dealList: [],
        tempList: [],
        page: 0,
        loading1: false,
        loading2: false,
        pageCount: 0,
        touchState: false,
        ind: ''
      }
    },
    created () {
      this._getAllWinner({})
    },
    methods: {
      backHome () {
        this.$router.back()
        // new TouchFeedback('.warpper')
      },
      touchevent (index) {
        this.ind = ''
        this.touchState = false
        // console.log('enevet')
      },
      touchstart (index) {
        this.ind = index
        this.touchState = true
        // console.log('start')
      },
      _getAllWinner ({page = 0, pageSize = 10}) {
        this.loading1 = true
        queryAllWinner({
          page: page,
          pageSize: pageSize
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.tempList = this.tempList.concat(res.data.data.winnerList)
            this.dealList = this.tempList
            this.pageCount = res.data.data.totalNum
            this.loading2 = false
          }
        })
      },
      scrollDowns () {
        // 上拉加载
        this.loading2 = true
        if (this.page < Math.ceil(this.pageCount / 10) - 1) {
          this.page = this.page + 1
          this._getAllWinner({page: this.page, pageSize: 10})
        } else {
          this.loading2 = false
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
  .winner
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
    .container
      padding-top:$meta-height
      .content
        height:10.5rem
        .card
          .winnerlist
            .winneritem
              height:2rem
              border-top:1px solid $color-border
              display:flex
              align-items:center
              padding: 0 0.32rem 0 0.32rem
              background:#fff
              position: relative
              .left
                display:flex
                align-items:center
                .img
                  width:1rem
                  height:1rem
                  // background:pink
                  img
                    width:100%
                    height:100%
              .right
                font-size:0.24rem
                display:flex
                align-items:flex-end
                // justify-content:space-between
                // height:1rem
                margin-left:0.4rem
                width:5.46rem
                position:relative
                .time
                  text-align:right
                  color:$color-weaken-font
                  position:absolute
                  right:0
                .goodsmsg
                  font-size:0.24rem
                  .top
                    margin-bottom:0.15rem
            .winneritemAvtive
              transition:all .5s
              // transform:scale(1.2)
            .winneritem::after
              content: ''
              width: 100%
              height: 100%
              position: absolute
              left: 0
              top: 0
              display:none
              background: rgba(0, 0, 0, .5)
            .winneritem:active::after
              display: block
            .winneritem:active
              box-shadow: inset 0 0 1000px rgba(0, 0, 0, .5);
      .nolist
        width:100%
        height:1rem
        font-size:0.24rem
        text-align:center
        line-height:1rem
        color:$color-weaken-font
</style>

