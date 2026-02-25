/**
 * Generates rounded (circular) versions of all PNG favicons and favicon.ico.
 * Run: node scripts/round-favicons.mjs
 */

import sharp from "sharp";
import { readdir, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FAVICONS_DIR = join(__dirname, "..", "public", "images", "favicons");

async function roundImage(inputPath, size) {
  const circleSvg = Buffer.from(
    `<svg><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`
  );
  return sharp(inputPath)
    .resize(size, size)
    .composite([{ input: circleSvg, blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function main() {
  const files = await readdir(FAVICONS_DIR);
  const pngSizes = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "apple-touch-icon.png": 180,
    "android-chrome-192x192.png": 192,
    "android-chrome-512x512.png": 512,
  };

  for (const [name, size] of Object.entries(pngSizes)) {
    if (!files.includes(name)) continue;
    const path = join(FAVICONS_DIR, name);
    const rounded = await roundImage(path, size);
    await writeFile(path, rounded);
    console.log("Rounded:", name);
  }

  console.log("Done. favicon.ico was not modified (use an ICO tool if you need a rounded .ico).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
