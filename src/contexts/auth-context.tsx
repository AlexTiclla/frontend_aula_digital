"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { API_CONFIG } from "@/config/constants"
import axios from "axios"

// Creamos un axiosInstance con interceptor global
const api = axios.create({
  baseURL: API_CONFIG.baseUrl,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

interface AuthContextType {
  user: any
  token: string | null
  isLoading: boolean 
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      setToken(savedToken)
      fetchUser(savedToken)
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchUser = async (token: string) => {
    try {
      const res = await api.get("/usuarios/me")
      setUser(res.data)
    } catch (error: any) {
      console.error("Error al obtener el usuario", error)
      if (error.response?.status === 401 || error.response?.status === 403) {
        logout()
      }
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (newToken: string) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
    await fetchUser(newToken)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
