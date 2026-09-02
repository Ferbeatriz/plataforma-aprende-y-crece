// Glosario de Dioses Egipcios - EduSphere Kids
export interface DiosGlosario {
  nombre: string;
  nombreEgipcio: string;
  nombreGrecoRomano: string;
  divinidadGriega: string;
  representacion: string;
  sinopsisResumida: string;
  imagenUrl: string;
}

export const diosesData: DiosGlosario[] = [
  {
    nombre: "Amón",
    nombreEgipcio: "Imen",
    nombreGrecoRomano: "Amón",
    divinidadGriega: "Zeus",
    representacion: "Humano coronado con dos largas plumas verticales",
    sinopsisResumida: "¡Hola! Soy Amón, el 'Oculto'. Al principio era un dios del aire, pero luego me convertí en el Rey de los Dioses. ¡Era tan importante que me unieron con Ra para formar a Amón-Ra! Mi historia es fascinante porque demuestra que incluso lo que no vemos tiene un poder enorme.",
    imagenUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Amun.svg/400px-Amun.svg.png"
  },
  {
    nombre: "Anubis",
    nombreEgipcio: "Anpu",
    nombreGrecoRomano: "Anubis",
    divinidadGriega: "Hermes",
    representacion: "Hombre con cabeza de chacal o chacal negro",
    sinopsisResumida: "¡Hola! Soy Anubis, el guía de los caminos invisibles. Mi trabajo es muy importante: ayudo a las almas a encontrar su camino y cuido que el juicio del corazón sea justo. No soy alguien a quien temer, sino un guardián protector que asegura que la verdad siempre brille.",
    imagenUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Anubis_standing.svg/400px-Anubis_standing.svg.png"
  },
  {
    nombre: "Isis",
    nombreEgipcio: "Aset",
    nombreGrecoRomano: "Isis",
    divinidadGriega: "Deméter",
    representacion: "Mujer con un trono en la cabeza o alas de milano",
    sinopsisResumida: "¡Hola! Soy Isis, la gran maga y protectora de las familias. Usé mi sabiduría y amor para proteger a mi hijo Horus y ayudar a los demás. Soy el modelo de cuidado inteligente: siempre hay una solución mágica cuando usamos nuestro corazón y nuestra inteligencia para ayudar.",
    imagenUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Isis_Louvre_Ma_3633.jpg/400px-Isis_Louvre_Ma_3633.jpg"
  },
  {
    nombre: "Ra",
    nombreEgipcio: "Ra",
    nombreGrecoRomano: "Helios",
    divinidadGriega: "Apolo",
    representacion: "Hombre con cabeza de halcón y disco solar",
    sinopsisResumida: "¡Hola! Soy Ra, el dios del Sol. Cada mañana viajo en mi barca solar para traer luz y calor al mundo. Mi viaje diario nos enseña que después de la noche más oscura, siempre sale el sol con nuevas oportunidades para brillar.",
    imagenUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Ra_Budge.svg/400px-Ra_Budge.svg.png"
  },
  {
    nombre: "Bastet",
    nombreEgipcio: "Bast",
    nombreGrecoRomano: "Bubastis",
    divinidadGriega: "Ártemis",
    representacion: "Mujer con cabeza de gata o gata doméstica",
    sinopsisResumida: "¡Hola! Soy Bastet, la diosa de la alegría, el hogar y la protección. Al igual que los gatitos, puedo ser muy dulce pero también protejo ferozmente lo que amo. Represento la felicidad de estar en casa y la importancia de cuidar a nuestros seres queridos.",
    imagenUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bastet.svg/400px-Bastet.svg.png"
  }
];
