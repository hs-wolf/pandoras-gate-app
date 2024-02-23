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
  const filteredArray = character.value.formulas.filter(operation => Object.values(CONDITIONS_PROPERTIES).includes(operation.target) && operation.baseValue)
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
      {{ $t('components.character-sheet.tabs.info.conditions') }}
    </h1>
    <div class="flex gap-4">
      <div class="flex flex-col gap-1 text-xl font-semibold leading-8">
        <p class="text-sm">
          &nbsp;
        </p>
        <p class="text-danger">
          {{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HP}`) }}
        </p>
        <p class="text-purple-600">
          {{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_SP}`) }}
        </p>
        <p class="text-primary">
          {{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_MP}`) }}
        </p>
        <p>
          {{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HUNGER}`) }}
        </p>
      </div>
      <div class="flex flex-col gap-1 w-full text-center">
        <div class="grid grid-cols-2 gap-4 text-sm font-semibold uppercase">
          <p>{{ $t('general.atual') }}</p>
          <p>{{ $t('general.max') }}</p>
        </div>
        <div class="relative grid grid-cols-2 gap-4 text-lg leading-8">
          <div class="flex flex-col gap-1">
            <input
              v-for="property in [CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HP,
                                  CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_SP,
                                  CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_MP,
                                  CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HUNGER]"
              :id="`input-${property}`"
              :key="property"
              v-model="character.formulas[getOperationIndex(property)].value"
              type="number"
              pattern="[0-9]"
              min="0"
              class="custom-input"
            >
          </div>
          <div class="flex flex-col gap-1">
            <input
              v-for="property in [CONDITIONS_PROPERTIES.CONDITIONS_MAX_HP,
                                  CONDITIONS_PROPERTIES.CONDITIONS_MAX_SP,
                                  CONDITIONS_PROPERTIES.CONDITIONS_MAX_MP,
                                  CONDITIONS_PROPERTIES.CONDITIONS_MAX_HUNGER]"
              :id="`input-${property}`"
              :key="property"
              v-model="character.formulas[getOperationIndex(property)].value"
              type="number"
              pattern="[0-9]"
              min="0"
              class="custom-input"
            >
          </div>
        </div>
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
  <div v-else class="relative flex flex-col gap-1 p-2 border border-black/20 dark:border-white/40 rounded-sm">
    <button id="edit-base" class="btn-effect self-start col-span-2 flex items-center gap-1" @click.prevent="toggleEditFields()">
      <NuxtIcon name="pen" class="text-2xl text-primary" />
      <h1 class="text-xl font-semibold uppercase">
        {{ $t('components.character-sheet.tabs.info.conditions') }}
      </h1>
    </button>
    <div class="condition text-danger">
      <p>{{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HP}`) }}</p>
      <span>{{ `${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HP)} / ${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_MAX_HP)}` }}</span>
    </div>
    <div class="condition text-primary">
      <p>{{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_MP}`) }}</p>
      <span>{{ `${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_MP)} / ${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_MAX_MP)}` }}</span>
    </div>
    <div class="condition text-purple-700">
      <p>{{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_SP}`) }}</p>
      <span>{{ `${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_SP)} / ${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_MAX_SP)}` }}</span>
    </div>
    <div class="condition">
      <p>{{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HUNGER}`) }}</p>
      <span>{{ `${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HUNGER)} / ${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_MAX_HUNGER)}` }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.condition {
  @apply flex items-center gap-2 font-semibold;
  p {
    @apply text-xl;
  }
  span {
    @apply text-2xl;
  }

}
</style>
