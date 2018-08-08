<template>
<transition name="fade">
  <div class="cellect" v-if="clectstate">
    <div class="Guardar">
      <div class="guardarcontainer">
        <div class="title" @click="closeThis">
          <p>Guardar</p>
          <span class="icon-close"></span>
        </div>
        <div class="list">
          <p>1. La entrada directa de 1peso.mx</p>
          <p>2.Con un navegador de la colección de nombres de dominio, facilitar la próxima visita.</p>
        </div>
        <div class="cloase" @click="closeThis">
          <p>Sé</p>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>


<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters([
        'clectstate'
      ])
    },
    methods: {
      closeThis () {
        this.setcelectstate(false)
      },
      ...mapMutations({
        setcelectstate: 'SET_CLECT_STATE'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  .cellect
    position:fixed
    background:rgba(0,0,0,.6)
    width:100%
    height:100%
    display:flex
    justify-content:center
    align-items:center
    z-index:1900
    top:0
    left:0
    .Guardar
      width:80%
      height:4rem
      background:#fff
      border-radius:0.1rem
      position:relative
      .guardarcontainer
        .title
          height:0.9rem
          font-size:0.4rem
          line-height:0.9rem
          font-weight: bold
          text-align:center
          border-bottom:1px solid #ccc
          position:relative
          .icon-close
            font-size:0.45rem
            font-weight bold
            position:absolute
            top:0.05rem
            right:0.2rem
            position:absolute
            top:50%
            transform:translateY(-50%)
            right:0.2rem
        .list
          font-size:0.24rem
          margin:auto 0.3rem
          margin-top:0.3rem
          p
            line-height:0.3rem
            margin-bottom:0.2rem
        .cloase
          text-align:center
          color:#ff2700
          font-size:0.35rem
          position:absolute
          bottom:0rem
          width:100%
          height:1.5rem
          line-height:1.5rem
</style>
