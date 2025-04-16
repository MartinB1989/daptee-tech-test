<template>
  <v-app>
    <v-navigation-drawer
      permanent
      width="250"
    >
      <div class="d-flex justify-center pa-4">
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
      <v-spacer/>

      <v-text-field
        density="compact"
        variant="solo"
        label="Buscar"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        class="mx-4"
        style="max-width: 400px;"
      />

      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            prepend-icon="mdi-account-circle"
          >
            {{ userName }}
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

    <v-alert
      v-model="alertStore.show"
      :type="alertStore.type"
      :timeout="alertStore.timeout"
      :location="alertStore.location"
      position="absolute"
      class="ma-4"
      closable
      @update:model-value="alertStore.hideAlert"
    >
      {{ alertStore.message }}
    </v-alert>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useAlertStore } from '~/stores/alert'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const alertStore = useAlertStore()
const router = useRouter()
const userName = ref('Usuario')

const menuItems = [
  { title: 'Usuarios', icon: 'mdi-account-group', to: '/users' },
  { title: 'Productos', icon: 'mdi-package-variant', to: '/products' },
]

const userMenuItems = [
  { title: 'Perfil', icon: 'mdi-account', action: 'profile' },
  { title: 'Cerrar sesión', icon: 'mdi-logout', action: 'logout' },
]

const handleUserMenuClick = (action: string) => {
  switch (action) {
    case 'profile':
      // Navegar al perfil
      break
    case 'logout':
      authStore.logout()
      router.push('/')
      break
  }
}
</script>

<style scoped>
.alert-global {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
}
</style>