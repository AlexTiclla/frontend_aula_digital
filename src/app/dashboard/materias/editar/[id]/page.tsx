"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ROUTES, EDUCATION_LEVELS } from "@/config/constants"
import { API_CONFIG } from "@/config/constants"
import { useAuth } from "@/contexts/auth-context"

export default function EditarMateria() {
  const [formData, setFormData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const { token } = useAuth()

  const id = params.id as string

  useEffect(() => {
    const fetchMateria = async () => {
      try {
        const response = await fetch(`${API_CONFIG.baseUrl}/materias/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!response.ok) {
          throw new Error("No se encontró la materia")
        }
        const data = await response.json()
        setFormData(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se encontró la materia solicitada",
          variant: "destructive",
        })
        router.push(ROUTES.SUBJECTS.LIST)
      }
    }

    if (token) fetchMateria()
  }, [id, token, router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setIsLoading(true)

    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/materias/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error("Error al actualizar la materia")
      }

      toast({
        title: "Materia actualizada",
        description: `${formData.nombre} ha sido actualizada exitosamente`,
      })

      router.push(ROUTES.SUBJECTS.LIST)
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar la materia",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    })
  }

  const handleSwitchChange = (checked: boolean) => {
    if (!formData) return
    setFormData({
      ...formData,
      is_active: checked,
    })
  }

  const handleSelectChange = (value: string) => {
    if (!formData) return
    setFormData({
      ...formData,
      area_conocimiento: value,
    })
  }

  if (!formData) {
    return <div className="p-6">Cargando datos de la materia...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-800">Editar Materia</h1>
        <p className="text-gray-600">Actualiza la información de la materia</p>
      </div>

      <Card className="border-blue-100 max-w-2xl">
        <CardHeader>
          <CardTitle>Información de la Materia</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area_conocimiento">Área de Conocimiento *</Label>
              <Select value={formData.area_conocimiento} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un área" />
                </SelectTrigger>
                <SelectContent>
                  {EDUCATION_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="horas_semanales">Horas Semanales *</Label>
              <Input
                id="horas_semanales"
                name="horas_semanales"
                type="number"
                min="1"
                value={formData.horas_semanales}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch id="is_active" checked={formData.is_active} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="is_active">Materia Activa</Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Actualizar Materia"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push(ROUTES.SUBJECTS.LIST)}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
