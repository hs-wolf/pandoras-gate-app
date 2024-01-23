<template>
  <div class="flex flex-col gap-1 p-2 border border-black/20 dark:border-white/40 rounded-sm">
    <h1 class="text-xl font-semibold uppercase">
      {{ title }}
    </h1>
    <div :class="breakInColumns ? 'grid grid-cols-2 gap-x-2' : 'flex flex-col'">
      <div v-for="property in properties" :id="`property-${property}`" :key="property" class="flex items-center gap-2">
        <p class="truncate">
          {{ $t(`properties.${property}`).split('_').pop() }}
        </p>
        <span class="text-lg font-semibold">{{ character.getProperty(property) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Character } from '~/types'

const character = defineModel<Character>({ required: true })

defineProps<{ properties: Record<string, string>, title: string, breakInColumns?: true }>()
</script>

<style scoped lang="scss">

</style>
