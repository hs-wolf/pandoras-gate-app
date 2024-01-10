<template>
  <div>
    <h1 class="text-primary">
      Hello
    </h1>
    <NuxtPicture
      src="/spaghetti.jpg"
      width="256"
      height="auto"
      loading="lazy"
      :ismap="true"
      decoding="auto"
    />
  </div>
</template>

<script setup lang="ts">
const alertsStore = useAlertsStore()

alertsStore.handlerError(new Error('Testing Error'))
</script>

<style scoped>

</style>
