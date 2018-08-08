<template>
  <div class="activitylist">
    <ul class="list">
      <li v-for="list in activitylist" @click="toActivity(list)">
        <img v-lazy="list.actImg" alt="">
      </li>
    </ul>
    <bottomad></bottomad>
  </div>
</template>

<script>
  import { getActivityList } from 'api/home'
  import bottomad from '@/components/ad/ad'
  export default {
    data () {
      return {
        activitylist: []
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      this._getActivityList()
    },
    methods: {
      toActivity (list) {
        // 前往注册页面 首页banner进入活动落地页
        let articId = ''
        // 不同的活动跳转至不同的活动落地页
        if (list.actUrl) {
          let routeString = list.actUrl.split('?')
          let reg = new RegExp('(^|&)' + 'id' + '=([^&]*)(&|$)', 'i')
          let targteRouter = routeString[0]
          // 获取文章id
          if (routeString[1]) {
            let r = routeString[1].match(reg)
            articId = unescape(r[2])
          }
          this.$router.push({path: `/${targteRouter}/` + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag, id: articId}})
        }
      },
      _getActivityList () {
        getActivityList({}).then(res => {
          this.activitylist = res.data.data.list
        })
      }
    },
    components: {
      bottomad
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  .activitylist
    background:$color-bgcolor
    padding-bottom:1rem
    width:100%
    position:absolute
    min-height:100vh
    .list
      min-height:9rem
      li
        height:1.8rem
        margin-top:0.3rem
        img
          width:100%
          height:100%
</style>

