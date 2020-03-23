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
    },
    isClick: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 封装一个转跳位置的方法
    scrollTo: function (x, y, time = 300) {
      // 为了防止当scroll还没创建完就开始调用该方法导致发生错误
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp: function () {
      setTimeout(() => {
      // ....
        this.scroll.finishPullUp()
      }, 2000)
    },
    refresh: function () {
      this.scroll.refresh()
    },
    getScrollY: function () {
      return this.scroll ? this.scroll.y : 0
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: this.isClick,
      pullUpLoad: this.pullUpLoad,

      probeType: this.probeType
    })

    // 监听滚动位置
    this.scroll.on('scroll', (position) => {
      // 向父组件传递位置信息
      this.$emit('scroll', position)
      // console.log(position)
    })

    // 监听上拉界面
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        // console.log('daodi')
      })
    }
  }
}
</script>

<style scoped>

</style>
