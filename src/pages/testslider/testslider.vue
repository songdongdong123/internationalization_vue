<template>
  <div class="testslider">
    <slider class="slider">
      <ul class="list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>5</li>
      </ul>
    </slider>
  </div>
</template>

<script>
  import slider from '@/components/slider/slider'
  export default {
    data () {
      return {}
    },
    components: {
      slider
    }
  }
</script>

<style lang="stylus" scoped>
  .testslider
    .slider
      width:100%
      .list
        list-style:none
        li
          display:inline-block
          width:2.5rem
</style>
