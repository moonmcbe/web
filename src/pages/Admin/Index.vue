<script lang="ts" setup>
import overviewApi from '@/apis/overview'
import { ref } from 'vue'

const data = ref<{
  count: number
  status0: number
  status1: number
} | null>(null)

const getOverview = async () => {
  const { data: res } = await overviewApi()
  data.value = res.data
}
getOverview()
</script>

<template>
  <div>总数:{{ data?.count }}</div>
  <div>未验证qq：{{ data?.status0 }}</div>
  <div>待审核{{ data?.status1 }}</div>
</template>

<style lang="less" scoped>
</style>