<template>
  <div>
    <nav-bar>
      <!-- 左边插槽 -->
      <template v-slot:left>
        <div class="back" @click="clickBack">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>

      <!-- 中间插槽 -->
      <template v-slot:center >
        <div class="titles">
          <div class="titleItem"
           v-for="(item, index) in titles" :key="index"
           :class="{active:index === currentIndex}"
           @click="clickItem(index)">{{item}}</div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navigationbar/NavBar'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    clickItem: function (index) {
      this.currentIndex = index

      // 向父组件发送当前点击的index
      this.$emit('titleClick', index)
      // console.log(this.currentIndex)
    },
    clickBack: function () {
      this.$router.back()
    }
  },
  props: {
    activatedIndex: {
      type: Number,
      default: function () {
        return 0
      }
    }
  }
}
</script>

<style scoped>
.titles{
  display: flex;
  font: 14px;
}
.titleItem{
  flex: 1;
  box-sizing: border-box;
}
.active{
  border-bottom: 2px solid rgb(253, 99, 202);
  color: rgb(253, 99, 202);
}
.back img{
  margin-top: 11px;
}
</style>
