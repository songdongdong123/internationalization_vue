<template>
  <div class="ad" id="ad">
    <div class="adcomtainer">
      <mt-swipe :auto="4000">
        <mt-swipe-item class="bg1" v-for="(list, index) in activityList" :key="index">
          <p>这是第{{index}}张活动照片</p>
          <p>{{list.goodsName}}</p>
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
</template>

<script>
  import { getFreeJoinList } from 'api/free'
  export default {
    data () {
      return {
        a: '',
        activityList: []
      }
    },
    created () {
      this._getFreeJoinList()
    },
    methods: {
      _getFreeJoinList () {
        // 获取活动列表
        // this.$loading('open')
        getFreeJoinList({}).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.activityList = res.data.data.activityList
            console.log('数据更新了')
            // this.$loading('close')
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .ad
    margin-bottom:0.2rem
    .adcomtainer
      height:2.5rem
      .mint-swipe
        background:pink
        .mint-swipe-items-wrap
          .bg1
            background:#fff333
            line-height:0.5rem
            text-align: center
            p
              font-size:0.5rem
</style>

