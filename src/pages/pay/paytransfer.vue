<template>
  <div class="paytransfer">
    <div class="paytransfercontainer">
      <div class="banklogo">
        <span></span>
      </div>
      <!-- 支付中 -->
      <p class="paystate top">{{$t('payform.payNow')}}</p>
      <p class="paystate time">{{time}}s</p>
      <!-- 充值订单处理中，请稍后 -->
      <p class="paystate">{{$t('payform.dispose')}}</p>
    </div>
  </div>
</template>

<script>
  import { getPayOrderInfo } from 'api/pay'
  export default {
    data () {
      return {
        time: 30,
        timer: null,
        score: ''
      }
    },
    created () {
      this.payId = this.$route.query.strPayId
      this.score = this.$route.query.score
      this.issueNo = this.$route.query.issueNo
      this.countdown(this.payId)
    },
    methods: {
      countdown (payId) {
        // 倒计时
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this._getPayOrderInfo(payId)
          this.time--
          if (this.time === 0) {
            clearInterval(this.timer)
          }
        }, 1000)
      },
      _getPayOrderInfo (payId) {
        getPayOrderInfo({
          payId: payId
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            if (res.data.data.state === 5) {
              clearInterval(this.timer)
              this.$router.push({path: '/paysuccess/' + this.$i18n.locale, query: {money: res.data.data.money, score: this.score, issueNo: this.issueNo}})
            } else if (res.data.data.state === 10) {
              clearInterval(this.timer)
              this.$router.push({path: '/payerr/' + this.$i18n.locale, query: {description: res.data.data.description}})
            }
            if (this.time === 0 && res.data.data.state === 2) {
              this.$router.push({path: '/paytimeout/' + this.$i18n.locale})
            }
          }
        })
      }
    },
    beforeDestroy () {
      // 组件销毁前清除定时器
      clearInterval(this.timer)
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/mixin"
  .paytransfer
    background:$color-bgcolor
    height:100vh
    color:#333
    position: absolute
    width:100%
    .paytransfercontainer
      height:5rem
      background:#fff
      .banklogo
        padding-top:1.2rem
        display:flex
        justify-content:center
        span
          display:inline-block
          height:0.64rem
          width:0.64rem
          bg-image('img/lock')
          background-size: cover
      .paystate
        font-size:0.3rem
        text-align:center
        margin-top:0.3rem
        color:#999999
      .top
        color:#333
        font-size:0.4rem
      .time
        margin-top:0.5rem
</style>

