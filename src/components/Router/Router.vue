<script lang="ts" setup>
import { Right } from "@icon-park/vue-next";
import { useStore } from "@/config/store";
import { useMessage } from "naive-ui";

const store = useStore();
const message = useMessage();
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
    <a href="https://moon.liyxi.tk/" target="_blank">
      服务器封禁记录查询
      <Right size="20" bold />
    </a>
    <a href="https://motd.mcxing.cn/detail/2" target="_blank">
      服务器状态
      <Right size="20" bold />
    </a>
    <router-link to="/" @click="message.error('暂未开放')">
      常见问题
      <Right size="20" bold />
    </router-link>
    <router-link v-if="!store.isLogin" to="/login">
      登录
      <Right size="20" bold />
    </router-link>
    <router-link
      class="admin"
      v-if="store.isLogin && store.permissions >= 5"
      to="/admin"
    >
      管理后台
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

    &:nth-child(4) {
      background-color: #d3aa73;
    }

    &:nth-child(5) {
      background-color: #f887e0;
    }

    &:nth-child(6) {
      background-color: #6fd4ca;
    }

    &.admin {
      background-color: #ff9190;
    }
  }
}
</style>