<template>
  <div class="products">
    <v-card>
      <v-card-title>Lista de Productos</v-card-title>
      <v-data-table
        :headers="headers"
        :items="filteredProducts"
        :items-per-page="5"
        items-per-page-text="Productos por página"
        :loading="loading"
        loading-text="Cargando productos..."
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
              <v-list-item @click="viewProduct(item)">
                <v-list-item-title>Ver</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteProduct(item)">
                <v-list-item-title>Eliminar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <ProductDetailsModal
      v-model="showProductModal"
      :product="selectedProduct"
    />

    <ConfirmDeleteModal
      v-model="showDeleteModal"
      title="Confirmar Eliminación"
      message="¿Está seguro que desea eliminar este producto?"
      :item-name="productToDelete?.title"
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
import type { Product } from '~/types/Product'

definePageMeta({
  layout: 'dashboard'
})

const loading = ref(true)
const products = ref<Product[]>([])
const fakeStore = useFakeStore()
const alertStore = useAlertStore()
const searchStore = useSearchStore()
const loadingDelete = ref(false)

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Título', key: 'title' },
  { title: 'Precio', key: 'price' },
  { title: 'Categoría', key: 'category' },
  { title: 'Stock', key: 'rating.count' },
  { title: 'Acciones', key: 'actions', sortable: false }
]

const showProductModal = ref(false)
const selectedProduct = ref<Product | null>(null)
const showDeleteModal = ref(false)
const productToDelete = ref<Product | null>(null)

// Filtrar productos según el término de búsqueda
const filteredProducts = computed(() => {
  return filterItemsBySearchTerm(
    products.value,
    searchStore.searchQuery || '',
    ['title', 'category']
  )
})

const fetchProducts = async () => {
  loading.value = true
  try {
    products.value = await fakeStore.getProducts()
  } catch (error) {
    console.error('Error al cargar productos:', error)
    alertStore.showAlert(
      'Error al cargar los productos. Por favor, intente nuevamente más tarde.',
      'error',
      5000,
      'right bottom'
    )
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})

const viewProduct = (product: Product) => {
  selectedProduct.value = product
  showProductModal.value = true
}

const deleteProduct = (product: Product) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!productToDelete.value) return

  try {
    loadingDelete.value = true
    await fakeStore.deleteProduct(productToDelete.value.id)
    
    await new Promise(resolve => setTimeout(resolve, 300))
    
    products.value = products.value.filter(p => p.id !== productToDelete.value?.id)
    alertStore.showAlert(
      'Producto eliminado correctamente',
      'success',
      3000,
      'right bottom'
    )
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    alertStore.showAlert(
      'Error al eliminar el producto. Por favor, intente nuevamente más tarde.',
      'error',
      5000,
      'right bottom'
    )
  } finally {
    loadingDelete.value = false
    showDeleteModal.value = false
    productToDelete.value = null
  }
}

</script>

<style scoped>
.products {
  padding: 20px;
}
</style>

