"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ListaCursos() {
  const router = useRouter();
  return (
    <div className="p-6">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="bg-blue-600 hover:bg-blue-700 text-white mb-4"
      >
        ← Volver
      </Button>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Lista de Cursos</h1>
          <p className="text-gray-600">Administra todos los cursos disponibles</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Curso
        </Button>
      </div>

      <Card className="border-blue-100">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Cursos Activos</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Buscar curso..." className="pl-8 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4 p-4 bg-blue-50 rounded-lg font-medium">
              <div>Curso</div>
              <div>Profesor</div>
              <div>Estudiantes</div>
              <div>Horario</div>
              <div>Acciones</div>
            </div>
            {[
              {
                curso: "1ro Primaria",
                profesor: "Dr. Roberto Silva",
                estudiantes: 28,
                horario: "Mañana",
              },
              {
                curso: "2do Primaria",
                profesor: "Lic. Carmen Flores",
                estudiantes: 32,
                horario: "Mañana",
              },
              {
                curso: "3ro Primaria",
                profesor: "Ing. Pedro Ramírez",
                estudiantes: 24,
                horario: "Mañana",
              },
              {
                curso: "4to Primaria",
                profesor: "Prof. Laura Mendoza",
                estudiantes: 30,
                horario: "Tarde",
              },
            ].map((curso, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b">
                <div className="font-medium">{curso.curso}</div>
                <div>{curso.profesor}</div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {curso.estudiantes}
                </div>
                <div className="text-sm text-gray-600">{curso.horario}</div>
                <div>
                  <Button variant="outline" size="sm">
                    Gestionar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
