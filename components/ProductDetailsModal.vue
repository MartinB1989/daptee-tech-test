<template>
  <v-dialog
    :model-value="modelValue"
    fullscreen
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card class="h-100">
      <v-toolbar color="primary">
        <v-toolbar-title class="text-h6 white--text">
          Detalles del Producto
        </v-toolbar-title>
        <v-spacer/>
        <v-btn
          icon
          @click="$emit('update:modelValue', false)"
        >
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-container v-if="product" class="fill-height pa-4">
        <v-row class="fill-height">
          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <v-img
              :src="product.image"
              :alt="product.title"
              max-height="500"
              contain
              class="rounded"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-card flat>
              <v-card-text>
                <div class="text-h5 mb-4">{{ product.title }}</div>
                <div class="mb-4">
                  <span class="text-h6">ID: </span>
                  <span>{{ product.id }}</span>
                </div>
                <div class="mb-4">
                  <span class="text-h6">Categoría: </span>
                  <span>{{ product.category }}</span>
                </div>
                <div class="mb-4">
                  <span class="text-h6">Precio: </span>
                  <span class="text-h5 primary--text">${{ product.price }}</span>
                </div>
                <div class="mb-4">
                  <span class="text-h6">Stock: </span>
                  <span>{{ product.rating.count }} unidades</span>
                </div>
                <div class="text-h6 mb-2">Descripción</div>
                <div class="text-body-1" style="white-space: pre-wrap;">{{ product.description }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product'

defineProps<{
  modelValue: boolean
  product: Product | null
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script> 