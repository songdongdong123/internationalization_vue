import * as axios from '../common/js/axios.js'
// 登录
const loginIn = params => axios.post('/index.php/account/login', params)
// 登录前的校验
const getLoginSecret = params => axios.post('/index.php/account/getLoginSecret', params)
// 注册
const regUser = params => axios.post('/index.php/account/regUser', params)
// 退出登录
const logOut = params => axios.post('/index.php/account/logout', params)

// 登录
const unionLogin = params => axios.post('/index.php/account/unionLogin', params)

// push推送设备注册接口
const recordDeviceInfo = params => axios.post('/index.php/msg/recordDeviceInfo', params)

// 邮箱发送激活链接
const sendLinkToEmail = params => axios.post('/index.php/account/sendLinkToEmail', params)

// 邮箱发送激活重置密码
const changePasswordByEmail = params => axios.post('/index.php/account/changePasswordByEmail', params)
export {
  loginIn,
  getLoginSecret,
  regUser,
  logOut,
  unionLogin,
  recordDeviceInfo,
  sendLinkToEmail,
  changePasswordByEmail
}
