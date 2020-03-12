<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
// import Pullup from '@better-scroll/pull-up'

// BScroll.use(Pullup)

export default {
  name: 'Scroll',
  data () {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 封装一个转跳位置的方法
    scrollTo (x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      setTimeout(() => {
      // 用于结束一次的pullup好再一次触发？但是目前好像....
        this.scroll.finishPullUp()
      }, 2000)
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      pullUpLoad: this.pullUpLoad,
      // 记录位置
      probeType: this.probeType
    })
    console.log(this.scroll)
    // 监听滚动位置
    this.scroll.on('scroll', (position) => {
      // 向父组件传递位置信息
      this.$emit('scroll', position)
    })
    // 监听上拉界面
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  }
}
</script>

<style scoped>

</style>
