<template>
  <div class="paytransfer">
    <div class="closeContainer" @click="toUserCenter">
      <span class="close"></span>
    </div>
    <div class="paytransfercontainer">
      <div class="banklogo">
        <span></span>
      </div>
      <!-- 网络异常 -->
      <p class="paystate">{{$t('payform.network')}}</p>
      <!-- 请检查充值记录和银行卡账单，如有疑问请联系我们 -->
      <p class="paystate1">{{$t('payform.checkoutOrder')}}</p>
      <!-- 充值记录 -->
      <p class="bottombtn" @click="toPayrecord">{{$t('userCenter.payRecord')}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        channelType: ''
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
    },
    methods: {
      toPayrecord () {
        this.$router.push({path: '/payrecord/' + this.$i18n.locale, query: {source: 'paytimeout', channelType: this.channelType, channelTag: this.channelTag}})
      },
      toUserCenter () {
        this.$router.push({path: '/usercenter/' + this.$i18n.locale, query: {source: 'paytimeout', channelType: this.channelType, channelTag: this.channelTag}})
      }
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
    .closeContainer
      position:absolute
      width:1rem
      height:1rem
      display:flex
      justify-content:center
      align-items:center
      .close
        display:inline-block
        width:0.24rem
        height:0.24rem
        background-size:cover
        bg-image('img/close')
        top:0.2rem
        left:0.2rem
    .paytransfercontainer
      height:5rem
      background:#fff
      .banklogo
        padding-top:1.2rem
        display:flex
        justify-content:center
        span
          display:inline-block
          height:0.57rem
          width:0.71rem
          bg-image('img/network')
          background-size: cover
      .paystate
        font-size:0.3rem
        text-align:center
        margin-top:0.3rem
        color:#333
      .paystate1
        margin: auto 1rem
        font-size:0.3rem
        text-align:center
        margin-top:0.3rem
        color:#a6a6a6
        line-height:0.6rem
      .bottombtn
        position:fixed
        height:0.9rem
        bottom:0
        width:100%
        background:#fff
        color:$color-meta
        font-size:0.3rem
        text-align:center
        line-height:0.9rem
</style>

