<template>
  <div class="users">
    <v-card>
      <v-card-title>Lista de Usuarios</v-card-title>
      <v-data-table
        :headers="headers"
        :items="filteredUsers"
        :items-per-page="5"
        items-per-page-text="Usuarios por página"
        :loading="loading"
        loading-text="Cargando usuarios..."
        class="elevation-1"
      >
        <template #loading>
          <v-skeleton-loader
            type="table-row-divider"
            :loading="loading"
            :types="{ 'table-row-divider': 'table-heading, table-row@5' }"
          />
        </template>
        
        <template #no-data>
          <div class="d-flex flex-column align-center py-6">
            <v-icon size="64" color="grey lighten-1" class="mb-4">mdi-account-off</v-icon>
            <h3 class="text-subtitle-1 text-center">No hay usuarios disponibles</h3>
            <v-btn color="primary" class="mt-4" @click="fetchUsers">
              <v-icon left>mdi-refresh</v-icon>
              Reintentar
            </v-btn>
          </div>
        </template>

        <template #[`item.actions`]="{ item }">
          <v-menu>
            <template #activator="{ props }">
              <v-icon
                v-bind="props"
                color="primary"
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

    <ConfirmDeleteModal
      v-model="showDeleteModal"
      title="Confirmar Eliminación"
      message="¿Está seguro que desea eliminar este usuario?"
      :item-name="userToDelete?.username"
      cancel-text="Cancelar"
      confirm-text="Confirmar"
      :loading="loadingDelete"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useFakeStore } from '~/composables/useFakeStore'
import { useAlertStore } from '~/stores/alert'
import { useSearchStore } from '~/stores/search'
import { filterItemsBySearchTerm } from '~/utils/filter'
import type { User } from '~/types/User'

definePageMeta({
  layout: 'dashboard'
})

const loading = ref(true)
const users = ref<User[]>([])
const fakeStore = useFakeStore()
const alertStore = useAlertStore()
const searchStore = useSearchStore()
const loadingDelete = ref(false)

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
const showDeleteModal = ref(false)
const userToDelete = ref<User | null>(null)

// Filtrar usuarios según el término de búsqueda
const filteredUsers = computed(() => {
  return filterItemsBySearchTerm(
    users.value,
    searchStore.searchQuery || '',
    ['username', 'email', 'name.firstname', 'name.lastname']
  )
})

// Limpiar búsqueda al desmontar el componente
onMounted(() => {
  fetchUsers()
})

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

const viewUser = (user: User) => {
  selectedUser.value = user
  showUserModal.value = true
}

const deleteUser = (user: User) => {
  userToDelete.value = user
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!userToDelete.value) return
  
  try {
    loadingDelete.value = true
    await fakeStore.deleteUser(userToDelete.value.id)
    
    // Añadir una pequeña demora para mejor feedback visual
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Actualizar la interfaz
    users.value = users.value.filter(u => u.id !== userToDelete.value?.id)
    
    alertStore.showAlert(
      'Usuario eliminado correctamente',
      'success',
      3000,
      'right bottom'
    )
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    alertStore.showAlert(
      'Error al eliminar el usuario. Por favor, intente nuevamente más tarde.',
      'error',
      5000,
      'right bottom'
    )
  } finally {
    loadingDelete.value = false
    showDeleteModal.value = false
    userToDelete.value = null
  }
}
</script>

<style scoped>
.users {
  padding: 20px;
}
</style>
