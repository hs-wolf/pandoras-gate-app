<template>
  <div v-if="characterLoaded" class="flex flex-col gap-2 w-full max-w-4xl mx-auto">
    <div class="flex flex-col">
      <h1 class="font-semibold">
        {{ id }}
      </h1>
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
      <div class="flex flex-col">
        <p class="font-semibold">
          Total
        </p>
        <div v-for="attribute in attributes" :key="attribute" class="flex flex-col">
          <p>{{ character.getProperty(attribute) }}</p>
        </div>
      </div>
      <div class="flex flex-col">
        <p class="font-semibold">
          Mod
        </p>
        <div v-for="mod in attributesMods" :key="mod" class="flex flex-col">
          <p>{{ character.getProperty(mod) }}</p>
        </div>
      </div>
    </div>
    <div v-auto-animate class="flex flex-col gap-2">
      <button id="add-change" type="button" class="px-2 py-1.5 bg-neutral-300 rounded-sm" @click.prevent="showAddChange = !showAddChange">
        + Add Change
      </button>
      <div v-if="showAddChange && addChangeHolder" v-auto-animate class="flex flex-wrap items-center gap-2 p-2 border border-black rounded-sm">
        <select :id="`target-property-${addChangeHolder.id}`" v-model="addChangeHolder.targetProperty" class="w-full px-2 py-1.5 bg-neutral-300 rounded-sm">
          <option disabled selected value>
            Target Property
          </option>
          <option v-for="propertyType in Object.values(PropertyType)" :key="propertyType" :value="propertyType">
            {{ $t(`properties.${propertyType}`) }}
          </option>
        </select>
        <div v-if="!addChangeHolder.isSubstitution" class="flex items-center gap-1 w-full">
          <p class="font-semibold whitespace-nowrap">
            Action
          </p>
          <select :id="`action-${addChangeHolder.id}`" v-model="addChangeHolder.action" class="w-full px-2 py-1.5 bg-neutral-300">
            <option v-for="operationAction in Object.values(OperationAction)" :key="operationAction" :value="operationAction">
              {{ $t(`operation-action.${operationAction}`) }}
            </option>
          </select>
        </div>
        <div v-if="!addChangeHolder.isBasedOnProperty || addChangeHolder.isSubstitution" class="flex items-center gap-1 w-full">
          <p class="font-semibold whitespace-nowrap">
            {{ `${addChangeHolder.isSubstitution? 'Absolute ': ''}Value` }}
          </p>
          <input
            id="value-input"
            v-model="addChangeHolder.absoluteValue"
            type="number"
            pattern="[0-9]"
            min="0"
            class="w-full px-2 py-1 border border-neutral-300 rounded-sm outline-none"
          >
        </div>
        <div v-else class="flex flex-col gap-2">
          <div class="flex items-center gap-1 w-full">
            <p class="font-semibold whitespace-nowrap">
              Based on
            </p>
            <select :id="`property-select-${addChangeHolder.id}`" v-model="addChangeHolder.basedOnProperty!.type" class="w-full px-2 py-1.5 bg-neutral-300 rounded-sm">
              <option disabled selected value>
                Optional Property
              </option>
              <option v-for="propertyType in Object.values(PropertyType)" :key="propertyType" :value="propertyType">
                {{ $t(`properties.${propertyType}`) }}
              </option>
            </select>
          </div>
          <div class="flex items-center gap-1 w-full">
            <p class="font-semibold whitespace-nowrap">
              Property Action
            </p>
            <select :id="`action-${addChangeHolder.id}`" v-model="addChangeHolder.basedOnProperty!.action" class="w-full px-2 py-1.5 bg-neutral-300 rounded-sm">
              <option v-for="operationAction in Object.values(OperationAction)" :key="operationAction" :value="operationAction">
                {{ $t(`operation-action.${operationAction}`) }}
              </option>
            </select>
          </div>
          <div class="flex items-center gap-1 w-full">
            <p class="font-semibold whitespace-nowrap">
              Modifier Value
            </p>
            <input
              id="value-input"
              v-model="addChangeHolder.basedOnProperty!.value"
              type="number"
              pattern="[0-9]"
              min="0"
              class="w-full px-2 py-1 border border-neutral-300 rounded-sm outline-none"
            >
          </div>
        </div>
        <div v-if="!addChangeHolder.isSubstitution" class="flex items-center gap-1 w-full">
          <input :id="`based-on-property-${addChangeHolder.id}`" v-model="addChangeHolder.isBasedOnProperty" type="checkbox" class="w-4 h-4">
          <label :for="`based-on-property-${addChangeHolder.id}`">Based on Property</label>
        </div>
        <div v-if="!addChangeHolder.isSubstitution" class="flex items-center gap-1 w-full">
          <input :id="`is-percentage-${addChangeHolder.id}`" v-model="addChangeHolder.isPercentage" type="checkbox" class="w-4 h-4">
          <label :for="`is-percentage-${addChangeHolder.id}`">Is Percentage</label>
        </div>
        <div class="flex items-center gap-1 w-full">
          <input :id="`is-substitution-${addChangeHolder.id}`" v-model="addChangeHolder.isSubstitution" type="checkbox" class="w-4 h-4">
          <label :for="`is-substitution-${addChangeHolder.id}`">Is Substitution</label>
        </div>
        <button id="save-change" type="button" class="w-full px-2 py-1.5 bg-neutral-300 rounded-sm" @click.prevent="addOperation">
          Save
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div v-for="(property, propertyIndex) in character.properties" :key="property.type" v-auto-animate class="flex flex-col border border-black rounded-sm">
        <button :id="`menu-${property.type}`" type="button" class="flex items-center justify-between text-start p-2" @click.prevent="propertyToggles[propertyIndex].showMenu = !propertyToggles[propertyIndex].showMenu ">
          <p class="font-semibold">
            {{ $t(`properties.${property.type}`) }}
          </p>
          <NuxtIcon name="chevron-down" class="text-xl" :class="{'rotate-180': propertyToggles[propertyIndex].showMenu }" />
        </button>
        <div v-if="propertyToggles[propertyIndex] && propertyToggles[propertyIndex].showMenu" class="flex flex-col">
          <div v-for="operation in property.operations" :key="operation.id" v-auto-animate class="flex flex-wrap items-center gap-2 p-2 border-t border-black">
            <div v-if="!operation.isSubstitution" class="flex items-center gap-1 w-full">
              <p class="font-semibold whitespace-nowrap">
                Action
              </p>
              <select :id="`action-${operation.id}`" v-model="operation.action" class="w-full px-2 py-1.5 bg-neutral-300">
                <option v-for="operationAction in Object.values(OperationAction)" :key="operationAction" :value="operationAction">
                  {{ $t(`operation-action.${operationAction}`) }}
                </option>
              </select>
            </div>
            <div v-if="!operation.isBasedOnProperty || operation.isSubstitution" class="flex items-center gap-1 w-full">
              <p class="font-semibold whitespace-nowrap">
                {{ `${operation.isSubstitution? 'Absolute ': ''}Value` }}
              </p>
              <input
                id="value-input"
                v-model="operation.absoluteValue"
                type="number"
                pattern="[0-9]"
                min="0"
                class="w-full px-2 py-1 border border-neutral-300 rounded-sm outline-none"
              >
            </div>
            <div v-else class="flex flex-col gap-2">
              <div class="flex items-center gap-1 w-full">
                <p class="font-semibold whitespace-nowrap">
                  Based on
                </p>
                <select :id="`property-select-${operation.id}`" v-model="operation.basedOnProperty.type" class="w-full px-2 py-1.5 bg-neutral-300 rounded-sm">
                  <option disabled selected value>
                    Optional Property
                  </option>
                  <option v-for="propertyType in Object.values(PropertyType)" :key="propertyType" :value="propertyType">
                    {{ $t(`properties.${propertyType}`) }}
                  </option>
                </select>
              </div>
              <div class="flex items-center gap-1 w-full">
                <p class="font-semibold whitespace-nowrap">
                  Property Action
                </p>
                <select :id="`action-${operation.id}`" v-model="operation.basedOnProperty.action" class="w-full px-2 py-1.5 bg-neutral-300 rounded-sm">
                  <option v-for="operationAction in Object.values(OperationAction)" :key="operationAction" :value="operationAction">
                    {{ $t(`operation-action.${operationAction}`) }}
                  </option>
                </select>
              </div>
              <div class="flex items-center gap-1 w-full">
                <p class="font-semibold whitespace-nowrap">
                  Modifier Value
                </p>
                <input
                  id="value-input"
                  v-model="operation.basedOnProperty.value"
                  type="number"
                  pattern="[0-9]"
                  min="0"
                  class="w-full px-2 py-1 border border-neutral-300 rounded-sm outline-none"
                >
              </div>
            </div>
            <div v-if="!operation.isSubstitution" class="flex items-center gap-1 w-full">
              <input :id="`based-on-property-${operation.id}`" v-model="operation.isBasedOnProperty" type="checkbox" class="w-4 h-4">
              <label :for="`based-on-property-${operation.id}`">Based on Property</label>
            </div>
            <div v-if="!operation.isSubstitution" class="flex items-center gap-1 w-full">
              <input :id="`is-percentage-${operation.id}`" v-model="operation.isPercentage" type="checkbox" class="w-4 h-4">
              <label :for="`is-percentage-${operation.id}`">Is Percentage</label>
            </div>
            <div class="flex items-center gap-1 w-full">
              <input :id="`is-substitution-${operation.id}`" v-model="operation.isSubstitution" type="checkbox" class="w-4 h-4">
              <label :for="`is-substitution-${operation.id}`">Is Substitution</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { Character, OperationAction, PropertyType, type IOperation } from '~/types'

const route = useRoute()

const id = route.params.id.toString()

const characterLoaded = ref(false)
const showAddChange = ref(false)
const addChangeHolder = ref<IOperation>()

const character = ref(new Character(
  'Jose',
  'Tai Lung',
  'Falcões de Primus',
  [],
  [],
  [
    {
      type: PropertyType.ATTRIBUTES_MOD_STRENGTH,
      operations: [
        {
          id: uuidv4(),
          action: OperationAction.SUM,
          absoluteValue: 0,
          basedOnProperty: {
            type: PropertyType.ATTRIBUTES_STRENGTH,
            action: OperationAction.DIVISION,
            value: 2
          },
          isBasedOnProperty: true,
          isPercentage: false,
          isSubstitution: false,
          priority: 0
        }
      ]
    },
    {
      type: PropertyType.ATTRIBUTES_MOD_AGILITY,
      operations: [
        {
          id: uuidv4(),
          action: OperationAction.SUM,
          absoluteValue: 0,
          basedOnProperty: {
            type: PropertyType.ATTRIBUTES_AGILITY,
            action: OperationAction.DIVISION,
            value: 2
          },
          isBasedOnProperty: true,
          isPercentage: false,
          isSubstitution: false,
          priority: 0
        }
      ]
    },
    {
      type: PropertyType.ATTRIBUTES_MOD_DEXTERITY,
      operations: [
        {
          id: uuidv4(),
          action: OperationAction.SUM,
          absoluteValue: 0,
          basedOnProperty: {
            type: PropertyType.ATTRIBUTES_DEXTERITY,
            action: OperationAction.DIVISION,
            value: 2
          },
          isBasedOnProperty: true,
          isPercentage: false,
          isSubstitution: false,
          priority: 0
        }
      ]
    }
  ]
))

const propertyToggles = ref<{ showMenu: boolean }[]>([])

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

function addOperation () {
  if (addChangeHolder.value) {
    addChangeHolder.value.id = uuidv4()
    const existingPropertyIndex = character.value.properties.findIndex(property => property.type === addChangeHolder.value?.targetProperty)
    if (existingPropertyIndex >= 0) {
      delete addChangeHolder.value.targetProperty
      character.value.properties[existingPropertyIndex].operations.push(toRaw(addChangeHolder.value))
    } else {
      const target = addChangeHolder.value.targetProperty as PropertyType
      delete addChangeHolder.value.targetProperty
      character.value.properties.push({
        type: target,
        operations: [toRaw(addChangeHolder.value)]
      })
      propertyToggles.value.push({
        showMenu: false
      })
    }
    showAddChange.value = false
    resetChangeHolder()
  }
}

function resetChangeHolder () {
  addChangeHolder.value = {
    id: 'null',
    action: OperationAction.SUM,
    absoluteValue: 0,
    basedOnProperty: {
      type: PropertyType.ATTRIBUTES_AGILITY,
      action: OperationAction.DIVISION,
      value: 1
    },
    isBasedOnProperty: false,
    isPercentage: false,
    isSubstitution: false,
    priority: 0,
    targetProperty: ''
  }
}

onBeforeMount(async () => {
  propertyToggles.value = await Promise.all(character.value.properties.map(() => {
    return {
      showMenu: false
    }
  }))
  resetChangeHolder()
  characterLoaded.value = true
})
</script>

<style scoped>

</style>
