<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  methods: {
    show: function (message, duration = 1500) {
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    /* 居中处理 */
    transform: translate(-50%,-50%);
    padding: 18px 13px;
    background-color: rgba(124, 118, 110, 0.8);
    font-size: 18px;
    z-index: 15;
    color: blanchedalmond;
  }
</style>
