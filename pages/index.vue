<template>
  <v-container fluid class="fill-height h-100 pa-0">
    <v-row no-gutters class="fill-height">
      <!-- Sección izquierda: Formulario de login -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center pa-10">
        <v-card class="w-100" max-width="400" elevation="0">
          <v-card-title class="text-h4 font-weight-bold mb-6">Bienvenido</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="Correo electrónico"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                class="mb-4"
              />
              <v-text-field
                v-model="password"
                label="Contraseña"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                :type="passwordFieldType"
                :append-inner-icon="passwordIcon"
                class="mb-4"
                @click:append-inner="togglePasswordVisibility"
              />
              <v-btn
                color="primary"
                size="large"
                block
                type="submit"
                class="mt-4"
              >
                Iniciar sesión
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Sección derecha: Imagen -->
      <v-col cols="12" md="6" class="d-none d-md-flex">
        <v-img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
          cover
          class="fill-height"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const passwordFieldType = computed(() => {
  return showPassword.value ? 'text' : 'password'
})

const passwordIcon = computed(() => {
  return showPassword.value ? 'mdi-eye' : 'mdi-eye-off'
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = () => {
  // Aquí iría la lógica de autenticación
  console.log('Login attempt:', { email: email.value, password: password.value })
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
