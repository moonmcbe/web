<script lang="ts" setup>
import { useStore } from '@/config/store'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'

const store = useStore()
const router = useRouter()
const message = useMessage()

if (!store.isLogin || store.permissions < 5) {
  message.error('请先登录')
  router.push('/login')
}
</script>

<template>
  admin
  <router-view></router-view>
</template>

<style lang="less" scoped>
</style>