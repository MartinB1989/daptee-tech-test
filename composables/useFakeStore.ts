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

  return {
    login
  }
} 