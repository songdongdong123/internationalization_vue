<template>
<transition name="fade">
  <div class="betalert" v-if="betstate">
    <shortOf
      :goldnumber="goldnumber"
      :issueNo="issueNo"
      :channelType="channelTypes"
      :channelTag="channelTags"
    ></shortOf>
    <div class="mask" v-show="loading"></div>
    <div class="loading" v-show="loading">
      <loading :title="title"></loading>
    </div>
    <div class="container" ref="container">
      <div class="meta">
        <!-- 输入参与份数 -->
        <p>{{$t('beartAlert.meta')}}</p>
        <span class="icon-close" @click="hideBetAlert"></span>
      </div>
      <div class="unitContainer">
        <!-- 1金币/份 -->
        <p class="unit">{{$t('beartAlert.unit')}}</p>
        <!-- 请输入正确的份数 -->
        <!-- <p class="errorMsg" v-show="errorState">{{$t('beartAlert.errorMsg')}}</p> -->
      </div>
      <div class="counter">
        <span @click="reduceGold">-</span>
        <div class="ipt">
          <input type="tel" :placeholder="placeholder"
            v-model="betNumGold" v-on:input="changeNum(betNumGold)">
        </div>
        <span @click="addGold">+</span>
      </div>
      <div class="goldbtngroups">
        <p v-for="list in goldArr" 
        :class="{'activeP': list>surplusBuy}"
        @click="chooseGold(list)">{{list}}</p>
      </div>
      <div class="goldmes">
        <div class="bottom">
          <!-- 剩余份数 -->
          <p>{{$t('beartAlert.residue')}}:{{surplusBuy}}</p>
          <!-- 我的账户 -->
          <p>{{$t('beartAlert.myAccount')}}:{{goldnumber}}</p>
        </div>
      </div>
      <div class="submit" @click="submitBet">
        <!-- 确定 -->
        <p>{{$t('beartAlert.confirm')}}</p>
      </div>
    </div>
  </div>
  </transition>
</template>
<script>
  import { verifyBetNumber } from '@/common/js/verify'
  import loading from '@/components/loading/loading'
  import { createDeal } from 'api/pay'
  import shortofgold from '@/components/shortofgold/shortofgold'
  import { mapMutations } from 'vuex'
  export default {
    props: {
      betstate: {
        type: Boolean,
        default: false
      },
      surplusBuy: {
        type: Number,
        default: 0
      },
      issueNo: {
        type: String,
        default: ''
      },
      goldnumber: {
        type: Number,
        default: 0
      },
      channelTypes: {
        type: String,
        default: ''
      },
      channelTags: {
        type: String,
        default: '6_7_0_0'
      },
      activityType: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        goldArr: [10, 20, 50, this.$t('beartAlert.buyOff')],
        megold: 100,
        betNumGold: 1,
        timer: null,
        loading: false,
        errorState: false,
        placeholder: this.$t('beartAlert.placeholder'),
        title: this.$t('beartAlert.loadingText')
      }
    },
    methods: {
      hideBetAlert () {
        this.$emit('hideThis')
      },
      onfocus () {
        let _this = this
        setTimeout(() => {
          let constainer = _this.$refs.container
          constainer.scrollIntoView(true)
        }, 200)
      },
      onblur () {
        let _this = this
        setTimeout(() => {
          let constainer = _this.$refs.container
          constainer.scrollIntoView(false)
        }, 200)
      },
      changeNum (num) {
        this.errorState = !verifyBetNumber(num)
        if (num >= this.surplusBuy) {
          this.betNumGold = this.surplusBuy
        } else {
          this.betNumGold = num
        }
      },
      submitBet () {
        if (this.$ga) {
          this.$ga.event({
            eventCategory: '渠道',
            eventAction: '点击提交份数',
            eventLabel: `渠道:${this.channelTags}/商品期号:${this.issueNo}`,
            eventValue: 0
          })
        }
        let state = verifyBetNumber(this.betNumGold)
        if (state) {
          if (this.betNumGold <= this.goldnumber) {
            this.loading = true
            this.timer = setTimeout(() => {
              createDeal({
                issueNo: this.issueNo,
                buyNum: this.betNumGold,
                payAmount: this.betNumGold
              }).then(res => {
                if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
                  this.loading = false
                  this.$emit('hideThis')
                  this.$router.push({path: '/success/' + this.$i18n.locale, query: {issueNo: this.$route.query.issueNo, part: this.betNumGold, channelType: this.channelTypes, channelTag: this.channelTags}})
                } else {
                  this.loading = false
                  this.$toast({
                    message: res.data.msg,
                    duration: 1000
                  })
                  this.$emit('hideThis', true)
                }
              })
            }, 500)
          } else {
            // 去充值前管理当前路由参数信息
            let proIssueNo = {
              issueNo: this.issueNo,
              tag: this.$route.query.tag,
              falg: this.$route.query.falg,
              activityType: 4
            }
            window.localStorage.setItem('proIssueNo', JSON.stringify(proIssueNo))
            this.$router.push({path: '/pay/' + this.$i18n.locale,
              query: {
                score: 'activityproduct',
                issueNo: this.issueNo,
                channelType: this.channelType,
                channelTag: this.channelTag,
                activityType: 4
              }})
            // this.setShortOfGold(true)
          }
        } else {
          this.loading = false
          this.errorState = true
        }
      },
      chooseGold (nums) {
        if (nums === this.$t('beartAlert.buyOff')) {
          this.betNumGold = this.surplusBuy
        } else {
          if (nums < this.surplusBuy) {
            this.betNumGold = nums
          }
        }
      },
      addGold () {
        if (this.betNumGold < this.surplusBuy) {
          this.betNumGold++
        }
      },
      reduceGold () {
        if (this.betNumGold) {
          this.betNumGold--
        }
      },
      ...mapMutations({
        setShortOfGold: 'SET_SHORT_OF_GOLD_STATE'
      })
    },
    components: {
      loading,
      'shortOf': shortofgold
    }
  }
</script>

<style lang="stylus" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
  @import "../../common/stylus/colorreset"
  .betalert
    position:fixed
    height:100%
    width:100%
    display:flex
    justify-content:center
    top:1rem
    // top:0
    left:0
    z-index:3000
    .mask
      position:absolute
      height:5.5rem
      z-index:1500
      top:0
      left:0
      background:rgba(255,255,255,0.9)
      width:100%
    .loading
      position:absolute
      width:100%
      z-index:1501
      top:1rem
    .container
      width:100%
      height:5.7rem
      background:#fff
      .meta
        height:0.8rem
        font-size:0.35rem
        display:flex
        align-items:center
        justify-content:center
        text-align:center
        background:#f2f2f2
        color:$color-general-font
        position:relative
        .icon-close
          position:absolute
          right:0rem
          font-size:0.5rem
          padding:0.2rem
          color:#ccc
      .unitContainer
          margin:auto 0.2rem
          margin-top:0.3rem
          font-size:0.24rem
          display:flex
          justify-content:space-between
        .unit
          color:$color-general-font
        .errorMsg
          color:$color-meta 
          transition:all 5s
      .counter
        height:0.8rem
        display:flex
        padding:0 0.2rem
        margin-top:0.2rem
        .ipt
          border-top:1px solid $color-weaken-font
          border-bottom:1px solid $color-weaken-font
          font-size:0
          height:0.7rem
          input
            height:100%
            font-size:0.35rem
            width:4.1rem
            // padding-left:0.3rem
            text-align:center
        span
          display:inline-block
          width:1.5rem
          height:0.7rem
          text-align:center
          background:$color-weaken-font
          color:#fff
          font-size:0.5rem
          line-height:0.6rem
          border-top:1px solid $color-weaken-font
          border-bottom:1px solid $color-weaken-font
      .goldbtngroups
        display:flex
        justify-content:space-between
        margin: auto 0.2rem
        font-size:0.3rem
        line-height:0.7rem
        text-align:center
        margin-top:0.35rem
        p
          height:0.7rem
          width:1.5rem
          border: 1px solid $color-weaken-font
          border-radius:0.1rem
          color:$color-general-font
        .activeP
          color:$color-weaken-font 
      .goldmes
        position:relative
        .errorMsg
          font-size:0.24rem
          position:absolute
          left:0.2rem
          top:-0.35rem
          color:$color-meta
          transition:all .3s
        .bottom
          display:flex
          margin:auto 0.2rem
          justify-content:space-between
          font-size:0.24rem
          color:$color-general-font
          margin-top:0.5rem
      .submit
        height:0.9rem
        font-size:0.4rem
        // background:$color-meta
        margin: auto 0.2rem
        border-radius:0.1rem
        color:$color-meta
        line-height:0.9rem
        text-align:center
        margin-top:0.3rem
        border:1px solid $color-meta
</style>

