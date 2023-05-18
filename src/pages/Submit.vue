<script lang="ts" setup>
import { ref } from 'vue'
import { FormInst, FormItemRule, useMessage, FormRules } from 'naive-ui'
import type { UploadFileInfo } from 'naive-ui'
import submitApi from '../apis/submit'
import { useRouter } from 'vue-router'
import { throttle } from '../utils/throttle'

interface ModelType {
  name: string | null
  qq: string | null
  bili_username: string | null
  bili_uid: string | null
  upload: string | null
  email: string | null
}

const router = useRouter()
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const loading = ref(false)
const model = ref<ModelType>({
  name: null,
  qq: null,
  bili_username: null,
  bili_uid: null,
  upload: null,
  email: null
})

const rules: FormRules = {
  name: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('请填写id')
        } else if (!/^([a-zA-Z])([a-zA-Z0-9 ]{1,14})$/.test(value)) {
          return new Error('id有误')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  qq: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('请填写qq')
        } else if (!/^[1-9][0-9]{4,10}$/.test(value)) {
          return new Error('请输入正确的qq')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  email: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          return new Error('请输入正确的邮箱')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  bili_username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: ['input', 'blur']
    },
    {
      max: 20,
      message: '用户名过长',
      trigger: ['input', 'blur']
    }
  ],
  bili_uid: [
    {
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('请填写uid')
        } else if (!/^[1-9][0-9]{0,19}$/.test(value)) {
          return new Error('请输入正确的uid')
        }
        return true
      },
      required: true,
      trigger: ['input', 'blur']
    }
  ],
  upload: [
    {
      required: true,
      message: '请上传粉丝牌截图',
      trigger: ['upload']
    }
  ]
}

function handleValidateButtonClick(e: MouseEvent) {
  if (loading.value) return
  loading.value = true
  e.preventDefault()
  submit()
}

const uploadUrl = `${import.meta.env.VITE_APP_ApiBaseurl}/upload`

const beforeUpload = (data: {
  file: UploadFileInfo
  fileList: UploadFileInfo[]
}) => {
  if (
    data.file.file?.type !== 'image/png' &&
    data.file.file?.type !== 'image/jpeg'
  ) {
    message.error('只能上传png和jpg格式的图片文件，请重新上传')
    return false
  }
  return true
}

const handleFinish = ({
  file,
  event
}: {
  file: UploadFileInfo
  event?: ProgressEvent
}) => {
  const response = JSON.parse((event?.target as XMLHttpRequest).response)
  console.log(response)
  if (response.code == 200) {
    model.value.upload = ('//' + response.Location) as string
    return {
      ...file,
      ...{
        name: response.fileName,
        url: response.url as string
      }
    }
  } else {
    message.error('上传失败，请稍后再试')
  }
}

const submit = throttle(() => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      // message.success('验证成功')
      const { data: res } = await submitApi(model.value)
      if (res.code == 200) {
        message.success('提交成功')
        router.push({
          path: `/validation/${res.id}`
        })
      }
    } else {
      console.log(errors)
      message.error('表单填写不规范')
      loading.value = false
    }
  })
}, 100)
</script>

<template>
  <steps />
  <div class="red"></div>
  <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item path="name" label="游戏id">
      <n-input v-model:value="model.name" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="qq" label="qq">
      <n-input v-model:value="model.qq" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="email" label="邮箱">
      <n-input
        v-model:value="model.email"
        @keydown.enter.prevent
        placeholder="选填，填写后可接收审核通知"
      />
    </n-form-item>
    <n-form-item path="bili_username" label="b站用户名">
      <n-input v-model:value="model.bili_username" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="bili_uid" label="b站uid">
      <n-input v-model:value="model.bili_uid" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="upload" label="粉丝牌截图">
      <n-upload
        :action="uploadUrl"
        @finish="handleFinish"
        @before-upload="beforeUpload"
        list-type="image-card"
        directory-dnd
        :max="1"
      />
    </n-form-item>
    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <div style="display: flex; justify-content: flex-end">
          <n-button
            :disabled="model.name === null || loading"
            round
            type="primary"
            @click="handleValidateButtonClick"
            >提交</n-button
          >
        </div>
      </n-col>
    </n-row>
  </n-form>
</template>

<style lang="less" scoped>
.red {
  color: red;
}

.n-form {
  padding: 5px;
  box-sizing: border-box;
}
</style>
