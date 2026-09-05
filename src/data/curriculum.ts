import { 
  BookOpen, 
  Landmark, 
  Sparkles, 
  Languages, 
  FlaskConical,
  ChevronRight,
  BookOpen as BookIcon,
  Lightbulb,
  Gamepad2,
  FileQuestion,
  ClipboardCheck
} from "lucide-react";

// Interface para definir el tipo de cada actividad
export interface Actividad {
  id: string;
  nombre: string;
  descripcion: string;
  icono: React.ElementType;
  colorBg: string;
  colorText: string;
}

// Interface para definir el tipo de cada submódulo
export interface SubModulo {
  id: string;
  nombre: string;
  ruta: string;
  icono: React.ElementType;
  descripcion: string;
  actividades: Actividad[];
}

// Interface para definir el tipo de cada módulo principal
export interface Modulo {
  id: string;
  nombre: string;
  descripcion: string;
  icono: React.ElementType;
  color: string;
  submodulos?: SubModulo[];
  actividades?: Actividad[];
}

// Definición de actividades estándar para todos los módulos
const ACTIVIDADES_ESTANDAR: Actividad[] = [
  {
    id: "lecciones",
    nombre: "Lecciones",
    descripcion: "Contenido educativo interactivo con videos y lecturas.",
    icono: BookIcon,
    colorBg: "bg-edu-pink",
    colorText: "text-edu-rose"
  },
  {
    id: "trivias",
    nombre: "Trivias",
    descripcion: "¡Responde rápido y gana puntos de experiencia!",
    icono: Lightbulb,
    colorBg: "bg-edu-yellow",
    colorText: "text-amber-600"
  },
  {
    id: "juegos",
    nombre: "Juegos",
    descripcion: "Aprende divirtiéndote con misiones especiales.",
    icono: Gamepad2,
    colorBg: "bg-edu-lavender",
    colorText: "text-edu-purple"
  },
  {
    id: "cuestionarios",
    nombre: "Cuestionarios",
    descripcion: "Repasa los conceptos clave de la lección.",
    icono: FileQuestion,
    colorBg: "bg-sky-50",
    colorText: "text-sky-600"
  },
  {
    id: "evaluaciones",
    nombre: "Evaluaciones",
    descripcion: "Pon a prueba lo que has aprendido al 100%.",
    icono: ClipboardCheck,
    colorBg: "bg-green-50",
    colorText: "text-green-600"
  }
];

// Definición de submódulos para Historia y Geografía
const SUBMODULOS_HISTORIA: SubModulo[] = [
  {
    id: "historia-universal",
    nombre: "Historia Universal",
    ruta: "/modulo/historia/historia-universal",
    icono: Landmark,
    descripcion: "Explora civilizaciones antiguas como Egipto, Grecia y Roma.",
    actividades: ACTIVIDADES_ESTANDAR
  },
  {
    id: "historia-chile",
    nombre: "Historia de Chile",
    ruta: "/modulo/historia/historia-chile",
    icono: Landmark,
    descripcion: "Descubre nuestras raíces, la independencia y la historia nacional.",
    actividades: ACTIVIDADES_ESTANDAR
  }
];

// Definición de módulos principales
export const curriculumData: Modulo[] = [
  {
    id: "lenguaje",
    nombre: "Lenguaje",
    descripcion: "Lectura, escritura, gramática y expresión oral.",
    icono: BookOpen,
    color: "bg-edu-rose",
    actividades: ACTIVIDADES_ESTANDAR
  },
  {
    id: "historia",
    nombre: "Historia y Geografía",
    descripcion: "Viaja en el tiempo y descubre el mundo.",
    icono: Landmark,
    color: "bg-edu-cream",
    submodulos: SUBMODULOS_HISTORIA
  },
  {
    id: "matematicas",
    nombre: "Matemáticas",
    descripcion: "Números, operaciones, geometría y lógica.",
    icono: Sparkles,
    color: "bg-edu-lavender",
    actividades: ACTIVIDADES_ESTANDAR
  },
  {
    id: "ingles",
    nombre: "Inglés",
    descripcion: "Vocabulario, gramática y conversación en inglés.",
    icono: Languages,
    color: "bg-sky-50",
    actividades: ACTIVIDADES_ESTANDAR
  },
  {
    id: "ciencias",
    nombre: "Ciencias",
    descripcion: "Naturaleza, biología, física y química.",
    icono: FlaskConical,
    color: "bg-green-50",
    actividades: ACTIVIDADES_ESTANDAR
  }
];

export default curriculumData;
