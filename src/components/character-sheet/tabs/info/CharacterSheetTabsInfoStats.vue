<template>
  <div class="flex flex-col p-2 border border-black/20 dark:border-white/40 rounded-sm">
    <h1 class="text-lg font-semibold">
      {{ $t('components.character-sheet.tabs.info.stats') }}
    </h1>
    <div class="grid grid-cols-2 gap-x-2">
      <div v-for="property in Object.values(STATS_PROPERTIES)" :key="property" class="property">
        <p>{{ $t(`properties.${property}`) }}</p>
        <span>{{ character.getProperty(property) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Character, STATS_PROPERTIES } from '~/types'

const character = defineModel<Character>({ required: true })
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
