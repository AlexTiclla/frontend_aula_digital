"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Filter, User, Mail, Phone, Briefcase, BookOpen } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ROUTES, API_CONFIG } from "@/config/constants"

interface Usuario {
    id: number
    nombre: string
    apellido: string
    email: string
    rol: string
    is_active: boolean
    created_at: string
    updated_at: string
}

interface Tutor {
    id: number
    nombre: string
    apellido: string
    relacion_estudiante: string
    telefono: string
    ocupacion: string
    lugar_trabajo: string
    correo: string
}

interface Estudiante {
    id: number
    direccion: string
    fecha_nacimiento: string
    usuario: Usuario
    tutor: Tutor
}

export default function EstudiantesCurso() {
    const [searchTerm, setSearchTerm] = useState("")
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
    const router = useRouter()
    const params = useParams()
    const cursoMateriaId = Number(params.id)

    useEffect(() => {
        const fetchEstudiantes = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await fetch(`${API_CONFIG.baseUrl}/curso_periodos/curso_periodo/${cursoMateriaId}/estudiantes`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                const data: Estudiante[] = await res.json()

                if (Array.isArray(data)) {
                    setEstudiantes(data)
                } else {
                    console.warn("Respuesta inesperada del backend:", data)
                    setEstudiantes([])
                }
            } catch (error) {
                console.error("Error al cargar estudiantes:", error)
            }
        }

        fetchEstudiantes()
    }, [cursoMateriaId])

    const filteredStudents = estudiantes.filter(
        (student) =>
            student.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.tutor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleBack = () => {
        router.push(ROUTES.COURSES.LIST)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-blue-800">Estudiantes Inscritos en la Materia</h1>
                </div>
            </div>

            <Card className="border-blue-100">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Estudiantes Inscritos ({filteredStudents.length})</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    placeholder="Buscar estudiante..."
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
                    {filteredStudents.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No se encontraron estudiantes inscritos.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredStudents.map((student) => (
                                <Card key={student.id} className="border-gray-200 hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <User className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-lg">
                                                            {student.usuario.nombre} {student.usuario.apellido}
                                                        </h3>
                                                        <Badge className="bg-green-100 text-green-800">Activo</Badge>
                                                    </div>
                                                </div>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4 text-gray-500" />
                                                        <span>{student.usuario.email}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full"
                                                        onClick={() => router.push(`/dashboard/cursos/${cursoMateriaId}/estudiantes/${student.id}/materias`)}
                                                    >
                                                        <BookOpen className="h-4 w-4 mr-2" />
                                                        Ver Materias
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="border-l pl-6">
                                                <h4 className="font-medium text-gray-900 mb-3">Información del Tutor</h4>
                                                <div className="space-y-2 text-sm">
                                                    <div>
                                                        <p className="font-medium">{student.tutor.nombre}</p>
                                                        <p className="text-gray-600">{student.tutor.relacion_estudiante}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Briefcase className="h-4 w-4 text-gray-500" />
                                                        <span>{student.tutor.ocupacion}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4 text-gray-500" />
                                                        <span>{student.tutor.correo}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-4 w-4 text-gray-500" />
                                                        <span>{student.tutor.telefono}</span>
                                                    </div>
                                                    {student.tutor.lugar_trabajo && (
                                                        <div>
                                                            <span className="text-gray-600">Lugar de trabajo:</span>
                                                            <span className="ml-1">{student.tutor.lugar_trabajo}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
