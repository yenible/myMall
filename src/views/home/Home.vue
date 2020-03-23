<template>
<div class="home">
  <nav-bar class="home-nav">
    <!-- left插槽 -->
    <template v-slot:left>
      <div>
      </div>
    </template>

    <!-- center部分的插槽 -->
    <!-- left插槽 -->
    <template v-slot:center>
      <div>
        首页
      </div>
    </template>

    <!-- right部分的插槽 -->
    <!-- left插槽 -->
    <template v-slot:right>
      <div>
      </div>
    </template>
  </nav-bar>

  <tab-control @tabClick='tabClick'
   ref="tabControl1"
    :titles="['流行','新款','精选']"
    v-show="isTabFixed"
    class="tabControlZoom"
  ></tab-control>

  <scroll class="content" ref="scroll" :probe-type="3"
  :pull-up-load="true"
  @scroll="contentScroll"
  @pullingUp="loadMore"
  >
  <!-- 插入home页面的轮播图插件homeSwiper -->
  <home-swiper :banner=banners @swiperImagesLoad="swiperImagesLoad"></home-swiper>

  <!-- 插入首页的提示信息区域，即小圈圈 -->
  <recommend-view :recommend=recommend v-if=recommend.length></recommend-view>

  <!-- 插入功能页面的图片 -->
  <feature-view></feature-view>

  <!-- 插入页面信息滚动内容 -->
  <tab-control @tabClick='tabClick'
   ref="tabControl2"
    :titles="['流行','新款','精选']"
    ></tab-control>

  <!-- 插入商品信息栏 -->

    <goods-list :goods="showGoods"></goods-list>
  </scroll>
  <back-top @click.native="backClick" v-show="isBackTopShow"></back-top>
</div>

</template>

<script>
// 公共组件
import NavBar from 'components/common/navigationbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

// 项目公共组件
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

// home子组件
import homeSwiper from './childComps/homeSwiper'
import recommendView from './childComps/homeRecommendView'
import featureView from './childComps/featureView'

// 只有用了export default导出才能省略大括号
import { getHomeMutidata, getHomeGoods } from 'network/home'
// import { debounce } from 'common/utils'
import { POP, NEW, SELL, BACKTOP_DISTANCE } from 'common/const.js'
import { itemListenerMixin } from 'common/mixin.js'
export default {
  name: 'Home',
  data () {
    return {
      banners: [],
      keywords: [],
      dKeyword: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: POP,
      isBackTopShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  components: {
    NavBar,
    TabControl,
    homeSwiper,
    recommendView,
    featureView,
    GoodsList,
    Scroll,
    BackTop
  },
  created () {
    // a.获得顶部多个数据
    this.getHomeMutidata()

    // b.获取商品数据
    this.getHomeGoods(POP)
    this.getHomeGoods(NEW)
    this.getHomeGoods(SELL)

    // 手动调用一次控制栏的index
    this.tabClick(0)
  },
  // mounted () {
  //   // 1.图片加载监听
  //   // 防抖动函数,通过这个refresh函数能很好的减少调用refresh的频率
  //   const refresh = debounce(this.$refs.scroll.refresh, 250)
  //   // 监听图片加载
  //   // this.$bus.$on('homeItemImageLoad', () => {
  //   //   // 调用scroll的函数
  //   //   this.$refs.scroll && refresh()
  //   // })
  //   // 保存调用的函数，方便再destory是输入
  //   this.itemImgListener = () => {
  //     refresh()
  //   }
  //   this.$bus.$on('itemImageLoad', this.itemImgListener)
  // },
  activated () {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated () {
    // 1.记录首页路由切换时的位置
    this.saveY = this.$refs.scroll.getScrollY()
    // 2.销毁首页图片监听
    // 销毁图片的事件监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    /* 这里是事件监听方法 */
    /* 这里是事件监听方法 */
    /* 这里是事件监听方法 */

    // TabControl传递回来的tab数值
    tabClick: function (index) {
      // console.log(index)
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      if (this.$refs.tabControl1 !== undefined) {
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      }
    },
    backClick: function () {
      // 直接用refs调用指定标签的方法,第三个参数是时间毫秒
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll: function (position) {
      // 判断返回首页箭头是否显示
      // console.log(position)
      if (position.y < -BACKTOP_DISTANCE) {
        this.isBackTopShow = true
      } else {
        this.isBackTopShow = false
      }

      // 决定tabControl是否吸停
      if (position.y < -this.tabOffsetTop + 44) {
        this.isTabFixed = true
      } else {
        this.isTabFixed = false
      }
    },
    swiperImagesLoad: function () {
    // 2.获取tabContril
    // this.tabOffsetTop = this.$refs.tabControl
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    loadMore: function () {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
      // 刷新页面的图片后的计算高度
      this.$refs.scroll.scroll.refresh()
    },

    /* 网络请求方法 */
    /* 网络请求方法 */
    /* 网络请求方法 */
    getHomeMutidata () {
      // 1.初次请求多个数据，用于轮播图等
      getHomeMutidata().then((result) => {
        // 将请求的数据保存到data的变量中
        this.banners = result.data.data.banner.list
        this.keywords = result.data.data.keywords.list
        this.dKeyword = result.data.data.dKeyword.list
        this.recommend = result.data.data.recommend.list
        // console.log(this.recommend)
      })
    },
    getHomeGoods (type) {
      // 2.第二次请求商品数据
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((result) => {
        // console.log(result)
        // for (const i of result.data.data.list) {
        //   this.goods[type].list.push(i)
        // }
        // push...相当于上面的循环
        this.goods[type].list.push(...result.data.data.list)
        this.goods[type].page += 1
        // console.log(this.goods[type].list)
        //   this.$refs.scroll.scroll.refresh()
      })
    }
  },
  mixins: [itemListenerMixin]
}
</script>

<style scoped>
.home{
  width: 100%;
  height: calc(100vh - 49);
  /* overflow: hidden; */
}
  /* 此时首页栏还是遮挡了部分的图片 */
  .home-nav{
    background-color: var(--color-tint);
    /* position: fixed; */
    width: 100%;
  }
  .content{
    /* margin-top: 44px; */
    height: calc(100vh - 93px);
    /* height: 500px; */
    overflow: hidden;
  }
  .tabControlZoom{
    top: 44px;
    left: 0;
    right: 0;
    position: fixed;
  }
</style>
