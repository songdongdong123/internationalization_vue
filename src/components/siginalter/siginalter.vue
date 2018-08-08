<template>
  <div class="siginalter" v-if="state" @click="hidethis">
    <div class="close">
      <span class="icon-close"></span>
    </div>
    <div class="img">
      <img src="./img/c.png" alt="">
    </div>
    <div class="slogan">
      <p class="addgold">Boleto <span class="addone">+1</span></p>
      <p class="base top">Vamos a participarlo</p>
      <p class="base">¡El próximo ganador puede ser usted! </p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      state: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    methods: {
      hidethis () {
        this.$emit('hideSingnAlter')
      }
    }
  }
</script>

<style>
    @keyframes myfirst
    {
      0% {
        transform: translateY(-10rem);
      }
      25% {
        transform: translateY(0.5rem);
      }
      50% {
        transform: translateY(-0.5rem);
      }
      75% {
        transform: translateY(0rem);
      }
      80% {
        transform: translateY(-0.3rem);
      }
      90% {
        transform: translateY(-0rem);
      }
      95% {
        transform: translateY(-0.1rem);
      }
      100% {
        transform: translateY(0rem);
      }
    }
    @keyframes myfirsts
    {
      0% {
        transform: scale(0.5);
      }
      100% {
        transform: scale(1.2);
      }
    }
</style>


<style lang="stylus" scoped>
  .siginalter
    position:fixed
    width:100%
    height:100vh
    background:rgba(0,0,0,.8)
    z-index:2000
    .close
      position: relative
      margin-top:2rem
      .icon-close
        color:#fff
        position:absolute
        right:0.5rem
        font-size:0.6rem
    .img
      padding-top:2rem
      text-align:center
      transition:all .5s
      img
        animation: myfirst .5s
        width:.99rem
        height:1.27rem
    .slogan
      color:yellow
      text-align:center
      font-size:0.4rem
      margin-top:0.5rem
      .base
        font-size:0.3rem
        line-height:0.4rem
      .top
        margin-top:0.5rem
      .addgold
        .addone
          animation: myfirsts .5s
</style>

