// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  srcDir: 'src',
  css: ['assets/css/main.scss'],
  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@formkit/auto-animate/nuxt'
  ],
  eslint: {
    lintOnStart: false
  },
  pinia: {
    storesDirs: ['src/stores/**']
  },
  tailwindcss: {
    cssPath: 'src/assets/css/tailwind.scss',
    viewer: false
  },
  image: {
    format: ['webp']
  }
})
