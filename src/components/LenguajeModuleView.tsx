import React, { useState } from "react";
import {
  LENGUAJE_THEORY,
  MULTIPLE_CHOICE_QUESTIONS,
  TRUE_FALSE_QUESTIONS,
  WRITTEN_PROMPTS,
} from "@/data/lenguajeModuleData";
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Award,
  ArrowRight,
  RotateCcw,
  Star,
  Quote,
  Feather,
  Check,
  AlertCircle,
  Lightbulb,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { triggerConfetti } from "@/utils/confetti";
import { toast } from "sonner";

interface LenguajeModuleViewProps {
  onEarnStars?: (stars: number) => void;
}

type SectionTab = "theory" | "multiple-choice" | "true-false" | "written-response";

export const LenguajeModuleView: React.FC<LenguajeModuleViewProps> = ({
  onEarnStars,
}) => {
  const [activeTab, setActiveTab] = useState<SectionTab>("theory");

  // --- SELECTION MULTIPLE STATE ---
  const [mcSelected, setMcSelected] = useState<Record<number, number>>({});
  const [mcSubmitted, setMcSubmitted] = useState<Record<number, boolean>>({});
  const [mcCompletedAll, setMcCompletedAll] = useState(false);

  // --- TRUE/FALSE STATE ---
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean | null>>({});
  const [tfJustifications, setTfJustifications] = useState<Record<number, string>>({});
  const [tfSubmitted, setTfSubmitted] = useState<Record<number, boolean>>({});
  const [tfErrors, setTfErrors] = useState<Record<number, string>>({});
  const [tfCompletedAll, setTfCompletedAll] = useState(false);

  // --- WRITTEN RESPONSES STATE ---
  const [writtenAnswers, setWrittenAnswers] = useState<Record<number, string>>({});
  const [writtenFeedback, setWrittenFeedback] = useState<
    Record<
      number,
      {
        evaluated: boolean;
        passed: boolean;
        wordCount: number;
        matchedKeywords: string[];
        missingConcepts: string[];
        teacherComment: string;
      }
    >
  >({});

  // -------------------------------------------------------------
  // Multiple Choice Handlers
  // -------------------------------------------------------------
  const handleSelectMC = (questionId: number, optionIdx: number) => {
    if (mcSubmitted[questionId]) return;
    setMcSelected((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleVerifyMC = (questionId: number) => {
    if (mcSelected[questionId] === undefined) {
      toast.error("Por favor selecciona una opción antes de verificar.");
      return;
    }
    const q = MULTIPLE_CHOICE_QUESTIONS.find((item) => item.id === questionId);
    if (!q) return;

    setMcSubmitted((prev) => ({ ...prev, [questionId]: true }));
    const isCorrect = mcSelected[questionId] === q.correctIndex;

    if (isCorrect) {
      triggerConfetti();
      toast.success("¡Respuesta Correcta! ✨", {
        description: q.explanation,
      });
      if (onEarnStars) onEarnStars(10);
    } else {
      toast.error("¡Respuesta incorrecta!", {
        description: "Revisa la explicación para aprender el concepto.",
      });
    }

    // Check if all 10 are submitted
    const newSubmitted = { ...mcSubmitted, [questionId]: true };
    if (Object.keys(newSubmitted).length === MULTIPLE_CHOICE_QUESTIONS.length) {
      setMcCompletedAll(true);
    }
  };

  const resetMC = () => {
    setMcSelected({});
    setMcSubmitted({});
    setMcCompletedAll(false);
    toast.info("Evaluación de selección múltiple reiniciada.");
  };

  const mcCorrectCount = MULTIPLE_CHOICE_QUESTIONS.filter(
    (q) => mcSubmitted[q.id] && mcSelected[q.id] === q.correctIndex
  ).length;

  // -------------------------------------------------------------
  // True / False Handlers
  // -------------------------------------------------------------
  const handleSelectTF = (id: number, value: boolean) => {
    if (tfSubmitted[id]) return;
    setTfAnswers((prev) => ({ ...prev, [id]: value }));
    setTfErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleJustificationChange = (id: number, text: string) => {
    setTfJustifications((prev) => ({ ...prev, [id]: text }));
    if (tfErrors[id]) {
      setTfErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleVerifyTF = (id: number) => {
    const selectedVal = tfAnswers[id];
    if (selectedVal === undefined || selectedVal === null) {
      toast.error("Debes elegir si el enunciado es Verdadero (V) o Falso (F).");
      return;
    }

    const item = TRUE_FALSE_QUESTIONS.find((q) => q.id === id);
    if (!item) return;

    // Strict validation: if False is selected, justification is mandatory
    if (selectedVal === false) {
      const justText = (tfJustifications[id] || "").trim();
      if (justText.length < 8) {
        setTfErrors((prev) => ({
          ...prev,
          [id]: "⚠️ Al marcar Falso, es obligatorio escribir una justificación clara de al menos 8 caracteres explicando por qué.",
        }));
        toast.error("¡Falta la justificación obligatoria para tu respuesta Falsa!");
        return;
      }
    }

    setTfSubmitted((prev) => ({ ...prev, [id]: true }));
    const isAnswerCorrect = selectedVal === item.isTrue;

    if (isAnswerCorrect) {
      triggerConfetti();
      toast.success("¡Excelente deducción! 🌟", {
        description: item.explanation,
      });
      if (onEarnStars) onEarnStars(10);
    } else {
      toast.error("Respuesta no acertada", {
        description: item.explanation,
      });
    }

    const newSubmitted = { ...tfSubmitted, [id]: true };
    if (Object.keys(newSubmitted).length === TRUE_FALSE_QUESTIONS.length) {
      setTfCompletedAll(true);
    }
  };

  const resetTF = () => {
    setTfAnswers({});
    setTfJustifications({});
    setTfSubmitted({});
    setTfErrors({});
    setTfCompletedAll(false);
    toast.info("Evaluación de Verdadero o Falso reiniciada.");
  };

  const tfCorrectCount = TRUE_FALSE_QUESTIONS.filter(
    (q) => tfSubmitted[q.id] && tfAnswers[q.id] === q.isTrue
  ).length;

  // -------------------------------------------------------------
  // Written Responses (Strict Teacher Logic)
  // -------------------------------------------------------------
  const handleEvaluateWritten = (promptItem: (typeof WRITTEN_PROMPTS)[0]) => {
    const userText = (writtenAnswers[promptItem.id] || "").trim();
    const cleanLower = userText.toLowerCase();

    const words = userText.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    if (wordCount < promptItem.minimumWords) {
      toast.error(`Respuesta demasiado breve (${wordCount}/${promptItem.minimumWords} palabras)`, {
        description: `La profesora solicita que desarrolles tu idea con al menos ${promptItem.minimumWords} palabras para que tu argumento sea completo.`,
      });
      setWrittenFeedback((prev) => ({
        ...prev,
        [promptItem.id]: {
          evaluated: true,
          passed: false,
          wordCount,
          matchedKeywords: [],
          missingConcepts: ["Extensión mínima requerida"],
          teacherComment: `⚠️ Tu respuesta tiene solo ${wordCount} palabras. Por favor amplía tu explicación usando vocabulario formal de la lección para alcanzar el mínimo de ${promptItem.minimumWords} palabras.`,
        },
      }));
      return;
    }

    // Check keyword groups
    const matchedKeywords: string[] = [];
    const missingConcepts: string[] = [];
    let matchedGroupsCount = 0;

    promptItem.requiredKeywords.forEach((group, index) => {
      const match = group.find((kw) => cleanLower.includes(kw.toLowerCase()));
      if (match) {
        matchedKeywords.push(match);
        matchedGroupsCount++;
      } else {
        missingConcepts.push(`Concepto clave ${index + 1} (ej: "${group[0]}")`);
      }
    });

    const passed = matchedGroupsCount >= Math.ceil(promptItem.requiredKeywords.length * 0.7);

    let teacherComment = "";
    if (passed) {
      triggerConfetti();
      teacherComment = `🎓 ¡Excelente análisis! Has integrado conceptos clave fundamentales (${matchedKeywords.join(
        ", "
      )}) demostrando una comprensión profunda y rigurosa del texto narrativo. ¡Sigue brillando así! 🌟`;
      toast.success("¡Evaluación aprobada con distinción docente! 🌸");
      if (onEarnStars) onEarnStars(25);
    } else {
      teacherComment = `✍️ Sugerencia de la Profesora: Tu redacción es fluida, pero necesitas enriquecerla incluyendo términos teóricos específicos de la lección como: ${missingConcepts.join(
        ", "
      )}. Vuelve a leer la teoría e inténtalo de nuevo.`;
      toast.info("Revisa las sugerencias de mejora de la profesora.");
    }

    setWrittenFeedback((prev) => ({
      ...prev,
      [promptItem.id]: {
        evaluated: true,
        passed,
        wordCount,
        matchedKeywords,
        missingConcepts,
        teacherComment,
      },
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-pink-50/80 rounded-2xl border border-pink-200/80 shadow-2xs">
        <button
          onClick={() => setActiveTab("theory")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "theory"
              ? "bg-white text-pink-700 shadow-sm border border-pink-200"
              : "text-purple-700 hover:bg-white/60"
          }`}
        >
          <BookOpen className="w-4 h-4 text-pink-500" />
          <span>1. Lección Interactiva</span>
        </button>

        <button
          onClick={() => setActiveTab("multiple-choice")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "multiple-choice"
              ? "bg-white text-pink-700 shadow-sm border border-pink-200"
              : "text-purple-700 hover:bg-white/60"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-purple-500" />
          <span>2. Selección Múltiple (10)</span>
          <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100 text-[10px] ml-1">
            {mcCorrectCount}/10
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab("true-false")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "true-false"
              ? "bg-white text-pink-700 shadow-sm border border-pink-200"
              : "text-purple-700 hover:bg-white/60"
          }`}
        >
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>3. Verdadero o Falso (7)</span>
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 text-[10px] ml-1">
            {tfCorrectCount}/7
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab("written-response")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "written-response"
              ? "bg-white text-pink-700 shadow-sm border border-pink-200"
              : "text-purple-700 hover:bg-white/60"
          }`}
        >
          <Feather className="w-4 h-4 text-indigo-500" />
          <span>4. Respuestas Escritas (5)</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. TEORÍA Y LECCIÓN INTERACTIVA */}
      {/* ======================================================== */}
      {activeTab === "theory" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Main Theory Introduction */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shadow-2xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold tracking-wider uppercase text-pink-500">
                  Fundamentos de Lenguaje y Comunicación
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-purple-950">
                  {LENGUAJE_THEORY.title}
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-purple-900 leading-relaxed bg-pink-50/50 p-4 sm:p-5 rounded-2xl border border-pink-100 mb-6 font-medium">
              {LENGUAJE_THEORY.introduction}
            </p>

            {/* Elements Cards Grid */}
            <h3 className="text-base font-extrabold text-purple-950 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              Los 5 Elementos Esenciales del Texto Narrativo:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {LENGUAJE_THEORY.elements.map((el, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-gradient-to-br from-white via-pink-50/30 to-purple-50/20 border border-purple-100 hover:border-pink-300 transition-all shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{el.emoji}</span>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-[10px] font-bold">
                      {el.badge}
                    </Badge>
                  </div>
                  <h4 className="font-extrabold text-sm text-purple-950 mb-1.5">
                    {el.name}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {el.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Latin American Literature Spotlight */}
            <div className="border-t border-pink-100 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Quote className="w-5 h-5 text-pink-500" />
                <h3 className="text-lg font-black text-purple-950">
                  Fragmentos Maestros de la Literatura Latinoamericana
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {LENGUAJE_THEORY.literarySpotlight.map((spot, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-3xl bg-gradient-to-b from-purple-50/60 to-pink-50/40 border border-purple-200/80 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-pink-700 bg-pink-100 px-2.5 py-0.5 rounded-full">
                          {spot.author}
                        </span>
                        <span className="text-[11px] font-semibold text-purple-600 italic">
                          {spot.work}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-purple-950 font-serif italic my-3 bg-white/80 p-3.5 rounded-2xl border border-pink-100 leading-relaxed shadow-2xs">
                        {spot.quote}
                      </p>
                    </div>
                    <div className="flex items-start gap-2 bg-indigo-50/80 p-3 rounded-2xl border border-indigo-100 text-[11px] text-indigo-900 font-medium">
                      <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <p>{spot.analysis}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action */}
            <div className="mt-8 pt-6 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-pink-100/60 to-purple-100/60 p-4 rounded-2xl">
              <div>
                <p className="text-xs font-extrabold text-purple-950">
                  ¿Lista para poner a prueba tu conocimiento?
                </p>
                <p className="text-[11px] text-purple-600">
                  Avanza a la sección de Selección Múltiple y gana estrellas mágicas.
                </p>
              </div>
              <Button
                onClick={() => setActiveTab("multiple-choice")}
                className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs px-5 shadow-md shadow-pink-200"
              >
                Comenzar Evaluación <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. EVALUACIÓN DE SELECCIÓN MÚLTIPLE (10 PREGUNTAS) */}
      {/* ======================================================== */}
      {activeTab === "multiple-choice" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Header Status Card */}
          <div className="bg-white p-5 rounded-3xl border border-pink-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-purple-950 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-pink-500" />
                Evaluación: Selección Múltiple (10 Preguntas)
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Elige la respuesta correcta y pulsa "Comprobar". Recibirás retroalimentación inmediata en verde o rojo.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-bold text-purple-900">Aciertos:</span>
                <p className="text-lg font-black text-pink-600 leading-none">
                  {mcCorrectCount} / {MULTIPLE_CHOICE_QUESTIONS.length}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={resetMC}
                className="rounded-xl border-purple-200 text-purple-700 text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reiniciar
              </Button>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-5">
            {MULTIPLE_CHOICE_QUESTIONS.map((q, qIndex) => {
              const isSubmitted = mcSubmitted[q.id];
              const selectedIdx = mcSelected[q.id];
              const isCorrect = selectedIdx === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 sm:p-6 rounded-3xl bg-white border transition-all duration-200 shadow-sm ${
                    isSubmitted
                      ? isCorrect
                        ? "border-green-300 ring-2 ring-green-100"
                        : "border-red-300 ring-2 ring-red-100"
                      : "border-purple-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h4 className="font-extrabold text-sm sm:text-base text-purple-950 flex items-start gap-2.5">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-xl bg-pink-100 text-pink-700 text-xs font-black shrink-0 mt-0.5">
                        {qIndex + 1}
                      </span>
                      <span>{q.question}</span>
                    </h4>
                    {isSubmitted && (
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1 ${
                          isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Correcta (+10 ⭐)
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Incorrecta
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5 mb-4">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedIdx === optIdx;
                      let optionStyle =
                        "bg-purple-50/50 hover:bg-pink-50/70 border-purple-100 text-purple-900";

                      if (isSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optionStyle = "bg-green-100/80 border-green-400 text-green-950 font-bold ring-2 ring-green-300";
                        } else if (isOptionSelected && !isCorrect) {
                          optionStyle = "bg-red-100/80 border-red-400 text-red-950 font-bold ring-2 ring-red-300";
                        } else {
                          optionStyle = "bg-gray-50 border-gray-100 text-gray-400 opacity-60";
                        }
                      } else if (isOptionSelected) {
                        optionStyle = "bg-pink-100 border-pink-400 text-pink-950 font-bold ring-2 ring-pink-300";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectMC(q.id, optIdx)}
                          disabled={isSubmitted}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between text-xs sm:text-sm ${optionStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-white border border-purple-200 flex items-center justify-center text-xs font-bold text-purple-800 shadow-2xs">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isSubmitted && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                          )}
                          {isSubmitted && isOptionSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Explanation */}
                  {isSubmitted && (
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm mb-3 flex items-start gap-2 ${
                        isCorrect
                          ? "bg-green-50 text-green-900 border border-green-200"
                          : "bg-red-50 text-red-900 border border-red-200"
                      }`}
                    >
                      <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-current" />
                      <p>
                        <span className="font-bold">Retroalimentación: </span>
                        {q.explanation}
                      </p>
                    </div>
                  )}

                  {/* Check button per card */}
                  {!isSubmitted && (
                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleVerifyMC(q.id)}
                        disabled={selectedIdx === undefined}
                        className="rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 shadow-sm"
                      >
                        Comprobar Pregunta {qIndex + 1}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Completion Summary */}
          {mcCompletedAll && (
            <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 p-6 rounded-3xl text-white text-center shadow-lg animate-in zoom-in-95">
              <h3 className="text-xl font-black mb-1">¡Has completado las 10 preguntas! 🎉</h3>
              <p className="text-xs text-purple-100 mb-4">
                Tu puntaje final es de {mcCorrectCount} de 10 aciertos.
              </p>
              <Button
                onClick={() => setActiveTab("true-false")}
                className="bg-white text-purple-950 hover:bg-white/90 font-black rounded-2xl text-xs px-6 shadow-md"
              >
                Continuar a Verdadero o Falso (Paso 3) <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. EVALUACIÓN VERDADERO O FALSO (7 PREGUNTAS) */}
      {/* ======================================================== */}
      {activeTab === "true-false" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Header */}
          <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-purple-950 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-500" />
                Evaluación: Verdadero o Falso (7 Enunciados)
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Selecciona V o F. <span className="font-bold text-amber-700">Regla estricta:</span> Si marcas Falso, es obligatorio justificar brevemente en el cuadro de texto.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-bold text-purple-900">Aciertos:</span>
                <p className="text-lg font-black text-amber-600 leading-none">
                  {tfCorrectCount} / {TRUE_FALSE_QUESTIONS.length}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={resetTF}
                className="rounded-xl border-purple-200 text-purple-700 text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reiniciar
              </Button>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-5">
            {TRUE_FALSE_QUESTIONS.map((item, idx) => {
              const isSubmitted = tfSubmitted[item.id];
              const selectedValue = tfAnswers[item.id];
              const isCorrect = selectedValue === item.isTrue;
              const errorMsg = tfErrors[item.id];

              return (
                <div
                  key={item.id}
                  className={`p-5 sm:p-6 rounded-3xl bg-white border transition-all shadow-sm ${
                    isSubmitted
                      ? isCorrect
                        ? "border-green-300 ring-2 ring-green-100"
                        : "border-red-300 ring-2 ring-red-100"
                      : "border-purple-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="font-extrabold text-sm sm:text-base text-purple-950 flex items-start gap-2.5">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-xl bg-amber-100 text-amber-800 text-xs font-black shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{item.statement}</span>
                    </h4>

                    {isSubmitted && (
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1 ${
                          isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Correcto (+10 ⭐)
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Incorrecto
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  {/* V or F Buttons */}
                  <div className="flex items-center gap-3 my-3">
                    <button
                      onClick={() => handleSelectTF(item.id, true)}
                      disabled={isSubmitted}
                      className={`flex-1 py-2.5 px-4 rounded-2xl font-bold text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 ${
                        selectedValue === true
                          ? isSubmitted
                            ? item.isTrue
                              ? "bg-green-100 border-green-400 text-green-900 ring-2 ring-green-300"
                              : "bg-red-100 border-red-400 text-red-900 ring-2 ring-red-300"
                            : "bg-pink-100 border-pink-400 text-pink-900 ring-2 ring-pink-300"
                          : "bg-purple-50/50 hover:bg-purple-100/60 border-purple-100 text-purple-900"
                      }`}
                    >
                      <span>🟢 Verdadero (V)</span>
                    </button>

                    <button
                      onClick={() => handleSelectTF(item.id, false)}
                      disabled={isSubmitted}
                      className={`flex-1 py-2.5 px-4 rounded-2xl font-bold text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 ${
                        selectedValue === false
                          ? isSubmitted
                            ? !item.isTrue
                              ? "bg-green-100 border-green-400 text-green-900 ring-2 ring-green-300"
                              : "bg-red-100 border-red-400 text-red-900 ring-2 ring-red-300"
                            : "bg-pink-100 border-pink-400 text-pink-900 ring-2 ring-pink-300"
                          : "bg-purple-50/50 hover:bg-purple-100/60 border-purple-100 text-purple-900"
                      }`}
                    >
                      <span>🔴 Falso (F)</span>
                    </button>
                  </div>

                  {/* Compulsory Justification textarea when F is chosen */}
                  {selectedValue === false && (
                    <div className="mt-3 p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/80 animate-in fade-in space-y-1.5">
                      <label className="text-xs font-bold text-amber-900 block">
                        Justificación Obligatoria: ¿Por qué es Falso este enunciado?
                      </label>
                      <Textarea
                        placeholder="Escribe tu justificación aquí (ej: 'Es falso porque el narrador omnisciente sí conoce los pensamientos...')..."
                        value={tfJustifications[item.id] || ""}
                        onChange={(e) => handleJustificationChange(item.id, e.target.value)}
                        disabled={isSubmitted}
                        rows={2}
                        className="rounded-xl text-xs bg-white border-amber-200 resize-none text-purple-950 focus:ring-amber-400"
                      />
                      {errorMsg && (
                        <p className="text-[11px] text-red-600 font-semibold flex items-center gap-1 pt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {errorMsg}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Feedback Explanation */}
                  {isSubmitted && (
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm mt-3 flex items-start gap-2 ${
                        isCorrect
                          ? "bg-green-50 text-green-900 border border-green-200"
                          : "bg-red-50 text-red-900 border border-red-200"
                      }`}
                    >
                      <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-current" />
                      <p>
                        <span className="font-bold">Explicación: </span>
                        {item.explanation}
                      </p>
                    </div>
                  )}

                  {/* Verify button */}
                  {!isSubmitted && (
                    <div className="flex justify-end mt-3">
                      <Button
                        onClick={() => handleVerifyTF(item.id)}
                        disabled={selectedValue === undefined || selectedValue === null}
                        className="rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 shadow-sm"
                      >
                        Comprobar Enunciado {idx + 1}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Completion Summary */}
          {tfCompletedAll && (
            <div className="bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 p-6 rounded-3xl text-white text-center shadow-lg animate-in zoom-in-95">
              <h3 className="text-xl font-black mb-1">¡Verdadero o Falso completado con éxito! 🏆</h3>
              <p className="text-xs text-amber-100 mb-4">
                Has justificado y argumentado los 7 enunciados de la lección.
              </p>
              <Button
                onClick={() => setActiveTab("written-response")}
                className="bg-white text-purple-950 hover:bg-white/90 font-black rounded-2xl text-xs px-6 shadow-md"
              >
                Pasar al Taller de Respuestas Escritas (Paso 4) <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. PREGUNTAS DE RESPUESTA ESCRITA (5 PREGUNTAS DE DESARROLLO) */}
      {/* ======================================================== */}
      {activeTab === "written-response" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Header */}
          <div className="bg-white p-5 rounded-3xl border border-indigo-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-purple-950 flex items-center gap-2">
                <Feather className="w-5 h-5 text-indigo-500" />
                Taller de Redacción y Análisis Escrito (5 Preguntas)
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Desarrolla tus respuestas en el cuadro de texto. El evaluador docente buscará la presencia de conceptos clave obligatorios.
              </p>
            </div>

            <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100 px-3 py-1 rounded-full text-xs font-bold border-indigo-200">
              <GraduationCap className="w-3.5 h-3.5 mr-1" /> Modo Profesora Exigente
            </Badge>
          </div>

          {/* Prompts list */}
          <div className="space-y-6">
            {WRITTEN_PROMPTS.map((promptItem, pIdx) => {
              const currentText = writtenAnswers[promptItem.id] || "";
              const wordsCount = currentText.trim().split(/\s+/).filter(Boolean).length;
              const feedback = writtenFeedback[promptItem.id];

              return (
                <div
                  key={promptItem.id}
                  className={`p-6 rounded-3xl bg-white border transition-all shadow-sm ${
                    feedback
                      ? feedback.passed
                        ? "border-green-300 ring-2 ring-green-100"
                        : "border-amber-300 ring-2 ring-amber-100"
                      : "border-purple-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-extrabold text-sm sm:text-base text-purple-950 flex items-start gap-2.5">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-xl bg-indigo-100 text-indigo-700 text-xs font-black shrink-0 mt-0.5">
                        {pIdx + 1}
                      </span>
                      <span>{promptItem.title}</span>
                    </h4>
                    <span className="text-[11px] font-bold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full shrink-0">
                      Mín. {promptItem.minimumWords} palabras
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-purple-900 bg-indigo-50/40 p-3.5 rounded-2xl border border-indigo-100/70 mb-3 leading-relaxed">
                    {promptItem.prompt}
                  </p>

                  <p className="text-[11px] text-gray-500 italic mb-2">
                    💡 Guía de la profesora: {promptItem.guidance}
                  </p>

                  {/* Textarea */}
                  <div className="space-y-1.5">
                    <Textarea
                      placeholder="Escribe tu respuesta detallada aquí con tus palabras..."
                      value={currentText}
                      onChange={(e) =>
                        setWrittenAnswers((prev) => ({
                          ...prev,
                          [promptItem.id]: e.target.value,
                        }))
                      }
                      rows={4}
                      className="rounded-2xl border-purple-200 text-xs sm:text-sm bg-purple-50/20 text-purple-950 focus:bg-white focus:ring-pink-300"
                    />

                    <div className="flex items-center justify-between text-[11px] font-medium text-gray-400 px-1">
                      <span>Palabras escritas: {wordsCount}</span>
                      <span>
                        {wordsCount >= promptItem.minimumWords ? (
                          <span className="text-green-600 font-bold">✓ Cumple con la extensión mínima</span>
                        ) : (
                          <span className="text-amber-600">Te faltan {Math.max(0, promptItem.minimumWords - wordsCount)} palabras</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Teacher Feedback Box */}
                  {feedback && (
                    <div
                      className={`mt-4 p-4 rounded-2xl border text-xs sm:text-sm animate-in fade-in space-y-2 ${
                        feedback.passed
                          ? "bg-green-50/80 border-green-200 text-green-950"
                          : "bg-amber-50/80 border-amber-200 text-amber-950"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold flex items-center gap-1.5">
                          {feedback.passed ? (
                            <>
                              <Award className="w-4 h-4 text-green-600" />
                              Dictamen Docente: APROBADO CON EXCELENCIA ✨
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-amber-600" />
                              Dictamen Docente: REQUIERE REVISIÓN ✍️
                            </>
                          )}
                        </span>
                        {feedback.passed && (
                          <span className="text-xs font-black text-green-700 bg-green-200 px-2 py-0.5 rounded-full">
                            +25 ⭐ Estrellas
                          </span>
                        )}
                      </div>

                      <p className="leading-relaxed font-medium">{feedback.teacherComment}</p>

                      {/* Model answer reveal on success */}
                      {feedback.passed && (
                        <div className="mt-2 pt-2 border-t border-green-200/80 text-[11px] text-green-800">
                          <p className="font-bold">Ejemplo de respuesta modelo sugerida:</p>
                          <p className="italic">{promptItem.sampleModelAnswer}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex items-center justify-end gap-3 mt-4">
                    <Button
                      onClick={() => handleEvaluateWritten(promptItem)}
                      className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs px-6 py-2 shadow-sm"
                    >
                      <GraduationCap className="w-4 h-4 mr-1.5" />
                      Evaluar Respuesta
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};