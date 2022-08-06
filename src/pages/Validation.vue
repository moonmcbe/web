<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import validationApi from '../apis/validation'
import { useMessage } from 'naive-ui'
import { Copy } from '@icon-park/vue-next'
import { useClipboard } from '@vueuse/core'
import checkApi from '../apis/check'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const { copy } = useClipboard()

const id = route.params.id
const value = ref('')
const href = ref(location.href)

const copyHref = () => {
  copy(location.href)
}
// 主动帮用户复制
copyHref()

const validation = async () => {
  const { data: res } = await validationApi(id as string, value.value)
  if (res.code == 200) {
    if (res.msg) {
      message.success(res.msg)
    } else {
      message.success('提交成功，等待管理员审核')
      router.push(`/check/${id}`)
    }
  } else {
    if (res.msg) {
      message.error(res.msg)
    } else {
      message.error('提交失败，请稍后再试')
    }
  }
}

const check = async () => {
  const { data: res } = await checkApi(id as string)
  if (res.code == 200) {
    if (res.data.status != 0) {
      router.push(`/check/${id}`)
    }
  } else {
    message.error('数据获取失败，请稍后再试')
  }
}
check()
</script>

<template>
  <steps :current="2" />
  <div class="form">
    <p>请使用填写的qq号向群中的 人工智障 发送“获取验证码”</p>

    <p>
      若需退出当前界面，请复制链接，以便继续操作
      <n-input-group @click="copyHref">
        <n-input :value="href" readonly />
        <n-button>
          <Copy />
        </n-button>
      </n-input-group>
    </p>
    <n-form-item label="验证码">
      <n-input v-model:value="value" type="text" placeholder="请输入验证码" />
    </n-form-item>
    <n-button type="primary" @click="validation">确定</n-button>
  </div>
</template>

<style lang="less" scoped>
.form {
  padding: 0 5px;
  box-sizing: border-box;
}
</style>