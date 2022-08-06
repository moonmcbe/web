<script lang="ts" setup>
import { get as getApi } from '@/apis/players'
import { ref, h, watch } from 'vue'
import dayjs from 'dayjs'
import type { DataTableColumns } from 'naive-ui'
import { NTag } from 'naive-ui'

const data = ref<Data[]>([])

const init = async () => {
  const { data: res } = await getApi()
  data.value = res.data
}
init()

interface Data {
  id: number;
  name: string;
  date: string;
  user_id: number;
  status: number;
  qq?: any;
}

const keyword = ref('')

const filter = ref<Data[]>([])
// computed(() => {
//   console.log(111)

//   if (keyword.value.trim() == '') return data.value
//   console.log(22)

//   return data.value.filter(e => {
//     return !e.name.includes(keyword.value) || !e.qq.includes(keyword.value)
//   })
// })
watch([() => keyword.value, () => data.value], ([keyword, data]) => {
  if (keyword.trim() == '') {
    filter.value = data
  } else {
    filter.value = data.filter(e => {
      return !(
        (e.name || '')?.indexOf(keyword) == -1 &&
        (e.qq || '')?.indexOf(keyword) == -1 &&
        (e.id || '')?.toString().indexOf(keyword) == -1
      )
    })
  }
})

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
  // {
  //   title: '粉丝牌截图',
  //   key: 'upload',
  //   className: 'upload',
  //   render(row) {
  //     return h(
  //       NImage,
  //       {
  //         class: 'image',
  //         src: row.upload
  //       }

  //     )
  //   }
  // },
  {
    title: '状态',
    key: 'status',
    render(row: Data) {
      const data: {
        type?: 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'
        text: string
      } = {
        type: undefined,
        text: ''
      }
      if (row.status == 0) {
        data.type = undefined
        data.text = '未验证'
      }
      if (row.status == 1) {
        data.type = 'success'
        data.text = '正常'
      }
      if (row.status == 2) {
        data.type = 'warning'
        data.text = '临时封禁'
      }
      if (row.status == 3) {
        data.type = 'error'
        data.text = '永久封禁'
      }
      if (row.status == 4) {
        data.type = 'info'
        data.text = '其他'
      }

      return h(NTag, {
        type: data.type
      }, () => data.text)
    }
  },
  {
    title: '提交时间',
    key: 'date',
    render(row) {
      return dayjs(row.date as any).format('MM-DD HH:mm:ss')
    }
  }
  // {
  //   title: '操作',
  //   key: '操作',
  //   render(row) {

  //     return h('div', {},
  //       [
  //         h(
  //           NButton,
  //           {
  //             type: 'success',
  //             onClick: () => allow(row.id, true)
  //           },
  //           () => '通过'
  //         ),
  //         h(
  //           NButton,
  //           {
  //             type: 'error',
  //             onClick: () => allow(row.id, false)
  //           },
  //           () => '拒绝')
  //       ]
  //     )
  //   }
  // }
]
</script>

<template>
  <n-input v-model:value="keyword" placeholder="过滤name/qq/id"></n-input>
  <n-data-table class="table" :columns="columns" :data="filter" :bordered="false" :scroll-x="1000" />
</template>

<style lang="less" scoped>
</style>