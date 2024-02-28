<template>
  <div v-if="property" v-auto-animate class="flex flex-col gap-0.5">
    <button
      type="button"
      class="flex items-center justify-between px-3 py-2 bg-primary-dark text-white rounded-sm"
      @click.prevent="showOperations = !showOperations"
    >
      <span class="font-semibold">
        {{ $t(`properties.${property.type}`).split("_").join(' ') }}
      </span>
      <NuxtIcon name="chevron-down" class="text-xl transition-transform" :class="{'rotate-180': showOperations }" />
    </button>
    <div v-if="showOperations" class="flex flex-col gap-0.5">
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
