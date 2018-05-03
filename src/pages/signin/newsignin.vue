<template>
  <div class="newsignin">
    <singinsuccess 
      :names="names"
      :surname="surname"
      :username="username"
      v-if="siginsuccess"></singinsuccess>
    <div class="title">
      <span @click="backUserCenter" class="left icon-fanhui1"></span>
    </div>
    <div class="container">
      <!-- 创建帐号 -->
      <p class="createtitle">{{$t('newsigin.createaccount')}}</p>
      <div class="email border-1px" :class="{'errorBorder':usernameState}">
        <input type="text" 
          v-on:input="checkoutState(0)"
          :placeholder="$t('newsigin.email')" 
          v-model="username">
        <div class="clear" v-show="username"  @click="clearThis(1)">
          <span></span>
        </div>
      </div>
      <div class="names">
        <div class="name" :class="{'nameerror':namesState}">
          <input type="text" 
            v-on:input="checkoutState(1)"
            :placeholder="$t('newsigin.names')" 
            v-model="names">
          <div class="clear" v-show="names"  @click="clearThis(2)">
            <span></span>
          </div>
        </div>
        <div class="surname" :class="{'surnameError': surnameState}">
          <input type="text"
            v-on:input="checkoutState(2)" 
            :placeholder="$t('newsigin.surname')" 
            v-model="surname">
          <div class="clear" v-show="surname" @click="clearThis(3)">
            <span></span>
          </div>
        </div>
      </div>
      <div class="password" :class="{'passwordError': passwordState}">
        <input 
          :type="passtype"
          v-on:input="checkoutState(3)" 
          :placeholder="$t('newsigin.password')" 
          v-model="password">
        <div class="show" v-show="password" @click="showThis">
          <span></span>
        </div>
      </div>
      <div class="userrlus">
        <div class="usertoast">
          <span class="fangkuang" :class="{'activeIcon': choosed}" @click="chooseThis"></span>
          <p @click="touserlus">
            <span class="usertext" >{{$t('supplement.rlusAcepto')}}</span><span class="blue">{{$t('supplement.rlusMeta')}}</span>
          </p>
        </div>
      </div>
      <div class="signinbtn" :class="{'activeBtn':submitState}" @click="registration">
        <!-- 注册 -->
        <p>{{$t('newsigin.create')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import singinsuccess from '@/components/successpage/singinsuccess'
  import { mapGetters, mapMutations } from 'vuex'
  import { regUser } from 'api/login'
  import md5 from 'js-md5'
  export default {
    data () {
      return {
        choosed: false,
        username: '',
        names: '',
        surname: '',
        password: '',
        usernameState: false,
        namesState: false,
        surnameState: false,
        passwordState: false,
        submitState: false,
        passtype: 'password'
      }
    },
    computed: {
      ...mapGetters([
        'siginsuccess'
      ])
    },
    methods: {
      backUserCenter () {
        this.$router.back()
      },
      showThis () {
        // 显示密码
        this.passtype = this.passtype === 'password' ? 'text' : 'password'
      },
      clearThis (type) {
        // 清除输入框
        switch (type) {
          case 1:
            this.username = ''
            break
          case 2:
            this.names = ''
            break
          case 3:
            this.surname = ''
            break
          case 4:
            this.password = ''
            break
        }
      },
      checkoutState (type) {
        let regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        let usernameState = regExp.test(this.username)
        switch (type) {
          case 0:
            if (usernameState) {
              this.usernameState = false
            }
            break
          case 1:
            if (this.names) {
              this.namesState = false
            }
            break
          case 2:
            if (this.surname) {
              this.surnameState = false
            }
            break
          case 3:
            if (this.password.length >= 6 && this.password.length <= 20) {
              this.passwordState = false
            }
            break
        }
        if (this.username && this.names && this.surname && this.password && this.choosed) {
          this.submitState = true
        } else {
          this.submitState = false
        }
      },
      touserlus () {
        // 查看使用条款
        this.$router.push('/userlus/' + this.$i18n.locale)
      },
      registration () {
        // 注册
        this.checkoutform()
        this.errorToast()
        if (this.submitState) {
          regUser({
            userName: this.username,
            userType: 1002,
            authCode: '110',
            password: md5(this.password),
            nickName: `${this.names} ${this.surname}`
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.setsigin(true)
            }
          })
        }
      },
      checkoutform () {
        // 校验表单数据
        let regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (!regExp.test(this.username)) {
          this.usernameState = true
        }
        this.namesState = this.names === '' ? Boolean(true) : Boolean(false)
        this.surnameState = this.surname === '' ? Boolean(true) : Boolean(false)
        if (this.password.length < 6 || this.password.length > 20) {
          this.passwordState = true
        }
      },
      errorToast () {
        // 表单错误提示
        let regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (!regExp.test(this.username)) {
          this.$toast({
            message: this.$t('newsigin.emailErr'),
            duration: 2000
          })
          return false
        }
        if (!this.names) {
          this.$toast({
            message: this.$t('newsigin.names'),
            duration: 2000
          })
          return false
        }
        if (!this.surname) {
          this.$toast({
            message: this.$t('newsigin.surname'),
            duration: 2000
          })
          return false
        }
        if (!this.password) {
          this.$toast({
            message: this.$t('newsigin.passerr'),
            duration: 2000
          })
          return false
        }
      },
      chooseThis () {
        // 统一使用条款
        this.choosed = !this.choosed
        if (this.username && this.names && this.surname && this.password && this.choosed) {
          this.submitState = true
        } else {
          this.submitState = false
        }
      },
      ...mapMutations({
        setsigin: 'SET_SIGIN_SUCCESS'
      })
    },
    components: {
      singinsuccess
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/mixin"
  @import "../../common/stylus/fontsize"
  .newsignin
    min-height:100vh
    position:absolute
    width:100%
    .title
      font-size:$font-meta
      height:$meta-height
      padding: 0 0.32rem 0 0.32rem
      display:flex
      justify-content:space-between
      align-items:center
      position:fixed
      // width:6.86rem
      background:$color-white
      color: $color-general-font
      z-index:100
      .left
        position:absolute
        padding:0.25rem 0.3rem 0.25rem 0.25rem
        left:0
        font-size:0.4rem
        color:$color-meta
    .container
      margin:auto 0.3rem
      margin-top:0.9rem
      .createtitle
        font-size:0.36rem
        padding-top:0.3rem
        color:#333
      .email
        height:1.2rem
        font-size:0.3rem
        display:flex
        justify-content:space-between
        align-items:flex-end
        position: relative
        transition:all .5s
        input
          display:inline-block
          height:0.8rem
          width:6rem
        .clear
          width:0.8rem
          height:0.8rem
          position:relative
          // align-items:center
          span
            right:0
            top:50%
            transform:translateY(-50%)
            position:absolute
            line-height:0.8rem
            display:inline-block
            width:0.22rem
            height:0.23rem
            bg-image('../../common/image/close')
            background-size: cover           
      .border-1px
        border-bottom:1px solid #cccccc
      .errorBorder
        border-bottom:1px solid $color-meta
    .names
      font-size:0.3rem
      display:flex
      justify-content:space-between
      height: 1.34rem
      width:100%
      .name
        display:flex
        align-items:flex-end
        justify-content:space-between
        width:3.28rem
        border-bottom:1px solid #cccccc
        position: relative
        transition:all .5s
        input
          display:inline-block
          width:2.9rem
          height:0.8rem
        .clear
          width:0.8rem
          height:0.8rem
          position: relative
          span
            right:0
            top:50%
            transform:translateY(-50%)
            position:absolute
            display:inline-block
            width:0.22rem
            height:0.23rem
            bg-image('../../common/image/close')
            background-size: cover
      .nameerror
          border-bottom:1px solid $color-meta
      .surname
        display:flex
        align-items:flex-end
        justify-content:space-between
        width:3.28rem
        border-bottom:1px solid #cccccc
        position: relative
        transition:all .5s
        input
          display:inline-block
          width:2.9rem
          height:0.8rem
        .clear
          width:0.8rem
          height:0.8rem
          position: relative
          span
            display:inline-block
            right:0
            top:50%
            transform:translateY(-50%)
            position:absolute
            width:0.22rem
            height:0.23rem
            bg-image('../../common/image/close')
            background-size: cover
      .surnameError
        border-bottom:1px solid $color-meta
    .password
      font-size:0.3rem
      height:1.34rem
      display:flex
      align-items:flex-end
      justify-content:space-between
      border-bottom:1px solid #cccccc
      position: relative
      transition:all .5s
      input
        height:0.8rem
        width:6.5rem
      .show
        width:0.8rem
        height:0.8rem
        position: relative
        span
          display:inline-block
          right:0
          top:50%
          transform:translateY(-50%)
          position:absolute
          width:0.44rem
          height:0.26rem
          bg-image('../../common/image/eyes')
          background-size: cover
    .passwordError
      border-bottom:1px solid $color-meta
    .userrlus
      margin-top:0.62rem
      font-size:0.24rem
      .usertoast
        display:flex
        align-items:center
        height:0.5rem
        p
          height:0.5rem
          line-height:0.5rem
        .usertext
          color:#999999
        .blue
          color:$color-sky-blue
          margin-left:0.05rem
        .fangkuang
          display:inline-block
          width:0.36rem
          height:0.36rem
          border:1px solid #ccc
          font-size:0.4rem
          margin-right:0.25rem
          background-repeat: no-repeat
          background-position: center center
          background-size: 0.3rem 0.3rem
          transition:all .5s
        .activeIcon
          background-image:url('choose.png')
          border:1px solid $color-meta
    .signinbtn
      font-size:0.4rem
      height:0.9rem
      text-align:center
      line-height:0.9rem
      background:#ccc
      color:#fff
      border-radius:0.1rem
      margin-top:0.25rem
    .activeBtn
      background:$color-meta 
</style>

