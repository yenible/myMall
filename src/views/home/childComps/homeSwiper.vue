<template>
  <div>
  <swiper>
    <swiper-item v-for="(item, index) in banner" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index.js'
export default {
  name: 'homeSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banner: Array
  },
  data () {
    return {
      isload: false
    }
  },
  methods: {
    imageLoad: function () {
      if (!this.isload) {
        this.$emit('swiperImagesLoad')
        this.isload = true
      }
    }
  }
}
</script>

<style scoped>
</style>
