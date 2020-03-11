<template>
  <!-- 这是整体的recommend -->
  <div class="recommend">
    <!-- 元件 -->
    <div class="recomItem" v-for="(item, index) in recommend" :key="index">
      <a :href="item.link">
        <!-- 导入图片部分 -->
        <div class="image">
          <img :src="item.image" alt="">
        </div>

        <!-- 文字部分 -->
        <div class="text">
          {{item.title}}
        </div>
      </a>
    </div>
  </div>
</template>

<script>
// 这是用于首页的提示信息小圆圈的内容展示
export default {
  name: 'recommendView',
  props: {
    recommend: Array
  },
  mounted () {
  }
}
</script>

<style>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    /* 上 左右 下 */
    padding: 15px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .recomItem{
    flex: 1;
  }
  .image img{
    width: 85%;
    /* clear: both; */
    display: block;
    margin:auto;
  }
  .text{
    text-align: center;
    color: rgb(75, 69, 61);
    font-weight: bold;
    margin-top: 10px;
    font-size: 15px;
  }
</style>
