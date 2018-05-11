export default function getBaseUrl (type) {
  let [baseUrl, urls, protocol] = ['https://mdev.1peso.com.mx', location.href.toLowerCase(), 'http://']
  // 判断协议
  if (location.protocol === 'https:') {
    protocol = 'https://'
  }
  // 测试环境判断（这里我们都是在本地开发环境）
  // if (urls.match(/h5.peralppay.com/) && urls.match(/h5.peralppay.com/)[0] === 'h5.peralppay.com') {
  //   baseUrl = protocol + 'h5.peralppay.com'
  // }
  if (urls.match(/m.1peso.com.mx/) && urls.match(/m.1peso.com.mx/)[0] === 'm.1peso.com.mx') {
    baseUrl = protocol + 'm.1peso.com.mx'
  }
  if (urls.match(/ezshop.com.mx/) && urls.match(/ezshop.com.mx/)[0] === 'ezshop.com.mx') {
    baseUrl = protocol + 'ezshop.com.mx'
  }
  // 开发环境判断
  if (type) {
    if (location.href.toLowerCase().match(/localhost:8088/)[0] === 'localhost:8088') {
      baseUrl = 'http://localhost:8088'
    }
  }
  return baseUrl
}
