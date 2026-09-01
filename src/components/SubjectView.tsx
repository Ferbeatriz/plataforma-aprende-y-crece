import React, { useState } from "react";
import { SubjectId, UserRole, SchoolGrade, LessonTopic } from "@/types";
import { SUBJECTS } from "@/data/subjects";
import {
  BookOpen,
  Landmark,
  Sparkles,
  ArrowLeft,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeacherCreateModal } from "@/components/TeacherCreateModal";
import { LenguajeModuleView } from "@/components/LenguajeModuleView";
import { HistoriaModuleView } from "@/components/HistoriaModuleView";
import { MatematicasModuleView } from "@/components/MatematicasModuleView";

interface SubjectViewProps {
  subjectId: SubjectId;
  currentRole: UserRole;
  lessons: LessonTopic[];
  onBack: () => void;
  onStartLesson: (lesson: LessonTopic) => void;
  onCreateLesson: (lesson: LessonTopic) => void;
  onEarnStars?: (stars: number) => void;
}

export const SubjectView: React.FC<SubjectViewProps> = ({
  subjectId,
  currentRole,
  lessons,
  onBack,
  onStartLesson,
  onCreateLesson,
  onEarnStars,
}) => {
  const subject = SUBJECTS[subjectId];
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

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
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-xs font-semibold transition-all mb-2 text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al panel general</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                {getSubjectIcon()}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black drop-shadow-sm">
                  {subject.name}
                </h1>
                <p className="text-sm text-white/95 font-medium">
                  {subject.subtitle}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/85 max-w-xl pt-1">
              {subject.description}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <span className="px-3.5 py-1.5 rounded-full bg-white/25 backdrop-blur-md text-xs font-bold border border-white/30">
              {subjectId === "lenguaje"
                ? "Módulo Integral Activo"
                : subjectId === "historia"
                ? "Egipto, Grecia y Roma"
                : "Propiedades & Carrera Activo"}
            </span>
            {currentRole !== "student" && (
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-white text-purple-900 hover:bg-white/90 rounded-2xl font-bold text-xs shadow-md border border-white/50"
              >
                <PlusCircle className="w-4 h-4 mr-1.5 text-pink-600" />
                Nueva Lección
              </Button>
            )}
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute -right-8 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute left-1/2 -top-12 w-32 h-32 bg-white/10 rounded-full blur-lg pointer-events-none" />
      </div>

      {/* Render Specialized Interactive Modules */}
      {subjectId === "lenguaje" ? (
        <LenguajeModuleView onEarnStars={onEarnStars} />
      ) : subjectId === "historia" ? (
        <HistoriaModuleView onEarnStars={onEarnStars} />
      ) : (
        <MatematicasModuleView onEarnStars={onEarnStars} />
      )}

      {/* Teacher Create Modal */}
      <TeacherCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        defaultSubjectId={subjectId}
        onCreateLesson={onCreateLesson}
      />
    </div>
  );
};