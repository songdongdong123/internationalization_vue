<template>
  <div class="success">
    <div class="center">
      <p><span class="icon-pa_success"></span></p>
      <!-- 参与成功 -->
      <p class="successText">{{$t('successPage.participateIn')}}</p>
      <!--  份数 -->
      <p class="partNUms">{{$t('successPage.part')}}：{{part}}</p>
    </div>
    <div class="successBtn">
      <!-- 查看订单 -->
      <p class="checkBtn" @click="toRecordlist">{{$t('successPage.checkOrder')}}</p>
      <p @click="toProDetail">{{$t('successPage.accomplish')}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        part: ''
      }
    },
    created () {
      this.part = this.$route.query.part
    },
    methods: {
      toProDetail () {
        this.$router.back()
      },
      toRecordlist () {
        this.$router.push({path: '/recordlist/' + this.$i18n.locale, query: {type: 2}})
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
        // border:1px solid $color-meta
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
