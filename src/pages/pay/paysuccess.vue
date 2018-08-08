<template>
  <div class="success">
    <div class="center">
      <p><span class="icon-pa_success"></span></p>
      <!-- 充值成功 -->
      <p class="successText">{{$t('payform.paysuccess')}}</p>
      <!--  份数 -->
      <p class="partNUms">{{money}}{{$t('beartAlert.gold')}}</p>
    </div>
    <div class="successBtn">
      <!-- 查看订单 -->
      <!-- <p class="checkBtn" >去夺宝</p> -->
      <!-- 完成 -->
      <p @click="toProDetail">{{$t('payform.accomplish')}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        part: '10',
        money: 0,
        score: '',
        issueNo: '',
        channelType: ''
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      this.money = this.$route.query.money
      this.score = this.$route.query.score
      this.issueNo = this.$route.query.issueNo
    },
    methods: {
      toProDetail () {
        let proIssueNo = JSON.parse(window.localStorage.getItem('proIssueNo'))
        localStorage.removeItem('proIssueNo')
        localStorage.removeItem('b536a272efe64829d0')
        if (proIssueNo) {
          if (Number(proIssueNo.activityType) === 4) {
            if (proIssueNo.falg) {
              this.$router.push({path: '/activityproduct/' + this.$i18n.locale, query: {issueNo: proIssueNo.issueNo, falg: proIssueNo.falg, channelType: this.channelType, channelTag: this.channelTag}})
            } else if (proIssueNo.tag) {
              this.$router.push({path: '/activityproduct/' + this.$i18n.locale, query: {issueNo: proIssueNo.issueNo, tag: proIssueNo.falg, channelType: this.channelType, channelTag: this.channelTag}})
            }
          } else {
            if (proIssueNo.falg) {
              this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: proIssueNo.issueNo, falg: proIssueNo.falg, channelType: this.channelType, channelTag: this.channelTag}})
            } else if (proIssueNo.tag) {
              this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: proIssueNo.issueNo, tag: proIssueNo.falg, channelType: this.channelType, channelTag: this.channelTag}})
            }
          }
        } else {
          this.$router.push({path: '/usercenter/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  .success
    .center
      position:absolute
      width:100%
      text-align:center
      font-size:0.4rem
      color:$color-meta
      top:3rem
      .icon-pa_success
        font-size:0.8rem
      .successText
        margin-top:0.5rem
        color:$color-general-font
      .partNUms
        font-size:0.3rem
        color:$color-issue-font
        margin-top:0.4rem
    .successBtn
      position:absolute
      width:100%
      bottom:2rem
      text-align:center
      font-size:0.35rem
      color:$color-meta
      display:flex
      justify-content: center
      p
        width:2.7rem
        height:0.8rem
        background:$color-meta
        line-height:0.8rem
        border-radius:0.1rem
        color:#fff
      .checkBtn
        margin-right:0.5rem
        border:1px solid $color-issue-font
        color:$color-issue-font
        background:#fff
</style>
