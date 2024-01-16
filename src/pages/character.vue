<template>
  <div v-auto-animate class="flex flex-col h-full pb-12">
    <component :is="tabsList[currentTab].component" v-model="character" class="h-full overflow-auto" />
    <div class="z-10 fixed bottom-0 inset-x-0 grid h-12 bg-primary" :style="{ 'grid-template-columns': `repeat(${tabsList.length}, minmax(0, 1fr))` }">
      <button
        v-for="(tab, tabIndex) in tabsList"
        id="tab-change"
        :key="tab.name"
        type="button"
        class="text-white active:bg-primary-dark transition-colors"
        @click.prevent="changeTab(tabIndex)"
      >
        {{ $t(`components.character.tabs.${tab.name}.title`) }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ConcreteComponent } from 'vue'
import { Character, DEFAULT_CHARACTER_FORMULAS } from '~/types'

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
</script>

<style scoped>

</style>
