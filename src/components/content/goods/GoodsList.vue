<template>
  <div class="goods-list">
    <goods-list-item v-for="(item, index) in goods"
    :key="index" :goodsItem="item">
    </goods-list-item >
  </div>
</template>

<script>
import GoodsListItem from '../goods/GoodsListItem'

export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    // 获取商品所有信息
    goods: {
      type: Array,
      default () {
        return [1, 2, 3, 4, 5, 6, 9]
      }
    }
  }
}
</script>

<style scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
