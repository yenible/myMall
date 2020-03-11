<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
// 这是轮播图每个小原件的封装
export default {
  name: 'SwiperItem'
}
</script>

<style scoped>
.slide {
  width: 100%;
  flex-shrink: 0;
}

.slide img {
  width: 100%;
}
</style>
