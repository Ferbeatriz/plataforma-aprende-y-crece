import React, { useState } from "react";
import { LessonTopic } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  CheckCircle,
  XCircle,
  HelpCircle,
  Trophy,
  ArrowRight,
  RotateCcw,
  Star,
  PartyPopper,
} from "lucide-react";
import { triggerConfetti } from "@/utils/confetti";
import { toast } from "sonner";

interface ActivityModalProps {
  lesson: LessonTopic | null;
  isOpen: boolean;
  onClose: () => void;
  onLessonComplete: (lessonId: string, points: number) => void;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  lesson,
  isOpen,
  onClose,
  onLessonComplete,
}) => {
  if (!lesson) return null;

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const totalQuestions = lesson.questions.length;
  const currentQuestion = lesson.questions[currentStep];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      triggerConfetti();
      toast.success("¡Respuesta Correcta! 🌟", {
        description: "¡Brillante razonamiento!",
      });
    } else {
      toast.error("¡Casi casi! Intenta revisar la explicación 💡");
    }
  };

  const handleNextQuestion = () => {
    if (currentStep + 1 < totalQuestions) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      triggerConfetti();
      onLessonComplete(lesson.id, lesson.pointsReward);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  const progressPercent = totalQuestions > 0 ? ((currentStep + 1) / totalQuestions) * 100 : 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-3xl border-pink-200 bg-[#FCFAFF]">
        {/* Top colorful gradient banner */}
        <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 p-6 text-white relative">
          <div className="flex items-center justify-between">
            <span className="text-3xl">{lesson.icon}</span>
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>+{lesson.pointsReward} Estrellas</span>
            </div>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-black mt-2 text-white drop-shadow-sm">
            {lesson.title}
          </DialogTitle>
          <p className="text-xs text-purple-100 mt-1 max-w-md">
            {lesson.description}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isFinished ? (
            <div className="space-y-6">
              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-purple-600">
                  <span>Pregunta {currentStep + 1} de {totalQuestions}</span>
                  <span>{Math.round(progressPercent)}% Completado</span>
                </div>
                <Progress value={progressPercent} className="h-2.5 bg-purple-100" />
              </div>

              {/* Question container */}
              <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                <p className="text-sm sm:text-base font-bold text-purple-950 flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink-100 text-pink-700 text-xs shrink-0 font-extrabold mt-0.5">
                    ?
                  </span>
                  {currentQuestion.question}
                </p>

                {/* Options List */}
                <div className="space-y-2.5 mt-4">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQuestion.correctIndex;
                    let styleClass = "bg-purple-50/60 hover:bg-pink-50 border-purple-100 text-purple-900";

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        styleClass = "bg-green-50 border-green-300 text-green-800 font-semibold ring-2 ring-green-400";
                      } else if (isSelected && !isCorrect) {
                        styleClass = "bg-red-50 border-red-300 text-red-800 ring-2 ring-red-300";
                      } else {
                        styleClass = "opacity-50 bg-gray-50 border-gray-100 text-gray-400";
                      }
                    } else if (isSelected) {
                      styleClass = "bg-pink-100/80 border-pink-400 text-pink-900 font-semibold ring-2 ring-pink-300";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between text-xs sm:text-sm ${styleClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-xl bg-white/80 border border-purple-100 flex items-center justify-center text-xs font-bold text-purple-700 shadow-2xs">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>
                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback Explanation */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/70 text-indigo-900 text-xs sm:text-sm animate-in fade-in zoom-in-95">
                  <p className="font-bold flex items-center gap-1.5 text-indigo-800 mb-1">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    Explicación Mágica:
                  </p>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                {!isAnswerSubmitted ? (
                  <Button
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-6 py-2.5 shadow-md shadow-pink-200 hover:opacity-95"
                  >
                    Comprobar Respuesta
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2.5 shadow-md shadow-purple-200 flex items-center gap-2"
                  >
                    <span>{currentStep + 1 < totalQuestions ? "Siguiente Pregunta" : "Ver Resultados"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-5 animate-in zoom-in-90 duration-300">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-300 via-pink-300 to-purple-300 p-1 shadow-lg shadow-pink-200">
                <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center text-4xl">
                  🏆
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-purple-950">
                  ¡Misión Completada, Campeona!
                </h3>
                <p className="text-sm text-purple-600 mt-1">
                  Has acertado {score} de {totalQuestions} preguntas.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
                  <p className="text-[11px] text-amber-700 font-bold uppercase">Puntos Ganados</p>
                  <p className="text-xl font-extrabold text-amber-900">+{lesson.pointsReward} ⭐</p>
                </div>
                <div className="bg-pink-50 p-3 rounded-2xl border border-pink-200">
                  <p className="text-[11px] text-pink-700 font-bold uppercase">Precisión</p>
                  <p className="text-xl font-extrabold text-pink-900">
                    {Math.round((score / totalQuestions) * 100)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="rounded-2xl border-purple-200 text-purple-700 hover:bg-purple-50 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" /> Repetir
                </Button>
                <Button
                  onClick={onClose}
                  className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-6 shadow-md shadow-pink-200"
                >
                  ¡Genial, Guardar! ✨
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};