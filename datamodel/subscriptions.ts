import { useSubscribe } from "replicache-react";
import type { M } from "./mutators";
import type { Reflect } from "@rocicorp/reflect";

import { getPlant, plantPrefix } from "./plant";

export function usePlantIDs(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const plants = (await tx
        .scan({ prefix: plantPrefix })
        .keys()
        .toArray()) as string[];
      return plants.map((k) => k.substring(plantPrefix.length));
    },
    []
  );
}

export function usePlantByID(reflect: Reflect<M>, id: string) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return await getPlant(tx, id);
    },
    null
  );
}