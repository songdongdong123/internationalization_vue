import Vue from 'vue'
import Router from 'vue-router'
// import { getQueryString } from '@/common/js/common'
import i18n from './../language'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: `/`,
      name: 'indexs',
      component: (resolve) => {
        require(['@/pages/index/index'], resolve)
      },
      redirect: `/home/${i18n.locale}`,
      meta: {
        // 首页
        title: i18n.t('meta.index'),
        lang: i18n.locale
      },
      children: [
        {
          path: `/home/${i18n.locale}`,
          name: 'home',
          component: (resolve) => {
            require(['@/pages/home/newhome'], resolve)
          },
          meta: {
            // 首页
            title: i18n.t('meta.index'),
            lang: i18n.locale
          }
        },
        { // 07-06商品主页
          path: '/productdetail/:lang',
          name: 'productdetail',
          component: (resolve) => {
            require(['@/pages/productdetail/newproductdetail/productdetail'], resolve)
          },
          meta: {
            // 商品详情 proDetail
            title: i18n.t('meta.proDetail')
          }
        },
        {
          path: '/goodslist/:lang',
          name: 'goodslist',
          component: (resolve) => {
            require(['@/pages/goodslist/goodslist'], resolve)
          },
          meta: {
            // 首页
            title: i18n.t('meta.index')
          }
        },
        {
          path: '/article/:lang',
          name: 'article',
          component: (resolve) => {
            require(['@/pages/article/article'], resolve)
          },
          meta: {
            // 首页
            title: i18n.t('meta.index')
          }
        },
        {
          path: '/activitylist/:lang',
          name: 'activitylist',
          component: (resolve) => {
            require(['@/pages/activity/activitylist'], resolve)
          },
          meta: {
            // 首页
            title: i18n.t('meta.index')
          }
        },
        {
          path: '/game/:lang',
          name: 'game',
          component: (resolve) => {
            require(['@/pages/game/game'], resolve)
          },
          meta: {
            // 首页
            title: i18n.t('meta.index')
          }
        },
        {
          path: '/winner/:lang',
          name: 'winner',
          component: (resolve) => {
            require(['@/pages/winner/winner'], resolve)
          },
          meta: {
            // 查看获奖者
            title: i18n.t('meta.winner')
          }
        }
      ]
    },
    {
      path: '/myInvita/:lang',
      name: 'myInvita',
      component: (resolve) => {
        require(['@/pages/usercenter/myInvita'], resolve)
      },
      meta: {
        // 首页
        title: i18n.t('meta.index')
      }
    },
    {
      path: '/interim/:lang',
      name: 'interim',
      component: (resolve) => {
        require(['@/pages/login/interim'], resolve)
      },
      meta: {
        // 创建账户
        title: i18n.t('meta.newUser')
      }
    },
    {
      path: '/userlus/:lang',
      name: 'userlus',
      component: (resolve) => {
        require(['@/pages/login/userlus'], resolve)
      },
      meta: {
        // 使用条款
        title: i18n.t('meta.rlus')
      }
    },
    {
      path: '/protocol/:lang',
      name: 'protocol',
      component: (resolve) => {
        require(['@/pages/login/protocol'], resolve)
      },
      meta: {
        // 使用条款
        title: 'Conócenos'
      }
    },
    {
      path: '/usercenter/:lang',
      name: 'usercenter',
      component: (resolve) => {
        require(['@/pages/usercenter/usercenter'], resolve)
      },
      meta: {
        // 用户中心
        title: i18n.t('meta.userCenter')
      }
    },
    {
      path: '/pay/:lang',
      name: 'pay',
      component: (resolve) => {
        require(['@/pages/pay/pay'], resolve)
      },
      meta: {
        // 选择支付金额
        title: i18n.t('payform.choosenum')
      }
    },
    {
      path: '/payres/:lang',
      name: 'payres',
      component: (resolve) => {
        require(['@/pages/pay/payres'], resolve)
      },
      meta: {
        // 银行转账生成的订单页面
        title: 'Orden de recarga'
      }
    },
    {
      path: '/payway/:lang',
      name: 'payway',
      component: (resolve) => {
        require(['@/pages/pay/payway'], resolve)
      },
      meta: {
        // 选择支付方式
        title: i18n.t('payform.payway')
      }
    },
    {
      path: '/shoppay/:lang',
      name: 'shoppay',
      component: (resolve) => {
        require(['@/pages/pay/shoppay'], resolve)
      },
      meta: {
        // 便利店支付
        title: i18n.t('payform.payway')
      }
    },
    {
      path: '/oxxopay/:lang',
      name: 'oxxopay',
      component: (resolve) => {
        require(['@/pages/pay/oxxopay'], resolve)
      },
      meta: {
        // oxxp支付
        title: i18n.t('payform.payway')
      }
    },
    {
      path: '/toditopay/:lang',
      name: 'toditopay',
      component: (resolve) => {
        require(['@/pages/pay/toditopay'], resolve)
      },
      meta: {
        // oxxp支付
        title: i18n.t('payform.payway')
      }
    },
    {
      path: '/paysuccess/:lang',
      name: 'paysuccess',
      component: (resolve) => {
        require(['@/pages/pay/paysuccess'], resolve)
      },
      meta: {
        // 充值成功页面
        title: i18n.t('payform.paysuccess')
      }
    },
    {
      path: '/payform/:lang',
      name: 'payform',
      component: (resolve) => {
        require(['@/pages/pay/payform'], resolve)
      },
      meta: {
        // 充值表单页面
        title: i18n.t('payform.bankcard')
      }
    },
    {
      path: '/paytransfer/:lang',
      name: 'paytransfer',
      component: (resolve) => {
        require(['@/pages/pay/paytransfer'], resolve)
      },
      meta: {
        // 充值等待
        title: i18n.t('payform.disposePage')
      }
    },
    {
      path: '/payerr/:lang',
      name: 'payerr',
      component: (resolve) => {
        require(['@/pages/pay/payerr'], resolve)
      },
      meta: {
        // 充值失败
        title: i18n.t('payform.payErr')
      }
    },
    {
      path: '/paytimeout/:lang',
      name: 'paytimeout',
      component: (resolve) => {
        require(['@/pages/pay/paytimeout'], resolve)
      },
      meta: {
        // 充值异常
        title: i18n.t('payform.network')
      }
    },
    {
      path: '/recordlist/:lang',
      name: 'recordlist',
      component: (resolve) => {
        require(['@/pages/recordlist/recordlist'], resolve)
      },
      meta: {
        // 夺宝记录
        title: i18n.t('meta.recordList')
      }
    },
    {
      path: '/help/:lang',
      name: 'help',
      component: (resolve) => {
        require(['@/pages/help/help'], resolve)
      },
      meta: {
        // 帮助
        title: i18n.t('meta.help')
      }
    },
    {
      path: '/issue1/:lang',
      name: 'issue1',
      component: (resolve) => {
        require(['@/pages/help/issue1'], resolve)
      },
      meta: {
        // 帮助
        title: i18n.t('meta.help')
      }
    },
    {
      path: '/issue2/:lang',
      name: 'issue2',
      component: (resolve) => {
        require(['@/pages/help/issue2'], resolve)
      },
      meta: {
        // 帮助
        title: i18n.t('meta.help')
      }
    },
    {
      path: '/issue3/:lang',
      name: 'issue3',
      component: (resolve) => {
        require(['@/pages/help/issue3'], resolve)
      },
      meta: {
        // 帮助
        title: i18n.t('meta.help')
      }
    },
    {
      path: '/winnershow/:lang',
      name: 'winnershow',
      component: (resolve) => {
        require(['@/pages/winner/winnershow'], resolve)
      },
      meta: {
        // 玩家晒单
        title: i18n.t('meta.winnershow')
      }
    },
    {
      path: '/shareorder/:lang',
      name: 'shareorder',
      component: (resolve) => {
        require(['@/pages/shareorder/shareorder'], resolve)
      },
      meta: {
        // 玩家晒单
        title: i18n.t('meta.winnershow')
      }
    },
    {
      path: '/freeproduct/:lang',
      name: 'freeproduct',
      component: (resolve) => {
        require(['@/pages/productdetail/freeproduct'], resolve)
      },
      falg: 3,
      meta: {
        // 活动商品详情投注页
        title: i18n.t('meta.winnershow')
      }
    },
    {
      path: '/participator/:lang',
      name: 'participator',
      component: (resolve) => {
        require(['@/pages/participator/participator'], resolve)
      },
      meta: {
        // 参与者页面
        title: i18n.t('meta.winnershow')
      }
    },
    {
      path: '/newsignin/:lang',
      name: 'newsignin',
      component: (resolve) => {
        require(['@/pages/signin/newsignin'], resolve)
      },
      meta: {
        // 新的注册页面
        title: i18n.t('meta.signIn')
      }
    },
    {
      path: '/newforgot/:lang',
      name: 'newforgot',
      component: (resolve) => {
        require(['@/pages/forgotpassword/newforgot'], resolve)
      },
      meta: {
        // 忘记密码(新版)
        title: i18n.t('meta.forGet')
      }
    },
    {
      path: '/newlogin/:lang',
      name: 'newlogin',
      component: (resolve) => {
        require(['@/pages/login/newlogin'], resolve)
      },
      meta: {
        // 登录 loGin
        title: i18n.t('meta.loGin')
      }
    },
    // { // 老版本商品详情
    //   path: '/productdetail/:lang',
    //   name: 'productdetail',
    //   component: (resolve) => {
    //     require(['@/pages/productdetail/productdetail'], resolve)
    //   },
    //   falg: 3,
    //   meta: {
    //     // 商品详情 proDetail
    //     title: i18n.t('meta.proDetail')
    //   }
    // },
    // { // 老版本活动商品详情
    //   path: '/activityproduct/:lang',
    //   name: 'activityproduct',
    //   component: (resolve) => {
    //     require(['@/pages/productdetail/activityproduct'], resolve)
    //   },
    //   falg: 3,
    //   meta: {
    //     // 商品详情 proDetail
    //     title: i18n.t('meta.proDetail')
    //   }
    // },
    { // 07-06活动商品主页
      path: '/activityproduct/:lang',
      name: 'activityproduct',
      component: (resolve) => {
        require(['@/pages/productdetail/newproductdetail/activityproduct'], resolve)
      },
      falg: 3,
      meta: {
        // 商品详情 proDetail
        title: i18n.t('meta.proDetail')
      }
    },
    {
      path: '/previous/:lang',
      name: 'previous',
      component: (resolve) => {
        require(['@/pages/productdetail/previous'], resolve)
      },
      meta: {
        // 往期投注 previous
        title: i18n.t('meta.previous')
      }
    },
    {
      path: '/prodectImg/:lang',
      name: 'prodectImg',
      component: (resolve) => {
        require(['@/pages/productdetail/prodectImg'], resolve)
      },
      meta: {
        // 图文详情 prodectImg
        title: i18n.t('meta.prodectImg')
      }
    },
    {
      path: '/formula/:lang',
      name: 'formula',
      component: (resolve) => {
        require(['@/pages/productdetail/formula'], resolve)
      },
      meta: {
        // 计算详情 formula
        title: i18n.t('meta.formula')
      }
    },
    {
      path: '/userrecord/:lang',
      name: 'userrecord',
      component: (resolve) => {
        require(['@/pages/usercenter/userrecord'], resolve)
      },
      falg: 3,
      meta: {
        // 中奖记录 userrecord
        title: i18n.t('meta.userrecord')
      }
    },
    {
      path: '/payrecord/:lang',
      name: 'payrecord',
      component: (resolve) => {
        require(['@/pages/usercenter/payrecord'], resolve)
      },
      meta: {
        // 充值记录 payrecord
        title: i18n.t('meta.payrecord')
      }
    },
    {
      path: '/useraddress/:lang',
      name: 'useraddress',
      component: (resolve) => {
        require(['@/pages/usercenter/useraddress'], resolve)
      },
      meta: {
        // 收货地址 useraddress
        title: i18n.t('meta.useraddress')
      }
    },
    {
      path: '/snatchno/:lang',
      name: 'snatchno',
      component: (resolve) => {
        require(['@/pages/usercenter/snatchno'], resolve)
      },
      meta: {
        // 我的夺宝号 mySnatchno
        title: i18n.t('meta.mySnatchno')
      }
    },
    {
      path: '/success/:lang',
      name: 'success',
      component: (resolve) => {
        require(['@/pages/success/success'], resolve)
      },
      meta: {
        // 购买成功 success
        title: i18n.t('meta.success')
      }
    },
    {
      path: '/addresslist/:lang',
      name: 'addresslist',
      component: (resolve) => {
        require(['@/pages/address/addresslist'], resolve)
      },
      meta: {
        // 地址列表 addresslist
        title: i18n.t('meta.addresslist')
      }
    },
    {
      path: '/submitaddress/:lang',
      name: 'submitaddress',
      component: (resolve) => {
        require(['@/pages/address/submitaddress'], resolve)
      },
      meta: {
        // 确认收货地址 submitaddress
        title: i18n.t('meta.submitaddress')
      }
    },
    {
      path: '/course/:lang',
      name: 'course',
      component: (resolve) => {
        require(['@/pages/course/course'], resolve)
      },
      meta: {
        // 确认收货地址 submitaddress
        title: 'Guardar'
      }
    },
    // 活动路由
    {
      path: '/activity/:lang',
      name: 'activity',
      component: (resolve) => {
        require(['@/pages/activity/activity'], resolve)
      },
      meta: {
        // 确认收货地址 submitaddress
        title: 'Guardar'
      }
    }
  ]
})
