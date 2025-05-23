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

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de autenticación
    // En un caso real, aquí se haría la petición al backend
    setTimeout(() => {
      if (email === "admin@escuela.com" && password === "admin123") {
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al sistema de administración escolar",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Error de autenticación",
          description: "Correo electrónico o contraseña incorrectos",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1500)
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
              placeholder="admin@escuela.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
              required
            />
          </div>
          <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">Para fines de demostración, use: admin@escuela.com / admin123</p>
      </CardFooter>
    </Card>
  )
}
