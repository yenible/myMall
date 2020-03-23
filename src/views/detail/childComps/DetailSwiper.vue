<template>
  <div>
    <swiper class="swiper">
      <swiper-item v-for="(item, index) in swiperImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { SwiperItem, Swiper } from 'components/common/swiper/index'
export default {
  name: 'DetailSwiper',
  components: {
    SwiperItem,
    Swiper
  },
  props: {
    swiperImages: {
      type: Array,
      default: function () {
        return [1, 2, 3]
      }
    }
  }
}
</script>

<style scoped>
.swiper{
  height: 300px;
  overflow: hidden;
}
</style>
