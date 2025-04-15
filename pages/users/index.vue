<template>
  <div class="users">
    <v-card>
      <v-card-title>Lista de Usuarios</v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        :loading="loading"
        loading-text="Cargando usuarios..."
        class="elevation-1"
      >
        <template #[`item.actions`]="{ item }">
          <v-menu>
            <template #activator="{ props }">
              <v-icon
                v-bind="props"
                color="primary"
                @click="openMenu(item)"
              >
                mdi-dots-vertical
              </v-icon>
            </template>
            <v-list>
              <v-list-item @click="viewUser(item)">
                <v-list-item-title>Ver</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteUser(item)">
                <v-list-item-title>Eliminar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'dashboard'
})

interface User {
  name: string
  userName: string
  phone: string
  email: string
}

const loading = ref(true)
const users = ref<User[]>([])

const headers = [
  { title: 'Nombre', key: 'name' },
  { title: 'Usuario', key: 'userName' },
  { title: 'Teléfono', key: 'phone' },
  { title: 'Email', key: 'email' },
  { title: 'Acciones', key: 'actions', sortable: false }
]

const mockUsers: User[] = [
  {
    name: 'Juan Pérez',
    userName: 'jperez',
    phone: '555-1234',
    email: 'juan.perez@example.com'
  },
  {
    name: 'María García',
    userName: 'mgarcia',
    phone: '555-5678',
    email: 'maria.garcia@example.com'
  },
  {
    name: 'Carlos López',
    userName: 'clopez',
    phone: '555-9012',
    email: 'carlos.lopez@example.com'
  },
  {
    name: 'Ana Martínez',
    userName: 'amartinez',
    phone: '555-3456',
    email: 'ana.martinez@example.com'
  },
  {
    name: 'Pedro Sánchez',
    userName: 'psanchez',
    phone: '555-7890',
    email: 'pedro.sanchez@example.com'
  }
]

const fetchUsers = () => {
  loading.value = true
  setTimeout(() => {
    users.value = mockUsers
    loading.value = false
  }, 1500)
}

onMounted(() => {
  fetchUsers()
})

const viewUser = (user: User) => {
  console.log('Ver usuario:', user)
}

const deleteUser = (user: User) => {
  console.log('Eliminar usuario:', user)
}

const openMenu = (item: User) => {
  console.log('Menú abierto para:', item)
}
</script>

<style scoped>
.users {
  padding: 20px;
}
</style>
