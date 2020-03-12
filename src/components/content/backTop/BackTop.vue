<template>
  <div class="back-top" >
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style scoped>
.back-top img{
  position: fixed;
  z-index: 10;
  right: 15px;
  bottom: 50px;
  width: 50px;
  height: 50px;
}
</style>
