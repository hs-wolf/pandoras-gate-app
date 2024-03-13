export default defineNuxtConfig({
  ssr: true,
  devtools: {
    enabled: true
  },
  srcDir: 'src',
  css: ['assets/css/main.scss', 'assets/css/transitions.scss'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Pandoras Gate',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'client' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId
      }
    }
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@formkit/auto-animate/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    'nuxt-icons',
    '@vee-validate/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/test-utils/module'
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
    defaultLocale: 'pt',
    langDir: 'locales',
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    vueI18n: './i18n.config.ts'
  },
  colorMode: {
    classSuffix: ''
  }
})
