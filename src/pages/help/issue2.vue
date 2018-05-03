<template>
  <div class="issue2">
    <div class="title">
      <span @click="backTo" class="left icon-fanhui1"></span>
      <!-- 帮助 -->
      <p>{{$t('question.helpTitle')}}</p>
    </div>
    <div class="content">
      <div class="issue_title">
        <!-- 夺宝规则 -->
      <p>{{$t('question.snatchRule')}}</p>
      </div>
      <scroll
        class="scrollWrapp"
        :listenScroll="true"
      >
        <div class="issueContent">
          <p v-for="(list, index) in answerList">{{list}}</p>
        </div>
      </scroll>
    </div>
    <div class="bottom">
      <!-- 客服邮箱 -->
      <p>{{$t('question.customerServiceEm')}}：servicio@1peso.com.mx</p>
    </div>
  </div>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  export default {
    data () {
      return {
        answerList: this.$t('question.answer1')
      }
    },
    methods: {
      backTo () {
        this.$router.back()
      }
    },
    components: {
      scroll
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .issue2
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
      padding:0.91rem 0.32rem 0 0.32rem
      background:#fff
      font-size:0.3rem
      .issue_title
        height:1rem
        line-height:1rem
        background:#fff
        position: absolute
        width:100%
        z-index:1000
        p
          font-weight:bold
      .scrollWrapp
        height:10.5rem
        background:#fff
        margin-top:1rem
        .issueContent
          line-height:0.6rem
          font-size:0.24rem
          padding-bottom:0.1rem
          color:$color-six-font
        .issueContent p:not(:last-child)
          margin-bottom:0.3rem
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

