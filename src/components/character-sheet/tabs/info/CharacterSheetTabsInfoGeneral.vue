<template>
  <div v-if="editFields" class="flex flex-col gap-2 p-2 border border-black/20 dark:border-white/40 rounded-sm">
    <div class="general-property">
      <p>{{ $t(`properties.${GENERAL_PROPERTIES.GENERAL_GRADE}`) }}:</p>
      <input
        :id="`input-${GENERAL_PROPERTIES.GENERAL_GRADE}`"
        v-model="character.operations[getOperationIndex(GENERAL_PROPERTIES.GENERAL_GRADE)].value"
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
        v-model="character.operations[getOperationIndex(GENERAL_PROPERTIES.GENERAL_LEVEL)].value"
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
          v-model="character.operations[getOperationIndex(GENERAL_PROPERTIES.GENERAL_EXP)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
        <span class="absolute flex text-center left-1/2 -translate-x-1/2">/</span>
        <input
          :id="`input-${GENERAL_PROPERTIES.GENERAL_NEXT}`"
          v-model="character.operations[getOperationIndex(GENERAL_PROPERTIES.GENERAL_NEXT)].value"
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
        v-model="character.operations[getOperationIndex(GENERAL_PROPERTIES.GENERAL_ENCHANCEMENTS)].value"
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
          v-model="character.operations[getOperationIndex(GENERAL_PROPERTIES.GENERAL_ATUAL_SKILL_REGEN)].value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
        <span class="absolute flex text-center left-1/2 -translate-x-1/2">/</span>
        <input
          :id="`input-${GENERAL_PROPERTIES.GENERAL_MAX_SKILL_REGEN}`"
          v-model="character.operations[getOperationIndex(GENERAL_PROPERTIES.GENERAL_MAX_SKILL_REGEN)].value"
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
        v-model="character.operations[getOperationIndex(GENERAL_PROPERTIES.GENERAL_JP)].value"
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
        v-model="character.operations[getOperationIndex(GENERAL_PROPERTIES.GENERAL_GOLD)].value"
        type="number"
        pattern="[0-9]"
        min="0"
        class="custom-input"
      >
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
  <div v-else class="relative flex flex-col p-2 border border-black/20 dark:border-white/40 rounded-sm">
    <button id="edit-base" class="btn-effect absolute top-2 end-2" @click.prevent="toggleEditFields()">
      <NuxtIcon name="pen" class="text-2xl text-primary" />
    </button>
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
      <p>{{ $t('components.character-sheet.tabs.info.skills-regen') }}</p>
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
</template>

<script setup lang="ts">
import { type Character, GENERAL_PROPERTIES, type AllPropertiesTypes, type IOperation } from '~/types'

const character = defineModel<Character>({ required: true })

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
  const filteredArray = character.value.operations.filter(operation => operation.baseValue && Object.values(GENERAL_PROPERTIES).includes(operation.target))
  const stringifiedArray = JSON.stringify(filteredArray)
  operationsToReset.value = JSON.parse(stringifiedArray)
}

onBeforeMount(() => {
  saveOperationsToReset()
})
</script>

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
