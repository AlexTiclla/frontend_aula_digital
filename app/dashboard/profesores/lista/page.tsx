"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ListaProfesores() {
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
          <h1 className="text-3xl font-bold text-blue-800">Lista de Profesores</h1>
          <p className="text-gray-600">Gestiona el personal docente</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Profesor
        </Button>
      </div>

      <Card className="border-blue-100">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Personal Docente</CardTitle>
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
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg font-medium">
              <div>Nombre</div>
              <div>Materia</div>
              <div>Experiencia</div>
              <div>Acciones</div>
            </div>
            {[
              { nombre: "Dr. Roberto Silva", materia: "Matemáticas", experiencia: "15 años" },
              { nombre: "Lic. Carmen Flores", materia: "Español", experiencia: "8 años" },
              { nombre: "Ing. Pedro Ramírez", materia: "Ciencias", experiencia: "12 años" },
              { nombre: "Prof. Laura Mendoza", materia: "Historia", experiencia: "6 años" },
            ].map((profesor, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b">
                <div className="font-medium">{profesor.nombre}</div>
                <div>{profesor.materia}</div>
                <div>{profesor.experiencia}</div>
                <div>
                  <Button variant="outline" size="sm">
                    Ver Perfil
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
