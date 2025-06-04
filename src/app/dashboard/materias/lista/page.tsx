"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter, BookMarked } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { API_CONFIG, ROUTES } from "@/config/constants"
import { useAuth } from "@/contexts/auth-context"

type Materia = {
  id: number
  nombre: string
  descripcion: string
  area_conocimiento: string
  horas_semanales: number
  is_active: boolean
}

export default function ListaMaterias() {
  const [subjects, setSubjects] = useState<Materia[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const { token } = useAuth()

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`${API_CONFIG.baseUrl}/materias`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (!response.ok) {
          throw new Error("Error al obtener materias")
        }
        const data = await response.json()
        setSubjects(data)
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (token) {
      fetchSubjects()
    } else {
      setIsLoading(false)
    }
  }, [token])

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.area_conocimiento.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNewSubject = () => {
    router.push(ROUTES.SUBJECTS.NEW)  // O usa ROUTES.SUBJECTS.NEW si lo tienes
  }

  const handleEditSubject = (id: number) => {
    router.push(ROUTES.SUBJECTS.EDIT)  // O usa ROUTES.SUBJECTS.EDIT
  }

  if (isLoading) {
    return <div className="p-6">Cargando materias...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Lista de Materias</h1>
          <p className="text-gray-600">Gestiona todas las materias académicas</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNewSubject}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Materia
        </Button>
      </div>

      <Card className="border-blue-100">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Materias Registradas ({filteredSubjects.length})</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar materia..."
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-blue-50">
                  <th className="text-left p-4 font-medium">Nombre</th>
                  <th className="text-left p-4 font-medium">Descripción</th>
                  <th className="text-left p-4 font-medium">Área de Conocimiento</th>
                  <th className="text-left p-4 font-medium">Horas Semanales</th>
                  <th className="text-left p-4 font-medium">Estado</th>
                  <th className="text-left p-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.map((materia) => (
                  <tr key={materia.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900 flex items-center">
                        <BookMarked className="h-4 w-4 mr-2 text-blue-600" />
                        {materia.nombre}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{materia.descripcion}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs whitespace-nowrap">
                        {materia.area_conocimiento}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{materia.horas_semanales} horas</div>
                    </td>
                    <td className="p-4">
                      <Badge
                        className={
                          materia.is_active
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }
                      >
                        {materia.is_active ? "Activa" : "Inactiva"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="whitespace-nowrap"
                          onClick={() => handleEditSubject(materia.id)}
                        >
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
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
