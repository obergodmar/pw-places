export const loaders = require
  .context('./loadersWEBP', false, /\.(webp)$/)
  .keys()
  .map((filename) => filename.replace('./', ''))
  // eslint-disable-next-line
  .map((filename) => require(`./loadersWEBP/${filename}`).default);
