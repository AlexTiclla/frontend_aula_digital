"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Settings,
  School,
  Menu,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  UserPlus,
  UserCheck,
  UserX,
  Award,
  Clock,
  FileText,
  PlusCircle,
  List,
  TrendingUp,
  CalendarDays,
  Bell,
  Cog,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ROUTES } from "@/config/constants"
import type { MenuItem } from "@/types"

// Configuración del menú usando las rutas definidas
const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: BarChart,
    subItems: [
      {
        title: "Resumen General",
        href: `${ROUTES.DASHBOARD}/resumen`,
        icon: TrendingUp,
      },
      {
        title: "Estadísticas",
        href: `${ROUTES.DASHBOARD}/estadisticas`,
        icon: BarChart,
      },
    ],
  },
  {
    title: "Estudiantes",
    href: ROUTES.STUDENTS.LIST,
    icon: Users,
    subItems: [
      {
        title: "Lista de Estudiantes",
        href: ROUTES.STUDENTS.LIST,
        icon: List,
      },
      {
        title: "Nuevo Estudiante",
        href: ROUTES.STUDENTS.NEW,
        icon: UserPlus,
      },
       {
        title: "Editar Estudiante",
        href: ROUTES.STUDENTS.EDIT,
        icon: List,
      },
      {
        title: "Asistencias",
        href: ROUTES.STUDENTS.ATTENDANCE,
        icon: UserCheck,
      },
      {
        title: "Estudiantes Inactivos",
        href: ROUTES.STUDENTS.INACTIVE,
        icon: UserX,
      },
    ],
  },
  {
    title: "Profesores",
    href: ROUTES.TEACHERS.LIST,
    icon: GraduationCap,
    subItems: [
      {
        title: "Lista de Profesores",
        href: ROUTES.TEACHERS.LIST,
        icon: List,
      },
      {
        title: "Nuevo Profesor",
        href: ROUTES.TEACHERS.NEW,
        icon: UserPlus,
      },
      {
        title: "Horarios",
        href: ROUTES.TEACHERS.SCHEDULES,
        icon: Clock,
      },
      {
        title: "Evaluaciones",
        href: ROUTES.TEACHERS.EVALUATIONS,
        icon: Award,
      },
    ],
  },
  {
    title: "Cursos",
    href: ROUTES.COURSES.LIST,
    icon: BookOpen,
    subItems: [
      {
        title: "Lista de Cursos",
        href: ROUTES.COURSES.LIST,
        icon: List,
      },
      {
        title: "Nuevo Curso",
        href: ROUTES.COURSES.NEW,
        icon: PlusCircle,
      },
      {
        title: "Materiales",
        href: ROUTES.COURSES.MATERIALS,
        icon: FileText,
      },
      {
        title: "Calificaciones",
        href: ROUTES.COURSES.GRADES,
        icon: Award,
      },
    ],
  },
  {
    title: "Materias",
    href: ROUTES.SUBJECTS.LIST,
    icon: BookOpen,
    subItems: [
      {
        title: "Lista de Materias",
        href: ROUTES.SUBJECTS.LIST,
        icon: List,
      },
      {
        title: "Nueva Materia",
        href: ROUTES.SUBJECTS.NEW,
        icon: PlusCircle,
      },
       {
        title: "Editar Materia",
        href: ROUTES.SUBJECTS.EDIT,
        icon: PlusCircle,
      },
    ],
  },
   {
    title: "Notas",
    href: ROUTES.GRADES.GRADE, // Assuming this is the main route for grades
    icon: BookOpen,
    subItems: [
      {
        title: "Nueva Nota",
        href: ROUTES.GRADES.GRADE,
        icon: List,
      },
      {
        title: "Nueva Asistencia",
        href: ROUTES.GRADES.ASISTENCIA,
        icon: PlusCircle,
      },
       {
        title: "Nueva Participación",
        href: ROUTES. GRADES.PARTICIPACIONES,
        icon: PlusCircle,
      },
    ],
  },
  {
    title: "Calendario",
    href: ROUTES.CALENDAR.MONTHLY,
    icon: Calendar,
    subItems: [
      {
        title: "Vista Mensual",
        href: ROUTES.CALENDAR.MONTHLY,
        icon: CalendarDays,
      },
      {
        title: "Eventos",
        href: ROUTES.CALENDAR.EVENTS,
        icon: Bell,
      },
      {
        title: "Horarios de Clase",
        href: ROUTES.CALENDAR.SCHEDULES,
        icon: Clock,
      },
    ],
  },
  {
    title: "Configuración",
    href: ROUTES.SETTINGS.GENERAL,
    icon: Settings,
    subItems: [
      {
        title: "General",
        href: ROUTES.SETTINGS.GENERAL,
        icon: Cog,
      },
      {
        title: "Usuarios",
        href: ROUTES.SETTINGS.USERS,
        icon: Users,
      },
      {
        title: "Notificaciones",
        href: ROUTES.SETTINGS.NOTIFICATIONS,
        icon: Bell,
      },
    ],
  },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isExpanded = (title: string) => expandedItems.includes(title)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-40 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Abrir menú</span>
      </Button>
      <div
        className={cn("fixed inset-0 z-30 bg-black/50 md:hidden", isOpen ? "block" : "hidden")}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-white transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2">
            <School className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-blue-800">Colegio San Agustín</span>
          </Link>
        </div>
        <div className="absolute right-0 top-4 transform translate-x-1/2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-blue-200 bg-white shadow-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span className="sr-only">Alternar barra lateral</span>
          </Button>
        </div>
        <div className="space-y-2 py-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="px-3 py-2">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.title}>
                  <div
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 cursor-pointer",
                      pathname === item.href ? "bg-blue-100 text-blue-700" : "text-gray-700",
                    )}
                    onClick={() => toggleExpanded(item.title)}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                    {item.subItems && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isExpanded(item.title) ? "rotate-180" : "",
                        )}
                      />
                    )}
                  </div>

                  {/* Subcategorías */}
                  {item.subItems && isExpanded(item.title) && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-100 pl-4">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-700",
                            pathname === subItem.href ? "bg-blue-100 text-blue-700" : "text-gray-600",
                          )}
                        >
                          <subItem.icon className="mr-2 h-3 w-3" />
                          <span>{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
