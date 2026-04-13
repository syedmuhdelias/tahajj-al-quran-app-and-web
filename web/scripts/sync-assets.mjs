/**
 * Copies Flutter binary assets into web/public so dev server and build serve them.
 * Run: npm run sync-assets (also runs before dev/build via predev/prebuild).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, '..');
const flutterRoot = path.resolve(webRoot, '..');
const pub = path.join(webRoot, 'public');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`sync-assets: skip (missing): ${src}`);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const from = path.join(src, name);
    const to = path.join(dest, name);
    if (fs.statSync(from).isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

fs.mkdirSync(pub, { recursive: true });
copyDir(path.join(flutterRoot, 'assets', 'audio'), path.join(pub, 'assets', 'audio'));
copyDir(path.join(flutterRoot, 'assets', 'pdf'), path.join(pub, 'assets', 'pdf'));
fs.mkdirSync(path.join(pub, 'image'), { recursive: true });
const logo = path.join(flutterRoot, 'image', 'logo.png');
if (fs.existsSync(logo)) {
  fs.copyFileSync(logo, path.join(pub, 'image', 'logo.png'));
}
const icon512 = path.join(flutterRoot, 'image', 'playstore_icon_512.png');
if (fs.existsSync(icon512)) {
  fs.copyFileSync(icon512, path.join(pub, 'image', 'playstore_icon_512.png'));
}
const font = path.join(flutterRoot, 'assets', 'fonts', 'KFGQPCUthmanTahaNaskh.ttf');
fs.mkdirSync(path.join(pub, 'fonts'), { recursive: true });
if (fs.existsSync(font)) {
  fs.copyFileSync(font, path.join(pub, 'fonts', 'KFGQPCUthmanTahaNaskh.ttf'));
}

const pdfOut = path.join(pub, 'assets', 'pdf');
if (fs.existsSync(pdfOut)) {
  const pdfs = fs.readdirSync(pdfOut).filter((f) => f.toLowerCase().endsWith('.pdf'));
  console.log(`sync-assets: ${pdfs.length} PDF(s) in public/assets/pdf/`);
  if (pdfs.length === 0) {
    console.warn(
      'sync-assets: Tiada fail .pdf — pastikan folder Flutter assets/pdf/ ada dan mengandungi BAB1.pdf, dll.'
    );
  }
} else {
  console.warn('sync-assets: public/assets/pdf/ tidak dijumpai selepas salinan.');
}

console.log('sync-assets: selesai (audio, pdf, logo, font → public/).');
