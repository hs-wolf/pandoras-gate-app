<template>
  <div v-if="editFields" class="flex flex-col gap-1 p-2 border border-black/20 dark:border-white/40 rounded-sm">
    <h1 v-if="title" class="text-xl text-primary font-semibold uppercase">
      {{ title }}
    </h1>
    <div class="flex gap-4">
      <div class="flex flex-col gap-1">
        <p class="text-sm">
          &nbsp;
        </p>
        <p v-for="property in properties" :key="property" class="leading-8 truncate">
          {{ $t(`properties.${property}`).split('_').pop() }}
        </p>
      </div>
      <div class="flex flex-col gap-1 w-full text-center font-semibold">
        <div class="grid grid-cols-2 gap-4 text-sm uppercase">
          <p>{{ $t('general.base') }}</p>
          <p>{{ $t('general.total') }}</p>
        </div>
        <div v-for="property in properties" :key="property" class="grid grid-cols-2 gap-4 text-lg leading-8">
          <input
            :id="`input-${property}`"
            v-model="character.operations[getOperationIndex(property)].value"
            type="number"
            pattern="[0-9]"
            min="0"
            class="custom-input"
          >
          <p>
            {{ character.getProperty(property) }}
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
    <button id="edit-base" class="btn-effect flex items-center gap-1" @click.prevent="toggleEditFields()">
      <NuxtIcon name="pen" class="text-2xl text-primary" />
      <h1 v-if="title" class="text-xl font-semibold uppercase">
        {{ title }}
      </h1>
    </button>
    <div class="flex gap-2">
      <div class="flex flex-col">
        <p class="text-sm">
          &nbsp;
        </p>
        <p v-for="property in properties" :key="property" class="leading-7 truncate">
          {{ $t(`properties.${property}`).split('_').pop() }}
        </p>
      </div>
      <div class="flex flex-col w-full text-center font-semibold">
        <div class="grid grid-cols-2 gap-4 text-sm uppercase">
          <p>{{ $t('general.base') }}</p>
          <p>{{ $t('general.total') }}</p>
        </div>
        <div v-for="property in properties" :key="property" class="grid grid-cols-2 gap-4 text-lg">
          <p class="text-base leading-7 font-normal">
            {{ baseOperations.find((operation) => operation.target === property)?.value }}
          </p>
          <p>
            {{ character.getProperty(property) }}
          </p>
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

<style scoped>

</style>
