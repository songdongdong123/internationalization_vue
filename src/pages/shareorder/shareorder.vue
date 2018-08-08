<template>
  <div class="shareorder">
    <successPage :msg="shareOrderMsg" :buttonText="buttonText" v-show="successPage" :falg="2"></successPage>
    <!-- <div class="mask" v-show="mask" @click.stop="stopClick"></div> -->
    <div class="title">
      <p class="left" @click="bockToUserRecord">
        <span class="icon-fanhui1"></span>
      </p>
      <!-- 晒单 -->
      <p class="center">{{$t('shareorder.shareImg')}}</p>
      <p class="right">
        <!-- 发布 -->
        <span @click="publish">{{$t('shareorder.publish')}}</span>
      </p>
    </div>
    <div class="goodsmsg">
      <div class="container">
        <img :src="thumbImage" alt="">
        <span class="goodsname">{{goodsName}}</span>
      </div>
      <div class="upload">
        <div class="textarea">
          <!-- 留言 -->
          <textarea 
            :placeholder="textareaText" 
            v-model="remark" v-on:input="checkTextCounts" maxlength="200"></textarea>
        </div>
        <el-upload
          :action="baseurl"
          list-type="picture-card"
          :name="name"
          :before-upload="handleProgress"
          :on-preview="handlePictureCardPreview"
          :on-success="handleSuccess"
          :limit="3"
          :on-remove="handleRemove">
          <div class="el-upload__text">
            <!-- 添加图片 -->
            <p class="base addimg eladdimages">{{$t('shareorder.addImg')}}</p>
            <p class="base imgnums eladdimages">{{imglist.length}}/3</p>
          </div>
          <div class="hideSp" v-if="imglist.length===3" @click.stop="stop"></div>
        </el-upload>
      </div>
      <!-- <div class="anonymity">
        <p>匿名发布</p>
      </div> -->
      <!-- <input type="file" @change="Uploading"> -->
    </div>
  </div>
</template>

<script>
  import { insertShowDeal, uploadImageFile } from 'api/shareorder'
  import successPage from '@/components/successpage/successpage'
  import { mapGetters, mapMutations } from 'vuex'
  import getBaseUrl from 'common/js/baseUrl'
  export default {
    data () {
      return {
        imglist: [],
        name: '1',
        remark: '', // 留言
        value: false,
        mask: false,
        baseurl: '',
        shareOrderMsg: this.$t('shareorder.shareOrderMsg'),
        buttonText: this.$t('successPage.checkOrder'),
        textareaText: this.$t('shareorder.textareaText')
      }
    },
    created () {
      this.orderNo = this.$route.query.orderNo
      this.goodsName = this.$route.query.goodsName
      this.thumbImage = this.$route.query.thumbImage
      this.name = this.orderNo + '1'
      this.baseurl = `${getBaseUrl()}/index.php?c=common&m=uploadImageFile`
      // this.$loading('open')
    },
    computed: {
      ...mapGetters([
        'successPage'
      ])
    },
    methods: {
      publish () {
        // 晒单
        let state = this.checkShareContent()
        if (state) {
          insertShowDeal({
            orderNo: this.orderNo,
            remark: this.remark,
            imagesPath: this.imglist
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.setSuccessPage(true)
            } else {
              this.$toast({
                message: res.data.msg,
                duration: 2000
              })
            }
          })
        }
      },
      checkShareContent () {
        if (!this.remark) {
          this.$toast({
            // 请输入晒单评价
            message: this.$t('shareorder.sharetoast'),
            duration: 1000
          })
          return false
        }
        if (this.imglist.length === 0) {
          this.$toast({
            // 请添加图片
            message: this.$t('shareorder.imgToast'),
            duration: 1000
          })
          return false
        }
        return true
      },
      Uploading (el) {
        let file = el.target.files[0]
        let param = new FormData()
        param.append('file', file, file.name)
        // console.log(param)
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        uploadImageFile(param.get('file'), config).then(res => {
          console.log(res)
        })
      },
      checkTextCounts () {
        // 检查字数
        // console.log(this.remark.length)
      },
      bockToUserRecord () {
        // 返回中奖记录页面
        this.$router.back()
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleRemove (file, fileList) {
        for (let i = 0; i < this.imglist.length; i++) {
          if (file.response.data === this.imglist[i]) {
            this.imglist.splice(i, 1)
            this.name = `${this.orderNo}${i + 1}`
          }
        }
        this.imglist = this.imglist.sort()
      },
      handleSuccess (response) {
        // this.$loading('close')
        this.mask = false
        if (this.imglist.length === 1) {
          this.name = this.orderNo + '3'
        } else if (this.imglist.length === 2) {
          this.name = this.orderNo + '2'
        }
        this.imglist.push(response.data)
        this.imglist = this.imglist.sort()
      },
      stop () {
        return null
      },
      stopClick () {
        return null
      },
      handleProgress () {
        // this.$loading('open')
        this.mask = true
        this.name = this.orderNo + '2'
      },
      ...mapMutations({
        setSuccessPage: 'SUCCESS_PAGE_STATE'
      })
    },
    components: {
      successPage
    }
  }
</script>

<style>
  .el-upload--picture-card{
    width:1.5rem;
    height:1.5rem;
    position: relative;
    line-height: 0;
    border: 1px solid #c0ccda;
    border-radius:0;
  }
  /* .el-upload__input{
    display: inline-block;
  } */
  .hideSp{
    position:absolute;
    width:100%;
    height:100%;
    background:#fff;
    border: 1px solid #fff;
    top:-1px;
    left: -1px;
    z-index:100;
  }
  .el-icon-plus{
    line-height: 1.5rem;
    font-size: 0.4rem !important;
  }
  .el-upload-list__item{
    width:1.5rem !important;
    height:1.5rem !important;
  }
  .el-upload__text{
    font-size: 0.25rem;
    position:relative;
    bottom: 0.2rem;
  }
  .addimg{
    line-height: 1.5rem;
  }
  .imgnums{
    position: absolute;
    width: 100%;
    bottom: 0.4rem;
  }
  .el-icon-zoom-in{
    display: none !important;
  }
  .el-upload-list--picture-card .el-upload-list__item-actions span+span{
    margin-left: 0;
  }
</style>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .shareorder
    height:100vh
    background:$color-bgcolor
    position:absolute
    width:100%
    .mask
      position:fixed
      width:100%
      height:100vh
      background:rgba(0,0,0,.5)
      top:0
      z-index:1000
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
        padding:0.175rem 0.32rem 0.175rem 0.3rem
        font-size:0.3rem
        color:$color-meta
    .goodsmsg
      padding-top:$meta-height
      background:#fff
      .container
        height:1rem
        padding: 0 0.32rem 0 0.32rem
        font-size:0.3rem
        display:flex
        align-items:center
        border-top:1px solid $color-border
        border-bottom:1px solid $color-border
        img
          width:0.6rem
          height:0.6rem
          border-radius:100%
          overflow: hidden
          display:inline-block
        .goodsname
          margin-left:0.3rem
      .upload
        margin:auto 0.32rem
        padding-bottom:0.4rem
        .textarea
          textarea
            width:100%
            border:none
            outline:none
            resize:none
            height:1.5rem
            padding-left:0
            padding-top:0.15rem
      .anonymity
        border-top:1px solid $color-border
        margin-top:0.3rem
        height:1rem
        font-size:0.3rem
        $color-general-font
        padding: 0 0.32rem 0 0.32rem
        line-height:1rem
</style>

