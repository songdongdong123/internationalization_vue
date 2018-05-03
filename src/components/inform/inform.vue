<template>
<transition name="fade">
  <div class="inform">
    <div class="imgbox">
      <img src="" alt="">
      <span class="close" @click="closeInform">关闭</span>
    </div>
    <div class="message">
      <p>Congratulations!</p>
    </div>
    <div class="issuemsg">
      <p>1元夺宝恭喜您获得</p>
      <p>第000001期</p>
    </div>
    <div class="prizename">
      <p>IphoneX 128gb</p>
    </div>
    <div class="examine">
      <p>查看</p>
    </div>
  </div>
</transition>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {}
    },
    methods: {
      closeInform () {
        this.setPrizeState(false)
      },
      ...mapMutations({
        setPrizeState: 'SET_PRIZE_STATE'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .inform
    position:fixed
    width:100%
    height:100%
    background:rgba(0,0,0,.7)
    top:0
    left:0
    z-index:1005
    .imgbox
      width:6rem
      height:3rem
      background:hotpink
      margin:0 auto
      margin-top:2.5rem
      position:relative
      img
        width:100%
        height:100%
      .close
        position:absolute
        font-size:0.3rem
        color:#fff
        right:-0.6rem
        top:-0.9rem
        display:inline-block
        padding:0.3rem
    .message
      height:1.3rem
      background:#666
      color:#fff
      font-size:0.7rem
      text-align:center
      line-height:1.3rem
      margin-top:0.6rem
    .issuemsg
      text-align:center
      font-size:0.3rem
      color:#f0f0f0
      margin-top:0.5rem
      line-height:0.5rem
    .prizename
      text-align:center
      font-size:0.5rem
      color:#f0f0f0
      margin-top:0.5rem
    .examine
      width:2.5rem
      height:0.8rem
      border:1px solid #fff
      font-size:0.4rem
      line-height:0.8rem
      text-align:center
      margin:0 auto
      border-radius:0.1rem
      color:#fff
      margin-top:1rem
</style>
