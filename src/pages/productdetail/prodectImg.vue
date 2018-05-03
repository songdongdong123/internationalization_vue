<template>
  <div class="prodectImg">
    <div class="title">
      <span @click="backUserCenter" class="left icon-fanhui1"></span>
      <p>{{$t('prodectImg.prodectImgText')}}</p>
    </div>
    <div class="container">
      <div
        class="content">
        <div class="imgcontainer">
          <img v-for="list in imglist"  v-lazy="list" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getGoodsPicDetails } from 'api/usercenter'
  import scroll from '@/components/scroll/scroll'
  export default {
    data () {
      return {
        imglist: []
      }
    },
    created () {
      this._getGoodsPicDetails(Number(this.$route.query.goodsId))
    },
    methods: {
      backUserCenter () {
        this.$router.back()
      },
      _getGoodsPicDetails (goodsId) {
        getGoodsPicDetails({
          goodsId: goodsId
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.imglist = res.data.data.imageList
            if (!this.imglist.length) {
              this.$toast({
                message: this.$t('toast.prodectImgToast'),
                duration: 1000
              })
            }
          }
        })
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
  .prodectImg
    background:$color-bgcolor
    min-height:100vh
    position:absolute
    width:100%
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
      z-index:1001
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
    .container
      padding-top:0.9rem
      padding-bottom:1rem
      .content
        .imgcontainer
          font-size:0
          img
            width:100%
            // height:4rem
</style>

