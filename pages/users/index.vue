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

    <UserDetailsModal
      v-model="showUserModal"
      :user="selectedUser"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFakeStore } from '~/composables/useFakeStore'
import { useAlertStore } from '~/stores/alert'
import type { User } from '~/types/User'

definePageMeta({
  layout: 'dashboard'
})

const loading = ref(true)
const users = ref<User[]>([])
const fakeStore = useFakeStore()
const alertStore = useAlertStore()

const headers = [
  { title: 'Nombre', key: 'name.firstname' },
  { title: 'Apellido', key: 'name.lastname' },
  { title: 'Usuario', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: 'Teléfono', key: 'phone' },
  { title: 'Ciudad', key: 'address.city' },
  { title: 'Acciones', key: 'actions', sortable: false }
]

const showUserModal = ref(false)
const selectedUser = ref<User | null>(null)

const fetchUsers = async () => {
  loading.value = true
  try {
    users.value = await fakeStore.getUsers()
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
    alertStore.showAlert(
      'Error al cargar los usuarios. Por favor, intente nuevamente más tarde.',
      'error',
      5000,
      'right bottom'
    )
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})

const viewUser = (user: User) => {
  selectedUser.value = user
  showUserModal.value = true
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
