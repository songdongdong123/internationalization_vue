<template>
<transition name="fade">
  <div class="shared">
    shared
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
    background:#fff
    top:0
    left:0
    z-index:1005
</style>
