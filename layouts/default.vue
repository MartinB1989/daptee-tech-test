<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height class="h-100 pa-0">
        <slot />
      </v-container>
    </v-main>

    <v-alert
      v-model="alertStore.show"
      :type="alertStore.type"
      :timeout="alertStore.timeout"
      :location="alertStore.location"
      position="absolute"
      class="ma-4"
      closable
      @update:model-value="alertStore.hideAlert"
    >
      {{ alertStore.message }}
    </v-alert>
  </v-app>
</template>

<script setup lang="ts">
import { useAlertStore } from '~/stores/alert'

const alertStore = useAlertStore()
</script>

<style scoped>
.v-main {
  min-height: 100vh;
}

</style> 