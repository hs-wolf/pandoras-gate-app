<template>
  <div v-if="editFields" class="flex flex-col gap-2">
    <div class="base-property">
      <p>
        {{ $t('components.character-sheet.tabs.info.base.character.label') }}
      </p>
      <input
        id="character-name"
        v-model="character.name"
        type="text"
        :placeholder="$t('components.character-sheet.tabs.info.base.character.placeholder')"
        class="custom-input"
      >
    </div>
    <div class="base-property">
      <p>
        {{ $t('components.character-sheet.tabs.info.base.player.label') }}
      </p>
      <input
        id="character-player"
        v-model="character.player"
        type="text"
        :placeholder="$t('components.character-sheet.tabs.info.base.player.placeholder')"
        class="custom-input"
      >
    </div>
    <div class="base-property">
      <p>
        {{ $t('components.character-sheet.tabs.info.base.guild.label') }}
      </p>
      <input
        id="character-guild"
        v-model="character.guild"
        type="text"
        :placeholder="$t('components.character-sheet.tabs.info.base.guild.placeholder')"
        class="custom-input"
      >
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="base-property flex-col !items-start">
        <p>
          {{ $t('components.character-sheet.tabs.info.base.elements.label') }}
        </p>
        <select id="character-elements" v-model="elements" class="custom-select" multiple>
          <option v-for="element in ELEMENTS_LIST" :key="element.type" :value="element.type">
            {{ $t(`elements.${element.type}`) }}
          </option>
        </select>
      </div>
      <div class="base-property flex-col !items-start">
        <p>
          {{ $t('components.character-sheet.tabs.info.base.jobs.label') }}
        </p>
        <select id="character-jobs" v-model="jobs" class="custom-select" multiple>
          <option v-for="job in JOBS_LIST" :key="job.type" :value="job.type">
            {{ $t(`jobs.${job.type}`) }}
          </option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2 my-2">
      <button id="general-reset-changes" class="btn btn-danger" @click.prevent="resetChanges">
        {{ $t('general.reset-changes') }}
      </button>
      <button id="general-save-changes" class="btn btn-action col-span-2" @click.prevent="saveChanges">
        {{ $t('general.save-changes') }}
      </button>
    </div>
  </div>
  <div v-else class="relative flex flex-col">
    <button id="edit-base" class="btn-effect absolute top-2 end-2" @click.prevent="toggleEditFields()">
      <NuxtIcon name="pen" class="text-2xl text-primary" />
    </button>
    <h1 class="text-xl font-semibold">
      {{ character.name }}
    </h1>
    <div class="base-property">
      <p>
        {{ $t('components.character-sheet.tabs.info.base.player.label') }}
      </p>
      <span class="font-semibold">{{ character.player }}</span>
    </div>
    <div class="base-property">
      <p>
        {{ $t('components.character-sheet.tabs.info.base.guild.label') }}
      </p>
      <span class="font-semibold">{{ character.guild }}</span>
    </div>
    <div class="base-property">
      <p>
        {{ $t('components.character-sheet.tabs.info.base.elements.label') }}
      </p>
      <span class="font-semibold">{{ elementsLabel }}</span>
    </div>
    <div class="base-property">
      <p>
        {{ $t('components.character-sheet.tabs.info.base.jobs.label') }}
      </p>
      <span class="font-semibold">{{ jobsLabel }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Character, ELEMENTS_LIST, type IElement, JOBS_LIST, type IJob } from '~/types'

const character = defineModel<Character>({ required: true })

const emits = defineEmits<{(e:'save'): void}>()

const { t } = useI18n()

const editFields = ref(false)
const elements = ref<string[]>([])
const jobs = ref<string[]>([])
const dataToReset = ref<{ name: string, player: string, guild: string, elements: IElement[], jobs: IJob[] }>()

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
  const jobsToSave = jobs.value.map((jobToSave) => {
    return JOBS_LIST.find(job => job.type === jobToSave)
  }).filter(job => job) as IJob []
  character.value.elements = elementsToSave
  character.value.jobs = jobsToSave
  emits('save')
}

function resetChanges () {
  toggleEditFields(false)
}

function saveOperationsToReset () {
  const data = JSON.stringify({
    name: toRaw(character.value.name),
    player: toRaw(character.value.player),
    guild: toRaw(character.value.guild),
    elements: toRaw(character.value.elements),
    jobs: toRaw(character.value.jobs)
  })
  dataToReset.value = JSON.parse(data)
}

onBeforeMount(() => {
  saveOperationsToReset()
  elements.value = character.value.elements.map(element => element.type)
  jobs.value = character.value.jobs.map(job => job.type)
})
</script>

<style scoped lang="scss">
.base-property {
  @apply flex items-center gap-1.5;
  p {
    @apply whitespace-nowrap;
  }
  span {
    @apply text-lg font-semibold;
  }
}
</style>
