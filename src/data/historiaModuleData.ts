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
  requiredKeywords: string[][];
  minimumWords: number;
  sampleModelAnswer: string;
}

export interface CivilizationData {
  id: "grecia" | "roma";
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  theory: {
    title: string;
    introduction: string;
    sections: {
      title: string;
      icon: string;
      content: string;
      bulletPoints?: string[];
    }[];
    highlights: {
      title: string;
      desc: string;
      emoji: string;
    }[];
  };
  multipleChoice: MultipleChoiceItem[];
  trueFalse: TrueFalseItem[];
  writtenPrompts: WrittenPromptItem[];
}

export const HISTORIA_DATA: Record<"grecia" | "roma", CivilizationData> = {
  grecia: {
    id: "grecia",
    title: "La Antigua Grecia y su Legado Eterno",
    subtitle: "Filosofía, democracia, polis independientes y los primeros Juegos Olímpicos",
    badge: "Cuna de la Democracia 🏛️",
    icon: "🏛️",
    theory: {
      title: "¿Cómo vivían los antiguos griegos y qué nos legaron?",
      introduction: "Hace más de 2.000 años, en la península de los Balcanes y las islas del mar Egeo (un territorio que llamaban la Hélade), floreció la civilización griega. Debido a su relieve lleno de montañas y valles aislados, no formaron un solo país unificado, sino ciudades-Estado independientes llamadas polis.",
      sections: [
        {
          title: "1. Geografía, Relieve y el Mar",
          icon: "🌊",
          content: "Grecia está rodeada por el mar Mediterráneo, el mar Egeo y el mar Jónico. Al ser un territorio tan montañoso, los valles estaban aislados, lo que impulsó a los griegos a convertirse en expertos navegantes y comerciantes marítimos. Fundaron colonias por todo el Mediterráneo en busca de tierras fértiles.",
          bulletPoints: [
            "Clima mediterráneo: inviernos templados y veranos secos ideales para cultivar olivos (aceite), vides (uvas) y trigo.",
            "Dieta mediterránea: consumían pan, queso, higos, aceitunas, legumbres (habas y lentejas) y pescados.",
            "Moneda comercial: el famoso 'dracma' facilitaba las compras en el ágora.",
          ],
        },
        {
          title: "2. Las Polis: Ágora y Acrópolis",
          icon: "🏛️",
          content: "Cada polis funcionaba como un pequeño país con sus propias leyes, ejércitos y moneda. Sin embargo, todas compartían la misma lengua, religión y tradiciones helénicas.",
          bulletPoints: [
            "Acrópolis: la parte alta y fortificada de la ciudad donde se encontraban los templos principales (como el Partenón dedicado a Atenea).",
            "Ágora: la gran plaza pública y mercado central donde los ciudadanos conversaban de política y leyes.",
            "Esparta vs. Atenas: Atenas valoraba la democracia, las ciencias y las artes; Esparta era una polis militar gobernada por dos reyes donde se entrenaba con rigor a niños y niñas.",
          ],
        },
        {
          title: "3. Sociedad, Familia y Educación",
          icon: "👨‍👩‍👧",
          content: "La sociedad se dividía entre ciudadanos (hombres libres hijos de padre y madre de la polis) y no ciudadanos (mujeres, extranjeros llamados metecos, y esclavos sin libertad).",
          bulletPoints: [
            "Vivienda: las casas tenían un patio central con pozo y altar, el 'gineceo' (habitación para mujeres e infantes) y el 'andrón' (habitación para reuniones masculinas).",
            "Educación: hasta los 7 años se criaban en casa. Luego, los niños atenienses iban a la escuela con tres maestros (letras, música con cítara o aulós, y gimnasia). Las niñas aprendían labores del hogar.",
            "Vestimenta: usaban túnicas como el 'jitón' (hombres y mujeres) y el 'peplo' (lana para mujeres), con sandalias de cuero.",
          ],
        },
        {
          title: "4. Dioses del Olimpo y Mitología",
          icon: "⚡",
          content: "Eran politeístas y creían que sus dioses inmortales habitaban en la cima del monte Olimpo. Se parecían a los humanos en sentimientos y aspecto físico, pero dominaban las fuerzas de la naturaleza.",
          bulletPoints: [
            "Zeus (padre supremo y trueno), Poseidón (dios de los mares), Atenea (sabiduría y guerra justa), Hera (matrimonio), Deméter (agricultura) y Apolo (artes).",
            "Mitos: relatos fantásticos con héroes y monstruos para explicar el mundo (como el mito de Perséfone que explicaba el cambio de las estaciones).",
          ],
        },
        {
          title: "5. El Gran Legado Griego al Mundo",
          icon: "🌟",
          content: "Nuestra civilización actual está repleta de herencias griegas fundamentales:",
          bulletPoints: [
            "Democracia: nació en Atenas ('demos' = pueblo, 'kratos' = gobierno) donde los ciudadanos votaban levantando la mano en asambleas.",
            "Teatro: crearon la tragedia y la comedia; los actores usaban máscaras en teatros al aire libre.",
            "Juegos Olímpicos: nacieron en 776 a. C. en la polis de Olimpia en honor a Zeus con pruebas como el pentatlón.",
            "Filosofía y Ciencias: Sócrates, Platón, Aristóteles, Hipatia de Alejandría, Heródoto (padre de la historia) e Hipócrates (padre de la medicina).",
            "Arquitectura y Escultura: uso de frontones triangulares y columnas de mármol; estatuas con movimiento y proporción como el Discóbolo.",
          ],
        },
      ],
      highlights: [
        { title: "Democracia Ateniense", desc: "El poder de decidir en asamblea pública mediante el voto ciudadano.", emoji: "🗳️" },
        { title: "Juegos Olímpicos", desc: "Celebrados cada 4 años en Olimpia; el premio era una corona de olivo.", emoji: "🥇" },
        { title: "El Partenón", desc: "Templo cumbre de mármol erigido en la Acrópolis en honor a Atenea.", emoji: "🏛️" },
        { title: "Los Aedos y Homero", desc: "Poetas que cantaban de memoria grandes epopeyas como la Ilíada y la Odisea.", emoji: "📜" },
      ],
    },
    multipleChoice: [
      {
        id: 1,
        question: "¿En qué península europea se ubicó principalmente la civilización de la Antigua Grecia?",
        options: [
          "En la península ibérica.",
          "En la península de los Balcanes y las islas del mar Egeo.",
          "En la península escandinava.",
          "En la península de Yucatán.",
        ],
        correctIndex: 1,
        explanation: "¡Correcto! Los antiguos griegos habitaron la península de los Balcanes y las numerosas islas circundantes en la región que llamaban Hélade.",
      },
      {
        id: 2,
        question: "¿Qué era una 'polis' en la Antigua Grecia?",
        options: [
          "Un tipo de barco de guerra con remos.",
          "Una ciudad-Estado independiente con sus propias leyes, ejército y gobierno.",
          "Un instrumento musical de viento parecido a la flauta.",
          "Una prenda de vestir de lana para el invierno.",
        ],
        correctIndex: 1,
        explanation: "¡Excelente! Cada polis funcionaba de manera autónoma como un pequeño país debido a las barreras montañosas del territorio.",
      },
      {
        id: 3,
        question: "¿Cuál de las siguientes afirmaciones describe el 'Ágora' griega?",
        options: [
          "Era el puerto militar secreto donde se escondían los navíos.",
          "Era la plaza pública abierta donde funcionaba el mercado y los ciudadanos debatían sobre leyes y política.",
          "Era la habitación privada donde solo dormían los niños pequeños.",
          "Era el templo más alto situado en la cima de las montañas.",
        ],
        correctIndex: 1,
        explanation: "¡Muy bien! El ágora era el corazón social, cívico y comercial de la polis.",
      },
      {
        id: 4,
        question: "¿Quiénes eran considerados ciudadanos con derecho a votar en la democracia de Atenas?",
        options: [
          "Todos los hombres, mujeres, extranjeros y esclavos por igual.",
          "Únicamente los hombres libres mayores de edad e hijos de padre y madre atenienses.",
          "Solo los extranjeros adinerados que tenían barcos mercantes.",
          "Las mujeres que sabían tocar la cítara en el teatro.",
        ],
        correctIndex: 1,
        explanation: "¡Así es! En Atenas la ciudadanía estaba restringida a los varones libres de padres atenienses; mujeres, esclavos y extranjeros no votaban.",
      },
      {
        id: 5,
        question: "¿En qué se diferenciaba principalmente la polis de Esparta respecto de Atenas?",
        options: [
          "Esparta no tenía ejército y se dedicaba únicamente a escribir comedias.",
          "Esparta estaba gobernada por dos reyes y centraba la vida y la educación en la preparación militar y la valentía.",
          "En Esparta estaba prohibido hacer deportes y gimnasia.",
          "Esparta estaba ubicada dentro de una isla volcánica en el mar Negro.",
        ],
        correctIndex: 1,
        explanation: "¡Brillante! Esparta era una sociedad guerrera muy estricta que valoraba la disciplina militar y la obediencia sobre las artes.",
      },
      {
        id: 6,
        question: "¿Cómo se llamaba la habitación de la casa griega reservada exclusivamente para las mujeres y niños pequeños?",
        options: ["Andrón", "Gineceo", "Acrópolis", "Coliseo"],
        correctIndex: 1,
        explanation: "¡Correcto! El gineceo era el espacio femenino del hogar donde se criaba a los niños y se realizaban tareas textiles.",
      },
      {
        id: 7,
        question: "¿Cuál era el propósito de los primeros Juegos Olímpicos celebrados en 776 a. C. en Olimpia?",
        options: [
          "Elegir al nuevo rey de toda Europa.",
          "Rendir tributo y honor al dios supremo Zeus mediante competencias atléticas de pentatlón.",
          "Vender vasijas de cerámica al ejército persa.",
          "Comprar esclavos traídos desde Egipto.",
        ],
        correctIndex: 1,
        explanation: "¡Exacto! Los Juegos Olímpicos se realizaban cada 4 años en honor a Zeus, y los atletas ganaban una corona de hojas de olivo.",
      },
      {
        id: 8,
        question: "¿Quién es considerado el 'Padre de la Historia' por haber escrito por primera vez relatos sobre las guerras médicas?",
        options: ["Heródoto", "Hipócrates", "Tales de Mileto", "Pericles"],
        correctIndex: 0,
        explanation: "¡Excelente! Heródoto escribió 'Historias' registrando los acontecimientos del pasado con método testimonial.",
      },
      {
        id: 9,
        question: "¿Qué tres maestros educaban a los niños atenienses a partir de los siete años?",
        options: [
          "Un cocinero, un marinero y un alfarero.",
          "El maestro de letras (lectura/escritura), el de música (cítara/aulós) y el de gimnasia (deportes).",
          "Tres generales del ejército espartano.",
          "Un astrónomo, un gladiador y un carpintero.",
        ],
        correctIndex: 1,
        explanation: "¡Muy bien! La educación ateniense buscaba el equilibrio armonioso entre intelecto, sensibilidad artística y fortaleza física.",
      },
      {
        id: 10,
        question: "¿Por qué los antiguos griegos llamaban a su religión 'politeísta'?",
        options: [
          "Porque no creían en ninguna divinidad.",
          "Porque creían en muchos dioses que habitaban en el monte Olimpo.",
          "Porque adoraban únicamente al emperador romano.",
          "Porque solo creían en las estrellas del firmamento.",
        ],
        correctIndex: 1,
        explanation: "¡Perfecto! 'Poli' significa muchos y 'teos' dios: los griegos creían en una familia de dioses olímpicos con atributos humanos.",
      },
    ],
    trueFalse: [
      {
        id: 1,
        statement: "En la Antigua Grecia todas las ciudades estaban unidas bajo el mandato de un único rey supremo que gobernaba toda la península.",
        isTrue: false,
        explanation: "FALSO: Los griegos vivían en 'polis' o ciudades-Estado totalmente independientes entre sí (como Atenas, Esparta y Corinto), con leyes y gobiernos propios.",
        requiredKeywordsForFalse: ["polis", "independientes", "ciudades", "propias", "leyes", "gobierno", "separadas"],
      },
      {
        id: 2,
        statement: "El relieve montañoso y la abundancia de costas e islas impulsaron a los antiguos griegos a desarrollar el comercio marítimo.",
        isTrue: true,
        explanation: "VERDADERO: El terreno montañoso dificultaba el transporte terrestre, por lo que el mar se convirtió en su principal vía de comunicación y comercio.",
      },
      {
        id: 3,
        statement: "En la democracia ateniense, las mujeres tenían derecho a votar en las asambleas del ágora y podían ser elegidas magistradas.",
        isTrue: false,
        explanation: "FALSO: En Atenas las mujeres no eran consideradas ciudadanas con derechos políticos; no podían votar ni ocupar cargos de gobierno.",
        requiredKeywordsForFalse: ["mujeres", "ciudadanas", "votar", "derechos", "políticos", "no podían", "varones"],
      },
      {
        id: 4,
        statement: "El Partenón fue un majestuoso templo construido con mármol en la Acrópolis de Atenas y estaba dedicado a la diosa Atenea.",
        isTrue: true,
        explanation: "VERDADERO: El Partenón es el símbolo más famoso de la arquitectura clásica griega y albergaba una gigantesca estatua de Atenea.",
      },
      {
        id: 5,
        statement: "En el teatro griego las obras eran protagonizadas tanto por hombres como por mujeres sin necesidad de usar máscaras.",
        isTrue: false,
        explanation: "FALSO: En el teatro griego solo los hombres podían actuar, y utilizaban grandes máscaras para representar diferentes personajes y emociones.",
        requiredKeywordsForFalse: ["hombres", "máscaras", "mujeres", "actores", "solo"],
      },
      {
        id: 6,
        statement: "Los poemas épicos de la 'Ilíada' y la 'Odisea' fueron transmitidos de memoria por cantores llamados aedos y se atribuyen a Homero.",
        isTrue: true,
        explanation: "VERDADERO: Los aedos cantaban estas historias acompañados de instrumentos de cuerda como la cítara antes de ser plasmadas por escrito.",
      },
      {
        id: 7,
        statement: "El premio que recibían los atletas vencedores en los antiguos Juegos Olímpicos de Olimpia era una medalla de oro y diamantes.",
        isTrue: false,
        explanation: "FALSO: El premio tradicional para los campeones olímpicos era una corona de hojas de olivo sagrado y el honor supremo en su polis.",
        requiredKeywordsForFalse: ["corona", "olivo", "hojas", "honor", "medallas"],
      },
    ],
    writtenPrompts: [
      {
        id: 1,
        title: "Pregunta 1: La Influencia del Relieve en el Surgimiento de las Polis",
        prompt: "Explica cómo el relieve montañoso de la península de los Balcanes influyó en que los griegos se organizaran en 'polis' independientes y se volcaran al comercio marítimo por el mar Mediterráneo.",
        guidance: "Menciona las montañas, los valles aislados, las ciudades-Estado independientes (polis) y el mar como medio de transporte y comercio.",
        requiredKeywords: [
          ["montañas", "montañoso", "relieve", "valles"],
          ["polis", "ciudades", "independientes", "estado"],
          ["mar", "marítimo", "comercio", "navegantes", "mediterráneo", "costas"],
        ],
        minimumWords: 20,
        sampleModelAnswer: "El territorio griego estaba lleno de cadenas montañosas que aislaban los valles entre sí. Por esta razón, en lugar de unirse en un solo reino, formaron polis independientes con gobiernos propios y utilizaron el mar Mediterráneo para navegar y comerciar.",
      },
      {
        id: 2,
        title: "Pregunta 2: Comparación entre la Democracia Griega y la Democracia Actual",
        prompt: "Compara la democracia que nació en Atenas con la democracia que tenemos hoy en día (por ejemplo en Chile o Latinoamérica). ¿Quiénes votaban antes y quiénes pueden votar hoy? ¿Cómo era el voto?",
        guidance: "Explica que en Atenas solo votaban hombres libres a mano alzada, mientras que hoy votan mujeres y hombres mayores de edad con voto secreto.",
        requiredKeywords: [
          ["atenas", "ateniense", "antigua"],
          ["hombres", "varones", "mujeres"],
          ["voto", "secreto", "alzada", "ciudadanos", "elecciones", "urna"],
        ],
        minimumWords: 22,
        sampleModelAnswer: "En la democracia ateniense solo participaban los hombres libres mayores de edad a mano alzada en el ágora, excluyendo a mujeres y esclavos. En la democracia actual, todos los hombres y mujeres mayores de 18 años son ciudadanos con derecho a voto secreto en urnas.",
      },
      {
        id: 3,
        title: "Pregunta 3: El Ágora y la Acrópolis: Dos Espacios Fundamentales",
        prompt: "Describe las diferencias entre la 'Acrópolis' y el 'Ágora' dentro de una polis griega tradicional y explica qué actividades se realizaban en cada una.",
        guidance: "Define la Acrópolis como la zona alta y sagrada con templos, y el Ágora como la plaza baja de mercado y debate político.",
        requiredKeywords: [
          ["acrópolis", "alta", "templos", "sagrada", "defensa"],
          ["ágora", "plaza", "mercado", "comercio", "reunión", "asambleas", "ciudadanos"],
        ],
        minimumWords: 20,
        sampleModelAnswer: "La Acrópolis era la parte más alta y fortificada de la ciudad donde se construían los templos sagrados como el Partenón. En cambio, el Ágora era la plaza abierta en la zona baja donde se instalaba el mercado y los ciudadanos se reunían a debatir sobre leyes y comercio.",
      },
      {
        id: 4,
        title: "Pregunta 4: Esparta vs. Atenas: Dos Modelos Opuestos de Vida",
        prompt: "Compara la vida y educación en Esparta con la vida en Atenas. ¿Qué valores eran prioritarios para los espartanos y cuáles para los atenienses?",
        guidance: "Menciona la formación guerrera, valentía y disciplina en Esparta, frente a la democracia, filosofía, artes y ciencias en Atenas.",
        requiredKeywords: [
          ["esparta", "espartanos", "militar", "guerrera", "disciplina", "valentía"],
          ["atenas", "atenienses", "democracia", "artes", "filosofía", "cultura"],
        ],
        minimumWords: 22,
        sampleModelAnswer: "Esparta priorizaba la formación militar, la disciplina física y la valentía en el combate, educando tanto a niños como niñas con gran rigor. En cambio, Atenas valoraba la democracia, el pensamiento crítico, las artes, la filosofía y el debate en la asamblea.",
      },
      {
        id: 5,
        title: "Pregunta 5: Los Legados Griegos en Nuestra Vida Cotidiana",
        prompt: "Elige dos legados de los antiguos griegos (por ejemplo: el teatro, los Juegos Olímpicos, el alfabeto o la medicina de Hipócrates) y explica por qué siguen siendo importantes para nosotras hoy.",
        guidance: "Explica dos aportes concretos y cómo los disfrutamos o aplicamos en la sociedad actual.",
        requiredKeywords: [
          ["teatro", "olímpicos", "juegos", "alfabeto", "filosofía", "medicina", "hipócrates", "arquitectura"],
          ["actualidad", "hoy", "legado", "importancia", "deportes", "salud", "letras"],
        ],
        minimumWords: 22,
        sampleModelAnswer: "Los Juegos Olímpicos nacieron en Grecia en honor a Zeus y hoy continúan reuniendo a atletas de todo el mundo cada cuatro años. Además, el teatro con sus tragedias y comedias nos enseñó a representar historias con emoción y reflexión en escenarios modernos.",
      },
    ],
  },

  roma: {
    id: "roma",
    title: "La Antigua Roma y su Gran Imperio",
    subtitle: "Patricios y plebeyos, acueductos monumentales, derecho romano y la vida cotidiana",
    badge: "Ingeniería y Leyes 🏺",
    icon: "🏺",
    theory: {
      title: "¿Cómo vivían los antiguos romanos y cuál es su legado?",
      introduction: "La civilización romana nació en el centro de la península itálica (con forma de bota) a orillas del río Tíber y rodeada por siete colinas protectoras. Con el paso de los siglos, Roma conquistó todos los territorios alrededor del mar Mediterráneo, al que llamaron con orgullo Mare Nostrum ('Nuestro Mar').",
      sections: [
        {
          title: "1. Origen, Siete Colinas y Mare Nostrum",
          icon: "🐺",
          content: "Según el mito, los gemelos Rómulo y Remo fueron salvados por una loba del río Tíber, y Rómulo fundó la ciudad en el 753 a. C. sobre el monte Palatino. Geográficamente, las siete colinas los protegían de los pantanos y los enemigos, mientras que el río Tíber les brindaba agua dulce y salida al mar Tirreno.",
          bulletPoints: [
            "Península itálica: montañosa (Alpes al norte y Apeninos a lo largo) con fértiles llanuras y clima mediterráneo.",
            "Recursos agrícolas: trigo, olivos (aceite para comida, lámparas y piel) y vides para producir vino en recipientes de greda.",
            "Mare Nostrum: el mar Mediterráneo unió tres continentes (Europa, África y Asia) para el comercio y el ejército.",
          ],
        },
        {
          title: "2. Sociedad Romana: Patricios, Plebeyos y Esclavos",
          icon: "👥",
          content: "La población romana se dividía en tres grandes grupos:",
          bulletPoints: [
            "Patricios: familias ricas dueñas de tierras con plenos derechos políticos y cargos de senadores o magistrados.",
            "Plebeyos: la mayoría de personas libres (campesinos, artesanos, comerciantes y soldados) que fueron ganando derechos con el tiempo.",
            "Esclavos: prisioneros de guerra o endeudados; eran propiedad de sus amos y trabajaban en el campo, casas y obras públicas.",
          ],
        },
        {
          title: "3. La Familia, Educación y Tipos de Vivienda",
          icon: "🏡",
          content: "La familia estaba gobernada con autoridad absoluta por el 'pater familias' (padre de familia). La esposa cuidaba la casa y salía a espectáculos.",
          bulletPoints: [
            "La Domus: casa lujosa de un solo piso para una familia rica, con un atrio (patio con pileta de agua de lluvia) y un peristilo con jardines y columnas.",
            "La Ínsula: edificio de varios pisos con departamentos pequeños de ladrillo y madera donde vivían arrendadas las familias humildes.",
            "Termopolios: antiguos locales de 'comida rápida' con mesones en forma de L y vasijas empotradas con guisos y salchichas para quienes no tenían cocina.",
          ],
        },
        {
          title: "4. Grandes Obras de Ingeniería y Ciudad",
          icon: "🛣️",
          content: "Los romanos fueron los mejores ingenieros de la antigüedad gracias al invento del hormigón y el arco de medio punto:",
          bulletPoints: [
            "Acueductos: canales y puentes con arcos que transportaban agua limpia desde las montañas hasta las fuentes y termas de la ciudad.",
            "Termas públicas: baños comunitarios con piscinas de agua fría, templada y caliente, biblioteca y gimnasio.",
            "Red de calzadas: más de 80.000 km de caminos empedrados con miliarios que conectaban todo el imperio ('todos los caminos conducen a Roma').",
            "Cloacas: alcantarillado subterráneo que evacuaba aguas servidas hacia los ríos.",
            "Edificios de ocio: el Coliseo (anfiteatro para luchas de gladiadores) y el Circo Máximo (carreras de carros).",
          ],
        },
        {
          title: "5. Religión, Pompeya y los Grandes Legados",
          icon: "🏛️",
          content: "Iniciaron siendo politeístas (Júpiter, Marte, Venus, Minerva) asimilando dioses griegos, hasta que en 380 d. C. el Cristianismo fue proclamado religión oficial.",
          bulletPoints: [
            "Pompeya (79 d. C.): la erupción del volcán Vesubio conservó la vida romana bajo ceniza como una fotografía histórica.",
            "El Latín: idioma del cual nacieron el español, italiano, portugués y francés.",
            "El Derecho Romano: origen de nuestras leyes escritas (la Ley de las 12 Tablas, juicios orales, abogados y proporcionalidad de penas).",
            "El Calendario Juliano: creado por Julio César con 365 días y año bisiesto.",
            "El Periódico: el 'Acta Diurna' con noticias públicas talladas en piedra en el foro.",
          ],
        },
      ],
      highlights: [
        { title: "El Derecho Romano", desc: "Base de las leyes modernas: juicios justos, leyes escritas y defensa legal.", emoji: "⚖️" },
        { title: "Acueductos y Hormigón", desc: "Ingeniería monumental que llevó agua limpia y construyó arcos indestructibles.", emoji: "💧" },
        { title: "El Idioma Latín", desc: "La lengua madre que dio origen al español que hablamos todos los días.", emoji: "🗣️" },
        { title: "El Coliseo y Termas", desc: "Espacios públicos de reunión social, descanso e impresionantes espectáculos.", emoji: "🏟️" },
      ],
    },
    multipleChoice: [
      {
        id: 1,
        question: "¿A orillas de qué río y sobre cuántas colinas se fundó originalmente la ciudad de Roma?",
        options: [
          "A orillas del río Nilo sobre dos volcanes.",
          "A orillas del río Tíber sobre siete colinas.",
          "A orillas del río Amazonas en la selva.",
          "A orillas del río Danubio en una isla helada.",
        ],
        correctIndex: 1,
        explanation: "¡Correcto! Roma nació a orillas del río Tíber sobre siete colinas que ofrecían protección contra pantanos e invasiones.",
      },
      {
        id: 2,
        question: "¿Por qué los antiguos romanos llamaban al mar Mediterráneo 'Mare Nostrum' ('Nuestro Mar')?",
        options: [
          "Porque pensaban que el agua estaba hecha de vino dulce.",
          "Porque lograron conquistar y dominar todos los territorios que rodeaban sus costas en Europa, África y Asia.",
          "Porque estaba prohibido que navegaran barcos de pesca.",
          "Porque solo pertenecía a los dioses del monte Olimpo.",
        ],
        correctIndex: 1,
        explanation: "¡Exacto! El Imperio romano rodeó por completo las costas mediterráneas, convirtiéndolo en su principal arteria de comercio y comunicación.",
      },
      {
        id: 3,
        question: "¿Cómo se llamaba la máxima autoridad masculina en la familia romana que tomaba todas las decisiones?",
        options: ["Pater familias", "Gladiador supremo", "Edil público", "Cónsul menor"],
        correctIndex: 0,
        explanation: "¡Muy bien! El 'pater familias' ejercía el poder sobre la esposa, los hijos, los bienes y los esclavos del hogar.",
      },
      {
        id: 4,
        question: "¿Qué diferencia existía entre una 'Domus' y una 'Ínsula' en la arquitectura residencial romana?",
        options: [
          "La domus era un barco militar y la ínsula un templo de mármol.",
          "La domus era una casa unifamiliar espaciosa y lujosa de patricios; la ínsula era un edificio de varios pisos con departamentos para la mayoría del pueblo.",
          "En la domus solo vivían gladiadores y en la ínsula vivían los emperadores.",
          "La ínsula era una tienda de ropa y la domus una panadería.",
        ],
        correctIndex: 1,
        explanation: "¡Brillante! Las familias adineradas habitaban domus con atrio y peristilo, mientras los plebeyos arrendaban cuartos en ínsulas de varios pisos.",
      },
      {
        id: 5,
        question: "¿Qué eran los 'termopolios' en las ciudades romanas como Pompeya?",
        options: [
          "Fábricas de armas y escudos para el ejército.",
          "Locales de venta de comida preparada caliente y bebidas, similares a los restaurantes de comida rápida actuales.",
          "Cárceles subterráneas para los esclavos prófugos.",
          "Escuelas donde solo se enseñaba gramática griega.",
        ],
        correctIndex: 1,
        explanation: "¡Correcto! Los termopolios ofrecían guisos calientes, legumbres y salchichas en mesones en forma de L para quienes no tenían cocina en sus ínsulas.",
      },
      {
        id: 6,
        question: "¿Cuál fue la gran innovación de ingeniería que permitió a los romanos levantar arcos y acueductos tan resistentes?",
        options: [
          "El uso del pegamento de arcilla.",
          "El invento del hormigón y la técnica del arco de medio punto sostenido por presión.",
          "El uso de vigas de oro puro importadas de Asia.",
          "La construcción únicamente con hojas de papiro prensadas.",
        ],
        correctIndex: 1,
        explanation: "¡Excelente! El hormigón romano (mezcla de arena volcánica, cal y piedras) junto con el arco permitió construir puentes y acueductos milenarios.",
      },
      {
        id: 7,
        question: "¿Para qué servía la famosa red de calzadas romanas de más de 80.000 kilómetros?",
        options: [
          "Para realizar carreras de bicicletas.",
          "Para trasladar rápidamente a las legiones militares, transportar mercancías comerciales y conectar todo el imperio con Roma.",
          "Para adornar las playas del mar Tirreno con mosaicos.",
          "Para separar a los patricios de los plebeyos mediante muros.",
        ],
        correctIndex: 1,
        explanation: "¡Así es! Las calzadas como la Vía Apia facilitaron la administración, el comercio y la movilización militar por todo el imperio.",
      },
      {
        id: 8,
        question: "¿Qué suceso histórico ocurrió en el año 79 d. C. en la ciudad romana de Pompeya?",
        options: [
          "La invasión de piratas del mar Negro.",
          "La erupción del volcán Vesubio, que cubrió la ciudad de cenizas y conservó sus calles, murales y vida cotidiana intactos.",
          "La construcción del primer teatro de madera del mundo.",
          "La coronación de Julio César como emperador eterno.",
        ],
        correctIndex: 1,
        explanation: "¡Muy bien! Las cenizas del Vesubio congelaron la vida cotidiana de Pompeya en el tiempo, permitiendo a los arqueólogos conocerla a fondo.",
      },
      {
        id: 9,
        question: "¿Cuál de estos principios fundamentales proviene directamente del 'Derecho Romano'?",
        options: [
          "Las leyes pueden ser secretas y solo conocidas por los sacerdotes.",
          "Nadie puede ser condenado sin un juicio justo y las leyes deben estar escritas para que todos las conozcan.",
          "El rey puede cambiar las leyes cada mañana según su humor.",
          "Los castigos siempre deben ser el doble de la ofensa sin importar la prueba.",
        ],
        correctIndex: 1,
        explanation: "¡Excelente! El derecho romano sentó las bases de la justicia moderna: leyes escritas y públicas, juicio oral y presunción de inocencia.",
      },
      {
        id: 10,
        question: "¿De qué lengua de la Antigua Roma se originaron idiomas actuales como el español, el italiano y el francés?",
        options: ["Del latín", "Del jeroglífico", "Del fenicio antiguo", "Del sánscrito"],
        correctIndex: 0,
        explanation: "¡Perfecto! El latín se difundió por todo el imperio y evolucionó dando origen a las lenguas romances que hablamos hoy.",
      },
    ],
    trueFalse: [
      {
        id: 1,
        statement: "En la sociedad romana, los patricios y los plebeyos tenían exactamente la misma riqueza, tierras y privilegios desde el nacimiento de Roma.",
        isTrue: false,
        explanation: "FALSO: Los patricios eran una minoría rica y poderosa con tierras y control político; los plebeyos eran la mayoría trabajadora que luchó con el tiempo por sus derechos.",
        requiredKeywordsForFalse: ["patricios", "plebeyos", "ricos", "derechos", "diferencias", "tierras", "minoría"],
      },
      {
        id: 2,
        statement: "Los acueductos romanos transportaban agua limpia desde manantiales y montañas hacia las fuentes públicas y termas de las ciudades aprovechando la inclinación del terreno.",
        isTrue: true,
        explanation: "VERDADERO: Los ingenieros romanos diseñaron acueductos con pendiente constante y puentes de arcos para cruzar valles y abastecer de agua a la población.",
      },
      {
        id: 3,
        statement: "En la Antigua Roma estaba prohibido que la gente asistiera a espectáculos públicos como carreras de carros o luchas de gladiadores.",
        isTrue: false,
        explanation: "FALSO: Los espectáculos en el Coliseo y el Circo Máximo eran muy populares, multitudinarios y en su mayoría gratuitos para entretener a la ciudadanía.",
        requiredKeywordsForFalse: ["populares", "espectáculos", "coliseo", "circo", "gladiadores", "gratis", "asistían"],
      },
      {
        id: 4,
        statement: "Las calzadas romanas contaban con columnas de piedra llamadas 'miliarios' que indicaban las distancias hacia las ciudades más cercanas.",
        isTrue: true,
        explanation: "VERDADERO: Los miliarios cumplían una función similar a los letreros de kilometraje en las carreteras modernas.",
      },
      {
        id: 5,
        statement: "El 'Acta Diurna' romana es considerada uno de los antecesores del periódico moderno porque publicaba noticias públicas y decretos en el foro.",
        isTrue: true,
        explanation: "VERDADERO: El Acta Diurna se grababa en piedra o metal y luego en papiro para informar sobre victorias militares, precios y leyes.",
      },
      {
        id: 6,
        statement: "La religión cristiana fue la religión oficial de Roma desde el primer día en que se fundó la ciudad en el 753 a. C.",
        isTrue: false,
        explanation: "FALSO: Durante siglos Roma fue politeísta (adorando a Júpiter, Marte, Venus, etc.). El cristianismo nació siglos después y fue oficializado en el año 380 d. C.",
        requiredKeywordsForFalse: ["politeísta", "dioses", "cristianismo", "siglos", "380", "después", "júpiter"],
      },
      {
        id: 7,
        statement: "El calendario juliano de 365 días con un día extra en febrero cada cuatro años (año bisiesto) fue establecido por Julio César.",
        isTrue: true,
        explanation: "VERDADERO: Julio César reformó el calendario en el 46 a. C., sentando las bases del calendario solar que utilizamos en la actualidad.",
      },
    ],
    writtenPrompts: [
      {
        id: 1,
        title: "Pregunta 1: La Importancia de los Acueductos y el Agua en la Ciudad",
        prompt: "Explica cómo funcionaban los acueductos romanos y por qué fueron una obra de ingeniería tan importante para la salud, higiene y vida diaria de las personas en Roma.",
        guidance: "Describe cómo transportaban el agua desde las montañas hasta las fuentes públicas, termas y cloacas, y su impacto en la higiene de la ciudad.",
        requiredKeywords: [
          ["acueductos", "agua", "montañas", "canales", "puentes", "arcos"],
          ["fuentes", "termas", "baños", "higiene", "salud", "limpia"],
        ],
        minimumWords: 20,
        sampleModelAnswer: "Los acueductos transportaban agua limpia desde manantiales montañosos hasta la ciudad mediante canales con arcos inclinados. Esto permitió que miles de personas tuvieran agua potable gratis en fuentes públicas y pudieran bañarse en las termas, mejorando la higiene urbana.",
      },
      {
        id: 2,
        title: "Pregunta 2: Comparación entre la Domus y la Ínsula",
        prompt: "Compara cómo era vivir en una 'Domus' patricia frente a vivir en una 'Ínsula' plebeya. Menciona las comodidades, los espacios y las dificultades de cada vivienda.",
        guidance: "Contrasta la domus (casa espaciosa con atrio, patio y comodidades) con la ínsula (edificio de varios pisos de madera y ladrillo sin baño ni cocina propia).",
        requiredKeywords: [
          ["domus", "patricios", "rica", "atrio", "jardín", "patio", "espacio"],
          ["ínsula", "plebeyos", "pisos", "edificio", "arriendo", "cocina", "incendios"],
        ],
        minimumWords: 22,
        sampleModelAnswer: "La domus era una casa privada de una sola planta para patricios adinerados, decorada con mosaicos, atrio y jardín peristilo. En contraste, la ínsula era un edificio alto donde muchas familias humildes arrendaban habitaciones pequeñas y peligrosas sin baño ni cocina propia.",
      },
      {
        id: 3,
        title: "Pregunta 3: El Legado del Derecho Romano en las Leyes Actuales",
        prompt: "¿Por qué se afirma que el 'Derecho Romano' es uno de los mayores legados de Roma a la humanidad? Explica al menos dos principios romanos que siguen vigentes hoy.",
        guidance: "Menciona que las leyes deben estar escritas y ser públicas (como en el Diario Oficial), el derecho a un juicio oral con abogado y la proporcionalidad de las penas.",
        requiredKeywords: [
          ["derecho", "leyes", "romano"],
          ["escritas", "públicas", "conocidas", "juicio", "abogado", "justicia", "castigo"],
        ],
        minimumWords: 22,
        sampleModelAnswer: "El derecho romano es fundamental porque estableció que las leyes deben estar escritas y ser conocidas por toda la sociedad para evitar abusos. Además, instauró que nadie puede ser castigado sin un juicio previo ante un juez y con la ayuda de un abogado defensor.",
      },
      {
        id: 4,
        title: "Pregunta 4: La Red de Calzadas y el Dicho 'Todos los Caminos Conducen a Roma'",
        prompt: "¿Por qué eran tan importantes las calzadas para el Imperio romano y qué significa la célebre frase 'todos los caminos conducen a Roma'?",
        guidance: "Explica cómo conectaban Roma con todas las provincias para el comercio, el paso de soldados y la transmisión de órdenes y correo.",
        requiredKeywords: [
          ["calzadas", "caminos", "red", "vías", "piedras"],
          ["roma", "imperio", "conectar", "comercio", "soldados", "ejército", "traslado"],
        ],
        minimumWords: 20,
        sampleModelAnswer: "Las calzadas eran carreteras de piedra de más de 80.000 km que unían todas las provincias conquistadas con la capital. La frase significa que el sistema vial estaba diseñado para que cualquier persona pudiera viajar desde los confines del imperio en dirección directa a Roma.",
      },
      {
        id: 5,
        title: "Pregunta 5: Pompeya como Cápsula del Tiempo",
        prompt: "¿Por qué los restos arqueológicos de Pompeya tras la erupción del volcán Vesubio en el 79 d. C. nos permiten conocer la vida cotidiana de los romanos como en una fotografía?",
        guidance: "Explica cómo la ceniza volcánica conservó casas, termopolios, mosaicos, alimentos y grafitos en las paredes.",
        requiredKeywords: [
          ["pompeya", "vesubio", "volcán", "cenizas", "79"],
          ["conservó", "vida cotidiana", "mosaicos", "alimentos", "termopolios", "grafitos", "arqueología"],
        ],
        minimumWords: 22,
        sampleModelAnswer: "Cuando el volcán Vesubio hizo erupción en el 79 d. C., cubrió a Pompeya bajo una gruesa capa de cenizas y rocas. Esto protegió del deterioro a las casas, tiendas, termopolios, grafitos en los muros e incluso restos de pan y aceitunas, permitiéndonos ver cómo vivían exactamente.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Antiguo Egipto — lecciones de lectura (8 a 12 años)               */
/* ------------------------------------------------------------------ */

export type EgyptLessonId = "viaje-egipto" | "dioses-egipcios";

export interface HistoriaVisualPlaceholder {
  id: string;
  title: string;
  caption: string;
  emoji: string;
  gradientClass: string;
}

export interface HistoriaStoryBlock {
  heading: string;
  icon: string;
  paragraphs: string[];
  visual?: HistoriaVisualPlaceholder;
}

export interface HistoriaGodCard {
  name: string;
  meaning: string;
  powers: string;
  importance: string;
  natureLink: string;
  emoji: string;
  accentClass: string;
}

export interface HistoriaReadingLesson {
  id: EgyptLessonId;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  cardDescription: string;
  introduction: string;
  blocks: HistoriaStoryBlock[];
  gods?: HistoriaGodCard[];
  timelineNote?: string;
  closing: string;
}

export const HISTORIA_EGIPTO_LESSONS: HistoriaReadingLesson[] = [
  {
    id: "viaje-egipto",
    title: "El Viaje por el Tiempo en el Antiguo Egipto",
    subtitle: "Del Nilo predinástico a Cleopatra y Roma",
    badge: "Aventura en el Nilo 🪲",
    icon: "🪲",
    cardDescription:
      "Un cuento-viaje: aldeas junto al río, pirámides de piedra y la última reina antes de Roma.",
    introduction:
      "Imagina que abres un cofre de arena dorada y, dentro, brilla un escarabajo de vidrio verde. Lo tocas… y el suelo se vuelve suave como el lodo del río. El viento huele a papiro y a pan recién horneado. Una voz amable te susurra: «Bienvenida, viajera del tiempo. Te llevaré por el Antiguo Egipto, de las primeras aldeas hasta una reina que desafió al Imperio Romano». Toma aire. El Nilo ya está esperándote.",
    blocks: [
      {
        heading: "Cuando el río era el primer maestro",
        icon: "🌾",
        paragraphs: [
          "Hace más de cinco mil años —mucho antes de que existieran las grandes pirámides— la gente vivía en aldeas a orillas de un río larguísimo. No había un solo país llamado Egipto todavía. Había familias que pescaban, sembraban y observaban el cielo como si fuera un reloj enorme.",
          "Cada año el Nilo crecía, se desbordaba y dejaba sobre la tierra un barro oscuro y fértil, como si el río regalara un manto de chocolate para las plantas. Cuando las aguas bajaban, se sembraba trigo y cebada. Las niñas y los niños aprendían a contar las estaciones no con un calendario de pared, sino mirando el río: inundación, siembra y cosecha.",
          "Ese tiempo se llama periodo predinástico: la época «antes de los reyes de las dos tierras». Al norte, cerca del mar, el Delta se abría como un abanico verde. Al sur, el valle era un camino estrecho entre desiertos. Poco a poco las aldeas se unieron, aprendieron a trabajar el cobre, pintaron cerámica y soñaron con un líder que uniera todo el río.",
          "La leyenda cuenta que un gran unificador —a menudo llamado Narmer o Menes— juntó el Alto y el Bajo Egipto hacia el año 3100 antes de Cristo. Desde entonces, el faraón llevaba una corona doble: el blanco del sur y el rojo del norte. Egipto dejó de ser un puñado de aldeas y se convirtió en un reino con escritura, templos y un sueño compartido: que el orden, llamado maat, no se rompiera nunca.",
        ],
        visual: {
          id: "nilo",
          title: "El Río Nilo",
          caption:
            "Marcador de imagen: el río más famoso de África, cinta de vida entre dos desiertos, con barcas de papiro y orillas verdes.",
          emoji: "🌊",
          gradientClass:
            "bg-gradient-to-br from-sky-100 via-teal-50 to-emerald-100 border-teal-300",
        },
      },
      {
        heading: "Montañas para el cielo: las pirámides",
        icon: "🔺",
        paragraphs: [
          "Pasan los siglos. El reino crece. Los faraones quieren una casa eterna para su ka —la chispa de vida que, según creían, seguía existiendo después de la muerte—. Primero se construyeron mastabas, tumbas planas como mesas de adobe. Luego, el arquitecto Imhotep imaginó una pirámide escalonada en Saqqara, como una escalera para subir hacia las estrellas.",
          "Más tarde, cerca del año 2600 antes de Cristo, en la meseta de Giza, se alzaron las pirámides más famosas del mundo. La Gran Pirámide del faraón Keops (Jufu) era un rompecabezas de millones de bloques. Junto a ella crecieron las de Kefrén y Micerino, y la Gran Esfinge, un león con rostro humano que parece guardar el horizonte.",
          "¿Quién las construyó? No un ejército de «magos de la noche», sino miles de personas organizadas: canteros, carpinteros, panaderos, médicos y agricultores que, cuando el Nilo inundaba los campos y no se podía sembrar, ofrecían su trabajo al Estado. Vivían en poblados cerca de la obra, comían pan, cebolla y pescado, y dejaron grafitis alegres en las piedras, como firmas de equipos.",
          "Las pirámides no eran solo tumbas: eran máquinas de eternidad. Orientadas con el sol y las estrellas, decían al universo: «Aquí descansa un rey que mantiene el equilibrio del mundo». Aun hoy, si cierras los ojos frente a ellas, sientes el silencio del desierto y el rumor lejano del río que lo hizo posible.",
        ],
        visual: {
          id: "piramides",
          title: "Las Pirámides de Giza",
          caption:
            "Marcador de imagen: tres triángulos de piedra bajo un cielo de atardecer, con la Esfinge al acecho y arena dorada a sus pies.",
          emoji: "🏜️",
          gradientClass:
            "bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 border-amber-400",
        },
      },
      {
        heading: "Templos, reinas y un país que no se detuvo",
        icon: "🛕",
        paragraphs: [
          "Después del Imperio Antiguo vinieron tiempos de división y de reunificación. En el Imperio Medio, Egipto volvió a florecer con literatura, fuertes y canales. En el Imperio Nuevo —más o menos entre los años 1550 y 1070 antes de Cristo— los faraones gobernaron desde Tebas y construyeron templos enormes como Karnak y Luxor, donde las columnas parecían un bosque de piedra.",
          "Hubo reinas extraordinarias. Hatshepsut gobernó con corona de faraón y envió expediciones a tierras lejanas en busca de incienso y árboles extraños. Nefertiti aparece en un busto tan famoso que parece que todavía está a punto de hablar. Un niño rey, Tutankamón, durmió más de tres mil años con un máscara de oro hasta que el mundo moderno lo redescubrió.",
          "Los escribas —muchas veces varones, pero con niñas que también aprendían en casas nobles— copiaban historias en papiro. Los médicos mezclaban hierbas y hechizos. En las casas se jugaba al senet, un juego de tablero. Las fiestas olían a loto y a aceite perfumado. Egipto no era solo piedra: era gente riendo, trabajando y soñando junto al río.",
        ],
      },
      {
        heading: "Cleopatra y el último latido antes de Roma",
        icon: "👑",
        paragraphs: [
          "Llegan siglos más tardíos. Otros pueblos entran en escena: asirios, persas… y luego un joven conquistador llamado Alejandro Magno. Tras él, una familia griega, los Ptolomeos, gobierna Egipto desde Alejandría, una ciudad de faro legendario y de una biblioteca que quería guardar todos los saberes del mundo.",
          "En esa corte nace la protagonista más famosa del final: Cleopatra VII. No era una villana de cuento ni solo «la reina hermosa». Era una estratega brillante, hablaba varios idiomas y conocía el Nilo mejor que muchos generales. Se alió primero con Julio César y después con Marco Antonio, dos líderes de Roma, porque su misión era proteger la independencia de Egipto en un mundo donde Roma se tragaba reinos como quien recoge fichas de un juego.",
          "Roma, sin embargo, tenía otro jugador: Octavio, que más tarde sería el emperador Augusto. En el año 31 antes de Cristo, en una batalla naval cerca de Accio, la flota de Cleopatra y Antonio perdió. Al año siguiente, en el 30 antes de Cristo, Alejandría cayó. Cleopatra murió y Egipto dejó de ser un reino propio: se convirtió en provincia del Imperio Romano.",
          "El escarabajo de vidrio tiembla en tu mano. El viaje termina en un muelle de Alejandría, con el mar Mediterráneo brillando. El Nilo sigue fluyendo, las pirámides siguen en pie y el nombre de Cleopatra sigue encendiendo la imaginación. El tiempo no se llevó a Egipto: lo convirtió en una historia que ahora también es tuya.",
        ],
        visual: {
          id: "cleopatra",
          title: "Cleopatra VII",
          caption:
            "Marcador de imagen: la última reina de Egipto, con diadema real y el faro de Alejandría al fondo, mirando el Mediterráneo.",
          emoji: "👑",
          gradientClass:
            "bg-gradient-to-br from-fuchsia-100 via-rose-50 to-amber-100 border-rose-300",
        },
      },
    ],
    closing:
      "Has viajado desde las aldeas predinásticas, cruzado el Nilo, tocado (con la imaginación) las pirámides y saludado a Cleopatra en el umbral de Roma. Cuando quieras, abre la siguiente lección: el Gran Salón de los Dioses, donde el sol, el río y la noche tienen nombres.",
  },
  {
    id: "dioses-egipcios",
    title: "El Gran Salón de los Dioses Egipcios",
    subtitle: "Mitología para entender la naturaleza",
    badge: "Mitología amable ☀️",
    icon: "☀️",
    cardDescription:
      "Ra, Osiris, Isis, Horus y Anubis: nombres, poderes y por qué ayudaban a explicar el mundo.",
    introduction:
      "Empujas una puerta de cedro pintada de azul y oro. Estás en un salón silencioso, fresco como el interior de un templo. En las paredes, estrellas. En el suelo, un río pintado. Cinco figuras te esperan: no para asustarte, sino para contarte cómo el pueblo egipcio entendía el sol, las plantas, el cielo, el cuidado y el misterio de la muerte. Esta lección es independiente: puedes leerla aunque aún no hayas hecho el viaje por el tiempo.",
    timelineNote:
      "Estos dioses se adoraron durante más de 3.000 años. Un truco para recordarlo: imagina una línea desde cerca del año 3000 antes de Cristo (cuando nacían los primeros reinos junto al Nilo) hasta alrededor del año 400 después de Cristo (cuando el Imperio Romano ya existía y muchos templos se fueron cerrando). Eso es más tiempo que desde la llegada de Colón a América hasta hoy… ¡multiplicado y todavía sobra! Por eso sus historias se pintaron mil veces en tumbas, papiros y templos.",
    gods: [
      {
        name: "Ra",
        meaning: "El sol que viaja y da la vida",
        powers: "Luz, calor, el ciclo del día y la noche, la creación que se renueva cada amanecer.",
        importance:
          "Ra era el gran dios solar. Sin su viaje cotidiano, pensaban, el mundo se apagaría. Los faraones se decían «hijos de Ra» para mostrar que su poder venía del orden del cielo.",
        natureLink:
          "Mira el amanecer: el sol «nace» en el este, cruza el cielo (como Ra en su barca solar) y «muere» al atardecer para viajar por el mundo de abajo y volver a nacer. Es una forma poética de explicar el día y la noche.",
        emoji: "☀️",
        accentClass: "from-amber-100 to-yellow-50 border-amber-300",
      },
      {
        name: "Osiris",
        meaning: "El señor de la renovación y del Más Allá",
        powers: "Renacimiento, justicia de los muertos, la fuerza que hace volver verdes los campos.",
        importance:
          "Osiris fue un rey mítico que murió y volvió a la vida gracias al amor y la magia de Isis. Se convirtió en juez y rey del mundo de los muertos, prometiendo que la vida podía continuar de otro modo.",
        natureLink:
          "Cuando el Nilo inundaba y luego bajaba, la tierra parecía «morir» y «renacer» con brotes nuevos. Osiris, a menudo pintado con piel verde, era esa esperanza agrícola: lo que se entierra puede volver a crecer.",
        emoji: "🌿",
        accentClass: "from-emerald-100 to-teal-50 border-emerald-300",
      },
      {
        name: "Isis",
        meaning: "La gran maga, madre y protectora",
        powers: "Magia sanadora, protección de niñas y niños, lealtad familiar, sabiduría para recomponer lo roto.",
        importance:
          "Isis buscó los pedazos de Osiris y, con su poder, le devolvió la vida el tiempo suficiente para que naciera Horus. Era el modelo de cuidado inteligente: no solo llora, también actúa, estudia y protege.",
        natureLink:
          "Isis ayuda a entender el cuidado que la naturaleza (y las personas) necesitan para recuperarse: el agua que riega, el abrigo de la noche, el amor que repara. El río, el viento y la luna aparecen a menudo cerca de su historia.",
        emoji: "🦋",
        accentClass: "from-sky-100 to-indigo-50 border-sky-300",
      },
      {
        name: "Horus",
        meaning: "El cielo con alas de halcón",
        powers: "La realeza justa, la vista aguda, la protección del trono y el combate contra el caos.",
        importance:
          "Horus, hijo de Isis y Osiris, era el halcón que miraba el mundo desde arriba. Cada faraón vivo se presentaba como «Horus en la Tierra»: un recordatorio de que gobernar era cuidar, no solo mandar. El Ojo de Horus se usaba como amuleto de salud y plenitud.",
        natureLink:
          "El cielo diurno, el vuelo de las aves y la idea de «ver claro» (como un halcón) se unen en Horus. Su ojo herido y sanado también habla de la luna que mengua y crece.",
        emoji: "🦅",
        accentClass: "from-orange-100 to-rose-50 border-orange-300",
      },
      {
        name: "Anubis",
        meaning: "El guía amable de los caminos invisibles",
        powers: "Momificación, protección de las tumbas, acompañar a las almas y pesar el corazón con la verdad.",
        importance:
          "Anubis, con cabeza de chacal, no era un «villano oscuro». Era un cuidador. Preparaba el cuerpo para el viaje y, en el juicio, vigilaba que el corazón se pesara contra la pluma de la verdad (Maat). Si el corazón era ligero, el alma podía seguir.",
        natureLink:
          "Los chacales se veían al atardecer cerca del desierto y los cementerios. En vez de temerlos sin más, los egipcios imaginaron un dios que convertía ese límite entre pueblo y desierto en un guía. Anubis explica el respeto por los muertos y el misterio de la noche.",
        emoji: "🐺",
        accentClass: "from-violet-100 to-slate-50 border-violet-300",
      },
    ],
    blocks: [
      {
        heading: "¿Por qué inventaron (y amaron) estos relatos?",
        icon: "🌌",
        paragraphs: [
          "La mitología egipcia no era un videojuego de superhéroes: era una forma de conversar con la naturaleza. El sol sale y se pone. El río crece y baja. Las plantas se secan y vuelven. Las personas nacen, viven y mueren. Ponerle un nombre y una historia a cada fuerza ayudaba a no sentirse sola frente al desierto inmenso.",
          "Había muchos más dioses —Hathor de la alegría, Thot de la escritura, Bastet de la protección hogareña—, pero este salón te presenta cinco pilares. Si los recuerdas, ya puedes explicar con tus palabras cómo un pueblo antiguo unió ciencia observada (el Nilo, el sol, las estrellas) con poesía sagrada.",
        ],
      },
    ],
    closing:
      "Cierra la puerta del salón con suavidad. Ra seguirá cruzando el cielo mañana; Osiris e Isis seguirán hablando de renovación y cuidado; Horus vigilará el horizonte; Anubis cuidará los umbrales. Más de tres mil años de historias caben ahora en tu memoria… y en tu manera de mirar el río, el sol y la noche.",
  },
];
