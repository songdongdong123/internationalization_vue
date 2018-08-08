<template>
  <div class="activity">
    <div class="title" v-show="state">
      <p @click="toBack"><span class="icon-fanhui1"></span></p>
    </div>
    <div class="img">
    </div>
    <div class="container" v-if="!state">
      <div class="basereg registro" @click="toInterim">
      <p>Registro de inmediato</p>
      </div>
      <div class="basereg primero" @click="toHome">
        <p>Primero mira</p>
      </div>
    </div>
    <activityad class="activityad" :class="{'marginclass': state}"></activityad>
  </div>
</template>

<script>
  import activityad from '@/components/ad/activityad'
  import { getCookie } from '@/common/js/common'
  export default {
    data () {
      return {
        state: true
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      let cookie = getCookie('lkey')
      if (cookie) {
        this.state = true
      } else {
        this.state = false
      }
      this.reportThis()
    },
    components: {
      activityad
    },
    methods: {
      toBack () {
        this.$router.replace({path: '/home/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      reportThis () {
        // 上报活动页面
        this.$ga.event({
          eventCategory: '渠道',
          eventAction: '活动落地页访问总数',
          // 上报充值自定义金额
          eventLabel: `渠道:${this.channelTag ? this.channelTag : '6_7_0_0'}`,
          eventValue: 0
        })
      },
      toHome () {
        this.$ga.event({
          eventCategory: '渠道',
          eventAction: '活动落地页返回首页',
          // 上报充值自定义金额
          eventLabel: `渠道:${this.channelTag ? this.channelTag : '6_7_0_0'}`,
          eventValue: 0
        })
        this.$router.replace({path: '/home/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      toInterim () {
        this.$ga.event({
          eventCategory: '渠道',
          eventAction: '活动落地页前往注册',
          // 上报充值自定义金额
          eventLabel: `渠道:${this.channelTag ? this.channelTag : '6_7_0_0'}`,
          eventValue: 0
        })
        this.$router.replace({path: '/newsignin/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag, activity: 'activity'}})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .activity
    position:absolute
    width:100%
    min-height:100vh
    background:#ff9900
    .title
      position:fixed
      width:100%
      height:0.9rem
      p
        height:0.9rem
        width:1rem
        position: relative
      span
        color:#fff
        font-size:0.5rem
        position:absolute
        top:50%
        transform:translateY(-50%)
        left: 0.1rem
    .img
      background-image:url('./activity.png')
      width:100%
      height:12.04rem
      background-size:7.5rem 12.04rem
      background-position:center center
      background-repeat: no-repeat
    .container
      // position:absolute
      // width:100%
      margin-top:-2.5rem
      .basereg
        height 0.9rem
        font-size:0.3rem
        border-radius:0.1rem
        line-height:0.9rem
        text-align:center
        margin:auto 0.32rem
        z-index:100
      .registro
        background:#fff
      .primero
        border:1px solid #fff
        margin-top:0.3rem
        margin-bottom:1.2rem
        color:#fff
    .activityad
      margin-top:-0.9rem
    .marginclass
      margin-top:-2.3rem
</style>

