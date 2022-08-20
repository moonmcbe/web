<script lang="ts" setup>
import { Right } from '@icon-park/vue-next'
const props = defineProps({
  useHref: {
    type: Boolean,
    default: false
  },
  to: String,
  href: String
})
</script>

<template>
  <router-link :to="to || href" v-if="!useHref">
    <slot></slot>
    <Right size="20" bold />
  </router-link>
  <a :href="href || to" v-else target="_blank">
    <slot></slot>
  </a>
</template>

<style lang="less" scoped>
</style>