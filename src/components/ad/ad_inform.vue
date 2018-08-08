<template>
<transition name="slide">
  <div class="adinfo">
    <div class="noticeB" v-if="recordsList.length > 0">
      <div class="noticeLogo"></div>
      <div class="noticeContent" ref="noticeBox">
        <div id="notice"  ref="ulBox" class="clearfix divBox">
          <span v-for="(val, index) in recordsList" :key="index">¡Felicitamos a {{val.winnerName}}, quien ganó el sorteo del {{val.goodsName}} !</span>
          <span class="lastsan">¡Felicitamos a {{recordsList[0].winnerName}}, quien ganó el sorteo del {{recordsList[0].goodsName}} !</span>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  import { queryLastOpenIssueInfo } from 'api/home'
  export default {
    data () {
      return {
        step: 10,
        sum: 0,
        runTimer: null, // 计时器
        recordsList: [] // 消息列表

      }
    },
    created () {
      this._queryLastOpenIssueInfo()
    },
    destroyed () {
      clearInterval(this.runTimer)
    },
    methods: {
      _queryLastOpenIssueInfo () {
        queryLastOpenIssueInfo({}).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.recordsList = res.data.data.winnerList
            this.$nextTick(() => {
              this.textSwiper()
            })
          }
        })
      },
      textSwiper () {
        let ulBox = this.$refs.ulBox
        if (ulBox) {
          let liArr = ulBox.children
          let recordsLength = this.recordsList.length
          let noEnd
          let tureArr = Array.prototype.slice.call(liArr)
          let lastSpan = tureArr.pop()
          this.sum = 0
          tureArr.forEach((val, index) => {
            this.sum = this.sum + val.clientWidth
          })
          tureArr.push(lastSpan)
          noEnd = this.sum - lastSpan.clientWidth - 20
          ulBox.style.width = this.sum + 'px'
          this.sum = 0
          // 此处setTimeout 是为了使dom结构完全渲染 解决 计算属性宽度不准确
          window.setTimeout(() => {
            tureArr.forEach((val, index) => {
              this.sum = this.sum + val.clientWidth
            })
            noEnd = this.sum - lastSpan.clientWidth
            // console.log(this.sum, 'sum', lastSpan.clientWidth, noEnd)
            // 此处 + 10 是因为计算结果是整数 有误差 会把 最后一个span 挤下去
            ulBox.style.width = this.sum + 10 + 'px'
            recordsLength = this.recordsList.length
            if (recordsLength <= 0) return
            this.runTimer = window.setInterval(() => {
              this.step++
              ulBox.style.transform = `translateX(-${this.step}px)`
              // console.log(this.step)
              if (this.recordsList.length >= 1) {
              }
              if (this.step >= noEnd) {
                this.step = 0
                ulBox.style.transform = `translateX(-${0}px)`
              }
            }, 17)
          }, 17)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/mixin"
  .adinfo {
    .noticeB {
      position: relative;
      padding-left: 0.6rem;
      overflow: hidden;
      height: .7rem;
      .noticeLogo {
        position: absolute;
        top: 50%;
        left: 0;
        width: .6rem;
        height: .5rem;
        bg-image('./img/i')
        background-size: .37rem .31rem;
        background-position: center center;
        background-repeat: no-repeat;
        transform:translateY(-50%)
      }
      .noticeContent {
        height: 100%;
        overflow: hidden;
      }
      .divBox{
        height: 100%;
        wrap: no-wrap;
        span {
          display inline-block
          line-height: .7rem;
          padding: 0 .4rem
          // width: 4rem
          font-size .2rem
        }
      }
    }
  }
</style>  
