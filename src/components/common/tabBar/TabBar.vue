<template>
    <div class="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>
.tab-bar {
  display: flex;
  /* background-color: rgb(220, 221, 221); */
  background-color: #f6f6f6;
  /* width: 375px; */
  position: fixed;
  bottom: 0px;
  right: 0px;
  left: 0px;

  box-shadow: 0px -1px 2px rgba(100, 100, 100, 0.2);
}
</style>
