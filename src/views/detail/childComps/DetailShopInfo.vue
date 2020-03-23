<template>
  <div class="shopInfo">
    <div class="shop">
      <div class="shopLog">
        <img :src="shopInfo.log" alt="">
      </div>
      <span class="shopName">{{shopInfo.name}}</span>
    </div>
    <div class="detailInfo">
      <!-- 详细信息左部 -->
      <div class="left">
        <!-- 总销量 -->
        <div class="saleCost">
          <span>{{shopInfo.sells | sellCountFilter}}</span>
          <p>总销量</p>
        </div>
        <!-- 宝贝数量 -->
        <div class="amount">
          <span>{{shopInfo.goodsCount}}</span>
          <p>全部宝贝</p>
        </div>
      </div>
      <!-- 详细信息右部 -->
      <div class="right">
        <div class="rightInfo">
          <table>
            <tr v-for="(item, index) in shopInfo.score" :key="index">
              <td>{{item.name}}</td>
              <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
              <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  filters: {
    sellCountFilter (value) {
      let result = value
      if (value > 10000) {
        result = (result / 10000).toFixed(1) + '万'
      }
      return result
    }
  },
  props: {
    shopInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.shopInfo{
  border-top: 4px solid #d1cdcd;
  padding: 10px;
  height: 300px;
  width: 100%;
}
.shop{
  display: flex;
  padding-bottom: 12px;
  border-bottom: solid 1px #eee;
}
.shop .shopName{
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.shopLog{
  width: 50px;
  height: 50px;
  margin: 0 10px ;
}
.shopLog img{
  height: 100%;
  border-radius: 50%;
  border: 1px solid rgb(221, 214, 214);
}
.detailInfo{
  display: flex;
  padding: 15px;
}
.detailInfo .left{
  flex: 1;
  display: flex;
  border-right: 1px solid #eee;
  text-align: center;
}
.left span{
  font-size: 18px;
  font-weight: 620;
  text-align: center;
}
.left p{
  font-size: 13px;
}
.saleCost{
  flex: 1;
  margin: auto 0;
}
.amount{
  flex: 1;
  margin: auto 0;

}
.detailInfo .right{
  flex: 1;
}
.rightInfo{
  margin-left: 25px;
  font-size: 14px;
  line-height: 20px;
}
.score-better{
  color: rgb(232, 38, 51);
}
.better{
  padding: 3px;
  background-color: rgb(61, 237, 91);
  color: white;
}
.better-more{
  background-color: rgb(243, 64, 64);
}
td{
  padding: 5px;
}
.shop-bottom {
  text-align: center;
  margin-top: 10px;
}
.enter-shop {
  display: inline-block;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}
</style>
