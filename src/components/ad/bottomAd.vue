<template>
  <div class="newad" id="newad">
    <swipe class="bottomswipecontainer" :data="bannerlist">
      <div class="bottomswipe" v-for="list in bannerlist" @click="toActivity(list)">
        <img :src="list.homeImg" alt="" @click="toActivity(list)">
      </div>
    </swipe>
  </div>
</template>

<script>
  import swipe from '../scroll/swipe'
  import { getFistRollPic } from 'api/home'
  export default {
    data () {
      return {
        bannerlist: []
      }
    },
    created () {
      this._getFistRollPic()
    },
    methods: {
      toActivity (list) {
        // 前往注册页面 首页banner进入活动落地页
        let articId = ''
        // 不同的活动跳转至不同的活动落地页
        if (list.homeAddress) {
          let routeString = list.homeAddress.split('?')
          let reg = new RegExp('(^|&)' + 'id' + '=([^&]*)(&|$)', 'i')
          let targteRouter = routeString[0]
          // 获取文章id
          if (routeString[1]) {
            let r = routeString[1].match(reg)
            articId = unescape(r[2])
          }
          if (this.$ga) {
            this.$ga.event({
              eventCategory: '首页底部活动统计',
              eventAction: list.homeName,
              // 上报充值自定义金额
              eventLabel: list.homeAddress,
              eventValue: 0
            })
          }
          this.$router.push({path: `/${targteRouter}/` + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag, id: articId}})
        }
      },
      _getFistRollPic () {
        getFistRollPic({
          type: 2
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.bannerlist = res.data.data
            this.$loading({
              state: false
            })
          }
        })
      }
    },
    components: {
      swipe
    }
  }
</script>

<style lang="stylus" scoped>
  .newad
    margin-bottom:0.2rem
    width:100%
    position:relative
    height:1.8rem
    overflow: hidden
    img
      width:7.5rem
      height:100%
</style>

