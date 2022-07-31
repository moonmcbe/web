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
  <n-result status="info" title="申请成功" description="请等待管理员审核"></n-result>
  <div class="name">{{ data?.name }}</div>
  <div class="date">{{ dayjs(data?.date).format('MM-DD HH:mm') }}</div>
</template>

<style lang="less" scoped>
.n-result {
  margin-top: 30px;
}

.name,
.date {
  text-align: center;
}
.name {
  font-size: 20px;
}
</style>