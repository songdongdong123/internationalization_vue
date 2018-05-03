<template>
  <div class="pay">
    <div class="title">
      <span @click="backUserCenter" class="left icon-fanhui1"></span>
      <!-- 金币充值 -->
      <p>{{$t('payform.payGold')}}</p>
    </div>
    <div class="toast">
      <!-- 选择数量 -->
      <p>{{$t('payform.choosenum')}}</p>
    </div>
    <div class="paylist">
      <ul class="list_container" id="list" ref="list">
        <li class="pay_item" v-for="(list, index) in paylist" 
        @click="toPayWay(list)" :id="index===2?'test': ''">
          <p class="gold"><span class="nums">{{list}}</span> {{$t('beartAlert.gold')}}</p>
          <p>
            <span>${{list}}.00 MXN</span>
            <span class="icon-arrow icon"></span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  // import ad from '@/components/ad/ad'
  // import Vue from 'vue'
  export default {
    data () {
      return {
        paylist: [20, 50, 100, 250, 500],
        score: '',
        issueNo: ''
      }
    },
    created () {
      this.score = this.$route.query.score
      this.issueNo = this.$route.query.issueNo
      // this.$nextTick(() => {
      //   let AdVuecom = Vue.extend(ad)
      //   let vm = new AdVuecom({a: 123}).$mount()
      //   let lists = this.$refs.list.children[2]
      //   lists.before(vm.$el)
      //   console.log(vm)
      // })
    },
    methods: {
      backUserCenter () {
        // this.$router.back()
        this.$router.push({path: '/usercenter/' + this.$i18n.locale})
      },
      toPayWay (list) {
        window.localStorage.setItem('paymoney', list)
        this.$router.push({path: '/payway/' + this.$i18n.locale, query: {nums: list, score: this.score, issueNo: this.issueNo}})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/fontsize"
  .pay
    background:$color-bgcolor
    min-height:100vh
    color:#333
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
    .toast
      padding-top:0.9rem
      font-size: 0.3rem
      height:1.5rem
      line-height:1.5rem
      // background:#fff
      color:$color-six-font
      padding-left:0.32rem
    .paylist
      font-size 0.24rem
      .list_container
        .pay_item
          height:1.5rem
          background:#fff
          padding:0 0.32rem
          display:flex
          align-items:center
          justify-content: space-between
          .gold
            .nums
              font-weight: bold
              font-size:0.3rem
      .list_container>li:not(:first-child)
        border-top:1px solid $color-border
</style>
