<template>
  <div v-if="property" v-auto-animate class="flex flex-col border border-black/20 dark:border-white/40 rounded-sm text-sm md:text-base">
    <button
      :id="`menu-${property.type}`"
      type="button"
      class="flex items-center justify-between p-2 transition-colors"
      :class="{ 'bg-black/20 dark:bg-white/40 text-black dark:text-white': showOperations }"
      @click.prevent="showOperations = !showOperations"
    >
      <span class="font-semibold">
        {{ $t(`properties.${property.type}`).split("_").join(' ') }}
      </span>
      <NuxtIcon name="chevron-down" class="text-xl transition-transform" :class="{'rotate-180': showOperations }" />
    </button>
    <div v-if="showOperations" class="flex flex-col">
      <CharacterSheetPropertyCardOperation
        v-for="(operation, index) in property.operations"
        :key="operation.id"
        v-model="property.operations[index]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IProperty } from '~/types'

const property = defineModel<IProperty>({ required: true })

const showOperations = ref(false)
</script>

<style scoped>

</style>
