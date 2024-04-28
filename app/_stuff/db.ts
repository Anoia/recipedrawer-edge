import { Client } from "edgedb";
import { e } from "@/app/_stuff/edgedb";
import { $infer } from "@/dbschema/edgeql-js";

const getIngredientsQuery = e.select(e.Ingredient, (i) => ({
  id: true,
  name: true,
  diet: true,
}));

type Ingredient = $infer<typeof getIngredientsQuery>;

export async function getIngredients(client: Client): Promise<Ingredient> {
  return await getIngredientsQuery.run(client);
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
