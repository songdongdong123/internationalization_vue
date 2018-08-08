<template>
  <div class="payres">
    <div class="ordertop">
      <div class="closecontainer" @click="toUserCenter">
        <span class="closeThispay"></span>
      </div>
      <div class="particulars">
        <div class="figure">
          <div class="left" v-show="paymsg.amount">
            <p>Total a pagar</p>
            <p>${{paymsg.amount}}.00 <span class="unit">MXN</span></p>
          </div>
          <div class="right">
            <img src="./img/pay.png" alt="">
          </div>
        </div>
        <div class="accountpay">
          <p>Pago de servicios $1 para ganar</p>
        </div>
      </div>
    </div>
    <div class="orderbottom" v-if="typeState === 0">
      <div class="spei">
        <p class="title">Desde BBVA Bancomer</p>
        <img src="./img/spei.png" alt="">
      </div>
      <div class="CIE">
        <p class="lable">Numero de convenio CIE</p>
        <p class="nums">{{paymsg.agreement}}</p>
      </div>
      <div class="CIE CIE2">
        <p class="lable">Referencia</p>
        <p class="nums">{{paymsg.name}}</p>
      </div>
      <div class="paydetail toppaydetail">
        <p class="detailtitle">Detalles de la compra</p>
        <p class="Concepto">
          <span>Concepto</span>
          <span>{{paymsg.description}}</span>
        </p>
        <p class="Concepto">
          <span>Fecha límite de pago</span>
          <span>{{paymsg.due_date}}</span>
        </p>
        <p class="contacta">Si al momento del pago surge algún problema, por favor contacta a <span>soporte@1peso.com.mx</span></p>
      </div>
    </div>
    <div class="orderbottom" v-else>
      <div class="spei">
        <p class="title">Desde cualquier otro banco</p>
        <img src="./img/spei.png" alt="">
      </div>
      <div class="bankmsg">
        <div class="Beneficiario">
          <p class="lable">Beneficiario</p>
          <p class="nums">{{paymsg.bank}}</p>
        </div>
        <div class="Beneficiario">
          <p class="lable">Banco destino</p>
          <p class="nums">{{paymsg.recipient}}</p>
        </div>
      </div>
      <div class="CIE">
        <p class="lable">Clabe</p>
        <p class="nums">{{paymsg.clabe}}</p>
      </div>
      <div class="CIE">
        <p class="lable">Concepto  de pago</p>
        <p class="nums">{{paymsg.name}}</p>
      </div>
      <div class="CIE CIE3">
        <p class="lable">Referencia</p>
        <p class="nums">{{paymsg.agreement}}</p>
      </div>
      <div class="paydetail">
        <p class="detailtitle">Detalles de la compra</p>
        <p class="Concepto">
          <span>Concepto</span>
          <span>{{paymsg.description}}</span>
        </p>
        <p class="Concepto">
          <span>Fecha límite de pago</span>
          <span>{{paymsg.due_date}}ooooo</span>
        </p>
        <p class="contacta">Si al momento del pago surge algún problema, por favor contacta a <span>soporte@1peso.com.mx</span></p>
      </div>
    </div>
    <div class="openpaylogo">
      <p>powered by</p>
      <img src="./img/logo.png" alt="">
    </div>
  </div>
</template>

<script>
  import { payrecharge } from 'api/pay'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        typeState: 0,
        b536a272efe64829d0: '',
        paymsg: {},
        channelType: '',
        spId: ''
      }
    },
    created () {
      [this.channelType, this.channelTag, this.spId] = [this.$route.query.channelType, this.$route.query.channelTag, this.$route.query.spId]
      let tempstrmoney = window.localStorage.getItem('b536a272efe64829d0').slice(0, -12)
      this.typeState = Number(this.$route.query.type)
      this.b536a272efe64829d0 = tempstrmoney.slice(17, tempstrmoney.length)
      this.$loading({state: true})
      this.getPayData()
    },
    computed: {
      ...mapGetters(['paymoney'])
    },
    methods: {
      getPayData () {
        this.$loading({state: true})
        let paymoney = ''
        if (this.b536a272efe64829d0) {
          paymoney = this.b536a272efe64829d0
        } else {
          paymoney = this.paymoney
        }
        payrecharge({
          amount: Number(paymoney),
          channel: 'open',
          paytype: 4,
          spId: this.spId
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.paymsg = res.data.data
            this.$loading({state: false})
          }
        })
      },
      toUserCenter () {
        let proIssueNo = JSON.parse(window.localStorage.getItem('proIssueNo'))
        localStorage.removeItem('proIssueNo')
        localStorage.removeItem('b536a272efe64829d0')
        if (proIssueNo) {
          if (proIssueNo.falg) {
            this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: proIssueNo.issueNo, falg: proIssueNo.falg, channelType: this.channelType, channelTag: this.channelTag}})
          } else if (proIssueNo.tag) {
            this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: proIssueNo.issueNo, tag: proIssueNo.falg, channelType: this.channelType, channelTag: this.channelTag}})
          }
        } else {
          this.$router.push({path: '/usercenter/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
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
  .payres
    background:#fafafa
    min-height:100vh
    color:#333
    position:absolute
    width:100%
    .ordertop
      height:4rem
      background:$color-meta
      .closecontainer
        height:1rem
        display:flex
        align-items:center
        .closeThispay
          display:inline-block
          width:0.35rem
          height:0.35rem
          background-size:cover
          bg-image('img/white')
          margin-left:0.25rem
      .particulars
        padding: 0 0.2rem
        .figure
          display:flex
          justify-content:space-between
          align-items:center
          margin-top:0.3rem
          .left>p:nth-child(1)
            font-size:0.24rem
            color:#fff
          .left>p:nth-child(2)
            font-size:0.5rem
            color:yellow
            margin-top:0.2rem
            .unit
              font-size:0.24rem
          .right
            width:1.2rem
            height:1.2rem
            line-height:1rem
            // background:#fff
            border-radius:100%
            text-align: center
            img
              width:1.2rem
              height:1.2rem
        .accountpay
          font-size:0.4rem
          color:#fff
          height:1.5rem
          line-height:1.5rem
    .orderbottom
      font-size:0.3rem
      // background:#fff
      padding-bottom:1.5rem
      .spei
        display:flex
        justify-content:space-between
        align-items:center
        padding:0 0.2rem
        background:#fff
        .title
          font-size:0.35rem
          color:#666
          height:1.5rem
          background:#fff
          line-height:1.5rem
        img
          width:1.8rem
          height:1rem
      .CIE
        padding:0rem 0.2rem
        padding-top:0.4rem
        // margin-bottom:0.3rem
        background:#fff
        .lable
          color:#ccc
          font-size:0.24rem
        .nums
          font-size:0.35rem
          height:0.8rem
          line-height:0.8rem
      .CIE2
        padding-bottom:0.5rem
      .CIE3
        padding-bottom:0.5rem
      .bankmsg
        background:#fafafa
        padding-top:0.5rem
        .Beneficiario
          margin:auto 0.2rem
          margin-bottom:0.3rem
          .lable
            color:#ccc
            font-size:0.24rem
          .nums
            font-size:0.3rem
            height:0.8rem
            line-height:0.8rem
      .paydetail
        background:#fafafa
        padding:0.4rem 0.2rem
        .detailtitle
          font-size:0.35rem
          color:#666
          margin-bottom:0.4rem
        .Concepto
          height:0.6rem
          line-height:0.6rem
          display:flex
          justify-content:space-between
          font-size:0.25rem
          color:#ccc
        .contacta
          font-size:0.25rem
          line-height:0.35rem
          margin-top:0.2rem
          span
            color:$color-sky-blue
      .toppaydetail
        padding-top:0.6rem
    .openpaylogo
      position:absolute
      width:100%
      bottom:0
      font-size:0.25rem
      height:1.5rem
      display:flex
      justify-content:center
      align-items:center
      // padding-bottom:0.5rem
      background:#fff
      img
        width:1.3rem
        height:0.31rem
        margin-left:0.1rem
</style>

