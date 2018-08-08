<template>
  <div id="app">
      <transition name="out-in">
        <router-view/>
      </transition>
  </div>
</template>

<script>
import getBaseUrl from 'common/js/baseUrl'
export default {
  name: 'app',
  data () {
    return {
      baseurl: '',
      silderstate: false,
      isAndroid: false
    }
  },
  created () {
    this.baseurl = getBaseUrl()
  },
  methods: {
    chooseLanguage (lang) {
      if (this.$route.params.lang !== lang) {
        this.$i18n.locale = lang
        let newPath = this.$route.path.substring(0, -2) + lang
        this.$router.replace(newPath)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "common/stylus/colorreset"
  .fade-enter-active, .fade-leave-active {
    opacity: 1;
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
<style>
  /* #app{
    overflow: hidden;
  } */
</style>

