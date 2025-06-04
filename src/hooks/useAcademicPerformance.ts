"use client"
import { API_CONFIG } from "@/config/constants"
import { useEffect, useState } from "react"

export function useAcademicPerformance() {
  const [loading, setLoading] = useState(false)

  const getAcademicPerformance = async (studentId: string, subjectId: string) => {
    setLoading(true)

    try {
      const resNotas = await fetch(`${API_CONFIG.baseUrl}/notas/estudiante/${studentId}/materia/${subjectId}/detalles`)
      const resAsistencia = await fetch(`${API_CONFIG.baseUrl}/asistencias/estudiante/${studentId}/curso_materia/${subjectId}`)
      const resParticipacion = await fetch(`${API_CONFIG.baseUrl}/participaciones/estudiante/${studentId}/curso_materia/${subjectId}`)

      const notas = await resNotas.json()
      const asistencias = await resAsistencia.json()
      const participaciones = await resParticipacion.json()

      return {
        notas,
        asistencias,
        participaciones
      }
    } catch (error) {
      console.error("Error al cargar rendimiento:", error)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { getAcademicPerformance, loading }
}
