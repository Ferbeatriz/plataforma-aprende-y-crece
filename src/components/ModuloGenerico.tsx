import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  ChevronRight, 
  ClipboardCheck, 
  Lightbulb, 
  Gamepad2, 
  FileQuestion
} from "lucide-react";

interface Actividad {
  nombre: string;
  descripcion: string;
  icono: React.ElementType;
  colorBg: string;
  colorText: string;
}

const ACTIVIDADES_ESTANDAR: Actividad[] = [
  { 
    nombre: "Evaluaciones", 
    descripcion: "Pon a prueba lo que has aprendido.", 
    icono: ClipboardCheck, 
    colorBg: "bg-edu-lavender", 
    colorText: "text-edu-purple" 
  },
  { 
    nombre: "Trivias", 
    descripcion: "¡Responde rápido y gana puntos!", 
    icono: Lightbulb, 
    colorBg: "bg-edu-yellow", 
    colorText: "text-amber-600" 
  },
  { 
    nombre: "Juegos", 
    descripcion: "Aprende divirtiéndote con misiones.", 
    icono: Gamepad2, 
    colorBg: "bg-edu-pink", 
    colorText: "text-edu-rose" 
  },
  { 
    nombre: "Cuestionarios", 
    descripcion: "Repasa los conceptos clave.", 
    icono: FileQuestion, 
    colorBg: "bg-sky-50", 
    colorText: "text-sky-600" 
  },
];

const ModuloGenerico: React.FC = () => {
  const { id, subid } = useParams(); // Lee el id y subid de la ruta
  const navigate = useNavigate();

  const contenido = {
    lenguaje: {
      nombre: "Lenguaje",
      descripcion: "Lectura, escritura y comunicación.",
      color: "bg-edu-rose",
      actividades: ACTIVIDADES_ESTANDAR,
    },
    historia: {
      nombre: "Historia y Geografía",
      descripcion: "Historia Universal, Historia de Chile y más.",
      color: "bg-edu-cream",
      submodulos: [
        { 
          id: "egipto",
          nombre: "Antiguo Egipto", 
          ruta: "/modulo/historia/egipto", 
          icono: "🐪",
          descripcion: "Pirámides, faraones y el Nilo.",
          actividades: ACTIVIDADES_ESTANDAR
        },
        { 
          id: "grecia",
          nombre: "Antigua Grecia", 
          ruta: "/modulo/historia/grecia", 
          icono: "🏛️",
          descripcion: "Democracia, mitos y olimpiadas.",
          actividades: ACTIVIDADES_ESTANDAR
        },
        { 
          id: "roma",
          nombre: "Antigua Roma", 
          ruta: "/modulo/historia/roma", 
          icono: "🏺",
          descripcion: "Gladiadores, leyes y acueductos.",
          actividades: ACTIVIDADES_ESTANDAR
        },
      ],
    },
    matematicas: {
      nombre: "Matemáticas",
      descripcion: "Números, geometría y lógica.",
      color: "bg-edu-lavender",
      actividades: ACTIVIDADES_ESTANDAR,
    },
    ingles: {
      nombre: "Inglés",
      descripcion: "Aprende vocabulario y gramática en inglés de forma divertida.",
      color: "bg-sky-50",
      actividades: ACTIVIDADES_ESTANDAR,
    },
    ciencias: {
      nombre: "Ciencias",
      descripcion: "Descubre los secretos de la naturaleza y el universo.",
      color: "bg-green-50",
      actividades: ACTIVIDADES_ESTANDAR,
    },
  };

  const moduleData = contenido[id as keyof typeof contenido] || contenido.lenguaje;
  
  // Si hay un subid, buscamos los datos del submodulo
  const subModuleData = (moduleData as any).submodulos?.find((s: any) => s.id === subid);
  
  const displayData = subModuleData || moduleData;
  const actividades = displayData.actividades || (moduleData as any).actividades || [];

  return (
    <div className="p-8 animate-in fade-in duration-700">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm hover:bg-gray-50 text-sm font-bold border border-slate-100 transition-all"
      >
        <ArrowLeft size={16} /> Volver
      </button>

      <div className={`${displayData.color || moduleData.color} rounded-[40px] p-8 mb-10 shadow-sm border border-black/5`}>
        <div className="flex items-center gap-4 mb-2">
          {subModuleData && <span className="text-4xl">{subModuleData.icono}</span>}
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">{displayData.nombre}</h1>
        </div>
        <p className="text-slate-600 font-medium text-lg">{displayData.descripcion}</p>
      </div>

      {/* SECCIÓN DE SUBMÓDULOS (Si estamos en la vista de Historia general) */}
      {(moduleData as any).submodulos && !subid && (
        <div className="mb-12">
          <h2 className="text-[11px] font-black mb-6 text-slate-400 uppercase tracking-widest flex items-center gap-4">
            <span>Explora las Civilizaciones</span>
            <div className="h-px bg-slate-100 flex-1"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(moduleData as any).submodulos.map((sub: any) => (
              <Link
                key={sub.id}
                to={sub.ruta}
                className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-edu-lavender transition-all flex items-center gap-5"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                  {sub.icono}
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-slate-900 group-hover:text-edu-purple transition-colors">{sub.nombre}</h3>
                  <p className="text-xs text-slate-400 font-medium">{sub.descripcion}</p>
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-edu-purple transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* SECCIÓN DE ACTIVIDADES */}
      <div>
        <h2 className="text-[11px] font-black mb-6 text-slate-400 uppercase tracking-widest flex items-center gap-4">
          <span>Actividades Disponibles</span>
          <div className="h-px bg-slate-100 flex-1"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actividades.map((act: Actividad) => {
            const Icon = act.icono;
            return (
              <div 
                key={act.nombre}
                className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-2xl ${act.colorBg} ${act.colorText} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                  <Icon size={32} />
                </div>
                <h3 className="font-black text-xl mb-3 text-slate-900">{act.nombre}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {act.descripcion}
                </p>
                <div className="mt-6 w-full pt-6 border-t border-slate-50 flex justify-center">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${act.colorText}`}>
                    ¡Comenzar ahora!
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModuloGenerico;