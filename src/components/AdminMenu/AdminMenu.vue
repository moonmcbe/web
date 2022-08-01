<script lang="ts" setup>
import { h, Component, ref } from 'vue'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import { Home, Audit } from '@icon-park/vue-next'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/admin'
          }
        },
        { default: () => '首页' }
      ),
    key: 'go-back-home',
    icon: renderIcon(Home)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/admin/'
          }
        },
        { default: () => '白名单审核' }
      ),
    key: 'go-to-work',
    icon: renderIcon(Audit)
  }
]

const collapsed = ref(true)

</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
      />
    </n-layout-sider>
  </n-layout>
</template>

<style lang="less" scoped>
</style>