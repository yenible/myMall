<template>
  <div class="goods-info">
    <div class="info-desc">
      <div class="start-line"></div>
      <div class="decs">
        {{detailInfo.desc}}
      </div>
      <div class="end-line"></div>
    </div>
    <div class="clr"></div>
    <div class="goods" v-for="(item, index) in detailInfo.detailImage" :key="index">
      <div class="key">{{item.key}}:</div>
      <div class="img" v-for="(imgItem, imgIndex) in item.list" :key="imgIndex">
        <img :src="imgItem" alt="" @load="imgLoad">
      </div>
      <p>{{item.desc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    imgLoad: function () {
      // this.$bus.$emit('imageLoad', () => {})
      this.$emit('detailGoodsLoad')
    }
  }
}
</script>

<style scoped>
.clr{
  clear: both;
}
.info-desc{
  padding: 0px 20px;
}
.start-line , .end-line{
    width: 100px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
    margin: 15px 0;
}
.end-line{
  float: right;
}
.start-line::before, .end-line:after{
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
    border-radius: 50%;
}
.end-line:after{
  right: 0px;
}
.goods{
  border-top: 1px solid rgb(202, 188, 188);
  margin: 20px 0;
  padding-top: 12px;
}
.goods .key{
  padding: 0 20px;
  line-height: 25px;
  font-size: 20px;
  font-weight: 600;
}
.goods .img{
  width: 100%;
}
.goods .img IMG{
  width: 100%;
}
.goods p{
  line-height: 20px;
  text-indent: 2em;
  padding: 0 20px;
}
</style>
