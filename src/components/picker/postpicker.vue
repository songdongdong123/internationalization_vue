<template>
<transition name="slide">
  <div class="pickers">
    <div class="title">
      <p @click="closeAddress">取消</p>
      <p @click="submitAddress">确定</p>
    </div>
    <scroll
      :listenScroll="pickerState"
      
      class="list"
    >
      <ul>
        <li
          @click="chooseList(list)"
          v-for="list in area">{{list}}</li>
      </ul>
    </scroll>
    <!-- <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> -->
  </div>
</transition>
</template>

<script>
  // import areaData from '../../../static/format.json'
  import scroll from '@/components/scroll/scroll'
  export default {
    props: {
      pickerState: {
        type: Boolean,
        default: false
      },
      area: {
        type: Array,
        default: [4, 5, 6, 7, 8]
      }
    },
    data () {
      return {
        test: [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9]
      }
    },
    watch: {
      pickerState (oldV, newV) {
        // if (oldV) {
        //   this.slots.values = this.area
        // }
      }
    },
    methods: {
      closeAddress () {
        // 取消地址选择
        this.$emit('hidePicker')
      },
      submitAddress () {
        // 确定地址
        this.$emit('hidePicker')
        this.$emit('getAddress', this.addressStr)
      }
    },
    components: {
      scroll
    }
  }
</script>
<style>
  .picker{
    background:#f3f3f3
  }
  .picker-slot{
    font-size:0.24rem
  }
  .picker-item{
    white-space: wrap !important;
  }
</style>


<style lang="stylus" scoped>
@import "../../common/stylus/colorreset"
.slide-enter-active,.slide-leave-active
  transition: all .5s
.slide-enter
  transform:translateY(100%)
.slide-leave-to
  transform:translateY(100%)
.pickers
  background:#fff
  position:fixed
  width:100%
  height:3.5rem
  bottom:0
  left:0
  transition:all .5s
  z-index:1000
  .title
    font-size:0.3rem
    color:$color-meta
    display:flex
    // height:0.5rem
    line-height:0.5rem
    justify-content:space-between
    // margin:auto 0.3rem
    p
      padding:0.1rem 0.3rem 0.1rem 0.3rem
  .list
    height:2.8rem
    background:$color-bgcolor
    z-index:-1
    position:fixed
    width:100%
    font-size:0.3rem
    overflow hidden
    text-align:center
    li
      padding: 0.2rem 0
      border-bottom: 1px solid #eee
</style>
