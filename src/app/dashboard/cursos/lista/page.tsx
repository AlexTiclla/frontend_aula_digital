"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter, Users, Clock, BookOpen } from "lucide-react"
import { useState } from "react"

const cursos = [
  {
    id: "1",
    name: "Matemáticas Avanzadas",
    teacher: "Dr. Roberto Silva",
    students: 28,
    capacity: 30,
    schedule: "Lun-Mié-Vie 8:00-9:30",
    grade: "5° Primaria",
    status: "activo",
  },
  {
    id: "2",
    name: "Literatura Española",
    teacher: "Lic. Carmen Flores",
    students: 25,
    capacity: 25,
    schedule: "Mar-Jue 10:00-11:30",
    grade: "3° Secundaria",
    status: "activo",
  },
  {
    id: "3",
    name: "Ciencias Naturales",
    teacher: "Ing. Pedro Ramírez",
    students: 22,
    capacity: 24,
    schedule: "Lun-Mié 9:00-10:30",
    grade: "2° Secundaria",
    status: "activo",
  },
  {
    id: "4",
    name: "Historia Universal",
    teacher: "Prof. Laura Mendoza",
    students: 18,
    capacity: 30,
    schedule: "Mar-Jue-Vie 11:00-12:30",
    grade: "1° Preparatoria",
    status: "activo",
  },
]

export default function ListaCursos() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCursos = cursos.filter(
    (curso) =>
      curso.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.teacher.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Lista de Cursos</h1>
          <p className="text-gray-600">Gestiona todos los cursos académicos</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Curso
        </Button>
      </div>

      <Card className="border-blue-100">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Cursos Registrados ({filteredCursos.length})</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar curso o profesor..."
                  className="pl-8 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCursos.map((curso) => (
              <Card key={curso.id} className="border-blue-100 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{curso.name}</CardTitle>
                      <p className="text-sm text-gray-600">{curso.grade}</p>
                    </div>
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700">Profesor:</span>
                    <span className="ml-2">{curso.teacher}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-500" />
                      <span>
                        {curso.students}/{curso.capacity}
                      </span>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        curso.students >= curso.capacity
                          ? "bg-red-100 text-red-800"
                          : curso.students >= curso.capacity * 0.8
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {curso.students >= curso.capacity
                        ? "Lleno"
                        : curso.students >= curso.capacity * 0.8
                          ? "Casi lleno"
                          : "Disponible"}
                    </div>
                  </div>

                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{curso.schedule}</span>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Ver Detalles
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Estudiantes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
