import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Ensure .nojekyll in root, dist, and docs to disable GitHub Pages Jekyll processing
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '');

const distDir = path.join(rootDir, 'dist');
const distAssets = path.join(distDir, 'assets');
const rootAssets = path.join(rootDir, 'assets');
const docsDir = path.join(rootDir, 'docs');

if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

  // 2. Copy dist/assets to root ./assets so root index.html can load them directly on GitHub Pages
  if (fs.existsSync(distAssets)) {
    fs.cpSync(distAssets, rootAssets, { recursive: true, force: true });

    // Look for generated js and css and create index.js and index.css aliases for root index.html
    const assetFiles = fs.readdirSync(distAssets);
    const mainJs = assetFiles.find(f => f.endsWith('.js') && (f.startsWith('index') || f.includes('main')));
    if (mainJs) {
      fs.copyFileSync(path.join(distAssets, mainJs), path.join(rootAssets, 'index.js'));
    }
    const mainCss = assetFiles.find(f => f.endsWith('.css') && (f.startsWith('index') || f.includes('main')));
    if (mainCss) {
      fs.copyFileSync(path.join(distAssets, mainCss), path.join(rootAssets, 'index.css'));
    }
  }

  // 3. Mirror complete dist to ./docs for users deploying via GitHub Pages "Deploy from branch: main /docs"
  fs.cpSync(distDir, docsDir, { recursive: true, force: true });
  fs.writeFileSync(path.join(docsDir, '.nojekyll'), '');
}

// 4. Ensure public modules and data are mirrored to root so relative requests from root index.html resolve
const publicModules = path.join(rootDir, 'public', 'modules');
const rootModules = path.join(rootDir, 'modules');
if (fs.existsSync(publicModules)) {
  fs.cpSync(publicModules, rootModules, { recursive: true, force: true });
}

const publicData = path.join(rootDir, 'public', 'data');
const rootData = path.join(rootDir, 'data');
if (fs.existsSync(publicData)) {
  fs.cpSync(publicData, rootData, { recursive: true, force: true });
}

console.log('✓ Postbuild complete: root assets, root modules, docs/, dist/, and .nojekyll synchronized.');
