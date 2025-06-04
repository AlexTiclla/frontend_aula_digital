"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, GraduationCap, BookOpen, Calendar } from "lucide-react"
import { API_CONFIG } from "@/config/constants"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { token } = useAuth()
  const router = useRouter()

  const [estudiantesCount, setEstudiantesCount] = useState<number | null>(null)
  const [profesoresCount, setProfesoresCount] = useState<number | null>(null)
  const [cursosCount, setCursosCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      router.replace("/login")
      return
    }

    const fetchCounts = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` }

        const [estudiantesRes, profesoresRes, cursosRes] = await Promise.all([
          fetch(`${API_CONFIG.baseUrl}/estudiantes/`, { headers }),
          fetch(`${API_CONFIG.baseUrl}/profesores/`, { headers }),
          fetch(`${API_CONFIG.baseUrl}/cursos/`, { headers })
        ])

        const [estudiantesData, profesoresData, cursosData] = await Promise.all([
          estudiantesRes.json(),
          profesoresRes.json(),
          cursosRes.json()
        ])
    

        setEstudiantesCount(estudiantesData.length)
        setProfesoresCount(profesoresData.length)
        setCursosCount(cursosData.length)

      } catch (error) {
        console.error("Error al obtener datos del dashboard:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCounts()
  }, [token, router])

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
          <CardContent><div className="text-3xl font-bold">{estudiantesCount}</div>
           <p className="text-xs text-green-500">+50 nuevos inscritos desde el año pasado</p> 
          </CardContent>
          
        </Card>
        <Card className="border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Profesores</CardTitle>
            <GraduationCap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{profesoresCount}</div></CardContent>
        </Card>
        <Card className="border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Cursos</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{cursosCount}</div>
           <p className="text-xs text-green-500">Primaria y Secundaria</p> 
          </CardContent>
        </Card>
        <Card className="border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Eventos Próximos</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">0</div></CardContent>
        </Card>
      </div>
    </div>
  )
}
