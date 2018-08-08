import { unionLogin, recordDeviceInfo } from 'api/login'
import { getCookie, setCookie } from '@/common/js/common'
import { getQueryString } from './common'
import getUrl from './baseUrl'
import i18n from '../../language'
let channelType = getQueryString('channelType')
let channelTag = getQueryString('channelTag')
let userMsg = ''
let unionLoginState = false
const loginState = function ({router, issueNo, free, tag, activityType, next, to}) {
  // let state = isInsideAndroid()
  let state = false
  if (state) {
    userMsg = window.Android.getLoginParam()
    // toUnionLogin(userMsg, next)
    let cookie = getCookie('lkey')
    if (!cookie && !userMsg) {
      // toUnionLogin(userMsg)
    }
    if (!userMsg) {
      if (next) {
        next(false)
      }
      if (issueNo) {
        if (!free) {
          window.Android.startLoginActivity(`${getUrl()}/productdetail/${i18n.locale}?issueNo=${issueNo}&tag=${tag}&source=android`)
        } else {
          window.Android.startLoginActivity(`${getUrl()}/freeproduct/${i18n.locale}?issueNo=${issueNo}&source=android`)
        }
      } else {
        window.Android.startLoginActivity(`$${getUrl()}/home/${i18n.locale}?source=android`)
      }
      return false
    } else {
      return true
    }
  } else {
    if (!getCookie('lkey')) {
      if (location.hostname !== 'localhost') {
        router.push({path: '/interim/' + i18n.locale,
          query: {
            channelType: channelType,
            channelTag: channelTag,
            activityType: activityType
          }})
      }
    }
    return true
  }
}

const isInsideAndroid = function () {
  if (typeof window.Android !== 'undefined') {
    if (typeof window.Android.getLoginParam !== 'undefined') {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

const toUnionLogin = function (Msg, next) {
  let state = isInsideAndroid()
  if (state) {
    if (next) {
      next(false)
    }
    unionLogin({
      params: Msg || window.Android.getLoginParam()
    }).then(res => {
      if (res.data.errCode === 0 && res.data.retCode === 0) {
        // 登录成功后，获取设备id
        let deviceId = window.Android.getUid()
        // 将设备id转发给服务器
        recordDeviceInfo({
          deviceId: deviceId
        }).then(res => {
          if (next) {
            next()
          }
          return true
        })
      }
    })
  }
}

const checkAppLoginState = function () {
  let state = isInsideAndroid()
  if (state) {
    let appMsg = window.Android.getLoginParam()
    if (!appMsg) {
      setCookie('ltk', 0)
      return false
    } else {
      setCookie('ltk', appMsg)
      return true
    }
  }
}

const checkPageScore = function (to, next) {
  // 2018-6-6废弃
  // 检测页面来源
  // let state = isInsideAndroid()
  let state = false
  if (typeof to.query.source !== 'undefined') {
    if (to.query.source === 'android') {
      if (state) {
        // toUnionLogin(window.Android.getLoginParam(), next)
      }
    } else {
      next()
    }
  } else {
    if (state) {
      let appMsg = window.Android.getLoginParam()
      if (!appMsg) {
        if (to.name !== 'usercenter') {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    } else {
      next()
    }
  }
}

export {
  loginState,
  userMsg,
  checkAppLoginState,
  checkPageScore,
  unionLoginState,
  toUnionLogin
}
