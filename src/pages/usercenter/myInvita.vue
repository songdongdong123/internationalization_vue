<template>
  <div class="myInvita">
    <div class="Ayuda" v-show="Ayudastate">
      <div class="ayudacontain">
        <P class="Ayudatitle" @click="showAyudas">
          <span>Ayuda</span>
          <span class="icon-close"></span>
        </P>
        <ul class="Ayudalist">
          <li>
            <p class="Ayudalisttitle">1.Monto de regalo por tus invitados</p>
            <p class="Ayudalistcontent">Te regalamos 10 boletos por cada usuario que invites y se registre. El límite diario de regalo es 1000 boletos. Abonamos el monto de regalo diario a las 00:00 hrs del día siguiente .</p>
          </li>
          <li>
            <p class="Ayudalisttitle">2.Monto de recarga por tus invitados</p>
            <p class="Ayudalistcontent">Si los usuarios que invites realizan una recarga, obtienes el 2% del monto que recarguen.</p>
          </li>
          <li>
            <p class="Ayudalisttitle">3.¿Cómo usar el código de ?</p>
            <p class="Ayudalistcontent">Al momento del registro, asegúrate de que el usuario ingrese tu código de invitación para convertirse en tu invitado y que así obtengas tus boletos de regalo.</p>
          </li>
          <li>
            <p class="Ayudalisttitle">4.Revelación</p>
            <p class="Ayudalistcontent">Este evento busca retribuir a nuestros usuarios. Sin embargo, la compañía se reserva el derecho de finalizarlo en cualquier momento.</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="title">
      <div class="titlecontainer">
        <p class="left" @click="backToHome">
          <span class="icon-fanhui1"></span>
        </p>
        <p class="center">Mi código de invitación</p>
        <p class="right" @click="showAyudas">
          <span class="icon-bangzhu"></span>
        </p>
      </div>
    </div>
    <div class="container">
        <div class="invitcontainer">
          <p class="titleInvita">¡Invita a tus  amigos y recibe boletos en tu cuenta!</p>
          <p class="myinvicode">Mi código de invitación</p>
          <p class="codeNumber">{{Ayudamsg.myInviteCode}}</p>
          <button 
            v-clipboard:copy="Ayudamsg.myInviteCode"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >Copiar</button>
          <p class="centerline"></p>
          <div class="basecontainer">
            <div class="basecon">
              <p><span class="dot"></span>Número de invitados</p>
              <p class="number">{{Ayudamsg.inviteNum}} Personas</p>
            </div>
            <div class="basecon">
              <p><span class="dot"></span>Boletos obtenidos por registro</p>
              <p class="number">{{Ayudamsg.inviteRegPrize}} Boletos</p>
            </div>
            <div class="basecon">
              <p><span class="dot"></span>Boletos obtenidos por recarga de tus invitados </p>
              <p class="number">{{Ayudamsg.invitePayPrize}} Boletos</p>
            </div>
          </div>
        </div>
    </div>
    <!-- <bottomad></bottomad> -->
  </div>
</template>

<script>
  // import bottomad from '@/components/ad/ad'
  import { getMyInviteInfo } from 'api/home'
  export default {
    data () {
      return {
        Ayudastate: false,
        Ayudamsg: {}
      }
    },
    created () {
      this._getMyInviteInfo()
    },
    methods: {
      onCopy: function (e) {
        this.$toast({
          message: 'Copiar el éxito',
          duration: 1000
        })
      },
      onError: function (e) {
        this.$toast({
          message: 'Copia fallida',
          duration: 1000
        })
      },
      _getMyInviteInfo () {
        // 获取邀请码信息
        this.$loading({state: true})
        getMyInviteInfo({}).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.Ayudamsg = res.data.data
            this.$loading({state: false})
          }
        })
      },
      showAyudas () {
        this.Ayudastate = !this.Ayudastate
      },
      backToHome () {
        // 返回首页
        this.$router.back()
        // this.$router.push({path: '/home/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  // import { addClass } from '@/common/js/native'
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/mixin"
  .myInvita
    height:100vh
    background: $color-bgcolor
    color:$color-general-font
    position:absolute
    width:100%
    min-height:100vh
    .Ayuda
      position:fixed
      width:100%
      height:100%
      background:rgba(0,0,0,0.5)
      z-index:1000
      top:0
      left:0
      display:flex
      justify-content:center
      align-items:center
      .ayudacontain
        background:#fff
        width:6.2rem
        border-radius:0.1rem
        overflow: hidden
        .Ayudatitle
          padding:0 0.2rem
          font-size:0.3rem
          display:flex
          justify-content:space-between
          align-items:center
          height:0.9rem
          line-height:0.9rem
          border-bottom:1px solid #ccc
          font-size:0.35rem
          .icon-close
            font-size:0.4rem
        .Ayudalist
          padding:0.3rem 0.2rem
          li
            .Ayudalistcontent
              font-size:0.24rem
              margin-left:0.2rem
              margin-top:0.1rem
              margin-bottom:0.2rem
              color:#999
              line-height:0.3rem
            .Ayudalisttitle
              font-weight: bold
              font-size:0.24rem
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
        .right
          position:absolute
          right:0
          font-size:0
          padding:0 0.25rem 0 0.3rem
          font-size:0.45rem
          color:$color-meta
    .container
      margin-top:1.3rem
      min-height:9rem
      .invitcontainer
        border-radius:0.1rem
        font-size:0.3rem
        text-align:center
        color:#ff9900
        bg-image('./img/bg')
        height:7.3rem
        height:7.8rem
        background-size:7.3rem 7.8rem
        background-position: center
        background-repeat:no-repeat
      .titleInvita
        padding-top:0.5rem
        margin:auto 0.5rem
        line-height:0.4rem
      .myinvicode
        margin-top:0.4rem
        font-size:0.24rem
        color:#999
      .codeNumber
        font-size:0.8rem
        margin:0.2rem auto
      button
        background:$color-meta
        border:0
        color:#fff
        border-radius:0.8rem
        width:1.6rem
        height:0.6rem
      .centerline
        margin:auto 0.8rem
        border-bottom:2px dashed #ff9900
        margin-top:0.4rem
        position:relative
        span
          display:inline-block
          width:0.6rem
          height:0.6rem
          position:absolute
          background:$color-bgcolor
          border-radius:100%
          top:-0.3rem
          // opacity:0.5
          box-shadow:0px 1px 12px #999
        .left
          left:-0.7rem
        .right
          right:-0.7rem
      .basecontainer
        margin:auto 0.5rem
        margin-top:0.6rem
        font-size:0.2rem
        .basecon
          display:flex
          justify-content:space-between
          align-items:center
          height:0.7rem
          color:#000
          .number
            color:#ff9900
          p
            display:flex
            align-items:center
            .dot
              display:inline-block
              width:0.1rem
              height:0.1rem
              border-radius:100%
              background:#ff9900
              margin-right:0.1rem
</style>

