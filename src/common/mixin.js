import { debounce } from 'common/utils'
import { BackTop } from 'components/content/backTop/BackTop.vue'
import { BACKTOP_DISTANCE } from 'common/const.js'

export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted () {
    // 1.图片加载监听
    // 防抖动函数,通过这个refresh函数能很好的减少调用refresh的频率
    this.refresh = debounce(this.$refs.scroll.refresh, 250)
    // 监听图片加载
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('混入')
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isBackTopShow: false
    }
  },
  methods: {
    backClick: function () {
      console.log(123)
      // 直接用refs调用指定标签的方法,第三个参数是时间毫秒
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenBackTop: function (position) {
      if (position.y < -BACKTOP_DISTANCE) {
        this.isBackTopShow = true
      } else {
        this.isBackTopShow = false
      }
    }
  }
}

export const itemListenerAndBackTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isBackTopShow: false,
      itemImgListener: null,
      refresh: null
    }
  },
  methods: {
    backClick: function () {
      console.log(123)
      // 直接用refs调用指定标签的方法,第三个参数是时间毫秒
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenBackTop: function (position) {
      if (position.y < -BACKTOP_DISTANCE) {
        this.isBackTopShow = true
      } else {
        this.isBackTopShow = false
      }
    }
  },
  mounted () {
    // 1.图片加载监听
    // 防抖动函数,通过这个refresh函数能很好的减少调用refresh的频率
    this.refresh = debounce(this.$refs.scroll.refresh, 250)
    // 监听图片加载
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('混入')
  }
}
