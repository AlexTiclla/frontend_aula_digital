"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { API_CONFIG, ROUTES } from "@/config/constants"
import { useAuth } from "@/contexts/auth-context"

type Profesor = {
  id: number
  usuario_id: number
  nombre: string
  apellido: string
  email: string
  telefono: string
  carnet_identidad: string
  especialidad: string
  nivel_academico: string
}

export default function EditarProfesor() {
  const [formData, setFormData] = useState<Profesor | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { token } = useAuth()
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProfesor = async () => {
      try {
        const response = await fetch(`${API_CONFIG.baseUrl}/profesores/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!response.ok) throw new Error("Error al obtener profesor")
        const data = await response.json()
        setFormData(data)
      } catch (error) {
        console.error("Error:", error)
        toast({ title: "Error", description: "No se pudo cargar el profesor", variant: "destructive" })
        router.push(ROUTES.TEACHERS.LIST)
      } finally {
        setIsLoading(false)
      }
    }

    if (token) fetchProfesor()
    else setIsLoading(false)
  }, [token, id, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return
    setIsSaving(true)

    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/profesores/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          telefono: formData.telefono,
          carnet_identidad: formData.carnet_identidad,
          especialidad: formData.especialidad,
          nivel_academico: formData.nivel_academico
        })
      })
      if (!response.ok) throw new Error("Error al actualizar profesor")

      toast({ title: "Profesor actualizado", description: `${formData.nombre} ${formData.apellido} ha sido actualizado correctamente.` })
      router.push(ROUTES.TEACHERS.LIST)
    } catch (error) {
      console.error("Error:", error)
      toast({ title: "Error", description: "Ocurrió un error al actualizar el profesor", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading || !formData) return <div className="p-6">Cargando datos del profesor...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Editar Profesor</h1>
      <p className="text-gray-600">Actualiza la información del personal docente</p>

      <Card className="border-blue-100 max-w-2xl">
        <CardHeader><CardTitle>Información del Profesor</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" disabled />
              <Input name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" disabled />
              <Input name="email" value={formData.email} onChange={handleChange} placeholder="Correo" disabled />
              <Input name="especialidad" value={formData.especialidad} onChange={handleChange} placeholder="Especialidad" />
              <Input name="nivel_academico" value={formData.nivel_academico} onChange={handleChange} placeholder="Nivel Académico" />
              <Input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" />
              <Input name="carnet_identidad" value={formData.carnet_identidad} onChange={handleChange} placeholder="Carnet Identidad" />
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSaving}>
                {isSaving ? "Guardando..." : "Actualizar Profesor"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push(ROUTES.TEACHERS.LIST)}>Cancelar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
