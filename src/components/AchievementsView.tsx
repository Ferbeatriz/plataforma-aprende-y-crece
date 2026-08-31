import React from "react";
import { AchievementBadge } from "@/types";
import { Trophy, Star, Lock, Sparkles, ArrowLeft, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { triggerConfetti } from "@/utils/confetti";

interface AchievementsViewProps {
  achievements: AchievementBadge[];
  totalStars: number;
  onBack: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  achievements,
  totalStars,
  onBack,
}) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const progressPercent = (unlockedCount / achievements.length) * 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 text-white shadow-lg relative overflow-hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-xs font-semibold transition-all mb-3 text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Inicio</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏅</span>
              <h1 className="text-2xl sm:text-3xl font-black">Álbum de Logros y Medallas</h1>
            </div>
            <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-lg font-medium">
              Colecciona stickers mágicos mientras completas lecciones y superas desafíos diarios.
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 text-center shrink-0">
            <p className="text-xs text-white/90 font-bold uppercase tracking-wider">Tus Estrellas</p>
            <p className="text-2xl font-black text-amber-200 flex items-center justify-center gap-1">
              <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
              {totalStars}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-purple-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-between text-xs font-bold text-purple-950">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-pink-500" />
              Progreso del Álbum: {unlockedCount} de {achievements.length} Medallas
            </span>
            <span className="text-pink-600 font-extrabold">{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-3 bg-purple-100" />
        </div>
        <Button
          onClick={triggerConfetti}
          className="rounded-2xl bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold text-xs shrink-0"
        >
          ✨ Mostrar Brillo
        </Button>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((badge) => {
          const isUnlocked = badge.unlocked;

          return (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isUnlocked
                  ? "bg-gradient-to-br from-white via-pink-50/40 to-purple-50/30 border-pink-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  : "bg-gray-50/80 border-gray-200/80 opacity-75"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${
                      isUnlocked
                        ? "bg-gradient-to-tr from-pink-200 to-purple-200"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {isUnlocked ? badge.icon : <Lock className="w-6 h-6 text-gray-400" />}
                  </div>

                  {isUnlocked ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-green-600" /> Desbloqueado
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {badge.requiredStars} pts
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-sm text-purple-950">
                  {badge.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {badge.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-purple-50 text-[11px] text-purple-500 font-medium">
                {isUnlocked ? (
                  <span className="text-pink-600 font-semibold">🎉 ¡Conseguido!</span>
                ) : (
                  <span className="text-gray-400">Te faltan {Math.max(0, badge.requiredStars - totalStars)} estrellas</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};