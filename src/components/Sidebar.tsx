import React from "react";
import { SubjectId, UserRole } from "@/types";
import {
  BookOpen,
  Landmark,
  Sparkles,
  LayoutDashboard,
  Compass,
  Trophy,
  Heart,
} from "lucide-react";
import { SUBJECTS } from "@/data/subjects";

export type ActiveView = "dashboard" | "subject" | "achievements" | "curiosities";

interface SidebarProps {
  selectedSubject: SubjectId | null;
  activeView: ActiveView;
  onSelectSubject: (id: SubjectId) => void;
  onNavigateHome: () => void;
  onOpenAchievements: () => void;
  onOpenCuriosities: () => void;
  currentRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedSubject,
  activeView,
  onSelectSubject,
  onNavigateHome,
  onOpenAchievements,
  onOpenCuriosities,
  currentRole,
}) => {
  const navItems = [
    {
      id: "lenguaje" as SubjectId,
      name: SUBJECTS.lenguaje.name,
      icon: BookOpen,
      badge: "6 temas",
      colorClasses: {
        active: "bg-pink-100 text-pink-700 shadow-sm border border-pink-200 font-bold",
        idle: "text-purple-900/80 hover:bg-pink-50/80 hover:text-pink-600",
        iconBg: "bg-pink-200 text-pink-700",
      },
    },
    {
      id: "historia" as SubjectId,
      name: SUBJECTS.historia.name,
      icon: Landmark,
      badge: "8 temas",
      colorClasses: {
        active: "bg-amber-100 text-amber-800 shadow-sm border border-amber-200 font-bold",
        idle: "text-purple-900/80 hover:bg-amber-50/80 hover:text-amber-700",
        iconBg: "bg-amber-200 text-amber-800",
      },
    },
    {
      id: "matematicas" as SubjectId,
      name: SUBJECTS.matematicas.name,
      icon: Sparkles,
      badge: "7 temas",
      colorClasses: {
        active: "bg-indigo-100 text-indigo-700 shadow-sm border border-indigo-200 font-bold",
        idle: "text-purple-900/80 hover:bg-indigo-50/80 hover:text-indigo-600",
        iconBg: "bg-indigo-200 text-indigo-700",
      },
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-white/70 backdrop-blur-md border-r border-pink-100 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Main Home Button */}
        <div>
          <button
            onClick={onNavigateHome}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
              activeView === "dashboard"
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md shadow-pink-200 font-bold"
                : "text-purple-900/80 hover:bg-purple-50 hover:text-purple-600"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Inicio / Panel</span>
          </button>
        </div>

        {/* Subjects Section */}
        <div>
          <div className="px-3 pb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
              Mis Asignaturas
            </span>
            <span className="text-[10px] bg-purple-100 text-purple-700 font-medium px-2 py-0.5 rounded-full">
              3 Áreas
            </span>
          </div>

          <div className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeView === "subject" && selectedSubject === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSubject(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium transition-all group duration-200 ${
                    isSelected ? item.colorClasses.active : item.colorClasses.idle
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isSelected ? item.colorClasses.iconBg : "bg-purple-100/60 text-purple-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-left font-semibold">{item.name}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isSelected
                        ? "bg-white/80"
                        : "bg-gray-100 text-gray-500 group-hover:bg-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Links / Extras */}
        <div>
          <div className="px-3 pb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
              Exploración
            </span>
          </div>
          <div className="space-y-1">
            <button
              onClick={onOpenAchievements}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                activeView === "achievements"
                  ? "bg-amber-100 text-amber-800 border border-amber-200 shadow-sm"
                  : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Logros y Medallas</span>
            </button>

            <button
              onClick={onOpenCuriosities}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                activeView === "curiosities"
                  ? "bg-purple-100 text-purple-800 border border-purple-200 shadow-sm"
                  : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
              }`}
            >
              <Compass className="w-4 h-4 text-purple-500" />
              <span>Club de Curiosidades</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role banner helper on footer of sidebar */}
      <div className="pt-4 border-t border-purple-100/60 mt-6">
        <div className="bg-gradient-to-br from-pink-100/80 via-purple-100/70 to-indigo-100/80 rounded-2xl p-3.5 text-center border border-pink-200/50">
          <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white shadow-sm mb-1.5">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-400" />
          </div>
          <p className="text-xs font-bold text-purple-900">
            {currentRole === "student" && "¡Hoy es un gran día para aprender!"}
            {currentRole === "teacher" && "Modo Docente Activado"}
            {currentRole === "admin" && "Modo Administrador"}
          </p>
          <p className="text-[10px] text-purple-600 mt-0.5">
            EduSphere v1.0 • Seguro y Divertido
          </p>
        </div>
      </div>
    </aside>
  );
};