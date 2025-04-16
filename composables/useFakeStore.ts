interface LoginCredentials {
  username: string
  password: string
}

interface LoginResponse {
  token: string
}

interface User {
  id: number
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
  phone: string
  address: {
    geolocation: {
      lat: string
      long: string
    }
    city: string
    street: string
    number: number
    zipcode: string
  }
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

  return {
    login,
    getUsers
  }
} 