"use client"

import { useState, useEffect } from "react"
import type { DashboardStats, Student, Teacher } from "@/types"

// Hook personalizado para manejar datos del dashboard
export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats>({
    estudiantes: 1245,
    profesores: 87,
    cursos: 42,
    eventos: 12,
    estudiantesNuevos: 128,
    asistenciaPromedio: 92,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulación de carga de datos
    const loadData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }

    loadData()
  }, [])

  return { stats, isLoading }
}

// Hook para manejar estudiantes
export function useStudents() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Ana García",
      email: "ana.garcia@email.com",
      grade: "5° Primaria",
      status: "active",
      enrollmentDate: new Date("2023-09-01"),
    },
    {
      id: "2",
      name: "Carlos López",
      email: "carlos.lopez@email.com",
      grade: "3° Secundaria",
      status: "active",
      enrollmentDate: new Date("2023-09-01"),
    },
    {
      id: "3",
      name: "María Rodríguez",
      email: "maria.rodriguez@email.com",
      grade: "1° Preparatoria",
      status: "active",
      enrollmentDate: new Date("2023-09-01"),
    },
    {
      id: "4",
      name: "José Martínez",
      email: "jose.martinez@email.com",
      grade: "2° Primaria",
      status: "inactive",
      enrollmentDate: new Date("2023-09-01"),
    },
  ])

  const [isLoading, setIsLoading] = useState(false)

  const addStudent = (student: Omit<Student, "id">) => {
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
    }
    setStudents((prev) => [...prev, newStudent])
  }

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents((prev) => prev.map((student) => (student.id === id ? { ...student, ...updates } : student)))
  }

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id))
  }

  return {
    students,
    isLoading,
    addStudent,
    updateStudent,
    deleteStudent,
  }
}

// Hook para manejar profesores
export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: "1",
      name: "Dr. Roberto Silva",
      email: "roberto.silva@escuela.com",
      subject: "Matemáticas",
      experience: "15 años",
      department: "Ciencias Exactas",
    },
    {
      id: "2",
      name: "Lic. Carmen Flores",
      email: "carmen.flores@escuela.com",
      subject: "Español",
      experience: "8 años",
      department: "Humanidades",
    },
    {
      id: "3",
      name: "Ing. Pedro Ramírez",
      email: "pedro.ramirez@escuela.com",
      subject: "Ciencias",
      experience: "12 años",
      department: "Ciencias Naturales",
    },
    {
      id: "4",
      name: "Prof. Laura Mendoza",
      email: "laura.mendoza@escuela.com",
      subject: "Historia",
      experience: "6 años",
      department: "Ciencias Sociales",
    },
  ])

  const [isLoading, setIsLoading] = useState(false)

  return { teachers, isLoading }
}
