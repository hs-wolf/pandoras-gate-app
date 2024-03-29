<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { Character, OperationAction, ALL_PROPERTIES, type IProperty } from '~/types'

const showNewOperation = ref(false)
const newOperationId = ref('')

const character = defineModel<Character>({ required: true })

const groupedOperations = computed(() => character.value.formulas.reduce((result, current) => {
  if (current.id !== newOperationId.value) {
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
  character.value.formulas.push({
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
  character.value.formulas.pop()
  newOperationId.value = ''
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-semibold">
      {{ $t('components.character-sheet.tabs.formulas.title') }}
    </h1>
    <div v-auto-animate class="flex flex-col gap-2">
      <div v-if="showNewOperation" class="flex flex-col gap-2">
        <CharacterSheetPropertyCardOperation
          v-model="character.formulas[character.formulas.length-1]"
          :show-target="true"
          :keep-open="true"
        />
        <div class="grid grid-cols-3 gap-2">
          <button id="cancel-operation" type="button" class="px-2 py-1.5 bg-danger rounded-sm text-white" @click.prevent="cancelNewOperation">
            {{ $t('pages.character-sheet.cancel-operation') }}
          </button>
          <button id="save-operation" type="button" class="col-span-2 px-2 py-1.5 bg-action rounded-sm text-white" @click.prevent="saveNewOperation">
            {{ $t('pages.character-sheet.save-operation') }}
          </button>
        </div>
      </div>
      <button v-else id="new-operation" type="button" class="btn btn-action self-start" @click.prevent="startNewOperation">
        {{ $t('components.character-sheet.tabs.formulas.new-formula') }}
      </button>
    </div>
    <div class="flex flex-col gap-1 md:grid md:grid-cols-2">
      <CharacterSheetPropertyCard
        v-for="(property, index) in groupedOperations"
        :key="property.type"
        v-model="groupedOperations[index]"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
