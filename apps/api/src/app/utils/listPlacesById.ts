import * as fs from 'fs';

const getPath = (id: string) => `${__dirname}/assets/places/${id}`;

export async function listPlacesById(id: string) {
  const imagesArray = [];

  try {
    const dir = await fs.promises.opendir(getPath(id));

    for await (const dirent of dir) {
      imagesArray.push(dirent.name);
    }
  } catch (e) {
    console.warn(e);
  }

  return imagesArray;
}
