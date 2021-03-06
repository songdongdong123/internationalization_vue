export default {
  meta: {
    index: '首页',
    userCenter: '用户中心',
    recordList: '夺宝记录',
    help: '帮助',
    signIn: '注册',
    loGin: '登录',
    forGet: '忘记密码',
    proDetail: '商品详情',
    previous: '往期投注',
    prodectImg: '图文详情',
    formula: '计算详情',
    userrecord: '中奖记录',
    payrecord: '充值记录',
    useraddress: '收货地址',
    mySnatchuserAddresso: '你的夺宝号',
    success: '购买成功',
    addresslist: '地址列表',
    submitaddress: '确认收货地址',
    winner: '获奖者',
    winnershow: '晒单',
    freeproduct: '活动商品',
    newUser: '创建账户',
    mySnatchno: '我的夺宝号码',
    rlus: '使用条款'
  },
  helpList: ['什么是一元夺宝', '夺宝规则', '如何领奖'],
  toast: {
    noproduct: '商品不存在',
    signInToast: '请输入正确的邮箱',
    prodectImgToast: '暂无图文详情',
    addresslistToast: '设置成功',
    confirm_receipt: '已确认收货',
    delete_success: '删除成功'
  },
  winnershowe: {
    meta: '晒单分享',
    share: '晒单',
    toast: '只显示最近50条记录'
  },
  newhome: {
    meta: '一元夺宝',
    freeSnatch: '免费夺宝',
    winner: '获奖者',
    involvedIn: '已参与',
    takeUp: '已抢完',
    navBarList: [
      {name: '所有商品', icon: 'icon-quanbu'},
      {name: '热抢商品', icon: 'icon-08'},
      {name: '精品优选', icon: 'icon-dianzan'},
      {name: '帮助', icon: 'icon-wenhao'}
    ],
    totalOpened: '累计派送',
    todayLeft: '今日剩余',
    FreeParticipation: '马上抢',
    Recommend: '推荐商品',
    sharelist: '晒单分享',
    nextIssueTime: '开始时间',
    tomorrow: '明天',
    currentProgress: '查看进度',
    snatchEnd: '夺宝结束',
    beginTime: '开抢时间',
    amount: '总份数',
    surplus: '剩余份数',
    backToTop: '回到顶部',
    moreProduct: '更多商品',
    full_commission: '满员后抽取一名获奖者',
    salesnum: '已售商品数量'
  },
  free: {
    freeBtn: '免费参与一份',
    freeSuccess: {
      toase: '参与成功',
      finish: '完成'
    }
  },
  home: {
    overall: '总',
    remain: '剩'
  },
  loading: {
    loadingText: '正在加载'
  },
  previous: {
    returnText: '商品详情',
    issueNo: '期号',
    luckyMan: '获奖者',
    Fortuna: '幸运号码',
    nodata: '暂无记录',
    meta: '往期揭晓',
    HasAnnounced: '已揭晓'
  },
  product: {
    auxiliary: '第',
    issue: '期',
    overall: '总',
    remain: '剩',
    luckyMan: '获奖者',
    issueNo: '期号',
    Fortuna: '幸运号码',
    Calculation: '计算详情',
    participation: '您共参与',
    // part: '份',
    participationNum: '参与号码',
    immediate: '立即参与',
    mySnatch: '你的夺宝号',
    imageText: '图文详情',
    participator: '所有参与记录',
    ToPhaseOut: '往期揭晓',
    allRecord: '所有参与记录',
    nodata: '暂无记录',
    numtoast: '参与份数/总数',
    stateText: ['进行中', '已揭晓', '即将揭晓', '已取消'],
    returnText: ['首页', '夺宝记录', '往期揭晓'],
    participations: '参与人数',
    prizeRecord: '你的获奖记录',
    reload: '刷新',
    help: '帮助',
    The_Egmont_Group: '您已参与了该期活动每期活动仅限参与1次',
    newIssue: '新的一期正在进行',
    Immediately_to: '立即前往',
    freeParticipations: '免费参与夺宝'
  },
  prodectImg: {
    backText: '商品详情',
    prodectImgText: '图文详情'
  },
  formula: {
    metaText: '商品详情',
    formulaDetail: '计算详情',
    countFormula: '计算公式',
    countFormulaDetail: '(数值A÷商品总份数)取余数+1',
    valueV: '数值A',
    explain: '截止该商品开奖时间点前最后50条参与时间之和',
    countResult: '计算结果',
    The_last_article_50: '最后50条参与记录',
    remainder: '取余'
  },
  question: {
    helpTitle: '帮助',
    guessYourQu: '猜你想问',
    customerServiceEm: '客服邮箱',
    whatThis: '什么是一元夺宝',
    snatchRule: '夺宝规则',
    howToGet: '如何领奖',
    answer: '平台将商品平分成若干等份，参与者可以使用金币参与1份或多份，当等份全部售完后，由系统根据平台规则计算出最终获得该商品的幸运者。',
    answer1: [
      '1）商品标价M份，则由M个可用于商品夺宝的参与号码，参与者购买后，系统将参与号码随机分配给参与者。参与者消耗1金币，即可参与该商品的1份，并获得1个参与号码。',
      '2）商品最后1个号码参与完毕后，将公示该商品的最后50条参与记录时间',
      '3）系统自动将最后50条参与记录时间按照时、分、秒、毫秒组合（如19：23：54.124则是192354124），相加得到数值A',
      '4）数值A除以商品总需参与份数得到的余数+1即为最终幸运号码，拥有该幸运号码的参与者将直接获得该商品。'
    ],
    answer2: [
      '1）获得商品后，您会收到手机推送通知。',
      '2）若您获得实物类商品，您需要进入菜单→中奖记录页面填写、确认收货地址。确认完毕后，我们会尽快给您安排快递配送。',
      '3）若您获得虚拟类商品（如平台夺宝金币），系统会立即将金币自动派送至您的账户中'
    ]
  },
  submitaddress: {
    prizeRecord: '中奖记录',
    confirmReceipt: '确认收货地址',
    modification: '修改',
    actionAddress: '提交地址',
    addDeliveryAddress: '添加地址',
    submitSuccessfully: '提交成功'
  },
  submitbox: {
    no: '否',
    yes: '是',
    title: ['确认收货？', '确认删除？']
  },
  addresslist: {
    addressManage: '地址管理',
    streetInformation: '街道信息',
    localZone: '本地区域',
    city: '城市',
    province: '省/州/区',
    phoneNum: '手机号码',
    ManageAddress: '管理收货地址',
    compile: '编辑',
    delete: '删除',
    createNewAddress: '新建地址',
    startUse: '启用',
    backText: ['个人中心', '确认收货地址']
  },
  recordTab: ['全部', '进行中', '已揭晓'],
  recordState: ['进行中', '已揭晓', '已取消'],
  recordList: {
    issueNo: '期号',
    copies: '份数',
    part: '份',
    mySnatch: '你的夺宝号',
    luckyMan: '获奖者',
    Fortuna: '幸运号码',
    outoftime: '揭晓时间',
    cancelthetime: '取消时间',
    nodata: '暂无记录',
    snatchTime: '夺宝时间',
    recordListText: '夺宝记录'
  },
  snatchno: {
    productLabel: '商品',
    mySnatch: '你的夺宝号',
    issueNo: '期号',
    participation: '参与了',
    participationNum: '参与份数',
    part: '份数',
    explain: '以下是您的所有夺宝号码',
    prodetail: '商品详情',
    snatchRecord: '夺宝记录',
    amount: '总数'
  },
  payrecord: {
    usercenter: '个人中心',
    payrecord: '充值记录',
    orderNo: '充值金币',
    gold: '金币',
    nodata: '暂无记录'
  },
  userCenter: {
    meta: '菜单',
    gold: '金币',
    payText: '充值',
    snatchRecord: '夺宝记录',
    prizeRecord: '获奖记录',
    payRecord: '充值记录',
    hello: '你好',
    ipam: '地址管理',
    myshare: '我的晒单'
  },
  successPage: {
    participateIn: '已参与',
    accomplish: '完成',
    part: '份数',
    checkOrder: '查看订单'
  },
  userRecord: {
    meta: '个人中心',
    issueNum: '期号',
    winners: '获奖者',
    luckNum: '幸运号码',
    shareImg: '晒单',
    backText: ['个人中心', '地址管理'],
    prizeRecord: '获奖记录',
    partakeIssue: '参与期号',
    Fortuna: '幸运号码',
    submitText: '确认收货',
    ConfirmReceiptAddress: '确认收货地址',
    nodata: '暂无记录',
    winnerTime: '获奖时间',
    proStateText: ['待录入地址', '等待发货', '派送中', '已收货', '地址错误', '测试']
  },
  beartAlert: {
    placeholder: '请输入金币数量',
    meta: '输入份数',
    unit: '1金币/份',
    errorMsg: '请输入正确的份数',
    share: '份',
    residue: '剩余份数',
    myAccount: '我的金币',
    confirm: '确定参与',
    gold: '金币',
    buyOff: '包尾',
    loadingText: '订单处理中，请稍后'
  },
  userAddress: {
    meta: '收货地址',
    name: '姓名',
    address: '地址',
    ipam: '地址管理',
    phone: '电话',
    submit: '提交',
    post: '邮编',
    province: '省/州',
    city: '城市',
    locality: '本地区域',
    reference: '参考（非必填）',
    placeholders: ['姓名', '街道信息', '电话', '邮编', '请输入省/州', '补充描述(选填)'],
    submitText: '提交',
    backText: ['个人中心', '地址管理'],
    verifyPostCode: '验证邮编',
    verifyPostCodeToast: '验证邮编',
    more: '更多',
    plesWrEma: '请输入邮箱',
    postcodeErrormsg: '该邮编地址不支持配送，请更换邮编或联系客服'
  },
  navigator: {
    index: '返回首页',
    shopmall: '个人中心',
    record: '夺宝记录',
    help: '帮助'
  },
  navBar: [{ name: '所有商品' }, { name: '热抢商品' }, { name: '精品优选' }],
  productContent: {
    participants: '已参与人数',
    residue: '剩余人数'
  },
  signin: {
    cancel: '取消',
    meta: '欢迎',
    auchcode_text: '点击获取验证码',
    forgetpassword: '忘记密码？',
    nextstep: '注册',
    again: '重新获取',
    mailBox: '邮箱',
    password: '密码',
    signinsuccess: '注册成功'
  },
  forgotpassword: {
    meta: '一元夺宝-重置密码',
    phone_text: '请输入您的手机号',
    authcode_text: '请输入手机短信中的验证码',
    again: '重新获取',
    getauth_text: '点击获取验证码',
    new_code: '请输入4个字符或以上的新密码',
    repeat_new_code: '请再次输入新密码',
    reset: '重置密码'
  },
  login: {
    cancel: '取消',
    sigin: '注册',
    meta: '欢迎',
    username_text: '邮箱',
    password_text: '密码',
    login_text: '登录',
    forget_pass: '忘记密码？',
    show: '显示',
    sendToast: '输入您的电子邮件，我们将向您发送恢复密码的说明。',
    emailToast: '注意查看您的垃圾邮件.',
    send: '提交',
    sendsuccess: '请查看您的邮件，完成重置密码操作',
    emailErr: '请输入正确的邮箱',
    signinsuccess: '您已完成一元夺宝注册'
  },
  userconter: {
    gold: '夺宝金币',
    top_up: ' 充值',
    prize_record: '中奖记录',
    money_record: '资金记录',
    user_info: '个人信息',
    address: '配送地址'
  },
  shareorder: {
    textareaText: '商品符合您的期待吗？说说使用心得，分享给其他小伙伴吧',
    shareOrderMsg: '晒单成功',
    checkShareOrder: '查看晒单记录',
    shareImg: '晒单',
    publish: '发布',
    addImg: '添加图片',
    sharetoast: '请输入晒单评价',
    imgToast: '请添加图片'
  },
  message: {
    messageTitle: '一元夺宝恭喜您获得',
    checkout: '查看'
  },
  payform: {
    payNums: '金币数量',
    inputgoldNums: '输入金币数量',
    payrlues: '1比索=1金币，最低充值50比索',
    payGold: '金币充值',
    choosenum: '选择数量',
    payway: '支付方式',
    choosepayway: '选择支付方式',
    visaorbankcard: '信用卡或借记卡',
    paywaylist: [{
      id: 2,
      name: '信用卡',
      way: 'Visa、Maste、American express'
    }, {
      id: 3,
      name: '借记卡',
      way: 'Banamex、Santander、HSBC...'
    }, {
      id: 4,
      name: '便利店',
      way: '7-Eleven、K、Extra、Kiosko、One...'
    }, {
      id: 5,
      name: '银行转账',
      way: 'BBVA'
    }],
    pago: '付款',
    cardnum: '卡号',
    cardnam: '姓名',
    dateM: '到期月份',
    dateY: '到期年份',
    cvv: '三位CVV码',
    dispose: '订单处理中，请稍后',
    payNow: '支付中',
    paysuccess: '支付成功',
    accomplish: '完成',
    payErr: '支付失败',
    retry: '重试',
    network: '网络异常',
    checkoutOrder: '请检查充值记录和银行卡账单，如有疑问请联系我们',
    networktimeout: '网络中断，请检查您的网络设置',
    pleasechooseone: '请选择一种支付方式',
    bankcard: '银行卡支付',
    cardToastNum: '请输入16或15位银行卡号',
    formToast: '请检查信息是否填写完整',
    cvvToast: '请输入三位CVV码',
    nameToast: '请输入姓名',
    payText: '支付',
    shortofGold: '金币不足',
    account: '账户余额',
    payBtnText: '充值金币',
    disposePage: '订单处理',
    paycustom: '自定义充值金额',
    userNotice: ['每件商品均有一名幸运者可以获得.购买份数越多，获奖概率就越大，但仍有不中奖的风险。请谨慎购买。', '金币购买后不可提现。', '金币主要用于参与夺宝。', '如有疑问请发邮件给我们。'],
    noticeTitle: '充值须知'
  },
  newLogin: {
    creatAccount: '创建邮箱账户',
    tologin: '登录'
  },
  newsigin: {
    createaccount: '创建账号',
    email: 'Email',
    names: '名字',
    surname: '姓',
    password: '6-20位密码',
    create: '注册',
    emailErr: '邮箱格式错误',
    passerr: '密码长度不足或超出范围'
  },
  supplement: {
    rlusMeta: '使用条款',
    rlusAcepto: '我已阅读并同意网站'
  },
  networkState: {
    breakNetWork: '网络中断，请检查您的网络设置...',
    reload: '刷新'
  }
}
