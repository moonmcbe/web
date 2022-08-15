<script lang="ts" setup>
import { Right } from '@icon-park/vue-next'
import { useStore } from '@/config/store'
import { useMessage } from 'naive-ui'

const store = useStore()
const message = useMessage()
</script>

<template>
  <div class="router">
    <Link to="/submit">白名单申请</Link>
    <Link to="/search">玩家查询</Link>
    <Link useHref href="https://moon.liyxi.tk/">服务器封禁记录查询</Link>
    <Link useHref href="https://motd.mcxing.cn/detail/2">服务器状态</Link>
    <Link useHref href="https://www.litf.com.cn/p/11">常见问题</Link>
    <Link to="/login" v-if="!store.isLogin">登录</Link>
    <Link to="/admin" v-if="store.isLogin && store.permissions >= 5" class="admin">管理后台</Link>
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