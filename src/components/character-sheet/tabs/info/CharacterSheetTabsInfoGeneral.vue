<script setup lang="ts">
import { type Character, GENERAL_PROPERTIES, type AllPropertiesTypes, type IOperation } from '~/types'

const character = defineModel<Character>({ required: true })

const emits = defineEmits<{(e:'save'): void}>()

const editFields = ref(false)

const operationsToReset = ref<IOperation[]>([])

function toggleEditFields (value?:boolean) {
  editFields.value = value ?? !editFields.value
}

function getOperationIndex (type: AllPropertiesTypes) {
  return character.value.formulas.findIndex(operation => operation.target === type && operation.baseValue)
}

function saveChanges () {
  toggleEditFields(false)
  saveOperationsToReset()
  emits('save')
}

function resetChanges () {
  toggleEditFields(false)
  operationsToReset.value.forEach((operationToReset) => {
    const existingIndex = character.value.formulas.findIndex(operation => operation.id === operationToReset.id)
    if (existingIndex >= 0) {
      character.value.formulas[existingIndex] = operationToReset
    }
  })
}

function saveOperationsToReset () {
  const filteredArray = character.value.formulas.filter(operation => Object.values(GENERAL_PROPERTIES).includes(operation.target) && operation.baseValue)
  const stringifiedArray = JSON.stringify(filteredArray)
  operationsToReset.value = JSON.parse(stringifiedArray)
}

onBeforeMount(() => {
  saveOperationsToReset()
})
</script>

<template>
  <div v-if="editFields" class="flex flex-col gap-1 p-2 border border-black/20 dark:border-white/40 rounded-sm">
    <h1 class="text-xl text-primary font-semibold uppercase">
      {{ $t('components.character-sheet.tabs.info.general') }}
    </h1>
    <div class="flex flex-col gap-1">
      <div class="general-property">
        <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_GRADE}`) }}:</p>
        <input
          :id="`input-${GENERAL_PROPERTIES.GENERAL_GRADE}`"
          v-model="character.formulas[getOperationIndex(GENERAL_PROPERTIES.GENERAL_GRADE)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
      </div>
      <div class="general-property">
        <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_LEVEL}`) }}:</p>
        <input
          :id="`input-${GENERAL_PROPERTIES.GENERAL_LEVEL}`"
          v-model="character.formulas[getOperationIndex(GENERAL_PROPERTIES.GENERAL_LEVEL)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
      </div>
      <div class="general-property">
        <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_EXP}`) }}:</p>
        <div class="relative grid grid-cols-2 items-center gap-5 w-full">
          <input
            :id="`input-${GENERAL_PROPERTIES.GENERAL_EXP}`"
            v-model="character.formulas[getOperationIndex(GENERAL_PROPERTIES.GENERAL_EXP)].value"
            type="number"
            pattern="[0-9]"
            min="0"
            class="custom-input"
          >
          <span class="absolute flex text-center left-1/2 -translate-x-1/2">/</span>
          <input
            :id="`input-${GENERAL_PROPERTIES.GENERAL_NEXT}`"
            v-model="character.formulas[getOperationIndex(GENERAL_PROPERTIES.GENERAL_NEXT)].value"
            type="number"
            pattern="[0-9]"
            min="0"
            class="custom-input"
          >
        </div>
      </div>
      <div class="general-property">
        <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_ENCHANCEMENTS}`) }}:</p>
        <input
          :id="`input-${GENERAL_PROPERTIES.GENERAL_ENCHANCEMENTS}`"
          v-model="character.formulas[getOperationIndex(GENERAL_PROPERTIES.GENERAL_ENCHANCEMENTS)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
      </div>
      <div class="general-property">
        <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_ATUAL_SKILL_REGEN}`) }}:</p>
        <div class="relative grid grid-cols-2 items-center gap-5 w-full">
          <input
            :id="`input-${GENERAL_PROPERTIES.GENERAL_ATUAL_SKILL_REGEN}`"
            v-model="character.formulas[getOperationIndex(GENERAL_PROPERTIES.GENERAL_ATUAL_SKILL_REGEN)].value"
            type="number"
            pattern="[0-9]"
            min="0"
            class="custom-input"
          >
          <span class="absolute flex text-center left-1/2 -translate-x-1/2">/</span>
          <input
            :id="`input-${GENERAL_PROPERTIES.GENERAL_MAX_SKILL_REGEN}`"
            v-model="character.formulas[getOperationIndex(GENERAL_PROPERTIES.GENERAL_MAX_SKILL_REGEN)].value"
            type="number"
            pattern="[0-9]"
            min="0"
            class="custom-input"
          >
        </div>
      </div>
      <div class="general-property">
        <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_JP}`) }}:</p>
        <input
          :id="`input-${GENERAL_PROPERTIES.GENERAL_JP}`"
          v-model="character.formulas[getOperationIndex(GENERAL_PROPERTIES.GENERAL_JP)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
      </div>
      <div class="general-property">
        <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_GOLD}`) }}:</p>
        <input
          :id="`input-${GENERAL_PROPERTIES.GENERAL_GOLD}`"
          v-model="character.formulas[getOperationIndex(GENERAL_PROPERTIES.GENERAL_GOLD)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2 mt-2">
      <button id="general-reset-changes" class="btn btn-danger" @click.prevent="resetChanges">
        {{ $t('general.reset-changes') }}
      </button>
      <button id="general-save-changes" class="btn btn-action col-span-2" @click.prevent="saveChanges">
        {{ $t('general.save-changes') }}
      </button>
    </div>
  </div>
  <div v-else class="relative flex flex-col gap-1 p-2 border border-black/20 dark:border-white/40 rounded-sm">
    <button id="edit-base" class="btn-effect self-start flex items-center gap-1" @click.prevent="toggleEditFields()">
      <NuxtIcon name="pen" class="text-2xl text-primary" />
      <h1 class="text-xl font-semibold uppercase">
        {{ $t('components.character-sheet.tabs.info.general') }}
      </h1>
    </button>
    <div class="flex flex-col">
      <div class="general-property">
        <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_GRADE}`) }}</p>
        <span>{{ character.getProperty(GENERAL_PROPERTIES.GENERAL_GRADE) }}</span>
      </div>
      <div class="general-property">
        <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_LEVEL}`) }}</p>
        <span>{{ character.getProperty(GENERAL_PROPERTIES.GENERAL_LEVEL) }}</span>
      </div>
      <div class="general-property">
        <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_EXP}`) }}</p>
        <span>{{ `${character.getProperty(GENERAL_PROPERTIES.GENERAL_EXP)} / ${character.getProperty(GENERAL_PROPERTIES.GENERAL_NEXT)}` }}</span>
      </div>
      <div class="general-property">
        <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_ENCHANCEMENTS}`) }}</p>
        <span>{{ character.getProperty(GENERAL_PROPERTIES.GENERAL_ENCHANCEMENTS) }}</span>
      </div>
      <div class="general-property">
        <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_ATUAL_SKILL_REGEN}`) }}</p>
        <span>{{ `${character.getProperty(GENERAL_PROPERTIES.GENERAL_ATUAL_SKILL_REGEN)} / ${character.getProperty(GENERAL_PROPERTIES.GENERAL_MAX_SKILL_REGEN)}` }}</span>
      </div>
      <div class="general-property">
        <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_JP}`) }}</p>
        <span>{{ character.getProperty(GENERAL_PROPERTIES.GENERAL_JP) }}</span>
      </div>
      <div class="general-property">
        <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_GOLD}`) }}</p>
        <span>{{ character.getProperty(GENERAL_PROPERTIES.GENERAL_GOLD) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.general-property {
  @apply flex items-center gap-1.5;
  p {
    @apply whitespace-nowrap;
  }
  span {
    @apply text-lg font-semibold;
  }
}
</style>
