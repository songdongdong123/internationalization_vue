import * as axios from '../common/js/axios.js'

// 参与记录列表
const getSimpleDealList = params => axios.post('/index.php/deal/getSimpleDealList', params)

// 往期夺宝记录列表
const getOldIssueList = params => axios.post('/index.php/snatch/queryOldIgouIssueRecord', params)

// 用户参与夺宝记录
const getAllIgouDealList = params => axios.post('/index.php/deal/queryAllIgouDealList', params)

// 用户参与号码列表
const getUserIgouNumberList = params => axios.post('/index.php/snatch/queryUserIgouNumberList', params)

// 用户号码页面简要信息
const getIssueSampleInfo = params => axios.post('/index.php/snatch/queryIssueSampleInfo', params)

// 计算详情
const getIssueCalculDetail = params => axios.post('/index.php/snatch/issueCalculDetail', params)

// 计算详情
const test = params => axios.post('/index.php/deal/test', params)
export {
  getSimpleDealList,
  getOldIssueList,
  getAllIgouDealList,
  getUserIgouNumberList,
  getIssueSampleInfo,
  getIssueCalculDetail,
  test
}
