// src/components/DashboardHistoria.tsx
import { Search, Star, ChevronDown, ArrowLeft, ScrollText, Landmark, BookOpen } from "lucide-react";
import { sidebarItems, historyModules } from "@/data/modules";

export default function DashboardHistoria() {
  return (
    <div className="flex min-h-screen bg-edu-bg text-slate-800">
      
      {/* ================= SIDEBAR IZQUIERDO ================= */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-6 sticky top-0 h-screen">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-edu-purple/10 rounded-full text-edu-purple">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-edu-purple leading-none">EduSphere</h1>
            <span className="text-xs text-edu-pink font-bold">Kids</span>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 -mt-4">Aprende, Sueña y Descubre ✨</p>

        {/* Navegación */}
        <nav className="flex flex-col gap-2 mt-4">
          <span className="text-xs font-bold uppercase text-gray-400 mb-2">Mis Asignaturas</span>
          
          {sidebarItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                item.active 
                  ? "bg-edu-cream text-yellow-700 font-bold border border-yellow-200" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </div>
              {item.temas && <span className="text-xs bg-white px-2 py-1 rounded-full shadow-sm">{item.temas}</span>}
            </a>
          ))}
        </nav>
      </aside>

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Barra Superior */}
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar lecciones, historias o juegos..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full border border-gray-200 focus:outline-none focus:border-edu-purple text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
              <Star className="text-edu-yellow fill-edu-yellow" size={18} />
              <span className="font-bold text-gray-700">340 pts</span>
            </div>
            <button className="flex items-center gap-2 bg-edu-rose px-4 py-2 rounded-full text-sm font-semibold text-edu-pink hover:bg-pink-100 transition">
              🦊 Estudiante <ChevronDown size={14} />
            </button>
          </div>
        </header>

        {/* Banner Hero (Historia Universal) */}
        <section className="bg-gradient-to-r from-edu-yellow to-edu-pink rounded-3xl p-8 text-white mb-8 shadow-lg relative overflow-hidden">
          <div className="max-w-2xl">
            <button className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs mb-6 flex items-center gap-2 hover:bg-white/30 transition">
              <ArrowLeft size={14} /> Volver al panel general
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-3 rounded-2xl">
                <Landmark size={40} />
              </div>
              <h2 className="text-4xl font-extrabold">Historia Universal</h2>
            </div>
            
            <p className="text-lg mb-2 font-medium">Viajes en el tiempo y grandes civilizaciones</p>
            <p className="text-sm opacity-90">
              Descubre pirámides, castillos medievales, inventos fascinantes y a las mujeres y hombres que cambiaron el mundo.
            </p>
          </div>
          <div className="absolute top-8 right-8 bg-white/20 px-4 py-2 rounded-full text-sm">
            Egipto, Grecia y Roma
          </div>
        </section>

        {/* Grid de Submódulos (Desde el archivo de datos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {historyModules.map((module, index) => (
            <div 
              key={index}
              className={`${module.bgColor} border ${module.borderColor} rounded-3xl p-6 flex gap-5 items-start cursor-pointer hover:-translate-y-1 transition-transform shadow-sm`}
            >
              <div className="p-3 bg-white rounded-2xl shadow-sm">
                <module.icon size={32} className={module.textColor} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`text-xl font-bold ${module.textColor}`}>{module.title}</h3>
                  {module.isActive && (
                    <span className="bg-edu-purple text-white text-[10px] px-2 py-0.5 rounded-full">Activa</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{module.description}</p>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}