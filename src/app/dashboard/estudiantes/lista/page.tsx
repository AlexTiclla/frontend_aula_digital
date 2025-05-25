"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter } from "lucide-react"
import { useStudents } from "@/hooks/use-dashboard-data"

export default function ListaEstudiantes() {
  const { students, isLoading } = useStudents()

  if (isLoading) {
    return <div className="p-6">Cargando estudiantes...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Lista de Estudiantes</h1>
          <p className="text-gray-600">Gestiona todos los estudiantes registrados</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Estudiante
        </Button>
      </div>

      <Card className="border-blue-100">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Estudiantes Registrados ({students.length})</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Buscar estudiante..." className="pl-8 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-blue-50">
                  <th className="text-left p-4 font-medium">Nombre</th>
                  <th className="text-left p-4 font-medium">Email</th>
                  <th className="text-left p-4 font-medium">Grado</th>
                  <th className="text-left p-4 font-medium">Estado</th>
                  <th className="text-left p-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {students.map((estudiante) => (
                  <tr key={estudiante.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{estudiante.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-600 truncate max-w-[200px]">{estudiante.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs whitespace-nowrap">
                        {estudiante.grade}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                          estudiante.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {estudiante.status === "active" ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="sm" className="whitespace-nowrap">
                        Ver Detalles
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
