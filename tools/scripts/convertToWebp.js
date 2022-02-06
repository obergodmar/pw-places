const fs = require('fs');

const sharp = require('sharp');

const args = process.argv.slice(2);

const files = [];

const checkWebp = (filename) => !!filename.match(/\.webp$/);

args.forEach((arg) => {
  const stats = fs.statSync(arg);
  if (stats.isFile()) {
    !checkWebp(arg) && files.push(arg);
  }

  if (stats.isDirectory()) {
    const dirFiles = fs.readdirSync(arg);

    dirFiles.forEach((file) => {
      if (checkWebp(file)) {
        return;
      }

      files.push(`${arg}/${file}`);
    });
  }
});

files.forEach((file) => {
  sharp(file)
    .webp({ effort: 6 })
    .toFile(file.replace(/(\.\w+)$/, '.webp'));
});
