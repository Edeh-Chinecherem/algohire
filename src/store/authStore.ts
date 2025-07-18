import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: 'candidate' | 'employer' | 'admin'
  avatar?: string
}

interface AuthError {
  message: string
  code?: number
}

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: AuthError | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: {
    name: string
    email: string
    password: string
    role: 'candidate' | 'employer'
  }) => Promise<void>
  logout: () => void
  refreshAuthToken: () => Promise<void>
  updateUser: (updates: Partial<User>) => void
  requestPasswordReset: (email: string) => Promise<void>
  resetPassword: (token: string, newPassword: string) => Promise<void>
  setLoading: (isLoading: boolean) => void
  setError: (error: AuthError | null) => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        
        login: async (email, /*password*/) => {
          set({ isLoading: true, error: null })
          try {
            // Replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            
            const mockUser: User = {
              id: '1',
              name: 'John Doe',
              email,
              role: 'candidate',
              avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            }
            
            set({
              user: mockUser,
              token: 'mock-access-token',
              refreshToken: 'mock-refresh-token',
              isAuthenticated: true,
              isLoading: false,
            })
          } catch (error) {
            set({
              error: { 
                message: 'Invalid email or password',
                code: 401
              },
              isLoading: false,
            })
            throw error
          }
        },

        register: async (userData) => {
          set({ isLoading: true, error: null })
          try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            
            const mockUser: User = {
              id: '2',
              name: userData.name,
              email: userData.email,
              role: userData.role,
              avatar: `https://randomuser.me/api/portraits/${
                userData.role === 'candidate' ? 'men' : 'women'
              }/2.jpg`,
            }
            
            set({
              user: mockUser,
              token: 'mock-access-token',
              refreshToken: 'mock-refresh-token',
              isAuthenticated: true,
              isLoading: false,
            })
          } catch (error) {
            set({
              error: { 
                message: 'Registration failed', 
                code: 400 
              },
              isLoading: false,
            })
            throw error
          }
        },

        logout: () => {
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
          })
        },

        refreshAuthToken: async () => {
          set({ isLoading: true })
          try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            set({
              token: 'new-mock-access-token',
              isLoading: false,
            })
          } catch (error) {
            set({
              error: { 
                message: 'Session expired. Please login again.',
                code: 403
              },
              isLoading: false,
            })
            throw error
          }
        },

        updateUser: (updates) => {
          set((state) => ({
            user: state.user ? { ...state.user, ...updates } : null
          }))
        },

        requestPasswordReset: async (/*email*/) => {
          set({ isLoading: true, error: null })
          try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            set({ isLoading: false })
          } catch (error) {
            set({
              error: { 
                message: 'Failed to request password reset',
                code: 400
              },
              isLoading: false,
            })
            throw error
          }
        },

        resetPassword: async (/*token, newPassword*/) => {
          set({ isLoading: true, error: null })
          try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            set({ isLoading: false })
          } catch (error) {
            set({
              error: { 
                message: 'Password reset failed',
                code: 400
              },
              isLoading: false,
            })
            throw error
          }
        },

        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          refreshToken: state.refreshToken,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
)