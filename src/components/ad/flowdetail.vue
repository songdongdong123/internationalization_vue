<template>
  <div class="flowdetail" v-show="compentstate" >
    <div class="flowcontainer">
      <div class="imgtitle" @click.stop="hideThis">
        <span>Proceso de participación</span>
        <span class="icon-close"></span>
      </div>
      <img src="./img/flow.jpg" alt="">
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      compentstate: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hideThis () {
        this.$emit('hidecomponent')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .flowdetail
    position:fixed
    width:100%
    height:100%
    top:0
    left:0
    z-index:9000
    display:flex
    justify-content:center
    align-items:center
    background:rgba(0,0,0,.6)
    .flowcontainer
      height:80%
      margin:auto 0.32rem
      background:#fff
      overflow-y:auto
      border-radius:0.1rem
      .imgtitle
        display:flex
        justify-content:space-between
        align-items:center
        position:fixed
        height:1rem
        width:6.86rem
        background:#fff
        border-radius:0.1rem 0.1rem 0 0
        line-height:1rem
        box-sizing:border-box
        padding:0 0.2rem
        color:#333
        font-size:0.36rem
        .icon-close
          font-size:0.5rem
          color:#999
      img
        width:100%
        margin-top:1rem
</style>
