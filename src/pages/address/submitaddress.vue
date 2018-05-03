<template>
  <div class="submitaddress">
    <div class="title">
      <span @click="backUserrecord" class="left icon-fanhui1"></span>
      <!-- 确认收货地址 -->
      <p>{{$t('submitaddress.confirmReceipt')}}</p>
    </div>
    <div class="mask" v-show="loading"></div>
    <div class="proContainer">
      <div class="promsg">
        <div class="img">
          <img :src="thumbImage" alt="">
        </div>
        <div class="proName">
          <p class="name">{{goodName}}</p>
          <!-- <p class="introduce">Pantalla Smart Tv Hisense 40 Led Full</p> -->
        </div>
      </div>
      <div class="addresscontainer" v-if="addressState">
        <div class="left">
          <p class="left_top">
            <span class="username">{{addMsg.name}}</span>
            <span class="phone">{{addMsg.phone}}</span>
          </p>
          <!-- area.city  -->
          <!-- area.local -->
          <p class="detail">{{area.province}} {{area.city}} {{area.local}}</p>
        </div>
        <div class="right" @click="toAddresslist">
          <!-- 修改 -->
          <span>{{$t('submitaddress.modification')}}</span>
        </div>
      </div>
      <div class="submit" v-if="addressState" @click="submitAddress">
        <!-- 提交地址 -->
        <p>{{$t('submitaddress.actionAddress')}}</p>
      </div>
      <div class="submit" v-else @click="toUseraddress">
        <!-- 添加收货地址 -->
        <p>{{$t('submitaddress.addDeliveryAddress')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { getUserAddressList } from 'api/usercenter'
  import { confirmAddress } from 'api/pay'
  export default {
    data () {
      return {
        addressState: false,
        addMsg: {},
        area: {},
        goodName: '',
        thumbImage: '',
        orderIncrId: '',
        orderNo: '',
        loading: false
      }
    },
    created () {
      [
        this.goodName,
        this.thumbImage,
        this.orderIncrId,
        this.orderNo] = [
          this.$route.query.goodName,
          this.$route.query.thumbImage,
          this.$route.query.orderIncrId,
          this.$route.query.orderNo
        ]
      this._getUserAddressList()
    },
    methods: {
      backUserrecord () {
        if (this.$route.query.issueNo) {
          this.$router.back()
        } else {
          this.$router.push('/userrecord/' + this.$i18n.locale)
        }
      },
      toAddresslist () {
        // this.$router.push('/useraddress/' + this.$i18n.locale)
        this.$router.push({path: '/addresslist/' + this.$i18n.locale, query: {source: 'addressorder'}})
      },
      toUseraddress () {
        this.$router.push('/useraddress/' + this.$i18n.locale)
      },
      submitAddress () {
        confirmAddress({
          orderIncrId: this.orderIncrId,
          orderNo: this.orderNo,
          addressList: JSON.stringify(this.addMsg)
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.$toast({
              message: this.$t('submitaddress.submitSuccessfully'),
              duration: 1000
            })
            this.$router.back()
          }
        })
      },
      _getUserAddressList () {
        this.loading = true
        this.$loading({state: true})
        getUserAddressList({
          isAll: 0
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            if (res.data.data.length) {
              this.addMsg = JSON.parse(res.data.data[0].address)
              this.area = this.addMsg.area
              this.addressState = true
            } else {
              this.addressState = false
            }
            this.loading = false
            this.$loading({state: false})
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .submitaddress
    position:fixed
    width:100%
    background:$color-bgcolor
    min-height:100vh
    .mask
      position:fixed
      width:100%
      height:100%
      background:rgba(0,0,0,.3)
      z-index:1500
      transition:all .5s
    .title
      font-size:$font-meta
      height:$meta-height
      padding: 0 0.32rem 0 0.32rem
      display:flex
      justify-content:space-between
      align-items:center
      position:fixed
      width:6.86rem
      background:$color-white
      color: $color-general-font
      z-index:100
      border-bottom:1px solid $color-border
      .left
        position:absolute
        padding:0.25rem 0.3rem 0.25rem 0.25rem
        left:0
        font-size:0.4rem
        color:$color-meta
      p
        text-align:center
        width:100%
    .proContainer
      margin-top:0.9rem
      .promsg
        background:#fff
        padding: 0.4rem 0 0.4rem 0.2rem
        display:flex
        align-items:center
        // justify-content:space-between
        .img
          width:1.2rem
          height:1.2rem
          img
            width: 100%
            height: 100%
        .proName
          margin-left:0.4rem
          .name
            font-size:0.3rem
          .introduce
            font-size:$font-meta
            margin-top:0.1rem
      .addresscontainer
        font-size:$font-general
        background:#fff
        margin-top:0.2rem
        display:flex
        align-items:center
        .left
          width:5.5rem
          padding:0.2rem 0 0.2rem 0.2rem
          border-right:1px solid $color-border
          line-height:0.5rem
          .detail
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
            font-size:0.24rem
          .left_top
            display:flex
            justify-content:space-between
            font-size:0.24rem
            .phone
              padding-right:0.2rem
            .username
              width:60%
              overflow: hidden
              text-overflow:ellipsis
              white-space: nowrap
            span
              display:inline-block
        .right
          height:1.5rem
          line-height:1.5rem
          width:1.78rem
          text-align:center
          color:$color-meta
      .submit
        position:fixed
        bottom:0rem
        height:1rem
        width:100%
        display:flex
        justify-content:center
        align-items: center
        background:#fff
        p
          height: 0.8rem
          line-height:0.8rem
          text-align:center
          font-size:0.3rem
          color:$color-meta
          // border:1px solid $color-meta
          border-radius:0.1rem
          padding:0 0.2rem
          // width:3rem
</style>

