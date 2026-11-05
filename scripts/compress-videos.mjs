#!/usr/bin/env node
// compress-videos.mjs
// Compress every video in one folder and convert it to .mp4 (H.264 + AAC),
// ready to upload to Cloudinary. Old files are deleted after the new one is saved.
//
// Needs ffmpeg. Either:  npm install --save-dev ffmpeg-static
//                or:     install ffmpeg on your computer (it must work in the terminal)
//
// Run:        node scripts/compress-videos.mjs
// Options:    --folder=videos   folder with the videos (default: ./videos)
//             --crf=28          quality: lower = better and bigger (default 28, range 18-34)
//             --max-height=1080 shrink videos taller than this (default 1080)
//             --dry-run         show what would happen, change nothing

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const VIDEO_EXTS = new Set(['.mp4', '.mov', '.mkv', '.avi', '.webm', '.m4v', '.wmv', '.flv', '.mpg', '.mpeg', '.3gp']);
const LOG_NAME = '.compressed.json'; // remembers finished files, so a second run does not re-encode them

// ---------- flags ----------
const flags = Object.fromEntries(
  process.argv.slice(2).filter((a) => a.startsWith('--')).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);
const folder = path.resolve(process.cwd(), flags.folder || 'videos');
const crf = Number(flags.crf || 28);
const maxHeight = Number(flags['max-height'] || 1080);
const dryRun = Boolean(flags['dry-run']);

const fmtMB = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
const exists = (p) => fs.access(p).then(() => true, () => false);

// ---------- find ffmpeg ----------
function findFfmpeg() {
  try {
    const require = createRequire(import.meta.url);
    const p = require('ffmpeg-static');
    if (p) return p;
  } catch {
    // ffmpeg-static is not installed: use the ffmpeg on the computer
  }
  return 'ffmpeg';
}
const FFMPEG = findFfmpeg();

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    child.stderr.on('data', (d) => {
      err = (err + d).slice(-4000); // keep only the end, where the error is
    });
    child.on('error', (e) =>
      reject(e.code === 'ENOENT'
        ? new Error('ffmpeg not found. Run "npm install --save-dev ffmpeg-static" or install ffmpeg.')
        : e)
    );
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(err.trim().split('\n').slice(-3).join(' | ')))));
  });
}

// ---------- main ----------
async function main() {
  if (!(await exists(folder))) {
    throw new Error(`Folder not found: ${folder}\nCreate it, or use --folder=your-folder`);
  }
  console.log(`\nFolder: ${folder}`);

  // load the log of finished files
  const logPath = path.join(folder, LOG_NAME);
  let log = {};
  try {
    log = JSON.parse(await fs.readFile(logPath, 'utf8'));
  } catch {
    // no log yet
  }

  // collect videos, grouped by name (clip.mov and clip.mp4 are the same video)
  const groups = new Map();
  for (const e of await fs.readdir(folder, { withFileTypes: true })) {
    if (!e.isFile() || e.name.startsWith('.')) continue;
    const ext = path.extname(e.name).toLowerCase();
    if (!VIDEO_EXTS.has(ext)) continue;
    const base = path.basename(e.name, path.extname(e.name));
    const full = path.join(folder, e.name);
    const stat = await fs.stat(full);
    if (!groups.has(base)) groups.set(base, []);
    groups.get(base).push({ full, name: e.name, size: stat.size, mtime: stat.mtimeMs });
  }

  if (groups.size === 0) {
    console.log('No videos found.');
    return;
  }
  console.log(`Found ${groups.size} video(s). ${dryRun ? '(dry run: nothing will change)' : ''}\n`);

  let before = 0;
  let after = 0;
  let deleted = 0;

  for (const [base, files] of [...groups.entries()].sort()) {
    files.sort((a, b) => b.mtime - a.mtime); // newest first
    const [source, ...dupes] = files;
    const target = path.join(folder, `${base}.mp4`);
    const sourceIsTarget = path.resolve(source.full) === path.resolve(target);
    const groupBefore = files.reduce((n, f) => n + f.size, 0);
    before += groupBefore;

    // already compressed by this script and unchanged
    if (sourceIsTarget && dupes.length === 0 && log[source.name] === source.size) {
      console.log(`  skip     ${source.name} (${fmtMB(source.size)}, already compressed)`);
      after += source.size;
      continue;
    }

    if (dryRun) {
      console.log(`  would do ${source.name} (${fmtMB(source.size)}) -> ${base}.mp4`);
      after += source.size;
      continue;
    }

    const tmp = path.join(folder, `.${base}.tmp.mp4`);
    try {
      process.stdout.write(`  working  ${source.name} (${fmtMB(source.size)}) ... `);
      await run(FFMPEG, [
        '-y', '-i', source.full,
        '-map', '0:v:0', '-map', '0:a:0?',          // first video track, first audio track if any
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', String(crf),
        '-vf', `scale=-2:'min(${maxHeight},ih)'`,   // shrink only if taller than the max
        '-pix_fmt', 'yuv420p',                      // plays in every browser and phone
        '-c:a', 'aac', '-b:a', '128k',
        '-movflags', '+faststart',                  // starts playing before it fully downloads
        '-map_metadata', '-1',                      // strip location and camera info
        tmp,
      ]);

      const newSize = (await fs.stat(tmp)).size;

      // an .mp4 that was already small: keep the original if the new one is not smaller
      if (sourceIsTarget && newSize >= source.size) {
        await fs.unlink(tmp);
        log[source.name] = source.size;
        after += source.size;
        console.log('kept original (new file was not smaller)');
        continue;
      }

      await fs.rename(tmp, target);
      log[`${base}.mp4`] = newSize;
      after += newSize;
      console.log(`${fmtMB(newSize)}`);

      // delete the old heavy files
      for (const f of files) {
        if (path.resolve(f.full) === path.resolve(target)) continue;
        await fs.unlink(f.full);
        deleted++;
        console.log(`  deleted  ${f.name}`);
      }
    } catch (err) {
      await fs.unlink(tmp).catch(() => {});
      console.log(`FAILED: ${err.message}\n           (original kept)`);
      after += groupBefore;
    }
  }

  if (!dryRun) await fs.writeFile(logPath, JSON.stringify(log, null, 2));
  console.log(`\nTotal: ${fmtMB(before)} -> ${fmtMB(after)}. Deleted ${deleted} old file(s).`);
}

main().catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exitCode = 1;
});
