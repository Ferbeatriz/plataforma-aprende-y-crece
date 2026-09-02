import fs from 'fs/promises';
import path from 'path';

const allGods = [];

// Función para extraer dioses de un texto
function extractGodsFromText(text) {
  const gods = [];
  const lines = text.split('\n');
  let currentGod = null;
  let currentField = null;
  let currentText = '';

  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed === '' || trimmed.startsWith('GLOSARIO DE DIOSES')) continue;
    
    // Detectar nombre de dios (mayúsculas, sin dos puntos, longitud entre 2 y 30)
    if (trimmed.match(/^[A-ZÁÉÍÓÚÑ\s]+$/) && !trimmed.includes(':') && trimmed.length > 2 && trimmed.length < 30) {
      if (currentGod && currentGod.nombre) {
        if (currentText && currentField) {
          currentGod[currentField] = currentText.trim();
        }
        gods.push(currentGod);
      }
      
      currentGod = {
        nombre: trimmed,
        nombreEgipcio: '',
        nombreGrecoRomano: '',
        divinidadGriega: '',
        representacion: '',
        sinopsis: ''
      };
      currentField = null;
      currentText = '';
      continue;
    }
    
    if (!currentGod) continue;
    
    const fieldMatch = trimmed.match(/^(NOMBRE EGIPCIO|NOMBRE GRIEGO\/ROMANO|DIVINIDAD GRIEGA|REPRESENTACIÓN|SINOPSIS):\s*(.*)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1].trim();
      const fieldValue = fieldMatch[2].trim();
      
      if (currentText && currentField && currentGod[currentField] !== undefined) {
        currentGod[currentField] = currentText.trim();
        currentText = '';
      }
      
      switch (fieldName) {
        case 'NOMBRE EGIPCIO':
          currentGod.nombreEgipcio = fieldValue;
          currentField = null;
          break;
        case 'NOMBRE GRIEGO/ROMANO':
          currentGod.nombreGrecoRomano = fieldValue;
          currentField = null;
          break;
        case 'DIVINIDAD GRIEGA':
          currentGod.divinidadGriega = fieldValue;
          currentField = null;
          break;
        case 'REPRESENTACIÓN':
          currentGod.representacion = fieldValue;
          currentField = null;
          break;
        case 'SINOPSIS':
          currentField = 'sinopsis';
          currentText = fieldValue;
          break;
        default:
          currentField = null;
      }
      continue;
    }
    
    if (currentField === 'sinopsis' && currentGod) {
      currentText += ' ' + trimmed;
    }
  }
  
  if (currentGod && currentGod.nombre) {
    if (currentText && currentField) {
      currentGod[currentField] = currentText.trim();
    }
    gods.push(currentGod);
  }
  
  return gods;
}

async function main() {
  console.log('🔍 Iniciando extracción de dioses egipcios desde todos los archivos de texto...');
  
  try {
    // Leer todos los archivos en el directorio actual
    const files = await fs.readdir('.');
    
    // Filtrar archivos que empiezan con "GLOSARIO DE DIOSES EGIPCIOS"
    const godFiles = files.filter(f => f.startsWith('GLOSARIO DE DIOSES EGIPCIOS') && f.endsWith('.txt'));
    
    console.log(`📋 Encontrados ${godFiles.length} archivos de glosarios.`);
    
    if (godFiles.length === 0) {
      console.log('⚠️  No se encontraron archivos de glosarios. Asegúrate de tener archivos como "GLOSARIO DE DIOSES EGIPCIOS (LETRA A).txt"');
      return;
    }
    
    // Procesar cada archivo
    let totalGods = 0;
    for (const file of godFiles) {
      console.log(`\n📄 Procesando: ${file}`);
      const textContent = await fs.readFile(file, 'utf-8');
      const gods = extractGodsFromText(textContent);
      
      if (gods.length > 0) {
        allGods.push(...gods);
        totalGods += gods.length;
        console.log(`✅ Encontrados ${gods.length} dioses en este archivo:`);
        gods.forEach(g => console.log(`   - ${g.nombre}`));
      } else {
        console.log(`⚠️  No se encontraron dioses en este archivo.`);
      }
    }
    
    if (allGods.length > 0) {
      await fs.writeFile('dioses_egipcios_completos.json', JSON.stringify(allGods, null, 2));
      console.log(`\n🎉 ¡Proceso completado! Se extrajeron ${totalGods} dioses en total.`);
      console.log('📁 Archivo guardado como: dioses_egipcios_completos.json');
    } else {
      console.log('⚠️  No se encontraron dioses en ningún archivo.');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();