<template>
  <div class="nav-bar">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div class="text">
          分类
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navigationbar/NavBar'

export default {
  name: 'CategoryNavBar',
  components: {
    NavBar
  }
}
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
  }
  .text{
    font-size: 20px;
    color: blanchedalmond;
  }
</style>
