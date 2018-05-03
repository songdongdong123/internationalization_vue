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
  }
}

export default mutations
