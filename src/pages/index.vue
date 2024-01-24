<template>
  <div class="flex flex-col h-full gap-4 px-2 py-3 md:w-full md:max-w-4xl md:mx-auto">
    <NuxtLink
      :to="localePath({ name: `character-sheet` })"
      class="btn btn-primary"
    >
      <p>{{ $t('pages.index.got-to-character-sheet') }}</p>
      <NuxtIcon name="user" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const navbarStore = useNavbarStore()

onBeforeMount(() => {
  navbarStore.setTitle(t('pages.index.title'))
})
</script>

<style scoped>

</style>
