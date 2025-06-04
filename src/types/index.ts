// Definiciones de tipos principales
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "teacher" | "student"
  avatar?: string
}

export interface Student {
  id: string
  name: string
  email: string
  grade: string
  status: "active" | "inactive"
  enrollmentDate: Date
  parentContact?: string
}

export interface Teacher {
  id: string
  name: string
  email: string
  subject: string
  experience: string
  phone?: string
  department: string
}

export interface Course {
  id: string
  name: string
  teacherId: string
  teacher: Teacher
  students: Student[]
  schedule: string
  capacity: number
  description?: string
}

export interface DashboardStats {
  estudiantes: number
  profesores: number
  cursos: number
  eventos: number
  estudiantesNuevos: number
  asistenciaPromedio: number
}

export interface MenuItem {
  title: string
  href: string
  icon: any
  subItems?: SubMenuItem[]
}

export interface SubMenuItem {
  title: string
  href: string
  icon: any
}
