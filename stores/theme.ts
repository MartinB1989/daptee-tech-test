import { defineStore } from 'pinia'

export type ThemeName = 'light' | 'dark' | 'blue' | 'green' | 'purple'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: 'light' as ThemeName,
    isDark: false,
  }),
  
  actions: {
    toggleDarkLight() {
      this.isDark = !this.isDark
      this.currentTheme = this.isDark ? 'dark' : 'light'
      this.applyTheme()
    },
    
    setTheme(themeName: ThemeName) {
      this.currentTheme = themeName
      // Actualizar si el tema es oscuro o claro para mantener consistencia
      this.isDark = themeName === 'dark' || themeName === 'purple'
      this.applyTheme()
    },
    
    applyTheme() {
      // Actualiza el tema en el HTML para que los estilos CSS puedan utilizarlo
      if (typeof window !== 'undefined') {
        document.documentElement.setAttribute('data-theme', this.currentTheme)
        // Almacena la preferencia del usuario
        localStorage.setItem('theme', this.currentTheme)
      }
    },
    
    init() {
      if (typeof window !== 'undefined') {
        // Detectar preferencia del sistema
        const systemPrefersDark = window.matchMedia && 
          window.matchMedia('(prefers-color-scheme: dark)').matches
        
        // Cargar preferencia guardada o usar la del sistema
        const savedTheme = localStorage.getItem('theme') as ThemeName | null
        if (savedTheme && ['light', 'dark', 'blue', 'green', 'purple'].includes(savedTheme)) {
          this.currentTheme = savedTheme
          this.isDark = savedTheme === 'dark' || savedTheme === 'purple'
        } else {
          this.currentTheme = systemPrefersDark ? 'dark' : 'light'
          this.isDark = systemPrefersDark
        }
        
        this.applyTheme()
        
        // Escuchar cambios en la preferencia del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          if (localStorage.getItem('theme') === null) {
            this.currentTheme = e.matches ? 'dark' : 'light'
            this.isDark = e.matches
            this.applyTheme()
          }
        })
      }
    }
  }
}) 