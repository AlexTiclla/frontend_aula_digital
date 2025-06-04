"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter, Mail } from "lucide-react"
import { API_CONFIG, ROUTES } from "@/config/constants"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

// Nuevo tipo basado en el backend
type Usuario = {
  id: number
  nombre: string
  apellido: string
  email: string
  rol: string
  is_active: boolean
  created_at: string
  updated_at: string
}

type Profesor = {
  id: number
  usuario: Usuario
  telefono: string
  carnet_identidad: string
  especialidad: string
  nivel_academico: string
}

export default function ListaProfesores() {
  const [teachers, setTeachers] = useState<Profesor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { token } = useAuth()
  const router = useRouter()
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(`${API_CONFIG.baseUrl}/profesores`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!response.ok) throw new Error("Error al obtener profesores")
        const data = await response.json()
        setTeachers(data)
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (token) fetchTeachers()
    else setIsLoading(false)
  }, [token])

  if (isLoading) return <div className="p-6">Cargando profesores...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Lista de Profesores</h1>
          <p className="text-gray-600">Gestiona todo el personal docente</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Profesor
        </Button>
      </div>

      <Card className="border-blue-100">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Profesores Registrados ({teachers.length})</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Buscar profesor..." className="pl-8 w-64" />
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
                  <th className="text-left p-4 font-medium">Especialidad</th>
                  <th className="text-left p-4 font-medium">Nivel Académico</th>
                  <th className="text-left p-4 font-medium">Teléfono</th>
                  <th className="text-left p-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((profesor) => (
                  <tr key={profesor.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">
                      {profesor.usuario.nombre} {profesor.usuario.apellido}
                    </td>
                    <td className="p-4 text-sm text-gray-600 truncate max-w-[200px] flex items-center">
                      <Mail className="h-3 w-3 mr-1" /> {profesor.usuario.email}
                    </td>
                    <td className="p-4 px-2 py-1 text-blue-60 rounded-full text-xs whitespace-nowrap">
                      {profesor.especialidad}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {profesor.nivel_academico}
                    </td>
                    <td className="p-4 text-sm">
                      {profesor.telefono}
                    </td>
                    <td className="p-4 flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => router.push(`${ROUTES.TEACHERS.EDIT}/${profesor.id}`)}>
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">Ver Detalles</Button>
                      <Button variant="outline" size="sm">Horarios</Button>
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
