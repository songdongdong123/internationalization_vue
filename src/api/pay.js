import * as axios from '../common/js/axios.js'
// 支付订单
const createDeal = params => axios.post('/index.php/deal/createDeal', params)
// 地址提交
const confirmAddress = params => axios.post('/index.php/deal/confirmAddress', params)

// 充值订单
const payrecharge = params => axios.post('/index.php/pay/recharge', params)

// 查询充值是否成功
const getPayOrderInfo = params => axios.post('/index.php/pay/getPayOrderInfo', params)

export {
  createDeal,
  confirmAddress,
  payrecharge,
  getPayOrderInfo
}
