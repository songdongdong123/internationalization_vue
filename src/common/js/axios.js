import axios from 'axios'
import qs from 'qs'
import getUrl from './baseUrl'
// import { userMsg } from '@/common/js/android'
// import { unionLogin } from 'api/login'
import i18n from '../../language'
// import Loading from '../../Plugins/loading/loading'
// import Errorplugins from '../../Plugins/error/error'
import { getQueryString } from './common'
let channelType = getQueryString('channelType')
let channelTag = getQueryString('channelTag')
// 配置axios的config
const language = 'mx'
let config = {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: getUrl(),
  // `withCredentials` 表示跨域请求时是否需要使用凭证（登陆的时候会有cookie这个时候要用到）
  withCredentials: true,
  headers: {
    // 设置
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    // 处理发送前的数据
    data = qs.stringify(data)
    return data
  }],
  data: {
    // 全局参数
    channelType: '6',
    channelTag: '6_7_0_0',
    language: language
  }
}
// 拦截请求
axios.interceptors.request.use((config) => {
  // console.log('请求前')
  if (channelType) {
    config.data.channelType = channelType
  }
  if (channelTag) {
    config.data.channelTag = channelTag
  }
  return config
}, error => {
  return Promise.reject(error)
})
// axios拦截响应
axios.interceptors.response.use((data) => {
  let resdata = data
  if (data.data.errCode === 3 && data.data.retCode === 3) {
    // 取消联合登录
    // unionLogin({
    //   params: userMsg
    // }).then(res => {
    //   if (res.data.errCode === 0 && res.data.retCode === 0) {
    //     return false
    //   }
    // })
    let nologin = resdata.data.data.nologin
    if (!nologin) {
      if (location.host === 'localhost:8089') {
        if (channelType && channelTag) {
          window.location.href = `http://localhost:8089/interim/${i18n.locale}?channelType=${channelType}&channelTag=${channelTag}`
        } else if (channelType) {
          window.location.href = `http://localhost:8089/interim/${i18n.locale}?channelType=${channelType}`
        } else if (channelTag) {
          window.location.href = `http://localhost:8089/interim/${i18n.locale}?channelType=${channelTag}`
        } else {
          window.location.href = `http://localhost:8089/interim/${i18n.locale}`
        }
      } else {
        if (channelType && channelTag) {
          window.location.href = `${getUrl()}/interim/${i18n.locale}?channelType=${channelType}&channelTag=${channelTag}`
        } else if (channelType) {
          window.location.href = `${getUrl()}/interim/${i18n.locale}?channelType=${channelType}`
        } else if (channelTag) {
          window.location.href = `${getUrl()}/interim/${i18n.locale}?&channelTag=${channelTag}`
        } else {
          window.location.href = `${getUrl()}/interim/${i18n.locale}`
        }
      }
    }
  }
  return data
}, error => {
  return Promise.reject(error)
})

const get = (url, params) => {
  url = urlEncode(url, params)
  return axios.get(url, config)
}

const post = (url, params, con) => {
  return axios.post(url, params, config)
}

// 用来拼接get请求的时候的参数
let urlEncode = (url, data) => {
  if (typeof (url) === 'undefined' || url === null || url === '') return ''
  if (typeof (data) === 'undefined' || data === null || typeof (data) !== 'object') return url
  url += (url.indexOf('?') !== -1) ? '' : '?'
  for (let k in data) {
    url += ((url.indexOf('=') !== -1) ? '&' : '') + k + '=' + encodeURI(data[k])
  }
  return url
}

export {
  get,
  post
}
