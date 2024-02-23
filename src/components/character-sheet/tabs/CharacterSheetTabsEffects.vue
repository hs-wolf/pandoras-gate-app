<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-4">
      <h1 class="text-2xl font-semibold">
        {{ $t('components.character-sheet.tabs.effects.title') }}
      </h1>
      <div v-auto-animate class="flex flex-col gap-2">
        <div v-if="showNewEffect" class="flex flex-col gap-2">
          <CharacterSheetPropertyCardOperation
            v-model="character.effects[getOperationIndex(newOperationId)]"
            :show-target="true"
            :keep-open="true"
          />
          <div class="grid grid-cols-2 gap-2">
            <button id="cancel-operation" type="button" class="btn btn-danger" @click.prevent="cancelNewOperation">
              {{ $t('pages.character-sheet.cancel-operation') }}
            </button>
            <button id="save-operation" type="button" class="btn btn-action" @click.prevent="saveNewOperation">
              {{ $t('pages.character-sheet.save-operation') }}
            </button>
          </div>
        </div>
        <button v-else id="new-operation" type="button" class="btn btn-action self-start" @click.prevent="createOperation">
          {{ $t('components.character-sheet.tabs.effects.new-effect') }}
        </button>
      </div>
      <div class="flex flex-col gap-2 md:gap-3 md:grid md:grid-cols-2 md:items-start">
        <CharacterSheetPropertyCardOperation
          v-for="operation in character.effects.filter((effect)=>effect.id !== newOperationId)"
          :key="operation.id"
          v-model="character.effects[getOperationIndex(operation.id)]"
          :show-target="true"
          :deleteable="true"
          @delete="characterSheetStore.deleteOperation(operation.id)"
        />
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <h1 class="text-2xl font-semibold">
        {{ $t('components.character-sheet.tabs.effects.effects-groups') }}
      </h1>
      <button id="new-operation" type="button" class="btn btn-action self-start" @click.prevent="characterSheetStore.createEffectsGroup">
        {{ $t('components.character-sheet.tabs.effects.new-effects-group') }}
      </button>
      <div class="flex flex-col gap-2 md:gap-3 md:grid md:grid-cols-2 md:items-start">
        <CharacterSheetPropertyCardOperationGroup
          v-for="group in character.effectsGroups"
          :key="group.id"
          v-model="character.effectsGroups[getOperationsGroupIndex(group.id)]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Character } from '~/types'

const character = defineModel<Character>({ required: true })

const characterSheetStore = useCharacterSheetStore()

const showNewEffect = ref(false)
const newOperationId = ref('')

function getOperationIndex (id: string) {
  return character.value.effects.findIndex(operation => operation.id === id)
}

function getOperationsGroupIndex (id: string) {
  return character.value.effectsGroups.findIndex(group => group.id === id)
}

function createOperation () {
  newOperationId.value = characterSheetStore.createOperation()
  showNewEffect.value = true
}

function saveNewOperation () {
  showNewEffect.value = false
  characterSheetStore.saveCharacter()
  newOperationId.value = ''
}

function cancelNewOperation () {
  showNewEffect.value = false
  characterSheetStore.deleteOperation(newOperationId.value)
  newOperationId.value = ''
}
</script>
