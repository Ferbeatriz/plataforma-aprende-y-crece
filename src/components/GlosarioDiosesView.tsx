import React, { useState } from 'react';
import { diosesData } from '../data/glosarioDioses';
import { imagenesDioses } from '../data/imagenesDioses';

interface Dios {
  nombre: string;
  nombreEgipcio: string;
  nombreGrecoRomano: string;
  divinidadGriega: string;
  representacion: string;
  sinopsis: string;
}

export const GlosarioDiosesView: React.FC = () => {
  const dioses: Dios[] = diosesData;
  const [selectedGod, setSelectedGod] = useState<Dios | null>(null);

  const openModal = (dios: Dios) => {
    setSelectedGod(dios);
  };

  const closeModal = () => {
    setSelectedGod(null);
  };

  // 🔑 FUNCIÓN PARA OBTENER LA IMAGEN DEL DIOS
  const getImageUrl = (nombre: string): string => {
    // Buscar la imagen en el mapeo, o usar una imagen por defecto
    return imagenesDioses[nombre] || 'https://via.placeholder.com/150x150?text=Sin+imagen';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        📜 Glosario de Dioses Egipcios
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Haz clic en cualquier dios para ver toda su información
      </p>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dioses.map((dios, index) => (
          <div
            key={index}
            onClick={() => openModal(dios)}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer flex flex-col"
          >
            <div className="flex p-4">
              {/* Imagen a la izquierda */}
              <div className="flex-shrink-0 mr-4">
                <img
                  src={getImageUrl(dios.nombre)}
                  alt={dios.nombre}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                />
              </div>
              {/* Información a la derecha */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-blue-800">{dios.nombre}</h2>
                <div className="mt-1 space-y-1 text-sm">
                  <p><span className="font-semibold">Nombre egipcio:</span> {dios.nombreEgipcio || 'No especificado'}</p>
                  <p><span className="font-semibold">Representación:</span> {dios.representacion || 'No especificado'}</p>
                </div>
                <div className="mt-2">
                  <p className="text-gray-700 text-xs leading-relaxed">
                    {dios.sinopsis ? (
                      <span>{dios.sinopsis.substring(0, 80)}...</span>
                    ) : (
                      <span className="text-gray-400">Sinopsis no disponible</span>
                    )}
                  </p>
                </div>
                <div className="mt-2 text-blue-500 text-xs font-medium">
                  Haz clic para leer más →
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Vista detallada */}
      {selectedGod && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-blue-800">{selectedGod.nombre}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Imagen en el modal */}
            <div className="flex flex-col md:flex-row gap-6 mb-4">
              <div className="flex-shrink-0">
                <img
                  src={getImageUrl(selectedGod.nombre)}
                  alt={selectedGod.nombre}
                  className="w-48 h-48 object-cover rounded-lg border border-gray-200"
                />
              </div>
              <div className="flex-1 space-y-3 text-gray-700">
                <p><span className="font-semibold">Nombre egipcio:</span> {selectedGod.nombreEgipcio || 'No especificado'}</p>
                <p><span className="font-semibold">Nombre griego/romano:</span> {selectedGod.nombreGrecoRomano || 'No especificado'}</p>
                <p><span className="font-semibold">Divinidad griega:</span> {selectedGod.divinidadGriega || 'No especificado'}</p>
                <p><span className="font-semibold">Representación:</span> {selectedGod.representacion || 'No especificado'}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="font-bold text-lg text-blue-700 mb-2">📖 Sinopsis completa</h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                {selectedGod.sinopsis || 'Sinopsis no disponible'}
              </p>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};