"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { School } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
import { useAuth } from "@/contexts/auth-context"
import { API_CONFIG } from "@/config/constants"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post(`${API_CONFIG.baseUrl}/auth/login`, {
        email,
        password
      })

      if (response.data.access_token) {
        await login(response.data.access_token)
        toast({ title: "Inicio de sesión exitoso" })
        console.log("Si entro")
        // Redirige directamente aquí
        router.replace("/dashboard")
      } else {
        toast({ title: "Error", description: "Respuesta sin token", variant: "destructive" })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Credenciales inválidas",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-lg border-blue-100">
      <CardHeader>
        <div className="flex justify-center mb-2">
          <School className="h-12 w-12 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
        <CardDescription className="text-center">Ingrese sus credenciales</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Label htmlFor="password" className="mt-4">Contraseña</Label>
          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-gray-500">Use sus credenciales reales</p>
      </CardFooter>
    </Card>
  )
}
