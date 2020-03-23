<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subDetailInfo">
      <div class="item" v-for="(item, index) in subDetailInfo" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="" @load="imgLoad">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/gridView/GridView'

export default {
  name: 'CategorySubDetailInfo',
  props: {
    subDetailInfo: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    GridView
  },
  methods: {
    imgLoad: function () {
      this.$bus.$emit('itemImageLoad')
    }
  }
}
</script>

<style scoped>
  .content{
    height: calc(100vh - 44px - 49px);
  }
  img {
    width: 100%;
  }

  .item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
