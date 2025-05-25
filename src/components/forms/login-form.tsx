"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { School } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { ROUTES, DEMO_CREDENTIALS } from "@/config/constants"
import { validateEmail, validatePassword } from "@/lib/utils"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const router = useRouter()
  const { toast } = useToast()
  const { login, isLoading } = useAuth()

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "El correo electrónico es requerido"
    } else if (!validateEmail(email)) {
      newErrors.email = "Formato de correo electrónico inválido"
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida"
    } else if (!validatePassword(password)) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      const success = await login(email, password)

      if (success) {
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al sistema de administración escolar",
        })
        router.push(ROUTES.DASHBOARD)
      } else {
        toast({
          title: "Error de autenticación",
          description: "Correo electrónico o contraseña incorrectos",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error durante el inicio de sesión",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full shadow-lg border-blue-100">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <School className="h-12 w-12 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
        <CardDescription className="text-center">Ingrese sus credenciales para acceder al sistema</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder={DEMO_CREDENTIALS.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                ¿Olvidó su contraseña?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>
          <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Para fines de demostración, use: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
        </p>
      </CardFooter>
    </Card>
  )
}
