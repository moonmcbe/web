<script lang="ts" setup>
import { get as getApi } from '@/apis/audit'
import { ref, h } from 'vue'
import { NImage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import dayjs from 'dayjs'

type Data = {
  id: number;
  name: string;
  qq: string;
  bili_username: string;
  bili_uid: number;
  upload: string;
  status: number;
  date: string;
  judge?: any;
}

const data = ref<Data[]>([])

const init = async () => {
  const { data: res } = await getApi()
  data.value = res.data
}
init()

const columns: DataTableColumns<Data> = [
  {
    title: 'id',
    key: 'id'
  },
  {
    title: '游戏ID',
    key: 'name'
  },
  {
    title: 'qq',
    key: 'qq'
  },
  {
    title: 'b站用户名',
    key: 'bil_username'
  },
  {
    title: 'b站uid',
    key: 'bili_uid'
  },
  {
    title: '粉丝牌截图',
    key: 'upload',
    className: 'upload',
    render(row) {
      return h(
        NImage,
        {
          class: 'image',
          src: row.upload
        }

      )
    }
  },
  {
    title: '提交时间',
    key: 'date',
    render(row) {
      return dayjs(row.date).format('MM-DD HH:mm:ss')
    }
  }
]
</script>

<template>
  <n-data-table class="table" :columns="columns" :data="data" :bordered="false" :scroll-x="1000" />
</template>

<style lang="less" scoped>
:deep(.image) {
  width: 100px;
  height: 100px;
}
</style>