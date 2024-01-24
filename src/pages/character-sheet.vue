<template>
  <div v-if="character" v-auto-animate class="relative flex flex-col md:gap-6 h-full pb-12 md:py-6 overflow-auto">
    <div class="tabs-navbar" :style="{ 'grid-template-columns': `repeat(${tabsList.length}, minmax(0, 1fr))` }">
      <button
        v-for="(tab, tabIndex) in tabsList"
        :id="`tab-change-${tabIndex}`"
        :key="tab.name"
        type="button"
        class="transition-colors"
        :class="{ 'bg-primary text-white': currentTab === tabIndex }"
        @click.prevent="changeTab(tabIndex)"
      >
        {{ $t(`components.character-sheet.tabs.${tab.name}.title`) }}
      </button>
    </div>
    <component :is="tabsList[currentTab].component" v-if="tabsList[currentTab].component" v-model="character" class="px-2 py-3 md:p-0 md:w-full md:max-w-4xl md:mx-auto" />
  </div>
</template>

<script setup lang="ts">
import type { ConcreteComponent } from 'vue'

const { t } = useI18n()
const navbarStore = useNavbarStore()
const characterSheetStore = useCharacterSheetStore()
const { character } = storeToRefs(characterSheetStore)

type CharacterTab = {
  name: string
  component: string | ConcreteComponent
}

const currentTab = ref(0)
const tabsList = shallowRef<CharacterTab[]>([
  {
    name: 'info',
    component: resolveComponent('CharacterSheetTabsInfo')
  },
  {
    name: 'effects',
    component: resolveComponent('CharacterSheetTabsEffects')
  },
  {
    name: 'formulas',
    component: resolveComponent('CharacterSheetTabsFormulas')
  }
])

function changeTab (index: number) {
  if (currentTab.value === index) {
    return
  }
  currentTab.value = index
  triggerRef(tabsList)
}

onBeforeMount(() => {
  navbarStore.setTitle(t('pages.character-sheet.title'))
})
</script>

<style scoped>
.tabs-navbar {
  @apply z-[150] fixed bottom-0 inset-x-0 grid h-12 bg-white border-t overflow-hidden border-black/10;
  @apply md:static md:shrink-0 md:w-full md:max-w-4xl md:mx-auto md:border md:rounded-sm;
  @apply dark:bg-black dark:border-white/15;
}
</style>
