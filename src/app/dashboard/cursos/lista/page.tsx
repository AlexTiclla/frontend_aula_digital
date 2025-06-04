"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, BookOpen, Users, Clock } from "lucide-react"
import { API_CONFIG } from "@/config/constants"
import { useRouter } from "next/navigation"

// Tipos
interface Periodo {
  id: number
  anio: number
  bimestre: number
  descripcion: string
}

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

export default function ListaCursosPeriodo() {
  const [periodos, setPeriodos] = useState<Periodo[]>([])
  const [añoSeleccionado, setAñoSeleccionado] = useState<number | null>(null)
  const [bimestreSeleccionado, setBimestreSeleccionado] = useState<number | null>(null)
  const [cursosPeriodo, setCursosPeriodo] = useState<CursoPeriodo[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  // Obtener periodos
  useEffect(() => {
    fetch(`${API_CONFIG.baseUrl}/periodos/`)
      .then(res => res.json())
      .then(setPeriodos)
      .catch(err => console.error("Error al obtener periodos:", err))
  }, [])

  // Obtener cursos del periodo
  useEffect(() => {
    const fetchCursosPeriodo = async () => {
      if (!bimestreSeleccionado) return
      try {
        const res = await fetch(`${API_CONFIG.baseUrl}/curso_periodos/`)
        const data: CursoPeriodo[] = await res.json()
        console.log("Cursos obtenidos:", data)
        const filtrados = data.filter(cp => cp.periodo_id === bimestreSeleccionado)
        setCursosPeriodo(filtrados)
      } catch (err) {
        console.error("Error al obtener curso_periodos:", err)
      }
    }
    fetchCursosPeriodo()
  }, [bimestreSeleccionado])

  const añosUnicos = Array.from(new Set(periodos.map(p => p.anio))).sort()
  const bimestresFiltrados = periodos.filter(p => p.anio === añoSeleccionado)
  const router = useRouter()
  const cursosFiltrados = cursosPeriodo.filter(cp =>
    cp.curso_nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Cursos por Bimestre</h1>
      <p className="text-gray-600">Filtra los cursos por año y bimestre académico</p>

      <div className="flex gap-4 flex-wrap">
        <select
          className="border px-3 py-2 rounded-md"
          value={añoSeleccionado ?? ""}
          onChange={e => {
            setAñoSeleccionado(Number(e.target.value))
            setBimestreSeleccionado(null)
          }}
        >
          <option value="">Selecciona un año</option>
          {añosUnicos.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded-md"
          value={bimestreSeleccionado ?? ""}
          onChange={e => setBimestreSeleccionado(Number(e.target.value))}
          disabled={!añoSeleccionado}
        >
          <option value="">Selecciona un bimestre</option>
          {bimestresFiltrados.map(b => (
            <option key={b.id} value={b.id}>{b.descripcion}</option>
          ))}
        </select>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar curso..."
            className="pl-8 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {bimestreSeleccionado && (
        <Card className="border-blue-100">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                Cursos del bimestre seleccionado ({cursosFiltrados.length})
              </CardTitle>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />Filtros
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {!cursosFiltrados.length ? (
              <p>No hay cursos registrados.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cursosFiltrados.map(curso => (
                  <Card key={curso.id} className="border-blue-100 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{curso.curso_nombre}</CardTitle>
                          <p className="text-sm text-gray-600">{curso.periodo_nombre}</p>
                        </div>
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{curso.capacidad_actual}</span>
                        </div>
                        <div className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          {curso.turno}
                        </div>
                      </div>

                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1 text-gray-500" />
                        <span>Aula: {curso.aula}</span>
                      </div>

                      <div className="pt-2 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push(`/dashboard/cursos/${curso.id}/estudiantes`)}>
                          Estudiantes
                        </Button>
                      
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
