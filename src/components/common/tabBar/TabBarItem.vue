<template>
   <div class="tab-bar-item" @click="itemClick">
     <div v-if="!isActivated"><slot name="item-icon"></slot></div>
     <div v-else><slot name="item-icon-active"></slot></div>
     <!-- //多套一层是因为，到时候插入的时候会直接覆盖slot标签，可能会失去类绑定 -->
     <div :style="activeStyle" >
       <slot name="item-text"></slot>
     </div>
    </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      msg: 'aaa'
    }
  },
  computed: {
    isActivated () {
      // console.log(this.$route.path)
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      // console.log(this.isActivated ? {color: this.activeColor} : {})
      return this.isActivated ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick () {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>

 .tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}

.tab-bar-item img {
  margin-top: 5px;
  height: 23px;
  width: 23px;
}
</style>
