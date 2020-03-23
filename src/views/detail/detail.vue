<template>
  <div id="detail">
    <detail-nav-bar ref="detailNav" class="nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll"
    :probe-type="3" @scroll="contentScroll"
  :pull-up-load="true">
    <detail-swiper :swiperImages="topImages"></detail-swiper>
    <detail-base-info :baseInfo="goods"></detail-base-info>
    <detail-shop-info :shopInfo="shop"></detail-shop-info>
    <detail-goods-info @detailGoodsLoad="detailImageLoad" :detailInfo="detailInfo"></detail-goods-info>
    <detail-params-info ref="params" :paramsInfo="itemParams.info"
    :paramsRule="itemParams.rule"></detail-params-info>
    <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
    <goods-list ref="recommend" :goods="recommendInfo"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isBackTopShow"></back-top>
    <!-- <toast :message="toastMessage" :isShow="toastIsShow"></toast> -->
  </div>
</template>

<script>
// 导入子组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll.vue'
// import Toast from 'components/common/toast/Toast.vue'

import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import { getDetail, GoodInfo, Shop, getRecommend } from 'network/detail'
import { debounce } from 'common/utils'
import { itemListenerMixin } from 'common/mixin.js'
import { BACKTOP_DISTANCE } from 'common/const.js'

export default {
  name: 'detail',
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommendInfo: [],
      itemImgListener: null,
      themeTopYs: [],
      themeTopY: null,
      activatedIndex: 0,
      isBackTopShow: false
      // toastMessage: 'toastMessage',
      // toastIsShow: false
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
    // Toast
  },
  methods: {
    titleClick (index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
    },
    detailImageLoad () {
      this.refresh()
      this.themeTopY()
    },
    contentScroll (position) {
      // console.log(position)
      // 1.获取当前滚动的位置
      // console.log(position)
      const currentPosition = -position.y

      // 2.跟themeTopYs数组的数值进行比较，确定当前处于哪个位置
      for (let i = 1; i < this.themeTopYs.length; i++) {
        // 第一个判断是为了防止频繁赋值
        if (this.activatedIndex !== i - 1 && currentPosition < this.themeTopYs[i] && currentPosition > this.themeTopYs[i - 1]) {
          this.activatedIndex = i - 1
          // console.log(this.activatedIndex)
          this.$refs.detailNav.currentIndex = this.activatedIndex
          break
        }
      }
      if (this.activatedIndex !== 3 && currentPosition > this.themeTopYs[3]) {
        this.activatedIndex = 3
        // console.log(this.activatedIndex)
        this.$refs.detailNav.currentIndex = this.activatedIndex
      }
      // 判断返回首页箭头是否显示
      // console.log(position)
      if (position.y < -BACKTOP_DISTANCE) {
        this.isBackTopShow = true
      } else {
        this.isBackTopShow = false
      }
    },
    backClick: function () {
      // console.log(123)
      // 直接用refs调用指定标签的方法,第三个参数是时间毫秒
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    addToCart: function () {
      // 1.获取购物车展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 购物车某商品数量
      product.count = 0
      // console.log(product)

      // 2.将商品数据传送
      this.$store.dispatch('addCart', product).then(res => {
        // this.toastIsShow = true
        // this.toastMessage = res

        // setTimeout(() => {
        //   this.toastIsShow = false
        // }, 1500)
        this.$toast.show(res, 2000)
        // console.log(this.$toast.show)
      })
    }
  },
  created () {
    // 1.保存商品的iid
    this.iid = this.$route.params.id

    // 2.请求详情页面的数据
    getDetail(this.iid).then((result) => {
      // 分离数据存储
      // a.获取轮播图信息
      this.topImages = result.data.result.itemInfo.topImages

      // b.获取商品价格图片信息
      const data = result.data.result
      this.goods = new GoodInfo(data.itemInfo, data.columns, data.shopInfo.services)

      // c.获取商店信息
      this.shop = new Shop(data.shopInfo)

      // d.商品具体信息
      this.detailInfo = data.detailInfo

      // e.请求参数信息
      this.itemParams = data.itemParams

      // f.获取评论信息
      this.commentInfo = data.rate

      // console.log(data.rate)
      // console.log(data)
    })
    // .catch((err) => {
    //   // console.log(err)
    // })

    /* 请求推荐信息 */
    /* 请求推荐信息 */
    getRecommend().then((result) => {
      this.recommendInfo = result.data.data.list
      // console.log(this.recommendInfo)
    })
    // .catch((err) => {
    //   // console.log(err)
    // })

    this.themeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs)
    }, 300)
  },
  mounted () {
    // 将挂载后的每个部分的offsetTop放入数组中存储，以方便调用
    // this.$nextTick(() => {
    //   this.themeTopY = []
    //   this.themeTopY.push(0)
    //   this.themeTopY.push(this.$refs.params.$el.offsetTop)
    //   this.themeTopY.push(this.$refs.comment.$el.offsetTop)
    //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
    //   console.log(this.themeTopY)
    //   console.log(this.$refs.comment.$el.offsetTop)
    // })
  },
  updated () {
  },
  destroyed () {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  mixins: [itemListenerMixin]
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 2;
  background-color: #fff;
  height: 100vh;
}
.nav{
  z-index: 5;
  position: relative;
  background-color: #fff;

}
.content{
  height: calc(100% - 102px);
  /* height: 400px; */
  overflow: hidden;
}
</style>
