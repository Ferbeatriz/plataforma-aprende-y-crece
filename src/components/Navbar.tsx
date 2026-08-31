import React from "react";
import { UserRole } from "@/types";
import {
  Sparkles,
  Star,
  Bell,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  ChevronDown,
  Search,
  Heart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  onNavigateHome,
}) => {
  const roleLabels: Record<
    UserRole,
    { title: string; badge: string; color: string; icon: React.ElementType }
  > = {
    student: {
      title: "Estudiante",
      badge: "Nivel 4 🌟",
      color: "bg-pink-100 text-pink-700 border-pink-200",
      icon: GraduationCap,
    },
    teacher: {
      title: "Profesora",
      badge: "Guía Educativa 📚",
      color: "bg-purple-100 text-purple-700 border-purple-200",
      icon: Briefcase,
    },
    admin: {
      title: "Administradora",
      badge: "Supervisora ⚙️",
      color: "bg-teal-100 text-teal-700 border-teal-200",
      icon: ShieldCheck,
    },
  };

  const handleRoleSelect = (role: UserRole) => {
    onRoleChange(role);
    toast.success(`Rol cambiado a: ${roleLabels[role].title}`, {
      description: "La vista y las herramientas se han actualizado.",
    });
  };

  const triggerCelebrate = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.2 },
      colors: ["#F472B6", "#C084FC", "#67E8F9", "#FDE047"],
    });
    toast("¡Puntos de recompensa activos!", {
      description: "¡Has ganado 15 estrellas de sabiduría hoy! ✨",
    });
  };

  const activeRoleData = roleLabels[currentRole];
  const CurrentIcon = activeRoleData.icon;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-pink-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={onNavigateHome}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 flex items-center justify-center shadow-md shadow-pink-200 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
                EduSphere
              </span>
              <span className="text-xs bg-pink-100 text-pink-700 font-semibold px-2 py-0.5 rounded-full">
                Kids
              </span>
            </div>
            <p className="text-[10px] text-purple-400 font-medium hidden sm:block">
              Aprende, Sueña y Descubre ✨
            </p>
          </div>
        </div>

        {/* Search bar simulation */}
        <div className="hidden md:flex flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300" />
            <input
              type="text"
              placeholder="Buscar lecciones, historias o juegos..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-purple-50/60 border border-purple-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder:text-purple-300 text-purple-800 transition-all"
            />
          </div>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Star counter for student */}
          <button
            onClick={triggerCelebrate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs sm:text-sm font-bold hover:bg-amber-100 transition-all shadow-sm"
            title="¡Haz clic para celebrar tus puntos!"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-500 animate-bounce" />
            <span>340</span>
            <span className="hidden sm:inline text-amber-500 text-xs">pts</span>
          </button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full text-purple-600 hover:bg-purple-50 hover:text-purple-800"
            onClick={() => toast("Tienes 2 nuevas actividades pendientes 🌸")}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white"></span>
          </Button>

          {/* Role Switcher dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`rounded-2xl border ${activeRoleData.color} font-medium text-xs sm:text-sm px-3 py-1.5 h-auto flex items-center gap-1.5 shadow-sm transition-all hover:opacity-90`}
              >
                <CurrentIcon className="w-4 h-4" />
                <span className="font-semibold">{activeRoleData.title}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 bg-white/95 backdrop-blur-md border-pink-100 shadow-xl">
              <DropdownMenuLabel className="text-xs text-purple-600 font-semibold px-2 py-1">
                Cambiar Rol Simulado
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-purple-50" />
              <DropdownMenuItem
                onClick={() => handleRoleSelect("student")}
                className={`rounded-xl cursor-pointer py-2 px-2.5 flex items-center gap-2.5 ${
                  currentRole === "student" ? "bg-pink-50 text-pink-700 font-semibold" : "text-gray-600"
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold">Estudiante</p>
                  <p className="text-[10px] text-gray-500">Vista de aprendizaje interactivo</p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleRoleSelect("teacher")}
                className={`rounded-xl cursor-pointer py-2 px-2.5 flex items-center gap-2.5 ${
                  currentRole === "teacher" ? "bg-purple-50 text-purple-700 font-semibold" : "text-gray-600"
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold">Profesor/a</p>
                  <p className="text-[10px] text-gray-500">Gestión de temas y tareas</p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleRoleSelect("admin")}
                className={`rounded-xl cursor-pointer py-2 px-2.5 flex items-center gap-2.5 ${
                  currentRole === "admin" ? "bg-teal-50 text-teal-700 font-semibold" : "text-gray-600"
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold">Administrador</p>
                  <p className="text-[10px] text-gray-500">Control global y usuarios</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-1">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-300 via-pink-300 to-purple-300 p-0.5 shadow-sm">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <span className="text-sm font-bold text-pink-600">🌸</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};