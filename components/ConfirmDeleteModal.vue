<template>
  <v-dialog :model-value="modelValue" max-width="400px" @update:model-value="$emit('update:modelValue', $event)">
    <v-card>
      <v-card-title class="text-h5 d-flex align-center">
        <v-icon left color="error" class="mr-2">mdi-alert-circle</v-icon>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <p class="text-body-1">{{ message }}</p>
        <p v-if="itemName" class="text-body-2 font-weight-bold mt-2">
          "{{ itemName }}"
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn 
          color="grey" 
          variant="text" 
          :disabled="loading"
          @click="$emit('update:modelValue', false)"
        >
          {{ cancelText }}
        </v-btn>
        <v-btn 
          color="error" 
          variant="elevated" 
          :loading="loading"
          @click="$emit('confirm')"
        >
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title?: string
  message?: string
  itemName?: string
  cancelText?: string
  confirmText?: string
  loading?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
}>()
</script> 