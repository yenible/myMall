<template>
  <div class="goods" @click="clickItem" v-if="Object.keys(goodsItem).length !== 0">
      <img v-lazy="showGoods" alt="" @load="imgload">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <!-- 价格 -->
        <span class="price">¥{{goodsItem.price}}</span>
        <!-- 收藏 -->
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    showGoods: function () {
      // console.log(this.goodsItem.image || (this.goodsItem.show && this.goodsItem.show.img) || this.goodsItem.img)
      return this.goodsItem.image || (this.goodsItem.show && this.goodsItem.show.img) || this.goodsItem.img
      // return 0
    }
  },
  methods: {
    imgload: function () {
      // 解决在home和detail图片加载信息的传递方法
      // a.根据route不同路径传递发送不同的事件
      // if (this.$route.path.indexOf('/home')) {
      //   this.$bus.$emit('homeItemImageLoad', () => {})
      // } else if (this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('detailItemImageLoad', () => {})
      // }
      // b.采用相同的事件，但是每次切换路由销毁监听
      this.$bus.$emit('itemImageLoad', () => {})
    },
    clickItem: function () {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
  .goods {
    padding-bottom: 40px;
    position: relative;
    width: 46%;
  }
  .goods img {
    width: 100%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
