<template>
  <div>
    <h1 class="text-primary">
      Hello
    </h1>
    <NuxtImg
      src="/spaghetti.jpg"
      width="256"
      height="128"
      loading="lazy"
      :ismap="true"
      decoding="auto"
      class="w-[50%] object-cover"
    />
    <br>
    <div class="flex flex-col items-start gap-2">
      <button id="organize" type="button" @click.prevent="organizeList">
        Oraganize List
      </button>
      <ul v-auto-animate class="flex flex-col">
        <li v-for="item in list" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
    <br>
    <div class="flex gap-2">
      <p>Mouse X {{ x }}</p>
      <p>Mouse Y {{ y }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const alertsStore = useAlertsStore()
const { x, y } = useMouse()

const list = ref(['Apple', 'Banana', 'Grape', 'Orange'])
const listOrder = ref(0)

function organizeList () {
  if (listOrder.value === 0) {
    list.value.sort((a, b) => {
      if (a < b) {
        return -1
      }
      if (a > b) {
        return 1
      }
      return 0
    })
    listOrder.value = 1
    return
  }
  if (listOrder.value === 1) {
    list.value.sort((a, b) => {
      if (a < b) {
        return 1
      }
      if (a > b) {
        return -1
      }
      return 0
    })
    listOrder.value = 0
  }
}

onMounted(() => {
  alertsStore.handlerError(new Error('Testing Error'))
})
</script>

<style scoped>

</style>
