// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { useThemeStore } from '../stores/theme'

export default defineNuxtPlugin((app) => {
  const themeStore = useThemeStore()
  
  const vuetify = createVuetify({
    theme: {
      defaultTheme: themeStore.currentTheme,
      themes: {
        light: {
          colors: {
            primary: '#1867C0',
            secondary: '#5CBBF6',
            accent: '#4CAF50',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#FFFFFF',
          },
        },
        dark: {
          colors: {
            primary: '#2196F3',
            secondary: '#90CAF9',
            accent: '#4CAF50',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#121212',
          },
        },
        blue: {
          dark: false,
          colors: {
            primary: '#0D47A1',
            secondary: '#42A5F5',
            accent: '#29B6F6',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#E3F2FD',
          },
        },
        green: {
          dark: false,
          colors: {
            primary: '#1B5E20',
            secondary: '#66BB6A',
            accent: '#81C784',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#E8F5E9',
          },
        },
        purple: {
          dark: true,
          colors: {
            primary: '#6A1B9A',
            secondary: '#AB47BC',
            accent: '#CE93D8',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#4A148C',
          },
        },
      },
    },
  })
  
  // Actualizar el tema de Vuetify cuando cambie en el store
  themeStore.$subscribe((_mutation, state: {currentTheme: string}) => {
    vuetify.theme.global.name.value = state.currentTheme
  })
  
  app.vueApp.use(vuetify)
})