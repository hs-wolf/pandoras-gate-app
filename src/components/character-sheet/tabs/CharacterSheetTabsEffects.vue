<template>
  <div class="flex flex-col gap-4 px-2 py-3">
    <h1 class="text-2xl font-semibold">
      {{ $t('components.character-sheet.tabs.effects.title') }}
    </h1>
    <div v-auto-animate class="flex flex-col gap-2">
      <div v-if="showNewOperation" class="flex flex-col gap-2">
        <CharacterSheetPropertyCardOperation
          v-model="character.operations[character.operations.length-1]"
          :show-target="true"
          :init-open="true"
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
      <button v-else id="new-operation" type="button" class="btn btn-action" @click.prevent="startNewOperation">
        {{ $t('components.character-sheet.tabs.effects.new-effect') }}
      </button>
    </div>
    <div class="flex flex-col gap-2">
      <CharacterSheetPropertyCardOperation
        v-for="(operation) in customOperations"
        :key="operation.id"
        v-model="character.operations[getOperationIndex(operation.id)]"
        :show-target="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { Character, OperationAction, ALL_PROPERTIES } from '~/types'

const character = defineModel<Character>({ required: true })

const characterSheetStore = useCharacterSheetStore()

const showNewOperation = ref(false)
const newOperationId = ref('')

const customOperations = computed(() => character.value.operations.filter(operation => !operation.baseFormula && !operation.baseValue && operation.id !== newOperationId.value))

function getOperationIndex (id: string) {
  return character.value.operations.findIndex(operation => operation.id === id)
}

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
  characterSheetStore.saveCharacter()
}

function cancelNewOperation () {
  showNewOperation.value = false
  character.value.operations.pop()
  newOperationId.value = ''
}
</script>

<style scoped>

</style>
