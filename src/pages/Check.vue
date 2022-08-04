<script lang="ts" setup>
import { useRoute } from 'vue-router'
import checkApi from '../apis/check'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'
import dayjs from 'dayjs'

const route = useRoute()
const message = useMessage()

const id = route.params.id
const data = ref<{
  id: number
  name: string
  qq: string
  bili_username: string
  bili_uid: number
  upload: string
  status: number
  date: Date
  judge: number
  cause?: string
} | null>(null)

const check = async () => {
  const { data: res } = await checkApi(id as string)
  if (res.code == 200) {
    data.value = res.data
  } else {
    message.error('数据获取失败，请稍后再试')
  }
}
check()
</script>

<template>
  <steps :current="3" />
  <template v-if="data?.status == 1">
    <n-result status="info" title="申请成功" description="请等待管理员审核"></n-result>
    <div class="name">{{ data?.name }}</div>
    <div class="date">{{ dayjs(data?.date).format('MM-DD HH:mm') }}</div>
  </template>
  <template v-if="data?.status == 2">
    <n-result status="success" title="已通过" description="祝您玩的开心~"></n-result>
    <div class="name">{{ data?.name }}</div>
    <div class="date">{{ dayjs(data?.date).format('MM-DD HH:mm') }}</div>
  </template>
  <template v-if="data?.status == 3">
    <n-result status="500" title="审核未通过" description="建议您修改后重新尝试，若有异议请联系管理"></n-result>
    <div class="name">{{ data?.name }}</div>
    <div class="judge">审核人ID:{{ data?.judge }}</div>
    <div class="cause" v-if="data?.cause">原因:{{ data?.cause }}</div>
    <div class="date">{{ dayjs(data?.date).format('MM-DD HH:mm') }}</div>
  </template>
</template>

<style lang="less" scoped>
.n-result {
  margin-top: 30px;
}

.name,
.date,
.cause,
.judge {
  text-align: center;
}
.name {
  font-size: 20px;
}
</style>