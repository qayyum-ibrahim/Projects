#!/usr/bin/env node
// Compress new full-page screenshots in public/images to <slug>.jpg.
// Uses macOS `sips`, so no package is needed. Run: npm run images
//
// - Name each file after the project id, for example kora-goods.png.
// - New files are resized to at most MAX_WIDTH, saved as JPEG, and the original is deleted.
// - Finished files are listed in public/images/.compressed and never touched again.

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const DIR = path.resolve(import.meta.dirname, '..', 'public', 'images')
const MANIFEST = path.join(DIR, '.compressed')
const MAX_WIDTH = 1440
const QUALITY = 70
const INPUT_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.tif', '.tiff', '.gif', '.bmp'])

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`

fs.mkdirSync(DIR, { recursive: true })
const done = new Set(
  fs.existsSync(MANIFEST) ? fs.readFileSync(MANIFEST, 'utf8').split('\n').filter(Boolean) : [],
)

const todo = fs
  .readdirSync(DIR)
  .filter((name) => !name.startsWith('.') && !done.has(name))
  .filter((name) => INPUT_EXTS.has(path.extname(name).toLowerCase()))

if (todo.length === 0) {
  console.log('No new images. Nothing to do.')
  process.exit(0)
}

for (const name of todo) {
  const input = path.join(DIR, name)
  const slug = path.basename(name, path.extname(name)).toLowerCase()
  const outName = `${slug}.jpg`
  const output = path.join(DIR, outName)
  const temp = path.join(DIR, `.tmp-${outName}`)

  try {
    const info = execFileSync('sips', ['-g', 'pixelWidth', input], { encoding: 'utf8' })
    const width = Number(info.match(/pixelWidth:\s*(\d+)/)?.[1] ?? 0)
    const resize = width > MAX_WIDTH ? ['--resampleWidth', String(MAX_WIDTH)] : []

    execFileSync(
      'sips',
      ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(QUALITY), ...resize, input, '--out', temp],
      { stdio: 'ignore' },
    )

    const before = fs.statSync(input).size
    fs.rmSync(input)
    fs.renameSync(temp, output)
    done.add(outName)
    fs.writeFileSync(MANIFEST, [...done].sort().join('\n') + '\n')
    console.log(`${name} -> ${outName}  ${kb(before)} -> ${kb(fs.statSync(output).size)}`)
  } catch (error) {
    fs.rmSync(temp, { force: true })
    console.error(`Failed: ${name} (${error.message.split('\n')[0]}). Original kept.`)
    process.exitCode = 1
  }
}
