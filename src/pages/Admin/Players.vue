<script lang="ts" setup>
import { get as getApi } from '@/apis/players'
import setStatusApi from '@/apis/setStatus'
import editNameApi from '@/apis/editName'
import { ref, h, watch } from 'vue'
import dayjs from 'dayjs'
import type { DataTableColumns } from 'naive-ui'
import { NTag, useDialog, useLoadingBar, NButton, useMessage } from 'naive-ui'
import statusType, { statusTypes } from '@/utils/statusType'

const data = ref<Data[]>([])
const keyword = ref('')
const oldPlayer = ref(false)
const filter = ref<Data[]>([])
const pagination = ref({
  page: 1,
  pageSize: 8,
  showSizePicker: true,
  pageSizes: [5, 8, 10, 50, 100],
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
const message = useMessage()

const init = async () => {
  loadingbar.start()
  const { data: res } = await getApi(oldPlayer.value)
  data.value = res.data
  loadingbar.finish()
}
init()

interface Data {
  id: number
  name: string
  date: string
  user_id: number
  status: number
  qq?: any
  credit_points?: number
  join_type: number
  score?: number
  xuid?: string
}

watch([() => keyword.value, () => data.value], ([keyword, data]) => {
  if (keyword.trim() == '') {
    filter.value = data
  } else {
    filter.value = data.filter((e) => {
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
      return h(
        NTag,
        {
          type: statusType(row.status).type
        },
        () => statusType(row.status).text
      )
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
  },
  {
    title: '操作',
    key: '操作',
    render(row) {
      return h('div', {}, [
        h(
          NButton,
          {
            type: 'success',
            onClick: () => editName.open(row.id, row.name)
          },
          () => '改名字'
        )
        ,
        h(
          NButton,
          {
            type: 'success',
            onClick: () => editStatus.open(row.id, row.status, row.name)
          },
          () => '改状态'
        )])
    }
  }
]

const loadOldPlayer = () => {
  if (oldPlayer.value) {
    dialog.warning({
      title: '即将加载所有玩家数据',
      content: () =>
        h('div', {}, [
          h('div', {}, '咱就是说 又可以换行了'),
          h('div', {}, '①即将加载所有玩家，数据过大，加载时间较长，请耐心等待'),
          h('div', {}, '②由于时间跨度较大，部分数据可能不准确，仅供参考'),
          h('div', {}, '③分数、来源、信用分等均为历史数据')
        ]),
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
const editName = {
  show: ref(false),
  id: ref(0),
  newName: ref(''),
  oldName: ref(''),
  open(id: number, oldName: string) {
    this.id.value = id
    this.newName.value = ''
    this.oldName.value = oldName
    this.show.value = true
  },
  async submit() {
    loadingbar.start()
    const { data: res } = await editNameApi(
      this.id.value.toString(),
      this.newName.value
    )
    console.log(res)
    if (res.code == 200) {
      message.success('修改成功')
    } else {
      message.warning(`${res.code} ${res.msg}`)
    }
    loadingbar.finish()
    init()
  },
  cancel() {
    this.id.value = 0
    this.newName.value = ''
    this.oldName.value = ''
    this.show.value = false
  }
}
const editStatus = {
  show: ref(false),
  id: ref(0),
  name: ref(''),
  duration: ref('0'),
  cause: ref(''),
  note: ref(''),
  oldStatus: ref(0),
  newStatus: ref(0),
  options: statusTypes.map((e, i) => {
    return {
      label: i + e.text,
      value: i
    }
  }),
  open(id: number, oldStatus: number, name: string) {
    this.oldStatus.value = oldStatus
    this.newStatus.value = oldStatus
    this.id.value = id
    this.name.value = name
    this.show.value = true
  },
  cancel() {
    this.oldStatus.value = 0
    this.newStatus.value = 0
    this.id.value = 0
    this.name.value = ''
    this.show.value = false
  },
  async submit() {
    loadingbar.start()
    const { data: res } = await setStatusApi(
      this.id.value.toString(),
      this.newStatus.value,
      this.duration.value,
      this.note.value,
      this.cause.value
    )
    console.log(res)
    if (res.code == 200) {
      message.success('修改成功')
    } else {
      message.warning(`${res.code} ${res.msg}`)
    }
    loadingbar.finish()
    init()
  }
}
</script>

<template>
  <n-input v-model:value="keyword" placeholder="过滤name/qq/id"></n-input>
  <div>
    显示其他渠道玩家
    <n-checkbox v-model:checked="oldPlayer" @update:checked="loadOldPlayer"></n-checkbox>
  </div>
  <n-data-table class="table" :columns="columns" :data="filter" :bordered="false" :scroll-x="1000"
    :pagination="pagination" />
  <n-modal v-model:show="editName.show.value" preset="dialog" title="改名字" positive-text="确认" negative-text="算了"
    @positive-click="() => editName.submit()" @negative-click="() => editName.cancel()">
    <n-input :value="editName.oldName.value" readonly />
    <br />
    <br />
    <n-input placeholder="新名字" v-model:value="editName.newName.value" />
  </n-modal>
  <n-modal v-model:show="editStatus.show.value" preset="dialog" title="改状态" positive-text="确认" negative-text="算了"
    @positive-click="() => editStatus.submit()" @negative-click="() => editStatus.cancel()">
    <n-space vertical>
      <div class="title">
        将{{ editStatus.id }} {{ editStatus.name }} 的状态从
        <n-tag :type="statusType(editStatus.oldStatus.value).type">
          {{ statusType(editStatus.oldStatus.value).text }}
        </n-tag>
        修改为：
      </div>
      <n-select v-model:value="editStatus.newStatus.value" :options="editStatus.options" />
      <template v-if="editStatus.newStatus.value == 1">
        将添加白名单
      </template>
      <template v-else>
        将删除白名单
      </template>
      <template v-if="editStatus.newStatus.value == 5">
        玩家重新进群，可自助添加白名单
      </template>
      <template v-if="editStatus.newStatus.value == 2 || editStatus.newStatus.value == 3">
        封禁持续时间，单位毫秒(1000ms = 1s)
        <n-input v-model:value="editStatus.duration.value" placeholder="封禁持续时间，单位毫秒"></n-input>
        <div class="buttons">
          <n-button @click="editStatus.duration.value = '86400000'">1天</n-button>
          <n-button @click="editStatus.duration.value = '259200000'">3天</n-button>
          <n-button @click="editStatus.duration.value = '432000000'">5天</n-button>
          <n-button @click="editStatus.duration.value = '604800000'">7天</n-button>
          <n-button @click="editStatus.duration.value = '864000000'">10天</n-button>
          <n-button @click="editStatus.duration.value = '2592000000'">30天</n-button>
        </div>
        原因（将会向玩家展示）
        <n-input v-model:value="editStatus.cause.value" placeholder="原因（将会向玩家展示）"></n-input>
        备注（不会向玩家展示），请完整详细填写
        <n-input v-model:value="editStatus.note.value" placeholder="备注（不会向玩家展示）"></n-input>
      </template>
    </n-space>
  </n-modal>
</template>

<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;
}

.buttons {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
