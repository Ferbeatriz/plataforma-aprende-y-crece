import React, { useState } from "react";
import { Search, Sparkles, BookOpen, Info, Shield, Wand2, Sun, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { diosesData, DiosGlosario } from "@/data/glosarioDioses";

const GodDetailCard: React.FC<{ god: DiosGlosario }> = ({ god }) => {
  return (
    <div className="bg-white rounded-[40px] overflow-hidden border border-amber-100 shadow-xl shadow-amber-900/5 hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500 group flex flex-col h-full">
      {/* Imagen del Dios con fondo decorativo */}
      <div className="relative h-64 bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-200 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-200 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <img
          src={god.imagenUrl}
          alt={`Imagen de ${god.nombre}, ${god.representacion}`}
          className="w-48 h-48 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 z-10"
        />
        
        <div className="absolute bottom-4 right-4">
          <Badge className="bg-amber-100 text-amber-800 border-amber-200 font-bold px-3 py-1 rounded-full shadow-sm">
            {god.divinidadGriega !== "Sin equivalente" ? `~ ${god.divinidadGriega}` : "Mitología Egipcia"}
          </Badge>
        </div>
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-8 flex flex-col flex-1 bg-white">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">✨</span>
            <h3 className="text-2xl font-black text-purple-950 tracking-tight">{god.nombre}</h3>
          </div>
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Nombre Egipcio: {god.nombreEgipcio}
          </p>
        </div>

        <div className="space-y-4 flex-1">
          <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100">
            <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-tighter mb-1 flex items-center gap-1">
              <Info className="w-3 h-3" /> Representación
            </h4>
            <p className="text-sm text-purple-900 font-medium leading-tight italic">
              "{god.representacion}"
            </p>
          </div>

          <div className="relative">
            <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-tighter mb-2 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Historia Mágica
            </h4>
            <p className="text-sm text-purple-950 leading-relaxed font-medium">
              {god.sinopsisResumida}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-amber-50 flex items-center justify-between">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-amber-600 shadow-sm" title="Poder Solar">
              <Sun className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-purple-600 shadow-sm" title="Protección">
              <Shield className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-pink-600 shadow-sm" title="Sabiduría">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          
          <Button variant="ghost" className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:bg-amber-50 rounded-xl px-4 h-9">
            Saber más <Sparkles className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const GlosarioDiosesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGods = diosesData.filter((god) =>
    god.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    god.representacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    god.nombreEgipcio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 p-4 sm:p-0">
      {/* Hero Section del Glosario */}
      <div className="relative bg-gradient-to-r from-purple-900 to-indigo-950 rounded-[50px] p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
        {/* Decoraciones de fondo */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 text-6xl rotate-12">☀️</div>
          <div className="absolute bottom-10 right-10 text-6xl -rotate-12">🪲</div>
          <div className="absolute top-1/2 left-1/4 text-4xl opacity-50">⚖️</div>
          <div className="absolute top-1/3 right-1/4 text-5xl opacity-50">👁️</div>
        </div>

        <div className="relative z-10 space-y-6">
          <Badge className="bg-amber-400 text-amber-950 border-none font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-widest shadow-lg">
            Enciclopedia Mágica
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            El Gran Glosario de los <span className="text-amber-400">Dioses Egipcios</span>
          </h1>
          <p className="text-purple-100/80 text-lg sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Explora las historias, poderes y secretos de las divinidades que vivieron a orillas del Nilo hace miles de años.
          </p>

          <div className="max-w-xl mx-auto relative group pt-4">
            <div className="absolute inset-0 bg-amber-400/20 blur-2xl group-hover:bg-amber-400/30 transition-all"></div>
            <div className="relative flex items-center bg-white rounded-3xl p-2 shadow-2xl border-2 border-white/20">
              <div className="pl-4 pr-2">
                <Search className="w-6 h-6 text-purple-300" />
              </div>
              <Input
                placeholder="Busca a tu dios favorito (ej: Ra, Isis, Gato...)"
                className="border-none focus-visible:ring-0 text-purple-950 text-lg placeholder:text-purple-200 h-14"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="hidden sm:flex bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-8 h-12 font-bold shadow-lg">
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados del Glosario */}
      {filteredGods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredGods.map((god) => (
            <GodDetailCard key={god.nombre} god={god} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-purple-100">
          <div className="text-6xl mb-6">🔍</div>
          <h3 className="text-2xl font-black text-purple-950 mb-2">No encontramos ese misterio</h3>
          <p className="text-purple-400 font-medium">Prueba con otro nombre o asegúrate de que esté bien escrito.</p>
          <Button 
            variant="outline" 
            onClick={() => setSearchTerm("")}
            className="mt-6 rounded-2xl border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            Ver todos los dioses
          </Button>
        </div>
      )}

      {/* Footer del Glosario */}
      <div className="bg-amber-100/50 rounded-[40px] p-8 sm:p-12 border border-amber-200 flex flex-col sm:flex-row items-center gap-8 justify-between">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-amber-200 flex items-center justify-center text-4xl shadow-inner">
            🏺
          </div>
          <div>
            <h4 className="text-xl font-black text-amber-900">¿Sabías que...?</h4>
            <p className="text-amber-800/80 font-medium max-w-md">
              Los egipcios tenían más de 2,000 dioses diferentes. Cada uno representaba algo importante de la naturaleza o la vida diaria.
            </p>
          </div>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700 text-white font-black px-10 py-6 rounded-3xl shadow-xl shadow-amber-600/20 text-lg">
          ¡Aprender más curiosidades! <Wand2 className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};
