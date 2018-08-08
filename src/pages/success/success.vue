<template>
  <div class="success">
    <div class="center">
      <p><span class="icon-pa_success"></span></p>
      <!-- 参与成功 -->
      <p class="successText">{{$t('successPage.participateIn')}}</p>
      <!--  份数 -->
      <p class="partNUms">{{$t('successPage.part')}}：{{part}}</p>
    </div>
    <div class="flowlist">
      <p class="Calendario">Proceso de participación</p>
      <ul>
        <li>
          <p><span class="number number1">1</span><span class="text1">Participa en el Producto</span></p>
          <span class="lineleft"></span>
        </li>
        <li>
          <p><span class="number">2</span><span class="textbase">Finaliza el Sorteo</span></p>
          <span class="lineleft"></span>
        </li>
        <li>
          <p><span class="number">3</span><span class="textbase">Se publica al Ganador</span></p>
          <span class="lineleft"></span>
        </li>
        <li>
          <p><span class="number">4</span><span class="textbase">Se entrega el Premio</span></p>
        </li>
      </ul>
    </div>
    <div class="successBtn">
      <!-- 查看订单 -->
      <p class="checkBtn" @click="toRecordlist">Historial</p>
      <p @click="toProDetail">Continuar</p>
    </div>
    <!-- <div class="sharecontainer">
      <p class="FB" @click="shareToFb">FB</p>
    </div> -->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        part: '',
        channelType: '',
        channelTag: ''
      }
    },
    created () {
      // [this.channelType] = []
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      this.part = this.$route.query.part
    },
    methods: {
      toProDetail () {
        this.$router.back()
      },
      shareToFb () {
        window.FB.ui({
          method: 'share_open_graph',
          action_type: 'og.likes',
          action_properties: JSON.stringify({
            object: 'https://mdev.1peso.com.mx'
          })
          // href: 'https://1peso.mx'
        }, function (response) {
          console.log(response)
        })
      },
      toRecordlist () {
        this.$router.push({path: '/recordlist/' + this.$i18n.locale, query: {type: 2, channelType: this.channelType, channelTag: this.channelTag}})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  .success
    background:$color-bgcolor
    min-height:100vh
    position:fixed
    width:100%
    .center
      width:100%
      text-align:center
      font-size:0.4rem
      color:$color-meta
      background:#fff
      padding:0.5rem 0 0.5rem 0
      .icon-pa_success
        font-size:0.8rem
      .successText
        margin-top:0.5rem
        color:$color-general-font
      .partNUms
        font-size:0.3rem
        color:$color-issue-font
        margin-top:0.4rem
    .flowlist
      font-size:0.3rem
      background:#fff
      margin:auto 0.2rem
      margin-top:0.2rem
      padding:0.3rem
      .Calendario
        color:#999
      ul
        margin-top:0.3rem
        li
          p
            display:flex
            align-items:center
            margin-top:0.2rem
            .number
              display:inline-block
              width:0.4rem
              height:0.4rem
              background:#ccc
              border-radius:100%
              color:#fff
              text-align:center
              line-height:0.4rem
              margin-right:0.3rem
            .number1
              background:#ffcc33
            .text1
              color:#ffcc33
            .textbase
              color:#ccc
          .lineleft
            border-left:1px solid #ccc
            margin-left:0.2rem
      ul>li>p:not(:last-child)
        margin-bottom: 0.2rem
    .successBtn
      position:absolute
      width:100%
      // top:0.5rem
      bottom:2rem
      text-align:center
      font-size:0.35rem
      color:$color-meta
      display:flex
      justify-content: center
      p
        width:2.7rem
        height:0.8rem
        // border:1px solid $color-meta
        background:$color-meta
        line-height:0.8rem
        border-radius:0.1rem
        color:#fff
      .checkBtn
        margin-right:0.5rem
        border:1px solid $color-issue-font
        color:$color-issue-font
        background:#fff
    .sharecontainer
      position:absolute
      bottom:1rem
      width:100%
      font-size:0.35rem
      display:flex
      justify-content:center
      .FB
        margin:auto 0
        width:1rem
        height:1rem
        text-align:center
        line-height:1rem
        background:$color-meta
        color:#fff
        border-radius:100%
</style>
