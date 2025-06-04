"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ROUTES } from "@/config/constants"

export default function NuevoCurso() {
  const [formData, setFormData] = useState({
    name: "",
    teacherId: "",
    grade: "",
    capacity: "",
    schedule: "",
    description: "",
    classroom: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de guardado
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Curso creado",
      description: `${formData.name} ha sido creado exitosamente`,
    })

    setIsLoading(false)
    router.push(ROUTES.COURSES.LIST)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-800">Nuevo Curso</h1>
        <p className="text-gray-600">Crea un nuevo curso académico</p>
      </div>

      <Card className="border-blue-100 max-w-2xl">
        <CardHeader>
          <CardTitle>Información del Curso</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Curso *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Matemáticas Avanzadas"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grado *</Label>
                <Input
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  placeholder="5° Primaria"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teacherId">Profesor Asignado *</Label>
                <Input
                  id="teacherId"
                  name="teacherId"
                  value={formData.teacherId}
                  onChange={handleChange}
                  placeholder="Dr. Roberto Silva"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacidad Máxima *</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="30"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schedule">Horario *</Label>
                <Input
                  id="schedule"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  placeholder="Lun-Mié-Vie 8:00-9:30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="classroom">Aula</Label>
                <Input
                  id="classroom"
                  name="classroom"
                  value={formData.classroom}
                  onChange={handleChange}
                  placeholder="Aula 101"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripción del curso, objetivos y metodología..."
                rows={4}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Creando..." : "Crear Curso"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push(ROUTES.COURSES.LIST)}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
