<template>
  <div v-auto-animate class="flex flex-col gap-0.5">
    <button v-if="!keepOpen" class="flex items-center justify-between px-3 py-2 bg-primary text-white rounded-sm" @click.prevent="showDetails = !showDetails">
      <p> {{ operation.description }}</p>
      <NuxtIcon name="chevron-down" class="!text-xl transition-transform" :class="{'rotate-180': showDetails }" />
    </button>
    <div
      v-if="showDetails"
      v-auto-animate
      class="flex flex-col gap-0.5"
    >
      <!-- THE FIELD FOR THE OPERATION DESCRIPTION -->
      <div class="flex gap-0.5">
        <input
          id="value-input"
          v-model="operation.description"
          type="text"
          class="custom-input"
        >
        <div v-if="deleteable" class="flex justify-end">
          <div v-if="confirmDelete" class="flex gap-0.5">
            <button class="btn btn-primary" @click.prevent="confirmDelete = false">
              <NuxtIcon name="return" />
            </button>
            <button class="btn btn-danger" @click.prevent="$emit('delete')">
              <NuxtIcon name="check" />
            </button>
          </div>
          <button v-else class="btn btn-danger" @click.prevent="confirmDelete = true">
            <NuxtIcon name="trash-can" class="text-xl" />
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-2 p-2" :class=" showTarget ? 'border border-black/20 dark:border-white/40 rounded-sm' : 'border-b border-black/20 dark:border-white/40 last:border-none'">
        <!-- OPTIONAL TARGET FIELD -->
        <div v-if="showTarget" class="flex items-center gap-2">
          <p class="font-semibold whitespace-nowrap">
            {{ $t('components.character-sheet.property.card.operation.target') }}
          </p>
          <select :id="`operation-target-${operation.id}`" v-model="operation.target" class="custom-select">
            <option v-for="operationAction in Object.values({ ...ALL_PROPERTIES, ...PROPERTIES_SELECTIONS })" :key="operationAction" :value="operationAction">
              {{ $t(`properties.${operationAction}`).split("_").join(' ') }}
            </option>
          </select>
        </div>
        <!-- THE MAIN ACTION TAKEN IF NOT A SUBSTITUTION -->
        <div v-if="!operation.isSubstitution" class="flex items-center gap-2">
          <p class="font-semibold whitespace-nowrap">
            {{ $t('components.character-sheet.property.card.operation.action') }}
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
              {{ $t(operation.isSubstitution ? 'components.character-sheet.property.card.operation.substitution-value' : 'components.character-sheet.property.card.operation.value') }}
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
            <label :for="`is-percentage-${operation.id}`">{{ $t('components.character-sheet.property.card.operation.is-percetage') }}</label>
          </div>
        </div>
        <!-- THE CHECKBOX THAT SHOW OR HIDE THE BASED ON PROPERTY FIELDS -->
        <div v-if="!operation.isSubstitution" v-auto-animate class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <input :id="`is-based-on-property-${operation.id}`" v-model="operation.isBasedOnProperty" type="checkbox" class="custom-checkbox">
            <label :for="`is-based-on-property-${operation.id}`">{{ $t('components.character-sheet.property.card.operation.is-based-on-property') }}</label>
          </div>
          <!-- THE FIELDS FOR WHEN THE VALUE IS ANOTHER PROPERTY -->
          <div v-if="operation.isBasedOnProperty && operation.basedOnProperty" v-auto-animate class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <p class="font-semibold whitespace-nowrap">
                {{ $t('components.character-sheet.property.card.operation.based-on') }}
              </p>
              <select :id="`property-select-${operation.id}`" v-model="operation.basedOnProperty.type" class="custom-select">
                <option v-for="propertyType in selectableTypes" :key="propertyType" :value="propertyType">
                  {{ $t(`properties.${propertyType}`) }}
                </option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <input :id="`modify-property-${operation.id}`" v-model="operation.basedOnProperty.modifyProperty" type="checkbox" class="custom-checkbox">
              <label :for="`modify-property-${operation.id}`">{{ $t('components.character-sheet.property.card.operation.modify-property') }}</label>
            </div>
            <div v-if="operation.basedOnProperty.modifyProperty" class="flex flex-col gap-2">
              <div class="flex items-center gap-2 w-full">
                <p class="font-semibold whitespace-nowrap">
                  {{ $t('components.character-sheet.property.card.operation.property-action') }}
                </p>
                <select :id="`action-${operation.id}`" v-model="operation.basedOnProperty.modifierAction" class="custom-select">
                  <option v-for="operationAction in Object.values(OperationAction)" :key="operationAction" :value="operationAction">
                    {{ $t(`operation-action.${operationAction}`) }}
                  </option>
                </select>
              </div>
              <div class="flex items-center gap-2 w-full">
                <p class="font-semibold whitespace-nowrap">
                  {{ $t('components.character-sheet.property.card.operation.property-action-value') }}
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
          <label :for="`is-substitution-${operation.id}`">{{ $t('components.character-sheet.property.card.operation.is-substitution') }}</label>
        </div>
        <!-- THE FIELD FOR THE PRIORITY VALUE WHEN DOING A SUBSTITUTION OPERATION -->
        <div v-if="operation.isSubstitution" class="flex items-center gap-2">
          <p class="font-semibold whitespace-nowrap">
            {{ $t('components.character-sheet.property.card.operation.priority-value') }}
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IOperation, OperationAction, ALL_PROPERTIES, PROPERTIES_SELECTIONS } from '~/types'

const props = defineProps<{ showTarget?: boolean, keepOpen?: boolean, deleteable?: boolean }>()

defineEmits<{(e:'delete'): void }>()

const operation = defineModel<IOperation>({ required: true })

const showDetails = ref(props.keepOpen ?? false)
const confirmDelete = ref(false)

const selectableTypes = computed(() => {
  const arrayOfProperties = Object.values({ ...ALL_PROPERTIES, ...PROPERTIES_SELECTIONS })
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
  @apply w-full px-2 py-1.5 leading-6 bg-black/20 dark:bg-white/40 rounded-sm text-black dark:text-white;
}
.custom-checkbox {
  @apply w-4 h-4;
}

</style>
