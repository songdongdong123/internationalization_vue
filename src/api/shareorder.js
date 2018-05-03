import * as axios from '../common/js/axios.js'
// 晒单接口
const insertShowDeal = params => axios.post('/index.php/deal/insertShowDeal', params)
// 晒单列表
const queryShowDeal = params => axios.post('/index.php/deal/queryShowDeal', params)

const uploadImageFile = (params, config) => {
  return axios.post('/index.php/common/uploadImageFile', params, config)
}

export {
  insertShowDeal,
  queryShowDeal,
  uploadImageFile
}
