// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/ionic', '@pinia/nuxt'],
  css: ['@/assets/css/main.css','@/assets/css/variables.css'],
})