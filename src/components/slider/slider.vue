<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      list: {
        type: Array,
        default: null
      },
      pullDown: {
        type: Boolean,
        default: true
      },
      pullUp: {
        type: Boolean,
        default: true
      }
    },
    mounted () {
      this._setSliderWidth()
      setTimeout(() => {
        this._initscroll()
      }, 20)
      // 监听窗口大小改变时间
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    methods: {
      _setSliderWidth (isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        // slider 可见宽度
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          // 设置每个子元素的样式及高度
          // addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          // 计算总宽度
          width += sliderWidth
        }
        // 循环播放首尾各加一个,因此总宽度还要加两倍的宽度
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initscroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new Bscroll(this.$refs.wrapper, {
          probeType: 3,
          scrollX: true,
          click: true,
          scrollY: false,
          snap: true
        })
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      refresh () {
        // console.log(this.scroll)
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      },
      listenScroll () {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      },
      list () {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>