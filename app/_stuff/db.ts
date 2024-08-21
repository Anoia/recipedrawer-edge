import { Client } from "edgedb";
import { e } from "@/app/_stuff/edgedb";
import { $infer } from "@/dbschema/edgeql-js";
import { EmptyRecipe } from "@/app/_components/createOrEditRecipe";

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

export async function insertRecipe(r: EmptyRecipe, client: Client) {
  return await e
    .insert(e.Recipe, {
      name: r.name,
      description: r.description,
      image: r.image,
      portions: r.portions,
      steps: r.steps,
      source: { name: r.source?.name ?? "", link: r.source?.link ?? "" },
      slug: r.slug,
      author: e.global.current_user,
    })
    .run(client);
}
