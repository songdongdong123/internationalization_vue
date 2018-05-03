<template>
  <div class="payform">
    <div class="title">
      <p class="left">
        <span class="icon-fanhui1"></span>
      </p>
      <!-- 银行卡支付 -->
      <p class="center">银行卡支付</p>
      <a class="right" @click="toPay" :class="{'rightAvtive':payBtnState}" id="pay-button">
        <span>支付</span>
      </a>
    </div>
    <div class="address_container">
      <form action="#" method="POST" id="payment-form">
        <div class="address">
          <div class="name top">
            <!-- 银行卡号 -->
            <input
            data-openpay-card="holder_name"
            autocomplete="off"
            :class="{'inputError': !cardNoState}"
            type="phone"
            maxlength="19"
            v-model="cardNo"
            v-on:input="formeteCardNo"
            v-on:blur="checkoutRes(1)"
            placeholder="卡号"
            class=""
            />
          </div>
          <div class="name bottom" >
            <!-- 姓名 -->
            <input type="text" 
              data-openpay-card="card_number"
              :class="{'inputError': !nameState}"
              placeholder="姓名" 
              v-model="cardName" 
              v-on:input="checkoutPayBtnState"
              v-on:blur="checkoutRes(2)">
          </div>
        </div>
        <div class="postCode">
          <div class="postC left" :class="{'leftErr': !monthState}">
            <!-- 到期月份 -->
            <input 
              data-openpay-card="expiration_month"
              v-model="month"
              placeholder="到期月份" 
              type="phone"
              @keyup="month=month.replace(/\D/g,'')"
              v-on:blur="getMonth(month)"
              v-on:input="checkoutPayBtnState"
              maxlength="2">
          </div>
          <div class="postC left" :class="{'leftErr': !yearsState}">
            <!-- 到期年份 -->
            <input
              data-openpay-card="expiration_year"
              type="phone"
              v-model="year"
              @keyup="year=year.replace(/\D/g,'')"
              maxlength="2"
              placeholder="到期年份"
              v-on:input="checkoutPayBtnState"
              v-on:blur="getYear(year)"
              
            >
          </div>
        </div>
        <div class="addressDetail">
          <div class="base bottom" :class="{'bottomErr': !cvvState}">
            <input 
              data-openpay-card="cvv2"
              type="phone" 
              v-model="cvvNo"
              @keyup="cvvNo=cvvNo.replace(/\D/g,'')"
              maxlength="3"
              placeholder="3位CVV码"
              v-on:blur="checkoutRes(3)"
              v-on:input="getCvv(year)"
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        cardNo: '',
        cardNoState: true,
        cardName: '',
        nameState: true,
        month: '',
        monthState: true,
        year: '',
        yearsState: true,
        cvvNo: '',
        cvvState: true,
        payBtnState: false
      }
    },
    watch: {
      payBtnState (newV, oldV) {}
    },
    methods: {
      backUserCenter () {
        this.$router.back()
      },
      formeteCardNo () {
        this.cardNo = this.cardNo.replace(/\D/g, '').replace(/....(?!$)/g, '$& ')
        let cardNo = this.cardNo.replace(/\s+/g, '')
        if (cardNo.length === 16) {
          this.cardNoState = true
        }
        this.checkoutFormData()
      },
      getCvv () {
        // 校验cvv状态
        if (this.cvvNo.length === 3 || this.cvvNo.length === 0) {
          this.cvvState = true
        }
        this.checkoutPayBtnState()
      },
      checkoutRes (num) {
        let cardNo = this.cardNo.replace(/\s+/g, '')
        if (num === 1) {
          if (cardNo) {
            this.cardNoState = cardNo.length === 16 ? Boolean(true) : Boolean(false)
            if (!this.cardNoState) {
              this.$toast({
                message: '请输入16位银行卡号',
                duration: 1000
              })
            }
          }
        } else if (num === 2) {
          if (this.cardName) {
            this.nameState = this.cardName ? Boolean(true) : Boolean(false)
          } else {
            this.$toast({
              message: '请输入姓名',
              duration: 1000
            })
          }
        } else if (num === 3) {
          if (this.cvvNo) {
            this.cvvState = this.cvvNo.length === 3 ? Boolean(true) : Boolean(false)
          }
          if (!this.cvvNo || this.cvvNo.length < 3) {
            this.$toast({
              message: '请输入三位CVV码',
              duration: 1000
            })
          }
        }
      },
      checkoutFormData () {
        // 验证表单数据
        let cardNo = this.cardNo.replace(/\s+/g, '')
        if ((cardNo.length === 16) && this.cardName && this.month && this.year && this.cvvNo.length === 3) {
          this.payBtnState = true
        } else {
          this.payBtnState = false
        }
      },
      checkoutPayBtnState () {
        this.checkoutFormData()
      },
      getMonth (num) {
        // 调整月份输入框使之大于小于1的时候为1，大于12的时候为12，个位数的时候添加前置0
        if (num) {
          let reg = /0[1-9]|1[0-2]/
          if (!reg.test(num)) {
            if (Number(num) === 0 || num === '00') {
              this.month = '01'
            } else if (Number(num) > 12) {
              this.month = '12'
            } else {
              this.month = '0' + num
            }
          }
          this.monthState = this.month ? Boolean(true) : Boolean(false)
        }
      },
      getYear (num) {
        // 验证年份
        if (num) {
          let date = new Date()
          let yearStr = date.getFullYear().toString()
          let year = yearStr.substr(yearStr.length - 2)
          if (Number(num) < Number(year)) {
            this.year = year
          }
          this.yearsState = this.year ? Boolean(true) : Boolean(false)
        }
      },
      toPay () {
        window.$('#pay-button').prop('disabled', true)
        function sucessCallbak (response) {
          let tokenid = response.data.id
          console.log(tokenid)
          window.$('#token_id').val(tokenid)
          window.$('#payment-form').submit()
        }
        function errorCallbak (response) {
          let desc = response.data.description !== undefined ? response.data.description : response.message
          alert('ERROR [' + response.status + '] ' + desc)
          window.$('#pay-button').prop('disabled', false)
        }
        window.OpenPay.token.extractFormAndCreate('payment-form', sucessCallbak, errorCallbak)
        // this.checkoutFormData()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/fontsize"
  .payform
    background:$color-bgcolor
    min-height:100vh
    color:#333
    .title
      font-size:$font-meta
      height:$meta-height
      padding: 0 0.32rem 0 0.32rem
      display:flex
      align-items:center
      position:fixed
      width:6.86rem
      background:$color-white
      color: $color-general-font
      z-index:100
      border-bottom:1px solid $color-border
      .left
        position:absolute
        left:0
        font-size:0
        padding:0.25rem 0.3rem 0.25rem 0.25rem
        font-size:0.4rem
        color:$color-meta
      .center
        width:100%
        text-align:center
      .right
        position:absolute
        right:0
        font-size:0
        padding:0.175rem 0.32rem 0.175rem 0.32rem
        font-size:0.3rem
        color:#999
      .rightAvtive
        color:$color-meta
    .address_container
      padding-top:0.9rem
      padding-bottom:0.3rem
      background:#fff
      .address
        font-size:0
        margin:auto 0.32rem
        margin-top:0.3rem
        overflow: hidden
        .name
          position: relative
          input
            display:block
            font-size:$font-address
            width:100%
            height:$input-height
            padding-left:0.2rem
            width:6.5rem
            color:$color-general-font
            border:1px solid #f5f5f5
          .inputError
            border:1px solid $color-meta
        .bottom
          margin-top:0.3rem
      .postCode
        display:flex
        justify-content:space-between
        font-size:$font-address
        height:$input-height
        margin:auto 0.32rem
        margin-top:0.3rem
        .postC
          width:3.33rem
          height:100%
          line-height:$input-height
          color:#fff
          p
            text-align:center
            background:$color-weaken-font
            border-radius:0.1rem
          input
            width:3rem
            padding-left:0.2rem
            color:$color-general-font
        .left
          border:1px solid #f5f5f5
        .leftErr
          border:1px solid $color-meta
      .addressDetail
        font-size:$font-address
        margin:auto 0.32rem
        margin-top:0.3rem
        .base
          height:$input-height
          line-height:$input-height
          input
            width:6.5rem
            padding-left:0.2rem
            color:$color-general-font
        .bottom
          border:1px solid #f5f5f5
        .bottomErr
          border:1px solid $color-meta
</style>

