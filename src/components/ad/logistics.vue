<template>
  <div class="ad" id="ad">
    <div class="adcomtainer">
      <div class="top">
        <div class="item">
          <div class="itemcontainer">
            <div class="iconcontainer">
              <span class="icon1"></span>
            </div>
            <p class="text">Garantía de Bienes</p>
          </div>
        </div>
        <div class="item">
          <div class="itemcontainer">
            <div class="iconcontainer">
              <span class="icon2"></span>
            </div>
            <p class="text">Recibe tu Premio de 5 a 10 días</p>
          </div>
        </div>
        <div class="item">
          <div class="itemcontainer">
            <div class="iconcontainer">
              <span class="icon3"></span>
            </div>
            <p class="text">Envío Gratis</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .ad
    margin-bottom:0.2rem
    .adcomtainer
      // margin:auto 0.2rem
      .top
        background:#fff
        display:flex
        align-items:center
        justify-content:center
        border-radius:0.1rem
        margin:auto 0.2rem
        padding:0.3rem 0
        .item
          padding:0.2rem 0
          width:2.5rem
          height:1.5rem
          box-sizing: border-box
          display:flex
          align-items:center
          justify-content:space-around
          .itemcontainer
            position: relative
            height:1.5rem
            width:2rem
            span
              display:block
              text-align:center
              margin:0 auto
              position:absolute
              top:0
              left:50%
              transform:translateX(-50%)
              height:0.6rem
              background-position:center center
              background-repeat: no-repeat
            .text
              font-size:0.24rem
              color:#666
              height:.5rem
              margin:0 auto
              line-height:0.3rem
              position:absolute
              text-align:center
              bottom:0
              width:100%
            .icon1
              width:0.42rem
              height:0.52rem
              bg-image('img/a')
              background-size: 0.42rem 0.52rem
            .icon2
              width:0.6rem
              height:0.42rem
              bg-image('img/b')
              background-size: 0.6rem 0.42rem
              top:0.1rem
            .icon3
              width:0.53rem
              height:0.64rem
              bg-image('img/c')
              background-size: 0.53rem 0.64rem
      .top>div:not(:last-child)
        border-right:1px solid #f3f3f3
      .footer
        // height:4rem
        background:#fff
        margin:auto 0.2rem
        margin-top:0.2rem
        padding:0.3rem 0
        border-radius:0.1rem
        .footer_top
          p
            font-size:0.35rem
            color:#333
            text-align:center
            padding-top:0.4rem
          .logocontainer
            margin:0.3rem 0.2rem
            // margin-top:0.4rem
            display:flex
            justify-content:space-between
            div
              position: relative
              font-size:0
              height:1rem
              width:2rem
              img
                position:absolute
                left:50%
                transform:translateX(-50%)
              .img1
                width:1.18rem
                height:0.33rem
                top:0
              .img2
                width:1.68rem
                height:0.27rem
                bottom:0
              .img3
                width:1.5rem
                height:0.34rem
                top:0
              .img4
                width:1.45rem
                height:0.47rem
                bottom:-0.05rem
              .img5
                width:1.12rem
                height:0.5rem
                top:-0.05rem
              .img6
                width:1.58rem
                height:0.33rem
                bottom:0
          .service
            font-size:0.24rem
            padding:0
            // margin-top:0.3rem
            color:#999
            text-align:left
            margin-left:0.6rem
          .company
            font-size:0.24rem
            color:#999
            padding:0
            margin-top:0.2rem
            text-align:left
            margin-left:0.6rem
</style>

