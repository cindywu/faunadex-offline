import type { WriteTransaction } from "@rocicorp/reflect";
import {
  putPlant,
  deletePlant,
  updatePlant,
} from "./plant";

export type M = typeof serverMutators;

export const serverMutators = {
  createPlant: putPlant,
  deletePlant,
  updatePlant,
  nop: async (_: WriteTransaction) => {},
};

export const clientMutators: M = {
  ...serverMutators
};