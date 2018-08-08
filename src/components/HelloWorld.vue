<template>
  <div class="hello">
    HelloWorld
    {{$t('navigator.index')}}
    <span class="icon-iconfontbijiben1"></span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      test: false,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    this.$i18n.locale = this.$route.params.lang === 'zh' ? 'zh' : 'en'
  },
  computed: {
    lang () {
      return '/' + this.$i18n.locale
    }
  },
  methods: {
    changeClass () {
      this.test = !this.test
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
    // @import '../common/stylus/index.styl'
    .icon-iconfontbijiben1
      display:inline-block
      width:0.5rem
      height:0.6rem
      font-size:0.5rem
      color:red
</style>
