<template>
  <div v-auto-animate class="flex flex-col gap-2 md:gap-3">
    <CharacterSheetTabsInfoBase v-model="character" @save="saveExplictiChanges" />
    <div class="flex flex-col gap-2 md:gap-3 md:grid md:grid-cols-2">
      <CharacterSheetTabsInfoGeneral v-model="character" @save="saveExplictiChanges" />
      <CharacterSheetTabsInfoConditions v-model="character" @save="saveExplictiChanges" />
    </div>
    <div class="flex flex-col gap-2 md:gap-3 md:grid md:grid-cols-2">
      <CharacterSheetTabsInfoAttributes v-model="character" @save="saveExplictiChanges" />
      <CharacterSheetTabsInfoProperty
        v-model="character"
        :properties="STATS_PROPERTIES"
        :title="$t('components.character-sheet.tabs.info.stats')"
        :break-in-columns="true"
      />
    </div>
    <div class="flex flex-col gap-2 md:gap-3 md:grid md:grid-cols-2">
      <CharacterSheetTabsInfoProperty
        v-model="character"
        :properties="RANGE_PROPERTIES"
        :title="$t('components.character-sheet.tabs.info.ranges')"
      />
      <CharacterSheetTabsInfoProperty
        v-model="character"
        :properties="HIT_PROPERTIES"
        :title="$t('components.character-sheet.tabs.info.hits')"
      />
    </div>
    <CharacterSheetTabsInfoProperty
      v-model="character"
      :properties="PHYSICIAL_BONUS_PROPERTIES"
      :title="$t('components.character-sheet.tabs.info.physical-bonus')"
      :break-in-columns="true"
    />
    <CharacterSheetTabsInfoProperty
      v-model="character"
      :properties="MAGICAL_BONUS_PROPERTIES"
      :title="$t('components.character-sheet.tabs.info.magical-bonus')"
      :break-in-columns="true"
    />
    <div class="flex flex-col gap-2 md:gap-3 md:grid md:grid-cols-2">
      <div class="flex flex-col gap-2 md:gap-3">
        <CharacterSheetTabsInfoExpertise
          v-model="character"
          :properties="EXPERTISE_STRENGTH_PROPERTIES"
          :title="$t('components.character-sheet.tabs.info.expertises-strength')"
          @save="saveExplictiChanges"
        />
        <CharacterSheetTabsInfoExpertise
          v-model="character"
          :properties="EXPERTISE_AGILITY_PROPERTIES"
          :title="$t('components.character-sheet.tabs.info.expertises-agility')"
          @save="saveExplictiChanges"
        />
        <CharacterSheetTabsInfoExpertise
          v-model="character"
          :properties="EXPERTISE_DEXTERITY_PROPERTIES"
          :title="$t('components.character-sheet.tabs.info.expertises-dexterity')"
          @save="saveExplictiChanges"
        />
        <CharacterSheetTabsInfoExpertise
          v-model="character"
          :properties="EXPERTISE_VITALITY_PROPERTIES"
          :title="$t('components.character-sheet.tabs.info.expertises-vitality')"
          @save="saveExplictiChanges"
        />
      </div>
      <div class="flex flex-col gap-2 md:gap-3">
        <CharacterSheetTabsInfoExpertise
          v-model="character"
          :properties="EXPERTISE_SPIRIT_PROPERTIES"
          :title="$t('components.character-sheet.tabs.info.expertises-spirit')"
          @save="saveExplictiChanges"
        />
        <CharacterSheetTabsInfoExpertise
          v-model="character"
          :properties="EXPERTISE_LUCK_PROPERTIES"
          :title="$t('components.character-sheet.tabs.info.expertises-luck')"
          @save="saveExplictiChanges"
        />
        <CharacterSheetTabsInfoExpertise
          v-model="character"
          :properties="EXPERTISE_SPECIAL_PROPERTIES"
          :title="$t('components.character-sheet.tabs.info.expertises-special')"
          @save="saveExplictiChanges"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Character,
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
  EXPERTISE_SPECIAL_PROPERTIES,
  STATS_PROPERTIES
} from '~/types'

const character = defineModel<Character>({ required: true })

const characterSheetStore = useCharacterSheetStore()

const saveExplictiChanges = () => {
  characterSheetStore.saveCharacter()
}
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
