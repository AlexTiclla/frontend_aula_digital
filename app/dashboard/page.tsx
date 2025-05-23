"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Users, GraduationCap, BookOpen, Calendar } from "lucide-react"

// Datos simulados para el dashboard
const dashboardData = {
  estudiantes: 1245,
  profesores: 87,
  cursos: 42,
  eventos: 12,
  estudiantesNuevos: 128,
  asistenciaPromedio: 92,
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex min-h-screen bg-blue-50/50">
      <DashboardSidebar />
      <div className="flex-1 transition-all duration-200 ml-64">
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-800">Dashboard Principal</h1>
            <p className="text-gray-600">Bienvenido al panel de administración escolar</p>
          </div>

          <Tabs defaultValue="resumen" className="space-y-4">
          
            <TabsContent value="resumen" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-blue-100">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Estudiantes Inscritos</CardTitle>
                    <Users className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.estudiantes}</div>
                    <p className="text-xs text-green-500">+{dashboardData.estudiantesNuevos} desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-100">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Profesores</CardTitle>
                    <GraduationCap className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.profesores}</div>
                    <p className="text-xs text-muted-foreground">
                      Ratio estudiante/profesor: {Math.round(dashboardData.estudiantes / dashboardData.profesores)}:1
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-blue-100">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.cursos}</div>
                    <p className="text-xs text-muted-foreground">
                      Promedio de {Math.round(dashboardData.estudiantes / dashboardData.cursos)} estudiantes por curso
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-blue-100">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Eventos Próximos</CardTitle>
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.eventos}</div>
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
                        <p className="text-4xl font-bold text-blue-800">{dashboardData.asistenciaPromedio}%</p>
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
        </main>
      </div>
    </div>
  )
}
