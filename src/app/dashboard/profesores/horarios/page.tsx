"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, User } from "lucide-react"

const horarios = [
  {
    id: "1",
    profesor: "Dr. Roberto Silva",
    materia: "Matemáticas",
    grado: "5° Primaria",
    horario: "Lunes 8:00 - 9:30",
    aula: "Aula 101",
  },
  {
    id: "2",
    profesor: "Dr. Roberto Silva",
    materia: "Álgebra",
    grado: "1° Secundaria",
    horario: "Lunes 10:00 - 11:30",
    aula: "Aula 102",
  },
  {
    id: "3",
    profesor: "Lic. Carmen Flores",
    materia: "Español",
    grado: "3° Primaria",
    horario: "Martes 8:00 - 9:30",
    aula: "Aula 201",
  },
  {
    id: "4",
    profesor: "Ing. Pedro Ramírez",
    materia: "Ciencias",
    grado: "2° Secundaria",
    horario: "Miércoles 9:00 - 10:30",
    aula: "Laboratorio",
  },
]

export default function HorariosProfesores() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Horarios de Profesores</h1>
          <p className="text-gray-600">Gestiona los horarios de clases del personal docente</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="h-4 w-4 mr-2" />
          Nuevo Horario
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {horarios.map((horario) => (
          <Card key={horario.id} className="border-blue-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                {horario.profesor}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <span className="font-medium text-gray-700">Materia:</span>
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{horario.materia}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium text-gray-700">Grado:</span>
                <span className="ml-2">{horario.grado}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                <span>{horario.horario}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium text-gray-700">Aula:</span>
                <span className="ml-2">{horario.aula}</span>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Ver Detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
