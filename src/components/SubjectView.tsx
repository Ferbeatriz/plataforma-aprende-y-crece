import React from "react";
import { SubjectId, UserRole } from "@/types";
import { SUBJECTS } from "@/data/subjects";
import {
  BookOpen,
  Landmark,
  Sparkles,
  ArrowLeft,
  PlusCircle,
  Play,
  FileText,
  Star,
  Clock,
  CheckCircle2,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface SubjectViewProps {
  subjectId: SubjectId;
  currentRole: UserRole;
  onBack: () => void;
}

export const SubjectView: React.FC<SubjectViewProps> = ({
  subjectId,
  currentRole,
  onBack,
}) => {
  const subject = SUBJECTS[subjectId];

  const getSubjectIcon = () => {
    switch (subjectId) {
      case "lenguaje":
        return <BookOpen className="w-8 h-8 text-pink-600" />;
      case "historia":
        return <Landmark className="w-8 h-8 text-amber-700" />;
      case "matematicas":
        return <Sparkles className="w-8 h-8 text-indigo-600" />;
    }
  };

  const handleStartActivity = (title: string) => {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 },
    });
    toast.success(`Iniciando actividad: "${title}"`, {
      description: "¡Diviértete mientras sumas puntos mágicos!",
    });
  };

  const handleAddTopic = () => {
    toast.info("Función de creación docente", {
      description: `Creando nuevo módulo para ${subject.name}`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r ${subject.colorScheme.gradient} shadow-lg text-white`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-xs font-semibold transition-all mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a todas las materias</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                {getSubjectIcon()}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold drop-shadow-sm">
                  {subject.name}
                </h1>
                <p className="text-sm text-white/90 font-medium">
                  {subject.subtitle}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl pt-1">
              {subject.description}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <span className="px-3.5 py-1.5 rounded-full bg-white/25 backdrop-blur-md text-xs font-bold border border-white/30">
              {subject.topicsCount} Temas Disponibles
            </span>
            {currentRole !== "student" && (
              <Button
                onClick={handleAddTopic}
                className="bg-white text-purple-800 hover:bg-white/90 rounded-2xl font-bold text-xs shadow-md"
              >
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Nuevo Contenido
              </Button>
            )}
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute -right-8 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute left-1/2 -top-12 w-32 h-32 bg-white/10 rounded-full blur-lg pointer-events-none" />
      </div>

      {/* Main Content Area - Empty & Ready State */}
      <div className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-purple-50">
          <div>
            <h2 className="text-lg font-bold text-purple-950 flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-pink-500" />
              Módulos y Lecciones de {subject.name}
            </h2>
            <p className="text-xs text-gray-500">
              Explora las lecciones diseñadas para tu grado
            </p>
          </div>
          <Badge variant="outline" className={`${subject.colorScheme.badgeBg} border-none font-semibold px-3 py-1 rounded-full text-xs`}>
            {currentRole === "student" ? "Modo Alumna" : "Gestión"}
          </Badge>
        </div>

        {/* Interactive Lesson Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="group p-5 rounded-2xl bg-gradient-to-b from-white to-purple-50/40 border border-purple-100/80 hover:border-pink-300 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">🌱</span>
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Listo
              </span>
            </div>
            <h3 className="font-bold text-sm text-purple-950 group-hover:text-pink-600 transition-colors">
              {subjectId === "lenguaje" && "1. El Secreto de las Fábulas"}
              {subjectId === "historia" && "1. Misterios del Antiguo Egipto"}
              {subjectId === "matematicas" && "1. Aventura con Fracciones"}
            </h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              {subjectId === "lenguaje" && "Aprende la moraleja y los personajes mágicos."}
              {subjectId === "historia" && "Pirámides, faraones y jeroglíficos divertidos."}
              {subjectId === "matematicas" && "Pizzas mágicas y partes iguales en el laboratorio."}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-purple-50">
              <span className="text-[11px] text-purple-600 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> 15 min
              </span>
              <Button
                size="sm"
                onClick={() => handleStartActivity("Módulo 1")}
                className="rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs h-7 px-3 shadow-sm"
              >
                <Play className="w-3 h-3 mr-1 fill-white" /> Empezar
              </Button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group p-5 rounded-2xl bg-gradient-to-b from-white to-purple-50/40 border border-purple-100/80 hover:border-pink-300 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">⭐</span>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400" /> +50 pts
              </span>
            </div>
            <h3 className="font-bold text-sm text-purple-950 group-hover:text-pink-600 transition-colors">
              {subjectId === "lenguaje" && "2. Palabras y Acentos Mágicos"}
              {subjectId === "historia" && "2. Los Castillos y la Época Medieval"}
              {subjectId === "matematicas" && "2. Desafío de Multiplicación Veloz"}
            </h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              {subjectId === "lenguaje" && "Descubre las sílabas tónicas y agudas."}
              {subjectId === "historia" && "Caballeros, reinas y grandes inventos."}
              {subjectId === "matematicas" && "Tablas rápidas con minijuegos interactivos."}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-purple-50">
              <span className="text-[11px] text-purple-600 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> 20 min
              </span>
              <Button
                size="sm"
                onClick={() => handleStartActivity("Módulo 2")}
                className="rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs h-7 px-3 shadow-sm"
              >
                <Play className="w-3 h-3 mr-1 fill-white" /> Empezar
              </Button>
            </div>
          </div>

          {/* Empty Space / Next upcoming card */}
          <div className="p-5 rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/30 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 mb-2">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <h4 className="font-bold text-xs text-purple-900">
              Próximo Tema en Preparación
            </h4>
            <p className="text-[11px] text-purple-600/80 mt-1 max-w-[180px]">
              Nuevas lecciones interactivas se desbloquearán pronto.
            </p>
            {currentRole !== "student" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddTopic}
                className="mt-3 text-xs text-purple-700 hover:bg-purple-100 rounded-xl"
              >
                + Añadir lección
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};