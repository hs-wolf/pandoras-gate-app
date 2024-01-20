<template>
  <div v-if="editFields" class="relative flex flex-col gap-2 px-1">
    <input id="character-name" v-model="character.name" type="text" class="custom-input">
    <input id="character-player" v-model="character.player" type="text" class="custom-input">
    <input id="character-guild" v-model="character.guild" type="text" class="custom-input">
    <select id="character-elements" v-model="elements" class="custom-select" multiple>
      <option v-for="element in ELEMENTS_LIST" :key="element.type" :value="element.type">
        {{ $t(`elements.${element.type}`) }}
      </option>
    </select>
    <select id="character-jobs" v-model="jobs" class="custom-select" multiple>
      <option v-for="job in JOBS_LIST" :key="job.type" :value="job.type">
        {{ $t(`jobs.${job.type}`) }}
      </option>
    </select>
    <button id="save-edit-base" class="btn btn-action" @click.prevent="saveChanges">
      {{ $t('general.save-changes') }}
    </button>
  </div>
  <div v-else class="relative flex flex-col px-1">
    <button v-if="!editFields" id="edit-base" class="btn-effect absolute end-0" @click.prevent="toggleEditFields()">
      <NuxtIcon name="pen" class="text-xl" />
    </button>
    <h1 class="text-xl font-semibold">
      {{ character.name }}
    </h1>
    <h1 class="text-lg">
      {{ $t('components.character-sheet.tabs.info.base.player') }} <span class="font-semibold">{{ character.player }}</span>
    </h1>
    <h1 class="text-lg">
      {{ $t('components.character-sheet.tabs.info.base.guild') }} <span class="font-semibold">{{ character.guild }}</span>
    </h1>
    <h1 class="text-lg">
      {{ $t('components.character-sheet.tabs.info.base.elements') }} <span class="font-semibold">{{ elementsLabel }}</span>
    </h1>
    <h1 class="text-lg">
      {{ $t('components.character-sheet.tabs.info.base.jobs') }} <span class="font-semibold">{{ jobsLabel }}</span>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { type Character, ELEMENTS_LIST, type IElement, JOBS_LIST, type IJob } from '~/types'

const character = defineModel<Character>({ required: true })

const { t } = useI18n()

const editFields = ref(false)

const elements = ref<string[]>([])

const jobs = ref<string[]>([])

const elementsLabel = computed(() => character.value.elements.map(element => t(`elements.${element.type}`)).join(', '))

const jobsLabel = computed(() => character.value.jobs.map(job => t(`jobs.${job.type}`)).join(', '))

function toggleEditFields (value?:boolean) {
  editFields.value = value ?? !editFields.value
}

function saveChanges () {
  toggleEditFields(false)
  const elementsToSave = elements.value.map((elementToSave) => {
    return ELEMENTS_LIST.find(element => element.type === elementToSave)
  }).filter(element => element) as IElement []
  const jobsToSave = elements.value.map((jobToSave) => {
    return JOBS_LIST.find(job => job.type === jobToSave)
  }).filter(job => job) as IJob []
  character.value.elements = elementsToSave
  character.value.jobs = jobsToSave
}

onBeforeMount(() => {
  elements.value = character.value.elements.map(element => element.type)
})
</script>

<style scoped lang="scss">
.custom-input {
  @apply w-full px-1.5 py-1 bg-black/20 dark:bg-white/40  rounded-sm outline-none text-black dark:text-white;
}
.custom-select {
  @apply w-full px-2 py-1.5 leading-6 bg-black/20 dark:bg-white/40 rounded-sm text-black dark:text-white;
}
</style>
