<template>
  <div class="comment-info">
     <div class="text">
      <span>用户评价</span>
      <span class="more">更多</span>
    </div>
    <div class="content" v-if="commentInfo.list">
      <div class="user">
        <img :src="commentInfo.list[0].user.avatar" alt="">
        <span class="name">{{commentInfo.list[0].user.uname}}</span>
      </div>
     <div class="info-detail">
        <p>{{commentInfo.list[0].content}}</p>
        <div class="info-other">
          <span class="date">{{commentInfo.list[0].created | showDate}}</span>
          <span>{{commentInfo.list[0].style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.list[0].images" :key="index">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/common/utils'

export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  filters: {
    showDate: function (value) {
      const date = new Date(value * 1000)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
.text{
  margin: 10px 20px;
  height: 50px;
  /* width: 100%; */
  padding: 20px;
  position: relative;
  border-bottom: 1px solid #a19d9d;
}
.text span{
  font-size: 16px;
}
.more{
  float: right;
  right: 5px;
}
.user {
  padding: 10px 0 5px;
}
.user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.user span {
  position: relative;
  font-size: 15px;
  top: -15px;
  margin-left: 10px;
}
.info-detail {
  padding: 0 5px 15px;
}
.info-detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.info-detail .info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}

.info-imgs {
  margin-top: 10px;
}
.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>
