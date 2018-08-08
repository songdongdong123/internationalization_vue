<template>
  <div class="issue1">
    <div class="title">
      <span @click="backTo" class="left icon-fanhui1"></span>
      <!-- 帮助 -->
      <p>{{$t('question.helpTitle')}}</p>
    </div>
    <div class="content">
      <div class="issue_title">
        <!-- 什么是一元夺宝 -->
        <p>{{$t('question.whatThis')}}?</p>
      </div>
      <div class="issueContent">
        <p>
          {{$t('question.answer')}}
        </p>
      </div>
    </div>
    <div class="bottom">
      <!-- 客服邮箱 -->
      <p>{{$t('question.customerServiceEm')}}：soporte@1peso.com.mx</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        textList: this.$t('helpList')
      }
    },
    methods: {
      backTo () {
        this.$router.back()
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .issue1
    position:fixed
    width:100%
    height:100%
    background:$color-bgcolor
    color:$color-general-font
    .title
      font-size:$font-meta
      height:$meta-height
      padding: 0 0.32rem 0 0.32rem
      display:flex
      justify-content:space-between
      align-items:center
      position:fixed
      width:6.86rem
      background:$color-white
      color: $color-general-font
      z-index:100
      border-bottom:1px solid $color-border
      .left
        position:absolute
        padding:0.25rem 0.3rem 0.25rem 0.25rem
        left:0
        font-size:0.4rem
        color:$color-meta
      p
        text-align:center
        width:100%
    .content
      padding:0.9rem 0.32rem 0 0.32rem
      background:#fff
      font-size:0.3rem
      .issue_title
        height:1rem
        line-height:1rem
        p
          font-weight:bold
      .issueContent
        line-height:0.6rem
        font-size:0.24rem
        padding-bottom:0.1rem
        color:$color-six-font
    .bottom
      position:absolute
      font-size:0.24rem
      text-align:center
      width:100%
      color:$color-weaken-font
      background:$color-bgcolor
      height:1rem
      line-height:1rem
      bottom:0
</style>

