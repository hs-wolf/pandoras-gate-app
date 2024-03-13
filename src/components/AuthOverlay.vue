<template>
  <div v-auto-animate class="z-[500] modal">
    <div v-if="isRegister" class="card gap-3 w-[512px]">
      <div class="flex items-center justify-between">
        <h1 class="text-lg font-semibold">
          {{ $t('components.auth-overlay.register') }}
        </h1>
        <button class="self-end" @click.prevent="close">
          <NuxtIcon name="x-close" class="text-2xl" />
        </button>
      </div>
      <div class="flex gap-3">
        <div class="flex flex-col gap-1.5 leading-9">
          <p>
            {{ $t('components.auth-overlay.e-mail') }}
          </p>
          <p>
            {{ $t('components.auth-overlay.password') }}
          </p>
          <p>
            {{ $t('components.auth-overlay.confirm') }}
          </p>
        </div>
        <div class="flex flex-col gap-1.5 w-full">
          <input
            id="value-input"
            type="text"
            class="custom-input"
          >
          <input
            id="value-input"
            type="text"
            class="custom-input"
          >
          <input
            id="value-input"
            type="text"
            class="custom-input"
          >
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col justify-center max-w-min">
          <button class="btn-effect text-primary whitespace-nowrap" @click.prevent="isRegister = !isRegister">
            {{ $t('components.auth-overlay.already-have') }}
          </button>
        </div>
        <button class="btn btn-action max-w-min justify-self-end" @click.prevent="register">
          {{ $t('components.auth-overlay.register') }}
        </button>
      </div>
    </div>
    <div v-else class="card gap-3 w-[512px]">
      <div class="flex items-center justify-between">
        <h1 class="text-lg font-semibold">
          {{ $t('components.auth-overlay.login') }}
        </h1>
        <button class="self-end" @click.prevent="close">
          <NuxtIcon name="x-close" class="text-2xl" />
        </button>
      </div>
      <div class="flex gap-3">
        <div class="flex flex-col gap-1.5 leading-9">
          <p>{{ $t('components.auth-overlay.e-mail') }}</p>
          <p>{{ $t('components.auth-overlay.password') }}</p>
        </div>
        <div class="flex flex-col gap-1.5 w-full">
          <input
            id="value-input"
            type="text"
            class="custom-input"
          >
          <input
            id="value-input"
            type="text"
            class="custom-input"
          >
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col justify-center max-w-min">
          <button class="btn-effect text-primary whitespace-nowrap" @click.prevent="isRegister = !isRegister">
            {{ $t('components.auth-overlay.dont-have') }}
          </button>
        </div>
        <button class="btn btn-action max-w-min justify-self-end" @click.prevent="login">
          {{ $t('components.auth-overlay.login') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{(e:'close'):void}>()

const isRegister = ref(true)

const close = () => {
  emits('close')
}

const register = () => {

}

const login = () => {

}
</script>

<style scoped>

</style>
