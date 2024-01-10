<template>
  <div>
    <h1 class="text-primary">
      Hello
    </h1>
  </div>
</template>

<script setup lang="ts">
const alertsStore = useAlertsStore()

alertsStore.handlerError(new Error('Testing Error'))
</script>

<style scoped>

</style>
