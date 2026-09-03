import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, ScrollText, Pyramid, BookOpen } from 'lucide-react';

const HistoriaModuleView: React.FC = () => {
  const navigate = useNavigate();

  const civilizaciones = [
    {
      id: 'egipto',
      titulo: 'Antiguo Egipto',
      descripcion: 'Pirámides, faraones, jeroglíficos y dioses.',
      icon: Pyramid,
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      textColor: 'text-teal-700',
      ruta: '/historia/egipto',
    },
    {
      id: 'grecia',
      titulo: 'Antigua Grecia',
      descripcion: 'Democracia, filosofía, Juegos Olímpicos y mitología.',
      icon: Landmark,
      bgColor: 'bg-edu-cream',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      ruta: '/historia/grecia',
    },
    {
      id: 'roma',
      titulo: 'Antigua Roma',
      descripcion: 'Acueductos, derecho romano, coliseo y latín.',
      icon: ScrollText,
      bgColor: 'bg-edu-rose',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-700',
      ruta: '/historia/roma',
    },
  ];

  const handleClick = (civ: typeof civilizaciones[0]) => {
    navigate(civ.ruta);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2 text-edu-purple">📜 Historia Universal</h1>
      <p className="text-gray-500 mb-8">Viajes en el tiempo y grandes civilizaciones</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {civilizaciones.map((civ) => (
          <div
            key={civ.id}
            onClick={() => handleClick(civ)}
            className={`${civ.bgColor} border ${civ.borderColor} rounded-3xl p-6 cursor-pointer hover:-translate-y-1 transition-transform shadow-sm`}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm">
                <civ.icon size={32} className={civ.textColor} />
              </div>
              <div className="flex-1">
                <h2 className={`text-xl font-bold ${civ.textColor} mb-2`}>{civ.titulo}</h2>
                <p className="text-gray-600 text-sm">{civ.descripcion}</p>
                <button className={`mt-4 ${civ.textColor} font-semibold text-sm hover:underline`}>
                  Ver lección →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoriaModuleView;