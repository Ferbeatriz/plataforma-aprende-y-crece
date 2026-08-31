export interface MultipleChoiceItem {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TrueFalseItem {
  id: number;
  statement: string;
  isTrue: boolean;
  explanation: string;
  requiredKeywordsForFalse?: string[];
}

export interface WrittenPromptItem {
  id: number;
  title: string;
  prompt: string;
  guidance: string;
  requiredKeywords: string[][]; // Array of keyword groups (must match at least one word from each group or threshold)
  minimumWords: number;
  sampleModelAnswer: string;
}

export const LENGUAJE_THEORY = {
  title: "El Mágico Universo del Texto Narrativo",
  subtitle: "Descubre cómo las grandes autoras y autores tejen historias inolvidables",
  introduction: `¿Alguna vez te has sumergido en un libro y sentido que viajas a un pueblo donde llueven mariposas amarillas o a una selva encantada llena de secretos? ¡Eso es el poder de un **texto narrativo**! Un texto narrativo es aquel que **relata una serie de acontecimientos, reales o imaginarios, protagonizados por personajes en un tiempo y espacio determinados**.`,
  elements: [
    {
      name: "1. El Narrador (La voz mágica)",
      desc: "No es la persona de carne y hueso que escribió el libro (el autor), sino el ser creado para contar los hechos. Puede ser en **Primera Persona (Narrador Protagonista o Testigo)** diciendo 'Yo caminé por la selva' o en **Tercera Persona (Narrador Omnisciente u Observador)** diciendo 'Ella descubrió la llave dorada'. El narrador omnisciente lo sabe todo: qué sienten, sueñan y piensan los personajes.",
      badge: "Voz del relato",
      emoji: "🎙️",
    },
    {
      name: "2. Los Personajes (El corazón de la aventura)",
      desc: "Son quienes viven las aventuras y toman decisiones. Se dividen en **Principales o Protagonistas** (como la valiente Alexander Cold o la sabia Eva Luna) y **Secundarios** (los que acompañan, ayudan o generan obstáculos en el camino).",
      badge: "Protagonistas y secundarios",
      emoji: "🧚‍♀️",
    },
    {
      name: "3. El Espacio y el Ambiente",
      desc: "El lugar físico y la atmósfera donde ocurren las acciones. Puede ser un sitio real como la cordillera de los Andes o un lugar fantástico e inolvidable como **Macondo**, la legendaria aldea rodeada de ciénagas creada por Gabriel García Márquez.",
      badge: "Lugares y atmósferas",
      emoji: "🗺️",
    },
    {
      name: "4. El Tiempo",
      desc: "La época histórica (el pasado colonial, el presente o el futuro) y la duración de la historia (una tarde de tormenta o cien años a lo largo de varias generaciones).",
      badge: "Cronología",
      emoji: "⏳",
    },
    {
      name: "5. La Trama o Estructura Narrativa",
      desc: "Se compone clásicamente de tres grandes momentos: **Inicio** (presentación de personajes y contexto armónico), **Nudo o Conflicto** (el problema que altera la tranquilidad y desafía a los personajes) y **Desenlace** (la resolución de la aventura y el nuevo orden final).",
      badge: "Inicio - Nudo - Desenlace",
      emoji: "📖",
    },
  ],
  literarySpotlight: [
    {
      author: "Gabriel García Márquez (Colombia)",
      work: "Cien años de soledad",
      quote: "Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo. Macondo era entonces una aldea de veinte casas de barro y cañabrava...",
      analysis: "Observa cómo el narrador omnisciente viaja en el tiempo (del futuro al pasado) y describe el espacio con enorme belleza y poesía sensorial.",
    },
    {
      author: "Isabel Allende (Chile)",
      work: "Cuentos de Eva Luna / La ciudad de las bestias",
      quote: "Me llamo Eva, que significa vida, según un libro que mi madre consultó para elegir mi nombre. Nací en el último cuarto de una casa sombría y crecí entre muebles extravagantes y libros antiguos...",
      analysis: "Aquí vemos un brillante narrador en primera persona (protagonista) donde la misma Eva Luna nos presenta su origen y la fuerza de su propia voz.",
    },
  ],
};

export const MULTIPLE_CHOICE_QUESTIONS: MultipleChoiceItem[] = [
  {
    id: 1,
    question: "¿Qué es fundamentalmente un texto narrativo?",
    options: [
      "Un conjunto de instrucciones para armar un artefacto.",
      "Un relato de acontecimientos reales o imaginarios que les suceden a unos personajes en un tiempo y lugar.",
      "Una lista de rimas poéticas que no cuenta ninguna historia.",
      "Un diccionario con definiciones científicas y tablas de números.",
    ],
    correctIndex: 1,
    explanation: "¡Exacto! El texto narrativo se caracteriza por contar hechos o sucesos en una secuencia temporal con personajes.",
  },
  {
    id: 2,
    question: "¿Cuál es la diferencia principal entre el 'Autor' y el 'Narrador'?",
    options: [
      "El autor es la persona real que escribe la obra; el narrador es la voz inventada dentro del texto para relatar los hechos.",
      "El autor solo dibuja las portadas y el narrador compra los libros.",
      "Son exactamente la misma persona en todos los libros sin excepción.",
      "El narrador siempre es el villano de la historia.",
    ],
    correctIndex: 0,
    explanation: "¡Muy bien! El autor es la persona de carne y hueso (como Isabel Allende), mientras que el narrador es la entidad ficticia que cuenta la historia.",
  },
  {
    id: 3,
    question: "Si una historia comienza con: 'Aquella mañana yo salí corriendo hacia el bosque encantado...', ¿qué tipo de narrador es?",
    options: [
      "Narrador omnisciente (tercera persona).",
      "Narrador protagonista en primera persona ('yo').",
      "Narrador enciclopédico.",
      "Narrador invisible en segunda persona.",
    ],
    correctIndex: 1,
    explanation: "¡Brillante! El uso del pronombre 'yo' y verbos en primera persona indican que el narrador es protagonista o testigo de su propia vivencia.",
  },
  {
    id: 4,
    question: "En la estructura clásica de la narración, ¿qué sucede durante el 'Nudo o Conflicto'?",
    options: [
      "Se presentan los nombres y títulos de la contratapa del libro.",
      "Ocurre el problema o situación difícil que altera la calma y desata las acciones principales.",
      "Se soluciona todo mágicamente sin ningún esfuerzo ni reto.",
      "Es<dyad-write path="src/data/lenguajeModuleData.ts" description="Complete educational dataset for the Lenguaje module including theory, 10 multiple choice items, 7 true/false items, and 5 written response prompts with grading criteria">
export interface MultipleChoiceItem {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TrueFalseItem {
  id: number;
  statement: string;
  isTrue: boolean;
  explanation: string;
  requiredKeywordsForFalse?: string[];
}

export interface WrittenPromptItem {
  id: number;
  title: string;
  prompt: string;
  guidance: string;
  requiredKeywords: string[][]; // Groups of keywords; response should include matches from these key concepts
  minimumWords: number;
  sampleModelAnswer: string;
}

export const LENGUAJE_THEORY = {
  title: "El Mágico Universo del Texto Narrativo",
  subtitle: "Descubre cómo las grandes autoras y autores tejen historias inolvidables",
  introduction: `¿Alguna vez te has sumergido en un libro y sentido que viajas a un pueblo donde llueven mariposas amarillas o a una selva encantada llena de secretos? ¡Eso es el poder de un texto narrativo! Un texto narrativo es aquel que relata una serie de acontecimientos, reales o imaginarios, protagonizados por personajes en un tiempo y espacio determinados.`,
  elements: [
    {
      name: "1. El Narrador (La voz mágica)",
      desc: "No es la persona de carne y hueso que escribió el libro (el autor), sino la voz inventada para contar los hechos. Puede ser en Primera Persona (Narrador Protagonista o Testigo: 'Yo salí al amanecer...') o en Tercera Persona (Narrador Omnisciente: 'Ella descubrió la llave dorada...'). El narrador omnisciente lo sabe todo: qué sienten, sueñan y piensan los personajes en su fuero interno.",
      badge: "Voz del relato",
      emoji: "🎙️",
    },
    {
      name: "2. Los Personajes (El corazón de la aventura)",
      desc: "Son los seres que realizan o viven las acciones. Se dividen en Principales o Protagonistas (quienes llevan el peso del objetivo central) y Secundarios (quienes acompañan, aconsejan o generan obstáculos).",
      badge: "Protagonistas y secundarios",
      emoji: "🧚‍♀️",
    },
    {
      name: "3. El Espacio y el Ambiente",
      desc: "El lugar geográfico y la atmósfera sensorial donde transcurren los hechos. Puede ser real (como Santiago de Chile o el río Amazonas) o un espacio mítico e imaginario como Macondo, la emblemática aldea creada por Gabriel García Márquez.",
      badge: "Lugares y atmósferas",
      emoji: "🗺️",
    },
    {
      name: "4. El Tiempo",
      desc: "La época histórica en que se ambienta el relato (pasado, presente o futuro) y el orden temporal de los sucesos (cronológico, o con saltos hacia atrás llamados 'flashbacks' y hacia adelante).",
      badge: "Cronología y saltos",
      emoji: "⏳",
    },
    {
      name: "5. La Trama o Estructura Narrativa",
      desc: "Toda historia tradicional se articula en tres grandes momentos: Inicio (presentación del escenario y personajes en estado de calma), Nudo o Conflicto (aparece el gran problema que impulsa las acciones) y Desenlace (resolución del conflicto y nuevo orden alcanzado).",
      badge: "Inicio - Nudo - Desenlace",
      emoji: "📖",
    },
  ],
  literarySpotlight: [
    {
      author: "Gabriel García Márquez (Colombia)",
      work: "Cien años de soledad",
      quote: "«Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo. Macondo era entonces una aldea de veinte casas de barro y cañabrava...»",
      analysis: "Observa cómo el narrador omnisciente viaja en el tiempo con maestría (del futuro hacia el pasado) y describe el espacio con un ambiente vívido y sensorial.",
    },
    {
      author: "Isabel Allende (Chile)",
      work: "Cuentos de Eva Luna / La ciudad de las bestias",
      quote: "«Me llamo Eva, que significa vida, según un libro que mi madre consultó para elegir mi nombre. Nací en el último cuarto de una casa sombría y crecí entre muebles extravagantes y libros antiguos...»",
      analysis: "Aquí resalta el uso de la primera persona (narrador protagonista). La propia protagonista se presenta ante nosotros dotando al texto de intimidad, emoción y autenticidad.",
    },
  ],
};

export const MULTIPLE_CHOICE_QUESTIONS: MultipleChoiceItem[] = [
  {
    id: 1,
    question: "¿Qué es fundamentalmente un texto narrativo?",
    options: [
      "Un conjunto de instrucciones para armar un artefacto técnico.",
      "Un relato de acontecimientos reales o imaginarios que les suceden a personajes en un tiempo y lugar determinados.",
      "Una lista de rimas poéticas que no describe ninguna acción ni trama.",
      "Un diccionario con definiciones científicas y tablas estadísticas.",
    ],
    correctIndex: 1,
    explanation: "¡Exacto! El texto narrativo se define por relatar una secuencia de hechos o sucesos vividos por personajes.",
  },
  {
    id: 2,
    question: "¿Cuál es la diferencia primordial entre el 'Autor' y el 'Narrador'?",
    options: [
      "El autor es la persona real que escribe la obra; el narrador es la voz ficticia creada dentro del texto para relatar los hechos.",
      "El autor solo ilustra las tapas y el narrador compra los libros en la librería.",
      "Son obligatoriamente la misma persona en todas las novelas y cuentos de la literatura.",
      "El narrador es siempre el antagonista o villano de la historia.",
    ],
    correctIndex: 0,
    explanation: "¡Muy bien! El autor es la persona real (como Isabel Allende), mientras que el narrador es la entidad ficticia construida para guiar al lector.",
  },
  {
    id: 3,
    question: "Si una historia inicia con: 'Aquella mañana yo empaqué mi telescopio y corrí al bosque...', ¿qué tipo de narrador está presente?",
    options: [
      "Narrador omnisciente en tercera persona.",
      "Narrador protagonista en primera persona ('yo').",
      "Narrador enciclopédico.",
      "Narrador colectivo en segunda persona.",
    ],
    correctIndex: 1,
    explanation: "¡Brillante! El pronombre 'yo' y los verbos conjugados en primera persona identifican al narrador protagonista.",
  },
  {
    id: 4,
    question: "En la estructura narrativa clásica, ¿qué ocurre durante el 'Nudo o Conflicto'?",
    options: [
      "Se presentan los nombres de los editores y el índice del libro.",
      "Ocurre el problema o acontecimiento que rompe la calma inicial y desafía a los personajes.",
      "Se resuelve mágicamente la historia y todos regresan a descansar sin enfrentar desafíos.",
      "Es el momento donde finaliza por completo el cuento.",
    ],
    correctIndex: 1,
    explanation: "¡Correcto! El nudo o conflicto es el motor de la trama, donde se desata el problema principal que debe resolverse.",
  },
  {
    id: 5,
    question: "¿Qué característica distingue al 'Narrador Omnisciente'?",
    options: [
      "Solo conoce lo que ve desde una ventana cerrada.",
      "Lo sabe todo: los hechos pasados, presentes, futuros y los pensamientos o sentimientos íntimos de los personajes.",
      "Es un personaje secundario que no comprende lo que está sucediendo.",
      "Habla únicamente en tiempo futuro y con rimas consonantes.",
    ],
    correctIndex: 1,
    explanation: "¡Excelente! La palabra omnisciente proviene del latín 'omnis' (todo) y 'scire' (saber): quien todo lo sabe.",
  },
  {
    id: 6,
    question: "En el fragmento de 'Cien años de soledad' de Gabriel García Márquez, ¿qué representa 'Macondo' dentro de los elementos narrativos?",
    options: [
      "El personaje antagónico principal.",
      "El espacio o ambiente geográfico ficticio donde se desenvuelve la historia.",
      "El desenlace final de la novela.",
      "El tipo de rima métrica empleada.",
    ],
    correctIndex: 1,
    explanation: "¡Así es! Macondo es el espacio legendario e inolvidable concebido por Gabriel García Márquez.",
  },
  {
    id: 7,
    question: "¿Cómo se clasifican los personajes según su nivel de importancia en la trama?",
    options: [
      "Personajes sonoros y personajes mudos.",
      "Personajes principales (protagonistas/antagonistas) y secundarios.",
      "Personajes antiguos y personajes modernos.",
      "Personajes reales y personajes caligráficos.",
    ],
    correctIndex: 1,
    explanation: "¡Muy bien! Se distinguen principalmente entre personajes protagónicos (eje de la acción) y secundarios (de apoyo o contexto).",
  },
  {
    id: 8,
    question: "En el fragmento citado de Isabel Allende ('Me llamo Eva...'), ¿qué recurso se destaca en la narración?",
    options: [
      "Una descripción objetiva en un manual de botánica.",
      "La presentación en primera persona de la protagonista, compartiendo su identidad y origen.",
      "Un diálogo teatral entre tres actores en un escenario.",
      "Un poema lírico sin personajes ni acciones.",
    ],
    correctIndex: 1,
    explanation: "¡Perfecto! Eva Luna narra su propia historia desde una perspectiva íntima y testimonial en primera persona.",
  },
  {
    id: 9,
    question: "¿A qué se refiere el 'Tiempo Narrativo' cuando una historia da un salto al pasado para evocar un recuerdo?",
    options: [
      "A una falta ortográfica del escritor.",
      "A una alteración cronológica o 'flashback' (retrospección) para enriquecer el relato.",
      "A que el narrador se ha quedado sin ideas para continuar.",
      "A que la historia transcurre obligatoriamente en el siglo XIX.",
    ],
    correctIndex: 1,
    explanation: "¡Gran deducción! Los saltos temporales al pasado permiten comprender el origen de los sentimientos y decisiones de los personajes.",
  },
  {
    id: 10,
    question: "¿Cuál es el propósito del 'Desenlace' en un texto narrativo?",
    options: [
      "Plantear por primera vez a los personajes principales.",
      "Mostrar la solución del conflicto y el nuevo estado de equilibrio tras las vivencias ocurridas.",
      "Crear un nuevo nudo mucho más complejo sin resolver el anterior.",
      "Repetir exactamente el párrafo inicial palabra por palabra.",
    ],
    correctIndex: 1,
    explanation: "¡Maravilloso! El desenlace cierra los hilos de la trama y da una conclusión a los retos planteados.",
  },
];

export const TRUE_FALSE_QUESTIONS: TrueFalseItem[] = [
  {
    id: 1,
    statement: "El autor y el narrador son conceptos equivalentes y siempre representan a la misma persona.",
    isTrue: false,
    explanation: "FALSO: El autor es la persona real que crea la obra (como Gabriel García Márquez), mientras que el narrador es una creación artística que relata la historia.",
    requiredKeywordsForFalse: ["autor", "real", "narrador", "voz", "ficticia", "inventada", "creada", "persona"],
  },
  {
    id: 2,
    statement: "El 'Inicio' de un texto narrativo suele presentar a los personajes, el lugar y la situación de equilibrio inicial.",
    isTrue: true,
    explanation: "VERDADERO: En el inicio se establece el marco inicial de la historia antes de que ocurra el conflicto desencadenante.",
  },
  {
    id: 3,
    statement: "Un narrador omnisciente solo puede describir lo que ve con sus ojos y desconoce lo que sienten o sueñan los personajes.",
    isTrue: false,
    explanation: "FALSO: El narrador omnisciente lo sabe absolutamente todo, incluidos los pensamientos íntimos, emociones y el destino de los personajes.",
    requiredKeywordsForFalse: ["sabe", "todo", "pensamientos", "sentimientos", "emociones", "omnisciente"],
  },
  {
    id: 4,
    statement: "El espacio narrativo puede ser tanto un lugar geográfico 100% real como una ciudad o aldea totalmente imaginaria.",
    isTrue: true,
    explanation: "VERDADERO: La literatura combina espacios reales (como Valparaíso o Bogotá) y mundos fantásticos (como Macondo o Narnia).",
  },
  {
    id: 5,
    statement: "Los personajes secundarios son aquellos que resuelven el conflicto principal sin la intervención de la protagonista.",
    isTrue: false,
    explanation: "FALSO: Son los personajes principales (protagonistas) quienes conducen la acción central; los secundarios cumplen roles de apoyo, contraste o acompañamiento.",
    requiredKeywordsForFalse: ["principal", "protagonista", "secundario", "apoyo", "acompañan", "conflicto"],
  },
  {
    id: 6,
    statement: "El fragmento 'Muchos años después, frente al pelotón de fusilamiento...' de Gabriel García Márquez es un ejemplo de cómo el tiempo narrativo puede anticipar hechos del futuro y recordar el pasado.",
    isTrue: true,
    explanation: "VERDADERO: Es uno de los inicios más célebres de la literatura universal por su genial juego con el tiempo narrativo.",
  },
  {
    id: 7,
    statement: "En un cuento o novela no es necesario que exista un nudo o conflicto para que sea considerado texto narrativo.",
    isTrue: false,
    explanation: "FALSO: El conflicto o nudo es el núcleo indispensable de la narración, pues genera la tensión y motiva las acciones de los personajes.",
    requiredKeywordsForFalse: ["conflicto", "nudo", "necesario", "indispensable", "problema", "trama", "acciones"],
  },
];

export const WRITTEN_PROMPTS: WrittenPromptItem[] = [
  {
    id: 1,
    title: "Pregunta 1: Diferencia entre Autor y Narrador con ejemplos",
    prompt: "Explica con tus propias palabras la diferencia entre el autor y el narrador de un texto narrativo. Menciona cómo se refleja esto tomando como ejemplo a Isabel Allende o a Gabriel García Márquez.",
    guidance: "Asegúrate de explicar que el autor es la persona real y el narrador es la voz inventada (primera o tercera persona).",
    requiredKeywords: [
      ["autor", "autora", "escritor", "escritora", "real", "persona"],
      ["narrador", "voz", "personaje", "cuenta", "relata"],
      ["allende", "márquez", "garcía", "novela", "obra", "ejemplo", "primera", "tercera"],
    ],
    minimumWords: 18,
    sampleModelAnswer: "El autor es la persona de carne y hueso que escribe el libro, como Isabel Allende. El narrador es la voz ficticia creada dentro de la historia para contar lo que ocurre, la cual puede estar en primera persona (como Eva Luna) o en tercera persona omnisciente.",
  },
  {
    id: 2,
    title: "Pregunta 2: Estructura del relato: Inicio, Nudo y Desenlace",
    prompt: "Describe cuáles son los tres momentos esenciales de la estructura narrativa (Inicio, Nudo y Desenlace) y qué función cumple cada uno para mantener el interés de la lectora.",
    guidance: "Define con claridad qué ocurre en cada una de las tres etapas.",
    requiredKeywords: [
      ["inicio", "comienzo", "presentación"],
      ["nudo", "conflicto", "problema", "tensión"],
      ["desenlace", "final", "resolución", "solución"],
    ],
    minimumWords: 22,
    sampleModelAnswer: "La estructura se divide en Inicio (se presentan los personajes y el ambiente en calma), Nudo (aparece el conflicto o problema que desata la aventura) y Desenlace (se resuelve el desafío y se alcanza una nueva situación de equilibrio).",
  },
  {
    id: 3,
    title: "Pregunta 3: El poder del Narrador Omnisciente",
    prompt: "¿Por qué se dice que el narrador omnisciente 'lo sabe todo'? ¿En qué se diferencia de un narrador en primera persona (protagonista)?",
    guidance: "Explica el conocimiento total de pensamientos/emociones frente a la visión personal del protagonista.",
    requiredKeywords: [
      ["omnisciente", "tercera", "sabe todo", "todo"],
      ["pensamientos", "sentimientos", "emociones", "mente", "siente"],
      ["primera", "protagonista", "yo", "propia", "experiencia"],
    ],
    minimumWords: 20,
    sampleModelAnswer: "El narrador omnisciente se caracteriza porque conoce todo lo que ocurre, incluidos los pensamientos, temores y sentimientos íntimos de todos los personajes. En cambio, el narrador protagonista relata únicamente lo que él mismo vive y percibe en primera persona.",
  },
  {
    id: 4,
    title: "Pregunta 4: Análisis del Espacio y Macondo",
    prompt: "¿Qué importancia tiene el 'Espacio' en una narración y cómo el pueblo de 'Macondo' creado por Gabriel García Márquez ayuda a enriquecer el ambiente de la historia?",
    guidance: "Aborda el concepto de espacio/ambiente y su impacto en la magia del relato.",
    requiredKeywords: [
      ["espacio", "lugar", "ambiente", "atmósfera", "escenario"],
      ["macondo", "márquez", "garcía"],
      ["imaginario", "mágico", "aldea", "mundo", "historia", "personajes"],
    ],
    minimumWords: 18,
    sampleModelAnswer: "El espacio es el lugar físico y la atmósfera donde suceden las acciones. Macondo es un espacio mítico que crea un ambiente mágico, donde lo extraordinario convive con lo cotidiano y le da identidad única a la narración.",
  },
  {
    id: 5,
    title: "Pregunta 5: Crea tu propio Inicio Narrativo",
    prompt: "Escribe un breve párrafo de inicio para una historia inventada por ti. En él debes presentar: 1) a tu personaje protagonista, 2) el espacio donde se encuentra y 3) una pista del misterio o nudo que comenzará.",
    guidance: "Utiliza adjetivos vivos y redacta un comienzo emocionante.",
    requiredKeywords: [
      ["ella", "él", "yo", "niña", "joven", "protagonista", "nombre", "amiga"],
      ["bosque", "castillo", "ciudad", "casa", "lugar", "habitación", "río", "isla", "selva", "escuela"],
      ["misterio", "secreto", "descubrió", "encontró", "sombra", "llave", "mapa", "mágico", "extraño", "peligro"],
    ],
    minimumWords: 20,
    sampleModelAnswer: "Clara caminaba descalza por la orilla del lago cristalino cuando divisó un cofre dorado semioculto entre las raíces de un sauce centenario. Al tocarlo, una suave melodía despertó una luz brillante que anunciaba que nada volvería a ser igual.",
  },
];