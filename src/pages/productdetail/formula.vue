<template>
  <div class="formula">
    <div class="title">
      <span @click="backUserCenter" class="left icon-fanhui1"></span>
      <!-- 计算详情 -->
      <p>{{$t('formula.formulaDetail')}}</p>
    </div>
    <div class="mask" v-show="loading"></div>
    <div class="pagecontent">
      <scroll
        :listenScroll="listenScroll"
        :data="recordList"
        class="content"
      >
        <div class="container">
          <div class="counter_res">
            <!-- 计算结果 -->
            <p class="res_title">{{$t('formula.countResult')}}</p>
            <p class="res_no">{{luckyNumber}}</p>
          </div>
          <div class="counter">
            <!-- 计算公式 -->
            <p class="counter_title">{{$t('formula.countFormula')}}</p>
            <!-- (数值A÷商品所需人次)去余数+1 -->
            <div class="equation">
              <p>{{$t('formula.countFormulaDetail')}}</p>
              <p>=({{valueA}}÷{{maxbuy}}){{$t('formula.remainder')}}={{luckyNumber-1}};{{luckyNumber-1}}+1=<span class="lucknumber">{{luckyNumber-0}}</span></p>
            </div>
          </div>
          <div class="detailcounter">
            <!-- 数值A -->
            <p class="detail_title">{{$t('formula.valueV')}}</p>
            <!-- 截止该商品开奖时间点前最后50条参与时间之和 -->
            <div class="equation">
              <p>{{$t('formula.explain')}}</p>
              <p class="value">={{valueA}}</p>
            </div>
          </div>
          <div class="tabelData">
            <!-- 最后50条参与记录 -->
            <p class="tabelTitle">{{$t('formula.The_last_article_50')}}</p>
            <table class="gridtable ">
              <!-- <tr>
                <th>夺宝时间</th>
                <th>取值</th>
                <th>用户</th>
              </tr> -->
              <tr v-for="list in recordList">
                <td class="value">{{list.timeDesc}}</td>
                <td class="value">{{list.time}}</td>
                <td class="winnername">{{list.name}}</td>
              </tr>
            </table>
          </div>
          <!-- <div class="nolist">
            <p>{{$t('recordList.nodata')}}</p>
          </div> -->
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import { getIssueCalculDetail } from 'api/order'
  import scroll from '@/components/scroll/scroll'
  export default {
    data () {
      return {
        recordList: [],
        valueA: '',
        showall: false,
        listenScroll: false,
        luckyNumber: '',
        maxbuy: '',
        loading: false
      }
    },
    created () {
      this._getIssueCalculDetail(this.$route.query.issueNo)
    },
    methods: {
      backUserCenter () {
        // 返回往期商品详情
        this.$router.back()
        // this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: this.$route.query.issueNo}})
      },
      _getIssueCalculDetail (issueNo) {
        this.$loading({state: true})
        this.loading = true
        getIssueCalculDetail({
          issueNo: issueNo
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.recordList = res.data.data.recordList
            this.valueA = res.data.data.valueA
            this.luckyNumber = res.data.data.luckyNumber
            this.maxbuy = res.data.data.maxbuy
            this.$loading({state: false})
            this.loading = false
          } else {
            this.$loading({state: false})
            this.loading = false
          }
        })
      }
    },
    components: {
      scroll
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .formula
    min-height:100vh
    background:$color-bgcolor
    color:$color-general-font
    position:absolute
    width:100%
    .mask
      background:rgba(0,0,0,.3)
      position:fixed
      z-index:1500
      width:100%
      height:100%
      top:0
      left:0
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
    .pagecontent
      padding-top:0.9rem
      .content
        height:11rem
        .container
          .counter_res
            margin-top:0.2rem
            padding:0rem 0.32rem 0 0.32rem
            height:1.5rem
            background:#fff
            font-size:0.3rem
            border-bottom:1px solid #f5f5f5
            .res_title
              font-weight: bold
              padding-top:0.3rem
            .res_no
              font-size:0.3rem
              font-weight: bold
              color:$color-meta
              padding-top:0.3rem
          .counter
            height:1.8rem
            padding:0 0.32rem 0 0.32rem
            font-size:0.2rem
            background:#fff
            margin-top:0.2rem
            .counter_title
              font-size:0.3rem
              font-weight: bold
              padding-top:0.3rem
            .equation
              padding-top:0.3rem
              color:$color-weaken-font
              line-height:0.4rem
              p
                font-size:0.24rem
                .lucknumber
                  color:$color-meta
          .detailcounter
            // height:1.8rem
            background:#fff
            font-size:0.2rem
            padding:0 0.32rem 0.2rem 0.32rem
            margin-top:0.2rem
            border-top:1px solid #f5f5f5
            border-bottom:1px solid #f5f5f5
            .detail_title
              font-size:0.3rem
              font-weight: bold
              padding-top:0.3rem
            .equation
              padding-top:0.3rem
              line-height:0.4rem
              color:$color-weaken-font
              font-size:0.24rem
              .value
                color:$color-meta
          .tabelData
            background:#fff
            margin-top:0.2rem
            padding:0 0.32rem 0 0.32rem
            .tabelTitle
              font-size:0.3rem
              font-weight:bold
              padding: 0.4rem 0 0.2rem 0
            .gridtable
              width:6.86rem
              height:2rem
              overflow-y: hidden
              color:$color-weaken-font
              tr
                display:flex
                justify-content:space-between
              tr>td
                text-align:left
                height:0.5rem
                line-height:0.5rem
                font-size:0.2rem
              tr>.value
                  font-family:Consolas, Monaco, monospace
              tr>.winnername
                // display:inline-block
                width:1.1rem
                overflow: hidden
                // text-overflow:ellipsis
                white-space: nowrap
                text-align:right 
          .nolist
            width:100%
            height:1rem
            font-size:0.24rem
            text-align:center
            line-height:1rem
            color:$color-weaken-font
</style>

