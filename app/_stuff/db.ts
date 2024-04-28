import { Client } from "edgedb";
import { e } from "@/app/_stuff/edgedb";

export async function getIngredients(client: Client) {
  return await e
    .select(e.Ingredient, (i) => ({
      id: true,
      name: true,
      diet: true,
    }))
    .run(client);
}

export async function getUnits(client: Client) {
  return await e
    .select(e.Unit, (unit) => ({
      id: true,
      short_name: true,
      long_name: true,
    }))
    .run(client);
}
