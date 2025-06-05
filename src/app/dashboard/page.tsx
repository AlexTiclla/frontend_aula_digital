"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, GraduationCap, BookOpen, Calendar } from "lucide-react"
import { API_CONFIG } from "@/config/constants"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
interface CursoPeriodo {
  id: number
  curso_id: number
  curso_nombre: string
  periodo_id: number
  periodo_nombre: string
  aula: string
  turno: string
  capacidad_actual: number
  is_active: boolean
}

export default function Dashboard() {
  const { token } = useAuth()
  const router = useRouter()

  const [estudiantesCount, setEstudiantesCount] = useState<number | null>(null)
  const [profesoresCount, setProfesoresCount] = useState<number | null>(null)
  const [cursosCount, setCursosCount] = useState<number | null>(null)
  const [cursoPeriodos, setCursoPeriodos] = useState<CursoPeriodo[]>([])
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState<number | null>(null)
  const [filtrados, setFiltrados] = useState<CursoPeriodo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      router.replace("/login")
      return
    }

    

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` }

        const [estudiantesRes, profesoresRes, cursosRes, periodosRes] = await Promise.all([
          fetch(`${API_CONFIG.baseUrl}/estudiantes/`, { headers }),
          fetch(`${API_CONFIG.baseUrl}/profesores/`, { headers }),
          fetch(`${API_CONFIG.baseUrl}/cursos/`, { headers }),
          fetch(`${API_CONFIG.baseUrl}/curso_periodos/`, { headers })
        ])

        const [estudiantesData, profesoresData, cursosData, periodosData] = await Promise.all([
          estudiantesRes.json(),
          profesoresRes.json(),
          cursosRes.json(),
          periodosRes.json()
        ])

        setEstudiantesCount(estudiantesData.length)
        setProfesoresCount(profesoresData.length)
        setCursosCount(cursosData.length)
        setCursoPeriodos(periodosData)
        setFiltrados(periodosData) // inicial sin filtro

      } catch (error) {
        console.error("Error al obtener datos del dashboard:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [token, router])

  useEffect(() => {
    if (periodoSeleccionado) {
      setFiltrados(
        cursoPeriodos.filter(cp => cp.periodo_id === periodoSeleccionado)
      )
    } else {
      setFiltrados(cursoPeriodos)
    }
  }, [periodoSeleccionado, cursoPeriodos])

  if (!token) return <p>Redirigiendo...</p>
  if (isLoading) return <p>Cargando datos del dashboard...</p>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Dashboard Principal</h1>
      <p className="text-gray-600">Bienvenido al panel de administración escolar</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Estudiantes Inscritos</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{estudiantesCount}</div>
            <p className="text-xs text-green-500">+50 nuevos inscritos desde el año pasado</p>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Profesores</CardTitle>
            <GraduationCap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profesoresCount}</div>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Cursos</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cursosCount}</div>
            <p className="text-xs text-green-500">Primaria y Secundaria</p>
          </CardContent>
        </Card>

       
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-blue-700">Curso-Periodos</h2>
        <select
          onChange={(e) => setPeriodoSeleccionado(Number(e.target.value) || null)}
          className="border px-2 py-1 rounded mt-2"
        >
          <option value="">Todos los periodos</option>
          {[...new Set(cursoPeriodos.map(cp => cp.periodo_id))].map(pid => {
            const nombre = cursoPeriodos.find(cp => cp.periodo_id === pid)?.periodo_nombre
            return <option key={pid} value={pid}>{nombre}</option>
          })}
        </select>

        <div className="grid gap-4 mt-4 md:grid-cols-2">
          {filtrados.map(cp => (
            <Card key={cp.id} className="border-gray-200">
              <CardHeader>
                <CardTitle>{cp.curso_nombre}</CardTitle>
              </CardHeader>
              <CardContent>
                 <p><strong>ID:</strong> {cp.id}</p>
                <p><strong>Periodo:</strong> {cp.periodo_nombre}</p>
                <p><strong>Aula:</strong> {cp.aula}</p>
                <p><strong>Turno:</strong> {cp.turno}</p>
                <p><strong>Capacidad:</strong> {cp.capacidad_actual}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
