"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  BookOpen,
  User,
  Calendar,
  CheckCircle,
  Clock,
  Users,
  Award,
  MessageSquare,
  BarChart3,
} from "lucide-react"
import axios from "axios"
import { API_CONFIG } from "@/config/constants"

export default function RendimientoAcademico() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.id as string
  const studentId = params.studentId as string
  const subjectId = params.subjectId as string

  const [performance, setPerformance] = useState<any>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPerformance() {
      try {
        const token = localStorage.getItem("token")
        const [notas, asistencias, participaciones] = await Promise.all([
          axios.get(`${API_CONFIG.baseUrl}/notas/estudiante/${studentId}/materia/${subjectId}/detalles`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_CONFIG.baseUrl2}/asistencias/estudiante/${studentId}/curso_materia/${subjectId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_CONFIG.baseUrl2}/participaciones/estudiante/${studentId}/curso_materia/${subjectId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        setPerformance({
          student: notas.data.estudiante,
          subject: notas.data.curso_materia,
          notas: notas.data.notas || [],
          asistencias: asistencias.data || [],
          participaciones: participaciones.data || [],
        })
      } catch (error) {
        console.error("Error al cargar datos académicos", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPerformance()
  }, [studentId, subjectId])

  const handleBack = () => {
    router.push(`/dashboard/cursos/${courseId}/estudiantes/${studentId}/materias`)
  }

  if (isLoading) {
    return <div className="p-6">Cargando datos...</div>
  }

  if (!performance?.student || !performance?.subject) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Información no encontrada</h1>
          <p className="text-gray-600 mt-2">El estudiante o materia solicitada no existe.</p>
          <Button className="mt-4" onClick={() => router.back()}>
            Volver
          </Button>
        </div>
      </div>
    )
  }

  const { student, subject, notas, asistencias, participaciones } = performance

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Rendimiento Académico</h1>
          <p className="text-gray-600">
            {student.usuario?.nombre} {student.usuario?.apellido} - {subject.materia?.nombre}
          </p>
        </div>
      </div>
      {/* Aquí continúa tu lógica de visualización según los datos obtenidos */}
    </div>
  )
}
