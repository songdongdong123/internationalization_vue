<template>
  <div class="game">
    <img src="./game.png" alt="">
    <ad></ad>
  </div>
</template>

<script>
  import ad from '@/components/ad/ad'
  export default {
    data () {
      return {}
    },
    components: {
      ad
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  .game
    background:$color-bgcolor
    padding-bottom:1rem
    width:100%
    position:absolute
    min-height:100%
    img
      width:100%
</style>

