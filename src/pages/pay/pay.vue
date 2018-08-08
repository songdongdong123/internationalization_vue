<template>
  <div class="pay">
    <div class="title">
      <div class="titlecontainer">
        <span @click="backUserCenter" class="left icon-fanhui1"></span>
        <!-- 金币充值 -->
        <p>Recargar</p>
      </div>
    </div>
    <!-- 选择支付方式 -->
    <p class="participarlo" v-if="!userstate">Tu saldo no es suficiente, recarga antes de participar</p>
    <div class="choosepayway" :class="{'shotofmargin':!userstate}">
      <p class="quieres">¿Cómo quieres pagar?</p>
      <div class="Tarjeta" @click="showPayContainer">
        <p>{{defaultPayWay}}</p>
        <p class="arrow">
          <span class="icon_arrow"></span>
        </p>
      </div>
    </div>
    <!-- 支付方式 -->
    <transition name="fade">
      <div class="paywaycontainer" v-show="paycontainerstate">
        <div class="container">
          <p class="container_title" @click="showPayContainer">¿Cómo quieres pagar?<span class="icon-close"></span></p>
          <ul class="waylist">
            <li class="wayitem" v-for="list in waylist" @click="chooseThisPayWay(list)">
              <span>{{list.payName}}</span>
              <span class="desc">{{list.remark}}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- 信用卡运营公司选择 -->
      <div class="bankcontainer" v-show="bankcompanystate">
        <p class="Tipo">Tipo de Tarjeta de Crédito</p>
        <div class="container" @click="showbankcontainer(0)">
          <p>{{defaultbankcompany}}</p>
          <p class="arrow">
            <span class="icon_arrow"></span>
          </p>
        </div>
      </div>
      <!-- 便利店选择 -->
      <div class="bankcontainer" v-show="shopchoosestate">
        <p class="Tipo">Selección de puntos de recarga</p>
        <div class="container" @click="showbankcontainer(1)">
          <p>{{defaultshop}}</p>
          <p class="arrow">
            <span class="icon_arrow"></span>
          </p>
        </div>
      </div>
      <!-- 银行转账选择 -->
      <div class="bankcontainer" v-show="bankchoosestate">
        <p class="Tipo">Bancos</p>
        <div class="container" @click="showbankcontainer(2)">
          <p>{{defaultbank}}</p>
          <p class="arrow">
            <span class="icon_arrow"></span>
          </p>
        </div>
      </div>
    <!-- 信用卡运营公司列表 -->
    <transition name="fade">
      <div class="bankcompany" v-show="bankcomtainerstate">
        <div class="companylist">
          <p class="banktitle" @click="hideAllcontainer">Tipo de Tarjeta de Crédito<span class="icon-close"></span></p>
          <ul>
            <li v-for="list in companylist" @click="choosecompany(list, 0)">{{list.name}}</li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- 便利店列表 -->
    <transition name="fade">
      <div class="bankcompany" v-show="shopcontainerstate">
        <div class="companylist">
          <p class="banktitle" @click="hideAllcontainer">Selección de puntos de recarga<span class="icon-close"></span></p>
          <ul>
            <li 
              v-for="list in shoplist" @click="choosecompany(list, 1)"
              :class="{'nosupport': list.name === 'OXXO'}"
            >
              <span>{{list.name}}</span>
              <span class="desc">{{list.desc}}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- 银行列表 -->
    <transition name="fade">
      <div class="bankcompany" v-show="bankcontainerstate">
        <div class="companylist">
          <p class="banktitle" @click="hideAllcontainer">Bancos<span class="icon-close"></span></p>
          <ul>
            <li v-for="list in banklist" @click="choosecompany(list, 2)">{{list.name}}</li>
          </ul>
        </div>
      </div>
    </transition>

    <div class="ipt">
      <p class="Nmero" :class="{'erroNmero':participarlostate}">Monto que deseas recargar</p>
      <p v-show="participarlostate" class="errmsg">{{payerrormsg}}</p>
      <div class="input" :class="{'inputerror': participarlostate}">
        <input 
        type="tel"
        v-model="money"
        maxlength="4"
        @keyup="money=money.replace(/^0|\D+/g, '')"
        v-on:input="checkoutMoney" 
        v-on:focus="resetInputState"
        :placeholder="$t('payform.inputgoldNums')">
        <span class="unit">MXN</span>
      </div>
    </div>
    <div class="remarkmsg" v-show="ratio">
      <!-- itemMoney*ratio -->
      <!-- Math.round(formatFloat(itemMoney*ratio, 2))+Number(itemMoney) -->
      <p>Regalar más de <span class="ratios">{{ratio*100}}%</span>, obtener <span class="ratios">
        {{itemMoney*ratio+Number(itemMoney)|formatFloat}}</span> pesos juntos.</p>
    </div>
    <div class="listsubmitbtn" @click="toPayWay(1)">
      <p :class="{'listsubmitbtnAvtive':errorbtn}">Pago de <span v-show="itemMoney">{{itemMoney}}.00 MXN</span></p>
    </div>
    <div class="userNotice" v-show="false">
      <p>{{$t('payform.noticeTitle')}}</p>
      <ul class="list">
        <li class="item"><span>I. </span><span>{{$t('payform.userNotice')[0]}}</span></li>
        <li class="item"><span>II.</span><span>{{$t('payform.userNotice')[1]}}</span></li>
        <li class="item"><span>III.</span><span>{{$t('payform.userNotice')[2]}}</span></li>
        <li class="item"><span>IV.</span><span>{{$t('payform.userNotice')[3]}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { createRandom } from '@/common/js/common'
  import getBaseUrl from '@/common/js/baseUrl'
  import { mapMutations } from 'vuex'
  import { getPayChannel, getPayTypeList, saveRechargeInfo, getRechargeInfo, payrecharge } from 'api/pay'
  export default {
    data () {
      return {
        money: 60, // 默认充值金额
        waylist: [ // 支付方式列表
          {
            name: 'Tarjeta de crédito',
            desc: '',
            id: 0,
            way: 'XYK'
          }, {
            name: 'Tarjeta de débito',
            desc: '',
            id: 1,
            way: 'JJK'
          }, {
            name: 'Efectivo en puntos de pago',
            desc: '10% más',
            id: 2
          }, {
            name: 'Todito Cash',
            desc: '10% más',
            id: 3
          }, {
            name: 'Transferenica electrónica',
            desc: '',
            id: 4,
            WAY: 'YHZZ'
          }
        ],
        companylist: [ // 运营公司列表
          {
            name: 'Visa / Mastercard',
            type: 1
          },
          {
            name: 'American Express',
            type: 3
          }
        ],
        payerrormsg: 'La recarga mínima de 60 pesos',
        paycontainerstate: false, // 支付选项弹窗
        defaultPayWay: 'Tarjeta de crédito', // 默认是支付方式
        defaultbankcompany: 'Visa / Mastercard', // 默认信用卡运营公司
        defaultshop: '7-ELEVEN', // 默认便利店
        defaultbank: 'BBVA Bancomer', // 默认银行
        paytype: 2,
        cardType: 1,
        bankType: 0,
        shopType: 0,
        bankcomtainerstate: false, // 运营公司弹窗状态
        bankcompanystate: true, // 是否展示信用卡运营公司的选项
        shopchoosestate: false, // 便利店选择项状态
        shopcontainerstate: false, // 便利店列表状态
        bankchoosestate: false, // 银行转账选择项状态
        bankcontainerstate: false, // 银行列表状态
        ratio: 0, // 活动赠送比例
        shoplist: [
          {
            name: '7-ELEVEN',
            type: 0,
            desc: ''
          }, {
            name: 'Circle K',
            type: 1,
            desc: ''
          }, {
            name: 'Farmacias del ahorro',
            type: 2,
            desc: ''
          }, {
            name: 'Otros puntos de pago',
            type: 3,
            desc: ''
          }, {
            name: 'OXXO',
            type: 4,
            desc: 'No apoyo temporal'
          }
        ],
        banklist: [
          {
            name: 'BBVA Bancomer',
            type: 0,
            desc: ''
          }, {
            name: 'Otros bancos',
            type: 1,
            desc: ''
          }
        ],
        submitState: true,
        itemMoney: 60,
        channelType: '',
        userstate: true,
        submintbtnstate: false,
        errorbtn: false,
        participarlostate: false
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      this.$loading({
        state: false
      })
      if (this.$route.query.usercenter) {
        this.userstate = true
      } else {
        this.userstate = false
      }
      this._getRechargeInfo()
    },
    methods: {
      _getPayTypeList (type, payType) {
        // 获取支付配置
        getPayTypeList({}).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.waylist = res.data.data.list
            if (type) {
              this.defaultPayWay = this.waylist[0].payName
            }
            for (let list of this.waylist) {
              if (list.ratio !== 0 && Number(list.payType) === payType) {
                this.ratio = list.ratio
              }
            }
            this.$loading({
              state: false
            })
          }
        })
      },
      _payrecharge (type) {
        // Paypal Card支付
        switch (type) {
          case 7:
            payrecharge({
              amount: this.itemMoney,
              paytype: 7,
              spId: this.spId
            }).then(res => {
              location.href = res.data.data.strPayUrl
            })
            break
          case 8:
            payrecharge({
              amount: this.itemMoney,
              paytype: 8,
              spId: this.spId
            }).then(res => {
              location.href = res.data.data.barcode_url
            })
            break
        }
      },
      resetInputState () {
        // 获取焦点重置状态
        this.submintbtnstate = false
      },
      _getRechargeInfo () {
        // 获取支付方案
        this.$loading({
          state: true
        })
        getRechargeInfo({}).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.paytype = res.data.data.payType ? res.data.data.payType : this.paytype
            this.cardType = res.data.data.cardType ? res.data.data.cardType : this.cardType
            let shopType = res.data.data.shopType
            this.bankType = res.data.data.bankType ? res.data.data.bankType : this.bankType
            if (!this.paytype) {
              this._getPayTypeList(1)
            } else {
              this._getPayTypeList(0, this.paytype)
              switch (Number(this.paytype)) {
                case 2: // 信用卡
                  [
                    this.bankcompanystate,
                    this.shopchoosestate,
                    this.bankchoosestate,
                    this.defaultPayWay
                  ] = [true, false, false, 'Tarjeta de crédito']
                  switch (this.cardType) {
                    case 1:
                      this.defaultbankcompany = 'Visa / Mastercard'
                      break
                    case 3:
                      this.defaultbankcompany = 'American Express'
                      break
                    case 4:
                      this.defaultbankcompany = 'Carnet'
                      break
                  }
                  if (!this.cardType) {
                    if (this.defaultbankcompany === 'Visa / Mastercard') {
                      this.cardType = 1
                    }
                  }
                  break
                case 3: // 借记卡
                  [
                    this.bankcompanystate,
                    this.shopchoosestate,
                    this.bankchoosestate,
                    this.defaultPayWay
                  ] = [false, false, false, 'Tarjeta de débito']
                  break
                case 4: // 银行转账
                  [
                    this.bankcompanystate,
                    this.shopchoosestate,
                    this.bankchoosestate,
                    this.defaultPayWay
                  ] = [false, false, true, 'Transferenica electrónica']
                  switch (this.bankType) {
                    case 0:
                      this.defaultbank = 'BBVA Bancomer'
                      break
                    case 1:
                      this.defaultbank = 'Otros bancos'
                      break
                  }
                  break
                case 5: // 便利店
                  [
                    this.bankcompanystate,
                    this.shopchoosestate,
                    this.bankchoosestate,
                    this.defaultPayWay
                  ] = [false, true, false, 'Efectivo en puntos de pago']
                  switch (shopType) {
                    case 0:
                      this.defaultshop = '7-ELEVEN'
                      break
                    case 1:
                      this.defaultshop = 'Circle K'
                      break
                    case 2:
                      this.defaultshop = 'Farmacias del ahorro'
                      break
                    case 3:
                      this.defaultshop = 'Otros puntos de pago'
                      break
                    case 4:
                      this.defaultshop = 'OXXO'
                      break
                  }
                  break
                case 6: // Todito
                  [
                    this.bankcompanystate,
                    this.shopchoosestate,
                    this.bankchoosestate,
                    this.defaultPayWay
                  ] = [false, false, false, 'Todito Cash']
                  break
                case 7: // Paypal Card
                  [
                    this.bankcompanystate,
                    this.shopchoosestate,
                    this.bankchoosestate,
                    this.defaultPayWay
                  ] = [false, false, false, 'Paypal']
                  break
                case 8: // Paypal Card
                  [
                    this.bankcompanystate,
                    this.shopchoosestate,
                    this.bankchoosestate,
                    this.defaultPayWay,
                    this.money, this.itemMoney
                  ] = [false, false, false, 'OXXO', 60, 60]
                  break
              }
            }
          }
        })
      },
      _saveRechargeInfo () {
        // 保存支付方案
        let info = {}
        switch (this.paytype) {
          case 2:
            info = {
              cardType: this.cardType,
              payType: this.paytype
            }
            break
          case 3:
            info = {
              payType: this.paytype
            }
            break
          case 4:
            info = {
              bankType: this.bankType,
              payType: this.paytype
            }
            break
          case 5:
            info = {
              shopType: this.shopType,
              payType: this.paytype
            }
            break
          case 6:
            info = {
              payType: this.paytype
            }
            break
          case 7:
            info = {
              payType: this.paytype
            }
            break
          case 8:
            info = {
              payType: this.paytype
            }
            break
        }
        saveRechargeInfo({
          info: JSON.stringify(info)
        }).then(res => {
          // console.log(res)
        })
      },
      _getPayChannel ({amount, type}) {
        this.$loading({
          state: true
        })
        getPayChannel({
          amount: amount,
          payType: type,
          cardType: this.cardType
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.paychannel = res.data.data.channel
            this.spId = res.data.data.spId
            this._saveRechargeInfo()
            switch (type) {
              case 2:
                if (this.paychannel === 'open') {
                  location.href = `${getBaseUrl()}/view/openpay.html?${this.returnPaywayParams()}&spId=${this.spId}&bank=0&cardtype=${this.cardType}`
                } else if (this.paychannel === 'pass') {
                  location.href = `${getBaseUrl()}/view/passpay.html?${this.returnPaywayParams()}&spId=${this.spId}&bank=0&cardtype=${this.cardType}`
                } else if (this.paychannel === 'payu') {
                  location.href = `${getBaseUrl()}/view/payu.html?${this.returnPaywayParams()}&spId=${this.spId}&bank=0&cardtype=${this.cardType}`
                }
                break
              case 3:
                if (this.paychannel === 'open') {
                  location.href = `${getBaseUrl()}/view/openpay.html?${this.returnPaywayParams()}&spId=${this.spId}&bank=1&cardtype=${this.cardType}`
                } else if (this.paychannel === 'pass') {
                  location.href = `${getBaseUrl()}/view/passpay.html?${this.returnPaywayParams()}&spId=${this.spId}&bank=1&cardtype=${this.cardType}`
                } else if (this.paychannel === 'payu') {
                  location.href = `${getBaseUrl()}/view/payu.html?${this.returnPaywayParams()}&spId=${this.spId}&bank=0&cardtype=${this.cardType}`
                }
                break
              case 4:
              // 银行转账
                if (this.bankType === 0) {
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
              case 6:
              // todito支付
                this.$router.push({path: '/toditopay/' + this.$i18n.locale,
                  query: {
                    channelType: this.channelType,
                    channelTag: this.channelTag,
                    paychannel: this.paychannel,
                    spId: this.spId,
                    score: this.$route.query.score,
                    issueNo: this.$route.query.issueNo
                  }})
                break
              case 7:
              // Paypal Card支付
                this._payrecharge(7)
                break
              case 8:
              // Paypal Card支付
                this._payrecharge(8)
                break
            }
          } else {
            this.$loading({state: false})
            this.$toast({
              message: res.data.msg,
              duration: 2000
            })
          }
        })
      },
      chooseThisPayWay (list) {
        // 选择支付方式
        switch (Number(list.payType)) {
          case 2: // 信用卡
            [this.bankcompanystate, this.shopchoosestate, this.bankchoosestate, this.paytype, this.ratio] = [true, false, false, 2, list.ratio]
            break
          case 3: // 借记卡
            [this.bankcompanystate, this.shopchoosestate, this.bankchoosestate, this.paytype, this.ratio] = [false, false, false, 3, list.ratio]
            break
          case 4: // 银行转账
            [this.bankcompanystate, this.shopchoosestate, this.bankchoosestate, this.paytype, this.ratio] = [false, false, true, 4, list.ratio]
            break
          case 5: // 便利店
            [this.bankcompanystate, this.shopchoosestate, this.bankchoosestate, this.paytype, this.ratio] = [false, true, false, 5, list.ratio]
            break
          case 6: // Todito
            [this.bankcompanystate, this.shopchoosestate, this.bankchoosestate, this.paytype, this.ratio] = [false, false, false, 6, list.ratio]
            break
          case 7: // Paypal
            [this.bankcompanystate, this.shopchoosestate, this.bankchoosestate, this.paytype, this.ratio] = [false, false, false, 7, list.ratio]
            break
          case 8: // oxxo
            [this.bankcompanystate, this.shopchoosestate, this.bankchoosestate, this.paytype, this.ratio, this.money, this.itemMoney] = [false, false, false, 8, list.ratio, 60, 60]
            break
          // default:
          //   [this.bankcompanystate, this.shopchoosestate, this.bankchoosestate, this.paytype, this.ratio] = [true, false, false, 2, list.ratio]
        }
        // 更改支付选项并重置其他选项
        [
          this.defaultPayWay,
          this.paycontainerstate,
          this.defaultbankcompany,
          this.defaultshop,
          this.defaultbank,
          this.cardType,
          this.bankType,
          this.shopType
        ] = [
          list.payName,
          false,
          'Visa / Mastercard',
          '7-ELEVEN',
          'BBVA Bancomer',
          1,
          0,
          0
        ]
      },
      choosecompany (list, index) {
        switch (index) {
        // 选择一个信用卡运用公司
          case 0:
            [this.defaultbankcompany, this.bankcomtainerstate, this.cardType] = [list.name, false, list.type]
            break
        // 选择一个便利店
          case 1:
            if (list.name !== 'OXXO') {
              [this.defaultshop, this.shopcontainerstate, this.shopType] = [list.name, false, list.type]
            }
            break
        // 选择一个银行
          case 2:
            [this.defaultbank, this.bankcontainerstate, this.bankType] = [list.name, false, list.type]
            break
        }
      },
      showbankcontainer (index) {
        // 显示弹窗
        switch (index) {
          case 0:
            [this.bankcomtainerstate, this.shopcontainerstate, this.bankcontainerstate] = [true, false, false]
            break
          case 1:
            [this.bankcomtainerstate, this.shopcontainerstate, this.bankcontainerstate] = [false, true, false]
            break
          case 2:
            [this.bankcomtainerstate, this.shopcontainerstate, this.bankcontainerstate] = [false, false, true]
            break
          default:
            [this.bankcomtainerstate, this.shopcontainerstate, this.bankcontainerstate] = [false, false, false]
        }
      },
      hideAllcontainer () {
        // 隐藏所有弹窗
        [this.bankcomtainerstate, this.shopcontainerstate, this.bankcontainerstate] = [false, false, false]
      },
      showPayContainer () {
        // 显示选择支付方式
        this.paycontainerstate = !this.paycontainerstate
      },
      checkoutMoney () {
        // 检查输入金额是否满足条件
        let moneyNum = this.money.replace(/[^0-9]/ig, '')
        this.itemMoney = this.money
        this.participarlostate = false
        if (this.paytype !== 8) {
          if (Number(moneyNum) >= 60 && Number(moneyNum) <= 500) {
            this.submitState = true
            this.errorbtn = false
          } else {
            this.submitState = false
            this.errorbtn = true
            if (Number(moneyNum) < 60) {
              this.payerrormsg = 'La recarga mínima de 60 pesos'
            } else {
              this.payerrormsg = 'El importe máximo de 500 pesos.'
            }
          }
        } else {
          if (Number(moneyNum) >= 60 && Number(moneyNum) <= 500) {
            this.submitState = true
            this.errorbtn = false
          } else {
            this.submitState = false
            this.errorbtn = true
            if (Number(moneyNum) < 60) {
              this.payerrormsg = 'La recarga mínima de 60 pesos'
            } else {
              this.payerrormsg = 'El importe máximo de 500 pesos.'
            }
          }
        }
      },
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
      returnPaywayParams () {
        if (this.channelTag && this.channelType) {
          return `channelType=${this.channelType}&channelTag=${this.channelTag}&num=${this.itemMoney}`
        } else if (this.channelType) {
          return `channelType=${this.channelType}&channelTag=6_7_0_0&num=${this.itemMoney}`
        } else if (this.channelTag) {
          return `channelType=6&channelTag=${this.channelTag}&num=${this.itemMoney}`
        } else {
          return `channelType=6&channelTag=6_7_0_0&num=${this.itemMoney}`
        }
      },
      toPayWay (type) {
        // b536a272efe64829d0 充值金额
        console.log(this.itemMoney)
        if (this.submitState && (this.itemMoney >= 60)) {
          this.participarlostate = false
          if (this.money) {
            window.localStorage.setItem('b536a272efe64829d0', `${createRandom(17)}${this.money}${createRandom(12)}`)
            this.setPaymoney(this.money)
          } else {
            this.setPaymoney(this.itemMoney)
            window.localStorage.setItem('b536a272efe64829d0', `${createRandom(17)}${this.itemMoney}${createRandom(12)}`)
          }
          // 数据上报
          if (this.$ga) {
            this.$ga.event({
              eventCategory: '充值',
              eventAction: '渠道/充值方案/充值金额',
              // 上报充值自定义金额
              eventLabel: `渠道:${this.channelTag ? this.channelTag : '6_7_0_0'}/
              充值方案：支付方式(${this.paytype});信用卡类型(${this.cardType})
              /充值金额:${this.itemMoney}`,
              eventValue: 0
            })
          }
          // 选择支付方案
          switch (this.paytype) {
            // 信用卡支付
            case 2:
              this._getPayChannel({amount: this.itemMoney, type: 2})
              break
            // 借记卡
            case 3:
              this.cardType = 0
              this._getPayChannel({amount: this.itemMoney, type: 3})
              break
            // 转账
            case 4:
              this._getPayChannel({amount: this.itemMoney, type: 4})
              break
            // 便利店
            case 5:
              this._getPayChannel({amount: this.itemMoney, type: 5})
              break
            // 移动支付
            case 6:
              this._getPayChannel({amount: this.itemMoney, type: 6})
              break
            case 7:
              this._getPayChannel({amount: this.itemMoney, type: 7})
              break
            case 8:
              this._getPayChannel({amount: this.itemMoney, type: 8})
              break
          }
        } else {
        //  ...
          this.participarlostate = true
        }
      },
      ...mapMutations({
        setPaymoney: 'SET_PAYMONEY'
      })
    },
    beforeDestroy () {
      // this.$loading({
      //   state: false
      // })
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
    .participarlo
      font-weight: bold
      margin-top:1rem
      padding:0.3rem 0.3rem
      padding-bottom:0
      font-size:0.3rem
    .choosepayway
      margin:auto 0.32rem
      margin-top:0.9rem
      font-size:0.3rem
      .quieres
        height:0.9rem
        line-height:0.9rem
        font-size:0.25rem
        color:#999
      .Tarjeta
        height:1rem
        background:#fff
        box-sizing:border-box
        padding:0.15rem
        display:flex
        align-items:center
        justify-content:space-between
        border:1px solid #ccc
        border-radius:0.1rem
        position: relative
        .arrow
          display:inline-block
          height:100%
          width:1.2rem
          border-left:1px solid #ccc
          display:flex
          justify-content:center
          align-items:center
          margin-right:-0.15rem
          .icon_arrow
            display:inline-block
            width:0.25rem
            height:0.36rem
            bg-image('./img/arrow')
            background-size:0.25rem 0.36rem
            background-repeat: no-repeat
            background-position: center center
    .shotofmargin
      margin-top:0
    .bankcontainer
      margin:auto 0.32rem
      font-size:0.3rem
      .container
        height:1rem
        background:#fff
        box-sizing:border-box
        padding:0.15rem
        display:flex
        align-items:center
        justify-content:space-between
        border:1px solid #ccc
        border-radius:0.1rem
        position: relative
        .arrow
          display:inline-block
          height:100%
          width:1.2rem
          border-left:1px solid #ccc
          display:flex
          justify-content:center
          align-items:center
          margin-right:-0.15rem
          .icon_arrow
            display:inline-block
            width:0.25rem
            height:0.36rem
            bg-image('./img/arrow')
            background-size:0.25rem 0.36rem
            background-repeat: no-repeat
            background-position: center center
      .Tipo
        height:0.9rem
        line-height:0.9rem
        font-size:0.25rem
        color:#999
    .bankcompany
      position:fixed
      width:100%
      height:100%
      background:rgba(0,0,0,.5)
      z-index:1000
      top:0
      left:0
      font-size:0.3rem
      display:flex
      justify-content:center
      align-items:center
      .companylist
        width:95%
        background:#fff
        border-radius:0.1rem
        ul
          li
            height:1rem
            line-height:1rem
            box-sizing:border-box
            padding:0 0.4rem
          .nosupport
            color:#ccc
        ul>li:not(:last-child)
          border-bottom:1px solid #f0f0f0
        ul>li
          display:flex
          justify-content:space-between
        .banktitle
          // text-align:center
          height:1rem
          line-height:1rem
          border-bottom:1px solid #ccc
          box-sizing:border-box
          font-size:0.35rem
          position: relative
          padding-left:0.2rem
          span
            position:absolute
            right:0.2rem
            font-size:0.45rem
            font-weight: bold
    .paywaycontainer
      position:fixed
      width:100%
      height:100%
      background:rgba(0,0,0,.5)
      z-index:3000
      top:0
      left:0
      display:flex
      justify-content:center
      align-items:center
      .container
        width:95%
        background:#fff
        font-size:0.30rem
        border-radius:0.1rem
        border:1px solid #666
        .container_title
          // text-align:center
          padding-left:0.2rem
          height:1rem
          line-height:1rem
          border-bottom:1px solid #ccc
          box-sizing:border-box
          font-size:0.35rem
          position: relative
          span
            position:absolute
            right:0.2rem
            font-size:0.45rem
            font-weight: bold
        .waylist
          .wayitem
            padding:0.4rem 0.4rem
            display:flex
            justify-content:space-between
            font-weight:bold
            .desc
              color:$color-yellow
        .waylist>li:not(:last-child)
          border-bottom:1px solid #f0f0f0
    .ipt
      font-size:0.3rem
      // background:#fff
      .Nmero
        padding:0.3rem 0.32rem
        font-size:0.25rem
        color:#999
      .erroNmero
        padding-bottom:0.3rem
      .errmsg
        margin:auto 0.32rem
        padding-bottom:0.1rem
        font-size:0.24rem
        color:$color-meta
      .input
        border:1px solid #ccc
        margin:auto 0.32rem
        height:1rem
        border-radius:0.1rem
        overflow: hidden
        position: relative
        input
          box-sizing:border-box
          height:100%
          width:100%
          padding:0.2rem
        .unit
          position:absolute
          right:0.2rem
          top:50%
          transform:translateY(-50%)
          color:#999
      .inputerror
        border:1px solid $color-meta
    .listsubmitbtn
      font-size:0.35rem
      height:1rem
      color:#fff
      line-height:1rem
      text-align:center
      transition:all .5s
      // background:#fff
      padding-bottom:0.3rem
      margin-top:0.4rem
      p
        margin:auto 0.32rem
        border-radius:0.1rem
        background:$color-meta
      .listsubmitbtnAvtive
        background:#ccc
    .remarkmsg
      height:1.16rem
      // width:6.86rem
      font-size:0.24rem
      margin:auto 0.32rem
      color:rgb(255,134,13)
      margin-top:0.4rem
      // position: relative
      bg-image('./img/diags')
      background-size: 6.86rem 1.16rem
      background-position:center center
      background-repeat: no-repeat
      line-height:1.25rem
      p
        margin-left:0.2rem
      .ratios
        font-size:0.3rem
        font-weight: bold
    .userNotice
      font-size:0.25rem
      margin:auto 0.32rem
      margin-top:0.5rem
      color:#999
      padding-bottom:0.5rem
      .list
        margin-top:0.2rem
        .item
          line-height:0.4rem
          display:flex
        .item>span:nth-child(1)
          width:5%
          display:inline-block
        .item>span:nth-child(2)
          width:95%
          display:inline-block
</style>
