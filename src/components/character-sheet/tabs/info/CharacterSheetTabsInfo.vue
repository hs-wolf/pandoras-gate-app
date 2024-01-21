<template>
  <div v-auto-animate class="flex flex-col gap-2 px-2 py-3">
    <CharacterSheetTabsInfoBase v-model="character" />
    <CharacterSheetTabsInfoGeneral v-model="character" />
    <div class="grid grid-cols-2 gap-2 p-2 border border-black/20 dark:border-white/40 rounded-sm">
      <div class="conditions-item text-red-700">
        <p>{{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HP}`) }}</p>
        <span>{{ `${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HP)} / ${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_MAX_HP)}` }}</span>
      </div>
      <div class="conditions-item text-purple-700">
        <p>{{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_SP}`) }}</p>
        <span>{{ `${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_SP)} / ${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_MAX_SP)}` }}</span>
      </div>
      <div class="conditions-item text-blue-700">
        <p>{{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_MP}`) }}</p>
        <span>{{ `${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_MP)} / ${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_MAX_MP)}` }}</span>
      </div>
      <div class="conditions-item">
        <p>{{ $t(`properties.${CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HUNGER}`) }}</p>
        <span>{{ `${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HUNGER)} / ${character.getProperty(CONDITIONS_PROPERTIES.CONDITIONS_MAX_HUNGER)}` }}</span>
      </div>
    </div>
    <div class="grid grid-cols-3 p-2 border border-black/20 dark:border-white/40 rounded-sm">
      <div class="flex flex-col">
        <p class="font-semibold">
          {{ $t('components.character-sheet.tabs.info.attribute') }}
        </p>
        <div v-for="attribute in ATTRIBUTES_PROPERTIES" :key="attribute" class="flex flex-col">
          <p>{{ $t(`properties.${attribute}`) }}</p>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <p class="font-semibold">
          {{ $t('components.character-sheet.tabs.info.total') }}
        </p>
        <div v-for="attribute in ATTRIBUTES_PROPERTIES" :key="attribute" class="flex flex-col">
          <p>{{ character.getProperty(attribute) }}</p>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <p class="font-semibold">
          {{ $t('components.character-sheet.tabs.info.modifier') }}
        </p>
        <div v-for="mod in ATTRIBUTES_MOD_PROPERTIES" :key="mod" class="flex flex-col">
          <p>{{ character.getProperty(mod) }}</p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-2">
        <div class="property-section">
          <h1>
            {{ $t('components.character-sheet.tabs.info.stats') }}
          </h1>
          <div class="flex flex-col">
            <div v-for="property in Object.values(STATS_PROPERTIES)" :key="property" class="property-item">
              <p>{{ $t(`properties.${property}`) }}:</p>
              <span>{{ character.getProperty(property) }}</span>
            </div>
          </div>
        </div>
        <div class="property-section">
          <h1>
            {{ $t('components.character-sheet.tabs.info.hits') }}
          </h1>
          <div class="flex flex-col">
            <div v-for="property in Object.values(HIT_PROPERTIES)" :key="property" class="property-item">
              <p>{{ $t(`properties.${property}`) }}:</p>
              <span>{{ character.getProperty(property) }}</span>
            </div>
          </div>
        </div>
        <div class="property-section">
          <h1>
            {{ $t('components.character-sheet.tabs.info.physical-bonus') }}
          </h1>
          <div class="flex flex-col">
            <div v-for="property in Object.values(PHYSICIAL_BONUS_PROPERTIES)" :key="property" class="property-item">
              <p>{{ $t(`properties.${property}`) }}:</p>
              <span>{{ character.getProperty(property) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="property-section">
          <h1>
            {{ $t('components.character-sheet.tabs.info.ranges') }}
          </h1>
          <div class="flex flex-col">
            <div v-for="property in Object.values(RANGE_PROPERTIES)" :key="property" class="property-item">
              <p>{{ $t(`properties.${property}`) }}:</p>
              <span>{{ character.getProperty(property) }}</span>
            </div>
          </div>
        </div>
        <div class="property-section">
          <h1>
            {{ $t('components.character-sheet.tabs.info.magical-bonus') }}
          </h1>
          <div class="flex flex-col">
            <div v-for="property in Object.values(MAGICAL_BONUS_PROPERTIES)" :key="property" class="property-item">
              <p>{{ $t(`properties.${property}`) }}:</p>
              <span>{{ character.getProperty(property) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div class="property-section">
        <h1>
          {{ $t('components.character-sheet.tabs.info.expertises-strength') }}
        </h1>
        <div class="flex flex-col">
          <div v-for="property in Object.values(EXPERTISE_STRENGTH_PROPERTIES)" :key="property" class="property-item">
            <p>{{ $t(`properties.${property}`) }}:</p>
            <span>{{ character.getProperty(property) }}</span>
          </div>
        </div>
      </div>
      <div class="property-section">
        <h1>
          {{ $t('components.character-sheet.tabs.info.expertises-agility') }}
        </h1>
        <div class="flex flex-col">
          <div v-for="property in Object.values(EXPERTISE_AGILITY_PROPERTIES)" :key="property" class="property-item">
            <p>{{ $t(`properties.${property}`) }}:</p>
            <span>{{ character.getProperty(property) }}</span>
          </div>
        </div>
      </div>
      <div class="property-section">
        <h1>
          {{ $t('components.character-sheet.tabs.info.expertises-dexterity') }}
        </h1>
        <div class="flex flex-col">
          <div v-for="property in Object.values(EXPERTISE_DEXTERITY_PROPERTIES)" :key="property" class="property-item">
            <p>{{ $t(`properties.${property}`) }}:</p>
            <span>{{ character.getProperty(property) }}</span>
          </div>
        </div>
      </div>
      <div class="property-section">
        <h1>
          {{ $t('components.character-sheet.tabs.info.expertises-vitality') }}
        </h1>
        <div class="flex flex-col">
          <div v-for="property in Object.values(EXPERTISE_VITALITY_PROPERTIES)" :key="property" class="property-item">
            <p>{{ $t(`properties.${property}`) }}:</p>
            <span>{{ character.getProperty(property) }}</span>
          </div>
        </div>
      </div>
      <div class="property-section">
        <h1>
          {{ $t('components.character-sheet.tabs.info.expertises-spirit') }}
        </h1>
        <div class="flex flex-col">
          <div v-for="property in Object.values(EXPERTISE_SPIRIT_PROPERTIES)" :key="property" class="property-item">
            <p>{{ $t(`properties.${property}`) }}:</p>
            <span>{{ character.getProperty(property) }}</span>
          </div>
        </div>
      </div>
      <div class="property-section">
        <h1>
          {{ $t('components.character-sheet.tabs.info.expertises-luck') }}
        </h1>
        <div class="flex flex-col">
          <div v-for="property in Object.values(EXPERTISE_LUCK_PROPERTIES)" :key="property" class="property-item">
            <p>{{ $t(`properties.${property}`) }}:</p>
            <span>{{ character.getProperty(property) }}</span>
          </div>
        </div>
      </div>
      <div class="property-section">
        <h1>
          {{ $t('components.character-sheet.tabs.info.expertises-special') }}
        </h1>
        <div class="flex flex-col">
          <div v-for="property in Object.values(EXPERTISE_SPECIAL_PROPERTIES)" :key="property" class="property-item">
            <p>{{ $t(`properties.${property}`) }}:</p>
            <span>{{ character.getProperty(property) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Character,
  CONDITIONS_PROPERTIES,
  ATTRIBUTES_PROPERTIES,
  ATTRIBUTES_MOD_PROPERTIES,
  STATS_PROPERTIES,
  RANGE_PROPERTIES,
  HIT_PROPERTIES,
  PHYSICIAL_BONUS_PROPERTIES,
  MAGICAL_BONUS_PROPERTIES,
  EXPERTISE_STRENGTH_PROPERTIES,
  EXPERTISE_AGILITY_PROPERTIES,
  EXPERTISE_DEXTERITY_PROPERTIES,
  EXPERTISE_VITALITY_PROPERTIES,
  EXPERTISE_SPIRIT_PROPERTIES,
  EXPERTISE_LUCK_PROPERTIES,
  EXPERTISE_SPECIAL_PROPERTIES
} from '~/types'

const character = defineModel<Character>({ required: true })
</script>

<style scoped>
.general-property {
  @apply flex items-center gap-1;
  span {
    @apply font-semibold;
  }
}
.property-section {
  @apply flex flex-col border border-black/20 dark:border-white/40 p-2 rounded-sm;
  h1 {
    @apply text-lg font-semibold;
  }
}

.conditions-item {
  @apply flex items-center gap-2 text-lg;
  span {
    @apply font-semibold text-xl;
  }
}

.property-item {
  @apply flex items-center gap-1;
  p {
    @apply text-sm;
  }
  span {
    @apply font-semibold;
  }
}
</style>
