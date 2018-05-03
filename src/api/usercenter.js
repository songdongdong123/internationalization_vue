import * as axios from '../common/js/axios.js'

// 参与记录列表
const queryUserIgouDealList = params => axios.post('/index.php/deal/queryUserIgouDealList', params)
// 获取用户充值记录列表
const getRechargeRecordList = params => axios.post('/index.php/account/getRechargeRecordList', params)
// 获取用户信息
const getSimpleUserInfo = params => axios.post('/index.php/account/getSimpleUserInfo', params)
// 添加地址
const changeUserAddress = params => axios.post('/index.php/address/changeUserAddress', params)
// 删除地址
const deleteUserAddress = params => axios.post('/index.php/address/deleteUserAddress', params)
// 地址查询
const getUserAddressList = params => axios.post('/index.php/address/getUserAddressList', params)
// 确认收货
const confirmReceiptGoods = params => axios.post('/index.php/deal/confirmReceiptGoods', params)
// 往期详情
const getGoodsPicDetails = params => axios.post('/index.php/goods/getGoodsPicDetails', params)
// 根据邮编获取地址
const getPostCodeInfo = params => axios.post('/index.php/address/getPostCodeInfo', params)
// 获取所有其次获奖者
const queryAllWinner = params => axios.post('/index.php/snatch/queryAllWinner', params)
export {
  queryUserIgouDealList,
  getRechargeRecordList,
  getSimpleUserInfo,
  changeUserAddress,
  getUserAddressList,
  confirmReceiptGoods,
  getGoodsPicDetails,
  deleteUserAddress,
  getPostCodeInfo,
  queryAllWinner
}
