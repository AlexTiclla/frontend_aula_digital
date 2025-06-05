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
  const subjectId = params.subjectId as string // ahora es materia_id

  const [performance, setPerformance] = useState<any>(null)
  const [isLoading, setLoading] = useState(true)
  const [prediccion, setPrediccion] = useState<number | null>(null)

  const getGradeColor = (grade: number) => {
    if (grade >= 85) return "text-green-600"
    if (grade >= 60) return "text-yellow-600"
    if (grade > 0) return "text-red-600"
    return "text-gray-500"
  }

  const getBimesterName = (bimester: number) =>
    ["Primer", "Segundo", "Tercer", "Cuarto"][bimester - 1] || `Bimestre ${bimester}`

  const getBimesterStatus = (status: string) => {
    switch (status) {
      case "completo":
        return { text: "Finalizado", color: "bg-green-100 text-green-700", icon: CheckCircle }
      case "en progreso":
        return { text: "En Progreso", color: "bg-yellow-100 text-yellow-700", icon: Clock }
      default:
        return { text: "Desconocido", color: "bg-gray-100 text-gray-700", icon: Calendar }
    }
  }

  const getAttendanceColor = (percent: number) => {
    if (percent >= 90) return "text-green-600"
    if (percent >= 70) return "text-yellow-600"
    if (percent > 0) return "text-red-600"
    return "text-gray-500"
  }


  useEffect(() => {
    async function fetchPerformance() {
      try {
        const token = localStorage.getItem("token")
        const [notasRes, asistenciasRes, participacionesRes] = await Promise.all([
          axios.get(`${API_CONFIG.baseUrl}/notas/estudiante/${studentId}/materia/${subjectId}/detalles`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_CONFIG.baseUrl2}/asistencias/estudiante/${studentId}/materia/${subjectId}/asistencias`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_CONFIG.baseUrl2}/participaciones/estudiante/${studentId}/materia/${subjectId}/participaciones`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        console.log("Notas:", notasRes.data)
        console.log("Asistencias:", asistenciasRes.data)
        console.log("Participaciones:", participacionesRes.data)
        const first = notasRes.data?.[0]
        const notas = notasRes.data
        const asistencias = asistenciasRes.data
        const participaciones = participacionesRes.data

        const allNotas = notas.flatMap((bloque: any) => bloque.notas)
        const overallGrade = allNotas.length > 0
          ? allNotas.reduce((sum: number, n: any) => sum + n.valor, 0) / allNotas.length
          : null

        const totalAsistencias = asistencias.length
        const presentes = asistencias.filter((a: any) => a.valor).length
        const overallAttendance = totalAsistencias > 0
          ? Math.round((presentes / totalAsistencias) * 100)
          : 0

        const participacionFrecuente = (() => {
          const conteo: Record<string, number> = {}
          for (const p of participaciones) {
            const tipo = p.participacion_clase || "No definida"
            conteo[tipo] = (conteo[tipo] || 0) + 1
          }
          const ordenado = Object.entries(conteo).sort((a, b) => b[1] - a[1])
          return ordenado[0]?.[0] || "N/A"
        })()

        const bimestres: any[] = []
        const predictorPayload: any = {}
        for (const bloque of notas) {
          const bimestre = bloque.periodo.bimestre
          const anio = bloque.periodo.anio

          // Notas finales
          const notaFinal = bloque.notas.length > 0
            ? bloque.notas.reduce((s: number, n: any) => s + n.valor, 0) / bloque.notas.length
            : null

          // Asistencia por curso_materia_id y bimestre
          const asistenciasBim = asistencias.filter((a: any) =>
            a.curso_materia_id === bloque.curso_materia.id &&
            a.periodo?.bimestre === bimestre
          )
          const presentes = asistenciasBim.filter((a: any) => a.valor).length
          const ausentes = asistenciasBim.filter((a: any) => !a.valor).length
          const totalAsis = asistenciasBim.length
          const porcentaje = totalAsis > 0 ? Math.round((presentes / totalAsis) * 100) : 0

          // Participaciones por curso_materia_id y bimestre
          const participacionesBim = participaciones.filter((p: any) =>
            p.curso_materia_id === bloque.curso_materia.id &&
            p.periodo?.bimestre === bimestre
          )
          const score = participacionesBim.length > 0
            ? participacionesBim.length
            : 0

          predictorPayload[`nota_b${bimestre}`] = notaFinal || 0
          predictorPayload[`asist_b${bimestre}`] = porcentaje
          predictorPayload[`part_b${bimestre}`] = score
          const tipoMasFrecuente = (() => {
            const count: Record<string, number> = {}
            for (const p of participacionesBim) {
              const tipo = p.participacion_clase || "No definida"
              count[tipo] = (count[tipo] || 0) + 1
            }
            const sorted = Object.entries(count).sort((a, b) => b[1] - a[1])
            return sorted[0]?.[0] || "Sin participación"
          })()

          bimestres.push({
            bimester: bimestre,
            status: "completo",
            finalGrade: notaFinal,
            attendance: {
              percentage: porcentaje,
              present: presentes,
              absent: ausentes,
              late: 0,
            },
            participation: {
              score: score,
              activities: participacionesBim.length,
              totalActivities: 4,
              comments: `Participación predominante: ${participacionesBim.length > 0
                ? participacionesBim.reduce((acc: Record<string, number>, p: any) => {
                  acc[p.participacion_clase] = (acc[p.participacion_clase] || 0) + 1
                  return acc
                }, {})
                : "N/A"
                }`,
            },
          })
        }
        const notaFutura = predecirNotaFutura(predictorPayload)
        setPrediccion(notaFutura)


        setPerformance({
          student: first?.estudiante,
          materia: first?.curso_materia?.materia,
          notas,
          asistencias,
          participaciones,
          overallGrade,
          overallAttendance,
          overallParticipation: participacionFrecuente,
          bimonthlyPerformance: bimestres,
        })
      } catch (error) {
        console.error("Error al cargar datos académicos", error)
      } finally {
        setLoading(false)
      }
    }


    function predecirNotaFutura(payload: {
      nota_b1?: number,
      asist_b1?: number,
      part_b1?: number,
      nota_b2?: number,
      asist_b2?: number,
      part_b2?: number,
      nota_b3?: number,
      asist_b3?: number,
      part_b3?: number,
      nota_b4?: number,
      asist_b4?: number,
      part_b4?: number,
    }): number {
      // Promediar valores disponibles (ignorando nulls/undefined)
      const safeProm = (arr: (number | undefined)[]) =>
        arr.filter(n => typeof n === "number").reduce((a, b) => a + (b || 0), 0) / arr.filter(n => typeof n === "number").length || 0

      const promedioNota = safeProm([payload.nota_b1, payload.nota_b2, payload.nota_b3, payload.nota_b4])
      const promedioAsistencia = safeProm([payload.asist_b1, payload.asist_b2, payload.asist_b3, payload.asist_b4])
      const promedioParticipaciones = safeProm([payload.part_b1, payload.part_b2, payload.part_b3, payload.part_b4])

      // Modelo de predicción: y = b0 + b1*x1 + b2*x2 + b3*x3
      const prediccion =
        -2.04 +
        1.08 * promedioNota +
        0.05 * promedioAsistencia +
        -1.07 * promedioParticipaciones

      // Redondear a dos decimales y limitar entre 0 y 100
      return Math.max(0, Math.min(100, Math.round(prediccion * 100) / 100))
    }




    fetchPerformance()
  }, [studentId, subjectId])


  const handleBack = () => {
    router.push(`/dashboard/cursos/${courseId}/estudiantes/${studentId}/materias`)
  }

  if (isLoading) {
    return <div className="p-6">Cargando datos...</div>
  }
  console.log("Rendimiento:", performance)
  if (!performance || !performance.materia || performance.notas.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Información no encontrada</h1>
          <p className="text-gray-600 mt-2">No hay registros suficientes para mostrar.</p>
          <Button className="mt-4" onClick={() => router.back()}>
            Volver
          </Button>
        </div>
      </div>
    )
  }


  const { student, materia, notas, asistencias, participaciones } = performance

  return (
    <div className="space-y-8">
      {/* Información General */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Información de la Materia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Materia</p>
              <p className="font-medium">{materia?.nombre}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Descripción</p>
              <p className="font-medium">{materia?.descripcion}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Modalidad</p>
              <p className="font-medium">{notas?.[0]?.curso_materia?.modalidad}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumen General */}
      <Card className="border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Resumen del rendimiento académico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Award className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600">Promedio General</p>
              <p className={`text-3xl font-bold ${getGradeColor(performance.overallGrade)}`}>
                {performance.overallGrade !== null ? performance.overallGrade.toFixed(1) : "N/A"}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-gray-600">Asistencia General</p>
              <p className={`text-3xl font-bold ${getAttendanceColor(performance.overallAttendance)}`}>
                {performance.overallAttendance}%
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-gray-600">Participación Más Frecuente</p>
              <p className="text-2xl font-bold text-purple-800">
                {performance.overallParticipation}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rendimiento por Bimestre */}
      <Card className="border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Rendimiento por Bimestre
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {performance.bimonthlyPerformance.map((bimester: any) => {
              const statusInfo = getBimesterStatus(bimester.status)
              const StatusIcon = statusInfo.icon

              return (
                <Card key={bimester.bimester} className="border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {getBimesterName(bimester.bimester)}
                      </CardTitle>
                      <Badge className={statusInfo.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusInfo.text}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Nota Final */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-blue-600" />
                          <h4 className="font-medium">Nota Final</h4>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className={`text-4xl font-bold ${getGradeColor(bimester.finalGrade)}`}>
                            {bimester.finalGrade !== null ? bimester.finalGrade.toFixed(1) : "N/A"}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {bimester.finalGrade !== null ? "Calificación" : "Pendiente"}
                          </p>
                        </div>
                      </div>

                      {/* Asistencia */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <h4 className="font-medium">Asistencia</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Porcentaje</span>
                            <span className={`font-medium ${getAttendanceColor(bimester.attendance.percentage)}`}>
                              {bimester.attendance.percentage}%
                            </span>
                          </div>
                          <Progress value={bimester.attendance.percentage} className="h-2" />
                          <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                            <div className="text-center">
                              <p className="font-medium text-green-600">{bimester.attendance.present}</p>
                              <p>Presentes</p>
                            </div>
                            <div className="text-center">
                              <p className="font-medium text-red-600">{bimester.attendance.absent}</p>
                              <p>Faltas</p>
                            </div>
                            <div className="text-center">
                              <p className="font-medium text-yellow-600">{bimester.attendance.late}</p>
                              <p>Tardanzas</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Participación */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          <h4 className="font-medium">Participación</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className={`text-2xl font-bold ${getGradeColor(bimester.participation.score)}`}>
                              {bimester.participation.score ? bimester.participation.score.toFixed(1) : "N/A"}
                            </p>
                            <p className="text-xs text-gray-600">Puntuación</p>
                          </div>
                          <div className="text-sm">
                            <div className="flex justify-between mb-1">
                              <span>Actividades</span>
                              <span className="font-medium">
                                {bimester.participation.activities}/{bimester.participation.totalActivities}
                              </span>
                            </div>
                            <Progress
                              value={(bimester.participation.activities / bimester.participation.totalActivities) * 100}
                              className="h-2"
                            />
                          </div>
                          <div className="flex items-start gap-2 text-xs">
                            <MessageSquare className="h-3 w-3 mt-0.5 text-gray-500" />
                            <p className="text-gray-600">{bimester.participation.comments}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>



                </Card>




              )
            })}
          </div>
        </CardContent>
        {/* Predicción de Nota Futura */}
        <Card className="border-yellow-300 shadow-lg bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <BarChart3 className="h-5 w-5 text-yellow-700" />
              Predicción de Nota Futura
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="text-center p-6 bg-white rounded-lg border border-yellow-200 shadow-inner">
                <p className="text-sm text-gray-500 mb-2">Nota estimada para el próximo semestre</p>
                <p className={`text-5xl font-extrabold ${getGradeColor(prediccion ?? 0)}`}>
                  {prediccion !== null ? `${prediccion.toFixed(2)}` : "N/A"}
                </p>
                <p className="text-xs text-gray-600 mt-2 italic">
                  Basado en el promedio de tus notas, asistencia y participación anteriores.
                </p>
              </div>
              <div className="text-center text-sm text-gray-600">
                Este valor es una estimación generada automáticamente. Consulta con tu docente para más orientación.
              </div>
            </div>
          </CardContent>
        </Card>
      </Card>








    </div>

  )
}
