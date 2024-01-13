<template>
  <div class="flex flex-col">
    <NuxtLink
      :to="localePath({ path: `/character/${1234}` })"
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
