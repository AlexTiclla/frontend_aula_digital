// Configuraciones y constantes del proyecto
export const APP_CONFIG = {
  name: "Colegio San Agustín",
  description: "Sistema de Administración Escolar",
  version: "1.0.0",
} as const

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 10000,
} as const

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  STUDENTS: {
    LIST: "/dashboard/estudiantes/lista",
    NEW: "/dashboard/estudiantes/nuevo",
    ATTENDANCE: "/dashboard/estudiantes/asistencias",
    INACTIVE: "/dashboard/estudiantes/inactivos",
  },
  TEACHERS: {
    LIST: "/dashboard/profesores/lista",
    NEW: "/dashboard/profesores/nuevo",
    SCHEDULES: "/dashboard/profesores/horarios",
    EVALUATIONS: "/dashboard/profesores/evaluaciones",
  },
  COURSES: {
    LIST: "/dashboard/cursos/lista",
    NEW: "/dashboard/cursos/nuevo",
    MATERIALS: "/dashboard/cursos/materiales",
    GRADES: "/dashboard/cursos/calificaciones",
  },
  CALENDAR: {
    MONTHLY: "/dashboard/calendario/mensual",
    EVENTS: "/dashboard/calendario/eventos",
    SCHEDULES: "/dashboard/calendario/horarios",
  },
  SETTINGS: {
    GENERAL: "/dashboard/configuracion/general",
    USERS: "/dashboard/configuracion/usuarios",
    NOTIFICATIONS: "/dashboard/configuracion/notificaciones",
  },
} as const

export const DEMO_CREDENTIALS = {
  email: "admin@escuela.com",
  password: "admin123",
} as const
