<template>
  <div class="payres">
    <div class="ordertop">
      <div class="closecontainer" @click="toUserCenter">
        <span class="closeThispay"></span>
      </div>
      <div class="particulars">
        <div class="accountpay">
          <div class="iconshow">
            <span></span>
          </div>
          <p>Pago de servicios 1PESO.MX</p>
        </div>
        <div class="figure">
          <div class="left" v-show="paymsg.amount">
            <p>El pago de <span class="money">${{paymsg.amount}}.00</span><span class="unit">MXN</span>, en el punto de pago reciente.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="orderbottom">
      <div class="paynet">
        <img src="./img/paynet.png" alt="">
      </div>
      <div class="CIE">
        <p class="lable">
          <canvas id="canvas"></canvas>
        </p>
        <p class="nums">{{paymsg.reference}}</p>
      </div>
      <div class="desclus">
        <p>1.Acude a cualquier tienda afiliada.</p>
        <p>2.Entrega al cajero el código de barras y menciona que realizarás un pago de servicio Paynet.</p>
        <p>3.Díctale este código al cajero y listo.</p>
        <p>4.Puede tomar de 5 a 10 minutos.</p>
      </div>
      <div class="paydetail" v-show="false">
        <p class="detailtitle">Detalles de la compra</p>
        <p class="Concepto">
          <span>Concepto</span>
          <span>{{paymsg.description}}</span>
        </p>
        <p class="Concepto">
          <span>Correo del cliente</span>
          <span>{{paymsg.email}}</span>
        </p>
      </div>
    </div>
    <div class="Tiendas">
      <div class="Tiendascontainer">
        <p class="conveniencia">
          <span>Usted puede pagar en estas tiendas de conveniencia</span>
        </p>
        <div class="logolist">
          <ul class="logos">
            <li class="logoitem" v-for="list in logolist">
              <img class="eleven"  :src="list.src" alt="">
            </li>
          </ul>
        </div>
        <div class="moreshop">
          <p class="muchas">y muchas más...</p>
          <ul class="muchaslist">
            <li v-for="list in muchasText"><span></span>{{list}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="openpaylogo">
      <p>powered by</p>
      <img src="./img/logo.png" alt="">
    </div>
    <div class="bottom">
      <p>Si al momento del pago surge algún problema, por favor contacta a <span>soporte@1peso.com.mx</span></p>
      <!-- <p>Correo electrónico: servicio@1peso.com.mx</p> -->
    </div>
  </div>
</template>

<script>
  import { payrecharge } from 'api/pay'
  import Logolist from '../../../static/json/logolist.json'
  import jsbarcode from 'jsbarcode'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        b536a272efe64829d0: '',
        paymsg: {},
        test: '',
        muchasText: [
          'Especias Moy',
          'El Gallo de la Laguna',
          'Paso Seguro',
          'Grupo Blyska',
          'Peso Fácil',
          'Financiera Forjadores',
          'Caja Cerro de la Silla',
          'Alamano',
          'Akala',
          'Grupo Pawn',
          'Mi Adelanto',
          'DNU',
          'Servimoney',
          'Grupo Aguila',
          'Venayuda',
          'Super Prestamos Premier',
          'GWV Inversiones',
          'Torcam',
          'Indigo',
          'Servicios Prendariosdel Sureste',
          'Mexamed'
        ],
        logolist: Logolist.logolist,
        channelType: '',
        spId: ''
      }
    },
    created () {
      [this.channelType, this.channelTag, this.spId] = [this.$route.query.channelType, this.$route.query.channelTag, this.$route.query.spId]
      let tempstrmoney = window.localStorage.getItem('b536a272efe64829d0').slice(0, -12)
      this.b536a272efe64829d0 = tempstrmoney.slice(17, tempstrmoney.length)
      this.getPayData()
    },
    computed: {
      ...mapGetters(['paymoney'])
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
        let paymoney = ''
        if (this.b536a272efe64829d0) {
          paymoney = this.b536a272efe64829d0
        } else {
          paymoney = this.paymoney
        }
        payrecharge({
          amount: Number(paymoney),
          channel: 'open',
          paytype: 5,
          spid: this.spId
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.$nextTick(() => {
              this.createBarcode(res.data.data.reference)
            })
            this.$loading({state: false})
            this.paymsg = JSON.parse(JSON.stringify(res.data.data))
            this.paymsg.reference = this.paymsg.reference.replace(/\s/g, '').replace(/(.{4})/g, '$1   ').replace(/(^\s*)|(\s*$)/g, '')
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
    background:$color-bgcolor
    min-height:100vh
    color:#333
    position:absolute
    width:100%
    padding-bottom:0.5rem
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
          .left
            text-align:center
            font-size:0.32rem
            color:#fff
            line-height:0.4rem
            .money
              color:#ff0
              font-weight:bold
            .unit
              font-size:0.24rem
        .accountpay
          font-size:0.4rem
          color:#fff
          text-align:center
          font-size:0.3rem
          .iconshow
            text-align:center
            span
              display:inline-block
              width:1.1rem
              height:1.1rem
              bg-image('img/shop1')
              background-position:center
              background-size:1.1rem 1.1rem
    .orderbottom
      font-size:0.3rem
      background:#fff
      .paynet
        display:flex
        justify-content:space-between
        align-items:center
        margin:auto 0.2rem
        img
          width: 1.8rem
          height:1rem
      .CIE
        margin:auto 0.2rem
        padding-bottom:0.4rem
        .lable
          text-align:center
        .nums
          font-size:0.4rem
          height:0.5rem
          line-height:0.5rem
          text-align:center
          margin:auto 0.8rem
          box-sizing:border-box
          border-radius:0.1rem
      .desclus
        text-align:center
        padding:0.3rem 0.7rem
        background:#f2f2f2
        color:#999
        font-size:0.26rem
        p
          line-height:0.3rem
      .desclus>p:not(:last-child)
        margin-bottom:0.2rem
      .paydetail
        background:#fafafa
        padding:0.4rem 0.2rem
        // padding-top:0.8rem
        // padding-bottom:0.8rem
        .detailtitle
          font-size:0.35rem
          color:#666
          margin-bottom:0.4rem
        .Concepto
          height:0.6rem
          line-height:0.6rem
          display:flex
          justify-content:space-between
          font-size:0.24rem
          color:#ccc
    .Tiendas
      background:#fff
      .Tiendascontainer
        // margin: auto 0.2rem
        .conveniencia
          font-size:0.35rem
          color:#666
          height:2rem
          border-bottom:1px solid $color-border
          box-sizing: border-box
          text-align:center
          display:flex
          justify-content:center
          align-items:center
        .logolist
          .logos
            display:flex
            flex-wrap:wrap
            .logoitem
              height:1.52rem
              width:2.5rem
              display:flex
              justify-content:center
              align-items:center
              border-bottom:1px solid $color-border
              font-size:0.3rem
              text-align:center
              color:#666
              position: relative
              box-sizing: border-box
              img
                width:2.1rem
          .logos>li:nth-child(3n+2)
            border-left:1px solid $color-border
            border-right: 1px solid $color-border
        .moreshop
          margin-top:0.4rem
          .muchas
            text-align:center
            font-size:0.35rem
            color:$color-meta
          .muchaslist
            display:flex
            justify-content:space-between
            flex-wrap:wrap
            padding:0 0.5rem
            margin-top:0.5rem
            padding-bottom:0.5rem
            border-bottom:1px solid $color-border
            li
              width:50%
              font-size:0.24rem
              color:#666
              display:flex
              align-items:center
              span
                width:0.1rem
                height:0.1rem
                background:$color-meta
                display:inline-block
                border-radius:100%
                margin-right:0.1rem
          .muchaslist>li:not(:last-child)
            margin-bottom:0.25rem
          .muchaslist>li:nth-child(20)>span
            color:red
    .openpaylogo
      font-size:0.24rem
      height:1.5rem
      display:flex
      justify-content:center
      align-items:center
      background:#fff
      img
        width:1.3rem
        height:0.31rem
        margin-left:0.1rem
    .bottom
      font-size:0.24rem
      padding:0.3rem 0.9rem
      text-align:center
      line-height:0.3rem
      span
        color:$color-sky-blue
</style>

