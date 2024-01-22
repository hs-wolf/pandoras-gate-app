<template>
  <div v-if="editFields" class="flex flex-col p-2 border border-black/20 dark:border-white/40 rounded-sm">
    <div class="flex flex-col gap-1">
      <h1 class="text-lg font-semibold">
        {{ $t('components.character-sheet.tabs.info.conditions.attribute') }}
      </h1>
      <div class="grid grid-cols-4 gap-2 font-semibold text-center">
        <p>&nbsp;</p>
        <p>
          {{ $t('components.character-sheet.tabs.info.conditions.base') }}
        </p>
        <p>
          {{ $t('components.character-sheet.tabs.info.conditions.total') }}
        </p>
        <p>
          {{ $t('components.character-sheet.tabs.info.conditions.modifier') }}
        </p>
      </div>
      <div v-for="attribute in ATTRIBUTES_PROPERTIES" :key="attribute" class="grid grid-cols-4 gap-2 items-center text-center text-lg">
        <p class="text-start text-base">
          {{ $t(`properties.${attribute}`) }}
        </p>
        <div class="px-2">
          <input
            :id="`input-${attribute}`"
            v-model="character.operations[getOperationIndex(attribute)].value"
            type="number"
            pattern="[0-9]"
            min="0"
            class="custom-input max-w-14"
          >
        </div>
        <p>
          {{ character.getProperty(attribute) }}
        </p>
        <p class="font-semibold">
          {{ character.getProperty(getModByAttribute(attribute)) }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2 mt-4">
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
    <div class="flex flex-col gap-1">
      <h1 class="text-lg font-semibold">
        {{ $t('components.character-sheet.tabs.info.conditions.attribute') }}
      </h1>
      <div class="grid grid-cols-4 gap-2 font-semibold text-center">
        <p>&nbsp;</p>
        <p>{{ $t('components.character-sheet.tabs.info.conditions.base') }}</p>
        <p>{{ $t('components.character-sheet.tabs.info.conditions.total') }}</p>
        <p>{{ $t('components.character-sheet.tabs.info.conditions.modifier') }}</p>
      </div>
      <div v-for="attribute in ATTRIBUTES_PROPERTIES" :key="attribute" class="grid grid-cols-4 gap-2 items-center text-center text-lg">
        <p class="text-start">
          {{ $t(`properties.${attribute}`) }}
        </p>
        <p>
          {{ baseOperations.find((operation) => operation.target === attribute)?.value }}
        </p>
        <p>
          {{ character.getProperty(attribute) }}
        </p>
        <p class="font-semibold">
          {{ character.getProperty(getModByAttribute(attribute)) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Character, type AllPropertiesTypes, type IOperation, ATTRIBUTES_PROPERTIES, ATTRIBUTES_MOD_PROPERTIES } from '~/types'

const character = defineModel<Character>({ required: true })

const editFields = ref(false)

const baseOperations = computed(() => character.value.operations.filter(operation => operation.baseValue && Object.values(ATTRIBUTES_PROPERTIES).includes(operation.target)))

const operationsToReset = ref<IOperation[]>([])

function toggleEditFields (value?:boolean) {
  editFields.value = value ?? !editFields.value
}

function getOperationIndex (type: AllPropertiesTypes) {
  return character.value.operations.findIndex(operation => operation.baseValue && operation.target === type)
}

function getModByAttribute (type: AllPropertiesTypes) {
  return Object.values(ATTRIBUTES_MOD_PROPERTIES).find(mod => mod.includes(type)) ?? ''
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
  const filteredArray = character.value.operations.filter(operation => operation.baseValue && Object.values(ATTRIBUTES_PROPERTIES).includes(operation.target))
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
