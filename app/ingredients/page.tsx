"use server";

import Link from "next/link";
import { getAuthClient, e } from "../_stuff/edgedb";
import DietDisplay from "../_components/standardComponents/diet";
import { CreateIngredientButton } from "./createIngredientComponent";

export default async function Ingredients() {
  const { loggedIn, authenticatedClient } = await getAuthClient();

  const ingredients = await e
    .select(e.Ingredient, (i) => ({
      id: true,
      name: true,
      diet: true,
    }))
    .run(authenticatedClient);

  return (
    <div className="container mx-auto my-12 max-w-4xl">
      <div className="flex justify-between">
        <h1 className="text-2xl my-2">Ingredients</h1>
        {loggedIn && <CreateIngredientButton />}
      </div>
      <ul>
        {ingredients.map((i) => {
          return (
            <li key={i.id}>
              <Link href={`/ingredient/${i.id}`}>
                {i.name} - <DietDisplay diet={i.diet} />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* <CreateIngredient
      isOpen={dialogOpen}
      input={''}
      close={() => setDialogOpen(false)}
      created={(i: ingredient) => {
        setIngredients((ings) => [i, ...ings])
        setDialogOpen(false)
      }}
    /> */}
    </div>
  );
}
