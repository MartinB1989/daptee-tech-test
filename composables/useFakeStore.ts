import type { User } from '~/types/User'
import type { Product } from '~/types/Product'

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

  const getProducts = () => {
    return $fetch<Product[]>(`${baseUrl}/products`)
  }

  // Los endpoints de deleteUser y deleteProduct existen en la API pero no eliminan el usuario o producto, solo devuelven un mensaje de éxito
  // Por lo cual la eliminacion se realiza en el frontend pero al recargar la pagina se ven todos los usuarios o productos nuevamente
  const deleteProduct = (productId: number) => {
    return $fetch(`${baseUrl}/products/${productId}`, {
      method: 'DELETE'
    })
  }

  const deleteUser = (userId: number) => {
    return $fetch(`${baseUrl}/users/${userId}`, {
      method: 'DELETE'
    })
  }

  return {
    login,
    getUsers,
    getProducts,
    deleteProduct,
    deleteUser
  }
} 