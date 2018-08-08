import * as axios from '../common/js/axios.js'
// 支付订单
const createDeal = params => axios.post('/index.php/deal/createDeal', params)
// 地址提交
const confirmAddress = params => axios.post('/index.php/deal/confirmAddress', params)

// 充值订单
const payrecharge = params => axios.post('/index.php/pay/recharge', params)

// 查询充值是否成功
const getPayOrderInfo = params => axios.post('/index.php/pay/getPayOrderInfo', params)

// 获取支付配置
const getPayTypeList = params => axios.post('/index.php/pay/getPayTypeList', params)

// 选择支付通道
// https://mdev.1peso.com.mx/index.php/pay/getPayChannel
const getPayChannel = params => axios.post('/index.php/pay/getPayChannel', params)

// 保存卡号
const saveCardInfo = params => axios.post('/index.php/address/saveCardInfo', params)

// 获取卡号
const getCardInfo = params => axios.post('/index.php/address/getCardInfo', params)

// 保存支付方案
const saveRechargeInfo = params => axios.post('/index.php/address/saveRechargeInfo', params)

// 获取支付方案
const getRechargeInfo = params => axios.post('/index.php/address/getRechargeInfo', params)

export {
  createDeal,
  confirmAddress,
  payrecharge,
  getPayOrderInfo,
  getPayChannel,
  getPayTypeList,
  saveCardInfo,
  getCardInfo,
  saveRechargeInfo,
  getRechargeInfo
}
