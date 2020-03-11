<template>
  <div class="tab-control">
    <div class="text" :class="{active: currentIndex===index}"
    v-for="(item, index) in titles" :key="index"
    @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
// 只是文字不一样的情况下可以直接将文字放入数组传入，来代替插槽
export default {
  name: 'TabControl',
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default () {
        return [1, 2, 3]
      }
    }
  },
  methods: {
    tabClick (index) {
      this.currentIndex = index
      // 传递index值给组件，来确定当前选择的类型
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style>
.tab-control{
  display: flex;
  width: 100%;
  font-size: 16px;
  /* height: 40px; */
  line-height: 40px;
  text-align: center;
  background-color: white;
  z-index: 999;
}
.tab-control .text{
  flex: 1;
}
.active{
  color: var(--color-hight-text);
}
.tab-control span{
  padding: 6px;
}
.active span{
  border-bottom: 3px solid #e58484;

}
</style>
