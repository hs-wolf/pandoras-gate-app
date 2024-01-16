<template>
  <div
    v-auto-animate
    class="flex flex-col gap-2 w-full p-2"
    :class=" showTarget ? 'border border-neutral-400 dark:border-neutral-400 rounded-sm' : 'border-b border-neutral-400 last:border-none'"
  >
    <!-- THE FIELD FOR THE OPERATION DESCRIPTION -->
    <div class="flex flex-col gap-2">
      <p class="font-semibold whitespace-nowrap">
        {{ $t('components.character.property.card.operation.description') }}
      </p>
      <input
        id="value-input"
        v-model="operation.description"
        type="text"
        class="custom-input"
      >
    </div>
    <!-- OPTIONAL TARGET FIELD -->
    <div v-if="showTarget" class="flex items-center gap-2">
      <p class="font-semibold whitespace-nowrap">
        {{ $t('components.character.property.card.operation.target') }}
      </p>
      <select :id="`operation-target-${operation.id}`" v-model="operation.target" class="custom-select">
        <option v-for="operationAction in Object.values(ALL_PROPERTIES)" :key="operationAction" :value="operationAction">
          {{ $t(`properties.${operationAction}`) }}
        </option>
      </select>
    </div>
    <!-- THE MAIN ACTION TAKEN IF NOT A SUBSTITUTION -->
    <div v-if="!operation.isSubstitution" class="flex items-center gap-2">
      <p class="font-semibold whitespace-nowrap">
        {{ $t('components.character.property.card.operation.action') }}
      </p>
      <select :id="`action-${operation.id}`" v-model="operation.action" class="custom-select">
        <option v-for="operationAction in Object.values(OperationAction)" :key="operationAction" :value="operationAction">
          {{ $t(`operation-action.${operationAction}`) }}
        </option>
      </select>
    </div>
    <div v-auto-animate class="flex items-center gap-2">
      <!-- THE FIELD FOR THE ACTION VALUE OR ABSOLUTE VALUE -->
      <div v-if="!operation.isBasedOnProperty || operation.isSubstitution" class="flex items-center gap-2 w-full">
        <p class="font-semibold whitespace-nowrap">
          {{ $t(operation.isSubstitution ? 'components.character.property.card.operation.substitution-value' : 'components.character.property.card.operation.value') }}
        </p>
        <input
          id="value-input"
          v-model="operation.value"
          type="number"
          pattern="[0-9]"
          min="0"
          class="custom-input"
        >
      </div>
      <div v-if="!operation.isSubstitution && !operation.isBasedOnProperty" class="flex items-center gap-2 whitespace-nowrap">
        <input :id="`is-percentage-${operation.id}`" v-model="operation.isPercentage" type="checkbox" class="custom-checkbox">
        <label :for="`is-percentage-${operation.id}`">{{ $t('components.character.property.card.operation.is-percetage') }}</label>
      </div>
    </div>
    <!-- THE CHECKBOX THAT SHOW OR HIDE THE BASED ON PROPERTY FIELDS -->
    <div v-if="!operation.isSubstitution" v-auto-animate class="flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <input :id="`is-based-on-property-${operation.id}`" v-model="operation.isBasedOnProperty" type="checkbox" class="custom-checkbox">
        <label :for="`is-based-on-property-${operation.id}`">{{ $t('components.character.property.card.operation.is-based-on-property') }}</label>
      </div>
      <!-- THE FIELDS FOR WHEN THE VALUE IS ANOTHER PROPERTY -->
      <div v-if="operation.isBasedOnProperty && operation.basedOnProperty" v-auto-animate class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <p class="font-semibold whitespace-nowrap">
            {{ $t('components.character.property.card.operation.based-on') }}
          </p>
          <select :id="`property-select-${operation.id}`" v-model="operation.basedOnProperty.type" class="custom-select">
            <option v-for="propertyType in selectableTypes" :key="propertyType" :value="propertyType">
              {{ $t(`properties.${propertyType}`) }}
            </option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <input :id="`modify-property-${operation.id}`" v-model="operation.basedOnProperty.modifyProperty" type="checkbox" class="custom-checkbox">
          <label :for="`modify-property-${operation.id}`">{{ $t('components.character.property.card.operation.modify-property') }}</label>
        </div>
        <div v-if="operation.basedOnProperty.modifyProperty" class="flex flex-col gap-2">
          <div class="flex items-center gap-2 w-full">
            <p class="font-semibold whitespace-nowrap">
              {{ $t('components.character.property.card.operation.property-action') }}
            </p>
            <select :id="`action-${operation.id}`" v-model="operation.basedOnProperty.modifierAction" class="custom-select">
              <option v-for="operationAction in Object.values(OperationAction)" :key="operationAction" :value="operationAction">
                {{ $t(`operation-action.${operationAction}`) }}
              </option>
            </select>
          </div>
          <div class="flex items-center gap-2 w-full">
            <p class="font-semibold whitespace-nowrap">
              {{ $t('components.character.property.card.operation.property-action-value') }}
            </p>
            <input
              id="value-input"
              v-model="operation.basedOnProperty.modifierValue"
              type="number"
              pattern="[0-9]"
              min="0"
              class="custom-input"
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="!operation.isBasedOnProperty" class="flex items-center gap-2">
      <input :id="`is-substitution-${operation.id}`" v-model="operation.isSubstitution" type="checkbox" class="custom-checkbox">
      <label :for="`is-substitution-${operation.id}`">{{ $t('components.character.property.card.operation.is-substitution') }}</label>
    </div>
    <!-- THE FIELD FOR THE PRIORITY VALUE WHEN DOING A SUBSTITUTION OPERATION -->
    <div v-if="operation.isSubstitution" class="flex items-center gap-2">
      <p class="font-semibold whitespace-nowrap">
        {{ $t('components.character.property.card.operation.priority-value') }}
      </p>
      <input
        id="value-input"
        v-model="operation.substitutionPriority"
        type="number"
        pattern="[0-9]"
        min="0"
        class="custom-input"
      >
    </div>
    <!-- <div class="flex whitespace-pre-line">
      {{ formattedJSON }}
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { type IOperation, OperationAction, ALL_PROPERTIES } from '~/types'

defineProps<{ showTarget?: boolean }>()

const operation = defineModel<IOperation>({ required: true })

// const formattedJSON = computed(() => JSON.stringify(operation.value, null, 4))

const selectableTypes = computed(() => {
  const arrayOfProperties = Object.values(ALL_PROPERTIES)
  const existingIndex = arrayOfProperties.findIndex(value => value === operation.value.target)
  if (existingIndex >= 0) {
    arrayOfProperties.splice(existingIndex, 1)
  }
  return arrayOfProperties
})

watch(() => operation.value.target, () => {
  if (operation.value.target === operation.value.basedOnProperty?.type) {
    operation.value.basedOnProperty.type = selectableTypes.value[0]
  }
})

watch(() => operation.value.isSubstitution, () => {
  if (operation.value.isSubstitution) {
    operation.value.isBasedOnProperty = false
    operation.value.isPercentage = false
  }
})

watch(() => operation.value.isBasedOnProperty, () => {
  if (operation.value.isBasedOnProperty) {
    if (!operation.value.basedOnProperty) {
      operation.value.basedOnProperty = {
        type: selectableTypes.value[0],
        modifyProperty: false
      }
    }
  }
})

watch(() => operation.value.basedOnProperty?.modifyProperty, () => {
  if (operation.value.basedOnProperty) {
    if (operation.value.basedOnProperty.modifyProperty) {
      operation.value.basedOnProperty.modifierAction = OperationAction.SUM
      operation.value.basedOnProperty.modifierValue = 1
    }
  }
})

</script>

<style scoped lang="scss">
.custom-select {
  @apply w-full px-2 py-1.5 leading-6 bg-neutral-800 rounded-sm text-white;
}
.custom-checkbox {
  @apply w-4 h-4;
}
.custom-input {
  @apply w-full px-1.5 py-1 bg-neutral-800 border border-neutral-800 rounded-sm outline-none text-white;
}
</style>
