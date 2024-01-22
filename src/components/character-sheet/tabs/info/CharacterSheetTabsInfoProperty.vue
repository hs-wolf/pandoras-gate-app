<template>
  <div class="flex flex-col p-2 border border-black/20 dark:border-white/40 rounded-sm">
    <h1 class="text-lg font-semibold">
      {{ title }}
    </h1>
    <div v-for="property in properties" :key="property" class="property">
      <p>{{ $t(`properties.${property}`) }}</p>
      <span>{{ character.getProperty(property) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Character } from '~/types'

const character = defineModel<Character>({ required: true })

defineProps<{ properties: Record<string, string>, title: string }>()
</script>

<style scoped lang="scss">
.property {
  @apply flex items-center gap-1;
  p {
    @apply truncate text-sm;
  }
  span {
    @apply text-base font-semibold;
  }
}
</style>
