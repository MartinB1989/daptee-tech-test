<template>
  <v-dialog :model-value="modelValue" max-width="400px" @update:model-value="$emit('update:modelValue', $event)">
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="grey" variant="text" @click="$emit('update:modelValue', false)">
          {{ cancelText }}
        </v-btn>
        <v-btn color="error" variant="text" @click="$emit('confirm')">
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
  cancelText?: string
  confirmText?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
}>()
</script> 