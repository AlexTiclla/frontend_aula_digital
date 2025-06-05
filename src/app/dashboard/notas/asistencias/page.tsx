"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, Users, CheckCircle } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { API_CONFIG } from "@/config/constants"

interface Periodo {
    id: number
    descripcion: string
    bimestre: number
    anio: number
}

interface CursoPeriodo {
    id: number
    curso_id: number
    curso_nombre: string
    periodo_id: number
    turno: string
    aula: string
    capacidad_actual: number
    is_active: boolean
}

interface CursoMateria {
    id: number
    nombre_materia: string
    curso_periodo_id: number
}

interface Estudiante {
    id: number
    usuario: {
        nombre: string
        apellido: string
    }
}

export default function AsistenciaPage() {
    const [periodos, setPeriodos] = useState<Periodo[]>([])
    const [cursoPeriodos, setCursoPeriodos] = useState<CursoPeriodo[]>([])
    const [cursoMaterias, setCursoMaterias] = useState<CursoMateria[]>([])

    const [periodoId, setPeriodoId] = useState<number | null>(null)
    const [cursoPeriodoId, setCursoPeriodoId] = useState<number | null>(null)
    const [cursoMateriaId, setCursoMateriaId] = useState<number | null>(null)

    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
    const [asistencia, setAsistencia] = useState<Record<number, boolean>>({})
    const [fecha, setFecha] = useState<Date>(new Date())

    // Cargar periodos
    useEffect(() => {
        fetch(`${API_CONFIG.baseUrl}/periodos/`)
            .then(res => res.json())
            .then(setPeriodos)
            .catch(console.error)
    }, [])

    // Cargar curso_periodos según periodo
    useEffect(() => {
        if (!periodoId) return
        fetch(`${API_CONFIG.baseUrl}/curso_periodos/get`)
            .then(res => res.json())
            .then((data: CursoPeriodo[]) =>
                setCursoPeriodos(data.filter(cp => cp.periodo_id === periodoId))
            )
            .catch(console.error)
    }, [periodoId])

    // Cargar curso_materias según periodo (y opcionalmente curso_periodo)
    useEffect(() => {
        if (!periodoId || !cursoPeriodoId) return

        fetch(`${API_CONFIG.baseUrl}/curso_materias/por_periodo/${periodoId}`)
            .then(res => res.json())
            .then((data: CursoMateria[]) => {
                const filtrado = data.filter(cm => cm.curso_periodo_id === cursoPeriodoId)
                setCursoMaterias(filtrado)
            })
            .catch(console.error)
    }, [periodoId, cursoPeriodoId])

    // Cargar estudiantes
    const cargarEstudiantes = async (cursoMateriaId: number) => {
        setCursoMateriaId(cursoMateriaId)
        try {
            const res = await fetch(`${API_CONFIG.baseUrl}/curso_materias/curso_materia/${cursoMateriaId}/estudiantes`)
            const data = await res.json()
            setEstudiantes(data)
            setAsistencia({})
        } catch (err) {
            console.error("Error cargando estudiantes:", err)
        }
    }

    const marcarAsistencia = (id: number, presente: boolean) => {
        setAsistencia(prev => ({ ...prev, [id]: presente }))
    }

    const guardarAsistencias = async () => {
        if (!cursoMateriaId) return

        const token = localStorage.getItem("token") // ✅ Obtener token guardado

        for (const [estudianteId, valor] of Object.entries(asistencia)) {
            await fetch(`${API_CONFIG.baseUrl}/asistencias`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // ✅ Añadir token
                },
                body: JSON.stringify({
                    estudiante_id: Number(estudianteId),
                    curso_materia_id: cursoMateriaId,
                    valor,
                    fecha,
                }),
            })
        }

        alert("Asistencias guardadas")
    }


    return (
        <div className="p-6 space-y-6">

            {/* SELECCIÓN DE PERIODO */}
            <Card>
                <CardHeader>
                    <CardTitle><CalendarIcon className="inline w-5 h-5 mr-2" /> Seleccionar Periodo</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {periodos.map(p => (
                        <Button key={p.id} onClick={() => setPeriodoId(p.id)} variant={periodoId === p.id ? "default" : "outline"}>
                            {p.descripcion} ({p.anio})
                        </Button>
                    ))}
                </CardContent>
            </Card>

            {/* SELECCIÓN DE CURSO_PERIODO */}
            {cursoPeriodos.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Seleccionar Curso-Periodo</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {cursoPeriodos.map(cp => (
                            <Button
                                key={cp.id}
                                onClick={() => setCursoPeriodoId(cp.id)}
                                variant={cursoPeriodoId === cp.id ? "default" : "outline"}
                            >
                                {cp.curso_nombre} ({cp.turno})
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* SELECCIÓN DE CURSO_MATERIA */}
            {cursoPeriodoId && cursoMaterias.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Seleccionar Materia</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {cursoMaterias.map(cm => (
                            <Button
                                key={cm.id}
                                onClick={() => cargarEstudiantes(cm.id)}
                                variant={cursoMateriaId === cm.id ? "default" : "outline"}
                            >
                                {cm.nombre_materia}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* LISTADO DE ESTUDIANTES */}
            {cursoMateriaId && estudiantes.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle><Users className="inline w-5 h-5 mr-2" /> Marcar Asistencia</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <Label>Fecha de asistencia</Label>
                            <Calendar mode="single" selected={fecha} onSelect={(d) => d && setFecha(d)} />
                        </div>
                        {estudiantes.map(est => (
                            <div key={est.id} className="flex items-center justify-between border-b py-2 gap-4">
                                <div className="flex-1 text-sm font-medium truncate">
                                    {est.usuario?.nombre} {est.usuario?.apellido}
                                </div>
                                <Checkbox
                                    checked={asistencia[est.id] || false}
                                    onCheckedChange={checked => marcarAsistencia(est.id, Boolean(checked))}
                                />
                            </div>
                        ))}
                        <Button className="mt-4" onClick={guardarAsistencias}>
                            <CheckCircle className="w-4 h-4 mr-2" /> Guardar Asistencias
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
