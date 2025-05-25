"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, GraduationCap, BookOpen, Calendar } from "lucide-react"
import { useDashboardData } from "@/hooks/use-dashboard-data"

export default function Dashboard() {
  const { stats, isLoading } = useDashboardData()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-blue-100">
              <CardHeader className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Dashboard Principal</h1>
        <p className="text-gray-600">Bienvenido al panel de administración escolar</p>
      </div>

      <Tabs defaultValue="resumen" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="estudiantes">Estudiantes</TabsTrigger>
          <TabsTrigger value="profesores">Profesores</TabsTrigger>
          <TabsTrigger value="cursos">Cursos</TabsTrigger>
        </TabsList>
        <TabsContent value="resumen" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Estudiantes Inscritos</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.estudiantes}</div>
                <p className="text-xs text-green-500">+{stats.estudiantesNuevos} desde el mes pasado</p>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profesores</CardTitle>
                <GraduationCap className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.profesores}</div>
                <p className="text-xs text-muted-foreground">
                  Ratio estudiante/profesor: {Math.round(stats.estudiantes / stats.profesores)}:1
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.cursos}</div>
                <p className="text-xs text-muted-foreground">
                  Promedio de {Math.round(stats.estudiantes / stats.cursos)} estudiantes por curso
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eventos Próximos</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.eventos}</div>
                <p className="text-xs text-muted-foreground">En los próximos 30 días</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-blue-100">
              <CardHeader>
                <CardTitle>Estadísticas de Asistencia</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] flex items-center justify-center bg-blue-50 rounded-md">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-blue-800">{stats.asistenciaPromedio}%</p>
                    <p className="text-gray-600">Asistencia promedio</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3 border-blue-100">
              <CardHeader>
                <CardTitle>Distribución por Grado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Primaria</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Secundaria</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "35%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Preparatoria</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="estudiantes">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle>Gestión de Estudiantes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Utiliza la barra lateral para acceder a las diferentes opciones de gestión de estudiantes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 hover:bg-blue-50 cursor-pointer">
                  <h3 className="font-semibold">Lista de Estudiantes</h3>
                  <p className="text-sm text-gray-600">Ver y gestionar todos los estudiantes</p>
                </Card>
                <Card className="p-4 hover:bg-blue-50 cursor-pointer">
                  <h3 className="font-semibold">Asistencias</h3>
                  <p className="text-sm text-gray-600">Control de asistencia diaria</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profesores">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle>Gestión de Profesores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Utiliza la barra lateral para acceder a las diferentes opciones de gestión de profesores.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 hover:bg-blue-50 cursor-pointer">
                  <h3 className="font-semibold">Lista de Profesores</h3>
                  <p className="text-sm text-gray-600">Ver y gestionar el personal docente</p>
                </Card>
                <Card className="p-4 hover:bg-blue-50 cursor-pointer">
                  <h3 className="font-semibold">Horarios</h3>
                  <p className="text-sm text-gray-600">Gestionar horarios de clases</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cursos">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle>Gestión de Cursos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Utiliza la barra lateral para acceder a las diferentes opciones de gestión de cursos.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 hover:bg-blue-50 cursor-pointer">
                  <h3 className="font-semibold">Lista de Cursos</h3>
                  <p className="text-sm text-gray-600">Ver y gestionar todos los cursos</p>
                </Card>
                <Card className="p-4 hover:bg-blue-50 cursor-pointer">
                  <h3 className="font-semibold">Calificaciones</h3>
                  <p className="text-sm text-gray-600">Sistema de calificaciones</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
