import axios from 'axios';
import fs from 'fs/promises';

const baseUrl = 'https://mysteryplanet.com.ar/htmls/mitoegip/';
const letrasConContenido = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u'];
const allGods = [];

async function fetchPage(url) {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error al obtener ${url}:`, error.message);
    return null;
  }
}

function extractGodsFromHTML(html) {
  const gods = [];
  
  // Dividir el HTML en bloques de dioses usando <h3 id= como separador
  const blocks = html.split(/<h3 id="[^"]*">/).slice(1);
  
  console.log(`🔎 Encontrados ${blocks.length} bloques de dioses en esta página.`);
  
  for (const block of blocks) {
    const god = {
      nombre: '',
      nombreEgipcio: '',
      nombreGrecoRomano: '',
      divinidadGriega: '',
      representacion: '',
      sinopsis: ''
    };

    // Extraer el nombre del dios (está en la primera línea del bloque, en mayúsculas)
    const firstLine = block.split('\n')[0].trim();
    god.nombre = firstLine.replace(/<\/?[^>]+(>|$)/g, "").trim();

    // Extraer los campos usando expresiones regulares más flexibles
    const nombreEgipcioMatch = block.match(/Nombre egipcio:\s*([^.<>]*?)(?:<|\.|$)/);
    if (nombreEgipcioMatch) god.nombreEgipcio = nombreEgipcioMatch[1].trim();

    const nombreGrecoMatch = block.match(/Nombre griego\/romano:\s*([^.<>]*?)(?:<|\.|$)/);
    if (nombreGrecoMatch) god.nombreGrecoRomano = nombreGrecoMatch[1].trim();

    const divinidadMatch = block.match(/Divinidad griega:\s*([^.<>]*?)(?:<|\.|$)/);
    if (divinidadMatch) god.divinidadGriega = divinidadMatch[1].trim();

    const representacionMatch = block.match(/Representación:\s*([^.<>]*?)(?:<|\.|$)/);
    if (representacionMatch) god.representacion = representacionMatch[1].trim();

    // Extraer la sinopsis (todo lo que está dentro de <p align="justify"><b>Sinopsis:</b> ... </p>)
    const sinopsisMatch = block.match(/<p align="justify"><b>Sinopsis:<\/b>\s*([\s\S]*?)<\/p>/);
    if (sinopsisMatch) {
      // Limpiar etiquetas HTML y espacios extra
      god.sinopsis = sinopsisMatch[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    }

    // Solo añadir si el dios tiene un nombre
    if (god.nombre) {
      gods.push(god);
    }
  }

  return gods;
}

async function main() {
  console.log('🔍 Iniciando extracción de dioses egipcios...');
  console.log(`📋 Revisando ${letrasConContenido.length} letras con contenido...\n`);

  for (const letter of letrasConContenido) {
    const url = `${baseUrl}${letter}.htm`;
    console.log(`📥 Procesando letra: ${letter}`);

    const html = await fetchPage(url);
    if (!html) {
      console.log(`⚠️  No hay contenido para la letra ${letter}`);
      continue;
    }

    const gods = extractGodsFromHTML(html);
    if (gods.length > 0) {
      allGods.push(...gods);
      console.log(`✅ Encontrados ${gods.length} dioses en la letra ${letter}:`);
      console.log(`   ${gods.map(g => g.nombre).join(', ')}`);
    } else {
      console.log(`⚠️  No se encontraron dioses en la letra ${letter}`);
    }
  }

  try {
    await fs.writeFile('dioses_egipcios_completos.json', JSON.stringify(allGods, null, 2));
    console.log(`\n🎉 ¡Proceso completado! Se extrajeron ${allGods.length} dioses en total.`);
    console.log('📁 Archivo guardado como: dioses_egipcios_completos.json');
  } catch (error) {
    console.error('❌ Error al guardar el archivo:', error.message);
  }
}

main();