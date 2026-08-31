import React, { useState } from "react";
import { CuriosityFact } from "@/types";
import { Compass, Sparkles, ArrowLeft, Heart, Share2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { triggerConfetti } from "@/utils/confetti";

interface CuriositiesViewProps {
  facts: CuriosityFact[];
  onBack: () => void;
}

export const CuriositiesView: React.FC<CuriositiesViewProps> = ({
  facts,
  onBack,
}) => {
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    setLikedIds((prev) => {
      const isLiked = !prev[id];
      if (isLiked) {
        triggerConfetti();
        toast.success("¡Agregado a tus favoritos! 💖");
      }
      return { ...prev, [id]: isLiked };
    });
  };

  const handleShare = (title: string) => {
    toast.info(`¡Copiada la curiosidad: "${title}"!`, {
      description: "Compártela con tus amigas o tu profesora.",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-white shadow-lg relative overflow-hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-xs font-semibold transition-all mb-3 text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Inicio</span>
        </button>

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🔮</span>
            <h1 className="text-2xl sm:text-3xl font-black">Club de Curiosidades Mágicas</h1>
          </div>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl font-medium">
            Datos asombrosos del mundo de las letras, la historia y la ciencia que te dejarán con la boca abierta.
          </p>
        </div>
      </div>

      {/* Fact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {facts.map((fact) => {
          const isLiked = likedIds[fact.id];

          return (
            <div
              key={fact.id}
              className="bg-white rounded-3xl p-6 border border-purple-100/90 shadow-sm hover:shadow-md hover:border-pink-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2 bg-pink-50 rounded-2xl">{fact.emoji}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
                    {fact.category}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-purple-950 mb-2">
                  {fact.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  {fact.content}
                </p>

                {/* Fun highlight box */}
                <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3 text-xs text-amber-900 font-medium flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold">Dato Chispeante: </span>
                    {fact.funFact}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-purple-50">
                <span className="text-[11px] text-gray-400 font-medium italic">
                  Fuente: {fact.author}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleLike(fact.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      isLiked
                        ? "bg-pink-100 border-pink-300 text-pink-600"
                        : "bg-gray-50 border-gray-200 text-gray-400 hover:text-pink-500"
                    }`}
                    title="Guardar en favoritos"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-pink-500" : ""}`} />
                  </button>
                  <button
                    onClick={() => handleShare(fact.title)}
                    className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:text-purple-600 transition-all"
                    title="Compartir"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};