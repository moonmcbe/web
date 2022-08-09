<script lang="ts" setup>
import { get as getApi } from '@/apis/players'
import { ref, h, watch } from 'vue'
import dayjs from 'dayjs'
import type { DataTableColumns } from 'naive-ui'
import { NTag, useDialog, useLoadingBar } from 'naive-ui'

const data = ref<Data[]>([])
const keyword = ref('')
const oldPlayer = ref(false)
const filter = ref<Data[]>([])
const pagination = ref({
  page: 1,
  pageSize: 8,
  showSizePicker: true,
  pageSizes: [5, 8, 10],
  onChange: (page: number) => {
    pagination.value.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.value.pageSize = pageSize
    pagination.value.page = 1
  }
})
const dialog = useDialog()
const loadingbar = useLoadingBar()

const init = async () => {
  loadingbar.start()
  const { data: res } = await getApi(oldPlayer.value)
  data.value = res.data
  loadingbar.finish()
}
init()

interface Data {
  id: number;
  name: string;
  date: string;
  user_id: number;
  status: number;
  qq?: any;
  credit_points?: number;
  join_type: number;
  score?: number;
  xuid?: string;
}

watch([() => keyword.value, () => data.value], ([keyword, data]) => {
  if (keyword.trim() == '') {
    filter.value = data
  } else {
    filter.value = data.filter(e => {
      return !(
        (e.name || '')?.toLowerCase().indexOf(keyword.toLowerCase()) == -1 &&
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
      return dayjs(row.date as any).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    title: '信誉积分',
    key: 'credit_points'

  },
  {
    title: '来源',
    key: 'join_type',
    render(row) {
      //       - 0 未知
      // - 1 老玩家
      // - 2 答题 https://docs.qq.com/sheet/DR3pDQXpjdmRmVkd0
      // - 3 金山文档答题 https://www.kdocs.cn/l/cocyUca029be?from=docs
      // - 4 问卷网答题
      // - 5 腾讯文档 https://docs.qq.com/sheet/DR2pzSk9IWmFxdnNI
      // - 6 机器人
      // - 10 内推?
      let text = ''
      switch (row.join_type) {
        case 1:
          text = '老玩家'
          break
        case 2:
          text = '腾讯文档答题'
          break
        case 3:
          text = '金山文档答题'
          break
        case 4:
          text = '问卷网答题'
          break
        case 5:
          text = '腾讯文档'
          break
        case 6:
          text = '机器人'
          break
        case 10:
          text = '其他途径'
          break
        default:
          text = '其他'
          break
      }
      return h(NTag, {}, () => text)
    }
  },
  {
    title: '分数',
    key: 'score'
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

const loadOldPlayer = () => {
  if (oldPlayer.value) {
    dialog.warning({
      title: '即将加载所有玩家数据',
      content: '咱就是说 为什么这个组件库不能换行！       ①即将加载所有玩家信息，由于数据过大，加载时间较长，请耐心等待      ②由于时间跨度较大，部分数据可能不准确，仅供参考      ③分数、来源、信用分等均为历史数据',
      positiveText: '确定',
      negativeText: '不确定',
      onPositiveClick: () => {
        // 
      },
      onNegativeClick: () => {
        // 
      }
    })
  }
  init()
}
</script>

<template>
  <n-input v-model:value="keyword" placeholder="过滤name/qq/id"></n-input>
  <div>
    显示其他渠道玩家
    <n-checkbox v-model:checked="oldPlayer" @update:checked="loadOldPlayer"></n-checkbox>
  </div>
  <n-data-table
    class="table"
    :columns="columns"
    :data="filter"
    :bordered="false"
    :scroll-x="1000"
    :pagination="pagination"
  />
</template>

<style lang="less" scoped>
</style>