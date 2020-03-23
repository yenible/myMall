<template>
  <div class="category">
    <category-nav-bar class="nav-bar" />
    <div class="content">
      <category-subject @selectSubject="getCategoryInfo" :subjectInfo="categorySubject"></category-subject>
    <scroll ref="scroll">
      <category-sub-detail-info :subDetailInfo="subInfo" />
        <tab-control @tabClick='changeType'
   ref="tabControl2"
    :titles="['流行','新款','精选']"
    ></tab-control>
    <!-- 插入商品信息栏 -->
    <goods-list :goods="categoryGoodsInfo"></goods-list>
    </scroll>
    </div>

  </div>
</template>

<script>
// import BScroll from 'better-scroll'

// 导入页面子组件
import CategorySubject from './childComps/CategorySubject'
import CategoryNavBar from './childComps/CategoryNavBar'
import CategorySubDetailInfo from './childComps/CategorySubDetailInfo'

import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import { getCategory, getSubcategory, getCategoryDetail } from 'network/category'
// import { getCategory, getSubcategory } from 'network/category'
import { itemListenerMixin } from 'common/mixin.js'

/* eslint-disable no-new */
export default {
  name: 'Category',
  components: {
    CategorySubject,
    CategoryNavBar,
    CategorySubDetailInfo,
    Scroll,
    TabControl,
    GoodsList
  },
  data () {
    return {
      // 存储分类的主题信息
      categorySubject: [],
      // 存储每个主题的详细信息
      categoryDetailInfo: [],
      // 当前的主题下标
      currentSubIndex: -1,
      subInfo: [],
      goodsInfo: [],
      currentType: 'pop'
    }
  },
  computed: {
    categoryGoodsInfo: function () {
      // console.log(123)
      if (!this.categoryDetailInfo[this.currentSubIndex]) return []
      // const type =
      return this.categoryDetailInfo[this.currentSubIndex].categoryDetailInfo[this.currentType]
    }
  },
  created () {
    this.currentSubIndex = 0
    this.getCategorySubInfo()
  },
  methods: {
    // 获取分类主题的信息，同时对categoryDetailInfo进行初始化，使其能存储所有对应主题的信息
    getCategorySubInfo () {
      getCategory().then((result) => {
        // 保存主题信息
        this.categorySubject = result.data.data.category.list
        // 初始化categoryDetailInfo
        for (let i = 0; i < this.categorySubject.length; i++) {
          // 每个主题对应的编号分别初始化到categoryDetailInfo中
          // categoryDetailInfo分别存储类别的图片信息以及对应的推荐商品信息
          this.categoryDetailInfo[i] = {
            // 这里是分类的信息
            categoryInfo: [],
            // 这里是分类页面具体的推荐商品信息
            categoryDetailInfo: {
              pop: [],
              new: [],
              sell: []
            }
          }
        }
        // 转换数组，否则无法识别下标?
        this.categoryDetailInfo = JSON.parse(JSON.stringify(this.categoryDetailInfo))
        // 获取第一个主题信息
        this.getCategoryInfo(0)
        // console.log((result))
        // console.log((this.categorySubject))
      }).catch((err) => {
        console.log(err)
      })
    },
    // 切换主题后对切换后的主题进行数据的输入或者数据的更新
    getCategoryInfo (subIndex) {
      this.currentSubIndex = subIndex
      // 根据subIndex获取maitkey
      const maitKey = this.categorySubject[subIndex].maitKey
      getSubcategory(maitKey).then((result) => {
        this.categoryDetailInfo[subIndex].categoryInfo = result.data.data.list
        // console.log(this.categoryDetailInfo[subIndex].categoryInfo)
        this.subInfo = result.data.data.list
        // console.log(this.subInfo)
        // 获取goods三种的信息
        this.getDetailInfo(0)
        this.getDetailInfo(1)
        this.getDetailInfo(2)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 切换controlTab进行的数据更新
    getDetailInfo (typeIndex) {
      this.changeType(typeIndex)
      const type = this.currentType
      const miniWallkey = this.categorySubject[this.currentSubIndex].miniWallkey
      getCategoryDetail(miniWallkey, type).then((result) => {
        this.categoryDetailInfo[this.currentSubIndex].categoryDetailInfo[type] = result.data
        this.goodsInfo = result.data
        // console.log(this.categoryDetailInfo)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 用于修改当前的type
    changeType: function (index) {
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
      console.log(this.currentType)
      console.log(this.categoryDetailInfo)
    }
  },
  mixins: [itemListenerMixin]
}
</script>

<style scoped>
.content{
  display: flex;
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>
