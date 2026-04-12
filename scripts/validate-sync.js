// scripts/validate-sync.js
const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, '../features');
const specsDir = path.join(__dirname, '../tests');

// Extrai títulos dos cenários Gherkin
function extractFeatureTitles(content) {
  const regex = /Cenário:\s*(.+)/g;
  const titles = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    titles.push(match[1].trim());
  }
  return titles;
}

// Extrai títulos dos testes Playwright
function extractSpecTitles(content) {
  const regex = /test\(['"`](.+?)['"`]/g;
  const titles = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    titles.push(match[1].trim());
  }
  return titles;
}

function validateFilePair(featureFile, specFile) {
  const featureContent = fs.readFileSync(featureFile, 'utf-8');
  const specContent = fs.readFileSync(specFile, 'utf-8');

  const featureTitles = extractFeatureTitles(featureContent);
  const specTitles = extractSpecTitles(specContent);

  console.log(`\n📄 Validando: ${path.basename(featureFile)} ↔ ${path.basename(specFile)}`);
  console.log('   Cenários Gherkin:', featureTitles);
  console.log('   Testes Playwright:', specTitles);

  const missingInSpec = featureTitles.filter(t => !specTitles.includes(t));
  const missingInFeature = specTitles.filter(t => !featureTitles.includes(t));

  if (missingInSpec.length === 0 && missingInFeature.length === 0) {
    console.log('   ✅ Todos os títulos estão sincronizados!');
    return true;
  } else {
    if (missingInSpec.length > 0) {
      console.error('   ❌ Cenários no .feature que não estão no .spec:', missingInSpec);
    }
    if (missingInFeature.length > 0) {
      console.error('   ❌ Testes no .spec que não estão no .feature:', missingInFeature);
    }
    return false;
  }
}

function validateAll() {
  const featureFiles = fs.readdirSync(featuresDir).filter(f => f.endsWith('.feature'));
  const specFiles = fs.readdirSync(specsDir).filter(f => f.endsWith('.spec.js'));

  let allSynced = true;

  for (const featureFile of featureFiles) {
    const baseName = path.basename(featureFile, '.feature');
    const specFile = specFiles.find(f => f.startsWith(baseName));
    if (specFile) {
      const synced = validateFilePair(
        path.join(featuresDir, featureFile),
        path.join(specsDir, specFile)
      );
      if (!synced) allSynced = false;
    } else {
      console.error(`❌ Não foi encontrado .spec.js correspondente para ${featureFile}`);
      allSynced = false;
    }
  }

  if (!allSynced) {
    process.exit(1); // falha no CI
  } else {
    process.exit(0); // sucesso
  }
}

validateAll();
