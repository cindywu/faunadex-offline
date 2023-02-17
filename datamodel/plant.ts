import { ReadTransaction, WriteTransaction } from '@rocicorp/reflect';
import { nanoid } from 'nanoid';
import { z } from 'zod';

export const plantSchema = z.object({
  createdAt: z.string(),
  createdBy: z.string(),
  clade: z.string(),
  cladeDescription: z.string(),
  family: z.string(),
  familyDescription: z.string(),
  genus: z.string(),
  species: z.string(),
  subtax: z.string(),
  subtaxName: z.string(),
  speciesCode: z.string(),
  native: z.string(),
  distribution: z.string(),
  englishName: z.string(),
  hawaiianName: z.string(),
  formerName: z.string(),
  images: z.string(),
})

export type Plant = z.infer<typeof plantSchema>;

export async function getPlant(
  tx: ReadTransaction,
  id: string
): Promise <Plant |null> {
  const jv = await tx.get(key(id))
  if (!jv) {
    console.log(`Specified plant ${id} not found.`)
    return null
  }
  return jv as Plant
}

export function putPlant(
  tx: WriteTransaction,
  { id, plant } : { id: string, plant: Plant }
): Promise<void> {
  return tx.put(key(id), plant);
}

export async function deletePlant(
  tx: WriteTransaction,
  id: string
): Promise<void> {
  await tx.del(key(id))
}

export async function updatePlant(
  tx: WriteTransaction,
  {id, propertyName, plantProperty}: any
): Promise<void> {
  const plant = await getPlant(tx, id)
  console.log({plantProperty})
  const newPlant = {...plant, [propertyName]: plantProperty}
  console.log({newPlant})
  return tx.put(key(id), newPlant)
}


function key(id: string):string {
  return `${plantPrefix}${id}`
}

export const plantPrefix = 'plant-';

export function randomPlant() {
  return {
    id: nanoid(),
    plant: {
      createdAt: new Date().toISOString(),
      createdBy: "cindy",
      clade: "",
      cladeDescription: "",
      family: "",
      familyDescription: "",
      genus: "",
      species: "",
      subtax: "",
      subtaxName: "",
      speciesCode: "",
      native: "",
      distribution: "",
      englishName: "",
      hawaiianName: "",
      formerName: "",
      images: "",
    }
  }
}