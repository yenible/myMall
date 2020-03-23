<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll" :isClick="true">
      <cart-list-item v-for="(item, index) in cartList"
      :key="index" :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CartListItem from './CartListItem'
import Scroll from 'components/common/scroll/Scroll.vue'

export default {
  name: 'CartList',
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    CartListItem,
    Scroll
  },
  activated () {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.content{
  height: calc(100vh - 44px - 49px - 40px);
  overflow: hidden;
  /* height: 350px; */
}
</style>
