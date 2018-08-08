<template>
  <div class="tab" ref="tab">
    <div class="tab_content" ref="tabWrapper">
      <slot></slot>
    </div>
  </div>
 </template>
 <script>
import BScroll from 'better-scroll'
export default {
  props: {
    datalist: {
      type: Array,
      default: null
    },
    startX: {
      type: Number,
      default: 0
    }
  },
  methods: {
    InitTabScroll () {
      let width = 0
      for (let i = 0; i < this.datalist.length; i++) {
        width += this.$refs.tabWrapper.children[i].getBoundingClientRect().width
      }
      this.$refs.tabWrapper.style.width = width + 'px'
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.tab, {
            scrollX: true,
            startX: 0,
            scrollY: false,
            probeType: 3,
            eventPassthrough: 'vertical'
          })
          this.$emit('silderAllready')
        } else {
          this.scroll.refresh()
        }
      })
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  },
  watch: {
    datalist () {
      setTimeout(() => {
        // 数据更新之后再去初始化better-scroll否则无法动态获取元素宽度
        this.InitTabScroll()
      }, 20)
    }
  }
}
 </script>
<style lang="stylus" scoped>
 .tab
  overflow: hidden
  .tab_content
   display: flex
</style>