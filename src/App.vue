<script lang="ts" setup>
import { zhCN, dateZhCN } from 'naive-ui'
import getUserInfo from './utils/getUserInfo'
getUserInfo()
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <n-loading-bar-provider>
        <Nav></Nav>
        <router-view></router-view>
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="less" scoped>
</style>