// Generates responsive WebP variants next to the original images.
// Originals are kept as the <img> fallback and are never modified.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = 'assets/img';
const jobs = [
  { file: 'cover.png', widths: [400, 800], square: false },
  { file: 'avatar.png', widths: [72, 200, 400], square: true },
  ...fs.readdirSync(`${root}/contributors`)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .map((f) => ({ file: `contributors/${f}`, widths: [400, 800], square: true })),
];

for (const { file, widths, square } of jobs) {
  const src = path.join(root, file);
  const base = src.replace(/\.[^.]+$/, '');
  const meta = await sharp(src).metadata();
  for (const w of widths) {
    const h = square ? w : Math.round((w * meta.height) / meta.width);
    const out = `${base}-${w}.webp`;
    await sharp(src).resize(w, h, { fit: 'cover' }).webp({ quality: 80, effort: 6 }).toFile(out);
    console.log(out, (fs.statSync(out).size / 1024).toFixed(1) + 'K');
  }
}
