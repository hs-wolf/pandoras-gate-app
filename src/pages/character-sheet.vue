<template>
  <div v-auto-animate class="relative flex flex-col h-full pb-12 overflow-auto">
    <div class="z-[150] fixed bottom-0 inset-x-0 grid h-12 bg-white dark:bg-black border-t border-black/5 dark:border-white/15" :style="{ 'grid-template-columns': `repeat(${tabsList.length}, minmax(0, 1fr))` }">
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
    <component :is="tabsList[currentTab].component" v-if="tabsList[currentTab].component" v-model="character" />
  </div>
</template>

<script setup lang="ts">
import type { ConcreteComponent } from 'vue'
import { Character, DEFAULT_CHARACTER_FORMULAS } from '~/types'

const navbarStore = useNavbarStore()

type CharacterTab = {
  name: string
  component: string | ConcreteComponent
}

const currentTab = ref(0)
const tabsList = shallowRef<CharacterTab[]>([
  {
    name: 'info',
    component: resolveComponent('CharacterTabsInfo')
  },
  {
    name: 'buffs',
    component: resolveComponent('CharacterTabsBuffs')
  },
  {
    name: 'formulas',
    component: resolveComponent('CharacterTabsFormulas')
  }
])

const character = ref(new Character(
  'Jose',
  'Tai Lung',
  'Falcões de Primus',
  [],
  [],
  DEFAULT_CHARACTER_FORMULAS
))

function changeTab (index: number) {
  if (currentTab.value === index) {
    return
  }
  currentTab.value = index
  triggerRef(tabsList)
}

onBeforeMount(() => {
  navbarStore.setTitle('Character')
})
</script>

<style scoped>
.asas {
  position: static;
}
</style>
