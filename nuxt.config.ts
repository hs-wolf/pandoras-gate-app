// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  srcDir: 'src',
  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt'
  ],
  eslint: {
    lintOnStart: false
  },
  pinia: {
    storesDirs: ['stores/**']
  }
})
