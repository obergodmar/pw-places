export const items: { [key: string]: string } = require
  .context('./items', false, /\.(webp)$/)
  .keys()
  .reduce((acc, filename) => {
    const filenameWithoutPath = filename.replace('./', '');
    const filenameWithoutExtension = filenameWithoutPath.replace('.webp', '');

    return {
      ...acc,
      // eslint-disable-next-line
      [filenameWithoutExtension]: require(`./items/${filenameWithoutPath}`)
        .default,
    };
  }, {});
