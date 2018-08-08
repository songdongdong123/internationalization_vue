<template>
  <div class="article">
    <div class="title">
      <div class="titlecontainer">
        <p class="left" @click="backToHome">
          <span class="icon-fanhui1"></span>
        </p>
        <p class="center">{{essayName}}</p>
      </div>
    </div>
    <div class="htmlcontent" v-html="essayContent"></div>
    <div class="nothing" v-show="nothingstate">
      <p>404</p>
    </div>
    <bottomad></bottomad>
  </div>
</template>

<script>
  import { getArticleInfo } from 'api/home'
  import { Base64 } from 'js-base64'
  import bottomad from '@/components/ad/ad'
  export default {
    data () {
      return {
        essayContent: '',
        essayName: '',
        nothingstate: false
      }
    },
    created () {
      this._getArticleInfo()
      scrollTo(0, 0)
    },
    methods: {
      backToHome () {
        this.$router.back()
      },
      _getArticleInfo () {
        getArticleInfo({
          articleId: this.$route.query.id
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            if (res.data.data.essayContent) {
              this.essayContent = decodeURIComponent(Base64.decode(res.data.data.essayContent))
              this.essayName = res.data.data.essayName
              if (this.essayContent) {
                this.nothingstate = false
              } else {
                this.nothingstate = true
              }
            }
          }
        })
      }
    },
    components: {
      bottomad
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .article
    font-size:0.3rem
    background:$color-bgcolor
    min-height:100vh
    .title
      font-size:$font-meta
      height:$meta-height
      line-height:$meta-height
      position:fixed
      width:100%
      background:$color-white
      color: $color-general-font
      z-index:100
      border-bottom:1px solid $color-border
      .titlecontainer
        display:flex
        align-items:center
        margin:auto 0.32rem
        .left
          position:absolute
          left:0
          font-size:0
          padding:0 0.3rem 0 0.25rem
          font-size:0.4rem
          color:$color-meta
        .center
          width:100%
          text-align:center
          overflow: hidden
          text-overflow:ellipsis
          white-space: nowrap
        .right
          position:absolute
          right:0
          font-size:0
          padding:0 0.25rem 0 0.3rem
          font-size:0.45rem
          color:$color-meta
    .htmlcontent
      padding:1.2rem 0 0.3rem 0
      margin:auto 0.2rem
      min-height:9rem
    .nothing
      height:8rem
      background:#f2f2f2
      display:flex
      justify-content:center
      align-items:center
      font-size:1.2rem
      color:$color-meta
</style>

