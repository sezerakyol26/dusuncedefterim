import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generate() {
  const svgPath = path.resolve(process.cwd(), 'public/icon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  const targets = [
    { name: 'public/icon-512.png', size: 512 },
    { name: 'public/icon-192.png', size: 192 },
    { name: 'public/apple-touch-icon.png', size: 180 },
    { name: 'public/favicon-32.png', size: 32 },
    { name: 'public/favicon.png', size: 48 },
  ];

  for (const target of targets) {
    const dest = path.resolve(process.cwd(), target.name);
    await sharp(svgBuffer)
      .resize(target.size, target.size)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(dest);
    console.log(`Generated: ${target.name} (${target.size}x${target.size})`);
  }
}

generate().catch(err => {
  console.error("Error generating icon png files:", err);
  process.exit(1);
});
