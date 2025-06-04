"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { API_CONFIG, ROUTES } from "@/config/constants"
import { useAuth } from "@/contexts/auth-context"

export default function ListaEstudiantes() {
  const [students, setStudents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { token } = useAuth()
  const router = useRouter()

  const handleNewStudent = () => {
    router.push(ROUTES.STUDENTS.NEW)
  }

  const handleEditStudent = (id: number) => {
    router.push(`${ROUTES.STUDENTS.EDIT}/${id}`)
  }

  useEffect(() => {
    const fetchStudents = async () => {
      try {
          const response = await fetch(`${API_CONFIG.baseUrl}/estudiantes`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!response.ok) {
          throw new Error("Error al obtener estudiantes")
        }
        const data = await response.json()
        setStudents(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (token) {
      fetchStudents()
    } else {
      setIsLoading(false)
    }
  }, [token])

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
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNewStudent}>
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
                  <th className="text-left p-4 font-medium">Estudiante</th>
                  <th className="text-left p-4 font-medium">Email</th>
                  <th className="text-left p-4 font-medium">Curso</th>
                  <th className="text-left p-4 font-medium">Tutor</th>
                  <th className="text-left p-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {students.map((estudiante) => (
                  <tr key={estudiante.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900 flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-600" />
                        {`${estudiante.nombre} ${estudiante.apellido}`}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-600">{estudiante.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs whitespace-nowrap">
                        {estudiante.curso_periodo_nombre}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div className="font-medium">{estudiante.tutor_nombre}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditStudent(estudiante.id)}
                        >
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                      </div>
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
