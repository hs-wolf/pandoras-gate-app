<template>
  <div class="flex flex-col overflow-auto">
    <NuxtLink
      :to="localePath({ name: `character` })"
      class="px-2 py-1 bg-gray-200"
    >
      <p>Character</p>
    </NuxtLink>
    <HelloWorld />
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

</script>

<style scoped>

</style>
