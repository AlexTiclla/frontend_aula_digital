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

// Estructura de datos con subcategorías
const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart,
    subItems: [
      {
        title: "Resumen General",
        href: "/dashboard/resumen",
        icon: TrendingUp,
      },
      {
        title: "Estadísticas",
        href: "/dashboard/estadisticas",
        icon: BarChart,
      },
    ],
  },
  {
    title: "Estudiantes",
    href: "/dashboard/estudiantes",
    icon: Users,
    subItems: [
      {
        title: "Lista de Estudiantes",
        href: "/dashboard/estudiantes/lista",
        icon: List,
      },
      {
        title: "Nuevo Estudiante",
        href: "/dashboard/estudiantes/nuevo",
        icon: UserPlus,
      },
      {
        title: "Asistencias",
        href: "/dashboard/estudiantes/asistencias",
        icon: UserCheck,
      },
      {
        title: "Estudiantes Inactivos",
        href: "/dashboard/estudiantes/inactivos",
        icon: UserX,
      },
    ],
  },
  {
    title: "Profesores",
    href: "/dashboard/profesores",
    icon: GraduationCap,
    subItems: [
      {
        title: "Lista de Profesores",
        href: "/dashboard/profesores/lista",
        icon: List,
      },
      {
        title: "Nuevo Profesor",
        href: "/dashboard/profesores/nuevo",
        icon: UserPlus,
      },
      {
        title: "Horarios",
        href: "/dashboard/profesores/horarios",
        icon: Clock,
      },
      {
        title: "Evaluaciones",
        href: "/dashboard/profesores/evaluaciones",
        icon: Award,
      },
    ],
  },
  {
    title: "Cursos",
    href: "/dashboard/cursos",
    icon: BookOpen,
    subItems: [
      {
        title: "Lista de Cursos",
        href: "/dashboard/cursos/lista",
        icon: List,
      },
      {
        title: "Nuevo Curso",
        href: "/dashboard/cursos/nuevo",
        icon: PlusCircle,
      },
      {
        title: "Materiales",
        href: "/dashboard/cursos/materiales",
        icon: FileText,
      },
      {
        title: "Calificaciones",
        href: "/dashboard/cursos/calificaciones",
        icon: Award,
      },
    ],
  },
  {
    title: "Calendario",
    href: "/dashboard/calendario",
    icon: Calendar,
    subItems: [
      {
        title: "Vista Mensual",
        href: "/dashboard/calendario/mensual",
        icon: CalendarDays,
      },
      {
        title: "Eventos",
        href: "/dashboard/calendario/eventos",
        icon: Bell,
      },
      {
        title: "Horarios de Clase",
        href: "/dashboard/calendario/horarios",
        icon: Clock,
      },
    ],
  },
  {
    title: "Configuración",
    href: "/dashboard/configuracion",
    icon: Settings,
    subItems: [
      {
        title: "General",
        href: "/dashboard/configuracion/general",
        icon: Cog,
      },
      {
        title: "Usuarios",
        href: "/dashboard/configuracion/usuarios",
        icon: Users,
      },
      {
        title: "Notificaciones",
        href: "/dashboard/configuracion/notificaciones",
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
          <Link href="/dashboard" className="flex items-center gap-2">
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
