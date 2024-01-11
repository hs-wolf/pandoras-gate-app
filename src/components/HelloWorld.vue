<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-2xl text-primary">
      Hello (with tailwind styles)
    </h1>
    <div class="flex flex-col gap-2">
      <p class="font-semibold">
        Image Optimizer
      </p>
      <NuxtImg
        src="/spaghetti.jpg"
        width="256"
        height="128"
        loading="lazy"
        :ismap="true"
        decoding="auto"
        class="w-[50%] object-cover"
      />
    </div>
    <div class="flex flex-col items-start gap-2">
      <p class="font-semibold">
        Animated List
      </p>
      <button id="organize" type="button" class="px-2 py-1 bg-gray-400" @click.prevent="organizeList">
        Oraganize List
      </button>
      <ul v-auto-animate class="flex flex-col">
        <li v-for="item in list" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col">
      <p class="font-semibold">
        VueUse Composable
      </p>
      <div class="flex gap-2">
        <p>Mouse X {{ x }}</p>
        <p>Mouse Y {{ y }}</p>
      </div>
    </div>
    <div class="flex flex-col items-start gap-2">
      <p class="font-semibold">
        Localization: {{ $t('key') }} | {{ $t('nested.value') }}
      </p>
      <button id="english" type="button" class="px-2 py-1 bg-gray-400" @click.prevent="switchLanguage('en')">
        {{ $t('english') }}
      </button>
      <button id="portuguese" type="button" class="px-2 py-1 bg-gray-400" @click.prevent="switchLanguage('pt')">
        {{ $t('portuguese') }}
      </button>
    </div>
    <div class="flex flex-col gap-2">
      <p class="font-semibold">
        SVG Icons
      </p>
      <div class="flex gap-2 text-2xl">
        <NuxtIcon name="moon" />
        <NuxtIcon name="sun" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const alertsStore = useAlertsStore()
const { x, y } = useMouse()
const switchLocalePath = useSwitchLocalePath()

const list = ref(['Apple', 'Banana', 'Grape', 'Orange'])
const listOrder = ref(0)

function organizeList () {
  list.value.sort((a, b) => {
    if (a < b) {
      return listOrder.value === 0 ? -1 : 1
    }
    if (a > b) {
      return listOrder.value === 0 ? 1 : -1
    }
    return 0
  })
  listOrder.value = listOrder.value === 0 ? 1 : 0
}

function switchLanguage (locale:string) {
  navigateTo(switchLocalePath(locale))
}

onMounted(() => {
  alertsStore.handlerError(new Error('Testing Error'))
})
</script>

<style scoped>

</style>
