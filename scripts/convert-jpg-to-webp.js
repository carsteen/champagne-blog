const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const IMAGE_EXTS = new Set([".jpg", ".jpeg"]);
const SKIP_DIRS = new Set([".git", "node_modules", "_site"]);

async function findJpgFiles(dir, results) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) {
        await findJpgFiles(fullPath, results);
      }
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (IMAGE_EXTS.has(ext)) {
      results.push(fullPath);
    }
  }
}

async function convertToWebp(filePath) {
  const outputPath = filePath.replace(/\.(jpe?g)$/i, ".webp");
  try {
    const stats = await fs.stat(outputPath);
    if (stats.size > 0) {
      console.log(`Skipped (already exists): ${outputPath}`);
      return;
    }
  } catch {
    // File doesn't exist, proceed with conversion.
  }
  await sharp(filePath).webp().toFile(outputPath);
  console.log(`Converted: ${filePath} -> ${outputPath}`);
}

async function main() {
  const root = process.cwd();
  const jpgFiles = [];

  await findJpgFiles(root, jpgFiles);

  if (jpgFiles.length === 0) {
    console.log("No .jpg/.jpeg files found.");
    return;
  }

  for (const filePath of jpgFiles) {
    await convertToWebp(filePath);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
