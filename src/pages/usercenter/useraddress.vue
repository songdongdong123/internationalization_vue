<template>
<transition name="slide">
  <div class="useraddress">
    <div class="title">
      <p class="left" @click="backUserCenter">
        <span class="icon-fanhui1"></span>
      </p>
      <!-- 地址管理 -->
      <p class="center">{{$t('userAddress.ipam')}}</p>
      <p class="right">
        <span  @click="_changeUserAddress">{{$t('userAddress.submit')}}</span>
      </p>
    </div>
    <div class="address_container">
      <div class="address">
        <div class="name top" :class="{'topAvtive':topAvtiveClass, 'topAvtive2':bomAvtiveClass&&!topAvtiveClass}">
          <!-- 收件人姓名 -->
          <input type="text" :placeholder="$t('userAddress.placeholders[0]')" v-model="username">
        </div>
        <div class="name bottom" :class="{'bottomActive':bomAvtiveClass, 'bottomActive2': !topAvtiveClass&&bomAvtiveClass}">
          <!-- 电话 -->
          <input type="text" :placeholder="$t('userAddress.placeholders[2]')" v-model="phoneNumber">
        </div>
      </div>
      <div class="postCode">
        <div class="postC left" :class="{'leftActive':postClass}">
          <!-- 邮编 -->
          <input type="text" :placeholder="$t('userAddress.placeholders[3]')" v-model="postcode">
        </div>
        <div class="postC" @click="_getPostCodeInfo">
          <!-- 验证邮编 -->
          <p :class="{'activePose': postcode}">{{$t('userAddress.verifyPostCode')}}</p>
        </div>
      </div>
      <div class="addressInfo" v-show="!errState">
        <p v-show="province">{{province}}</p>
        <p v-show="city">{{province}}</p>
        <!-- 更多 -->
        <p v-show="local">{{local}}<span v-show="arealist.length>1" @click="showMoreList">{{$t('userAddress.more')}}</span></p>
      </div>
      <transition name="fade">
        <div class="errInfo" v-if="errState">
          <p>X {{$t('userAddress.postcodeErrormsg')}}！</p>
        </div>
      </transition>
      <div class="addressDetail">
        <div class="base top" :class="{'topAvtive':detailClass}">
          <input type="text" :placeholder="$t('userAddress.placeholders[1]')" v-model="detailAddress">
        </div>
        <div class="base bottom" >
          <input type="text" :placeholder="$t('userAddress.placeholders[5]')" v-model="reference">
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="mask" v-show="moreList">
        <scroll 
          :listenScroll="true"
          :data="arealist"
          class="listContainer"
        >
          <div class="content">
            <p class="closeTitle" @click="closeMoreList">x</p>
            <ul class="list">
              <li class="item" v-for="list in arealist" @click="chooseOneLocal(list)">{{list}}</li>
            </ul>
          </div>
        </scroll>
      </div>
    </transition>
  </div>
</transition>
</template>

<script>
  import selected from '@/components/picker/select'
  import { changeUserAddress, getPostCodeInfo } from 'api/usercenter'
  import scroll from '@/components/scroll/scroll'
  export default {
    data () {
      return {
        username: '',
        detailAddress: '',
        phoneNumber: '',
        postcode: '',
        area: '',
        reference: '',
        backText: this.$t('userRecord.backText[0]'), // 个人中心
        type: 0,
        index: 0,
        editInedx: 0,
        city: '',
        province: '',
        arealist: [],
        postPickerState: false,
        readonly: 'readonly',
        local: '',
        moreList: false, // 更多地址列表
        errState: false,
        detailClass: false, // 详细地址状态
        postClass: false, // 邮编边框
        bomAvtiveClass: false, // 电话边框
        topAvtiveClass: false // 用户名边框
      }
    },
    created () {
      if (this.$route.query.falg === 'addreelist') {
        // 地址管理
        this.backText = this.$t('userRecord.backText[1]')
      }
      if (this.$route.query.name) {
        this.getEditMsg()
      }
    },
    methods: {
      verifyPost () {
        // 邮编验证
      },
      showMoreList () {
        // 显示地区列表
        this.moreList = !this.moreList
      },
      closeMoreList () {
        // 关闭地区列表
        this.moreList = false
      },
      chooseOneLocal (list) {
        // 选择一个区域
        this.local = list
        this.moreList = false
      },
      _getPostCodeInfo () {
        // 根据邮编获取地址信息
        this.$loading({state: true})
        if (this.postcode) {
          this.postClass = false
          getPostCodeInfo({
            postcode: this.postcode
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              [this.city, this.province, this.arealist] = [
                res.data.data.city,
                res.data.data.province,
                res.data.data.area
              ]
              this.local = this.arealist[0]
              this.$loading({state: false})
              if (!this.city || !this.province || this.arealist.length === 0) {
                this.errState = true
              } else {
                this.errState = false
              }
            } else {
              this.$loading({state: false})
              this.errState = true
              this.$toast({
                message: res.data.msg,
                duration: 1000
              })
            }
          })
        } else {
          this.$loading({state: false})
          this.$toast({
            // 请输入邮编
            message: this.$t('userAddress.plesWrEma'),
            duration: 1000
          })
        }
      },
      getEditMsg () {
        // 获取路由参数，编辑内容
        [
          this.username,
          this.detailAddress,
          this.phoneNumber,
          this.postcode,
          this.reference,
          this.type,
          this.index,
          this.editInedx,
          this.province,
          this.city,
          this.local
        ] = [
          this.$route.query.name,
          this.$route.query.detailedAddress,
          this.$route.query.phone,
          this.$route.query.post,
          this.$route.query.referenceInfo,
          1,
          this.$route.query.id,
          this.$route.query.index,
          this.$route.query.province,
          this.$route.query.city,
          this.$route.query.local
        ]
      },
      backUserCenter () {
        this.$router.back()
      },
      verificationClass () {
        // 检测表单信息是否完整
        [this.topAvtiveClass, this.bomAvtiveClass, this.postClass, this.detailClass] = [false, false, false, false]
        if (!this.username) {
          this.topAvtiveClass = true
        }
        if (!this.phoneNumber) {
          this.bomAvtiveClass = true
        }
        if (!this.postcode) {
          this.postClass = true
        }
        if (!this.detailAddress) {
          this.detailClass = true
        }
      },
      verificationMsg () {
        this.verificationClass()
        if (!this.username) {
          this.$toast({
            message: this.$t('userAddress.placeholders[0]'),
            duration: 1000
          })
          return false
        } else if (!this.phoneNumber) {
          this.$toast({
            message: this.$t('userAddress.placeholders[1]'),
            duration: 1000
          })
          return false
        } else if (!this.detailAddress) {
          this.$toast({
            message: this.$t('userAddress.placeholders[1]'),
            duration: 1000
          })
          return false
        } else if (!this.postcode) {
          this.$toast({
            message: this.$t('userAddress.placeholders[3]'),
            duration: 1000
          })
          return false
        } else if (!this.city) {
          this.$toast({
            message: this.$t('userAddress.verifyPostCodeToast'),
            duration: 1000
          })
        } else {
          return true
        }
      },
      _changeUserAddress () {
        // 提交地址
        let state = this.verificationMsg()
        this.area = {
          province: this.province,
          city: this.city,
          local: this.local
        }
        let newAddress = {
          name: this.username,
          detailedAddress: this.detailAddress,
          phone: this.phoneNumber,
          post: this.postcode,
          area: this.area,
          referenceInfo: this.reference
        }
        if (state) {
          changeUserAddress({
            addressList: JSON.stringify(newAddress),
            type: this.type,
            id: Number(this.index),
            newIndex: this.editInedx
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.$router.back()
            }
          })
        }
      }
    },
    components: {
      selected,
      scroll
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .noScroll
    position:fixed
    height:100%
    width:100%
    overflow: hidden
  .useraddress
    position:absolute
    width:100%
    top:0
    background:$color-bgcolor
    min-height:100vh
    color:$color-general-font
    .mask
      position:fixed
      width:100%
      height:100%
      background:rgba(0,0,0,.5)
      top:0
      left:0
      z-index:1010
      display:flex
      align-items:center
      .listContainer
        height:5rem
        width:5.5rem
        margin:0 auto
        background:#fff
        .content
          .closeTitle
            text-align:right
            font-size:0.4rem
            height:0.6rem
            background:#f5f5f5
            padding-right:0.2rem
            line-height:0.6rem
          .list
            font-size:0.3rem
            .item
              height:0.6rem
              line-height:0.6rem
              text-align:center
              border-bottom:1px solid #f5f5f5
    .title
      font-size:$font-meta
      height:$meta-height
      padding: 0 0.32rem 0 0.32rem
      display:flex
      align-items:center
      position:fixed
      width:6.86rem
      background:$color-white
      color: $color-general-font
      z-index:100
      border-bottom:1px solid $color-border
      .left
        position:absolute
        left:0
        font-size:0
        padding:0.25rem 0.3rem 0.25rem 0.25rem
        font-size:0.4rem
        color:$color-meta
      .center
        width:100%
        text-align:center
      .right
        position:absolute
        right:0
        font-size:0
        padding:0.175rem 0.32rem 0.175rem 0.32rem
        font-size:0.3rem
        color:$color-meta
    .address_container
      padding-top:0.9rem
      padding-bottom:0.3rem
      background:#fff
      .address
        font-size:0
        margin:auto 0.32rem
        margin-top:0.3rem
        overflow: hidden
        .name
          position: relative
          input
            display:block
            font-size:$font-address
            width:100%
            height:$input-height
            padding-left:0.2rem
            width:6.5rem
            color:$color-general-font
        .top
          border:1px solid #f5f5f5
        .topAvtive
          border-color:$color-meta
        .topAvtive2
          border-bottom:0
        .bottom
          border:1px solid #f5f5f5
          border-top:0
        .bottomActive
          border-color:$color-meta
        .bottomActive2
          border-top:1px solid $color-meta
      .addressActive
        border:1px solid $color-meta
      .postCode
        display:flex
        justify-content:space-between
        font-size:$font-address
        height:$input-height
        margin:auto 0.32rem
        margin-top:$mergin-address
        .postC
          width:3.33rem
          height:100%
          line-height:$input-height
          color:#fff
          p
            text-align:center
            background:$color-weaken-font
            border-radius:0.1rem
          input
            width:3rem
            padding-left:0.2rem
            color:$color-general-font
          .activePose
            background:$color-meta
            color:#fff
        .left
          border:1px solid #f5f5f5
        .leftActive
          border-color:$color-meta
      .addressInfo
        margin:auto 0.32rem
        p
          font-size:$font-address
          height:0.8rem
          line-height:0.8rem
          border:1px solid #f5f5f5
          margin-top:$mergin-address
          padding-left:0.2rem
          position:relative
          span
            position:absolute
            right:0.2rem
      .errInfo
        font-size:$font-address
        margin:auto 0.32rem
        padding: 0.3rem 0.4rem
        border:1px solid $color-meta
        border-radius:0.1rem
        margin-top:$mergin-address
        color:$color-meta
        text-align:center
      .addressDetail
        font-size:$font-address
        margin:auto 0.32rem
        margin-top:$mergin-address
        .base
          height:$input-height
          line-height:$input-height
          input
            width:6.5rem
            padding-left:0.2rem
            color:$color-general-font
        .top
          border:1px solid #f5f5f5
        .topAvtive
          border-color:$color-meta
        .bottom
          border:1px solid #f5f5f5
          border-top:0
</style>

