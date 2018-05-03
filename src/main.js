// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './language'
import fastclick from 'fastclick'
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
import { loginState, checkAppLoginState, checkPageScore } from '@/common/js/android'

Vue.use(MintUI)
Vue.use(Upload)
Vue.use(util)
Vue.use(Loading)
Vue.use(Message)
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.jpg')
})

Vue.use(i18n)

fastclick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 判断app的登录态
  if (to.meta.title) {
    document.title = to.meta.title
  }
  checkAppLoginState()
  if (to.name !== 'userrecord' && to.name !== 'submitaddress' && to.name !== 'addresslist' && to.name !== 'useraddress' && to.name !== 'paysuccess' && to.name !== 'success') {
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
    })
  } else {
    console.log('mmp')
  }
  if (to.name === 'usercenter') {
    // 校验登录态
    loginState({router: router, i18n: i18n, next: next})
  }
  checkPageScore(to, next)
})
// router.afterEach(function (to) {
//   if (window.ga) {
//     window.ga('set', 'page', to.fullPath)
//     window.ga('send', 'pageview')
//   }
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
