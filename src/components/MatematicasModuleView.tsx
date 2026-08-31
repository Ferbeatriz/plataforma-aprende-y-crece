import React, { useState, useEffect } from "react";
import {
  MULTIPLICATION_PROPERTIES,
  PROPERTY_PRACTICE_PROBLEMS,
  REASONING_CHALLENGES_20,
  MATH_TRICKS,
  ReasoningChallenge,
} from "@/data/matematicasModuleData";
import {
  Sparkles,
  Zap,
  Flame,
  Trophy,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Award,
  ArrowRight,
  Play,
  Star,
  Timer,
  BookOpen,
  HelpCircle,
  Share2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { triggerConfetti } from "@/utils/confetti";
import { toast } from "sonner";

interface MatematicasModuleViewProps {
  onEarnStars?: (stars: number) => void;
}

type TabType = "properties" | "reasoning" | "tricks" | "speed-race";

export const MatematicasModuleView: React.FC<MatematicasModuleViewProps> = ({
  onEarnStars,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("properties");

  // --- SECTION 1: Practice Problems State ---
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  const [practiceSubmitted, setPracticeSubmitted] = useState<Record<number, boolean>>({});

  // --- SECTION 2: 20 Reasoning Challenges State ---
  const [challengeAnswers, setChallengeAnswers] = useState<Record<number, number>>({});
  const [challengeSubmitted, setChallengeSubmitted] = useState<Record<number, boolean>>({});
  const [activeChallengeIdx, setActiveChallengeIdx] = useState<number>(0);
  const [challengeFilter, setChallengeFilter] = useState<string>("all");

  // --- SECTION 3: Trick Simulator State ---
  const [activeTrickIndex, setActiveTrickIndex] = useState<number>(0);
  const [interactiveMultiplier, setInteractiveMultiplier] = useState<number>(4);

  // --- SECTION 4: Speed Race MiniGame State ---
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameStreak, setGameStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [currentProblem, setCurrentProblem] = useState<{
    num1: number;
    num2: number;
    options: number[];
    answer: number;
  } | null>(null);

  // High score saved in localStorage
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem("edusphere_math_race_highscore");
    return saved ? parseInt(saved, 10) : 0;
  });

  // -------------------------------------------------------------
  // Section 1: Property Practice Handlers
  // -------------------------------------------------------------
  const handleSelectPracticeOption = (problemId: number, optionIdx: number) => {
    if (practiceSubmitted[problemId]) return;
    setPracticeAnswers((prev) => ({ ...prev, [problemId]: optionIdx }));
  };

  const handleVerifyPractice = (problemId: number) => {
    const selectedIdx = practiceAnswers[problemId];
    if (selectedIdx === undefined) {
      toast.error("Selecciona una opción antes de verificar.");
      return;
    }
    const problem = PROPERTY_PRACTICE_PROBLEMS.find((p) => p.id === problemId);
    if (!problem) return;

    setPracticeSubmitted((prev) => ({ ...prev, [problemId]: true }));
    const isCorrect = problem.options[selectedIdx].isCorrect;

    if (isCorrect) {
      triggerConfetti();
      toast.success("¡Excelente aplicación de la propiedad! 🌟", {
        description: problem.options[selectedIdx].explanation,
      });
      if (onEarnStars) onEarnStars(15);
    } else {
      toast.error("Respuesta incorrecta", {
        description: "Revisa la pista y la explicación paso a paso.",
      });
    }
  };

  // -------------------------------------------------------------
  // Section 2: 20 Reasoning Challenges Handlers
  // -------------------------------------------------------------
  const filteredChallenges = REASONING_CHALLENGES_20.filter((c) => {
    if (challengeFilter === "all") return true;
    return c.tableFocus.toLowerCase().includes(challengeFilter.toLowerCase());
  });

  const handleSelectChallengeAnswer = (challengeId: number, chosenNum: number) => {
    if (challengeSubmitted[challengeId]) return;
    setChallengeAnswers((prev) => ({ ...prev, [challengeId]: chosenNum }));
  };

  const handleVerifyChallenge = (challenge: ReasoningChallenge) => {
    const chosen = challengeAnswers[challenge.id];
    if (chosen === undefined) {
      toast.error("Selecciona un resultado antes de comprobar.");
      return;
    }

    setChallengeSubmitted((prev) => ({ ...prev, [challenge.id]: true }));
    const isCorrect = chosen === challenge.correctAnswer;

    if (isCorrect) {
      triggerConfetti();
      toast.success(`¡Desafío Resuelto! (+${challenge.points} ⭐)`, {
        description: `Razonamiento: ${challenge.breakdownTechnique}`,
      });
      if (onEarnStars) onEarnStars(challenge.points);
    } else {
      toast.error("¡Cálculo no acertado!", {
        description: `La respuesta correcta es ${challenge.correctAnswer}. Revisa la técnica de descomposición.`,
      });
    }
  };

  // -------------------------------------------------------------
  // Section 4: Carrera de Tablas (Speed Race Generator)
  // -------------------------------------------------------------
  const generateRaceProblem = () => {
    // Tables from 4 to 12
    const num1 = Math.floor(Math.random() * 9) + 4; // 4 to 12
    const num2 = Math.floor(Math.random() * 10) + 2; // 2 to 11
    const answer = num1 * num2;

    // Generate 3 plausible distractors
    const distractors = new Set<number>();
    distractors.add(answer);

    while (distractors.size < 4) {
      const offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
      const wrong = answer + offset * (Math.random() > 0.5 ? num1 : 2);
      if (wrong > 0 && wrong !== answer) {
        distractors.add(wrong);
      }
    }

    const options = Array.from(distractors).sort(() => Math.random() - 0.5);
    setCurrentProblem({ num1, num2, options, answer });
  };

  const startGame = () => {
    setGameScore(0);
    setGameStreak(0);
    setMaxStreak(0);
    setTimeLeft(45);
    setGameOver(false);
    setGameActive(true);
    generateRaceProblem();
    toast.info("¡Carrera iniciada! ¡Multiplica lo más rápido que puedas! 🚀");
  };

  const handleAnswerRace = (selected: number) => {
    if (!currentProblem || !gameActive) return;

    if (selected === currentProblem.answer) {
      const newStreak = gameStreak + 1;
      setGameStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const streakBonus = Math.min(newStreak, 5) * 5;
      const addedPoints = 10 + streakBonus;
      setGameScore((prev) => prev + addedPoints);

      toast.success(`+${addedPoints} pts! 🔥 Racha x${newStreak}`, { duration: 1000 });
      generateRaceProblem();
    } else {
      setGameStreak(0);
      toast.error(`¡Ups! ${currentProblem.num1} × ${currentProblem.num2} = ${currentProblem.answer}`, {
        duration: 1200,
      });
      generateRaceProblem();
    }
  };

  // Timer Effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (gameActive && timeLeft === 0) {
      setGameActive(false);
      setGameOver(true);
      triggerConfetti();

      if (gameScore > highScore) {
        setHighScore(gameScore);
        localStorage.setItem("edusphere_math_race_highscore", gameScore.toString());
        toast.success("🏆 ¡NUEVO RÉCORD HISTÓRICO! ¡Felicitaciones!", { duration: 4000 });
      } else {
        toast.success(`¡Tiempo terminado! Puntaje final: ${gameScore} pts 🎉`);
      }

      if (onEarnStars && gameScore > 0) {
        onEarnStars(Math.round(gameScore / 5));
      }
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft, gameScore, highScore, onEarnStars]);

  // Solved challenges count
  const challengesSolvedCount = REASONING_CHALLENGES_20.filter(
    (c) => challengeSubmitted[c.id] && challengeAnswers[c.id] === c.correctAnswer
  ).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-indigo-50/80 rounded-2xl border border-indigo-200/80 shadow-2xs">
        <button
          onClick={() => setActiveTab("properties")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "properties"
              ? "bg-white text-indigo-700 shadow-sm border border-indigo-200"
              : "text-purple-700 hover:bg-white/60"
          }`}
        >
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>1. Propiedades de la Multiplicación</span>
        </button>

        <button
          onClick={() => setActiveTab("reasoning")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "reasoning"
              ? "bg-white text-indigo-700 shadow-sm border border-indigo-200"
              : "text-purple-700 hover:bg-white/60"
          }`}
        >
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>2. Desafíos de Razonamiento (20)</span>
          <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100 text-[10px] ml-1">
            {challengesSolvedCount}/20
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab("tricks")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "tricks"
              ? "bg-white text-indigo-700 shadow-sm border border-indigo-200"
              : "text-purple-700 hover:bg-white/60"
          }`}
        >
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>3. Trucos y Técnicas Mentales</span>
        </button>

        <button
          onClick={() => setActiveTab("speed-race")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "speed-race"
              ? "bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-sm font-black"
              : "text-purple-700 hover:bg-white/60"
          }`}
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>4. Minijuego: Carrera de Tablas 🏁</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. PROPIEDADES DE LA MULTIPLICACIÓN + 5 PROBLEMAS */}
      {/* ======================================================== */}
      {activeTab === "properties" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Main Theory Introduction */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl shadow-2xs">
                📐
              </div>
              <div>
                <span className="text-[11px] font-extrabold tracking-wider uppercase text-indigo-600">
                  Unidad de Matemáticas • 4°, 5° y 6° Primaria
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-purple-950">
                  Las 4 Grandes Propiedades de la Multiplicación
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-purple-900 leading-relaxed bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 mb-6 font-medium">
              Multiplicar no es memorizar de memoria sin sentido: ¡es un súper poder matemático! Las propiedades te permiten transformar cálculos difíciles en operaciones sencillas y veloces.
            </p>

            {/* Property Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {MULTIPLICATION_PROPERTIES.map((prop, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20 border border-indigo-100 hover:border-indigo-300 transition-all shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{prop.emoji}</span>
                      <Badge className="bg-indigo-100 text-indigo-800 border-none font-bold text-[10px]">
                        {prop.badge}
                      </Badge>
                    </div>

                    <h3 className="font-extrabold text-base text-purple-950 mb-1">
                      {prop.name}
                    </h3>
                    <div className="bg-purple-100/70 text-purple-900 font-mono font-bold text-xs px-3 py-1 rounded-xl inline-block mb-3">
                      {prop.formula}
                    </div>

                    <p className="text-xs text-gray-700 leading-relaxed mb-3">
                      <span className="font-bold text-indigo-950">Ejemplo cotidiano: </span>
                      {prop.everydayExample}
                    </p>
                  </div>

                  <div className="bg-indigo-50/80 p-3 rounded-2xl border border-indigo-100 text-[11px] text-indigo-900 font-medium flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <p>
                      <span className="font-bold">¿Por qué te ayuda? </span>
                      {prop.whyItMatters}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 5 Practical Problems Section */}
            <div className="border-t border-indigo-100 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-black text-purple-950">
                  Batería de 5 Problemas Prácticos con Propiedades
                </h3>
              </div>
              <p className="text-xs text-gray-500 mb-5">
                Lee cada historia y selecciona la opción que aplica correctamente la propiedad matemática correspondiente.
              </p>

              <div className="space-y-5">
                {PROPERTY_PRACTICE_PROBLEMS.map((item, pIdx) => {
                  const isSubmitted = practiceSubmitted[item.id];
                  const selectedIdx = practiceAnswers[item.id];
                  const isCorrect = selectedIdx !== undefined && item.options[selectedIdx]?.isCorrect;

                  return (
                    <div
                      key={item.id}
                      className={`p-5 rounded-3xl bg-white border transition-all shadow-sm ${
                        isSubmitted
                          ? isCorrect
                            ? "border-green-300 ring-2 ring-green-100"
                            : "border-red-300 ring-2 ring-red-100"
                          : "border-indigo-100"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-extrabold text-sm sm:text-base text-purple-950 flex items-start gap-2.5">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-xl bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">
                            {pIdx + 1}
                          </span>
                          <span>{item.title}</span>
                        </h4>
                        <Badge className="bg-purple-100 text-purple-800 border-none text-[10px] shrink-0 font-bold">
                          {item.propertyTested}
                        </Badge>
                      </div>

                      <p className="text-xs sm:text-sm text-purple-900 bg-indigo-50/40 p-3.5 rounded-2xl border border-indigo-100/60 mb-4 leading-relaxed">
                        {item.story}
                      </p>

                      {/* Options */}
                      <div className="space-y-2.5 mb-4">
                        {item.options.map((opt, optIdx) => {
                          const isOptionSelected = selectedIdx === optIdx;
                          let optionStyle =
                            "bg-purple-50/40 hover:bg-indigo-50/70 border-purple-100 text-purple-900";

                          if (isSubmitted) {
                            if (opt.isCorrect) {
                              optionStyle = "bg-green-100/80 border-green-400 text-green-950 font-bold ring-2 ring-green-300";
                            } else if (isOptionSelected && !opt.isCorrect) {
                              optionStyle = "bg-red-100/80 border-red-400 text-red-950 font-bold ring-2 ring-red-300";
                            } else {
                              optionStyle = "bg-gray-50 border-gray-100 text-gray-400 opacity-60";
                            }
                          } else if (isOptionSelected) {
                            optionStyle = "bg-indigo-100 border-indigo-400 text-indigo-950 font-bold ring-2 ring-indigo-300";
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectPracticeOption(item.id, optIdx)}
                              disabled={isSubmitted}
                              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between text-xs sm:text-sm ${optionStyle}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-lg bg-white border border-purple-200 flex items-center justify-center text-xs font-bold text-purple-800 shadow-2xs shrink-0">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt.label}</span>
                              </div>
                              {isSubmitted && opt.isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0 ml-2" />
                              )}
                              {isSubmitted && isOptionSelected && !opt.isCorrect && (
                                <XCircle className="w-4 h-4 text-red-600 shrink-0 ml-2" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Feedback */}
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
                            <span className="font-bold">Explicación Matemática: </span>
                            {item.options[selectedIdx]?.explanation}
                          </p>
                        </div>
                      )}

                      {!isSubmitted && (
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] text-gray-500 italic">
                            💡 Pista: {item.stepByStepHint}
                          </span>
                          <Button
                            onClick={() => handleVerifyPractice(item.id)}
                            disabled={selectedIdx === undefined}
                            className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 shadow-sm"
                          >
                            Comprobar
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-8 pt-6 border-t border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-indigo-100/70 via-purple-100/60 to-pink-100/70 p-5 rounded-3xl">
              <div>
                <p className="text-xs font-extrabold text-purple-950">
                  ¿Lista para resolver los 20 Desafíos de Razonamiento?
                </p>
                <p className="text-[11px] text-purple-600">
                  Aplica descomposición con las tablas del 4 al 12 y gana hasta 400 estrellas.
                </p>
              </div>
              <Button
                onClick={() => setActiveTab("reasoning")}
                className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs px-6 py-2.5 shadow-md shadow-indigo-200 hover:opacity-95"
              >
                Ir a los 20 Desafíos <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. DESAFÍOS DE RAZONAMIENTO (20 PROBLEMAS) */}
      {/* ======================================================== */}
      {activeTab === "reasoning" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Header Card */}
          <div className="bg-white p-5 rounded-3xl border border-indigo-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-purple-950 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                20 Desafíos de Razonamiento Lógico (Tablas del 4 al 12)
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                No hagas cálculos mecánicos: ¡descompón números en tu mente como una gran matemática!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-bold text-purple-900">Resueltos:</span>
                <p className="text-lg font-black text-indigo-600 leading-none">
                  {challengesSolvedCount} / 20
                </p>
              </div>
            </div>
          </div>

          {/* Quick Filter buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-purple-500 shrink-0">Filtrar por tabla:</span>
            {["all", "Tabla del 4", "Tabla del 6", "Tabla del 7", "Tabla del 8", "Tabla del 9", "Tabla del 11", "Tabla del 12"].map((f) => (
              <button
                key={f}
                onClick={() => setChallengeFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                  challengeFilter === f
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                }`}
              >
                {f === "all" ? "Todos (20)" : f}
              </button>
            ))}
          </div>

          {/* Challenges List */}
          <div className="space-y-5">
            {filteredChallenges.map((challenge, cIdx) => {
              const isSubmitted = challengeSubmitted[challenge.id];
              const chosenAnswer = challengeAnswers[challenge.id];
              const isCorrect = chosenAnswer === challenge.correctAnswer;

              return (
                <div
                  key={challenge.id}
                  className={`p-6 rounded-3xl bg-white border transition-all shadow-sm ${
                    isSubmitted
                      ? isCorrect
                        ? "border-green-300 ring-2 ring-green-100"
                        : "border-red-300 ring-2 ring-red-100"
                      : "border-indigo-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-extrabold text-sm sm:text-base text-purple-950 flex items-start gap-2.5">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-xl bg-amber-100 text-amber-800 text-xs font-black shrink-0 mt-0.5">
                        {challenge.id}
                      </span>
                      <span>{challenge.title}</span>
                    </h4>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Badge className="bg-indigo-100 text-indigo-800 border-none text-[10px] font-bold">
                        {challenge.tableFocus}
                      </Badge>
                      <Badge className="bg-amber-100 text-amber-900 border-none text-[10px] font-bold">
                        +{challenge.points} ⭐
                      </Badge>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-purple-900 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60 mb-3 leading-relaxed font-medium">
                    {challenge.story}
                  </p>

                  <p className="text-xs font-extrabold text-purple-950 mb-3">
                    ❓ {challenge.question}
                  </p>

                  {/* Options Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                    {challenge.options.map((optionNum) => {
                      const isSelected = chosenAnswer === optionNum;
                      let btnStyle =
                        "bg-purple-50/50 hover:bg-indigo-50 border-purple-100 text-purple-950";

                      if (isSubmitted) {
                        if (optionNum === challenge.correctAnswer) {
                          btnStyle = "bg-green-100 border-green-400 text-green-950 font-black ring-2 ring-green-300";
                        } else if (isSelected && !isCorrect) {
                          btnStyle = "bg-red-100 border-red-400 text-red-950 font-black ring-2 ring-red-300";
                        } else {
                          btnStyle = "bg-gray-50 border-gray-100 text-gray-400 opacity-50";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-indigo-100 border-indigo-400 text-indigo-950 font-black ring-2 ring-indigo-300";
                      }

                      return (
                        <button
                          key={optionNum}
                          onClick={() => handleSelectChallengeAnswer(challenge.id, optionNum)}
                          disabled={isSubmitted}
                          className={`py-3 px-4 rounded-2xl border font-bold text-sm transition-all flex items-center justify-center gap-2 ${btnStyle}`}
                        >
                          <span>{optionNum}</span>
                          {isSubmitted && optionNum === challenge.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-green-700" />
                          )}
                          {isSubmitted && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Step by Step Breakdown upon submit */}
                  {isSubmitted && (
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm space-y-2 ${
                        isCorrect
                          ? "bg-green-50 text-green-950 border border-green-200"
                          : "bg-red-50 text-red-950 border border-red-200"
                      }`}
                    >
                      <p className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-current" />
                        Técnica de Descomposición Rápida:
                      </p>
                      <p className="font-medium">{challenge.breakdownTechnique}</p>
                      <div className="pt-2 border-t border-current/10 text-[11px] opacity-90 space-y-0.5">
                        {challenge.steps.map((st, sIdx) => (
                          <p key={sIdx}>• {st}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isSubmitted && (
                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleVerifyChallenge(challenge)}
                        disabled={chosenAnswer === undefined}
                        className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2 shadow-sm"
                      >
                        Comprobar Desafío
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. TRUCOS Y TÉCNICAS MENTALES (TABLAS 3 AL 12) */}
      {/* ======================================================== */}
      {activeTab === "tricks" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Header */}
          <div className="bg-white p-6 rounded-3xl border border-pink-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">🪄</span>
                <h3 className="text-xl font-black text-purple-950">
                  Laboratorio de Trucos Mentales (Tablas del 3 al 12)
                </h3>
              </div>
              <p className="text-xs text-purple-600 mt-1">
                Aprende los atajos secretos que usan los genios de las matemáticas para calcular en milisegundos.
              </p>
            </div>

            <Badge className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-bold border-pink-200 shrink-0">
              ✨ 9 Trucos Secretos
            </Badge>
          </div>

          {/* Interactive Trick Selector */}
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
            {MATH_TRICKS.map((trick, tIdx) => (
              <button
                key={trick.tableNumber}
                onClick={() => setActiveTrickIndex(tIdx)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  activeTrickIndex === tIdx
                    ? "bg-gradient-to-tr from-pink-400 to-purple-500 text-white font-black shadow-md scale-105"
                    : "bg-white text-purple-900 border-purple-100 hover:bg-pink-50"
                }`}
              >
                <span className="text-xl block mb-0.5">{trick.emoji}</span>
                <span className="text-xs">Tabla {trick.tableNumber}</span>
              </button>
            ))}
          </div>

          {/* Active Trick Showcase */}
          {(() => {
            const curTrick = MATH_TRICKS[activeTrickIndex];
            return (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-md animate-in zoom-in-95 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-pink-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-200 to-purple-200 flex items-center justify-center text-3xl shadow-sm">
                      {curTrick.emoji}
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-pink-600">
                        Atajo Mental para la Tabla del {curTrick.tableNumber}
                      </span>
                      <h4 className="text-xl font-black text-purple-950">
                        {curTrick.title}
                      </h4>
                    </div>
                  </div>

                  <Badge className="bg-purple-100 text-purple-900 border-none font-bold text-xs px-3 py-1">
                    Multiplicador: × {curTrick.tableNumber}
                  </Badge>
                </div>

                {/* Secret Explanation */}
                <div className="bg-pink-50/70 p-5 rounded-2xl border border-pink-200 text-xs sm:text-sm text-purple-950 font-medium leading-relaxed space-y-2">
                  <p className="font-extrabold text-pink-700 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-pink-500" />
                    El Secreto Revelado:
                  </p>
                  <p>{curTrick.secret}</p>
                </div>

                {/* Interactive Simulator */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-3xl border border-purple-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-950">
                      Pruébalo tú misma cambiando el número a multiplicar:
                    </span>
                    <div className="flex items-center gap-2">
                      {[3, 4, 6, 7, 8, 9, 12].map((n) => (
                        <button
                          key={n}
                          onClick={() => setInteractiveMultiplier(n)}
                          className={`w-7 h-7 rounded-xl text-xs font-bold transition-all ${
                            interactiveMultiplier === n
                              ? "bg-purple-600 text-white shadow-sm scale-110"
                              : "bg-white text-purple-800 border border-purple-200"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-purple-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Cálculo en vivo:</p>
                      <p className="text-2xl font-black text-purple-950 font-mono">
                        {curTrick.tableNumber} × {interactiveMultiplier} ={" "}
                        <span className="text-pink-600">
                          {curTrick.tableNumber * interactiveMultiplier}
                        </span>
                      </p>
                    </div>

                    <div className="text-xs text-purple-900 bg-pink-100/60 px-4 py-2 rounded-xl border border-pink-200 font-medium">
                      💡 {curTrick.interactiveStep}
                    </div>
                  </div>
                </div>

                {/* Practical Tip */}
                <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold">Ejemplo para practicar: </span>
                    {curTrick.practicalExample}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. MINIJUEGO: CARRERA DE TABLAS */}
      {/* ======================================================== */}
      {activeTab === "speed-race" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Top Score Banner */}
          <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🏁</span>
                  <h3 className="text-2xl sm:text-3xl font-black">
                    Carrera de Tablas contra Reloj
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-lg font-medium">
                  Responde tantas multiplicaciones como puedas en 45 segundos. ¡Mantén tu racha para multiplicar tus puntos!
                </p>
              </div>

              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/30 text-center shrink-0">
                <Trophy className="w-8 h-8 text-amber-300" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-white/80 font-bold">Récord Máximo</p>
                  <p className="text-xl font-black text-amber-200 leading-tight">
                    {highScore} pts
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Game Arena */}
          {!gameActive && !gameOver ? (
            /* Start Screen */
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-100 shadow-sm text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 p-1 shadow-lg shadow-pink-200">
                <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center text-5xl">
                  ⚡
                </div>
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <h4 className="text-2xl font-black text-purple-950">
                  ¿Preparada para la gran carrera?
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Pondrás a prueba las tablas del 4 al 12. Cada acierto consecutivo activa bonos de racha con llamas mágicas 🔥.
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={startGame}
                  className="rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:opacity-95 text-white font-black text-base px-8 py-6 shadow-xl shadow-purple-200"
                >
                  <Play className="w-5 h-5 mr-2 fill-white" /> ¡INICIAR CARRERA (45s)!
                </Button>
              </div>
            </div>
          ) : gameActive && currentProblem ? (
            /* Active Game Screen */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-md space-y-6">
              {/* HUD Header */}
              <div className="flex items-center justify-between bg-purple-50 p-4 rounded-2xl border border-purple-100">
                {/* Timer */}
                <div className="flex items-center gap-2">
                  <Timer className={`w-5 h-5 ${timeLeft <= 10 ? "text-red-500 animate-bounce" : "text-purple-600"}`} />
                  <span className={`text-xl font-black ${timeLeft <= 10 ? "text-red-600 font-mono" : "text-purple-950"}`}>
                    {timeLeft}s
                  </span>
                </div>

                {/* Streak */}
                <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-purple-200">
                  <Flame className={`w-4 h-4 ${gameStreak > 0 ? "fill-amber-400 text-amber-500 animate-pulse" : "text-gray-300"}`} />
                  <span className="text-xs font-extrabold text-purple-900">
                    Racha: x{gameStreak}
                  </span>
                </div>

                {/* Score */}
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Puntaje</span>
                  <span className="text-xl font-black text-pink-600 leading-none">
                    {gameScore} pts
                  </span>
                </div>
              </div>

              {/* Progress bar of time */}
              <Progress value={(timeLeft / 45) * 100} className="h-2.5 bg-purple-100" />

              {/* Big Equation Card */}
              <div className="py-8 text-center space-y-2 bg-gradient-to-b from-purple-50/60 to-pink-50/40 rounded-3xl border border-purple-200/80 shadow-inner">
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-500">
                  ¿Cuánto es?
                </span>
                <h3 className="text-5xl sm:text-6xl font-black text-purple-950 font-mono tracking-tight">
                  {currentProblem.num1} × {currentProblem.num2}
                </h3>
              </div>

              {/* 4 Large Choice Buttons */}
              <div className="grid grid-cols-2 gap-4">
                {currentProblem.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerRace(opt)}
                    className="py-6 px-4 rounded-3xl bg-white border-2 border-purple-200 hover:border-pink-400 hover:bg-pink-50/60 active:scale-95 text-2xl sm:text-3xl font-black text-purple-950 shadow-sm transition-all flex items-center justify-center font-mono"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Game Over Podio */
            <div className="bg-white rounded-3xl p-8 border border-purple-200 shadow-md text-center space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-300 to-pink-400 p-1 shadow-lg shadow-pink-200">
                <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center text-4xl">
                  🏅
                </div>
              </div>

              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-purple-950">
                  ¡Carrera Completada!
                </h4>
                <p className="text-xs sm:text-sm text-purple-600 mt-1">
                  ¡Gran demostración de agilidad y cálculo mental!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="bg-pink-50 p-4 rounded-2xl border border-pink-200">
                  <p className="text-[11px] text-pink-700 font-bold uppercase">Puntaje Final</p>
                  <p className="text-2xl font-black text-pink-900">{gameScore} pts</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                  <p className="text-[11px] text-amber-700 font-bold uppercase">Máxima Racha</p>
                  <p className="text-2xl font-black text-amber-900">🔥 x{maxStreak}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <Button
                  onClick={startGame}
                  className="rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm px-7 py-3 shadow-md shadow-pink-200"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Jugar Otra Vez
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("properties")}
                  className="rounded-3xl border-purple-200 text-purple-700 text-sm"
                >
                  Volver a las Lecciones
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};