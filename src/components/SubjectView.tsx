import React, { useState } from "react";
import { SubjectId, UserRole, SchoolGrade, LessonTopic } from "@/types";
import { SUBJECTS } from "@/data/subjects";
import {
  BookOpen,
  Landmark,
  Sparkles,
  ArrowLeft,
  PlusCircle,
  Play,
  Star,
  Clock,
  CheckCircle2,
  FolderOpen,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TeacherCreateModal } from "@/components/TeacherCreateModal";

interface SubjectViewProps {
  subjectId: SubjectId;
  currentRole: UserRole;
  lessons: LessonTopic[];
  onBack: () => void;
  onStartLesson: (lesson: LessonTopic) => void;
  onCreateLesson: (lesson: LessonTopic) => void;
}

export const SubjectView: React.FC<SubjectViewProps> = ({
  subjectId,
  currentRole,
  lessons,
  onBack,
  onStartLesson,
  onCreateLesson,
}) => {
  const subject = SUBJECTS[subjectId];
  const [selectedGrade, setSelectedGrade] = useState<SchoolGrade | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const filteredLessons = lessons
    .filter((l) => l.subjectId === subjectId)
    .filter((l) => (selectedGrade === "all" ? true : l.grade === selectedGrade))
    .filter((l) =>
      searchQuery.trim() === ""
        ? true
        : l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
              <span>Volver a todas las materias</span>
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
              {filteredLessons.length} Temas Disponibles
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

      {/* Main Content Area */}
      <div className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Controls: Search and Grade Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-purple-50">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-purple-400 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Grado:
            </span>
            {(["all", "4to", "5to", "6to"] as const).map((gradeKey) => (
              <button
                key={gradeKey}
                onClick={() => setSelectedGrade(gradeKey)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  selectedGrade === gradeKey
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                }`}
              >
                {gradeKey === "all" ? "Todos los Grados" : `${gradeKey} Primaria`}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300" />
            <input
              type="text"
              placeholder="Buscar en esta materia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-purple-50/60 border border-purple-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 text-purple-800 placeholder:text-purple-300"
            />
          </div>
        </div>

        {/* Interactive Lesson Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons.map((lesson) => {
            return (
              <div
                key={lesson.id}
                className="group p-5 rounded-3xl bg-gradient-to-b from-white to-purple-50/30 border border-purple-100/90 hover:border-pink-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl p-1 bg-pink-50 rounded-2xl group-hover:scale-110 transition-transform">
                      {lesson.icon}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                        {lesson.grade}
                      </span>
                      {lesson.completed && (
                        <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Hecho
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-purple-950 group-hover:text-pink-600 transition-colors line-clamp-2">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 mb-4 line-clamp-2">
                    {lesson.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-purple-50">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-purple-600 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lesson.durationMinutes}m
                    </span>
                    <span className="text-[11px] text-amber-600 font-bold flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> +{lesson.pointsReward}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => onStartLesson(lesson)}
                    className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white text-xs h-8 px-3.5 shadow-sm shadow-pink-200"
                  >
                    <Play className="w-3 h-3 mr-1 fill-white" /> Jugar
                  </Button>
                </div>
              </div>
            );
          })}

          {/* Quick teacher add card */}
          {currentRole !== "student" && (
            <div
              onClick={() => setIsCreateModalOpen(true)}
              className="p-5 rounded-3xl border-2 border-dashed border-purple-200 bg-purple-50/20 hover:bg-pink-50/30 hover:border-pink-300 transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[170px]"
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-2">
                <PlusCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-purple-950">
                Añadir Nueva Lección
              </h4>
              <p className="text-[11px] text-purple-500 mt-0.5 max-w-[170px]">
                Crea preguntas, retos o lecturas para tu clase.
              </p>
            </div>
          )}
        </div>
      </div>

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