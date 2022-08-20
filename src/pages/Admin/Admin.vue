<script lang="ts" setup>
import { useStore } from '@/config/store'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { nextTick } from 'vue'
import getUserInfo from '../../utils/getUserInfo'

const store = useStore()
const router = useRouter()
const message = useMessage()

await getUserInfo()
if (!store.isLogin || store.permissions < 5) {
  message.error('请先登录')
  router.push('/login')
}
</script>

<template>
  <div class="admin">
    <admin-menu class="menu" />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
.admin {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 20px;

  .content {
    flex: 1;
    width: 100%;
    overflow: hidden;
  }

  :deep(.menu *) {
    overflow: unset !important;
  }
}
</style>