<template>
  <tab-bar>
    <Tab-bar-item path='/home' activeColor='bule'>
      <!-- 这里是第一个图标 -->
      <template v-slot:item-icon>
        <img src='~assets/img/tabbar/home.svg' alt />
      </template>

      <template v-slot:item-icon-active>
        <img src='~assets/img/tabbar/home_active.svg' alt />
      </template>

      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </Tab-bar-item>
    <!-- 第一个结束 -->

    <!-- 这里是第二个图标 -->
    <Tab-bar-item path='/category' activeColor='green'>
      <template v-slot:item-icon>
        <img src='~assets/img/tabbar/category.svg' alt />
      </template>

      <template v-slot:item-icon-active>
        <img src='~assets/img/tabbar/category_active.svg' alt />
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </Tab-bar-item>
    <!-- 第二个结束 -->

    <!-- 这里是第三个图标 -->
    <Tab-bar-item path='/profile' activeColor='yellow'>
      <template v-slot:item-icon>
        <img src='~assets/img/tabbar/profile.svg' alt />
      </template>

      <template v-slot:item-icon-active>
        <img src='~assets/img/tabbar/profile_active.svg' alt />
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </Tab-bar-item>
    <!-- 第三个结束 -->

    <!-- 这里是第四个图标 -->

    <Tab-bar-item path='/cart'>
      <template v-slot:item-icon>
        <img src='~assets/img/tabbar/category.svg' alt />
      </template>

      <template v-slot:item-icon-active>
        <img src='~assets/img/tabbar/cart_active.svg' alt />
      </template>

      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </Tab-bar-item>
    <!-- 第四个结束 -->
  </tab-bar>
</template>

<script>
import TabBar from '../common/tabBar/TabBar'
import TabBarItem from '../common/tabBar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
</style>
