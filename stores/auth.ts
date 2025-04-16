import { defineStore } from 'pinia'

interface AuthState {
  token: string | null
  userName: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    userName: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserName(userName: string) {
      this.userName = userName
    },
    logout() {
      this.token = null
      this.userName = null
    }
  },

  persist: true
})

