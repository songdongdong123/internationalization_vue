// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './language'
import fastclick from 'fastclick'
import VueAnalytics from 'vue-analytics'
import VueGtm from 'vue-gtm'
import MintUI from 'mint-ui'
import { Upload } from 'element-ui'
import util from '@/common/js/util'
import store from './store'
import 'mint-ui/lib/style.css'
import 'common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'
import './Plugins/loading/loading.css'
import { Loading, Message } from './Plugins/index'
import { queryWinningMsg } from 'api/free'
import { loginState } from '@/common/js/android'
import { reportChannelType } from '@/common/js/googlereport'
import * as filters from './common/js/filter'
import VueClipboard from 'vue-clipboard2'
// import SocialSharing  from 'vue-social-sharing'
// Vue.use(SocialSharing)
Vue.use(VueClipboard)
Vue.use(MintUI)
Vue.use(Upload)
Vue.use(util)
Vue.use(Loading)
Vue.use(Message)
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.jpg')
})

Vue.use(i18n)

Vue.use(VueGtm, {
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: false, // Whether or not display console logs debugs (optional)
  vueRouter: router // Pass the router instance to automatically sync with router (optional)
})

fastclick.attach(document.body)

Vue.config.productionTip = false

// 引入过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// GA初始化
if (process.env.GA) {
  Vue.use(VueAnalytics, {
    id: process.env.GA, // 从配置中读取
    disableScriptLoader: true, // 必须在html中完成初始化，这里显式禁止去下载ga脚本
    router, // 确保路由切换时可以自动统计
    autoTracking: {
      pageviewOnLoad: false // 当通过网址进来时已经GA在初始化时就发起一次pageview的统计，这里不要重复统计
    }
  })
}

router.beforeEach((to, from, next) => {
  // 判断app的登录态
  if (to.meta.title) {
    // to.query.channelTag = 1
    document.title = to.meta.title
  }
  // 对渠道部分来源进行单独上报
  if (Vue.$ga) {
    reportChannelType(to, Vue.$ga)
  }
  // checkAppLoginState()
  if (to.name === 'homes' || to.name === 'usercenter' || to.name === 'goodslist' || to.name === 'freeproduct' || to.name === 'productdetail') {
    queryWinningMsg({
      nologin: 'no'
    }).then(res => {
      let prize = res.data.data
      if (prize.goodsName) {
        Message({
          state: true,
          checkOut: i18n.t('message.checkout'),
          prizeTitle: i18n.t('message.messageTitle'),
          issueNo: prize.orderNo,
          prizeName: prize.goodsName,
          router: router
        })
      }
      if (prize.num) {
        window.localStorage.setItem('Nums', prize.num)
      } else {
        window.localStorage.setItem('Nums', 0)
      }
      if (res.data.data.nologin) {
        localStorage.removeItem('Nums')
      }
    })
  }
  if (to.name === 'usercenter') {
    // 校验登录态
    loginState({router: router, i18n: i18n, next: next, to: to})
  }
  next()
  // checkPageScore(to, next) 检测页面来源 2018-6-6废弃
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
