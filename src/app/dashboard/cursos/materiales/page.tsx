"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Upload, Eye, BookOpen, Video, ImageIcon } from "lucide-react"

const materiales = [
  {
    id: "1",
    titulo: "Álgebra Básica - Capítulo 1",
    curso: "Matemáticas Avanzadas",
    profesor: "Dr. Roberto Silva",
    tipo: "PDF",
    tamaño: "2.5 MB",
    fechaSubida: "2024-01-15",
    descargas: 45,
  },
  {
    id: "2",
    titulo: "Video: Ecuaciones Lineales",
    curso: "Matemáticas Avanzadas",
    profesor: "Dr. Roberto Silva",
    tipo: "Video",
    tamaño: "125 MB",
    fechaSubida: "2024-01-12",
    descargas: 32,
  },
  {
    id: "3",
    titulo: "Presentación: Literatura del Siglo XX",
    curso: "Literatura Española",
    profesor: "Lic. Carmen Flores",
    tipo: "PPT",
    tamaño: "8.2 MB",
    fechaSubida: "2024-01-10",
    descargas: 28,
  },
  {
    id: "4",
    titulo: "Laboratorio: Experimentos de Química",
    curso: "Ciencias Naturales",
    profesor: "Ing. Pedro Ramírez",
    tipo: "PDF",
    tamaño: "5.1 MB",
    fechaSubida: "2024-01-08",
    descargas: 38,
  },
]

export default function MaterialesCursos() {
  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "PDF":
        return <FileText className="h-5 w-5 text-red-500" />
      case "Video":
        return <Video className="h-5 w-5 text-blue-500" />
      case "PPT":
        return <ImageIcon className="h-5 w-5 text-orange-500" />
      default:
        return <BookOpen className="h-5 w-5 text-gray-500" />
    }
  }

  const getTipoBadge = (tipo: string) => {
    const colors = {
      PDF: "bg-red-100 text-red-800",
      Video: "bg-blue-100 text-blue-800",
      PPT: "bg-orange-100 text-orange-800",
    }
    return <Badge className={colors[tipo as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{tipo}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Materiales de Cursos</h1>
          <p className="text-gray-600">Gestiona los recursos educativos</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="h-4 w-4 mr-2" />
          Subir Material
        </Button>
      </div>

      <div className="grid gap-4">
        {materiales.map((material) => (
          <Card key={material.id} className="border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getTipoIcon(material.tipo)}
                  <div>
                    <h3 className="font-semibold text-lg">{material.titulo}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>{material.curso}</span>
                      <span>•</span>
                      <span>{material.profesor}</span>
                      <span>•</span>
                      <span>{material.tamaño}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {getTipoBadge(material.tipo)}
                  <div className="text-sm text-gray-600 text-right">
                    <p>Subido: {material.fechaSubida}</p>
                    <p>{material.descargas} descargas</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
