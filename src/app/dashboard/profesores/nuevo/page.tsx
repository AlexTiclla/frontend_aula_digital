"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { API_CONFIG, ROUTES } from "@/config/constants"
import { useAuth } from "@/contexts/auth-context"

export default function NuevoProfesor() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    especialidad: "",
    nivel_academico: "",
    telefono: "",
    carnet_identidad: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { token } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Crear usuario primero
      const usuarioResponse = await fetch(`${API_CONFIG.baseUrl}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          password: formData.password,
          rol: "profesor"  // Establecer el rol correctamente
        })
      })

      if (!usuarioResponse.ok) {
        throw new Error("Error al crear usuario")
      }

      const usuarioData = await usuarioResponse.json()

      // Crear profesor con usuario_id
      const profesorResponse = await fetch(`${API_CONFIG.baseUrl}/profesores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          usuario_id: usuarioData.id,
          telefono: formData.telefono,
          carnet_identidad: formData.carnet_identidad,
          especialidad: formData.especialidad,
          nivel_academico: formData.nivel_academico
        })
      })

      if (!profesorResponse.ok) {
        throw new Error("Error al crear profesor")
      }

      toast({
        title: "Profesor registrado",
        description: `${formData.nombre} ${formData.apellido} ha sido registrado exitosamente`,
      })

      router.push(ROUTES.TEACHERS.LIST)
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al registrar el profesor",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Nuevo Profesor</h1>
      <p className="text-gray-600">Registra un nuevo miembro del personal docente</p>

      <Card className="border-blue-100 max-w-2xl">
        <CardHeader>
          <CardTitle>Información del Profesor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre *" required />
              <Input name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido *" required />
              <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Correo *" required />
              <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Contraseña *" required />
              <Input name="especialidad" value={formData.especialidad} onChange={handleChange} placeholder="Especialidad *" required />
              <Input name="nivel_academico" value={formData.nivel_academico} onChange={handleChange} placeholder="Nivel Académico *" required />
              <Input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" />
              <Input name="carnet_identidad" value={formData.carnet_identidad} onChange={handleChange} placeholder="Carnet Identidad" />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Registrar Profesor"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push(ROUTES.TEACHERS.LIST)}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
