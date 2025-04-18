<template>
  <v-container fluid class="fill-height h-100 pa-0">
    <v-row no-gutters class="fill-height">
      <!-- Sección izquierda: Formulario de login -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center pa-10">
        <v-card class="w-100" max-width="400" elevation="0">
          <v-card-title class="text-h4 font-weight-bold mb-6">Bienvenido</v-card-title>
          <v-card-text>
            <v-form :disabled="loading" @submit.prevent="handleLogin">
              <v-text-field
                v-model="userName"
                label="Nombre de usuario"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                class="mb-4"
                :error-messages="errors.userName"
                :disabled="loading"
                @input="errors.userName = ''"
              />
              <v-text-field
                v-model="password"
                label="Contraseña"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                :type="passwordFieldType"
                :append-inner-icon="passwordIcon"
                class="mb-4"
                :error-messages="errors.password"
                :disabled="loading"
                @input="errors.password = ''"
                @click:append-inner="togglePasswordVisibility"
              />
              <v-btn
                color="primary"
                size="large"
                block
                type="submit"
                class="mt-4"
                :loading="loading"
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
import { useFakeStore } from '~/composables/useFakeStore'
import { useAuthStore } from '~/stores/auth'
import { useAlertStore } from '~/stores/alert'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from 'nuxt/app'

const userName = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const fakeStore = useFakeStore()
const authStore = useAuthStore()
const alertStore = useAlertStore()
const router = useRouter()
const config = useRuntimeConfig()

const passwordFieldType = computed(() => {
  return showPassword.value ? 'text' : 'password'
})

const passwordIcon = computed(() => {
  return showPassword.value ? 'mdi-eye' : 'mdi-eye-off'
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const errors = ref({
  userName: '',
  password: ''
})

const handleLogin = async () => {
  // Validación básica
  if (!userName.value) {
    errors.value.userName = 'El nombre de usuario es obligatorio'
    return
  }
  
  if (!password.value) {
    errors.value.password = 'La contraseña es obligatoria'
    return
  }
  
  try {
    loading.value = true
    
    // Permitir acceso directo con las credenciales específicas
    if (userName.value === config.public.directLoginUsername && 
        password.value === config.public.directLoginPassword) {
      authStore.setToken('fake-token-for-daptee-user')
      authStore.setUserName(userName.value)
      alertStore.showAlert('Has iniciado sesión correctamente', 'success')
      router.push('/users')
      loading.value = false
      return
    }
    
    const response = await fakeStore.login({
      username: userName.value,
      password: password.value
    })

    authStore.setToken(response.token)
    authStore.setUserName(userName.value)
    alertStore.showAlert('Has iniciado sesión correctamente', 'success')
    router.push('/users')
  } catch (error) {
    console.error('Error en el login:', error)
    alertStore.showAlert('Error al iniciar sesión. Por favor, verifica tus credenciales', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
