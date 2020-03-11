<template>
  <div class="swiper" >
    <div class="swiper-img" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>

    <slot name="indicator">
    </slot>
      <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script>
// 轮播图封装的整体框架
export default {
  name: 'Swiper',
  props: {
    // 间隔时间
    interval: {
      type: Number,
      default: 5000
    },
    // 动画持续时间/延迟时间
    animDuration: {
      type: Number,
      default: 500
    },
    // 移动比例，用于判断是否切页
    moveRatio: {
      type: Number,
      default: 0.25
    },
    // 是否展现小圆点
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      slideCount: 0, // 元素个数
      totalWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前的index
      scrolling: false // 是否正在滚动
    }
  },
  // 挂载生命函数
  mounted () {
    // 延迟函数
    setTimeout(() => {
      // 先将轮播图开头第一个复制一份到最后面
      this.handleDOM()
      // 开启定时器
      this.startTimer()
    }, 100)
  },
  methods: {
    /*  */
    /* 定时器设置 */
    /*  */
    startTimer: function () {
      this.playTimer = setInterval(() => {
        this.currentIndex++
        // console.log(this.currentIndex)
        this.scrollSider(-this.currentIndex * this.totalWidth)
        // console.log(this.swiperStyle)
      }, this.interval)
    },
    // 关闭定时器
    stopTimer: function () {
      window.clearInterval(this.playTimer)
    },

    /*
     滑动轮播图片
      */
    scrollSider: function (currentPosition) {
      // 0.修改运动状态
      this.scrolling = true
      //
      // 1.开始动画滚动,设置移动的x轴的transform属性
      this.swiperStyle.transition = ' all ' + this.animDuration + 'ms ease 0s'
      this.setTransform(currentPosition)
      /*  */
      /* 2.校正当前的页面滚动的位置
        当超出页面时及时回拉
      */
      setTimeout(() => {
        this.checkPosition()
      }, this.animDuration)

      // 3.完成滚动
      this.scrolling = false
    },

    /*
      判断当前滚动的位置
     */
    checkPosition: function () {
      // 加个延时器，等动画的运行时间结束后开始校准当前的图片位置
      window.setTimeout(() => {
        // 1.校准正确的位置
        //    a.先停止css的transition的运动
        this.swiperStyle.transition = '0ms'

        // 开始判断当前的位置是否已经到头,currentIndex是从1开始计算的
        if (this.currentIndex >= this.slideCount + 1) {
          // 当前已经到达了图片列表的最后，此时需要瞬转到原本的currentIndex=1的位置
          this.currentIndex = 1
          // 将整体的图片列表移回原处
          this.setTransform(-this.currentIndex * this.totalWidth)
        } else if (this.currentIndex <= 0) {
          // 即当滑动已经到了最左边的克隆的图片的时候需要瞬转到图片列表的倒数第二个位置，即原本的最后一个图片
          this.currentIndex = this.slideCount
          this.setTransform(-this.currentIndex * this.totalWidth)
        }
      }, this.animDuration)
    },

    /*
    通过css来完成滚动
    */
    setTransform: function currentPosition (position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`
    },

    /*
    操作dom元素修改轮播图的图片
     */
    handleDOM () {
      // 用于操作dom元素给轮播图的图片首尾加图片
      // 获取整个轮播大框架
      const swiper = document.querySelector('.swiper-img')
      // 获取单个滑动的图片
      const imagesList = swiper.getElementsByClassName('slide')
      // 判断当前的图片个数
      // console.log('开始' + this.slideCount)
      this.slideCount = imagesList.length
      // 如果图片个数大于一个
      // console.log('加后' + this.slideCount)
      // console.log(this.slideCount)
      if (this.slideCount > 1) {
        // 将第一个和最后一个克隆
        var cloneFirst = imagesList[0].cloneNode(true)
        var cloneLast = imagesList[this.slideCount - 1].cloneNode(true)
        swiper.insertBefore(cloneLast, imagesList[0])
        swiper.appendChild(cloneFirst)
        this.totalWidth = swiper.offsetWidth
        this.swiperStyle = swiper.style
      }
      // console.log(typeof this.slideCount)

      // 然swiper显示第一个图片
      this.setTransform(-this.totalWidth)
    },

    /*
    *
    *下面进行接触事件监听
    *
    */

    //  刚点击时
    touchStart: function (e) {
      // 1.如果正在滚动, 不可以拖动
      if (this.scrolling) return
      // 2.停止定时器
      this.stopTimer()
      // 3.保存开始滚动的位置,即接触到屏幕的x轴位置
      this.startX = e.touches[0].pageX
    },

    // 拖动轮播图片的时候
    touchMove: function (e) {
      // 1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX
      this.distance = this.currentX - this.startX
      const currentPosition = -this.currentIndex * this.totalWidth
      const moveDistance = this.distance + currentPosition
      // 2.设置当前的位置
      this.setTransform(moveDistance)
    },

    // 拖动结束时的位置
    touchEnd: function (e) {
      // 计算整个拖动移动的距离,取绝对值
      const currentMove = Math.abs(this.distance)

      // 根据移动的距离判断是否要移动图片修改currentIdex
      if (this.distance === 0) {
        return 1
      } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 右边移动超过0.5
        this.currentIndex--
      } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.5
        this.currentIndex++
      }

      // 根据currentIdex移动到正确位置
      this.scrollSider(-this.currentIndex * this.totalWidth)

      // 完成后重启定时器
      this.startTimer()
    },

    /**
     * 控制上一个, 下一个
     */
    previous: function () {
      this.changeItem(-1)
    },
    next: function () {
      this.changeItem(1)
    },
    changeItem: function (num) {
      // 1.移除定时器
      this.stopTimer()
      // 2.修改index和位置
      this.currentIndex += num
      this.scrollSider(-this.currentIndex * this.totalWidth)
      // 3.添加定时器
      this.startTimer()
    }
  }
}
</script>

<style>
.swiper {
  width: 100%;
  /* border-top: 2px rgb(100, 100, 100) solid; */
  /* box-shadow: 10px 0 10px rgbas(100, 100, 100, 0.1); */
  overflow: hidden;
  position: relative;
}
.swiper-img {
  display: flex;
}
.indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}
.indi-item.active {
  background-color: rgba(212,62,46,1.0);
}
</style>
