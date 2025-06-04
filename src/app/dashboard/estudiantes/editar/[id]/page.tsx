"use client"
import FormularioEstudiante from "../../FormularioEstudiante"

export default function EditarEstudiantePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Editar Estudiante</h1>
      <p className="text-gray-600">Modifica los datos del estudiante</p>
      <FormularioEstudiante isEdit={true} />
    </div>
  )
}