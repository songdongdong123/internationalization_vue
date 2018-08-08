import * as types from './mutation-types'

const mutations = {
  [types.SET_LOGIN_STATE] (state, falg) {
    state.loginState = false
  },
  [types.SET_SCROLL_STATE] (state, falg) {
    state.scrollState = falg
  },
  [types.SET_MESSAGE_STATE] (state, falg) {
    state.messageState = falg
  },
  [types.SET_SUBMIT_BOX] (state, falg) {
    state.submitbox = falg
  },
  [types.SET_PRIZE_STATE] (state, falg) {
    state.prizeState = falg
  },
  [types.SUCCESS_PAGE_STATE] (state, falg) {
    state.successPage = falg
  },
  [types.SET_LISTEN_SCROLL] (state, falg) {
    state.listenScroll = falg
  },
  [types.SET_SHORT_OF_GOLD_STATE] (state, falg) {
    state.shortofgold = falg
  },
  [types.SET_SEND_SUCCESS] (state, falg) {
    state.sendsuccess = falg
  },
  [types.SET_SIGIN_SUCCESS] (state, falg) {
    state.siginsuccess = falg
  },
  [types.SET_CREATE_USER_MSG] (state, msg) {
    state.createUserMsg = msg
  },
  [types.SET_PRO_ISSUE_NO] (state, issueno) {
    state.proIssueNo = issueno
  },
  [types.SET_HOME_SCROLLY] (state, y) {
    state.homescrollY = y
  },
  [types.SET_PAYMONEY] (state, num) {
    state.paymoney = num
  },
  [types.SET_CLECT_STATE] (state, falg) {
    state.clectstate = falg
  },
  [types.SET_NAV_MSG] (state, msg) {
    state.navmsg = msg
  },
  [types.SET_DOWN_LOAD] (state, falg) {
    state.downloadstate = falg
  }
}

export default mutations
