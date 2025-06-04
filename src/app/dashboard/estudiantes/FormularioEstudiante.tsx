"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { API_CONFIG, ROUTES } from "@/config/constants"
import { useAuth } from "@/contexts/auth-context"

export default function FormularioEstudiante({ isEdit }: { isEdit?: boolean }) {
  const [formData, setFormData] = useState({
    nombre: "", apellido: "", email: "", password: "", direccion: "", fecha_nacimiento: "",
    tutor_id: "", curso_periodo_id: ""
  })
  const [tutores, setTutores] = useState<any[]>([])
  const [cursoPeriodos, setCursoPeriodos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(isEdit); // Iniciar como cargando si es edición
  const { token } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()
  const estudianteId = params?.id as string  // Obtener ID si estamos en edición



  // Cargar tutores y cursoPeriodos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tutoresRes, cursosRes] = await Promise.all([
          fetch(`${API_CONFIG.baseUrl}/tutores`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_CONFIG.baseUrl}/curso_periodos`, { headers: { Authorization: `Bearer ${token}` } })
        ])
        setTutores(await tutoresRes.json())
        setCursoPeriodos(await cursosRes.json())
        } catch (error) {
          console.error(error);
          toast({ title: "Error", description: "No se pudieron obtener los datos", variant: "destructive" });
        } finally {
          setIsLoading(false);  
        }
    }
    if (token) fetchData()
  }, [token])

  // Si es edición, cargar datos del estudiante
  useEffect(() => {
    if (isEdit && estudianteId) {
      const fetchEstudiante = async () => {
        try {
          const res = await fetch(`${API_CONFIG.baseUrl}/estudiantes/${estudianteId}`, { headers: { Authorization: `Bearer ${token}` } })
          if (res.ok) {
            const data = await res.json()
            setFormData({
              nombre: data.nombre, apellido: data.apellido, email: data.email, password: "", direccion: data.direccion,
              fecha_nacimiento: data.fecha_nacimiento?.split("T")[0] || "", tutor_id: data.tutor_id?.toString() || "", curso_periodo_id: data.curso_periodo_id?.toString() || ""
            })
          } else {
            throw new Error("Error al obtener el estudiante");
          }
        } catch (error) {
          console.error(error);
          toast({ title: "Error", description: "No se pudieron obtener los datos", variant: "destructive" });
        } finally {
          setIsLoading(false);  
        }


      };
      fetchEstudiante()
    }
  }, [isEdit, estudianteId, token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const endpoint = isEdit
        ? `${API_CONFIG.baseUrl}/estudiantes/${estudianteId}`
        : `${API_CONFIG.baseUrl}/estudiantes`
      const method = isEdit ? "PUT" : "POST"
      const body = isEdit
        ? { tutor_id: Number(formData.tutor_id), direccion: formData.direccion, fecha_nacimiento: formData.fecha_nacimiento, curso_periodo_id: Number(formData.curso_periodo_id) }
        : { ...formData, tutor_id: Number(formData.tutor_id), curso_periodo_id: Number(formData.curso_periodo_id) }

      const res = await fetch(endpoint, {
        method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error(isEdit ? "Error al actualizar estudiante" : "Error al crear estudiante")

      toast({ title: isEdit ? "Estudiante actualizado" : "Estudiante creado" })
      router.push(ROUTES.STUDENTS.LIST)
    } catch (error) {
      toast({ title: "Error", description: error instanceof Error ? error.message : String(error), variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  // Renderizado condicional
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-lg text-gray-600">Cargando datos del estudiante...</p>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card><CardHeader><CardTitle>{isEdit ? "Editar" : "Nuevo"} Estudiante</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} required />
          <Input placeholder="Apellido" value={formData.apellido} onChange={e => setFormData({ ...formData, apellido: e.target.value })} required />
          <Input placeholder="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required={!isEdit} />
          {!isEdit && <Input placeholder="Contraseña" type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />}
          <Input placeholder="Dirección" value={formData.direccion} onChange={e => setFormData({ ...formData, direccion: e.target.value })} />
          <Input placeholder="Fecha Nacimiento" type="date" value={formData.fecha_nacimiento} onChange={e => setFormData({ ...formData, fecha_nacimiento: e.target.value })} />
          <Label>Tutor</Label>
          <Select value={formData.tutor_id} onValueChange={val => setFormData({ ...formData, tutor_id: val })}>
            <SelectTrigger><SelectValue placeholder="Selecciona un tutor" /></SelectTrigger>
            <SelectContent>{tutores.map(t => <SelectItem key={t.id} value={t.id.toString()}>{t.nombre} {t.apellido}</SelectItem>)}</SelectContent>
          </Select>
          <Label>Curso-Periodo</Label>
          <Select value={formData.curso_periodo_id} onValueChange={val => setFormData({ ...formData, curso_periodo_id: val })}>
            <SelectTrigger><SelectValue placeholder="Selecciona un curso-periodo" /></SelectTrigger>
            <SelectContent>{cursoPeriodos.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.curso_nombre} - {c.periodo_nombre}</SelectItem>)}</SelectContent>
          </Select>
        </CardContent></Card>
      <div className="flex gap-4"><Button type="submit" disabled={isLoading}>{isLoading ? "Guardando..." : isEdit ? "Actualizar" : "Registrar"}</Button>
        <Button variant="outline" type="button" onClick={() => router.push(ROUTES.STUDENTS.LIST)}>Cancelar</Button></div>
    </form>
  )
}
