<script setup lang="ts">
import { type IOperationsGroup } from '~/types'

const operationsGroup = defineModel<IOperationsGroup>({ required: true })

defineEmits<{(e: 'delete'): void}>()

const characterSheetStore = useCharacterSheetStore()

const showDetails = ref(false)
const confirmDelete = ref(false)
</script>

<template>
  <div v-auto-animate class="flex flex-col gap-0.5">
    <!-- COLLAPSE BUTTON -->
    <button class="flex items-center justify-between px-3 py-2 bg-primary-dark text-white rounded-sm" @click.prevent="showDetails = !showDetails">
      <p> {{ operationsGroup.label }}</p>
      <NuxtIcon name="chevron-down" class="!text-xl transition-transform" :class="{'rotate-180': showDetails }" />
    </button>
    <!-- COLLAPSIBLE MENU -->
    <div
      v-if="showDetails"
      v-auto-animate
      class="flex flex-col gap-1 w-full"
    >
      <!-- ACTION AREA -->
      <div class="flex gap-0.5">
        <input
          id="value-input"
          v-model="operationsGroup.label"
          type="text"
          class="custom-input"
        >
        <div v-if="confirmDelete" class="flex gap-0.5">
          <button class="btn btn-primary" @click.prevent="confirmDelete = false">
            <NuxtIcon name="return" />
          </button>
          <button class="btn btn-danger" @click.prevent="characterSheetStore.deleteEffectsGroup(operationsGroup.id)">
            <NuxtIcon name="check" />
          </button>
        </div>
        <button v-else class="btn btn-danger" @click.prevent="confirmDelete = true">
          <NuxtIcon name="trash-can" />
        </button>
        <button class="btn btn-action" @click.prevent="characterSheetStore.effectsGroupNewOperation(operationsGroup.id)">
          <NuxtIcon name="add" />
        </button>
      </div>
      <!-- OPERATIONS LIST -->
      <div class="flex flex-col gap-1 ms-2">
        <CharacterSheetPropertyCardOperation
          v-for="(operation, index) in operationsGroup.operations"
          :key="operation.id"
          v-model="operationsGroup.operations[index]"
          :show-target="true"
          :deleteable="true"
          @delete="operationsGroup.operations.splice(index, 1)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
