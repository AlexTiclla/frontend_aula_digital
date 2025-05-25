// Servicio para comunicación con APIs
import { API_CONFIG } from "@/config/constants"
import type { Student, Teacher, Course, User } from "@/types"

class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl
  }

  // Métodos de autenticación
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Simulación de llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "admin@escuela.com" && password === "admin123") {
      return {
        user: {
          id: "1",
          email,
          name: "Administrador",
          role: "admin",
        },
        token: "fake-jwt-token",
      }
    }

    throw new Error("Credenciales inválidas")
  }

  // Métodos para estudiantes
  async getStudents(): Promise<Student[]> {
    // Simulación de llamada a API
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [
      {
        id: "1",
        name: "Ana García",
        email: "ana.garcia@email.com",
        grade: "5° Primaria",
        status: "active",
        enrollmentDate: new Date("2023-09-01"),
      },
      // ... más estudiantes
    ]
  }

  async createStudent(student: Omit<Student, "id">): Promise<Student> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      ...student,
      id: Date.now().toString(),
    }
  }

  async updateStudent(id: string, updates: Partial<Student>): Promise<Student> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Simulación de actualización
    const students = await this.getStudents()
    const student = students.find((s) => s.id === id)
    if (!student) throw new Error("Estudiante no encontrado")

    return { ...student, ...updates }
  }

  async deleteStudent(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Simulación de eliminación
  }

  // Métodos para profesores
  async getTeachers(): Promise<Teacher[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [
      {
        id: "1",
        name: "Dr. Roberto Silva",
        email: "roberto.silva@escuela.com",
        subject: "Matemáticas",
        experience: "15 años",
        department: "Ciencias Exactas",
      },
      // ... más profesores
    ]
  }

  // Métodos para cursos
  async getCourses(): Promise<Course[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return []
  }
}

export const apiService = new ApiService()
