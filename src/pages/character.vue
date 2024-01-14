<template>
  <div class="flex flex-col gap-5 w-full max-w-4xl mx-auto">
    <div class="flex flex-col">
      <h1>Player: <span class="font-semibold">{{ character.player }}</span></h1>
      <h1>Character: <span class="font-semibold">{{ character.character }}</span></h1>
      <h1>Guild: <span class="font-semibold">{{ character.character }}</span></h1>
    </div>
    <div class="grid grid-cols-3">
      <div class="flex flex-col">
        <p class="font-semibold">
          Atributo
        </p>
        <div v-for="attribute in attributes" :key="attribute" class="flex flex-col">
          <p>{{ $t(`properties.${attribute}`) }}</p>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <p class="font-semibold">
          Total
        </p>
        <div v-for="attribute in attributes" :key="attribute" class="flex flex-col">
          <p>{{ character.getProperty(attribute) }}</p>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <p class="font-semibold">
          Mod
        </p>
        <div v-for="mod in attributesMods" :key="mod" class="flex flex-col">
          <p>{{ character.getProperty(mod) }}</p>
        </div>
      </div>
    </div>
    <div v-auto-animate class="flex flex-col gap-2">
      <div v-if="showNewOperation" class="flex flex-col gap-2">
        <CharacterPropertyCardOperation
          v-model="character.operations[character.operations.length-1]"
          :show-target="true"
        />
        <div class="grid grid-cols-2 gap-2">
          <button id="cancel-operation" type="button" class="px-2 py-1.5 bg-red-800 rounded-sm text-white" @click.prevent="cancelNewOperation">
            {{ $t('pages.character.cancel-operation') }}
          </button>
          <button id="save-operation" type="button" class="px-2 py-1.5 bg-green-800 rounded-sm text-white" @click.prevent="saveNewOperation">
            {{ $t('pages.character.save-operation') }}
          </button>
        </div>
      </div>
      <button v-else id="new-operation" type="button" class="px-2 py-1.5 bg-blue-800 rounded-sm text-white" @click.prevent="startNewOperation">
        {{ $t('pages.character.new-operation.label') }}
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
import { Character, OperationAction, PropertyType, type IProperty } from '~/types'

const attributes = [
  PropertyType.ATTRIBUTES_STRENGTH,
  PropertyType.ATTRIBUTES_AGILITY,
  PropertyType.ATTRIBUTES_DEXTERITY,
  PropertyType.ATTRIBUTES_VITALITY,
  PropertyType.ATTRIBUTES_SPIRIT,
  PropertyType.ATTRIBUTES_LUCK
]

const attributesMods = [
  PropertyType.ATTRIBUTES_MOD_STRENGTH,
  PropertyType.ATTRIBUTES_MOD_AGILITY,
  PropertyType.ATTRIBUTES_MOD_DEXTERITY,
  PropertyType.ATTRIBUTES_MOD_VITALITY,
  PropertyType.ATTRIBUTES_MOD_SPIRIT,
  PropertyType.ATTRIBUTES_MOD_LUCK
]

const showNewOperation = ref(false)
const newOperationId = ref('')

const character = ref(new Character(
  'Jose',
  'Tai Lung',
  'Falcões de Primus',
  [],
  [],
  [
    {
      id: uuidv4(),
      description: 'Fórmula Básica',
      target: PropertyType.ATTRIBUTES_MOD_STRENGTH,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: PropertyType.ATTRIBUTES_STRENGTH,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    },
    {
      id: uuidv4(),
      description: 'Fórmula Básica',
      target: PropertyType.ATTRIBUTES_MOD_AGILITY,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: PropertyType.ATTRIBUTES_AGILITY,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    },
    {
      id: uuidv4(),
      description: 'Fórmula Básica',
      target: PropertyType.ATTRIBUTES_MOD_DEXTERITY,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: PropertyType.ATTRIBUTES_DEXTERITY,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    },
    {
      id: uuidv4(),
      description: 'Fórmula Básica',
      target: PropertyType.ATTRIBUTES_MOD_VITALITY,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: PropertyType.ATTRIBUTES_VITALITY,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    },
    {
      id: uuidv4(),
      description: 'Fórmula Básica',
      target: PropertyType.ATTRIBUTES_MOD_SPIRIT,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: PropertyType.ATTRIBUTES_SPIRIT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    },
    {
      id: uuidv4(),
      description: 'Fórmula Básica',
      target: PropertyType.ATTRIBUTES_MOD_LUCK,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: PropertyType.ATTRIBUTES_LUCK,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    }
  ]
))

const groupedOperations = computed(() => character.value.operations.reduce((result, current) => {
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
  character.value.operations.push({
    id,
    target: PropertyType.ATTRIBUTES_AGILITY,
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
