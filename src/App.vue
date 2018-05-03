<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
import getBaseUrl from 'common/js/baseUrl'
export default {
  name: 'app',
  data () {
    return {
      baseurl: ''
    }
  },
  created () {
    this.baseurl = getBaseUrl()
  },
  mounted () {
    // const script1 = document.createElement('script')
    // script1.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'
    // script1.language = 'JavaScript'
    // document.body.appendChild(script1)
    // const script2 = document.createElement('script')
    // script2.src = 'https://openpay.s3.amazonaws.com/openpay.v1.min.js'
    // script2.language = 'JavaScript'
    // document.body.appendChild(script2)
    // const script3 = document.createElement('script')
    // script3.src = 'https://openpay.s3.amazonaws.com/openpay-data.v1.min.js'
    // script3.language = 'JavaScript'
    // document.body.appendChild(script3)
    const script = document.createElement('script')
    script.src = 'https://s22.cnzz.com/z_stat.php?id=1273556997&web_id=1273556997'
    script.language = 'JavaScript'
    document.body.appendChild(script)
  },
  watch: {
    '$route' () {
      if (window._czc) {
        var location = window.location
        var contenturl = location.pathname + location.hash
        // var refererurl = '/'
        window._czc.push(['_setAutoPageview', false])
        window._czc.push(['_trackPageview', `${contenturl}`, this.baseurl])
        // if (!location.search) {
        //   window._czc.push(['_trackPageview', contenturl, refererurl])
        // } else {
        //   window._czc.push(['_setAutoPageview', false])
        //   window._czc.push(['_trackPageview', 'this.$router.history.current.path', refererurl])
        // }
        // console.log(document.referrer)
      }
    }
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

<style>
  /* #app{
    height:100vh;
    overflow: hidden;
  } */
</style>
