import * as axios from '../common/js/axios.js'
// 期号列表
const getIssueList = params => axios.post('/index.php/snatch/queryIgouIssueList', params)
// 每期详情
const getIssueDetail = params => axios.post('/index.php/snatch/queryIgouIssueDetail', params)

// 获取首页轮播图
const getFistRollPic = params => axios.post('/index.php/address/getFistRollPic', params)

// 获取首页销量
const getTotalSaleNum = params => axios.post('/index.php/statistics/api/getTotalSaleNum', params)

export {
  getIssueList,
  getIssueDetail,
  getFistRollPic,
  getTotalSaleNum
}
