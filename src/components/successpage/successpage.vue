<template>
<transition name="fade">
  <div class="success">
    <div class="center">
      <p><span class="icon-pa_success"></span></p>
      <!-- 参与成功 -->
      <p class="successText">{{msg}}</p>
      <!-- 份数 -->
      <p class="partNums" v-show="$t('successPage.part')===''">{{$t('successPage.part')}}：{{part}}</p>
    </div>
    <div class="successBtn" >
      <!-- 完成 -->
      <p class="check" @click="toRecordlist">{{buttonText}}</p>
      <p @click="closeThis">{{$t('successPage.accomplish')}}</p>
      <!-- <p>{{falg}}</p> -->
    </div>
  </div>
</transition>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    props: {
      msg: {
        type: String,
        default: ''
      },
      buttonText: {
        type: String,
        default: ''
      },
      falg: {
        type: Number,
        default: 1
      },
      part: {
        type: Number,
        default: null
      }
    },
    data () {
      return {
        channelType: ''
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
    },
    methods: {
      closeThis () {
        if (this.falg === 1) {
          this.setSuccessPage(false)
        } else if (this.falg === 2) {
          this.setSuccessPage(false)
          this.$router.push({path: '/userrecord/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
        }
      },
      toRecordlist () {
        // this.setSuccessPage(false)
        if (this.falg === 1) {
          this.$router.push({path: '/recordlist/' + this.$i18n.locale, query: {type: 2, channelType: this.channelType, channelTag: this.channelTag}})
        } else {
          this.$router.push({path: '/winnershow/' + this.$i18n.locale, query: {type: 1, channelType: this.channelType, channelTag: this.channelTag}})
        }
      },
      ...mapMutations({
        setSuccessPage: 'SUCCESS_PAGE_STATE'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .success
    position:fixed
    height:100%
    width:100%
    top:0
    left:0
    background:#fff
    z-index:1005
    .center
      position:absolute
      width:100%
      text-align:center
      font-size:0.4rem
      color:$color-general-font
      top:3rem
      .icon-pa_success
        font-size:0.8rem
        color:$color-meta
      .successText
        margin-top:0.5rem
      .partNums
        font-size:0.3rem
        color:$color-issue-font
        margin-top:0.4rem
    .successBtn
      position:absolute
      width:100%
      bottom:2rem
      text-align:center
      font-size:0.35rem
      color:$color-meta
      display:flex
      justify-content:center
      // margin:auto 0
      p
        width:2.7rem
        height:0.8rem
        // border:1px solid $color-meta
        background:$color-meta
        line-height:0.8rem
        border-radius:0.1rem
        color:#fff
      .check
        margin-right:0.5rem
        border:1px solid $color-issue-font
        color:$color-issue-font
        background:#fff
        // margin:0 auto
</style>
