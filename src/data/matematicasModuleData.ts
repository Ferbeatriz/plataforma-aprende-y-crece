export interface MathProperty {
  name: string;
  badge: string;
  formula: string;
  emoji: string;
  everydayExample: string;
  visualAnalogy: string;
  whyItMatters: string;
}

export interface PropertyPracticeProblem {
  id: number;
  title: string;
  story: string;
  propertyTested: "Conmutativa" | "Asociativa" | "Distributiva" | "Elemento Neutro y Cero";
  options: {
    label: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  stepByStepHint: string;
}

export interface ReasoningChallenge {
  id: number;
  tableFocus: string;
  title: string;
  story: string;
  question: string;
  steps: string[];
  options: number[];
  correctAnswer: number;
  breakdownTechnique: string;
  points: number;
}

export interface MathTrick {
  tableNumber: number;
  title: string;
  emoji: string;
  secret: string;
  interactiveStep: string;
  practicalExample: string;
}

export const MULTIPLICATION_PROPERTIES: MathProperty[] = [
  {
    name: "1. Propiedad Conmutativa",
    badge: "El orden no altera el producto 🔄",
    formula: "a × b = b × a",
    emoji: "🔁",
    everydayExample: "Si acomodas 4 filas con 6 deliciosos cupcakes de frambuesa (4 × 6 = 24), tendrás exactamente la misma cantidad que si acomodas 6 filas de 4 cupcakes (6 × 4 = 24).",
    visualAnalogy: "Girar una bandeja rectangular de galletitas no hace aparecer ni desaparecer ninguna galleta: solo cambia el ángulo desde donde la miras.",
    whyItMatters: "¡Te ahorra la mitad del trabajo al estudiar las tablas! Si ya te sabes 7 × 9 = 63, automáticamente sabes 9 × 7 = 63.",
  },
  {
    name: "2. Propiedad Asociativa",
    badge: "Agrupa como prefieras 📦",
    formula: "(a × b) × c = a × (b × c)",
    emoji: "🧩",
    everydayExample: "Para calcular caramelos en 3 cajas, con 4 bolsas cada una y 5 caramelos por bolsa: puedes hacer (3 × 4) × 5 = 12 × 5 = 60, o bien 3 × (4 × 5) = 3 × 20 = 60 caramelos.",
    visualAnalogy: "Empacar paquetes pequeños dentro de cajas medianas o empacar todo en una sola caja gigante da el mismo total.",
    whyItMatters: "Te permite buscar multiplicaciones fáciles primero (como multiplicar por 10 o por números terminados en cero) para calcular más rápido en tu mente.",
  },
  {
    name: "3. Propiedad Distributiva",
    badge: "Descompón y vencerás 🪄",
    formula: "a × (b + c) = (a × b) + (a × c)",
    emoji: "✂️",
    everydayExample: "¿Cuánto es 8 × 14? Descompón 14 en (10 + 4). Ahora calcula: (8 × 10) + (8 × 4) = 80 + 32 = 112. ¡Mucho más fácil y sin equivocarte!",
    visualAnalogy: "Si tienes que comprar 6 ramos de flores que traen rosas y tulipanes, puedes contar primero todas las rosas y luego todos los tulipanes.",
    whyItMatters: "Es la súper herramienta secreta para multiplicar números grandes de dos dígitos sin usar lápiz ni papel.",
  },
  {
    name: "4. Elemento Neutro y Propiedad del Cero",
    badge: "El espejo (1) y el agujero negro (0) 🪞",
    formula: "a × 1 = a   y   a × 0 = 0",
    emoji: "🪞",
    everydayExample: "Si tienes 9 alcancías con 1 moneda cada una, tienes 9 monedas (9 × 1 = 9). Pero si tienes 9 canastas vacías con 0 manzanas, ¡tienes 0 manzanas! (9 × 0 = 0).",
    visualAnalogy: "El número 1 es un espejo mágico: todo número que se mira en él sale idéntico. El 0 es un mago que hace desaparecer todo.",
    whyItMatters: "Te da reglas universales que nunca fallan y simplifican cualquier cálculo algebraico.",
  },
];

export const PROPERTY_PRACTICE_PROBLEMS: PropertyPracticeProblem[] = [
  {
    id: 1,
    title: "El Huerto de Frutillas de Valentina",
    story: "Valentina plantó 7 hileras con 8 plantas de frutillas cada una. Su hermana Camila plantó 8 hileras con 7 plantas cada una. ¿Quién cosechará más frutillas?",
    propertyTested: "Conmutativa",
    options: [
      {
        label: "Valentina, porque 7 hileras ocupan más espacio.",
        isCorrect: false,
        explanation: "Recuerda que estamos comparando la cantidad total de plantas, no el espacio.",
      },
      {
        label: "Ambas cosecharán exactamente 56 frutillas porque 7 × 8 = 8 × 7 (Propiedad Conmutativa).",
        isCorrect: true,
        explanation: "¡Correcto! Cambiar el orden de los factores no altera el producto final: 7 × 8 = 56 y 8 × 7 = 56.",
      },
      {
        label: "Camila, porque el número 8 es mayor que el 7.",
        isCorrect: false,
        explanation: "Al multiplicar ambos números el resultado es idéntico.",
      },
      {
        label: "No se puede saber sin contar una por una cada frutilla.",
        isCorrect: false,
        explanation: "La multiplicación nos permite saber el total exacto con seguridad matemática.",
      },
    ],
    stepByStepHint: "Calcula 7 × 8 y luego calcula 8 × 7. Observa si el resultado cambia.",
  },
  {
    id: 2,
    title: "La Fábrica de Pulseras de la Amistad",
    story: "En el taller de artesanía hay 4 mesas. En cada mesa hay 5 cajas, y dentro de cada caja hay 6 dijes brillantes. ¿Cuál de las siguientes formas permite hallar el total de dijes usando la Propiedad Asociativa?",
    propertyTested: "Asociativa",
    options: [
      {
        label: "(4 + 5) × 6 = 9 × 6 = 54 dijes.",
        isCorrect: false,
        explanation: "Aquí se sumó en vez de multiplicar los tres factores.",
      },
      {
        label: "(4 × 5) × 6 = 20 × 6 = 120 dijes, que es igual a 4 × (5 × 6) = 4 × 30 = 120.",
        isCorrect: true,
        explanation: "¡Excelente! Agrupar (4 × 5) primero o (5 × 6) primero da exactamente 120 dijes brillantes.",
      },
      {
        label: "4 × 5 + 6 = 20 + 6 = 26 dijes.",
        isCorrect: false,
        explanation: "No puedes sumar el último factor; cada caja contiene 6 dijes, por lo que se multiplica.",
      },
      {
        label: "4 × 5 × 6 = 456 dijes.",
        isCorrect: false,
        explanation: "Juntar los dígitos no es una operación matemática válida.",
      },
    ],
    stepByStepHint: "Tienes 3 factores: 4, 5 y 6. Prueba multiplicando 4 × 5 = 20 y luego 20 × 6.",
  },
  {
    id: 3,
    title: "El Desafío Mental del 6 × 13",
    story: "La profesora le pide a Emilia calcular mentalmente 6 × 13 en menos de 5 segundos. ¿Cómo debe aplicar la Propiedad Distributiva para resolverlo súper rápido?",
    propertyTested: "Distributiva",
    options: [
      {
        label: "Haciendo 6 × 1 = 6 y luego sumando 3 para que dé 9.",
        isCorrect: false,
        explanation: "El 13 representa una decena (10) y tres unidades (3), no 1 y 3 sueltos.",
      },
      {
        label: "Descomponiendo 13 en (10 + 3) y calculando: (6 × 10) + (6 × 3) = 60 + 18 = 78.",
        isCorrect: true,
        explanation: "¡Brillante! Multiplicar por 10 y por 3 por separado y luego sumar es la forma más rápida y precisa.",
      },
      {
        label: "Sumando 13 veces el número 6 con los dedos de las manos.",
        isCorrect: false,
        explanation: "Sumar 13 veces toma demasiado tiempo y es fácil cometer un error.",
      },
      {
        label: "Multiplicando 6 × 10 = 60 y olvidándose del 3.",
        isCorrect: false,
        explanation: "Dejar fuera el 3 alteraría el resultado por completo.",
      },
    ],
    stepByStepHint: "Separa el número 13 en una decena redonda (10) y las unidades sobrantes (3).",
  },
  {
    id: 4,
    title: "El Mago de los Números Neutros",
    story: "Un mago tiene 15 sombreros. Cada sombrero tiene exactamente 1 conejo blanco. Al mismo tiempo, tiene 8 cofres vacíos con 0 varitas mágicas adentro. ¿Cuántos conejos y cuántas varitas tiene en total?",
    propertyTested: "Elemento Neutro y Cero",
    options: [
      {
        label: "Tiene 15 conejos (15 × 1 = 15) y 0 varitas (8 × 0 = 0).",
        isCorrect: true,
        explanation: "¡Perfecto! El 1 mantiene la cantidad idéntica (15 × 1 = 15) y el 0 absorbe cualquier producto (8 × 0 = 0).",
      },
      {
        label: "Tiene 1 conejo y 8 varitas.",
        isCorrect: false,
        explanation: "Recuerda que cada uno de los 15 sombreros tiene un conejo.",
      },
      {
        label: "Tiene 16 conejos y 8 varitas.",
        isCorrect: false,
        explanation: "No se suman los números con las cantidades contenidas.",
      },
      {
        label: "Tiene 0 conejos y 0 varitas.",
        isCorrect: false,
        explanation: "Los sombreros sí contienen 1 conejo cada uno, no están vacíos.",
      },
    ],
    stepByStepHint: "Aplica: cualquier número por 1 da el mismo número, y cualquier número por 0 da siempre 0.",
  },
  {
    id: 5,
    title: "Comprando Entradas para el Planetario",
    story: "Un grupo escolar compra 9 entradas para la sala espacial que cuestan $18 cada una. Una estudiante propone calcularlo como: 9 × (20 - 2) = (9 × 20) - (9 × 2) = 180 - 18 = $162. ¿Es correcta esta aplicación distributiva?",
    propertyTested: "Distributiva",
    options: [
      {
        label: "No, porque la propiedad distributiva solo funciona con sumas y nunca con restas.",
        isCorrect: false,
        explanation: "La propiedad distributiva funciona perfectamente tanto con respecto a la suma como a la resta.",
      },
      {
        label: "Sí, es completamente correcta y es una estrategia genial de cálculo mental.",
        isCorrect: true,
        explanation: "¡Exacto! Distribuir respecto a una resta (20 - 2) es un truco fantástico para números que terminan en 8 o 9.",
      },
      {
        label: "No, porque 9 × 18 da como resultado $200 exactos.",
        isCorrect: false,
        explanation: "9 × 18 = 162, no 200.",
      },
      {
        label: "Solo es válida si se hace con calculadora científica.",
        isCorrect: false,
        explanation: "Las propiedades matemáticas son válidas en cualquier método de cálculo.",
      },
    ],
    stepByStepHint: "Comprueba si 20 - 2 es 18, y si 180 - 18 da 162.",
  },
];

export const REASONING_CHALLENGES_20: ReasoningChallenge[] = [
  {
    id: 1,
    tableFocus: "Tabla del 4",
    title: "1. El Rescate de los Perritos del Refugio",
    story: "En un refugio canino hay 9 jaulas amplias con 4 cachorros en cada una. Además, llegaron 3 mamás perritas y cada una dio a luz a 4 cachorritos más. ¿Cuántos cachorritos hay en total para cuidar?",
    question: "¿Cuántos cachorros hay en total?",
    steps: ["Cachorros en jaulas: 9 × 4 = 36", "Cachorros recién nacidos: 3 × 4 = 12", "Suma total: 36 + 12 = 48 (o 12 × 4 = 48)"],
    options: [40, 44, 48, 52],
    correctAnswer: 48,
    breakdownTechnique: "Descomposición: (9 + 3) grupos de 4 = 12 × 4 = (10 × 4) + (2 × 4) = 40 + 8 = 48 cachorros.",
    points: 15,
  },
  {
    id: 2,
    tableFocus: "Tabla del 6",
    title: "2. Las Cajas de Acuarelas para el Concurso de Arte",
    story: "Una escuela organiza un concurso de pintura y compra 8 estuches de acuarelas con 6 tubos de color cada uno. Al abrir los estuches, la profesora regala 2 tubos de cada estuche a las finalistas. ¿Cuántos tubos de pintura quedaron en total en los estuches?",
    question: "¿Cuántos tubos de pintura quedaron en los estuches?",
    steps: ["Tubos por estuche tras regalar 2: 6 - 2 = 4 tubos", "Total restante: 8 estuches × 4 tubos = 32 tubos"],
    options: [28, 32, 36, 48],
    correctAnswer: 32,
    breakdownTechnique: "En vez de calcular (8 × 6) - (8 × 2) = 48 - 16 = 32, razona: quedan 8 × (6 - 2) = 8 × 4 = 32 tubos.",
    points: 15,
  },
  {
    id: 3,
    tableFocus: "Tabla del 7",
    title: "3. La Expedición Arqueológica de las Semanas",
    story: "Un equipo de científicas viaja a excavar ruinas mayas durante 6 semanas completas. Durante cada día de la expedición encuentran exactamente 3 fragmentos de cerámica antigua. ¿Cuántos fragmentos hallaron en total?",
    question: "¿Cuántos fragmentos de cerámica recolectaron en las 6 semanas?",
    steps: ["Días en 6 semanas: 6 × 7 = 42 días", "Total fragmentos: 42 días × 3 fragmentos = 126 fragmentos"],
    options: [118, 126, 134, 142],
    correctAnswer: 126,
    breakdownTechnique: "Calcula 6 × 7 = 42 días. Luego descompón 42 × 3 en (40 × 3) + (2 × 3) = 120 + 6 = 126 fragmentos.",
    points: 20,
  },
  {
    id: 4,
    tableFocus: "Tabla del 8",
    title: "4. Las Ruedas del Taller de Patinaje",
    story: "En un club de patinaje sobre ruedas hay 12 niñas entrenando. Cada par de patines tiene 8 ruedas en total (4 ruedas en el pie izquierdo y 4 en el derecho). ¿Cuántas ruedas están rodando por la pista al mismo tiempo?",
    question: "¿Cuántas ruedas ruedan en la pista?",
    steps: ["Patinadoras: 12", "Ruedas por patinadora: 8", "Total: 12 × 8 = (10 × 8) + (2 × 8) = 80 + 16 = 96"],
    options: [88, 92, 96, 104],
    correctAnswer: 96,
    breakdownTechnique: "Descompón 12 × 8 en (10 × 8) + (2 × 8) = 80 + 16 = 96 ruedas.",
    points: 15,
  },
  {
    id: 5,
    tableFocus: "Tabla del 9",
    title: "5. El Invernadero de las Orquídeas Gigantes",
    story: "Un jardín botánico tiene 7 estantes con 9 orquídeas cada uno. Si una helada nocturna marchitó 9 flores en total de todo el invernadero, ¿cuántas orquídeas sanas quedaron?",
    question: "¿Cuántas orquídeas sanas quedaron en el invernadero?",
    steps: ["Total inicial: 7 × 9 = 63 orquídeas", "Restar marchitas: 63 - 9 = 54 orquídeas (equivalente a 6 × 9)"],
    options: [45, 54, 63, 72],
    correctAnswer: 54,
    breakdownTechnique: "Tener 7 grupos de 9 y quitar 1 grupo de 9 equivale directamente a 6 × 9 = 54 orquídeas.",
    points: 15,
  },
  {
    id: 6,
    tableFocus: "Tabla del 11",
    title: "6. El Desfile de las Linternas Mágicas",
    story: "En el festival de las luces marchan 8 escuadrones de estudiantes. Cada escuadrón lleva 11 linternas brillantes. Si 2 linternas de cada escuadrón cambian a luz dorada y el resto a luz violeta, ¿cuántas linternas violetas hay en total?",
    question: "¿Cuántas linternas violetas brillan en el desfile?",
    steps: ["Linternas violetas por escuadrón: 11 - 2 = 9 linternas", "Total violetas: 8 escuadrones × 9 linternas = 72"],
    options: [64, 72, 80, 88],
    correctAnswer: 72,
    breakdownTechnique: "Calcula (11 - 2) = 9 linternas violetas por escuadrón. Luego 8 × 9 = 72 linternas violetas.",
    points: 20,
  },
  {
    id: 7,
    tableFocus: "Tabla del 12",
    title: "7. La Panadería de las Medias Lunas",
    story: "Un maestro pastelero hornea 7 bandejas con 1 docena (12 unidades) de medialunas cada una. Si vende 4 docenas durante la mañana, ¿cuántas medialunas individuales le quedan para la tarde?",
    question: "¿Cuántas medialunas individuales le quedan para vender?",
    steps: ["Docenas restantes: 7 - 4 = 3 docenas", "Total unidades: 3 × 12 = 36 medialunas"],
    options: [24, 30, 36, 48],
    correctAnswer: 36,
    breakdownTechnique: "Resta primero las docenas: 7 - 4 = 3 docenas. Luego multiplica 3 × 12 = 36 unidades.",
    points: 15,
  },
  {
    id: 8,
    tableFocus: "Tabla del 5 y 10",
    title: "8. El Tesoro de las Monedas de Piratas",
    story: "Sofía encuentra un cofre con 14 bolsas. Cada bolsa tiene 5 monedas de plata y 5 monedas de oro. ¿Cuántas monedas en total hay dentro del cofre?",
    question: "¿Cuántas monedas en total contiene el cofre?",
    steps: ["Monedas por bolsa: 5 + 5 = 10 monedas", "Total en el cofre: 14 bolsas × 10 monedas = 140 monedas"],
    options: [120, 130, 140, 150],
    correctAnswer: 140,
    breakdownTechnique: "Suma 5 + 5 = 10 monedas por bolsa. Multiplicar 14 × 10 solo requiere agregar un cero al final = 140.",
    points: 15,
  },
  {
    id: 9,
    tableFocus: "Tabla del 7 y 8",
    title: "9. El Gran Salto de los Canguros",
    story: "Un canguro adulto da 8 saltos de 7 metros cada uno en línea recta. Luego da media vuelta y regresa dando 5 saltos de 7 metros. ¿A cuántos metros de su punto de partida se encuentra ahora?",
    question: "¿A cuántos metros de distancia del punto inicial quedó el canguro?",
    steps: ["Metros avanzados: 8 × 7 = 56 m", "Metros retrocedidos: 5 × 7 = 35 m", "Distancia neta: 56 - 35 = 21 m (o (8 - 5) × 7 = 3 × 7 = 21 m)"],
    options: [14, 21, 28, 35],
    correctAnswer: 21,
    breakdownTechnique: "Resta los saltos netos: 8 - 5 = 3 saltos en dirección hacia adelante. Luego 3 × 7 = 21 metros.",
    points: 20,
  },
  {
    id: 10,
    tableFocus: "Tabla del 6 y 12",
    title: "10. La Fábrica de Bombones de Chocolate",
    story: "Una máquina empaca 6 cajas de bombones por minuto. Cada caja contiene 12 bombones surtidos. ¿Cuántos bombones en total empaca la máquina en media hora (30 minutos)?",
    question: "¿Cuántos bombones se empacan en 30 minutos?",
    steps: ["Bombones por minuto: 6 × 12 = 72 bombones", "En 30 minutos: 72 × 30 = 72 × 3 × 10 = 216 × 10 = 2.160 bombones"],
    options: [1860, 2040, 2160, 2280],
    correctAnswer: 2160,
    breakdownTechnique: "6 × 12 = 72 bombones/min. En 30 min: (70 × 30) + (2 × 30) = 2.100 + 60 = 2.160 bombones.",
    points: 25,
  },
  {
    id: 11,
    tableFocus: "Tabla del 4 y 8",
    title: "11. El Laberinto de las Cuatro Puertas",
    story: "Para abrir un cofre secreto, debes multiplicar el número de patas de 9 arañas (8 patas cada una) y sumarle el número de patas de 7 gatos (4 patas cada uno). ¿Cuál es la clave numérica secreta?",
    question: "¿Cuál es el valor de la clave numérica del cofre?",
    steps: ["Patas de arañas: 9 × 8 = 72", "Patas de gatos: 7 × 4 = 28", "Suma total: 72 + 28 = 100"],
    options: [96, 100, 104, 110],
    correctAnswer: 100,
    breakdownTechnique: "Calcula (9 × 8) = 72 y (7 × 4) = 28. Al sumar 72 + 28 obtienes exactamente 100.",
    points: 15,
  },
  {
    id: 12,
    tableFocus: "Tabla del 9 y 11",
    title: "12. La Biblioteca de los Libros Legendarios",
    story: "Una biblioteca tiene 9 estantes de literatura infantil con 11 libros cada uno, y 9 estantes de ciencia con 9 libros cada uno. ¿Cuántos libros hay en total en esos estantes?",
    question: "¿Cuántos libros en total albergan los 18 estantes?",
    steps: ["Usando distributiva: 9 × (11 + 9) = 9 × 20 = 180 libros", "(o 99 + 81 = 180)"],
    options: [160, 170, 180, 190],
    correctAnswer: 180,
    breakdownTechnique: "Aplica distributiva inversa: 9 × 11 + 9 × 9 = 9 × (11 + 9) = 9 × 20 = 180 libros.",
    points: 20,
  },
  {
    id: 13,
    tableFocus: "Tabla del 7 y 6",
    title: "13. El Torneo de Ajedrez Escolar",
    story: "En un torneo compiten 7 escuelas. Cada escuela envía 6 equipos, y cada equipo está formado por 4 jugadoras. ¿Cuántas jugadoras compiten en total en el torneo?",
    question: "¿Cuántas estudiantes participan en el torneo?",
    steps: ["Total equipos: 7 × 6 = 42 equipos", "Total jugadoras: 42 × 4 = (40 × 4) + (2 × 4) = 160 + 8 = 168"],
    options: [156, 164, 168, 176],
    correctAnswer: 168,
    breakdownTechnique: "Asociativa: (7 × 6) × 4 = 42 × 4 = 168 jugadoras.",
    points: 20,
  },
  {
    id: 14,
    tableFocus: "Tabla del 12 y 5",
    title: "14. El Regalo para el Campamento de Verano",
    story: "Una monitora compra 5 paquetes de botellas de agua. Cada paquete trae 12 botellas. Si cada botella cuesta $8, ¿cuánto dinero gastó en total en la compra?",
    question: "¿Cuánto dinero gastó la monitora?",
    steps: ["Total botellas: 5 × 12 = 60 botellas", "Costo total: 60 × 8 = $480"],
    options: [420, 460, 480, 520],
    correctAnswer: 480,
    breakdownTechnique: "Multiplica primero 5 × 12 = 60 botellas (fácil porque termina en cero). Luego 60 × 8 = $480.",
    points: 20,
  },
  {
    id: 15,
    tableFocus: "Tabla del 8 y 9",
    title: "15. La Huerta de los Manzanos Dulces",
    story: "Un agricultor recolecta 8 cajones de manzanas rojas con 9 kilos cada uno, y 8 cajones de manzanas verdes con 6 kilos cada uno. ¿Cuántos kilos de manzanas recolectó en total?",
    question: "¿Cuántos kilos de manzanas cosechó el agricultor?",
    steps: ["Kilos por par de cajones: 9 + 6 = 15 kilos", "Total: 8 × 15 = 8 × (10 + 5) = 80 + 40 = 120 kilos"],
    options: [110, 115, 120, 128],
    correctAnswer: 120,
    breakdownTechnique: "Distributiva: 8 × (9 + 6) = 8 × 15. Luego 8 × 15 = 8 × 10 + 8 × 5 = 80 + 40 = 120 kg.",
    points: 20,
  },
  {
    id: 16,
    tableFocus: "Tabla del 7 y 12",
    title: "16. El Tren de Pasajeros de la Costa",
    story: "Un tren turístico tiene 7 vagones de primera clase con 12 asientos cada uno, y 7 vagones estándar con 18 asientos cada uno. ¿Cuál es la capacidad total de pasajeros sentados en el tren?",
    question: "¿Cuántos asientos en total tiene el tren?",
    steps: ["Asientos por pareja de vagones: 12 + 18 = 30 asientos", "Capacidad total: 7 × 30 = 210 asientos"],
    options: [190, 200, 210, 220],
    correctAnswer: 210,
    breakdownTechnique: "Suma los asientos de un vagón de cada tipo: 12 + 18 = 30 (número redondo). Luego 7 × 30 = 210 asientos.",
    points: 25,
  },
  {
    id: 17,
    tableFocus: "Tabla del 6 y 11",
    title: "17. Los Mosaicos del Palacio de Cristal",
    story: "Una artista coloca 11 filas con 6 azulejos azules cada una, y luego añade 11 filas con 6 azulejos dorados. Si se le rompieron 12 azulejos durante la colocación, ¿cuántos azulejos quedaron intactos en el mural?",
    question: "¿Cuántos azulejos intactos quedaron en el mural?",
    steps: ["Azulejos azules: 11 × 6 = 66", "Azulejos dorados: 11 × 6 = 66", "Total colocados: 66 + 66 = 132", "Restar rotos: 132 - 12 = 120 azulejos"],
    options: [110, 118, 120, 126],
    correctAnswer: 120,
    breakdownTechnique: "Total inicial: 11 × 12 = 132. Restar 12 da exactamente 120 azulejos.",
    points: 20,
  },
  {
    id: 18,
    tableFocus: "Tabla del 4, 6 y 8",
    title: "18. El Castillo de los Bloques de Madera",
    story: "Para construir una torre gigante se necesitan 4 bloques rojos por piso, 6 bloques amarillos y 8 bloques verdes. Si la torre medirá 9 pisos de alto, ¿cuántos bloques de madera se necesitarán en total?",
    question: "¿Cuántos bloques se usarán para toda la torre?",
    steps: ["Bloques por piso: 4 + 6 + 8 = 18 bloques", "Total en 9 pisos: 9 × 18 = 9 × (20 - 2) = 180 - 18 = 162 bloques"],
    options: [152, 162, 172, 180],
    correctAnswer: 162,
    breakdownTechnique: "Suma por piso: 4 + 6 + 8 = 18 bloques. Multiplica por 9 pisos usando: 9 × (20 - 2) = 180 - 18 = 162.",
    points: 25,
  },
  {
    id: 19,
    tableFocus: "Tabla del 8 y 12",
    title: "19. Las Cajas de Lápices de Colores",
    story: "Una librería vende 8 estuches que traen 12 lápices cada uno. Una clienta compra la mitad de todos los lápices disponibles. ¿Cuántos lápices compró exactamente?",
    question: "¿Cuántos lápices compró la clienta?",
    steps: ["Total inicial: 8 × 12 = 96 lápices", "La mitad: 96 ÷ 2 = 48 (o comprar 4 estuches: 4 × 12 = 48)"],
    options: [42, 48, 54, 60],
    correctAnswer: 48,
    breakdownTechnique: "En vez de calcular 8 × 12 = 96 y luego dividir por 2, razona: la mitad de 8 estuches son 4 estuches. 4 × 12 = 48 lápices.",
    points: 20,
  },
  {
    id: 20,
    tableFocus: "Tabla del 9 y 12 (Desafío Maestro)",
    title: "20. La Gran Misión Galáctica de las Estrellas",
    story: "Una nave espacial visita 9 sistemas solares. En cada sistema solar recolecta energía de 12 satélites. Si cada satélite produce 5 cristales de plasma, ¿cuántos cristales de plasma almacenó la nave al final de la misión?",
    question: "¿Cuántos cristales de plasma recolectó la nave?",
    steps: ["Total satélites: 9 × 12 = 108 satélites", "Total cristales: 108 × 5 = 108 × 10 ÷ 2 = 1.080 ÷ 2 = 540 cristales"],
    options: [480, 520, 540, 560],
    correctAnswer: 540,
    breakdownTechnique: "Multiplicar por 5 es igual a multiplicar por 10 y sacar la mitad: 108 × 10 = 1.080, la mitad es 540 cristales.",
    points: 30,
  },
];

export const MATH_TRICKS: MathTrick[] = [
  {
    tableNumber: 3,
    title: "El Ritmo del Doble más Uno",
    emoji: "🎵",
    secret: "Para multiplicar un número por 3, simplemente multiplica ese número por 2 (su doble) y súmale el número original una vez más.",
    interactiveStep: "Ejemplo: 3 × 7 = (2 × 7) + 7 = 14 + 7 = 21. ¡Facilísimo!",
    practicalExample: "¿Cuánto es 3 × 8? Piensa: doble de 8 = 16, más 8 = 24.",
  },
  {
    tableNumber: 4,
    title: "El Doble del Doble",
    emoji: "⚡",
    secret: "Multiplicar por 4 es lo mismo que sacar el doble dos veces seguidas.",
    interactiveStep: "Ejemplo: 4 × 6 -> El doble de 6 es 12, y el doble de 12 es 24. ¡Listo!",
    practicalExample: "¿Cuánto es 4 × 9? Doble de 9 es 18, doble de 18 es 36.",
  },
  {
    tableNumber: 5,
    title: "La Mitad de la Decena",
    emoji: "🖐️",
    secret: "Todo número multiplicado por 5 termina siempre en 0 (si es par) o en 5 (si es impar). Además, equivale a multiplicar por 10 y sacar la mitad.",
    interactiveStep: "Ejemplo: 5 × 8 -> 8 × 10 = 80 -> La mitad de 80 es 40.",
    practicalExample: "¿Cuánto es 5 × 14? 14 × 10 = 140 -> la mitad de 140 es 70.",
  },
  {
    tableNumber: 6,
    title: "El 5 más Uno (o Doble de la tabla del 3)",
    emoji: "🎲",
    secret: "Multiplicar por 6 es multiplicar por 5 y sumarle el número una vez más.",
    interactiveStep: "Ejemplo: 6 × 7 -> (5 × 7) + 7 = 35 + 7 = 42.",
    practicalExample: "¿Cuánto es 6 × 8? Piensa: (5 × 8) = 40 + 8 = 48.",
  },
  {
    tableNumber: 7,
    title: "La Descomposición 5 + 2",
    emoji: "🌈",
    secret: "La tabla del 7 da miedo, pero 7 es (5 + 2). Multiplica el número por 5, luego por 2 y suma ambos resultados.",
    interactiveStep: "Ejemplo: 7 × 8 -> (5 × 8) + (2 × 8) = 40 + 16 = 56.",
    practicalExample: "¿Cuánto es 7 × 6? (5 × 6) + (2 × 6) = 30 + 12 = 42.",
  },
  {
    tableNumber: 8,
    title: "El Triple Doble (2 × 2 × 2)",
    emoji: "🐙",
    secret: "Multiplicar por 8 es sacar el doble tres veces seguidas.",
    interactiveStep: "Ejemplo: 8 × 7 -> Doble de 7 es 14 -> Doble de 14 es 28 -> Doble de 28 es 56.",
    practicalExample: "¿Cuánto es 8 × 9? 9 -> 18 -> 36 -> 72.",
  },
  {
    tableNumber: 9,
    title: "El Truco Mágico de los 10 Dedos y la Suma 9",
    emoji: "👐",
    secret: "1) Los dígitos de los resultados de la tabla del 9 siempre suman 9 (18->1+8=9, 27->2+7=9, 36->3+6=9). 2) Con tus 10 dedos frente a ti: baja el dedo que vas a multiplicar por 9; a la izquierda quedan las decenas y a la derecha las unidades.",
    interactiveStep: "Ejemplo: 9 × 4 -> Bajas el 4to dedo. Quedan 3 dedos a la izquierda y 6 a la derecha = ¡36!",
    practicalExample: "9 × 7 -> Bajas el 7mo dedo. Quedan 6 dedos a la izquierda y 3 a la derecha = ¡63!",
  },
  {
    tableNumber: 11,
    title: "El Sándwich Mágico de Dígitos",
    emoji: "🥪",
    secret: "Para multiplicar un número de 2 dígitos por 11, separa los dos dígitos y pon en el medio la suma de ambos.",
    interactiveStep: "Ejemplo: 11 × 25 -> Separa el 2 y el 5. Suma 2 + 5 = 7. Coloca el 7 al centro = ¡275!",
    practicalExample: "11 × 34 -> Separa 3 y 4. Suma 3 + 4 = 7 -> Resultado: 374.",
  },
  {
    tableNumber: 12,
    title: "El Combo 10 + 2",
    emoji: "👑",
    secret: "Para multiplicar por 12, multiplica primero por 10 (agrega un cero) y súmale el doble del número.",
    interactiveStep: "Ejemplo: 12 × 7 -> (10 × 7) + (2 × 7) = 70 + 14 = 84.",
    practicalExample: "12 × 9 -> (10 × 9) + (2 × 9) = 90 + 18 = 108.",
  },
];