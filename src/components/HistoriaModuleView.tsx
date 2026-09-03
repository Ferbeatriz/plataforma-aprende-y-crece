import React from 'react';
import { useNavigate } from 'react-router-dom';

const HistoriaModuleView: React.FC = () => {
  const navigate = useNavigate();

  const lecciones = [
    {
      id: 'grecia',
      titulo: '🏛️ Antigua Grecia',
      descripcion: 'Democracia, filosofía, Juegos Olímpicos y mitología.',
      imagen: '/images/grecia.jpg',
      ruta: '/historia/grecia',
    },
    {
      id: 'roma',
      titulo: '🏟️ Antigua Roma',
      descripcion: 'Acueductos, derecho romano, coliseo y latín.',
      imagen: '/images/roma.jpg',
      ruta: '/historia/roma',
    },
    {
      id: 'egipto',
      titulo: '🌍 Antiguo Egipto',
      descripcion: 'Pirámides, faraones, jeroglíficos y dioses.',
      imagen: '/images/egipto.jpg',
      ruta: '/historia/egipto',
    },
  ];

  const handleClick = (leccion: typeof lecciones[0]) => {
    if (leccion.id === 'egipto') {
      // Navegar a una vista que muestre la lección de Egipto con el glosario
      navigate('/historia/egipto');
    } else {
      navigate(leccion.ruta);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        📜 Historia Universal
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lecciones.map((leccion) => (
          <div
            key={leccion.id}
            onClick={() => handleClick(leccion)}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer"
          >
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <span className="text-6xl">{leccion.titulo.split(' ')[0]}</span>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-blue-800">{leccion.titulo}</h2>
              <p className="text-gray-600 text-sm mt-2">{leccion.descripcion}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                Ver lección →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoriaModuleView;