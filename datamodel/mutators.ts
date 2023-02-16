import type { WriteTransaction } from "@rocicorp/reflect";
import {
  putPlant,
  deletePlant
} from "./plant";

export type M = typeof serverMutators;

export const serverMutators = {
  createPlant: putPlant,
  deletePlant,
  nop: async (_: WriteTransaction) => {},
};

export const clientMutators: M = {
  ...serverMutators
};