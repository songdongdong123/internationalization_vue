<template>
<transition name="fade">
  <div class="bigimg" v-show="state" @click.capture="hideThis($event)">
    <div class="swipe">
      <mt-swipe :auto="0" :showIndicators="false" @change="handleChange">
        <mt-swipe-item v-for="(list, index) in piclist" :key="index">
          <div class="imgbox">
            <img class="showimg" :src="list" alt="">
          </div>
        </mt-swipe-item>
      </mt-swipe>
      <p class="nums" v-if="piclist">{{ind}}/{{piclist.length}}</p>
    </div>
  </div>
</transition>
</template>

<script>
  export default {
    props: {
      state: {
        type: Boolean,
        default: false
      },
      piclist: {
        type: Array,
        default: null
      }
    },
    data () {
      return {
        ind: 1
      }
    },
    // watch: {
    //   state: {
    //     if (oldV, newV) {
    //       console.log(oldV, newV)
    //     }
    //   }
    // },
    methods: {
      handleChange (index) {
        this.ind = index + 1
      },
      hideThis (e) {
        this.$emit('hideBigImg')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .bigimg
    position:fixed
    height:100%
    width:100%
    top:0
    background:#000
    z-index:1000
    display:flex
    align-items:center
    .swipe
      height:11rem
      width:100%
      position:absolute
      .imgbox
        display:flex
        align-items:center
        width:100%
        height:100%
        .showimg
          width:100%
          border:0
      .nums
        color:#fff
        text-align:center
        margin-top:0.5rem
        font-size:0.3rem
        z-index:1001
</style>
