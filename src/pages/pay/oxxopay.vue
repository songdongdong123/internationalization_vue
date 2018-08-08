<template>
  <div class="oxxo">
    <div class="ordertop">
      <div class="closecontainer" @click="toUserCenter">
        <span class="closeThispay"></span>
        <p>FICHA DIGITAL,NO ES NECESARIO IMPRIMIR.</p>
      </div>
    </div>
    <div class="paymsg">
      <div class="logo">
        <img src="./img/oxxo.png" alt="">
      </div>
      <div class="moneymsg">
        <p class="MONTO">MONTO A PAGAR</p>
        <p class="money">${{paymsg.amount}}.00 <span class="part">MXN</span></p>
        <p class="cobrar">OXXO cobrará una comisión adicional al momento de realizar el pago.</p>
      </div>
    </div>
    <div class="REFERENCIA">
      <p class="lable">
        <canvas id="canvas"></canvas>
      </p>
      <!-- <p class="REFERENCIA_title">REFERENCIA</p> -->
      <p class="REFERENCIA_NUM">{{paymsg.reference}}</p>
    </div>
    <div class="oxxo_desc">
      <p class="INSTRUCCIONES">INSTRUCCIONES</p>
      <p class="INSTRUCCIONES_ITEM"><span>1.</span><span>Acude al tienda OXXO más cercana.</span></p>
      <p class="INSTRUCCIONES_ITEM"><span>2.</span><span>Indica en caja que quieres realizar un pago de <span class="OXXOPay">OXXOPay</span>.</span></p>
      <p class="INSTRUCCIONES_ITEM"><span>3.</span><span>Dicta al cajero el número de referencia en esta ficha para que la tecleé directamente en la pantalla de venta.</span></p>
      <p class="INSTRUCCIONES_ITEM"><span>4.</span><span>Realiza el pago correpondiente con dinero en efectivo.</span></p>
      <p class="INSTRUCCIONES_ITEM"><span>5.</span><span>Al confirmar tu pago,el cajero te entregará un comprobante impreso.<span class="OXXOPay">En él podrás verificar que se haya realizado correctamente</span>.Conserva este comprobante de pago.</span></p>
      <div class="Guess">
        <p>Al completar estos pasos ,Guess te enviará un correo confirmando tu pago de manera inmediata.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { payrecharge } from 'api/pay'
  import jsbarcode from 'jsbarcode'
  export default {
    data () {
      return {
        paymsg: {}
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      let tempstrmoney = window.localStorage.getItem('paymoney')
      this.b536a272efe64829d0 = tempstrmoney
      this.getPayData()
    },
    methods: {
      createBarcode (code) {
        // 生成二维码
        jsbarcode('#canvas', code, {
          lineColor: '#000',
          width: 2,
          height: 40,
          displayValue: false,
          channelType: ''
        })
      },
      getPayData () {
        this.$loading({state: true})
        payrecharge({
          amount: Number(this.b536a272efe64829d0),
          channel: 'open',
          paytype: 5
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.$loading({state: false})
            this.paymsg = res.data.data
            this.$nextTick(() => {
              this.createBarcode(res.data.data.reference)
            })
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
  .oxxo
    // background:$color-bgcolor
    min-height:100vh
    color:#333
    position:absolute
    width:100%
    .ordertop
      height:1rem
      background:$color-meta
      .closecontainer
        height:1rem
        position: relative
        line-height:1rem
        .closeThispay
          display:inline-block
          width:0.35rem
          height:0.35rem
          background-size:cover
          bg-image('img/white')
          left:0.25rem
          top:50%
          transform:translateY(-50%)
          position:absolute
        p
          font-size:0.24rem
          color:#fff
          position:absolute
          width:100%
          text-align:center
    .paymsg
      background:#fff
      display:flex
      justify-content:space-between
      align-items:flex-start
      padding:0 0.2rem
      padding-top:0.5rem
      color:#333
      .logo
        width:2.7rem
        height:0.9rem
        position: relative
        img
          position:absolute
          top:-7px
          left:-7px
      .moneymsg
        width:58%
        .MONTO
          font-size:0.3rem
        .cobrar
          font-size:0.24rem
          line-height:0.3rem
        .money
          font-size:0.35rem
          span
            font-size:0.24rem
      .moneymsg>p
        margin-bottom:0.25rem
    .REFERENCIA
      background:#fff
      padding:0.3rem 0.2rem 0.8rem 0.2rem
      border-bottom:1px solid #333
      .REFERENCIA_title
        font-size:0.3rem
        color:#333
        margin-bottom: 0.2rem
      .REFERENCIA_NUM
        border-radius:0.1rem
        font-size:0.35rem
        text-align:center
      .lable
        text-align:center
    .oxxo_desc
      background:#fff
      padding: 0.4rem 0.2rem 0.3rem 0.2rem
      color:#333
      .INSTRUCCIONES
        font-size:0.3rem
        margin-bottom:0.35rem
      .INSTRUCCIONES_ITEM
        font-size:0.25rem
        line-height:0.35rem
        margin-bottom:0.25rem
        display:flex
        .OXXOPay
          font-weight: bold
      .Guess
        height:1.5rem
        border:1px solid #ccc
        border-radius:0.1rem
        font-size:0.24rem
        text-align:center
        display:flex
        justify-content:center
        align-items:center
        line-height:0.4rem
        color:green
</style>


