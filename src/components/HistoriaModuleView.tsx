import React, { useState } from "react";
import {
  HISTORIA_DATA,
  HISTORIA_EGIPTO_LESSONS,
  CivilizationData,
  WrittenPromptItem,
  HistoriaReadingLesson,
  HistoriaVisualPlaceholder,
  EgyptLessonId,
} from "@/data/historiaModuleData";
import {
  Landmark,
  BookOpen,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Award,
  ArrowRight,
  RotateCcw,
  Star,
  Feather,
  Check,
  AlertCircle,
  Lightbulb,
  GraduationCap,
  Compass,
  MapPin,
  Flame,
  Shield,
  Columns,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { triggerConfetti } from "@/utils/confetti";
import { toast } from "sonner";

interface HistoriaModuleViewProps {
  onEarnStars?: (stars: number) => void;
}

type CivKey = "grecia" | "roma";
type HistoriaUnitKey = CivKey | EgyptLessonId;
type SectionTab = "theory" | "multiple-choice" | "true-false" | "written-response";

const VisualPlaceholder: React.FC<{ visual: HistoriaVisualPlaceholder }> = ({ visual }) => (
  <figure
    className={`my-5 overflow-hidden rounded-3xl border-2 border-dashed ${visual.gradientClass} px-6 py-8 sm:px-10 sm:py-10 text-center shadow-inner`}
  >
    <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/80 text-5xl shadow-sm">
      {visual.emoji}
    </div>
    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-800/70">
      Imagen de la lección
    </p>
    <h4 className="mt-1.5 text-lg font-black text-purple-950">{visual.title}</h4>
    <figcaption className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-purple-800/80">
      {visual.caption}
    </figcaption>
  </figure>
);

const EgyptLessonReader: React.FC<{ lesson: HistoriaReadingLesson }> = ({ lesson }) => (
  <div className="space-y-6 animate-in fade-in">
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-3xl shadow-2xs">
          {lesson.icon}
        </div>
        <div>
          <span className="text-[11px] font-extrabold tracking-wider uppercase text-amber-600">
            Unidad de Historia Universal • 4°, 5° y 6° Primaria
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-purple-950">{lesson.title}</h2>
          <p className="text-xs text-purple-700/80 font-medium">{lesson.subtitle}</p>
        </div>
      </div>

      <p className="text-sm sm:text-base text-purple-900 leading-relaxed bg-amber-50/50 p-4 sm:p-5 rounded-2xl border border-amber-100 mb-6 font-medium">
        {lesson.introduction}
      </p>

      {lesson.timelineNote && (
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-50 to-amber-50 border border-violet-200">
          <p className="text-xs font-extrabold uppercase tracking-wider text-violet-700 mb-1">
            Línea de tiempo amigable
          </p>
          <p className="text-sm text-purple-900 leading-relaxed">{lesson.timelineNote}</p>
        </div>
      )}

      {lesson.gods && lesson.gods.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {lesson.gods.map((god) => (
            <article
              key={god.name}
              className={`p-5 rounded-3xl bg-gradient-to-br ${god.accentClass} border-2 shadow-sm`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{god.emoji}</span>
                <div>
                  <h3 className="text-lg font-black text-purple-950">{god.name}</h3>
                  <p className="text-xs font-bold text-purple-800/80">{god.meaning}</p>
                </div>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-purple-950">
                <li>
                  <span className="font-extrabold">Poderes: </span>
                  {god.powers}
                </li>
                <li>
                  <span className="font-extrabold">Importancia: </span>
                  {god.importance}
                </li>
                <li>
                  <span className="font-extrabold">En la naturaleza: </span>
                  {god.natureLink}
                </li>
              </ul>
            </article>
          ))}
        </div>
      )}

      <div className="space-y-5">
        {lesson.blocks.map((block, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-3xl bg-purple-50/30 border border-purple-100 hover:border-amber-300 transition-all"
          >
            <h3 className="text-base font-extrabold text-purple-950 flex items-center gap-2 mb-2">
              <span className="text-xl">{block.icon}</span>
              {block.heading}
            </h3>
            {block.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-xs sm:text-sm text-purple-900/90 leading-relaxed mb-3 last:mb-0">
                {p}
              </p>
            ))}
            {block.visual && <VisualPlaceholder visual={block.visual} />}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-purple-100 bg-gradient-to-r from-amber-100/70 via-pink-100/60 to-purple-100/70 p-5 rounded-3xl">
        <p className="text-sm text-purple-950 leading-relaxed font-medium">{lesson.closing}</p>
      </div>
    </div>
  </div>
);

export const HistoriaModuleView: React.FC<HistoriaModuleViewProps> = ({ onEarnStars }) => {
  const [selectedUnit, setSelectedUnit] = useState<HistoriaUnitKey>("viaje-egipto");
  const [activeTab, setActiveTab] = useState<SectionTab>("theory");

  const isClassicCiv = selectedUnit === "grecia" || selectedUnit === "roma";
  const selectedCiv: CivKey = isClassicCiv ? selectedUnit : "grecia";
  const currentCivData: CivilizationData = HISTORIA_DATA[selectedCiv];
  const egyptLesson = HISTORIA_EGIPTO_LESSONS.find((lesson) => lesson.id === selectedUnit);

  // --- MULTIPLE CHOICE STATE (Independent per civ) ---
  const [mcSelected, setMcSelected] = useState<Record<string, Record<number, number>>>({
    grecia: {},
    roma: {},
  });
  const [mcSubmitted, setMcSubmitted] = useState<Record<string, Record<number, boolean>>>({
    grecia: {},
    roma: {},
  });

  // --- TRUE/FALSE STATE (Independent per civ) ---
  const [tfAnswers, setTfAnswers] = useState<Record<string, Record<number, boolean | null>>>({
    grecia: {},
    roma: {},
  });
  const [tfJustifications, setTfJustifications] = useState<Record<string, Record<number, string>>>({
    grecia: {},
    roma: {},
  });
  const [tfSubmitted, setTfSubmitted] = useState<Record<string, Record<number, boolean>>>({
    grecia: {},
    roma: {},
  });
  const [tfErrors, setTfErrors] = useState<Record<string, Record<number, string>>>({
    grecia: {},
    roma: {},
  });

  // --- WRITTEN RESPONSES STATE (Independent per civ) ---
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, Record<number, string>>>({
    grecia: {},
    roma: {},
  });
  const [writtenFeedback, setWrittenFeedback] = useState<
    Record<
      string,
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
    >
  >({
    grecia: {},
    roma: {},
  });

  // -------------------------------------------------------------
  // Multiple Choice Handlers
  // -------------------------------------------------------------
  const handleSelectMC = (qId: number, optIdx: number) => {
    if (mcSubmitted[selectedCiv]?.[qId]) return;
    setMcSelected((prev) => ({
      ...prev,
      [selectedCiv]: { ...prev[selectedCiv], [qId]: optIdx },
    }));
  };

  const handleVerifyMC = (qId: number) => {
    const chosen = mcSelected[selectedCiv]?.[qId];
    if (chosen === undefined) {
      toast.error("Por favor selecciona una opción antes de comprobar.");
      return;
    }
    const q = currentCivData.multipleChoice.find((item) => item.id === qId);
    if (!q) return;

    setMcSubmitted((prev) => ({
      ...prev,
      [selectedCiv]: { ...prev[selectedCiv], [qId]: true },
    }));

    const isCorrect = chosen === q.correctIndex;
    if (isCorrect) {
      triggerConfetti();
      toast.success("¡Respuesta Histórica Correcta! 🌟", {
        description: q.explanation,
      });
      if (onEarnStars) onEarnStars(10);
    } else {
      toast.error("¡Respuesta no acertada!", {
        description: "Revisa la explicación histórica detallada.",
      });
    }
  };

  const resetMC = () => {
    setMcSelected((prev) => ({ ...prev, [selectedCiv]: {} }));
    setMcSubmitted((prev) => ({ ...prev, [selectedCiv]: {} }));
    toast.info(`Evaluación de ${currentCivData.title} reiniciada.`);
  };

  const mcCorrectCount = currentCivData.multipleChoice.filter(
    (q) => mcSubmitted[selectedCiv]?.[q.id] && mcSelected[selectedCiv]?.[q.id] === q.correctIndex
  ).length;

  // -------------------------------------------------------------
  // True / False Handlers
  // -------------------------------------------------------------
  const handleSelectTF = (id: number, val: boolean) => {
    if (tfSubmitted[selectedCiv]?.[id]) return;
    setTfAnswers((prev) => ({
      ...prev,
      [selectedCiv]: { ...prev[selectedCiv], [id]: val },
    }));
    setTfErrors((prev) => ({
      ...prev,
      [selectedCiv]: { ...prev[selectedCiv], [id]: "" },
    }));
  };

  const handleJustificationChange = (id: number, text: string) => {
    setTfJustifications((prev) => ({
      ...prev,
      [selectedCiv]: { ...prev[selectedCiv], [id]: text },
    }));
    if (tfErrors[selectedCiv]?.[id]) {
      setTfErrors((prev) => ({
        ...prev,
        [selectedCiv]: { ...prev[selectedCiv], [id]: "" },
      }));
    }
  };

  const handleVerifyTF = (id: number) => {
    const selectedVal = tfAnswers[selectedCiv]?.[id];
    if (selectedVal === undefined || selectedVal === null) {
      toast.error("Debes elegir si el enunciado histórico es Verdadero (V) o Falso (F).");
      return;
    }

    const item = currentCivData.trueFalse.find((q) => q.id === id);
    if (!item) return;

    if (selectedVal === false) {
      const justText = (tfJustifications[selectedCiv]?.[id] || "").trim();
      if (justText.length < 8) {
        setTfErrors((prev) => ({
          ...prev,
          [selectedCiv]: {
            ...prev[selectedCiv],
            [id]: "⚠️ Al marcar Falso, es obligatorio justificar con al menos 8 caracteres explicando el porqué histórico.",
          },
        }));
        toast.error("¡Falta la justificación histórica obligatoria para tu respuesta Falsa!");
        return;
      }
    }

    setTfSubmitted((prev) => ({
      ...prev,
      [selectedCiv]: { ...prev[selectedCiv], [id]: true },
    }));

    const isAnswerCorrect = selectedVal === item.isTrue;
    if (isAnswerCorrect) {
      triggerConfetti();
      toast.success("¡Brillante análisis histórico! 🌟", {
        description: item.explanation,
      });
      if (onEarnStars) onEarnStars(10);
    } else {
      toast.error("Respuesta incorrecta", {
        description: item.explanation,
      });
    }
  };

  const resetTF = () => {
    setTfAnswers((prev) => ({ ...prev, [selectedCiv]: {} }));
    setTfJustifications((prev) => ({ ...prev, [selectedCiv]: {} }));
    setTfSubmitted((prev) => ({ ...prev, [selectedCiv]: {} }));
    setTfErrors((prev) => ({ ...prev, [selectedCiv]: {} }));
    toast.info("Verdadero o Falso reiniciado.");
  };

  const tfCorrectCount = currentCivData.trueFalse.filter(
    (q) => tfSubmitted[selectedCiv]?.[q.id] && tfAnswers[selectedCiv]?.[q.id] === q.isTrue
  ).length;

  // -------------------------------------------------------------
  // Written Responses Handlers (Strict Teacher Grading)
  // -------------------------------------------------------------
  const handleEvaluateWritten = (promptItem: WrittenPromptItem) => {
    const userText = (writtenAnswers[selectedCiv]?.[promptItem.id] || "").trim();
    const cleanLower = userText.toLowerCase();

    const words = userText.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    if (wordCount < promptItem.minimumWords) {
      toast.error(`Respuesta muy breve (${wordCount}/${promptItem.minimumWords} palabras)`, {
        description: `La profesora solicita desarrollar tu argumento con al menos ${promptItem.minimumWords} palabras para demostrar tu aprendizaje.`,
      });
      setWrittenFeedback((prev) => ({
        ...prev,
        [selectedCiv]: {
          ...prev[selectedCiv],
          [promptItem.id]: {
            evaluated: true,
            passed: false,
            wordCount,
            matchedKeywords: [],
            missingConcepts: ["Extensión mínima requerida"],
            teacherComment: `⚠️ Tu respuesta tiene solo ${wordCount} palabras. Por favor desarrolla más tu idea incluyendo vocabulario y nombres históricos para alcanzar el mínimo de ${promptItem.minimumWords} palabras.`,
          },
        },
      }));
      return;
    }

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

    const passed = matchedGroupsCount >= Math.ceil(promptItem.requiredKeywords.length * 0.65);

    let teacherComment = "";
    if (passed) {
      triggerConfetti();
      teacherComment = `🎓 ¡Excelente análisis histórico! Has fundamentado tu respuesta utilizando conceptos clave fundamentales (${matchedKeywords.join(
        ", "
      )}) demostrando un dominio sobresaliente de la civilización estudiada. ¡Felicitaciones! 🌟`;
      toast.success("¡Evaluación histórica aprobada con distinción! 🏆");
      if (onEarnStars) onEarnStars(25);
    } else {
      teacherComment = `✍️ Sugerencia Docente: Tu redacción es clara, pero te sugerimos enriquecerla incluyendo términos históricos específicos como: ${missingConcepts.join(
        ", "
      )}. ¡Vuelve a leer la lección e inténtalo nuevamente!`;
      toast.info("Revisa las sugerencias de la profesora para mejorar tu respuesta.");
    }

    setWrittenFeedback((prev) => ({
      ...prev,
      [selectedCiv]: {
        ...prev[selectedCiv],
        [promptItem.id]: {
          evaluated: true,
          passed,
          wordCount,
          matchedKeywords,
          missingConcepts,
          teacherComment,
        },
      },
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ======================================================== */}
      {/* 1. SELECCIÓN DE LECCIONES */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {HISTORIA_EGIPTO_LESSONS.map((lesson) => {
          const isActive = selectedUnit === lesson.id;
          return (
            <button
              key={lesson.id}
              onClick={() => {
                setSelectedUnit(lesson.id);
                setActiveTab("theory");
              }}
              className={`p-5 rounded-3xl border-2 transition-all flex items-center gap-4 text-left shadow-sm ${
                isActive
                  ? "bg-gradient-to-r from-amber-100 via-orange-50 to-pink-50 border-amber-400 ring-2 ring-amber-200 shadow-md scale-[1.01]"
                  : "bg-white/80 border-purple-100 hover:border-amber-200 hover:bg-amber-50/40"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-3xl shadow-sm shrink-0">
                {lesson.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-black text-base text-purple-950">{lesson.title}</span>
                  {isActive && (
                    <Badge className="bg-amber-200 text-amber-900 border-none text-[10px] font-bold">
                      Activa
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{lesson.cardDescription}</p>
              </div>
            </button>
          );
        })}

        {/* Antigua Grecia Button */}
        <button
          onClick={() => {
            setSelectedUnit("grecia");
            setActiveTab("theory");
          }}
          className={`p-5 rounded-3xl border-2 transition-all flex items-center gap-4 text-left shadow-sm ${
            selectedUnit === "grecia"
              ? "bg-gradient-to-r from-amber-100 via-orange-50 to-pink-50 border-amber-400 ring-2 ring-amber-200 shadow-md scale-[1.01]"
              : "bg-white/80 border-purple-100 hover:border-amber-200 hover:bg-amber-50/40"
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-3xl shadow-sm shrink-0">
            🏛️
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-black text-base text-purple-950">Antigua Grecia</span>
              {selectedUnit === "grecia" && (
                <Badge className="bg-amber-200 text-amber-900 border-none text-[10px] font-bold">
                  Activa
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-600 line-clamp-2">
              Polis, democracia, Juegos Olímpicos, mitos del Olimpo y filosofía.
            </p>
          </div>
        </button>

        {/* Antigua Roma Button */}
        <button
          onClick={() => {
            setSelectedUnit("roma");
            setActiveTab("theory");
          }}
          className={`p-5 rounded-3xl border-2 transition-all flex items-center gap-4 text-left shadow-sm ${
            selectedUnit === "roma"
              ? "bg-gradient-to-r from-rose-100 via-pink-50 to-purple-50 border-rose-400 ring-2 ring-rose-200 shadow-md scale-[1.01]"
              : "bg-white/80 border-purple-100 hover:border-rose-200 hover:bg-rose-50/40"
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center text-3xl shadow-sm shrink-0">
            🏺
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-black text-base text-purple-950">Antigua Roma</span>
              {selectedUnit === "roma" && (
                <Badge className="bg-rose-200 text-rose-900 border-none text-[10px] font-bold">
                  Activa
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-600 line-clamp-2">
              Acueductos, derecho romano, coliseo, idioma latín y vida en Pompeya.
            </p>
          </div>
        </button>
      </div>

      {!isClassicCiv && egyptLesson && <EgyptLessonReader lesson={egyptLesson} />}

      {isClassicCiv && (
        <>
      {/* ======================================================== */}
      {/* 2. SUB-NAVIGATION TABS (LECCIÓN, TEST 10, V/F 7, ESCRITAS 5) */}
      {/* ======================================================== */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 shadow-2xs">
        <button
          onClick={() => setActiveTab("theory")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "theory"
              ? "bg-white text-amber-800 shadow-sm border border-amber-200"
              : "text-purple-700 hover:bg-white/60"
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>1. Lección y Vida Cotidiana</span>
        </button>

        <button
          onClick={() => setActiveTab("multiple-choice")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "multiple-choice"
              ? "bg-white text-amber-800 shadow-sm border border-amber-200"
              : "text-purple-700 hover:bg-white/60"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-purple-500" />
          <span>2. Selección Múltiple (10)</span>
          <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-100 text-[10px] ml-1">
            {mcCorrectCount}/10
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab("true-false")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "true-false"
              ? "bg-white text-amber-800 shadow-sm border border-amber-200"
              : "text-purple-700 hover:bg-white/60"
          }`}
        >
          <HelpCircle className="w-4 h-4 text-orange-500" />
          <span>3. Verdadero o Falso (7)</span>
          <Badge className="bg-orange-100 text-orange-900 hover:bg-orange-100 text-[10px] ml-1">
            {tfCorrectCount}/7
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab("written-response")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "written-response"
              ? "bg-white text-amber-800 shadow-sm border border-amber-200"
              : "text-purple-700 hover:bg-white/60"
          }`}
        >
          <Feather className="w-4 h-4 text-indigo-500" />
          <span>4. Respuestas Escritas (5)</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: LECCIÓN DIDÁCTICA ILUSTRADA */}
      {/* ======================================================== */}
      {activeTab === "theory" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-3xl shadow-2xs">
                {currentCivData.icon}
              </div>
              <div>
                <span className="text-[11px] font-extrabold tracking-wider uppercase text-amber-600">
                  Unidad de Historia Universal • 4°, 5° y 6° Primaria
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-purple-950">
                  {currentCivData.theory.title}
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-purple-900 leading-relaxed bg-amber-50/50 p-4 sm:p-5 rounded-2xl border border-amber-100 mb-6 font-medium">
              {currentCivData.theory.introduction}
            </p>

            {/* Highlight Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {currentCivData.theory.highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50/60 to-purple-50/40 border border-amber-100 text-center"
                >
                  <span className="text-2xl block mb-1">{h.emoji}</span>
                  <h4 className="text-xs font-black text-purple-950">{h.title}</h4>
                  <p className="text-[10px] text-gray-600 mt-1 leading-tight">{h.desc}</p>
                </div>
              ))}
            </div>

            {/* Detailed Sections */}
            <div className="space-y-5">
              {currentCivData.theory.sections.map((sec, sIdx) => (
                <div
                  key={sIdx}
                  className="p-5 sm:p-6 rounded-3xl bg-purple-50/30 border border-purple-100 hover:border-amber-300 transition-all"
                >
                  <h3 className="text-base font-extrabold text-purple-950 flex items-center gap-2 mb-2">
                    <span className="text-xl">{sec.icon}</span>
                    {sec.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-900/90 leading-relaxed mb-3">
                    {sec.content}
                  </p>

                  {sec.bulletPoints && (
                    <ul className="space-y-2 bg-white/80 p-4 rounded-2xl border border-purple-100/70 text-xs text-purple-950">
                      {sec.bulletPoints.map((bp, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Call to action */}
            <div className="mt-8 pt-6 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-amber-100/70 via-pink-100/60 to-purple-100/70 p-5 rounded-3xl">
              <div>
                <p className="text-xs font-extrabold text-purple-950">
                  ¿Lista para poner a prueba tus conocimientos sobre {currentCivData.title}?
                </p>
                <p className="text-[11px] text-purple-600">
                  Supera las 10 preguntas de selección múltiple y gana hasta 100 estrellas mágicas.
                </p>
              </div>
              <Button
                onClick={() => setActiveTab("multiple-choice")}
                className="rounded-2xl bg-gradient-to-r from-amber-600 to-purple-600 text-white font-bold text-xs px-6 py-2.5 shadow-md shadow-amber-200 hover:opacity-95"
              >
                Comenzar Evaluación <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: SELECCIÓN MÚLTIPLE (10 PREGUNTAS) */}
      {/* ======================================================== */}
      {activeTab === "multiple-choice" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Status Header */}
          <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-purple-950 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                Evaluación: Selección Múltiple - {currentCivData.title} (10 Preguntas)
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Elige la opción correcta. Recibirás retroalimentación instantánea en verde (acierto) o rojo (revisar).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-bold text-purple-900">Aciertos:</span>
                <p className="text-lg font-black text-amber-600 leading-none">
                  {mcCorrectCount} / {currentCivData.multipleChoice.length}
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

          {/* Questions */}
          <div className="space-y-5">
            {currentCivData.multipleChoice.map((q, qIndex) => {
              const isSubmitted = mcSubmitted[selectedCiv]?.[q.id];
              const selectedIdx = mcSelected[selectedCiv]?.[q.id];
              const isCorrect = selectedIdx === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 sm:p-6 rounded-3xl bg-white border transition-all shadow-sm ${
                    isSubmitted
                      ? isCorrect
                        ? "border-green-300 ring-2 ring-green-100"
                        : "border-red-300 ring-2 ring-red-100"
                      : "border-purple-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h4 className="font-extrabold text-sm sm:text-base text-purple-950 flex items-start gap-2.5">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-xl bg-amber-100 text-amber-800 text-xs font-black shrink-0 mt-0.5">
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
                        "bg-purple-50/50 hover:bg-amber-50/70 border-purple-100 text-purple-900";

                      if (isSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optionStyle = "bg-green-100/80 border-green-400 text-green-950 font-bold ring-2 ring-green-300";
                        } else if (isOptionSelected && !isCorrect) {
                          optionStyle = "bg-red-100/80 border-red-400 text-red-950 font-bold ring-2 ring-red-300";
                        } else {
                          optionStyle = "bg-gray-50 border-gray-100 text-gray-400 opacity-60";
                        }
                      } else if (isOptionSelected) {
                        optionStyle = "bg-amber-100 border-amber-400 text-amber-950 font-bold ring-2 ring-amber-300";
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

                  {/* Feedback Explanation */}
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
                        <span className="font-bold">Explicación Histórica: </span>
                        {q.explanation}
                      </p>
                    </div>
                  )}

                  {!isSubmitted && (
                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleVerifyMC(q.id)}
                        disabled={selectedIdx === undefined}
                        className="rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 shadow-sm"
                      >
                        Comprobar Pregunta {qIndex + 1}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Call to Action */}
          <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 p-6 rounded-3xl text-white text-center shadow-lg">
            <h3 className="text-xl font-black mb-1">¡Avanza a Verdadero o Falso! 📜</h3>
            <p className="text-xs text-amber-100 mb-4">
              Demuestra tu capacidad de argumentación histórica justificando enunciados.
            </p>
            <Button
              onClick={() => setActiveTab("true-false")}
              className="bg-white text-purple-950 hover:bg-white/90 font-black rounded-2xl text-xs px-6 shadow-md"
            >
              Ir a Verdadero o Falso (Paso 3) <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: VERDADERO O FALSO (7 ENUNCIADOS CON JUSTIFICACIÓN OBLIGATORIA) */}
      {/* ======================================================== */}
      {activeTab === "true-false" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Header */}
          <div className="bg-white p-5 rounded-3xl border border-orange-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-purple-950 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-orange-500" />
                Evaluación: Verdadero o Falso - {currentCivData.title} (7 Enunciados)
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Selecciona V o F. <span className="font-bold text-orange-700">Regla estricta:</span> Si marcas Falso, es obligatorio justificar con tus palabras en el cuadro de texto.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-bold text-purple-900">Aciertos:</span>
                <p className="text-lg font-black text-orange-600 leading-none">
                  {tfCorrectCount} / {currentCivData.trueFalse.length}
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

          {/* True / False List */}
          <div className="space-y-5">
            {currentCivData.trueFalse.map((item, idx) => {
              const isSubmitted = tfSubmitted[selectedCiv]?.[item.id];
              const selectedValue = tfAnswers[selectedCiv]?.[item.id];
              const isCorrect = selectedValue === item.isTrue;
              const errorMsg = tfErrors[selectedCiv]?.[item.id];

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
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-xl bg-orange-100 text-orange-800 text-xs font-black shrink-0 mt-0.5">
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

                  {/* Buttons */}
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
                            : "bg-amber-100 border-amber-400 text-amber-900 ring-2 ring-amber-300"
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
                            : "bg-amber-100 border-amber-400 text-amber-900 ring-2 ring-amber-300"
                          : "bg-purple-50/50 hover:bg-purple-100/60 border-purple-100 text-purple-900"
                      }`}
                    >
                      <span>🔴 Falso (F)</span>
                    </button>
                  </div>

                  {/* Required justification when False */}
                  {selectedValue === false && (
                    <div className="mt-3 p-3.5 bg-orange-50/60 rounded-2xl border border-orange-200/80 animate-in fade-in space-y-1.5">
                      <label className="text-xs font-bold text-orange-950 block">
                        Justificación Histórica Obligatoria: ¿Por qué es Falso este enunciado?
                      </label>
                      <Textarea
                        placeholder="Explica el motivo histórico real aquí..."
                        value={tfJustifications[selectedCiv]?.[item.id] || ""}
                        onChange={(e) => handleJustificationChange(item.id, e.target.value)}
                        disabled={isSubmitted}
                        rows={2}
                        className="rounded-xl text-xs bg-white border-orange-200 resize-none text-purple-950 focus:ring-orange-400"
                      />
                      {errorMsg && (
                        <p className="text-[11px] text-red-600 font-semibold flex items-center gap-1 pt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {errorMsg}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Feedback */}
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

                  {!isSubmitted && (
                    <div className="flex justify-end mt-3">
                      <Button
                        onClick={() => handleVerifyTF(item.id)}
                        disabled={selectedValue === undefined || selectedValue === null}
                        className="rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-5 shadow-sm"
                      >
                        Comprobar Enunciado {idx + 1}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Action */}
          <div className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 p-6 rounded-3xl text-white text-center shadow-lg">
            <h3 className="text-xl font-black mb-1">¡Paso al Taller de Respuestas Escritas! ✍️</h3>
            <p className="text-xs text-orange-100 mb-4">
              Desarrolla 5 preguntas con tus propias palabras y recibe evaluación docente con estrellas.
            </p>
            <Button
              onClick={() => setActiveTab("written-response")}
              className="bg-white text-purple-950 hover:bg-white/90 font-black rounded-2xl text-xs px-6 shadow-md"
            >
              Pasar a Respuestas Escritas (Paso 4) <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: PREGUNTAS DE RESPUESTA ESCRITA (5 PREGUNTAS CON EVALUACIÓN DOCENTE) */}
      {/* ======================================================== */}
      {activeTab === "written-response" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Header */}
          <div className="bg-white p-5 rounded-3xl border border-indigo-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-purple-950 flex items-center gap-2">
                <Feather className="w-5 h-5 text-indigo-500" />
                Taller de Redacción y Análisis Histórico - {currentCivData.title} (5 Preguntas)
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Desarrolla tus respuestas completas. La profesora evaluará la presencia de conceptos clave, personajes y lugares históricos.
              </p>
            </div>

            <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100 px-3 py-1 rounded-full text-xs font-bold border-indigo-200 shrink-0">
              <GraduationCap className="w-3.5 h-3.5 mr-1" /> Modo Profesora Exigente
            </Badge>
          </div>

          {/* Prompts list */}
          <div className="space-y-6">
            {currentCivData.writtenPrompts.map((promptItem, pIdx) => {
              const currentText = writtenAnswers[selectedCiv]?.[promptItem.id] || "";
              const wordsCount = currentText.trim().split(/\s+/).filter(Boolean).length;
              const feedback = writtenFeedback[selectedCiv]?.[promptItem.id];

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
                    💡 Guía pedagógica: {promptItem.guidance}
                  </p>

                  {/* Textarea */}
                  <div className="space-y-1.5">
                    <Textarea
                      placeholder="Redacta tu explicación detallada aquí..."
                      value={currentText}
                      onChange={(e) =>
                        setWrittenAnswers((prev) => ({
                          ...prev,
                          [selectedCiv]: {
                            ...prev[selectedCiv],
                            [promptItem.id]: e.target.value,
                          },
                        }))
                      }
                      rows={4}
                      className="rounded-2xl border-purple-200 text-xs sm:text-sm bg-purple-50/20 text-purple-950 focus:bg-white focus:ring-amber-300"
                    />

                    <div className="flex items-center justify-between text-[11px] font-medium text-gray-400 px-1">
                      <span>Palabras escritas: {wordsCount}</span>
                      <span>
                        {wordsCount >= promptItem.minimumWords ? (
                          <span className="text-green-600 font-bold">✓ Cumple la extensión mínima</span>
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
                              Dictamen Docente: EXCELENCIA HISTÓRICA ✨
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-amber-600" />
                              Dictamen Docente: REQUIERE REVISIÓN ✍️
                            </>
                          )}
                        </span>
                        {feedback.passed && (
                          <span className="text-xs font-black text-green-700 bg-green-200 px-2.5 py-0.5 rounded-full">
                            +25 ⭐ Estrellas
                          </span>
                        )}
                      </div>

                      <p className="leading-relaxed font-medium">{feedback.teacherComment}</p>

                      {feedback.passed && (
                        <div className="mt-2 pt-2 border-t border-green-200/80 text-[11px] text-green-800">
                          <p className="font-bold">Ejemplo de respuesta modelo:</p>
                          <p className="italic">{promptItem.sampleModelAnswer}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex items-center justify-end gap-3 mt-4">
                    <Button
                      onClick={() => handleEvaluateWritten(promptItem)}
                      className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs px-6 py-2 shadow-sm"
                    >
                      <GraduationCap className="w-4 h-4 mr-1.5" />
                      Evaluar Respuesta Histórica
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};