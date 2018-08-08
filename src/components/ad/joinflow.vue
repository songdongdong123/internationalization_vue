<template>
  <div class="joinflows">
    <p class="joinflowstitle">
      <span>Proceso de participación</span>
      <span class="icon-bangzhu" @click="showcomponent"></span>
    </p>
    <ul class="flowslist">
      <li class="flowsitem">
        <p class="icon_container">
          <span class="iconbase icon_1"></span>
          <span class="arrowbase arrow_yellow"></span>
        </p>
        <p class="icon_text text1">Participa en el Producto</p>
      </li>
      <li class="flowsitem">
        <p class="icon_container">
          <span class="iconbase icon_2"></span>
          <span class="arrowbase arrow_yellow"></span>
        </p>
        <p class="icon_text text2">Finaliza el Sorteo</p>
      </li>
      <li class="flowsitem">
        <p class="icon_container">
          <span class="iconbase icon_3"></span>
          <span class="arrowbase arrow_yellow"></span>
        </p>
        <p class="icon_text">Se publica al Ganador</p>
      </li>
      <li class="flowsitem">
        <p class="icon_container">
          <span class="iconbase icon_4"></span>
        </p>
        <p class="icon_text">Se entrega el Premio</p>
      </li>
    </ul>
    <flowdetail
      @hidecomponent="hidecomponent"
      :compentstate="compentstate"
    ></flowdetail>
  </div>
</template>

<script>
  import flowdetail from './flowdetail'
  export default {
    data () {
      return {
        compentstate: false
      }
    },
    methods: {
      showcomponent () {
        this.compentstate = true
      },
      hidecomponent () {
        this.compentstate = false
      }
    },
    components: {
      flowdetail
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .joinflows
    .joinflowstitle
      display:flex
      justify-content:space-between
      align-items:center
      font-size:0.3rem
      margin-left:0.2rem
      color:#666666
      .icon-bangzhu
        font-size:0.45rem
    .flowslist
      margin-top:0.3rem
      display:flex
      justify-content:space-between
      .flowsitem
        width:25%
        text-align:center
        .icon_container
          position: relative
          .iconbase
            margin:auto 0
            display:inline-block
            width:0.39rem
            height:0.52rem
            background-size:0.39rem 0.52rem
            background-position: center
            background-repeat:no-repeat
          .icon_1
            bg-image('./img/g')
          .icon_2
            bg-image('./img/3')
          .icon_3
            bg-image('./img/e')
            width:0.51rem
            height:0.51rem
            background-size:0.51rem 0.51rem
          .icon_4
            bg-image('./img/b')
            margin-top:0.05rem
            width:0.60rem
            height:0.42rem
            background-size:0.60rem 0.42rem
          .arrowbase
            display:inline-block
            position:absolute
            width:0.57rem
            height:0.21rem
            background-position:center
            background-repeat:no-repeat
            background-size:0.57rem 0.21rem
            top:50%
            transform:translateY(-50%)
            right:-0.285rem
          .arrow_yellow
            bg-image('./img/k')
        .icon_text
          margin-top:0.2rem
          font-size:0.24rem
          color:#666666
        .text2
          width:110%
        .text1
          width:90%
</style>

