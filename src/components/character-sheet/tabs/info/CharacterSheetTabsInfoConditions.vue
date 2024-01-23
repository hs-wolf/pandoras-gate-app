<template>
  <div v-if="editFields" class="flex flex-col gap-2 p-2 border border-black/20 dark:border-white/40 rounded-sm">
    <div class="condition-edit">
      <p class="text-red-700">
        {{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HP}`) }}
      </p>
      <div class="relative grid grid-cols-2 items-center gap-5 w-full">
        <input
          :id="`input-${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HP}`"
          v-model="character.operations[getOperationIndex(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HP)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
        <span class="absolute flex text-center left-1/2 -translate-x-1/2">/</span>
        <input
          :id="`input-${CONDITIONS_PROPERTIES.CONDITIONS_MAX_HP}`"
          v-model="character.operations[getOperationIndex(CONDITIONS_PROPERTIES.CONDITIONS_MAX_HP)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
      </div>
    </div>
    <div class="condition-edit">
      <p class="text-blue-700">
        {{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_MP}`) }}
      </p>
      <div class="relative grid grid-cols-2 items-center gap-5 w-full">
        <input
          :id="`input-${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_MP}`"
          v-model="character.operations[getOperationIndex(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_MP)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
        <span class="absolute flex text-center left-1/2 -translate-x-1/2">/</span>
        <input
          :id="`input-${CONDITIONS_PROPERTIES.CONDITIONS_MAX_MP}`"
          v-model="character.operations[getOperationIndex(CONDITIONS_PROPERTIES.CONDITIONS_MAX_MP)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
      </div>
    </div>
    <div class="condition-edit">
      <p class="text-purple-700">
        {{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_SP}`) }}
      </p>
      <div class="relative grid grid-cols-2 items-center gap-5 w-full">
        <input
          :id="`input-${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_SP}`"
          v-model="character.operations[getOperationIndex(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_SP)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
        <span class="absolute flex text-center left-1/2 -translate-x-1/2">/</span>
        <input
          :id="`input-${CONDITIONS_PROPERTIES.CONDITIONS_MAX_SP}`"
          v-model="character.operations[getOperationIndex(CONDITIONS_PROPERTIES.CONDITIONS_MAX_SP)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
      </div>
    </div>
    <div class="condition-edit">
      <p>
        {{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HUNGER}`) }}
      </p>
      <div class="relative grid grid-cols-2 items-center gap-5 w-full">
        <input
          :id="`input-${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HUNGER}`"
          v-model="character.operations[getOperationIndex(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HUNGER)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
        <span class="absolute flex text-center left-1/2 -translate-x-1/2">/</span>
        <input
          :id="`input-${CONDITIONS_PROPERTIES.CONDITIONS_MAX_HUNGER}`"
          v-model="character.operations[getOperationIndex(CONDITIONS_PROPERTIES.CONDITIONS_MAX_HUNGER)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2 mt-2">
      <button id="general-reset-changes" class="btn btn-danger" @click.prevent="resetChanges">
        {{ $t('general.reset-changes') }}
      </button>
      <button id="general-save-changes" class="btn btn-action" @click.prevent="saveChanges">
        {{ $t('general.save-changes') }}
      </button>
    </div>
  </div>
  <div v-else class="relative grid grid-cols-2 gap-2 p-2 border border-black/20 dark:border-white/40 rounded-sm">
    <button id="edit-base" class="btn-effect absolute top-2 end-2" @click.prevent="toggleEditFields()">
      <NuxtIcon name="pen" class="text-2xl text-primary" />
    </button>
    <div class="condition text-red-700">
      <p>{{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HP}`) }}</p>
      <span>{{ `${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HP)} / ${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_MAX_HP)}` }}</span>
    </div>
    <div class="condition text-purple-700">
      <p>{{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_SP}`) }}</p>
      <span>{{ `${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_SP)} / ${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_MAX_SP)}` }}</span>
    </div>
    <div class="condition text-blue-700">
      <p>{{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_MP}`) }}</p>
      <span>{{ `${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_MP)} / ${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_MAX_MP)}` }}</span>
    </div>
    <div class="condition">
      <p>{{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HUNGER}`) }}</p>
      <span>{{ `${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HUNGER)} / ${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_MAX_HUNGER)}` }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Character, type AllPropertiesTypes, type IOperation, CONDITIONS_PROPERTIES } from '~/types'

const character = defineModel<Character>({ required: true })

const emits = defineEmits<{(e:'save'): void}>()

const editFields = ref(false)

const operationsToReset = ref<IOperation[]>([])

function toggleEditFields (value?:boolean) {
  editFields.value = value ?? !editFields.value
}

function getOperationIndex (type: AllPropertiesTypes) {
  return character.value.operations.findIndex(operation => operation.baseValue && operation.target === type)
}

function saveChanges () {
  toggleEditFields(false)
  saveOperationsToReset()
  emits('save')
}

function resetChanges () {
  toggleEditFields(false)
  operationsToReset.value.forEach((operationToReset) => {
    const existingIndex = character.value.operations.findIndex(operation => operation.id === operationToReset.id)
    if (existingIndex >= 0) {
      character.value.operations[existingIndex] = operationToReset
    }
  })
}

function saveOperationsToReset () {
  const filteredArray = character.value.operations.filter(operation => operation.baseValue && Object.values(CONDITIONS_PROPERTIES).includes(operation.target))
  const stringifiedArray = JSON.stringify(filteredArray)
  operationsToReset.value = JSON.parse(stringifiedArray)
}

onBeforeMount(() => {
  saveOperationsToReset()
})
</script>

<style scoped lang="scss">
.condition {
  @apply flex items-center gap-2 text-xl font-semibold;

}
.condition-edit {
  @apply flex items-center gap-2;
  p {
    @apply text-lg font-semibold;
  }
}
</style>
