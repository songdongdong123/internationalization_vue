<template>
  <div class="pay">
    <div class="title">
      <span @click="backUserCenter" class="left icon-fanhui1"></span>
      <!-- 支付方式 -->
      <p>{{$t('payform.payway')}}</p>
    </div>
    <div class="toast">
      <!-- 选择支付方式 -->
      <p>{{$t('payform.choosepayway')}}</p>
    </div>
    <div class="paylist">
      <ul class="list_container">
        <li class="pay_item" v-for="(list, index) in paywaylist" @click="chooseThis(index)">
          <div class="payicon">
            <!-- 信用卡或储蓄卡 -->
            <p class="waytext">{{$t('payform.visaorbankcard')}}</p>
            <div class="logos">
              <span></span>
            </div>
          </div>
          <p class="payChoose">
            <span class="icon-gouxuan" :class="{'active': index === ind}"></span>
          </p>
        </li>
      </ul>
    </div>
    <div class="paybtn" @click="toPaySuccess">
      <div class="paycontent">
        <p class="paynums">
          <span class="nums">$ {{paymoney}}</span>
          <span>MXN</span>
        </p>
        <!-- 去付款 -->
        <p>{{$t('payform.pago')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        paylist: [50, 100, 250, 500, 1000],
        ind: 0,
        score: '',
        paymoney: 0,
        issueNo: '',
        paywaylist: [0]
      }
    },
    created () {
      this.paymoney = this.$route.query.nums
      this.score = this.$route.query.score
      this.issueNo = this.$route.query.issueNo
    },
    methods: {
      backUserCenter () {
        // this.$router.back()
        this.$router.push({path: '/pay/' + this.$i18n.locale})
      },
      chooseThis (index) {
        this.ind = index
      },
      toPaySuccess () {
        // 测试支付成功页面
        if (this.ind !== '') {
          location.href = `https://mdev.1peso.com.mx/view/openpay.html`
          // this.$router.push({path: '/payform/' + this.$i18n.locale, query: {goldnums: this.paymoney, score: this.score, issueNo: this.issueNo}})
        } else {
          this.$toast({
            // 请选择一种支付方式
            message: this.$t('payform.pleasechooseone'),
            duration: 1000
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/mixin"
  .pay
    background:$color-bgcolor
    min-height:100vh
    color:#333
    position:absolute
    width:100%;
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
      height:1rem
      line-height:1rem
      // background:#fff
      color:$color-six-font
      padding-left:0.32rem
    .paylist
      font-size 0.24rem
      .list_container
        .pay_item
          height:1.2rem
          background:#fff
          padding:0 0.32rem
          display:flex
          align-items:center
          justify-content: space-between
          position: relative
          .payicon
            .waytext
              position:absolute
              width:5rem
              top:0.2rem
              // width:2rem
              color:#afafaf
            .logos
              position:absolute
              left:0.25rem
              span
                display:inline-block
                width:5.54rem
                height 0.57rem
                background-size: contain
                bg-image('img/way')
          .payChoose
            .icon-gouxuan
              font-size:0.4rem
              color:$color-issue-font
            .active
              color:$color-meta
      .list_container>li:not(:first-child)
        border-top:1px solid $color-border
    .paybtn
      position:fixed
      bottom:0
      width:100%
      height:1rem
      line-height:1rem
      background:$color-meta
      .paycontent
        margin:auto 0.32rem
        font-size:0.3rem
        display:flex
        justify-content:space-between
        color:#fff
        .paynums
          .nums
            font-size:0.35rem
            font-weight: bold
</style>
