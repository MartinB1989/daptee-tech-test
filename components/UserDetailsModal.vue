<template>
  <v-dialog :model-value="modelValue" max-width="600px" @update:model-value="$emit('update:modelValue', $event)">
    <v-card v-if="user">
      <v-card-title class="text-h5">
        Detalles del Usuario
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-title>Nombre</v-list-item-title>
            <v-list-item-subtitle>{{ user.name.firstname }} {{ user.name.lastname }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Usuario</v-list-item-title>
            <v-list-item-subtitle>{{ user.username }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Teléfono</v-list-item-title>
            <v-list-item-subtitle>{{ user.phone }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Dirección</v-list-item-title>
            <v-list-item-subtitle>
              {{ user.address.street }} {{ user.address.number }}, 
              {{ user.address.city }} ({{ user.address.zipcode }})
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Ubicación</v-list-item-title>
            <v-list-item-subtitle>
              Lat: {{ user.address.geolocation.lat }}, 
              Long: {{ user.address.geolocation.long }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" @click="$emit('update:modelValue', false)">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { User } from '~/types/User'

defineProps<{
  modelValue: boolean
  user: User | null
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script> 