"use client"
import FormularioEstudiante from "../FormularioEstudiante"

export default function NuevoEstudiantePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Nuevo Estudiante</h1>
      <p className="text-gray-600">Registra un nuevo estudiante</p>
      <FormularioEstudiante isEdit={false} />
    </div>
  )
}