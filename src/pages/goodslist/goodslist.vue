<template>
  <div class="goodslist">
    <scroll
      :listenScroll="true"
      :special="true"
      :data="issueList"
      ref="scrolllist"
      @scrollDown="scrollDowns"
      @pullDown="pullDowns"
      class="product"
    >
    <div>
      <div class="loading" v-show="loading1">
        <loading></loading>
      </div>
      <div class="sildercontainer">
        <slider
          :datalist="navlist"
          :startX="startX"
          @silderAllready="silderAllready"
          class="silder"
          ref="slider"
        >
          <div v-for="(list, index) in navlist" @click="fllowScroll(index, list.id, list.name)" ref="silderitem">
            <div class="imgcontainer">
              <img v-lazy="list.trueIcon" alt="" v-show="index===navindex">
              <img v-lazy="list.falseIcon" alt="" v-show="index!==navindex">
            </div>
            <p class="classname" :class="{'activeclassname': index===navindex}">{{list.name}}</p>
          </div>
        </slider>
      </div>
      <div class="sortcontainer">
        <div class="sorttitle">
          <p>{{defaultTodos?defaultTodos:getnavmsg.className}}</p>
          <p @click="showSortList">
            <span>{{defaultsorttext}}</span>
            <span class="sort"></span>
          </p>
          <ul class="sortlist" v-show="sortliststate">
            <li v-for="(list,index) in sortText" @click.stop="chooseSortType(list.id, list, index)">
              <span v-show="index===sortInd"></span>
              <p :class="{'activespan': index===sortInd}">
                {{list.name}}
                <i class="arrow" :class="list.classname"></i>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <ul class="product_list" v-show="issueList.length">
        <li class="product_item" 
          @click="toProductDetail(list.issueNo)"
          v-for="(list, index) in issueList">
            <div class="pic">
              <img v-lazy="list.thumbImage" alt="">
              <!-- <p class="product_name">{{list.goodsName}}</p> -->
            </div>
            <div class="product_name">
              <p class="text">{{list.goodsName}}</p>
            </div>
            <p class="pronummsg">{{$t('newhome.surplus')}}:{{list.surplusBuy}}</p>
            <div class="statistics">
              <!-- 总 -->
              <!-- <span>{{$t('home.overall')}}:{{list.totalBuy}}</span> -->
              <!-- 剩 -->
              <!-- <span>{{$t('home.remain')}}:{{list.surplusBuy}}</span> -->
            </div>
            <mt-progress :value="list.progress" :bar-height="5"></mt-progress>
        </li>
      </ul>
      <div class="returntotop" @click="returnToTop" v-show="issueList.length>10">
        <p>Volver al inicio</p>
      </div>
      <loading v-if="loading2"></loading>
      <div class="nolist" v-if="nodataState">
        <p>{{$t('recordList.nodata')}}</p>
      </div>
      <bottomad></bottomad>
    </div>
    </scroll>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import bottomad from '@/components/ad/ad'
  import scroll from '@/components/scroll/scroll'
  import slider from '@/components/scroll/slider'
  import loading from '@/components/loading/loading'
  import { getIssueList, getGoodsClassify } from 'api/home'
  export default {
    name: 'goodlist',
    data () {
      return {
        issueList: [],
        defaultTodos: 'Todos los productos',
        navindex: 0,
        sortIndex: 0,
        sortInd: 0,
        defaultsorttext: 'Por defecto',
        sortliststate: false,
        sortText: [
          {
            name: 'Por defecto',
            classname: '',
            id: 0
          },
          {
            name: 'Precio',
            classname: 'up',
            id: 4
          },
          {
            name: 'Precio',
            classname: 'down',
            id: 3
          },
          {
            name: 'Calendario',
            classname: 'up',
            id: 2
          },
          {
            name: 'Calendario',
            classname: 'down',
            id: 1
          }
        ],
        classifyId: 0,
        navBar: this.$t('navBar'),
        fixed: false,
        loading1: false,
        loading2: false,
        pageCount: 0,
        tempIssue: [],
        page: 0,
        tag: 0,
        nodataState: false,
        channelType: '',
        navlist: [],
        startX: 0
      }
    },
    created () {
      [this.channelType, this.channelTag] = [this.$route.query.channelType, this.$route.query.channelTag]
      this._getGoodsClassify()
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    computed: {
      ...mapGetters([
        'scrollState',
        'getnavmsg'
      ])
    },
    watch: {
      getnavmsg (newV, oldV) {
        this.fllowScroll(newV.navindex, newV.classifyId, newV.className)
      }
    },
    methods: {
      silderAllready () {
        // silder初始化完成
        let index = this.getnavmsg.navindex ? this.getnavmsg.navindex : 0
        let id = this.getnavmsg.classifyId ? this.getnavmsg.classifyId : 0
        let name = this.getnavmsg.className ? this.getnavmsg.className : 'Todos los productos'
        this.fllowScroll(index, id, name)
      },
      fllowScroll (index, id, name) {
        // 导航点击跟随
        [this.navindex, this.classifyId, this.sortIndex, this.defaultsorttext] = [index, id, 0, 'Por defecto']
        let sliderlist = this.$refs.silderitem
        this.defaultTodos = name
        let el = sliderlist[index]
        this.$nextTick(() => {
          this.$refs.slider.scrollToElement(el, 300, true, 0)
        }, 100)
        this.choosebar(index, id)
      },
      returnToTop () {
        // 返回顶部
        this.$refs.scrolllist.scrollTo(0, 0, 300)
      },
      chooseSortType (id, list, index) {
        // 选择商品排序方式
        [this.sortIndex, this.defaultsorttext, this.sortliststate, this.sortInd] = [id, list.name, false, index]
        this.choosebar()
      },
      showSortList () {
        // 显示分类选项
        this.sortliststate = !this.sortliststate
      },
      _getGoodsClassify () {
        // 获取商品分类
        getGoodsClassify({
          type: 1
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.navlist = res.data.data.list
          }
        })
      },
      backHome () {
        this.$router.push({path: '/home/' + this.$i18n.locale, query: {channelType: this.channelType, channelTag: this.channelTag}})
      },
      _getIssueList ({page = 0, pageSize = 10}) {
        // console.log(this.classifyId)
        this.$loading({state: true})
        this.loading = true
        getIssueList({
          page: page,
          pageSize: pageSize,
          classifyId: this.classifyId,
          sort: this.sortIndex
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.tempIssue = this.tempIssue.concat(res.data.data.issueList)
            this.issueList = this.tempIssue
            if (this.issueList.length === 0) {
              this.nodataState = true
            } else {
              this.nodataState = false
            }
            this.pageCount = res.data.data.totalNum
            this.loading1 = false
            this.loading2 = false
            this.$loading({state: false})
            // setTimeout(() => {
              // this.fllowScroll(this.getnavmsg.navindex, this.getnavmsg.classifyId)
            // }, 20)
          }
        })
      },
      choosebar (index, id) {
        this.issueList = []
        this.tempIssue = []
        this.page = 0
        this._getIssueList({})
        // 人气排序
      },
      pullDowns () {
        // 下拉刷新
        this.loading1 = true
        this.timer = setTimeout(() => {
          this.issueList = []
          this.tempIssue = []
          this.page = 0
          this.pageCount = 0
          this._getIssueList({})
        }, 1500)
      },
      scrollDowns () {
        // 触底加载
        if (this.page < Math.ceil(this.pageCount / 10) - 1) {
          this.page = this.page + 1
          this.loading2 = true
          this._getIssueList({page: this.page, pageSize: 10})
        } else {
          this.loading2 = false
        }
      },
      toProductDetail (issueNo) {
        let navmsg = {
          navindex: this.navindex,
          classifyId: this.classifyId,
          className: this.defaultTodos
        }
        this.setnavmsg(navmsg)
        this.$router.push({path: '/productdetail/' + this.$i18n.locale, query: {issueNo: issueNo, tag: this.classifyId, channelType: this.channelType, channelTag: this.channelTag}})
      },
      ...mapMutations({
        setnavmsg: 'SET_NAV_MSG'
      })
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    components: {
      scroll,
      loading,
      slider,
      bottomad
    }
  }
</script>
<style>
.mt-progress-progress{
  background-color:#FFCA3E !important;
}
.mt-progress-runway{
  height:0.15rem !important;
  border-radius:0.15rem;
}
.mt-progress-progress{
  height:0.15rem !important;
  border-radius:0.15rem;
}
</style>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/mixin"
  @import "../../common/stylus/marginAndsize"
  @import "../../common/stylus/fontsize"
  @media(min-width: 414px)
	  .product
      height:9rem !important
  .mask
    position:fixed
    bottom:0
    left:0
    background:rgba(0,0,0,.5)
    width:100%
    height:100%
    z-index:1000
  .goodslist
    background:$color-bgcolor
    min-height:100vh
    position:fixed
    width:100%
    .insignificance
      height:1.9rem
    .product
      background:$color-bgcolor
      height:80%
      position:absolute
      width:100%
      .loading
        margin:0
        padding-top:0.25rem 
      .sildercontainer
        padding: 0.2rem 0
        display:flex
        align-items:center
        background:#fff
        font-size:0.2rem
        z-index:1000
        box-shadow:0 3px 0px #f5f5f5
        // position:absolute
        .silder
          div
            padding:0 0.2rem
            text-align:center
            .imgcontainer
              img
                width:0.8rem
                height:0.8rem
            .classname
              margin-top:0.1rem
              color:#999
            .activeclassname
              color:#000
      .sortcontainer
        // padding-top:2rem
        font-size:0.24rem
        background:#fff
        box-shadow: 0px -2px 10px #ccc
        // margin-top:0.2rem
        .sorttitle
          display:flex
          align-items:center
          justify-content:space-between
          height:0.7rem
          margin:auto 0.32rem
          position:relative
          p
            display:flex
            align-items:center
            .sort
              display:inline-block
              width:0.24rem
              height:0.14rem
              bg-image('./img/sort')
              background-size: cover
              margin-left:0.3rem
          .sortlist
            position:absolute
            right:-0.2rem
            top:0.7rem
            border:1px solid #ccc
            background:#fff
            z-index:1000
            li
              padding:0.4rem 0.5rem
              font-size:0.2rem
              display:flex
              align-items:center
              position: relative
              p
                margin-left:0.4rem
              span
                display:inline-block
                width:0.1rem
                height:0.1rem
                border-radius:100%
                background:#ffcc00
                position:absolute
                top:50%
                transform:translateY(-50%)
              .activespan
                color:#ffcc00
              .arrow
                display:inline-block
                width:0.16rem
                height:0.18rem
                background-size: cover
                margin-left:0.2rem
              .down
                bg-image('./img/down')
              .up
                bg-image('./img/up')
          .sortlist>li:not(:last-child)
            border-bottom:1px solid #ccc
      .product_list
        display:flex
        justify-content:space-between
        flex-wrap:wrap
        margin:auto 0.2rem
        min-height:8rem
        .product_item
          // height:5rem
          width:3.45rem
          max-height:5rem
          position: relative
          overflow: hidden
          font-size:0.3rem
          background:#fff
          margin-top:0.2rem
          border-radius:0.1rem
          padding-bottom:0.2rem
          border:1px solid #eee
          // box-sizing:border-box
          .pic
            width:3.45rem
            height:3.45rem
            position: relative
            img
              width:100%
              height:100%
          .product_name
            padding:0 0.2rem
            margin-top:0.1rem
            font-size:0.26rem
            display:flex
            justify-content:space-between
            align-items:center
            .text
              height:0.5rem
              line-height:0.5rem
              color:#000
              font-weight: bold
              width:100%
              overflow: hidden
              text-overflow: ellipsis
              white-space:nowrap
          del
            padding-left:0.2rem
            color:$color-issue-font
            font-size:0.24rem
          .pronummsg
            height:0.4rem
            font-size:0.24rem
            // box-sizing:border-box
            width:100%
            overflow: hidden
            text-overflow: ellipsis
            white-space:nowrap
            padding:0rem 0.2rem
            box-sizing:border-box
            line-height:0.5rem
          .statistics
            margin-top:0.2rem
          .mt-progress
            margin:auto 0.2rem
            height:0.1rem
            margin-top:0.15rem
      .product_list::after
        width:3.45rem
        content:''
    .productFixed
      position:fixed
      padding-top:1rem
    .nolist
        width:100%
        height:1rem
        font-size:0.24rem
        text-align:center
        line-height:1rem
        color:$color-weaken-font
    .returntotop
      font-size:0.3rem
      color:#999
      height:1rem
      background:#fff
      line-height:1rem
      text-align:center
      margin:auto 0.2rem
      border-radius:0.1rem
      margin-top:0.2rem
</style>
