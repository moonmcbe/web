<script lang="ts" setup>
import { Right } from '@icon-park/vue-next'
</script>

<template>
  <div class="router">
    <router-link to="/submit">
      白名单申请
      <Right size="20" bold />
    </router-link>
    <router-link to="/search">
      玩家查询
      <Right size="20" bold />
    </router-link>
    <router-link to="/">
      常见问题
      <Right size="20" bold />
    </router-link>
  </div>
</template>

<style lang="less" scoped>
.router {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 90%;
  margin: 20px auto;
  a {
    margin: 10px 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(255, 255, 255);
    text-decoration: none;
    font-size: 14px;
    padding: 0 15px;
    box-sizing: border-box;
    border-radius: 3px;
    &:nth-child(1) {
      background-color: #96d475;
    }
    &:nth-child(2) {
      background-color: #d999ff;
    }
    &:nth-child(3) {
      background-color: #8dc4ff;
    }
  }
}
</style>