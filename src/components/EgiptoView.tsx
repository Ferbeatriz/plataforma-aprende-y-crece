import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlosarioDiosesView from './GlosarioDiosesView';

const EgiptoView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate('/historia')}
        className="mb-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        ← Volver a Historia Universal
      </button>

      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        🌍 Antiguo Egipto
      </h1>

      {/* Lección de Egipto */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">📖 La lección de Egipto</h2>
        <p className="text-gray-700 leading-relaxed">
          {/* Aquí va el texto de la lección del Antiguo Egipto */}
          El Antiguo Egipto fue una de las civilizaciones más fascinantes de la historia...
        </p>
      </div>

      {/* Glosario de dioses */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">📜 Glosario de Dioses Egipcios</h2>
        <GlosarioDiosesView />
      </div>
    </div>
  );
};

export default EgiptoView;