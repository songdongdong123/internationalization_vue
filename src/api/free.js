import * as axios from '../common/js/axios.js'
// 活动列表
const getFreeJoinList = params => axios.post('/index.php/activity/getFreeJoinList', params)

// 获取中奖信息接口
const queryWinningMsg = params => axios.post('/index.php/msg/queryWinningMsg', params)

// 将中奖消息设置为已读信息
const updateWinningMsg = params => axios.post('/index.php/msg/updateWinningMsg', params)

export {
  getFreeJoinList,
  queryWinningMsg,
  updateWinningMsg
}
