<script lang="ts" setup>

</script>

<template>
  <nav @click="$router.push('/')">
    <img src="https://www.litf.com.cn/img/logo.d05ba22d.webp" />
    庄主基岩服
  </nav>
</template>

<style lang="less" scoped>
nav {
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(170, 170, 170, 0.397);
  img {
    width: 50px;
  }
}
</style>