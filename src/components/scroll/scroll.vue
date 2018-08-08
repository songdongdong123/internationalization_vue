<template>
  <div ref="wrapper" class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      listenScrollEnd: {
        type: Boolean,
        default: true
      },
      click: {
        type: Boolean,
        default: true
      },
      proObj: {
        type: Object,
        default: null
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
      },
      sizestring: {
        type: String,
        default: ''
      },
      special: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: 3,
          click: true
        })

        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            // 派发滚动事件
            me.$emit('scroll', pos)
          })
        }
        if (this.pullDown) {
          this.scroll.on('scrollEnd', (pos) => {
            if (!this.special) {
              if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                // 派发上拉加载
                this.$emit('scrollDown')
              }
            } else {
              if (this.scroll.y <= (this.scroll.maxScrollY + 600)) {
                // 派发上拉加载
                this.$emit('scrollDown')
              }
            }
          })
        }
        if (this.listenScrollEnd) {
          this.scroll.on('scrollEnd', (pos) => {
            // 派发滚动停止事件
            this.$emit('scrollEnd', this.scroll.y)
          })
        }
        if (this.pullUp) {
          this.scroll.on('touchend', (pos) => {
            if (pos.y > 50) {
              // 派发下拉刷新
              this.$emit('pullDown')
            }
          })
        }
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
      },
      proObj () {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      },
      sizestring () {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
