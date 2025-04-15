<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height class="h-100 pa-0">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// No se requiere lógica adicional para este layout básico
</script>

<style scoped>
.v-main {
  min-height: 100vh;
}
</style> 