"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ListaEstudiantes() {
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
            <CardTitle>Estudiantes Registrados</CardTitle>
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
          <div className="space-y-4">
            {/* Tabla de estudiantes simulada */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg font-medium">
              <div>Nombre</div>
              <div>Grado</div>
              <div>Estado</div>
              <div>Acciones</div>
            </div>
            {[
              { nombre: "Ana García", grado: "5° Primaria", estado: "Activo" },
              { nombre: "Carlos López", grado: "3° Secundaria", estado: "Activo" },
              { nombre: "María Rodríguez", grado: "1° Preparatoria", estado: "Activo" },
              { nombre: "José Martínez", grado: "2° Primaria", estado: "Inactivo" },
            ].map((estudiante, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b">
                <div className="font-medium">{estudiante.nombre}</div>
                <div>{estudiante.grado}</div>
                <div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      estudiante.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {estudiante.estado}
                  </span>
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    Ver Detalles
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
