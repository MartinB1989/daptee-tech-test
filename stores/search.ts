import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

export const useSearchStore = defineStore('search', () => {
  const searchQuery = ref('')
  const route = useRoute()
  
  // Determinar el placeholder según la ruta actual
  const searchPlaceholder = computed(() => {
    if (route.path.includes('/users')) {
      return 'Buscar por nombre, apellido, usuario o email'
    } else if (route.path.includes('/products')) {
      return 'Buscar por nombre de producto'
    }
    return 'Buscar...'
  })

  // Determinar en qué módulo estamos actualmente
  const currentModule = computed(() => {
    if (route.path.includes('/users')) {
      return 'users'
    } else if (route.path.includes('/products')) {
      return 'products'
    }
    return null
  })

  // Restablecer la búsqueda
  const resetSearch = () => {
    searchQuery.value = ''
  }

  return {
    searchQuery,
    searchPlaceholder,
    currentModule,
    resetSearch
  }
}) 