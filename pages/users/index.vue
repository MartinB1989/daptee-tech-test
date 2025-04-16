<template>
  <div class="users">
    <v-card>
      <v-card-title>Lista de Usuarios</v-card-title>
      <v-data-table
        :headers="headers"
        :items="filteredUsers"
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
      cancel-text="Cancelar"
      confirm-text="Confirmar"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useFakeStore } from '~/composables/useFakeStore'
import { useAlertStore } from '~/stores/alert'
import { useSearchStore } from '~/stores/search'
import type { User } from '~/types/User'

definePageMeta({
  layout: 'dashboard'
})

const loading = ref(true)
const users = ref<User[]>([])
const fakeStore = useFakeStore()
const alertStore = useAlertStore()
const searchStore = useSearchStore()

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
  if (!searchStore.searchQuery) {
    return users.value
  }

  const searchTerm = searchStore.searchQuery.toLowerCase()
  return users.value.filter(user => {
    return (
      user.username.toLowerCase().includes(searchTerm) || 
      user.email.toLowerCase().includes(searchTerm) || 
      user.name.firstname.toLowerCase().includes(searchTerm) || 
      user.name.lastname.toLowerCase().includes(searchTerm)
    )
  })
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
    await fakeStore.deleteUser(userToDelete.value.id)
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
