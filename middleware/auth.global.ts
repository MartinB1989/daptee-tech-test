import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated // Usa el getter que ya tienes

  const protectedRoutes = ['/users', '/products'] // Rutas que requieren autenticación

  // Si la ruta a la que se intenta acceder requiere autenticación
  if (protectedRoutes.includes(to.path)) {
    // Y el usuario NO está autenticado
    if (!isAuthenticated) {
      // Redirigir a la página de login
      // Retornamos `navigateTo` para detener la navegación actual y redirigir
      return navigateTo('/')
    }
  }

  // Opcional: Si el usuario YA está autenticado e intenta acceder a la página de login ('/')
  if (to.path === '/' && isAuthenticated) {
    // Redirigirlo a una página por defecto para usuarios logueados, por ejemplo '/users'
    return navigateTo('/users')
  }

  // Si ninguna de las condiciones anteriores se cumple, permite la navegación
  // No es necesario retornar nada explícitamente aquí
})
