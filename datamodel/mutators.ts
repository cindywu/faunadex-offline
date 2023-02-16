import type { WriteTransaction } from "@rocicorp/reflect";
import {
  putPlant
} from "./plant";

export type M = typeof serverMutators;

export const serverMutators = {
  createPlant: putPlant,
  nop: async (_: WriteTransaction) => {},
};

export const clientMutators: M = {
  ...serverMutators
};