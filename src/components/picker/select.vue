<template>
  <div class="select">
    <ul class="list">
      <li v-for="(list, index) in areaList" @click="chooseList(index, list)">
        <span class="icon-radio" :class="{'active': index === ind}"></span>
        <span>{{list}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      areaList: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        value: '',
        ind: ''
      }
    },
    methods: {
      chooseList (index, list) {
        this.ind = index
        this.$emit('getAddress', list)
      }
    }
  }
</script>
<style>
  .mint-cell:last-child{
    background-image:none !important
  }
  .mint-cell-wrapper{
    padding:0 !important;
  }
</style>


<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  .select
    width:7.05rem
    background:#fff
    z-index:20
    .list
      // padding:0.2rem
      li
        height:0.8rem
        line-height:0.8rem
        font-size:0.2rem
        display:flex
        align-items:center
        color:$color-weaken-font
        border-top:1px solid #f5f5f5
        .icon-radio
          font-size 0.4rem
          margin-right:0.3rem
          color:#ccc
        .active
          color:$color-yellow
      li:nth-child(1)
        border:none
</style>
