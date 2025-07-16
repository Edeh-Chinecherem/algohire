import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: 'candidate' | 'employer' | 'admin'
  avatar?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: {
    name: string
    email: string
    password: string
    role: 'candidate' | 'employer'
  }) => Promise<void>
  logout: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        login: async (email, password) => {
          set({ isLoading: true, error: null })
          try {
            // Mock API call - replace with actual API
            await new Promise((resolve) => setTimeout(resolve, 1000))
            
            // Mock response
            const mockUser: User = {
              id: '1',
              name: 'John Doe',
              email,
              role: 'candidate',
              avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            }
            
            set({
              user: mockUser,
              token: 'mock-token',
              isAuthenticated: true,
              isLoading: false,
            })
          } catch (error) {
            set({
              error: 'Invalid email or password',
              isLoading: false,
            })
          }
        },
        register: async (userData) => {
          set({ isLoading: true, error: null })
          try {
            // Mock API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            
            const mockUser: User = {
              id: '2',
              name: userData.name,
              email: userData.email,
              role: userData.role,
              avatar: `https://randomuser.me/api/portraits/${userData.role === 'candidate' ? 'men' : 'women'}/2.jpg`,
            }
            
            set({
              user: mockUser,
              token: 'mock-token',
              isAuthenticated: true,
              isLoading: false,
            })
          } catch (error) {
            set({
              error: 'Registration failed',
              isLoading: false,
            })
          }
        },
        logout: () => {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          })
        },
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
)