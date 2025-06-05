"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, Users, Save } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

export default function ParticipacionPage() {
    const [periodos, setPeriodos] = useState<Periodo[]>([])
    const [cursoPeriodos, setCursoPeriodos] = useState<CursoPeriodo[]>([])
    const [cursoMaterias, setCursoMaterias] = useState<CursoMateria[]>([])

    const [periodoId, setPeriodoId] = useState<number | null>(null)
    const [cursoPeriodoId, setCursoPeriodoId] = useState<number | null>(null)
    const [cursoMateriaId, setCursoMateriaId] = useState<number | null>(null)

    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
    const [participaciones, setParticipaciones] = useState<Record<number, string>>({})
    const [fecha, setFecha] = useState<Date>(new Date())

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    useEffect(() => {
        fetch(`${API_CONFIG.baseUrl}/periodos/`)
            .then(res => res.json())
            .then(setPeriodos)
            .catch(console.error)
    }, [])

    useEffect(() => {
        if (!periodoId) return
        fetch(`${API_CONFIG.baseUrl}/curso_periodos/`)
            .then(res => res.json())
            .then((data: CursoPeriodo[]) => {
                setCursoPeriodos(data.filter(cp => cp.periodo_id === periodoId))
            })
            .catch(console.error)
    }, [periodoId])

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

    const cargarEstudiantes = async (cursoMateriaId: number) => {
        setCursoMateriaId(cursoMateriaId)
        try {
            const res = await fetch(`${API_CONFIG.baseUrl}/curso_materias/curso_materia/${cursoMateriaId}/estudiantes`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await res.json()
            setEstudiantes(data)
            setParticipaciones({})
        } catch (err) {
            console.error("Error cargando estudiantes:", err)
        }
    }

    const guardarParticipaciones = async () => {
        if (!cursoMateriaId || !token) return

        for (const [estudianteId, valor] of Object.entries(participaciones)) {
            if (!["Baja", "Media", "Alta"].includes(valor)) continue // ✅ Validación de valor permitido

            await fetch(`${API_CONFIG.baseUrl2}/participaciones`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    estudiante_id: Number(estudianteId),
                    curso_materia_id: cursoMateriaId,
                    participacion_clase: valor, // ✅ string directo
                    fecha
                }),
            })
        }

        alert("Participaciones guardadas correctamente")
    }


    return (
        <div className="p-6 space-y-6">

            {/* PERIODO */}
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

            {/* CURSO-PERIODO */}
            {cursoPeriodos.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Seleccionar Curso-Periodo</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {cursoPeriodos.map(cp => (
                            <Button key={cp.id} onClick={() => setCursoPeriodoId(cp.id)} variant={cursoPeriodoId === cp.id ? "default" : "outline"}>
                                {cp.curso_nombre} ({cp.turno})
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* CURSO-MATERIA */}
            {cursoPeriodoId && cursoMaterias.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Seleccionar Materia</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {cursoMaterias.map(cm => (
                            <Button key={cm.id} onClick={() => cargarEstudiantes(cm.id)} variant={cursoMateriaId === cm.id ? "default" : "outline"}>
                                {cm.nombre_materia}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* PARTICIPACIÓN */}
            {cursoMateriaId && estudiantes.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle><Users className="inline w-5 h-5 mr-2" /> Registrar Participación</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <Label>Fecha</Label>
                            <Calendar mode="single" selected={fecha} onSelect={(d) => d && setFecha(d)} />
                        </div>
                        {estudiantes.map(est => (
                            <div key={est.id} className="flex items-center justify-between border-b py-2 gap-4">
                                <div className="flex-1 truncate">
                                    {est.usuario?.nombre} {est.usuario?.apellido}
                                </div>
                                <select
                                    className="border rounded px-2 py-1 text-sm"
                                    value={participaciones[est.id] ?? ""}
                                    onChange={(e) =>
                                        setParticipaciones((prev) => ({ ...prev, [est.id]: e.target.value }))
                                    }
                                >
                                    <option value="">Selecciona</option>
                                    <option value="Baja">Baja</option>
                                    <option value="Media">Media</option>
                                    <option value="Alta">Alta</option>
                                </select>

                            </div>
                        ))}
                        <Button className="mt-4" onClick={guardarParticipaciones}>
                            <Save className="w-4 h-4 mr-2" /> Guardar Participación
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
