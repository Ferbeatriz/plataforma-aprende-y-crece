// src/data/modules.ts
import { BookOpen, Landmark, ScrollText } from "lucide-react";

export const sidebarItems = [
  { label: "Inicio / Panel", icon: "🏠", href: "#" },
  { label: "Lenguaje", icon: "📖", href: "#", temas: "6 temas" },
  { label: "Historia Universal", icon: "🏛️", href: "#", temas: "8 temas", active: true },
  { label: "Matemáticas", icon: "✨", href: "#", temas: "7 temas" },
];

export const historyModules = [
  {
    title: "Glosario de Dioses",
    icon: ScrollText,
    description: "Diccionario ilustrado con todos los dioses, sus formas y poderes mágicos.",
    bgColor: "bg-edu-lavender",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    isActive: true,
  },
  {
    title: "Antigua Grecia",
    icon: Landmark,
    description: "Polis, democracia, juegos Olímpicos, mitos del Olimpo y filosofía.",
    bgColor: "bg-edu-cream",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
    isActive: false,
  },
  {
    title: "Antigua Roma",
    icon: BookOpen,
    description: "Acueductos, derecho romano, coliseo, idioma latín y vida en Pompeya.",
    bgColor: "bg-edu-rose",
    borderColor: "border-pink-200",
    textColor: "text-pink-700",
    isActive: false,
  },
  {
    title: "Antiguo Egipto",
    icon: Pyramids, // Puedes usar cualquier icono de lucide-react
    description: "Faraones, pirámides, jeroglíficos y el misterio del Nilo.",
    bgColor: "bg-teal-50", // Puedes usar tu propio color pastel
    borderColor: "border-teal-200",
    textColor: "text-teal-700",
    isActive: false,
  },




];