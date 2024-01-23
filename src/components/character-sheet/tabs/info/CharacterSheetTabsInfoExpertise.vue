<template>
  <div v-if="editFields" class="flex flex-col p-2 border border-black/20 dark:border-white/40 rounded-sm">
    <div class="flex flex-col gap-1">
      <h1 class="text-lg font-semibold">
        {{ title }}
      </h1>
      <div class="flex gap-2">
        <div class="flex flex-col gap-1">
          <p>&nbsp;</p>
          <p v-for="property in properties" :key="property" class="text-sm leading-8 whitespace-nowrap">
            {{ $t(`properties.${property}`) }}
          </p>
        </div>
        <div class="grid grid-cols-2 w-full">
          <div class="flex flex-col items-center gap-1">
            <h1>
              {{ $t('general.base') }}
            </h1>
            <div class="flex flex-col gap-1 px-2">
              <input
                v-for="property in properties"
                :id="`input-${property}`"
                :key="property"
                v-model="character.operations[getOperationIndex(property)].value"
                type="number"
                pattern="[0-9]"
                min="0"
                class="custom-input max-w-14"
              >
            </div>
          </div>
          <div class="flex flex-col gap-1 text-center font-semibold">
            <h1>
              {{ $t('general.total') }}
            </h1>
            <p v-for="property in properties" :key="property" class="leading-8">
              {{ character.getProperty(property) }}
            </p>
          </div>
        </div>
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
        {{ title }}
      </h1>
      <div class="flex gap-2">
        <div class="flex flex-col">
          <p>&nbsp;</p>
          <p v-for="property in properties" :key="property" class="text-sm leading-6 whitespace-nowrap">
            {{ $t(`properties.${property}`) }}
          </p>
        </div>
        <div class="grid grid-cols-2 w-full">
          <div class="flex flex-col text-center">
            <h1>
              {{ $t('general.base') }}
            </h1>
            <p v-for="property in properties" :key="property">
              {{ baseOperations.find((operation) => operation.target === property)?.value }}
            </p>
          </div>
          <div class="flex flex-col text-center font-semibold">
            <h1>
              {{ $t('general.total') }}
            </h1>
            <p v-for="property in properties" :key="property">
              {{ character.getProperty(property) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Character, type AllPropertiesTypes, type IOperation } from '~/types'

const character = defineModel<Character>({ required: true })

const emits = defineEmits<{(e:'save'): void}>()

const props = defineProps<{ properties: Record<string, string>, title: string }>()

const editFields = ref(false)
const operationsToReset = ref<IOperation[]>([])

const baseOperations = computed(() => character.value.operations.filter(operation => operation.baseValue && Object.values(props.properties).includes(operation.target)))

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
  const filteredArray = character.value.operations.filter(operation => operation.baseValue && Object.values(props.properties).includes(operation.target))
  const stringifiedArray = JSON.stringify(filteredArray)
  operationsToReset.value = JSON.parse(stringifiedArray)
}

onBeforeMount(() => {
  saveOperationsToReset()
})
</script>

<style scoped lang="scss">

</style>
