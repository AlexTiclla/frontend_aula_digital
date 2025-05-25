"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Award, FileText } from "lucide-react"

const evaluaciones = [
  {
    id: "1",
    profesor: "Dr. Roberto Silva",
    materia: "Matemáticas",
    periodo: "2024-1",
    calificacion: 4.8,
    estudiantes: 28,
    comentarios: 12,
    estado: "completada",
  },
  {
    id: "2",
    profesor: "Lic. Carmen Flores",
    materia: "Español",
    periodo: "2024-1",
    calificacion: 4.6,
    estudiantes: 25,
    comentarios: 8,
    estado: "en_proceso",
  },
  {
    id: "3",
    profesor: "Ing. Pedro Ramírez",
    materia: "Ciencias",
    periodo: "2024-1",
    calificacion: 4.9,
    estudiantes: 22,
    comentarios: 15,
    estado: "completada",
  },
  {
    id: "4",
    profesor: "Prof. Laura Mendoza",
    materia: "Historia",
    periodo: "2024-1",
    calificacion: 4.5,
    estudiantes: 30,
    comentarios: 6,
    estado: "pendiente",
  },
]

export default function EvaluacionesProfesores() {
  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "completada":
        return <Badge className="bg-green-100 text-green-800">Completada</Badge>
      case "en_proceso":
        return <Badge className="bg-yellow-100 text-yellow-800">En Proceso</Badge>
      case "pendiente":
        return <Badge className="bg-red-100 text-red-800">Pendiente</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Evaluaciones de Profesores</h1>
          <p className="text-gray-600">Seguimiento del desempeño docente</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="h-4 w-4 mr-2" />
          Nueva Evaluación
        </Button>
      </div>

      <div className="grid gap-6">
        {evaluaciones.map((evaluacion) => (
          <Card key={evaluacion.id} className="border-blue-100">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{evaluacion.profesor}</CardTitle>
                  <p className="text-gray-600">
                    {evaluacion.materia} - {evaluacion.periodo}
                  </p>
                </div>
                {getEstadoBadge(evaluacion.estado)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">{evaluacion.calificacion}</p>
                    <p className="text-sm text-gray-600">Calificación</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{evaluacion.estudiantes}</p>
                    <p className="text-sm text-gray-600">Estudiantes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{evaluacion.comentarios}</p>
                    <p className="text-sm text-gray-600">Comentarios</p>
                  </div>
                </div>
                <div className="flex items-center justify-end">
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
