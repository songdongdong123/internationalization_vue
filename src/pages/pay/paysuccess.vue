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
        issueNo: ''
      }
    },
    created () {
      this.money = this.$route.query.money
      this.score = this.$route.query.score
      this.issueNo = this.$route.query.issueNo
    },
    methods: {
      toProDetail () {
        this.$router.push({path: '/usercenter/' + this.$i18n.locale})
        // if (this.score) {
        //   this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: this.issueNo}})
        // } else {
        //   this.$router.push({path: '/usercenter/' + this.$i18n.locale})
        // }
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
