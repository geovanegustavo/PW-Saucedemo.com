// scripts/validate-sync.js
const fs = require('fs');
const path = require('path');

const featureFile = path.join(__dirname, '../features/login.feature');
const specFile = path.join(__dirname, '../tests/login.spec.js');

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

function validateSync() {
  const featureContent = fs.readFileSync(featureFile, 'utf-8');
  const specContent = fs.readFileSync(specFile, 'utf-8');

  const featureTitles = extractFeatureTitles(featureContent);
  const specTitles = extractSpecTitles(specContent);

  console.log('📄 Cenários Gherkin:', featureTitles);
  console.log('🧪 Testes Playwright:', specTitles);

  const missingInSpec = featureTitles.filter(t => !specTitles.includes(t));
  const missingInFeature = specTitles.filter(t => !featureTitles.includes(t));

  if (missingInSpec.length === 0 && missingInFeature.length === 0) {
    console.log('✅ Todos os títulos estão sincronizados!');
    process.exit(0); // sucesso
  } else {
    if (missingInSpec.length > 0) {
      console.error('❌ Cenários no .feature que não estão no .spec:', missingInSpec);
    }
    if (missingInFeature.length > 0) {
      console.error('❌ Testes no .spec que não estão no .feature:', missingInFeature);
    }
    process.exit(1); // falha no CI
  }
}

validateSync();
