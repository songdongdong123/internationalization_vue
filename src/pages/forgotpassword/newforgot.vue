<template>
  <div class="newsignin">
    <sendsuccess v-show="sendsuccess"></sendsuccess>
    <div class="title">
      <span @click="backUserCenter" class="left icon-fanhui1"></span>
    </div>
    <div class="container">
      <p class="createtitle">$1.00 Para ganar</p>
      <!-- 输入您的电子邮件，我们将向您发送恢复密码的说明。 -->
      <p class="ingresa">{{$t('login.sendToast')}}</p>
      <div class="password" :class="{'passerror':emailState}">
        <span class="Email">Email</span>
        <input type="text"
          v-model="email"
          >
        <div class="clear" v-show="email">
          <span></span>
        </div>
      </div>
      <!-- 注意查看您的垃圾邮件 -->
      <p class="olvide">{{$t('login.emailToast')}}</p>
      <div class="signinbtn" @click="showsuccess">
        <!-- 提交 -->
        <p>{{$t('login.send')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import sendsuccess from '@/components/successpage/sendsuccess'
  import { mapGetters, mapMutations } from 'vuex'
  import { sendLinkToEmail } from 'api/login'
  export default {
    data () {
      return {
        choosed: true,
        email: '',
        emailState: false
      }
    },
    computed: {
      ...mapGetters([
        'sendsuccess'
      ])
    },
    methods: {
      backUserCenter () {
        this.$router.back()
      },
      checkoutemail () {
        // 邮箱格式校验
        let regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (!regExp.test(this.email)) {
          this.emailState = true
        } else {
          this.emailState = false
        }
      },
      errorToast () {
        let regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (!regExp.test(this.email)) {
          this.$toast({
            message: this.$t('login.emailErr'),
            duration: 2000
          })
        }
      },
      showsuccess () {
        this.checkoutemail()
        this.errorToast()
        if (!this.emailState) {
          sendLinkToEmail({
            email: this.email
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.setSendsuccess(true)
              setTimeout(() => {
                this.setSendsuccess(false)
                this.$router.back()
              }, 2000)
            } else {
              this.$toast({
                message: res.data.msg,
                duration: 2000
              })
            }
          })
        }
      },
      ...mapMutations({
        setSendsuccess: 'SET_SEND_SUCCESS'
      })
    },
    components: {
      sendsuccess
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
        padding-top:0.75rem
        color:#cccccc
        text-align:center
      .ingresa
        font-size:0.24rem
        color:#666
        margin-top:1.2rem
        line-height:0.4rem
      .password
        font-size:0.3rem
        height:1.34rem
        display:flex
        align-items:flex-end
        border-bottom:1px solid #cccccc
        position: relative
        input
          height:0.8rem
          width:5.1rem
        .Email
          display:inline-block
          height:0.8rem
          line-height:0.8rem
          margin-right:0.3rem
          color:#999
        .clear
          width:0.8rem
          height:0.8rem
          right:0rem
          position:absolute
          display:flex
          justify-content:flex-end
          align-items:center
          span
            display:inline-block
            width:0.22rem
            height:0.23rem
            bg-image('../../common/image/close')
            background-size: cover
      .passerror
        border-bottom:1px solid $color-meta      
      .olvide
        font-size:0.24rem
        color:#999
        // text-align:right
        margin-top:0.5rem
      .signinbtn
        font-size:0.4rem
        height:0.9rem
        text-align:center
        line-height:0.9rem
        background:$color-meta
        color:#fff
        border-radius:0.1rem
        margin-top:0.6rem
</style>

