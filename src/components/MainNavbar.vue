<template>
  <div v-auto-animate class="z-[200] flex flex-col md:w-full md:max-w-4xl md:mx-auto">
    <div class="flex items-center justify-between h-12 md:h-16 md:shrink-0">
      <h1 class="text-2xl md:text-3xl p-3 md:p-0 leading-none">
        {{ title }}
      </h1>
      <button class="flex p-3 md:p-0" @click.prevent="showMenu = !showMenu">
        <NuxtIcon name="hamburger-menu" class="text-2xl transition-transform" :class="{ 'rotate-90' : showMenu }" />
      </button>
    </div>
    <div v-if="showMenu" class="fixed inset-0 flex flex-col gap-3 md:static md:w-full md:max-w-4xl md:mx-auto bg-white dark:bg-black">
      <div class="flex items-center justify-between h-12 md:hidden">
        <h1 class="text-2xl p-3 leading-none">
          {{ title }}
        </h1>
        <button class="flex p-3" @click.prevent="showMenu = false">
          <NuxtIcon name="x-close" class="text-2xl" />
        </button>
      </div>
      <div class="flex flex-col gap-3 h-full overflow-auto">
        <div class="flex flex-col items-end gap-3 p-3 md:p-0">
          <NuxtLink
            v-for="link in menuLinks"
            :key="link"
            :to="localePath({ name: link })"
            class="flex text-2xl"
            exact-active-class="pe-3 border-e-4 border-primary dark:border-primary-light font-semibold text-primary dark:text-primary-light"
            @click.prevent="menuLinkClick"
          >
            {{ $t(`components.navbar.links.${link}`) }}
          </NuxtLink>
        </div>
        <div class="grid grid-cols-2 gap-3 mt-auto px-3 py-6 md:p-0">
          <div class="flex flex-col items-start gap-3">
            <button
              v-for="theme in menuThemes"
              :id="`change-theme-${theme}`"
              :key="theme.name"
              class="flex items-center gap-1"
              :class="{ 'font-semibold text-primary dark:text-primary-light': colorMode.preference === theme.name }"
              @click.prevent="changeColorMode(theme.name)"
            >
              <p class="text-lg">
                {{ $t(`themes.${theme.name}`) }}
              </p>
              <NuxtIcon :name="theme.icon" class="text-xl" />
            </button>
          </div>
          <div class="flex flex-col justify-end items-end gap-3">
            <button
              v-for="language in Object.values(SupportedLocales)"
              :id="`change-language-${language}`"
              :key="language"
              class="flex items-center gap-1"
              :class="{ 'font-semibold text-primary dark:text-primary-light': $i18n.locale === language }"
              @click.prevent="changeLanguage(language)"
            >
              <p class="text-lg">
                {{ $t(`languages.${language}`) }}
              </p>
              <NuxtIcon :name="`flags/${language}`" class="text-xl" filled />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SupportedLocales } from '~/utils/constants'

const localePath = useLocalePath()
const colorMode = useColorMode()
const navbarStore = useNavbarStore()
const { title } = storeToRefs(navbarStore)
const localesStore = useLocalesStore()

const showMenu = ref(false)
const menuLinks = ref(['index', 'character-sheet'])
const menuThemes = ref([
  {
    name: 'light',
    icon: 'sun'
  },
  {
    name: 'dark',
    icon: 'moon'
  },
  {
    name: 'system',
    icon: 'screen'
  }
])

function menuLinkClick () {
  showMenu.value = false
}

function changeColorMode (value: string) {
  colorMode.preference = value
}

function changeLanguage (locale: SupportedLocales) {
  localesStore.changeLocale(locale)
}
</script>

<style scoped>

</style>
