<template>
  <div :dir="direction" class="fixed inset-0 flex flex-col">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const localesStore = useLocalesStore()
const { direction } = storeToRefs(localesStore)
</script>

<style scoped>

</style>
