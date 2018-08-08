<template>
  <div class="errorplugins" v-if="state">
    <div class="errorcontainer">
      <p class="unline">{{I18n.t('networkState.breakNetWork')}}....</p>
      <p class="reload" @click="reloadpage">{{I18n.t('networkState.reload')}}</p>
    </div>
  </div>
</template>

<script>
  import i18n from '../../language'
  export default {
    data () {
      return {
        state: false,
        I18n: i18n
      }
    },
    methods: {
      reloadpage () {
        location.reload()
        this.state = false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .errorplugins
    position:fixed
    width:100%
    height:100%
    background:#fff
    z-index:2000
    display:flex
    justify-content:center
    align-items:center
    top:0
    .errorcontainer
      text-align:center
      .unline
        margin: 0 auto
        font-size:0.24rem
        line-height:0.5rem
        width:70%
      .reload
        font-size:0.3rem
        color:#2057c7
        margin-top:0.1rem
        height:0.9rem
        line-height:0.9rem
</style>

