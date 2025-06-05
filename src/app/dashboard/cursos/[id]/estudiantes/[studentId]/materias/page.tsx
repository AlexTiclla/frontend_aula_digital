"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Clock, MapPin, Monitor, BookOpen, BarChart3 } from "lucide-react"
import { API_CONFIG } from "@/config/constants"

interface Materia {
  id: number
  nombre: string
  descripcion: string
  area_conocimiento: string
  horas_semanales: number
}

interface Profesor {
  id: number
  nombre: string
  apellido: string
  especialidad: string
}

interface MateriaEstudiante {
  id: number
  materia: Materia
  profesor: Profesor
  horario: string
  aula: string
  modalidad: string
}

export default function MateriasEstudiantePage() {
  const router = useRouter()
  const { id: courseId, studentId } = useParams()
  const [materias, setMaterias] = useState<MateriaEstudiante[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_CONFIG.baseUrl}/estudiantes/estudiantes/${studentId}/materias2`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setMaterias(data)
      } catch (error) {
        console.error("Error al obtener materias:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (studentId) {
      fetchMaterias()
    }
  }, [studentId])

  const handleBack = () => {
    router.back()
  }

  const getModalityIcon = (modality: string) => {
    switch (modality) {
      case "Virtual":
        return <Monitor className="h-4 w-4" />
      case "Híbrida":
        return <BookOpen className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getModalityColor = (modality: string) => {
    switch (modality) {
      case "Virtual":
        return "bg-blue-100 text-blue-800"
      case "Híbrida":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Materias del Estudiante</h1>
        </div>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Cargando materias...</p>
      ) : materias.length === 0 ? (
        <p className="text-gray-500">Este estudiante no tiene materias inscritas.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {materias.map((item) => (
            <Card key={item.id} className="border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.materia.nombre}</CardTitle>
                <p className="text-sm text-gray-600">{item.materia.area_conocimiento}</p>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>{item.profesor.nombre} {item.profesor.apellido}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{item.horario}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{item.aula}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getModalityIcon(item.modalidad)}
                  <Badge className={getModalityColor(item.modalidad)}>{item.modalidad}</Badge>
                </div>

                {/* Botón para ir al rendimiento */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                  onClick={() => router.push(`/dashboard/cursos/${courseId}/estudiantes/${studentId}/materias/${item.materia.id}/rendimiento`)}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Ver Rendimiento
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
