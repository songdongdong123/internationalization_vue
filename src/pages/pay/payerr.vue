<template>
  <div class="paytransfer">
    <div class="closeContainer" @click="toUsercenter">
      <span class="close"></span>
    </div>
    <div class="paytransfercontainer">
      <div class="banklogo">
        <span></span>
      </div>
      <!-- 支付失败 -->
      <p class="paystate">{{$t('payform.payErr')}}</p>
      <p class="paystate1">{{description}}</p>
      <!-- 重试 -->
      <!-- <p class="bottombtn" @click="toPayForm">{{$t('payform.retry')}}</p> -->
    </div>
  </div>
</template>

<script>
  import getBaseUrl from '@/common/js/baseUrl'
  export default {
    data () {
      return {
        description: '',
        channelType: ''
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      this.description = this.$route.query.description
    },
    methods: {
      toPayForm () {
        // let goldnums = Number(window.localStorage.getItem('b536a272efe64829d0'))
        location.href = `${getBaseUrl()}/view/openpay.html?channelType=${this.channelType}`
        // this.$router.push({path: '/payform/' + this.$i18n.locale, query: {goldnums: goldnums, source: 'payerr'}})
      },
      toUsercenter () {
        this.$router.push({path: '/usercenter/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
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
          height:0.64rem
          width:0.64rem
          bg-image('img/error')
          background-size: cover
      .paystate
        font-size:0.3rem
        text-align:center
        margin-top:0.3rem
        color:#666
      .paystate1
        margin: auto 0.5rem
        font-size:0.4rem
        text-align:center
        margin-top:0.3rem
        color:#666
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

