// src/components/VistaAntiguoEgipto.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, BookOpen, ListChecks, Trophy, Puzzle } from "lucide-react";
import  antiguoEgipto  from "@/data/antiguoEgipto";

const VistaAntiguoEgipto: React.FC = () => {
  const navigate = useNavigate();
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});
  const [puntaje, setPuntaje] = useState<number | null>(null);

  const handleRespuesta = (preguntaIndex: number, opcionIndex: number) => {
    setRespuestas({ ...respuestas, [preguntaIndex]: opcionIndex });
  };

  const evaluarQuiz = () => {
    let correctas = 0;
    antiguoEgipto.secciones.forEach((seccion) => {
      if (seccion.tipo === "quiz") {
        seccion.preguntas.forEach((pregunta, idx) => {
          if (respuestas[idx] === pregunta.respuestaCorrecta) correctas++;
        });
      }
    });
    setPuntaje(correctas);
  };

  return (
    <div className="p-8">
      <button
        onClick={() => navigate("/modulo/historia/historia-universal")}
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-semibold"
      >
        <ArrowLeft size={16} /> Volver a Historia Universal
      </button>

      <div className="bg-teal-50 rounded-3xl p-8 mb-8 border border-teal-200">
        <h1 className="text-3xl font-bold text-teal-700">{antiguoEgipto.titulo}</h1>
        <p className="mt-2 text-gray-700">{antiguoEgipto.objetivos[0]}</p>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <span className="px-3 py-1 rounded-full bg-white text-sm">⏱️ {antiguoEgipto.duracion}</span>
          <span className="px-3 py-1 rounded-full bg-white text-sm">🏆 {antiguoEgipto.insignia}</span>
          <span className="px-3 py-1 rounded-full bg-white text-sm">📊 {antiguoEgipto.dificultad}</span>
        </div>
      </div>

      {/* VIDEO */}
      {antiguoEgipto.videoUrl && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🎬 Video</h2>
          <div className="bg-white rounded-3xl p-4 border border-gray-200">
            <iframe
              width="100%"
              height="400"
              src={antiguoEgipto.videoUrl}
              title="Video del módulo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* LECTURAS */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">📖 Contenido Nuclear</h2>
        <div className="bg-white rounded-3xl p-6 border border-gray-200">
          {antiguoEgipto.secciones
            .filter((s) => s.tipo === "lectura")
            .flatMap((s) => s.contenido)
            .map((parrafo, idx) => (
              <p key={idx} className="mb-4 text-gray-700">{parrafo}</p>
            ))}
        </div>
      </div>

      {/* GLOSARIO */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">📚 Glosario</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {antiguoEgipto.secciones
            .filter((s) => s.tipo === "glosario")
            .flatMap((s) => s.terminos)
            .map((termino) => (
              <div key={termino.termino} className="bg-white p-4 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-lg">{termino.emoji} {termino.termino}</h3>
                <p className="text-sm text-gray-600">{termino.definicion}</p>
              </div>
            ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">📊 Línea de Tiempo</h2>
        <div className="bg-white p-6 rounded-3xl border border-gray-200">
          <ul>
            {antiguoEgipto.secciones
              .filter((s) => s.tipo === "timeline")
              .flatMap((s) => s.eventos)
              .map((evento) => (
                <li key={evento.fecha} className="mb-4 flex gap-4">
                  <span className="font-bold text-teal-700">{evento.fecha}</span>
                  <span>{evento.evento}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* QUIZ */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">✅ Quiz</h2>
        <div className="bg-white rounded-3xl p-6 border border-gray-200">
          {antiguoEgipto.secciones
            .filter((s) => s.tipo === "quiz")
            .flatMap((s) => s.preguntas)
            .map((pregunta, idx) => (
              <div key={idx} className="mb-6">
                <p className="font-bold mb-2">{idx + 1}. {pregunta.pregunta}</p>
                <div className="flex flex-col gap-2">
                  {pregunta.opciones.map((opcion, opIdx) => (
                    <button
                      key={opIdx}
                      onClick={() => handleRespuesta(idx, opIdx)}
                      className={`text-left px-4 py-2 rounded-xl border ${
                        respuestas[idx] === opIdx ? "bg-teal-100 border-teal-500" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          <button onClick={evaluarQuiz} className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-full font-bold">
            Evaluar Quiz
          </button>
          {puntaje !== null && (
            <p className="mt-4 font-bold">
              Puntaje: {puntaje} / {antiguoEgipto.secciones.filter((s) => s.tipo === "quiz").flatMap((s) => s.preguntas).length}
            </p>
          )}
        </div>
      </div>

      {/* ACTIVIDAD */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">🎮 Actividad</h2>
        <div className="bg-edu-cream rounded-3xl p-6 border border-yellow-200">
          <h3 className="font-bold text-lg mb-2">{antiguoEgipto.secciones.filter((s) => s.tipo === "actividad")[0]?.titulo}</h3>
          <p className="mb-2">{antiguoEgipto.secciones.filter((s) => s.tipo === "actividad")[0]?.descripcion}</p>
          <div className="flex flex-col gap-2">
            <span className="text-sm"><strong>Herramienta:</strong> {antiguoEgipto.secciones.filter((s) => s.tipo === "actividad")[0]?.herramienta}</span>
            <span className="text-sm"><strong>Entregable:</strong> {antiguoEgipto.secciones.filter((s) => s.tipo === "actividad")[0]?.entregable}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaAntiguoEgipto;