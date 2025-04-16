// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://fakestoreapi.com',
      directLoginUsername: process.env.NUXT_PUBLIC_DIRECT_LOGIN_USERNAME,
      directLoginPassword: process.env.NUXT_PUBLIC_DIRECT_LOGIN_PASSWORD
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxt/eslint',
    ['@nuxt/image', { override: true }],
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error Vuetify is not typed
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})