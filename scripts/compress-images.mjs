#!/usr/bin/env node
// compress-images.mjs
// Compress images in <site>/public/images, convert them to one format,
// and delete the heavy originals and same-name duplicates.
//
// Setup (once):   npm install --save-dev sharp
// Run:            node scripts/compress-images.mjs
// Or with flags:  node scripts/compress-images.mjs site-hotel --format=jpg --max-kb=400 --max-width=2000
// Preview only:   add --dry-run

import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import readline from 'node:readline/promises';
import sharp from 'sharp';

const INPUT_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff', '.gif']);
const OUTPUT_FORMATS = { jpg: 'jpg', jpeg: 'jpg', webp: 'webp', png: 'png', avif: 'avif' };

// ---------- read flags ----------
const args = process.argv.slice(2);
const flags = Object.fromEntries(
  args.filter((a) => a.startsWith('--')).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);
const positional = args.filter((a) => !a.startsWith('--'));
const dryRun = Boolean(flags['dry-run']);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = async (q, fallback) => {
  try {
    const a = (await rl.question(fallback ? `${q} [${fallback}]: ` : `${q}: `)).trim();
    return a || fallback || '';
  } catch {
    return fallback || ''; // no keyboard input available: use the default
  }
};

const fmtKB = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;
const exists = (p) => fs.access(p).then(() => true, () => false);

// ---------- find the images folder ----------
async function pickImagesDir() {
  const cwd = process.cwd();
  const candidates = [];

  if (await exists(path.join(cwd, 'public', 'images'))) {
    candidates.push({ name: '. (this folder)', dir: path.join(cwd, 'public', 'images') });
  }
  for (const e of await fs.readdir(cwd, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name.startsWith('.') || e.name === 'node_modules') continue;
    const dir = path.join(cwd, e.name, 'public', 'images');
    if (await exists(dir)) candidates.push({ name: e.name, dir });
  }

  // site given on the command line
  if (positional[0]) {
    const given = path.resolve(cwd, positional[0]);
    for (const dir of [path.join(given, 'public', 'images'), path.join(given, 'images'), given]) {
      if (await exists(dir)) return dir;
    }
    throw new Error(`Cannot find an images folder for "${positional[0]}".`);
  }

  if (candidates.length === 0) {
    const typed = await ask('No public/images folder found. Type the folder path');
    const dir = path.resolve(cwd, typed);
    if (!(await exists(dir))) throw new Error(`Folder not found: ${dir}`);
    return dir;
  }

  console.log('\nSites with a public/images folder:');
  candidates.forEach((c, i) => console.log(`  ${i + 1}. ${c.name}`));
  const answer = await ask('Which site? (number or name)', '1');
  const byNumber = candidates[Number(answer) - 1];
  const byName = candidates.find((c) => c.name === answer);
  const chosen = byNumber || byName;
  if (!chosen) throw new Error(`"${answer}" is not in the list.`);
  return chosen.dir;
}

// ---------- compress one image ----------
async function encode(inputPath, format, maxKB, maxWidth) {
  const limit = maxKB * 1024;
  const meta = await sharp(inputPath).metadata();
  let width = Math.min(meta.width || maxWidth, maxWidth);
  const qualities = [82, 76, 70, 64, 58, 52, 46, 40, 34];
  let best = null;

  for (let attempt = 0; attempt < 6; attempt++) {
    for (const q of qualities) {
      let img = sharp(inputPath, { animated: false })
        .rotate() // respect camera orientation
        .resize({ width, withoutEnlargement: true });

      if (format === 'jpg') {
        img = img.flatten({ background: '#ffffff' }).jpeg({ quality: q, mozjpeg: true });
      } else if (format === 'webp') {
        img = img.webp({ quality: q });
      } else if (format === 'avif') {
        img = img.avif({ quality: Math.max(q - 25, 25) });
      } else {
        img = img.png({ palette: true, quality: q, compressionLevel: 9 });
      }

      const buf = await img.toBuffer();
      if (!best || buf.length < best.length) best = buf;
      if (buf.length <= limit) return { buffer: buf, width };
    }
    width = Math.round(width * 0.85); // still too big: make it smaller and try again
  }
  return { buffer: best, width, overLimit: true };
}

// ---------- main ----------
async function main() {
  const dir = await pickImagesDir();
  console.log(`\nFolder: ${dir}`);

  const formatInput = (flags.format || (await ask('Output format (jpg, webp, png, avif)', 'jpg'))).toLowerCase();
  const format = OUTPUT_FORMATS[formatInput];
  if (!format) throw new Error(`Unknown format "${formatInput}". Use jpg, webp, png or avif.`);

  const maxKB = Number(flags['max-kb'] || (await ask('Max file size in KB', '400')));
  const maxWidth = Number(flags['max-width'] || (await ask('Max width in pixels', '2000')));
  if (!maxKB || !maxWidth) throw new Error('Max size and max width must be numbers.');

  // collect images and group by name (room-1.png and room-1.jpg are the same image)
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const groups = new Map();
  for (const e of entries) {
    if (!e.isFile()) continue;
    const ext = path.extname(e.name).toLowerCase();
    if (!INPUT_EXTS.has(ext)) continue;
    const base = path.basename(e.name, path.extname(e.name));
    const full = path.join(dir, e.name);
    const stat = await fs.stat(full);
    if (!groups.has(base)) groups.set(base, []);
    groups.get(base).push({ full, name: e.name, size: stat.size, mtime: stat.mtimeMs });
  }

  if (groups.size === 0) {
    console.log('\nNo images found.');
    return;
  }

  console.log(`\nFound ${groups.size} image(s). ${dryRun ? '(dry run: nothing will change)' : ''}\n`);
  if (!dryRun && !flags.yes) {
    const ok = await ask(
      `Compress to .${format} under ${maxKB} KB and DELETE the old files? (y/n)`,
      'y'
    );
    if (!ok.toLowerCase().startsWith('y')) {
      console.log('Cancelled.');
      return;
    }
  }

  let before = 0;
  let after = 0;
  let deleted = 0;

  for (const [base, files] of [...groups.entries()].sort()) {
    // the newest file is the source. Older same-name files are duplicates.
    files.sort((a, b) => b.mtime - a.mtime);
    const [source, ...dupes] = files;
    const target = path.join(dir, `${base}.${format}`);
    const sourceIsTarget = path.resolve(source.full) === path.resolve(target);
    const groupBefore = files.reduce((n, f) => n + f.size, 0);
    before += groupBefore;

    // already fine: right format, small enough, no duplicates
    if (sourceIsTarget && dupes.length === 0 && source.size <= maxKB * 1024) {
      const meta = await sharp(source.full).metadata();
      if ((meta.width || 0) <= maxWidth) {
        console.log(`  skip     ${source.name} (${fmtKB(source.size)}, already fine)`);
        after += source.size;
        continue;
      }
    }

    try {
      const { buffer, width, overLimit } = await encode(source.full, format, maxKB, maxWidth);
      const note = overLimit ? '  (could not reach the size limit)' : '';
      console.log(
        `  ${dryRun ? 'would do' : 'done    '} ${source.name} ${fmtKB(source.size)} -> ${base}.${format} ${fmtKB(buffer.length)} (${width}px wide)${note}`
      );
      after += buffer.length;
      if (dryRun) continue;

      // write to a temp file first, so a crash never leaves a broken image
      const tmp = path.join(dir, `.${base}.tmp`);
      await fs.writeFile(tmp, buffer);
      await fs.rename(tmp, target);

      // delete the old heavy files (the original and same-name duplicates)
      for (const f of files) {
        if (path.resolve(f.full) === path.resolve(target)) continue;
        await fs.unlink(f.full);
        deleted++;
        console.log(`  deleted  ${f.name}`);
      }
    } catch (err) {
      console.log(`  FAILED   ${source.name}: ${err.message} (original kept)`);
      after += groupBefore;
    }
  }

  // warn about identical files with different names (not deleted, so the site does not break)
  const finalFiles = (await fs.readdir(dir)).filter((n) => INPUT_EXTS.has(path.extname(n).toLowerCase()));
  const hashes = new Map();
  for (const name of finalFiles) {
    const hash = crypto.createHash('md5').update(await fs.readFile(path.join(dir, name))).digest('hex');
    hashes.set(hash, [...(hashes.get(hash) || []), name]);
  }
  for (const names of hashes.values()) {
    if (names.length > 1) console.log(`\n  note: these files are identical: ${names.join(', ')}`);
  }

  console.log(`\nTotal: ${fmtKB(before)} -> ${fmtKB(after)}. Deleted ${deleted} old file(s).`);
}

main()
  .catch((err) => {
    console.error(`\nError: ${err.message}`);
    process.exitCode = 1;
  })
  .finally(() => rl.close());
