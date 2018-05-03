<template>
<transition name="fade">
  <div class="shortofgold" v-show="shortofgold" @click="hideThisDialog">
    <div class="return">
      <span class="icon-fanhui1"></span>
    </div>
    <div class="title">
      <p class="pointicon">
        <span class="icon"></span>
      </p>
      <!-- 金币不足 -->
      <p class="title_text">{{$t('payform.shortofGold')}}</p>
      <!-- 账户余额 -->
      <p class="shorof">{{$t('payform.account')}}：{{goldnumber}} {{$t('beartAlert.gold')}}</p>
    </div>
    <!-- 充值金币 -->
    <p class="topaybtn" @click.stop="toPayWay">{{$t('payform.payBtnText')}}</p>
  </div>
</transition>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    props: {
      goldnumber: {
        type: Number,
        default: 0
      },
      issueNo: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        paylist: [50, 100, 250, 500, 1000]
      }
    },
    computed: {
      ...mapGetters([
        'shortofgold'
      ])
    },
    methods: {
      toPayWay (list) {
        this.setShortOfGold(false)
        this.$router.push({path: '/pay/' + this.$i18n.locale, query: {score: 'productdetail', issueNo: this.issueNo}})
      },
      hideThisDialog () {
        this.setShortOfGold(false)
      },
      ...mapMutations({
        setShortOfGold: 'SET_SHORT_OF_GOLD_STATE'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/fontsize"
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
  .shortofgold
    position:fixed
    width:100%
    height:100%
    background:#fff
    top:0
    left:0
    z-index:1500
    .return
      color:$color-meta
      font-size:0.4rem
      position:absolute
      width:100%
      height:0.9rem
      line-height:0.9rem
      span
        margin-left:0.25rem 
    .title
      margin-top:3.7rem
      text-align:center
      .pointicon
        font-size:0
        .icon
          display:inline-block
          width:0.61rem
          height:0.61rem
          background:url('./img/point.png')
          background-size: cover
      .title_text
        font-size:0.36rem
        margin-top:0.5rem
      .shorof
        font-size:0.24rem
        color:#999999
        margin-top:0.76rem
    .topaybtn
      position:absolute
      width:6.86rem
      bottom:0.5rem
      margin:auto 0.32rem
      text-align: center
      font-size:0.3rem
      color:$color-meta
      border:0.01rem solid $color-meta
      height:0.8rem
      line-height:0.8rem
      border-radius:0.1rem
</style>
