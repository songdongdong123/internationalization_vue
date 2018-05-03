<template>
<transition name="slide">
  <div class="addresslist">
    <div class="mask" v-show="submitbox"></div>
    <submitbox
      :id="addressId"
      @splicelist="splicelist"
      v-show="submitbox"></submitbox>
    <!-- <div class="title">
      <span class="left" @click="backUserCenter">left</span>
      <p class="center">1 pesos for treasure</p>
      <span class="addNew" @click="toUseraddress">+</span>
    </div> -->
    <div class="title">
      <p class="left" @click="backUserCenter">
        <span class="icon-fanhui1"></span>
      </p>
      <!-- 地址管理 -->
      <p class="center">{{$t('addresslist.addressManage')}}</p>
      <p class="right">
        <span class="icon-jiahao" @click="toUseraddress"></span>
      </p>
    </div>
    <div class="addlist" v-if="addlist">
      <scroll
      class="list"
      :data="addlist"
      :listenScroll="true">
        <ul>
          <li class="item" 
            v-for="(list, index) in addlist">
            <div class="top">
              <div class="usermsg">
                <p class="username">{{list.address.name}}</p>
                <p class="baseMsg">{{list.address.detailedAddress}}</p>
                <p class="baseMsg">{{list.local}}</p>
                <p class="baseMsg">{{list.city}}</p>
                <p class="baseMsg">{{list.province}}</p>
                <p class="baseMsg">{{$t('addresslist.phoneNum')}}:{{list.address.phone}}</p>
              </div>
            </div>
            <div class="bottom">
              <p class="bottom-left" @click="chooseAddress(index, list)">
                <span class="icon-gouxuan" :class="{'active': index === ind}"></span>
                <!--默认地址 ：设为默认地址 -->
                <span>{{$t('addresslist.startUse') }}</span>
              </p>
              <p class="edit">
                <!-- 编辑 -->
                <span class="editText" @click="toEditAddress(index, list)">{{$t('addresslist.compile')}}</span>
                <!-- 删除 -->
                <span class="delate" @click="_deleteUserAddress(list.id)">{{$t('addresslist.delete')}}</span>
              </p>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</transition>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  import submitbox from '@/components/message/submitbox'
  import { mapGetters, mapMutations } from 'vuex'
  import { getUserAddressList, changeUserAddress } from 'api/usercenter'
  export default {
    data () {
      return {
        addlist: [],
        ind: 0,
        backText: this.$t('addresslist.backText[0]'), // 个人中心
        addressId: '',
        defaultAddress: {}
      }
    },
    computed: {
      ...mapGetters(['submitbox'])
    },
    created () {
      this._getUserAddressList()
      if (this.$route.query.source === 'addressorder') {
        this.backText = this.$t('addresslist.backText[1]') // 确认收货地址
      }
    },
    methods: {
      _deleteUserAddress (id) {
        // 删除地址列表中的一项
        this.setSubmitBox(true)
        this.addressId = id
      },
      splicelist (index) {
        // 更新地址列表
        this.addlist.splice(index, 1)
      },
      backUserCenter () {
        if (this.$route.query.source === 'addressorder') {
          this.$router.back()
        } else {
          this.$router.push('/usercenter/' + this.$i18n.locale)
        }
      },
      toUseraddress () {
        this.$router.push({path: '/useraddress/' + this.$i18n.locale, query: {falg: 'addreelist'}})
      },
      _getUserAddressList () {
        // 获取地址列表
        getUserAddressList({
          isAll: 1
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.addlist = res.data.data
            for (let list of this.addlist) {
              list.address = JSON.parse(list.address)
              list.local = list.address.area.local
              list.city = list.address.area.city
              list.province = list.address.area.province
            }
            this.defaultAddress = this.addlist[0]
          }
        })
      },
      chooseAddress (index, list) {
        this.ind = index
        this.defaultAddress = list
        this.$toast({
          message: this.$t('toast.addresslistToast'), // 设置成功
          duration: 1000
        })
        if (this.$route.query.source === 'addressorder') {
          this._changeUserAddress(this.ind, this.defaultAddress)
        } else {
          this._changeUserAddress(this.ind, this.defaultAddress)
        }
      },
      _changeUserAddress (index, list) {
        changeUserAddress({
          addressList: JSON.stringify(list.address),
          type: 1,
          id: list.id,
          newIndex: 0
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.$router.back()
          }
        })
      },
      toEditAddress (index, list) {
        console.log(list.id)
        this.$router.push({path: '/useraddress/' + this.$i18n.locale,
          query: {
            name: list.address.name,
            phone: list.address.phone,
            post: list.address.post,
            detailedAddress: list.address.detailedAddress,
            province: list.address.area.province,
            city: list.address.area.city,
            local: list.address.area.local,
            referenceInfo: list.address.referenceInfo,
            falg: 'addreelist',
            index: index,
            id: list.id
          }})
      },
      ...mapMutations({
        setSubmitBox: 'SET_SUBMIT_BOX'
      })
    },
    components: {
      scroll,
      submitbox
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .addresslist
    position:fixed
    width:100%
    background:$color-bgcolor
    min-height:100vh
    top:0
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
        padding:0.175rem 0.25rem 0.175rem 0.3rem
        font-size:0.4rem
        color:$color-meta
    .mask
      position:fixed
      width:100%
      height:100%
      background:rgba(0,0,0,.5)
      top:0
      z-index:1000
    .addlist
      margin-top:1.1rem
      font-size:$font-general
      color:$color-general-font
      .list
          height:10rem
        .item
          background:#fff
          padding:0.3rem 0 0 0
          margin-bottom:0.2rem
          .top
            border-bottom:1px solid $color-border
            .usermsg
              padding: 0 0.32rem
              margin-bottom:0.2rem
              .username
                font-size:0.35rem
                margin-bottom:0.4rem
              .baseMsg
                margin-top:0.2rem
                word-wrap:break-word
                font-size:0.24rem
                line-height:0.3rem
            .usermsg>p:last-child
              margin-bottom:0.3rem
          .bottom
            height:0.8rem
            display:flex
            justify-content:space-between
            align-items:center
            padding: 0 0.2rem
            font-size:0.24rem
            .edit
              span
                display:inline-block
                width:1rem 
                height:0.8rem
                line-height:0.8rem 
              .delate
                text-align:right
              .editText
                text-align:right
            .bottom-left
              height:0.8rem
              display:flex
              align-items:center
              .icon-gouxuan
                font-size:0.4rem
                margin-right:0.1rem
                color:$color-weaken-font
              .active
                color:$color-meta
</style>

