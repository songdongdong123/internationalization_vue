<template>
<transition name="fade">
  <div class="submitbox">
    <div class="container">
      <p class="title">{{title}}</p>
      <!-- <p>{{index}}</p> -->
      <div class="btns">
        <!-- 否 -->
        <p class="no" @click="closeThis">{{$t('submitbox.no')}}</p>
        <!-- 是 -->
        <p class="yes" @click="submitReceipt">{{$t('submitbox.yes')}}</p>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import { confirmReceiptGoods, deleteUserAddress } from 'api/usercenter'
  export default {
    props: {
      orderNo: {
        type: String,
        default: ''
      },
      orderIncrId: {
        type: Number,
        default: 0
      },
      id: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        title: this.$t('submitbox.title[0]') // 确认收货
      }
    },
    computed: {
      ...mapGetters(['submitbox'])
    },
    watch: {
      submitbox (oldV, newV) {
        if (oldV) {
          if (this.orderNo) {
            this.title = this.$t('submitbox.title[0]')
          } else {
            this.title = this.$t('submitbox.title[1]')
          }
        }
      }
    },
    methods: {
      closeThis () {
        this.setSubmitBox(false)
      },
      submitReceipt () {
        if (this.orderNo) {
          // 确认收货
          confirmReceiptGoods({
            orderIncrId: this.orderIncrId,
            orderNo: this.orderNo
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.$emit('updata', this.orderNo)
              // 已确认收货
              this.$toast({
                message: this.$t('toast.confirm_receipt'),
                duration: 1000
              })
              this.setSubmitBox(false)
            }
          })
        } else {
          // 地址删除
          deleteUserAddress({
            id: this.id
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              // 删除成功
              this.$toast({
                message: this.$t('toast.delete_success'),
                duration: 1000
              })
              this.$emit('splicelist', this.index)
              this.setSubmitBox(false)
            }
          })
        }
      },
      ...mapMutations({
        setSubmitBox: 'SET_SUBMIT_BOX'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .submitbox
    position:absolute
    width:100%
    height:100%
    top:0
    left:0
    z-index:2000
    display:flex
    justify-content:center
    align-items:center
    .container
      height:2rem
      width:5rem
      background:#fff
      border-radius:0.1rem
      overflow: hidden
      font-size:0.3rem
      position: relative
      .title
        // text-align:center
        margin-top:0.4rem
        margin-left:0.3rem
      .btns
        display:flex
        justify-content:flex-end
        position:absolute
        width:100%
        bottom:0
        height:0.8rem
        line-height:0.8rem
        p
          // width:50%
          text-align:right
        .yes
          width:1.5rem
          padding-right:0.5rem
          color:$color-sky-blue
        .no
          color:$color-issue-font
          padding-left:1rem
</style>

