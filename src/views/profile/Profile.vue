<template>
 <div class="profile">
   <profile-nav-bar></profile-nav-bar>
    <profile-user-info></profile-user-info>
   <div class="top">

   </div>
   <div class="text">
     这是个练习vue的学习小项目
   </div>
 </div>
</template>

<script>
import profileNavBar from './childComps/profileNavBar'

import profileUserInfo from './childComps/profileUserInfo'

export default {
  name: 'Profile',
  components: {
    profileNavBar,
    profileUserInfo
  }
}
</script>

<style scoped>
.text{
  font-size: 35px;
  font-weight: bold;
}
</style>
