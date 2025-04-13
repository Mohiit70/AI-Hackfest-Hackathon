"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  picture?: string
} | null

type AuthContextType = {
  user: User
  login: () => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Simulate auth loading
  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("echopilot-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = () => {
    // Mock login for demo purposes
    const mockUser = {
      id: "user_123",
      name: "Demo User",
      email: "demo@echopilot.ai",
      picture: "/placeholder.svg?height=40&width=40",
    }
    setUser(mockUser)
    localStorage.setItem("echopilot-user", JSON.stringify(mockUser))
    router.push("/dashboard")
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("echopilot-user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
