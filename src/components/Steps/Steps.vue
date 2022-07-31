<script lang="ts" setup>
const props = defineProps({
  current: {
    type: Number,
    default: 1
  },
  currentStatus: {
    type: String,
    default: 'process',
    validator: (e: string) => ['process', 'finish', 'error', 'wait'].indexOf(e) != -1
  }
})
</script>

<template>
  <n-steps :current="current" :status="currentStatus" size="small">
    <n-step title="填写表单" />
    <n-step title="验证qq号" />
    <n-step title="管理员审核" />
  </n-steps>
</template>

<style lang="less" scoped>
.n-steps {
  margin-top: 8px;
  padding: 5px;
  box-sizing: border-box;
}
</style>