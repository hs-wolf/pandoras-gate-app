<template>
  <div v-auto-animate class="relative flex flex-col h-full">
    <MainNavbar />
    <slot />
    <AuthOverlay v-if="showAuthOverlay" @close="showAuthOverlay = false" />
  </div>
</template>

<script setup lang="ts">
const showAuthOverlay = ref(false)
</script>

<style scoped>

</style>
