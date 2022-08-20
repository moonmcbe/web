<script lang="ts" setup>
import { zhCN, dateZhCN } from 'naive-ui'
import getUserInfo from './utils/getUserInfo'

getUserInfo()
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-dialog-provider>
      <n-message-provider>
        <n-loading-bar-provider>
          <Nav></Nav>
          <suspense>
            <router-view></router-view>
            <template #fallback>
              <div>
                <n-skeleton text :repeat="2" /> 
                <n-skeleton text style="width: 60%" />
              </div>
            </template>
          </suspense>
        </n-loading-bar-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style lang="less" scoped>
</style>