"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Award, FileText } from "lucide-react"

const calificaciones = [
  {
    id: "1",
    curso: "Matemáticas Avanzadas",
    profesor: "Dr. Roberto Silva",
    estudiantes: 28,
    promedio: 8.7,
    aprobados: 26,
    reprobados: 2,
    tendencia: "up",
    ultimaActualizacion: "2024-01-15",
  },
  {
    id: "2",
    curso: "Literatura Española",
    profesor: "Lic. Carmen Flores",
    estudiantes: 25,
    promedio: 9.1,
    aprobados: 25,
    reprobados: 0,
    tendencia: "up",
    ultimaActualizacion: "2024-01-14",
  },
  {
    id: "3",
    curso: "Ciencias Naturales",
    profesor: "Ing. Pedro Ramírez",
    estudiantes: 22,
    promedio: 8.3,
    aprobados: 20,
    reprobados: 2,
    tendencia: "down",
    ultimaActualizacion: "2024-01-13",
  },
  {
    id: "4",
    curso: "Historia Universal",
    profesor: "Prof. Laura Mendoza",
    estudiantes: 18,
    promedio: 8.9,
    aprobados: 18,
    reprobados: 0,
    tendencia: "up",
    ultimaActualizacion: "2024-01-12",
  },
]

export default function CalificacionesCursos() {
  const getTendenciaIcon = (tendencia: string) => {
    return tendencia === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    )
  }

  const getPromedioColor = (promedio: number) => {
    if (promedio >= 9) return "text-green-600"
    if (promedio >= 8) return "text-blue-600"
    if (promedio >= 7) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Calificaciones por Curso</h1>
          <p className="text-gray-600">Seguimiento del rendimiento académico</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="h-4 w-4 mr-2" />
          Generar Reporte
        </Button>
      </div>

      <div className="grid gap-6">
        {calificaciones.map((calificacion) => (
          <Card key={calificacion.id} className="border-blue-100">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{calificacion.curso}</CardTitle>
                  <p className="text-gray-600">{calificacion.profesor}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getTendenciaIcon(calificacion.tendencia)}
                  <span className="text-sm text-gray-600">Actualizado: {calificacion.ultimaActualizacion}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className={`text-2xl font-bold ${getPromedioColor(calificacion.promedio)}`}>
                      {calificacion.promedio}
                    </p>
                    <p className="text-sm text-gray-600">Promedio</p>
                  </div>
                </div>

                <div>
                  <p className="text-2xl font-bold">{calificacion.estudiantes}</p>
                  <p className="text-sm text-gray-600">Total Estudiantes</p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-green-600">{calificacion.aprobados}</p>
                  <p className="text-sm text-gray-600">Aprobados</p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-red-600">{calificacion.reprobados}</p>
                  <p className="text-sm text-gray-600">Reprobados</p>
                </div>

                <div className="flex items-center justify-end space-x-2">
                  <Badge
                    className={`${
                      calificacion.reprobados === 0
                        ? "bg-green-100 text-green-800"
                        : calificacion.reprobados <= 2
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {calificacion.reprobados === 0
                      ? "Excelente"
                      : calificacion.reprobados <= 2
                        ? "Bueno"
                        : "Requiere Atención"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
