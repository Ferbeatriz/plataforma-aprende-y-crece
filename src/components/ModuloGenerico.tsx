import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ModuloGenerico: React.FC = () => {
  const { id } = useParams(); // Lee el id de la ruta (ej: "historia", "lenguaje")
  const navigate = useNavigate();

  // Aquí puedes crear un array de datos según el id
  const contenido = {
    lenguaje: {
      nombre: "Lenguaje",
      descripcion: "Lectura, escritura y comunicación.",
      color: "bg-edu-rose",
    },
    historia: {
      nombre: "Historia y Geografía",
      descripcion: "Historia Universal, Historia de Chile y más.",
      color: "bg-edu-cream",
    },
    matematicas: {
      nombre: "Matemáticas",
      descripcion: "Números, geometría y lógica.",
      color: "bg-edu-lavender",
    },
    // Agrega más módulos aquí...
  };

  const data = contenido[id as keyof typeof contenido] || contenido.lenguaje;

  return (
    <div className="p-8">
      <button
        onClick={() => navigate("/")}
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-semibold"
      >
        <ArrowLeft size={16} /> Volver al panel
      </button>

      <div className={`${data.color} rounded-3xl p-8 mb-8`}>
        <h1 className="text-3xl font-bold">{data.nombre}</h1>
        <p className="mt-2 text-gray-700">{data.descripcion}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <h3 className="font-bold mb-2">Lecciones</h3>
          <p className="text-sm text-gray-600">Contenido educativo interactivo.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <h3 className="font-bold mb-2">Trivias</h3>
          <p className="text-sm text-gray-600">Pon a prueba tus conocimientos.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <h3 className="font-bold mb-2">Juegos</h3>
          <p className="text-sm text-gray-600">Aprende jugando.</p>
        </div>
      </div>
    </div>
  );
};

export default ModuloGenerico;