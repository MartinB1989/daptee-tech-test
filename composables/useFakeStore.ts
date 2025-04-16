import type { User } from '~/types/User'

interface LoginCredentials {
  username: string
  password: string
}

interface LoginResponse {
  token: string
}

export const useFakeStore = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase

  const login = (credentials: LoginCredentials) => {
    return $fetch<LoginResponse>(`${baseUrl}/auth/login`, {
      method: 'POST',
      body: credentials,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const getUsers = () => {
    return $fetch<User[]>(`${baseUrl}/users`)
  }
  // El endpoint de deleteUser existe en la API pero no elimina el usuario, solo devuelve un mensaje de éxito
  // Por lo cual la eliminacion se realiza en el frontend pero al recargar la pagina se ven todos los usuarios nuevamente
  const deleteUser = (userId: number) => {
    return $fetch(`${baseUrl}/users/${userId}`, {
      method: 'DELETE'
    })
  }

  return {
    login,
    getUsers,
    deleteUser
  }
} 