import React, { useState } from "react";
import { SubjectId, SchoolGrade, LessonTopic } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Sparkles, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { triggerConfetti } from "@/utils/confetti";

interface TeacherCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubjectId: SubjectId;
  onCreateLesson: (lesson: LessonTopic) => void;
}

export const TeacherCreateModal: React.FC<TeacherCreateModalProps> = ({
  isOpen,
  onClose,
  defaultSubjectId,
  onCreateLesson,
}) => {
  const [subjectId, setSubjectId] = useState<SubjectId>(defaultSubjectId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState<SchoolGrade>("5to");
  const [pointsReward, setPointsReward] = useState("50");
  const [durationMinutes, setDurationMinutes] = useState("15");
  const [icon, setIcon] = useState("📚");
  const [firstQuestion, setFirstQuestion] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [wrongOption1, setWrongOption1] = useState("");
  const [wrongOption2, setWrongOption2] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Por favor completa el título y la descripción.");
      return;
    }

    const newLesson: LessonTopic = {
      id: `custom-${Date.now()}`,
      subjectId,
      title,
      description,
      grade,
      durationMinutes: Number(durationMinutes) || 15,
      pointsReward: Number(pointsReward) || 50,
      icon: icon || "✨",
      difficulty: "Medio",
      completed: false,
      questions: [
        {
          question: firstQuestion || "¿Qué aprendimos hoy en este tema?",
          options: [
            correctOption || "Respuesta correcta y detallada",
            wrongOption1 || "Opción distractora 1",
            wrongOption2 || "Opción distractora 2",
          ],
          correctIndex: 0,
          explanation: "¡Excelente! Has respondido basándote en la lección explicada.",
        },
      ],
    };

    onCreateLesson(newLesson);
    triggerConfetti();
    toast.success("¡Nueva lección publicada con éxito! 🎉", {
      description: `Los estudiantes ya pueden ver "${title}".`,
    });
    onClose();
    // Reset form
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg p-6 rounded-3xl border-purple-100 bg-[#FCFAFF]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <DialogTitle className="text-xl font-extrabold text-purple-950">
              Crear Nueva Lección o Desafío
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-purple-900 block mb-1">Materia</label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value as SubjectId)}
                className="w-full text-xs bg-white border border-purple-200 rounded-xl px-3 py-2 text-purple-900 focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value="lenguaje">Lenguaje</option>
                <option value="historia">Historia Universal</option>
                <option value="matematicas">Matemáticas</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-purple-900 block mb-1">Grado Escolar</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as SchoolGrade)}
                className="w-full text-xs bg-white border border-purple-200 rounded-xl px-3 py-2 text-purple-900 focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value="4to">4to Grado</option>
                <option value="5to">5to Grado</option>
                <option value="6to">6to Grado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-purple-900 block mb-1">Título de la Lección</label>
            <Input
              placeholder="Ej: El Misterio de los Números Primos..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border-purple-200 text-xs bg-white"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-purple-900 block mb-1">Breve Descripción para las niñas</label>
            <Textarea
              placeholder="Explica de forma divertida qué van a descubrir en esta clase..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="rounded-xl border-purple-200 text-xs bg-white resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] font-bold text-purple-900 block mb-1">Emoji Icono</label>
              <Input
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="rounded-xl border-purple-200 text-xs text-center bg-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-purple-900 block mb-1">Duración (min)</label>
              <Input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                className="rounded-xl border-purple-200 text-xs bg-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-purple-900 block mb-1">Estrellas (+pts)</label>
              <Input
                type="number"
                value={pointsReward}
                onChange={(e) => setPointsReward(e.target.value)}
                className="rounded-xl border-purple-200 text-xs bg-white"
              />
            </div>
          </div>

          {/* Mini quiz creator */}
          <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-100 space-y-2">
            <p className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              Pregunta Interactiva Rápida
            </p>
            <Input
              placeholder="¿Cuál es la pregunta de evaluación?"
              value={firstQuestion}
              onChange={(e) => setFirstQuestion(e.target.value)}
              className="rounded-xl border-purple-200 text-xs bg-white"
            />
            <Input
              placeholder="✅ Respuesta Correcta"
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
              className="rounded-xl border-green-200 text-xs bg-green-50/50"
            />
            <Input
              placeholder="❌ Opción Incorrecta 1"
              value={wrongOption1}
              onChange={(e) => setWrongOption1(e.target.value)}
              className="rounded-xl border-purple-200 text-xs bg-white"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="rounded-xl text-xs text-gray-500"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs px-5 shadow-md shadow-pink-200"
            >
              Guardar y Publicar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};