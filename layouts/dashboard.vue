<template>
  <v-app>
    <!-- Barra de progreso de navegación -->
    <v-progress-linear
      v-if="isNavigating"
      color="primary"
      indeterminate
      position="absolute"
      style="z-index: 1200"
    />

    <v-navigation-drawer
      v-model="drawer"
      :rail="!mdAndUp"
      :permanent="mdAndUp"
      :temporary="!mdAndUp"
      width="250"
      color="primary"
    >
      <div class="d-flex justify-center pa-4 bg-white">
        <v-img
          src="/logo-daptee.svg"
        />
      </div>

      <v-divider/>
 
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.title"
          :to="item.to"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar scroll-behavior="elevate">
      <v-app-bar-nav-icon
        v-if="!mdAndUp"
        @click="drawer = !drawer"
      />

      <v-spacer/>

      <v-text-field
        v-if="searchStore.currentModule"
        v-model="searchStore.searchQuery"
        density="compact"
        variant="solo"
        :label="searchStore.searchPlaceholder"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        class="mx-4"
        :class="{ 'search-responsive': !mdAndUp }"
        clearable
        @click:clear="searchStore.resetSearch"
      />

      <!-- Botón de cambio de tema -->
      <v-btn
        icon
        class="mr-2"
      >
        <v-icon>{{ getCurrentThemeIcon() }}</v-icon>

        <v-menu
          activator="parent"
          location="bottom"
        >
          <v-list>
            <v-list-subheader>Seleccionar Tema</v-list-subheader>

            <v-list-item
              v-for="(theme, index) in availableThemes"
              :key="index"
              :title="theme.name"
              :prepend-icon="theme.icon"
              @click="themeStore.setTheme(theme.value)"
            >
              <template #append>
                <v-icon
                  v-if="themeStore.currentTheme === theme.value"
                  color="primary"
                  icon="mdi-check"
                />
              </template>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>

      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            :prepend-icon="mdAndUp ? 'mdi-account-circle' : undefined"
            :icon="!mdAndUp"
          >
            <v-icon v-if="!mdAndUp">mdi-account-circle</v-icon>
            <span v-if="mdAndUp">{{ userName }}</span>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in userMenuItems"
            :key="index"
            :value="index"
            :title="item.title"
            :prepend-icon="item.icon"
            @click="handleUserMenuClick(item.action)"
          />
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <!-- Mejorar el sistema de alertas con animaciones y más detalles -->
    <v-snackbar
      v-model="alertStore.show"
      :color="alertStore.type"
      :timeout="alertStore.timeout"
      :location="alertStore.location"
      transition="slide-y-transition"
      max-width="400"
    >
      <div class="d-flex align-center">
        <v-icon 
          class="mr-3" 
          :icon="getAlertIcon(alertStore.type)"
        />
        <span>{{ alertStore.message }}</span>
      </div>
      
      <template #actions>
        <v-btn
          variant="text"
          icon="mdi-close"
          @click="alertStore.hideAlert"
        />
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useAlertStore } from '~/stores/alert'
import { useSearchStore } from '~/stores/search'
import { useThemeStore, type ThemeName } from '~/stores/theme'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const authStore = useAuthStore()
const alertStore = useAlertStore()
const searchStore = useSearchStore()
const router = useRouter()
const drawer = ref(false)
const themeStore = useThemeStore()

const { mdAndUp } = useDisplay()

// Usar el userName del estado de autenticación
const userName = computed(() => {
  return authStore.userName || 'Usuario'
})

interface ThemeOption {
  name: string;
  icon: string;
  value: ThemeName;
}

const availableThemes: ThemeOption[] = [
  { name: 'Claro', icon: 'mdi-weather-sunny', value: 'light' },
  { name: 'Oscuro', icon: 'mdi-weather-night', value: 'dark' },
  { name: 'Azul', icon: 'mdi-palette-outline', value: 'blue' },
  { name: 'Verde', icon: 'mdi-leaf', value: 'green' },
  { name: 'Púrpura', icon: 'mdi-palette-swatch', value: 'purple' },
]

const getCurrentThemeIcon = () => {
  const currentTheme = availableThemes.find(theme => theme.value === themeStore.currentTheme)
  return currentTheme ? currentTheme.icon : 'mdi-palette'
}

// Inicializamos drawer basado en el tamaño de pantalla
onMounted(() => {
  drawer.value = mdAndUp.value
})

// Actualizamos drawer cuando cambia el tamaño de pantalla
watch(mdAndUp, (newValue) => {
  if (newValue) {
    drawer.value = true
  }
})

const menuItems = [
  { title: 'Usuarios', icon: 'mdi-account-group', to: '/users' },
  { title: 'Productos', icon: 'mdi-package-variant', to: '/products' },
]

const userMenuItems = [
  { title: 'Mi Cuenta', icon: 'mdi-account', action: 'profile' },
  { title: 'Cerrar sesión', icon: 'mdi-logout', action: 'logout' },
]

const handleUserMenuClick = (action: string) => {
  switch (action) {
    case 'profile':
      router.push('/profile')
      break
    case 'logout':
      authStore.logout()
      router.push('/')
      break
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAlertIcon = (type: any) => {
  switch (type) {
    case 'success': return 'mdi-check-circle';
    case 'error': return 'mdi-alert-circle';
    case 'warning': return 'mdi-alert';
    case 'info': 
    default: return 'mdi-information';
  }
}

const isNavigating = ref(false)

// Detectar navegación
onMounted(() => {
  router.beforeEach(() => {
    isNavigating.value = true
    return true
  })
  
  router.afterEach(() => {
    setTimeout(() => {
      isNavigating.value = false
    }, 200)
  })
})
</script>

<style scoped>
.alert-global {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
}

.search-responsive {
  width: 100%;
  max-width: 100% !important;
}

@media (max-width: 600px) {
  .mx-4.search-responsive {
    margin-left: 8px !important;
    margin-right: 8px !important;
  }
}
</style>