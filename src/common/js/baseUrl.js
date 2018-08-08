export default function getBaseUrl (type) {
  let [baseUrl, protocol] = ['https://mdev.1peso.com.mx', 'http://']
  // 判断协议
  if (location.protocol === 'https:') {
    protocol = 'https://'
  }
  if (location.hostname !== 'localhost') {
    baseUrl = protocol + location.hostname
  }
  return baseUrl
}
