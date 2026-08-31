import React from "react";
import { SubjectId, UserRole } from "@/types";
import { SUBJECTS } from "@/data/subjects";
import {
  Sparkles,
  BookOpen,
  Landmark,
  Award,
  Calendar,
  Flame,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { triggerConfetti } from "@/utils/confetti";

interface DashboardHomeProps {
  currentRole: UserRole;
  onSelectSubject: (id: SubjectId) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  currentRole,
  onSelectSubject,
}) => {
  const getGreeting = () => {
    switch (currentRole) {
      case "student":
        return {
          title: "¡Hola, Sofía! 🌸",
          subtitle: "¿Qué emocionante aventura aprenderemos hoy?",
          badge: "Nivel 4 Exploradora",
        };
      case "teacher":
        return {
          title: "¡Bienvenida, Profesora Elena! 📚",
          subtitle: "Gestiona tus materias y revisa el progreso de tu clase.",
          badge: "Docente Activa",
        };
      case "admin":
        return {
          title: "Panel de Administración ⚙️",
          subtitle: "Supervisión institucional, roles y configuración de EduSphere.",
          badge: "Control Total",
        };
    }
  };

  const greeting = getGreeting();

  const handleCheer = () => {
    triggerConfetti();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              {greeting.badge}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {greeting.title}
            </h1>
            <p className="text-sm sm:text-base text-purple-100 max-w-lg font-medium">
              {greeting.subtitle}
            </p>
          </div>

          {/* Daily streak widget */}
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/30 shadow-inner">
            <div className="w-10 h-10 rounded-xl bg-amber-400/90 flex items-center justify-center text-white shadow-sm">
              <Flame className="w-6 h-6 fill-amber-300 text-white animate-pulse" />
            </div>
            <div>
              <p className="text-xs text-purple-100 font-medium">Racha de estudio</p>
              <p className="text-lg font-extrabold leading-tight">5 Días seguidos 🔥</p>
            </div>
          </div>
        </div>

        {/* Floating circles decoration */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 3 Main Subject Cards */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h2 className="text-xl font-bold text-purple-950">
              Tus Asignaturas Principales
            </h2>
            <p className="text-xs text-purple-500">
              Selecciona una materia para ver sus temas y actividades
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Lenguaje */}
          <div
            onClick={() => onSelectSubject("lenguaje")}
            className="group relative rounded-3xl p-6 bg-gradient-to-br from-pink-50 via-white to-pink-50/50 border border-pink-200/80 hover:border-pink-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full">
                  6 Temas
                </span>
              </div>
              <h3 className="text-lg font-bold text-purple-950 group-hover:text-pink-600 transition-colors">
                Lenguaje
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {SUBJECTS.lenguaje.description}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-pink-100 flex items-center justify-between text-xs font-bold text-pink-600">
              <span>Abrir materia</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Historia Universal */}
          <div
            onClick={() => onSelectSubject("historia")}
            className="group relative rounded-3xl p-6 bg-gradient-to-br from-amber-50 via-white to-amber-50/50 border border-amber-200/80 hover:border-amber-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Landmark className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                  8 Temas
                </span>
              </div>
              <h3 className="text-lg font-bold text-purple-950 group-hover:text-amber-700 transition-colors">
                Historia Universal
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {SUBJECTS.historia.description}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>Abrir materia</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Matemáticas */}
          <div
            onClick={() => onSelectSubject("matematicas")}
            className="group relative rounded-3xl p-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50/50 border border-indigo-200/80 hover:border-indigo-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">
                  7 Temas
                </span>
              </div>
              <h3 className="text-lg font-bold text-purple-950 group-hover:text-indigo-600 transition-colors">
                Matemáticas
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {SUBJECTS.matematicas.description}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-indigo-100 flex items-center justify-between text-xs font-bold text-indigo-700">
              <span>Abrir materia</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Lower Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center text-white shrink-0 shadow-md shadow-pink-200">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-purple-950">
              Medalla de la Semana: "Lectora Estrella"
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Completa 2 lecciones más para desbloquear el trofeo brillante.
            </p>
          </div>
          <Button
            size="sm"
            onClick={handleCheer}
            className="ml-auto rounded-xl bg-pink-100 text-pink-700 hover:bg-pink-200 border-none font-bold text-xs"
          >
            🎉 Celebrar
          </Button>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-400 to-indigo-400 flex items-center justify-center text-white shrink-0 shadow-md shadow-purple-200">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-purple-950">
              Próximo Desafío En Vivo
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Viernes 4:00 PM • Trivia Mágica de Historia y Números.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};