<template>
  <div class="flex flex-col gap-2 px-2 py-3">
    <h1 class="text-2xl font-semibold">
      Buff & Debuffs
    </h1>
    <div v-auto-animate class="flex flex-col gap-2">
      <div v-if="showNewOperation" class="flex flex-col gap-2">
        <CharacterPropertyCardOperation
          v-model="character.operations[character.operations.length-1]"
          :show-target="true"
        />
        <div class="grid grid-cols-2 gap-2">
          <button id="cancel-operation" type="button" class="px-2 py-1.5 bg-red-800 rounded-sm text-white" @click.prevent="cancelNewOperation">
            {{ $t('pages.character-sheet.cancel-operation') }}
          </button>
          <button id="save-operation" type="button" class="px-2 py-1.5 bg-green-800 rounded-sm text-white" @click.prevent="saveNewOperation">
            {{ $t('pages.character-sheet.save-operation') }}
          </button>
        </div>
      </div>
      <button v-else id="new-operation" type="button" class="px-2 py-1.5 bg-blue-800 rounded-sm text-white" @click.prevent="startNewOperation">
        {{ $t('pages.character-sheet.new-operation.label') }}
      </button>
    </div>
    <div class="flex flex-col gap-2">
      <CharacterPropertyCard
        v-for="(property, index) in groupedOperations"
        :key="property.type"
        v-model="groupedOperations[index]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { Character, OperationAction, ALL_PROPERTIES, type IProperty } from '~/types'

const character = defineModel<Character>({ required: true })

const showNewOperation = ref(false)
const newOperationId = ref('')

const groupedOperations = computed(() => character.value.operations.reduce((result, current) => {
  if (current.id !== newOperationId.value && !current.baseFormula && !current.baseValue) {
    const categoryItem = result.find(item => item.type === current.target)
    if (categoryItem) {
      categoryItem.operations.push(current)
    } else {
      result.push({
        type: current.target,
        operations: [current]
      })
    }
  }
  return result
}, [] as IProperty[]))

function startNewOperation () {
  const id = uuidv4()
  newOperationId.value = id
  character.value.operations.push({
    id,
    target: ALL_PROPERTIES.ATTRIBUTES_AGILITY,
    action: OperationAction.SUM,
    value: 1
  })
  showNewOperation.value = true
}

function saveNewOperation () {
  newOperationId.value = ''
  showNewOperation.value = false
}

function cancelNewOperation () {
  showNewOperation.value = false
  character.value.operations.pop()
  newOperationId.value = ''
}
</script>

<style scoped>

</style>
