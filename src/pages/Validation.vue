<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import validationApi from '../apis/validation'
import { useMessage } from 'naive-ui'

const route = useRoute()
const message = useMessage()

const id = route.params.id
const value = ref('')

const validation = async () => {
  const { data: res } = await validationApi(id as string, value.value)
  if (res.code == 200) {
    if (res.msg) {
      message.success(res.msg)
    } else {
      message.success('提交成功，等待管理员审核')
    }
  } else {
    if (res.msg) {
      message.error(res.msg)
    } else {
      message.error('提交失败，请稍后再试')
    }
  }
}
</script>

<template>
  <steps :current="2" />
  <div class="form">
    <p>请使用填写的qq号向群中的 人工智障 发送“获取验证码”</p>
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