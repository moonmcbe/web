<script lang="ts" setup>
import { ref } from 'vue'
import loginApi from '../apis/login'
import { useMessage } from 'naive-ui'
import getUserInfo from '@/utils/getUserInfo'
import { useRouter } from 'vue-router'
import { useStore } from '@/config/store'

const message = useMessage()
const router = useRouter()
const store = useStore()

const data = ref({
  qq: '',
  code: '',
  keepLogin: false
})

const login = async () => {
  const { data: res } = await loginApi(data.value.qq.trim(), data.value.code.trim(), data.value.keepLogin)
  if (res.code == 200) {
    localStorage.setItem('token', res.token)
    message.success('登录成功')
    getUserInfo()
    if (store.permissions >= 5) {
      router.push('/admin')
    } else {
      router.push('/')
    }
  } else {
    if (res.msg) {
      message.error(res.msg)
    } else {
      message.error('登录失败，请联系管理员')
    }
  }
}
</script>

<template>
  <n-form-item path="qq" label="qq">
    <n-input v-model:value="data.qq" @keydown.enter.prevent />
  </n-form-item>
  <n-form-item path="code" label="验证码">
    <n-input v-model:value="data.code" @keydown.enter.prevent />
  </n-form-item>
  <n-checkbox v-model:checked="data.keepLogin">保持登录状态</n-checkbox>
  <br />
  <br />
  <n-button @click="login">登录</n-button>
</template>

<style lang="less" scoped>
</style>