import axios from 'axios';
import fs from 'fs/promises';

const baseUrl = 'https://mysteryplanet.com.ar/htmls/mitoegip/';
const startChar = 'a'.charCodeAt(0);
const endChar = 'z'.charCodeAt(0);
const allGods = [];

async function fetchPage(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`❌ Error al obtener ${url}:`, error.message);
    return null;
  }
}

function extractGodsFromHTML(html) {
  const gods = [];
  const lines = html.split('\n');
  let currentGod = null;
  let currentField = 'sinopsis';
  let currentText = '';

  for (const line of lines) {
    const trimmed = line.trim();

    // Detecta título de dios: ## Amón
    if (trimmed.startsWith('## ')) {
      // Guarda el dios anterior si existe
      if (currentGod && currentGod.nombre) {
        if (currentText) {
          currentGod[currentField] = currentText.trim();
        }
        gods.push(currentGod);
      }

      // Inicia un nuevo dios
      currentGod = {
        nombre: trimmed.replace('## ', '').trim(),
        nombreEgipcio: '',
        nombreGrecoRomano: '',
        divinidadGriega: '',
        representacion: '',
        sinopsis: ''
      };
      currentField = 'sinopsis';
      currentText = '';
      continue;
    }

    // Si no hay dios activo, no procesamos
    if (!currentGod) continue;

    // Detecta campos clave
    const fieldMatch = trimmed.match(/^(Nombre egipcio|Nombre griego\/romano|Divinidad griega|Representación|Sinopsis):\s*(.*)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1].trim();
      const fieldValue = fieldMatch[2].trim();

      // Si ya tenemos texto para el campo anterior, lo guardamos
      if (currentText && currentGod[currentField] !== undefined) {
        currentGod[currentField] = currentText.trim();
        currentText = '';
      }

      // Asignamos el nuevo campo
      switch (fieldName) {
        case 'Nombre egipcio':
          currentGod.nombreEgipcio = fieldValue;
          currentField = null;
          break;
        case 'Nombre griego/romano':
          currentGod.nombreGrecoRomano = fieldValue;
          currentField = null;
          break;
        case 'Divinidad griega':
          currentGod.divinidadGriega = fieldValue;
          currentField = null;
          break;
        case 'Representación':
          currentGod.representacion = fieldValue;
          currentField = null;
          break;
        case 'Sinopsis':
          currentField = 'sinopsis';
          currentText = fieldValue;
          break;
        default:
          currentField = null;
      }
      continue;
    }

    // Si estamos en el campo sinopsis, acumulamos el texto
    if (currentField === 'sinopsis' && currentGod) {
      currentText += ' ' + trimmed;
    }
  }

  // Guarda el último dios
  if (currentGod && currentGod.nombre) {
    if (currentText) {
      currentGod[currentField] = currentText.trim();
    }
    gods.push(currentGod);
  }

  return gods;
}

async function main() {
  console.log('🔍 Iniciando extracción de dioses egipcios...');

  for (let i = startChar; i <= endChar; i++) {
    const letter = String.fromCharCode(i);
    const url = `${baseUrl}${letter}.htm`;
    console.log(`📥 Procesando letra: ${letter}`);

    const html = await fetchPage(url);
    if (!html) {
      console.log(`⚠️  No hay contenido para la letra ${letter}, continuando...`);
      continue;
    }

    const gods = extractGodsFromHTML(html);
    if (gods.length > 0) {
      allGods.push(...gods);
      console.log(`✅ Encontrados ${gods.length} dioses en la letra ${letter}`);
    } else {
      console.log(`⚠️  No se encontraron dioses en la letra ${letter}`);
    }
  }

  // Guardar el archivo JSON
  try {
    await fs.writeFile('dioses_egipcios_completos.json', JSON.stringify(allGods, null, 2));
    console.log(`\n🎉 ¡Proceso completado! Se extrajeron ${allGods.length} dioses.`);
    console.log(`📁 Archivo guardado como: dioses_egipcios_completos.json`);
  } catch (error) {
    console.error('❌ Error al guardar el archivo:', error.message);
  }
}

main();