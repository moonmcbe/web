<script lang="ts" setup>
import { get as getApi, set as setApi } from '@/apis/audit'
import { ref, h } from 'vue'
import { NImage, NButton, useMessage } from 'naive-ui'
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
  email?: string
}

const data = ref<Data[]>([])
const message = useMessage()
const showModal = ref(false)
const cause = ref('')
const id = ref(-1)
const text = [
  '无法验证粉丝牌，请规范上传图片，可查看“常见问题”中的示例，可修改后重新申请',
  'id格式有误，请正确填写游戏id，请修改后重新申请',
  'b站用户名与uid不符，请核对后重新申请'
]

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
    title: '邮箱',
    key: 'email'
  },
  {
    title: 'b站用户名',
    key: 'bili_username',
    render(row) {
      return h('a', {
        href: `https://search.bilibili.com/upuser?keyword=${row.bili_username}`,
        target: '_blank'
      },
        row.bili_username
      )
    }
  },
  {
    title: 'b站uid',
    key: 'bili_uid',
    render(row) {
      return h('a', {
        href: `https://space.bilibili.com/${row.bili_uid}`,
        target: '_blank'
      },
        row.bili_uid.toString()
      )
    }
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
  },
  {
    title: '操作',
    key: '操作',
    render(row) {

      return h('div', {},
        [
          h(
            NButton,
            {
              type: 'success',
              onClick: () => allow(row.id, true)
            },
            () => '通过'
          ),
          h(
            NButton,
            {
              type: 'error',
              onClick: () => allow(row.id, false)
            },
            () => '拒绝')
        ]
      )
    }
  }
]

const allow = async (key: number, allow: boolean) => {
  id.value = key
  if (allow) {
    const { data: res } = await setApi(key, allow)
    if (res.code == 200) {
      message.success('成功')
      init()
    } else {
      message.error('失败')
    }
  } else {
    showModal.value = true
  }
}

const deny = async () => {
  showModal.value = false
  const { data: res } = await setApi(id.value, false, cause.value)
  if (res.code == 200) {
    message.success('成功')
    init()
  } else {
    message.error('失败')
  }
}

const setText = (text: string) => {
  cause.value = text
}
</script>

<template>
  <n-data-table class="table" :columns="columns" :data="data" :bordered="false" :scroll-x="1000" />

  <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
    <template #header>
      <div>原因</div>
    </template>
    <div>原因将会通知玩家</div>
    <n-input v-model:value="cause" />
    <div v-for="(item, index) in text" :key="index">
      <n-button @click="setText(item)">{{ item }}</n-button>
    </div>
    <template #action>
      <n-button @click="showModal = false">取消</n-button>
      <n-button type="success" @click="deny()">确定</n-button>
    </template>
  </n-modal>
</template>

<style lang="less" scoped>
:deep(.image) {
  width: 100px;
  height: 100px;
}
</style>