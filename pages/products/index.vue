<template>
  <div class="products">
    <v-card>
      <v-card-title>Lista de Productos</v-card-title>
      <v-data-table
        :headers="headers"
        :items="products"
        :items-per-page="5"
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
                @click="openMenu(item)"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'dashboard'
})

interface Product {
  name: string
  category: string
  price: number
  stock: number
  description: string
}

const loading = ref(true)
const products = ref<Product[]>([])

const headers = [
  { title: 'Nombre', key: 'name' },
  { title: 'Categoría', key: 'category' },
  { title: 'Precio', key: 'price' },
  { title: 'Stock', key: 'stock' },
  { title: 'Descripción', key: 'description' },
  { title: 'Acciones', key: 'actions', sortable: false }
]

const mockProducts: Product[] = [
  {
    name: 'Laptop HP',
    category: 'Electrónicos',
    price: 899.99,
    stock: 15,
    description: 'Laptop HP con procesador i7'
  },
  {
    name: 'Smartphone Samsung',
    category: 'Electrónicos',
    price: 699.99,
    stock: 25,
    description: 'Smartphone Samsung Galaxy S21'
  },
  {
    name: 'Monitor LG',
    category: 'Electrónicos',
    price: 299.99,
    stock: 10,
    description: 'Monitor LG 27 pulgadas'
  },
  {
    name: 'Teclado Mecánico',
    category: 'Periféricos',
    price: 89.99,
    stock: 30,
    description: 'Teclado mecánico RGB'
  },
  {
    name: 'Mouse Gaming',
    category: 'Periféricos',
    price: 49.99,
    stock: 20,
    description: 'Mouse gaming con 6 botones'
  }
]

const fetchProducts = () => {
  loading.value = true
  setTimeout(() => {
    products.value = mockProducts
    loading.value = false
  }, 1500)
}

onMounted(() => {
  fetchProducts()
})

const viewProduct = (product: Product) => {
  console.log('Ver producto:', product)
}

const deleteProduct = (product: Product) => {
  console.log('Eliminar producto:', product)
}

const openMenu = (item: Product) => {
  console.log('Menú abierto para:', item)
}
</script>

<style scoped>
.products {
  padding: 20px;
}
</style>

