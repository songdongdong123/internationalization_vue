const reportChannelType = function (to, GA) {
  if (to.name === 'home' || to.name === 'paysuccess' || to.name === 'success' || to.name === 'pay') {
    let tag = ''
    switch (to.name) {
      case 'home':
        tag = '网站首页'
        break
      case 'paysuccess':
        tag = '信用卡充值成功页面'
        break
      case 'success':
        tag = '下单成功页面'
        break
      case 'pay':
        tag = '充值首页'
        break
      default:
        tag = '异常'
    }
    GA.event({
      eventCategory: '渠道',
      eventAction: tag,
      eventLabel: to.query.channelTag,
      eventValue: 0
    })
  }
}

export {
  reportChannelType
}
