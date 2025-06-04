// Configuraciones y constantes del proyecto
export const APP_CONFIG = {
  name: "Colegio San Agustín",
  description: "Sistema de Administración Escolar",
  version: "1.0.0",
} as const

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_V1 || "http://127.0.0.1:8000/api/v1",
  baseUrl2: process.env.NEXT_PUBLIC_API_BASE_RAW || "http://127.0.0.1:8000",
  timeout: 10000,
} as const

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  STUDENTS: {
    LIST: "/dashboard/estudiantes/lista",
    NEW: "/dashboard/estudiantes/nuevo",
    EDIT: "/dashboard/estudiantes/editar",
    ATTENDANCE: "/dashboard/estudiantes/asistencias",
    INACTIVE: "/dashboard/estudiantes/inactivos",
  },
  TEACHERS: {
    LIST: "/dashboard/profesores/lista",
    NEW: "/dashboard/profesores/nuevo",
    SCHEDULES: "/dashboard/profesores/horarios",
    EDIT: "/dashboard/profesores/editar",
    EVALUATIONS: "/dashboard/profesores/evaluaciones",
  },
   SUBJECTS: {
    LIST: "/dashboard/materias/lista",
    NEW: "/dashboard/materias/nuevo",
    EDIT: "/dashboard/materias/editar",
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

// Niveles educativos para materias
export const EDUCATION_LEVELS = [
  "PreKinder",
  "Kinder",
  "1ro Primara",
  "2do Primaria",
  "3ro Primaria",
  "4to Primaria",
  "5to Primaria",
  "6to Primaria",
  "1ro Secundaria",
  "2do Secundaria",
  "3ro Secundaria",
  "4to Secundaria",
  "5to Secundaria",
  "6to Secundaria",
] as const

// Niveles educativos para materias
export const TUTOR_RELATIONSHIPS = [
  "Padre",
  "Madre",
  "Apoderado",
  "Tio",
  "Tia",

] as const

export const DEMO_CREDENTIALS = {
  email: "admin@escuela.com",
  password: "admin123",
} as const
