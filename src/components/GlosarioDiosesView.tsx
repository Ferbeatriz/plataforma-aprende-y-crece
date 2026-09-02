import React from 'react';
import { diosesData } from '../data/glosarioDioses';

interface Dios {
  nombre: string;
  nombreEgipcio: string;
  nombreGrecoRomano: string;
  divinidadGriega: string;
  representacion: string;
  sinopsis: string;
}

export const GlosarioDiosesView: React.FC = () => {
  // Usar los datos importados del JSON
  const dioses: Dios[] = diosesData;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        📜 Glosario de Dioses Egipcios
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Conoce a los principales dioses del antiguo Egipto
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dioses.map((dios, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-4">
              <h2 className="text-xl font-bold text-blue-800">{dios.nombre}</h2>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="font-semibold">Nombre egipcio:</span> {dios.nombreEgipcio || 'No especificado'}</p>
                <p><span className="font-semibold">Nombre griego/romano:</span> {dios.nombreGrecoRomano || 'No especificado'}</p>
                <p><span className="font-semibold">Divinidad griega:</span> {dios.divinidadGriega || 'No especificado'}</p>
                <p><span className="font-semibold">Representación:</span> {dios.representacion || 'No especificado'}</p>
              </div>
              <div className="mt-3">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {dios.sinopsis ? (
                    <span>{dios.sinopsis.substring(0, 200)}...</span>
                  ) : (
                    <span className="text-gray-400">Sinopsis no disponible</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlosarioDiosesView;