<template>
  <div class="detail-info">
    <!-- 商品描述 -->
    <span class="title">{{baseInfo.title}}</span>
    <!-- 商品价格 -->
    <div class="price">
      <span class="realPrice">￥{{baseInfo.realPrice}} </span>
      <span class="oldPrice">{{baseInfo.oldPrice}} </span>
      <span class="discount" :class="{ discountact : baseInfo.discount!== ''}"> {{baseInfo.discount}}</span>
    </div>
    <!-- 具体的信息，销量，收藏，发货信息 -->
    <div class="info">
      <span v-for="(item, index) in baseInfo.columns" :key="index">{{item}}</span>
    </div>
    <div class="services">
      <div class="serviceItem" v-for="(item, index) in baseInfo.services" :key="index">
        <img :src="item.icon" alt="" class="icon">
        <span class="text">{{item.name}}</span>
      </div>
    </div>
    <div class="clr"></div>
  </div>
</template>

<script>
export default {
  name: 'DetaiBaseInfo',
  props: {
    baseInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.detail-info{
  padding: 10px 8px;
}
.title{
  font-size: 18px;
  font-weight: bold;
}
.price{
  height: 50px;
}
.realPrice{
  color: rgb(250, 62, 150);
  line-height: 50px;
  font-size: 25px;
  text-align: center;
}
.oldPrice{
  text-decoration: line-through;
}
.discount{
  background-color: rgb(250, 62, 150);
  font-size: 15px;
  height: 20px;
  line-height: 20px;
  color: white;
  border-radius: 10px;
}
.discountact{
  padding: 4px;
}
.info{
  border-bottom: 1px solid rgb(187, 185, 183);
  margin-top: 10px;
  height: 28px;
  display: flex;
  color: rgba(143, 145, 146, 0.932);
}
.info span{
  flex: 1;
  font-size: 15px;
}
.info span:nth-child(2){
  text-align: center;
}
.info span:nth-child(3){
  text-align: right;
}
.services{
  /* display: flex; */
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  /* border-bottom: 1px solid rgb(187, 185, 183); */
  justify-content: space-between;
}
.serviceItem{
  float: left;
  width: 33.33%;
  font-size: 13px;
  line-height: 13px;
  font-weight: 700;
}
.serviceItem:nth-child(3n+2){
  text-align: center;
}
.serviceItem:nth-child(3n){
  text-align: right;
}
.serviceItem img{
  width: 12px;
  height: 14px;
  margin-right: 4px;
}
.clr{
  clear: both;
}
.more{
  margin-top: 20px;
  height: 300px;
  width: 100%;
  background-color: blue;
}
</style>
