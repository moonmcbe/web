<script lang="ts" setup>
import queryApi from '../apis/query'
import { ref } from 'vue'
import { useLoadingBar } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import dayjs from 'dayjs'
import { useMessage } from 'naive-ui'

const message = useMessage()

const columns: DataTableColumns = [
  {
    key: 'id',
    title: 'id',
    align: 'center'

  },
  {
    key: 'name',
    title: '游戏ID',
    align: 'center'
  },
  {
    key: 'qq',
    title: 'qq',
    align: 'center'
  },
  {
    key: 'date',
    title: '时间',
    render(e) {
      console.log(e)
      return dayjs(e.date as string).format('YYYY-MM-DD')
    },
    align: 'center'
  }
]

const loadingBar = useLoadingBar()

const data = ref([])
const keyword = ref('')

const query = async () => {
  loadingBar.start()
  data.value = []
  const { data: res } = await queryApi(keyword.value, keyword.value)
  data.value = res.data
  if (res.code != 200) {
    message.error('获取数据失败，请稍后再试')
  }
  if (res.data.length < 1) {
    message.warning('未找到玩家')
  }
  loadingBar.finish()
}
</script>

<template>
  <n-input
    class="search"
    size="large"
    round
    placeholder="输入游戏id或qq"
    v-model:value="keyword"
    @keydown.enter="query"
  />
  <n-data-table class="results" :columns="columns" :data="data" :bordered="false" :scroll-x="500" />
</template>

<style lang="less" scoped>
.search {
  width: 80%;
  margin: 10% auto 50px auto;
  display: block;
}
.results {
  padding: 0 5vw;
  box-sizing: border-box;
}
</style>