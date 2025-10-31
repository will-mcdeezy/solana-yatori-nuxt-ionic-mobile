// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxtjs/ionic'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      YUMI_ENDPOINT: '',
      ARROW_API_KEY: '',
      ZANSHIN_WS: '',
    }
  },
  ssr: false
})
