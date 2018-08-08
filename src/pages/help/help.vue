<template>
  <div class="help">
    <div class="title">
      <span @click="backTo" class="left icon-fanhui1"></span>
      <!-- 帮助 -->
      <p>{{$t('question.helpTitle')}}</p>
    </div>
    <div class="content">
      <!-- 猜你想问 -->
      <div class="issue_title">{{$t('question.guessYourQu')}}</div>
      <ul class="list">
        <li class="item" v-for="(list, index) in textList" @click="toIssuePage(index)">
          <p>{{list}}</p>
        </li>
      </ul>
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
      },
      toIssuePage (index) {
        // 前往具体问题页面
        switch (index) {
          case 0:
            this.$router.push({path: '/issue1/' + this.$i18n.locale})
            break
          case 1:
            this.$router.push({path: '/issue2/' + this.$i18n.locale})
            break
          case 2:
            this.$router.push({path: '/issue3/' + this.$i18n.locale})
            break
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .help
    position:fixed
    width:100%
    height:100%
    background:$color-bgcolor
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
      padding-top:0.9rem
      background:#fff
      font-size:0.24rem
      .issue_title
        padding:0 0.32rem 0 0.32rem
        height:0.9rem
        line-height:0.9rem
        font-size:0.3rem
        font-weight: bold
        border-bottom: 1px solid $color-border
      .list
        padding:0 0.32rem 0 0.32rem
        .item
          height:0.9rem
          line-height:0.9rem
      .list li:not(:last-child)
        border-bottom: 1px solid $color-border
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

