<template>
  <div class="pay">
    <div class="title">
      <div class="titlecontainer">
        <span @click="backUserCenter" class="left icon-fanhui1"></span>
        <!-- 支付方式 -->
        <p>{{$t('payform.payway')}}</p>
      </div>
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
            <span class="icon-base" 
            :class="{
              'item-icon1': list.id === 2,
              'item-icon4': list.id === 3,
              'item-icon2': list.id === 4,
              'item-icon3': list.id === 5
            }"></span>
            <div class="center">
              <p class="waytext">{{list.name}}</p>
              <p class="waytext wayspec">{{list.way}}</p>
            </div>
          </div>
          <p class="payChoose">
            <span class="icon-yuanquan" :class="{'icon-active': index === ind}"></span>
          </p>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <div class="choosebank" v-show="shoplistState">
        <div class="banklist">
          <p class="banktitle" @click="closeThis">Opciones de pago<span class="icon-close"></span></p>
          <div class="baselist desde" @click="transferAccount(2)">
            <img class="oxxopng" src="./img/oxxo.png" alt="">
          </div>
          <div class="baselist" @click="transferAccount(3)">
            <p>Cualquier tienda de conveniencia</p>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="choosebank" v-show="banklistState">
        <div class="banklist">
          <p class="banktitle" @click="closeThis">Opciones de pago en banco<span class="icon-close"></span></p>
          <div class="baselist desde" @click="transferAccount(0)">
            <img src="./img/BBVA.png" alt="">
          </div>
          <div class="baselist" @click="transferAccount(1)">
            <p>Desde cualquier otro banco</p>
          </div>
        </div>
      </div>
    </transition>
    <div class="paybtn" @click="toPaySuccess">
      <div class="paycontent">
        <p class="paynums">
          <span class="nums">$ {{b536a272efe64829d0}}</span>
          <span>MXN</span>
        </p>
        <!-- 去付款 -->
        <p>{{$t('payform.pago')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import getBaseUrl from '@/common/js/baseUrl'
  import { payrecharge, getPayChannel } from 'api/pay'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        ind: 0,
        b536a272efe64829d0: '',
        banklistState: false,
        shoplistState: false,
        paywaylist: this.$t('payform.paywaylist'),
        channelType: '',
        paychannel: '',
        spId: ''
      }
    },
    computed: {
      ...mapGetters(['proIssueNo', 'paymoney'])
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      let tempstrmoney = window.localStorage.getItem('b536a272efe64829d0').slice(0, -12)
      if (tempstrmoney) {
        this.b536a272efe64829d0 = tempstrmoney.slice(17, tempstrmoney.length)
      }
    },
    methods: {
      _getPayChannel (amount, type, bank) {
        getPayChannel({
          amount: amount,
          payType: type
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.paychannel = res.data.data.channel
            this.spId = res.data.data.spId
            switch (type) {
              // 信用卡支付
              case 2:
                if (this.paychannel === 'open') {
                  location.href = `${getBaseUrl()}/view/openpay.html?${this.returnPaywayParams()}&spId=${this.spId}`
                } else if (this.paychannel === 'pass') {
                  location.href = `${getBaseUrl()}/view/passpay.html?${this.returnPaywayParams()}&spId=${this.spId}`
                }
                break
              case 3:
                if (this.paychannel === 'open') {
                  location.href = `${getBaseUrl()}/view/openpay.html?${this.returnPaywayParams()}&spId=${this.spId}&bank=1`
                } else if (this.paychannel === 'pass') {
                  location.href = `${getBaseUrl()}/view/passpay.html?${this.returnPaywayParams()}&spId=${this.spId}&bank=1`
                }
                break
              case 4:
              // 银行转账
                if (bank === 'bbav') {
                  // bbva银行
                  this.$router.push({path: '/payres/' + this.$i18n.locale,
                    query: {
                      type: 0,
                      channelType: this.channelType,
                      channelTag: this.channelTag,
                      spId: this.spId
                    }})
                } else {
                  // 任意一家银行
                  this.$router.push({path: '/payres/' + this.$i18n.locale,
                    query: {
                      type: 1,
                      channelType: this.channelType,
                      channelTag: this.channelTag,
                      spId: this.spId
                    }})
                }
                break
              case 5:
              // 任意一家便利店支付
                this.$router.push({path: '/shoppay/' + this.$i18n.locale,
                  query: {
                    channelType: this.channelType,
                    channelTag: this.channelTag,
                    paychannel: this.paychannel,
                    spId: this.spId
                  }})
                break
            }
          }
        })
      },
      backUserCenter () {
        this.$router.back()
      },
      chooseThis (index) {
        this.ind = index
      },
      closeThis () {
        this.banklistState = false
        this.shoplistState = false
      },
      toPay (type) {
        // 测试
        let paymoney = ''
        if (this.b536a272efe64829d0) {
          paymoney = this.b536a272efe64829d0
        } else {
          paymoney = this.paymoney
        }
        payrecharge({
          amount: Number(paymoney),
          channel: 'open',
          paytype: type
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.$loading({state: false})
          }
        })
      },
      transferAccount (type) {
        this.banklistState = false
        switch (type) {
          case 0:
            // 任意银行转账
            this.reportPayWay('BBVA')
            this._getPayChannel(this.b536a272efe64829d0, 4, 'bbva')
            // this.$router.push({path: '/payres/' + this.$i18n.locale, query: {type: 0, channelType: this.channelType, channelTag: this.channelTag}})
            break
          case 1:
            // BBVA转账
            this.reportPayWay('其他银行')
            this._getPayChannel(this.b536a272efe64829d0, 4, 'any')
            // this.$router.push({path: '/payres/' + this.$i18n.locale, query: {type: 1, channelType: this.channelType, channelTag: this.channelTag}})
            break
          case 2:
            // oxxo支付
            // this.reportPayWay('oxxo支付')
            // this.$router.push({path: '/oxxopay/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
            break
          case 3:
            // oxxo支付
            // this.reportPayWay('任意一家便利店支付')
            // this.$router.push({path: '/shoppay/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
            break
        }
      },
      reportPayWay (type) {
        // 支付方式统计
        if (this.$ga) {
          this.$ga.event({
            eventCategory: '渠道',
            eventAction: '支付方式',
            eventLabel: `渠道${this.$route.query.channelTag ? this.$route.query.channelTag : '6_7_0_0'}/支付方式:${type}`,
            eventValue: 0
          })
        }
      },
      returnPaywayParams () {
        if (this.channelTag && this.channelType) {
          return `channelType=${this.channelType}&channelTag=${this.channelTag}&num=${this.paymoney}`
        } else if (this.channelType) {
          return `channelType=${this.channelType}&channelTag=6_7_0_0&num=${this.paymoney}`
        } else if (this.channelTag) {
          return `channelType=6&channelTag=${this.channelTag}&num=${this.paymoney}`
        } else {
          return `channelType=6&channelTag=6_7_0_0&num=${this.paymoney}`
        }
      },
      toPaySuccess () {
        // 上报支付方式
        this.$ga.event({
          eventCategory: '渠道',
          eventAction: '选择充值方式页面确认按钮',
          // 上报充值自定义金额
          eventLabel: `渠道:${this.channelTag ? this.channelTag : '6_7_0_0'}`,
          eventValue: 0
        })
        // 支付方式
        switch (this.ind) {
          case 0:
            // 如果使用openpay就存储商品详情页路信息
            this.reportPayWay('信用卡')
            // this.$loading({
            //   state: true
            // })
            this._getPayChannel(this.b536a272efe64829d0, 2)
            // if (this.paychannel === 'open') {
            //   location.href = `${getBaseUrl()}/view/openpay.html?${this.returnPaywayParams()}`
            // } else if (this.paychannel === 'pass') {
            //   location.href = `${getBaseUrl()}/view/passpay.html?${this.returnPaywayParams()}`
            // }
            break
          case 1:
            this.reportPayWay('借记卡')
            this._getPayChannel(this.b536a272efe64829d0, 3)
            // this.$router.push({path: '/shoppay/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
            break
          case 2:
            this.reportPayWay('任意一家便利店支付')
            this._getPayChannel(this.b536a272efe64829d0, 5)
            // this.$router.push({path: '/shoppay/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
            break
          case 3:
            this.banklistState = true
            break
          default:
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
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
      position:fixed
      line-height:$meta-height
      width:100%
      background:$color-white
      color: $color-general-font
      z-index:1001
      border-bottom:1px solid $color-border
      .titlecontainer
        display:flex
        justify-content:space-between
        align-items:center
        .left
          position:absolute
          padding:0 0.3rem 0 0.25rem
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
            display:flex
            align-items: center
            .waytext
              margin-left:0.5rem
              font-size:0.3rem
            .wayspec
              margin-top:0.2rem
              color:#ccc
              font-size:0.24rem
            .icon-base
              display:inline-block
              background-size: contain
              background-position:center center
              background-repeat: no-repeat
              width:0.65rem
              height:0.65rem
            .item-icon1
              bg-image('img/card')
            .item-icon2
              bg-image('img/shop')
            .item-icon3
              bg-image('img/account')
            .item-icon4
              bg-image('img/bank')
          .payChoose
            span
              transition:all .5s
              display:inline-block
              background-size: contain
              background-position:center center
              background-repeat: no-repeat
              width:0.4rem
              height:0.4rem
            .icon-yuanquan
              bg-image('img/default')
            .icon-active
              bg-image('img/choose')
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
    .choosebank
      position:fixed
      background:rgba(0,0,0,.6)
      width:100%
      height:100%
      top:0
      left:0
      z-index:2000
      display:flex
      justify-content:center
      align-items:center
      .banklist
        // height:4.8rem
        width:6.5rem
        background:#fff
        border-radius:0.1rem
        overflow: hidden
        .banktitle
          font-size:0.35em
          height:1rem
          border-bottom:1px solid #ccc
          font-weight: bold
          position:relative
          text-align: center
          line-height:1rem
          span
            display:inline-block
            height:0.45rem
          .icon-close
            font-size:0.45rem
            font-weight bold
            position:absolute
            top:0.05rem
            right:0.2rem
        .baselist
          font-size:0.3rem
          height:2rem
          line-height:2rem
          text-align:center
          color:#333
          display:flex
          justify-content:center
          align-items:center
          img
            width:3.6rem
            height:2rem
          .oxxopng
            width:2.7rem
            height:0.9rem
        .desde
          border-bottom:1px solid $color-border
</style>
