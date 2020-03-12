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

  <scroll class="content" ref="scroll" :probe-type="3"
  :pull-up-load="true"
  @scroll="contentScroll"
  @pullingUp="loadMore">
  <!-- 插入home页面的轮播图插件homeSwiper -->
  <home-swiper :banner=banners></home-swiper>

  <!-- 插入首页的提示信息区域，即小圈圈 -->
  <recommend-view :recommend=recommend v-if=recommend.length></recommend-view>

  <!-- 插入功能页面的图片 -->
  <feature-view></feature-view>

  <!-- 插入页面信息滚动内容 -->
  <tab-control @tabClick='tabClick' class="tab-control" :titles="['流行','新款','精选']"></tab-control>

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
      currentType: 'pop',
      isBackTopShow: false
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
    this.getHomeMutidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
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
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick: function () {
      console.log(123)
      // 直接用refs调用指定标签的方法,第三个参数是时间毫秒
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll: function (position) {
      // console.log(position)
      if (position.y < -1000) {
        this.isBackTopShow = true
      } else {
        this.isBackTopShow = false
      }
      // console.log(this.isBackTopShow)
    },
    loadMore: function () {
      this.getHomeGoods(this.currentType)
      console.log('daodi')
      this.$refs.scroll.finishPullUp()
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
        for (const i of result.data.data.list) {
          this.goods[type].list.push(i)
        }
        // push...相当于上面的循环
        this.goods[type].list.push(...result.data.data.list)
        this.goods[type].page += 1
        // console.log(this.goods[type].list)
      })
    }
  }
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
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    width: 100%;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    /* z-index: 9; */
  }
  .content{
    /* margin-top: 44px; */
    height: calc(100vh - 93px);
    /* height: 500px; */
    overflow: hidden;
  }
</style>
