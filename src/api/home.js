import * as axios from '../common/js/axios.js'
// 期号列表
const getIssueList = params => axios.post('/index.php/snatch/queryIgouIssueList', params)
// 每期详情
const getIssueDetail = params => axios.post('/index.php/snatch/queryIgouIssueDetail', params)

// 获取首页轮播图
const getFistRollPic = params => axios.post('/index.php/address/getFistRollPic', params)

// 获取首页销量
const getTotalSaleNum = params => axios.post('/index.php/statistics/api/getTotalSaleNum', params)

// 获取首页中奖消息列表
const queryLastOpenIssueInfo = params => axios.post('/index.php/snatch/queryLastOpenIssueInfo', params)

const getGoodsClassify = params => axios.post('/index.php/snatch/getGoodsClassify', params)

// 获取文章详情
const getArticleInfo = params => axios.post('/index.php/address/getArticleInfo', params)

// 获取我的邀请码
const getMyInviteInfo = params => axios.post('/index.php/pay/getMyInviteInfo', params)

// 获取活动列表
const getActivityList = params => axios.post('/index.php/activity/getActivityList', params)

export {
  getIssueList,
  getIssueDetail,
  getFistRollPic,
  getTotalSaleNum,
  queryLastOpenIssueInfo,
  getGoodsClassify,
  getArticleInfo,
  getMyInviteInfo,
  getActivityList
}
