const getCookie = function (name) {
  let arr = []
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

const getQueryString = function (name) {
  // 获取url参数
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r !== null) {
    return unescape(r[2])
  }
  return undefined
}

const createRandom = function (len) {
  // 生成随机字符串
  let $chart = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let maxPos = $chart.length
  let tempStr = ''
  for (let i = 0; i < len; i++) {
    tempStr += $chart.charAt(Math.floor(Math.random() * maxPos))
  }
  return tempStr
}

const setCookie = function (name, value) {
  document.cookie = `${name} = ${value};path=/`
}

export {
  getCookie,
  setCookie,
  createRandom,
  getQueryString
}
