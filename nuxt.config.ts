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
    '@formkit/auto-animate/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    'nuxt-icons'
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
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.yaml'
      },
      {
        code: 'pt',
        iso: 'pt-BR',
        file: 'pt.yaml'
      }
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    vueI18n: './i18n.config.ts'
  }
})
