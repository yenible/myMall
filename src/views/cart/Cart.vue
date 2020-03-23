<template>
  <div class="cart">
    <!-- 顶部栏 -->
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>

    <!-- 商品列表 -->
      <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
// 公共组件
import NavBar from 'components/common/navigationbar/NavBar.vue'

// 子组件
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // mapGetters的用法
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      cartLength: 'cartLength'
    })
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}
</style>
