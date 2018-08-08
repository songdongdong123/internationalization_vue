<template>
  <div class="toditopay">
    <div class="title">
      <div class="titlecontainer">
        <span @click="backUserCenter" class="left icon-fanhui1"></span>
        <p>Todito Cash</p>
      </div>
    </div>
    <div class="toditopaycontainer">
      <p class="los">LIngresa los datos de tu cuenta</p>
      <div class="cardnumber cardbase">
        <p class="errormsg" v-show="cardNumberState">Error número dígitos</p>
        <input 
          v-model="cardNumber"
          @keyup="cardNumber=cardNumber.replace(/\D+/g, '')"
          v-on:input="checkBtnState(0)" 
          type="tel"
          maxlength="10"
          :class="{'inputError':cardNumberState}"
          placeholder="No.Cuenta">
      </div>
      <div class="cardnip cardbase">
        <input
          v-model="cardNip"
          @keyup="cardNip=cardNip.replace(/\D+/g, '')"
          v-on:input="checkBtnState(1)"
          type="tel"
          maxlength="4"
          :class="{'inputError':cardNipState}"
          placeholder="NIP">
      </div>
      <p class="Pagar" :class="{'activepagar':pargarstate}" @click="topay">Pagar</p>
      <div class="desc">
        <div class="logo">
          <img src="./img/todito.png" alt="">
        </div>
        <div class="descitem">
          <p>Si al momento del pago surge algún problema, por favor contacta a <span>soporte@1peso.com.mx</span></p>
          <!-- <p>Correo electrónico: servicio@1peso.com.mx</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// toditopay
  import { payrecharge, getCardInfo, saveCardInfo } from 'api/pay'
  export default {
    data () {
      return {
        pargarstate: false,
        cardNumber: '',
        cardNumberState: false,
        cardNip: '',
        cardNipState: false
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      this._getCardInfo()
    },
    methods: {
      backUserCenter () {
        let proIssueNo = JSON.parse(window.localStorage.getItem('proIssueNo'))
        localStorage.removeItem('proIssueNo')
        localStorage.removeItem('b536a272efe64829d0')
        if (proIssueNo) {
          this.$router.back()
        } else {
          this.$router.push({path: '/usercenter/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
        }
      },
      _getCardInfo () {
        // 获取卡信息
        this.$loading({
          state: true
        })
        getCardInfo({
          payType: 6
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.cardNumber = res.data.data.cardNumber
            this.$loading({
              state: false
            })
          }
        })
      },
      _saveCardInfo () {
        // 保存卡信息
        saveCardInfo({
          cardNumber: this.cardNumber,
          payType: 6
        }).then(res => {})
      },
      checkBtnState () {
        if (this.cardNumber && this.cardNip) {
          this.pargarstate = true
        } else {
          this.pargarstate = false
        }
      },
      checkountFormState () {
        if (this.cardNumber.length !== 10) {
          this.cardNumberState = true
        } else {
          this.cardNumberState = false
        }
        if (this.cardNip.length !== 4) {
          this.cardNipState = true
        } else {
          this.cardNipState = false
        }
        if (this.cardNumber.length === 10 && this.cardNip.length === 4) {
          return true
        } else {
          return false
        }
      },
      topay () {
        let tempstrmoney = window.localStorage.getItem('b536a272efe64829d0').slice(0, -12)
        let goldnums = tempstrmoney.slice(17, tempstrmoney.length)
        let tokenId = {
          numTarjeta: this.cardNumber,
          nip: this.cardNip
        }
        let state = this.checkountFormState()
        if (state) {
          this._saveCardInfo()
          this.$loading({
            state: true
          })
          payrecharge({
            token_id: JSON.stringify(tokenId),
            amount: goldnums,
            paytype: 6,
            spId: this.$route.query.spId
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.$loading({
                state: false
              })
              this.$router.push({path: '/paytransfer/' + this.$i18n.locale,
                query: {
                  channelType: this.channelType,
                  channelTag: this.channelTag,
                  strPayId: res.data.data.strPayId,
                  score: this.$route.query.score,
                  issueNo: this.$route.query.issueNo
                }})
            }
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
  .toditopay
    background:$color-bgcolor
    min-height:100vh
    color:#333
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
      z-index:500
      border-bottom:1px solid $color-border
      .titlecontainer
        display:flex
        justify-content:space-between
        align-items:center
        margin: auto 0.32rem
        .left
          position:absolute
          padding:0 0.3rem 0 0.25rem
          left:0
          font-size:0.4rem
          color:$color-meta
        p
          text-align:center
          width:100%
    .toditopaycontainer
      font-size:0.3rem
      margin:auto 0.32rem
      margin-top:0.9rem
      .los
        height:1rem
        line-height:1rem
      .cardbase
        input
          width:100%
          box-sizing:border-box
          padding:0.2rem
          height:1rem
          border:1px solid #ccc
          border-radius:0.1rem
        .inputError
          border:1px solid $color-meta
        .errormsg
          margin-bottom:0.2rem
          color:$color-meta
          font-size:0.24rem
      .cardnip
        margin-top:0.3rem
      .Pagar
        height:1rem
        line-height:1rem
        background:#ccc
        color:#fff
        font-size:0.35rem
        border-radius:0.1rem
        margin-top:0.3rem
        text-align:center
      .activepagar
        background:$color-meta
      .desc
        margin-top:0.3rem
        .logo
          width:2.05rem
          height:0.57rem
          img
            width:100%
            height:100%
        .descitem
          margin-top:0.2rem
          line-height:0.35rem
          font-size:0.25rem
          span
            color:$color-sky-blue
</style>

