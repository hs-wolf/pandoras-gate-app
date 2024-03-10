<script setup lang="ts">
import { type Character, type AllPropertiesTypes, type IOperation, ATTRIBUTES_PROPERTIES, ATTRIBUTES_MOD_PROPERTIES } from '~/types'

const character = defineModel<Character>({ required: true })

const emits = defineEmits<{(e:'save'): void}>()

const editFields = ref(false)

const baseOperations = computed(() => character.value.formulas.filter(operation => Object.values(ATTRIBUTES_PROPERTIES).includes(operation.target) && operation.baseValue))

const operationsToReset = ref<IOperation[]>([])

function toggleEditFields (value?:boolean) {
  editFields.value = value ?? !editFields.value
}

function getOperationIndex (type: AllPropertiesTypes) {
  return character.value.formulas.findIndex(operation => operation.target === type && operation.baseValue)
}

function getModByAttribute (type: AllPropertiesTypes) {
  return Object.values(ATTRIBUTES_MOD_PROPERTIES).find(mod => mod.includes(type)) ?? ''
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
  const filteredArray = character.value.formulas.filter(operation => operation.baseValue && Object.values(ATTRIBUTES_PROPERTIES).includes(operation.target))
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
      {{ $t('components.character-sheet.tabs.info.attributes') }}
    </h1>
    <div class="flex gap-4">
      <div class="flex flex-col gap-1">
        <p class="text-sm">
          &nbsp;
        </p>
        <p v-for="property in ATTRIBUTES_PROPERTIES" :key="property" class="leading-10">
          {{ $t(`properties.${property}`) }}
        </p>
      </div>
      <div class="flex flex-col gap-1 w-full text-center font-semibold">
        <div class="grid grid-cols-3 gap-4 text-sm uppercase">
          <p>{{ $t('general.base') }}</p>
          <p>{{ $t('general.total') }}</p>
          <p>{{ $t('general.modifier') }}</p>
        </div>
        <div v-for="property in ATTRIBUTES_PROPERTIES" :key="property" class="grid grid-cols-3 gap-4 text-lg leading-8">
          <input
            :id="`input-${property}`"
            v-model="character.formulas[getOperationIndex(property)].value"
            type="number"
            pattern="[0-9]"
            min="0"
            class="custom-input"
          >
          <p>
            {{ character.getProperty(property) }}
          </p>
          <p>
            {{ character.getProperty(getModByAttribute(property)) }}
          </p>
        </div>
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
        {{ $t('components.character-sheet.tabs.info.attributes') }}
      </h1>
    </button>
    <div class="flex gap-4">
      <div class="flex flex-col">
        <p class="text-sm">
          &nbsp;
        </p>
        <p v-for="property in ATTRIBUTES_PROPERTIES" :key="property" class="leading-7">
          {{ $t(`properties.${property}`) }}
        </p>
      </div>
      <div class="flex flex-col w-full text-center font-semibold">
        <div class="grid grid-cols-3 gap-4 text-sm uppercase">
          <p>{{ $t('general.base') }}</p>
          <p>{{ $t('general.total') }}</p>
          <p>{{ $t('general.modifier') }}</p>
        </div>
        <div v-for="property in ATTRIBUTES_PROPERTIES" :key="property" class="grid grid-cols-3 gap-4 leading-7">
          <p class="font-normal">
            {{ baseOperations.find((operation) => operation.target === property)?.value }}
          </p>
          <p>
            {{ character.getProperty(property) }}
          </p>
          <p class="text-lg">
            {{ character.getProperty(getModByAttribute(property)) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
