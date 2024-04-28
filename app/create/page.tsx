"use server";
import { getAuthClient } from "@/app/_stuff/edgedb";
import { getIngredients, getUnits } from "@/app/_stuff/db";
import { $default } from "@/dbschema/interfaces";
import Ingredient = $default.Ingredient;
import Unit = $default.Unit;
import EditRecipe, { EmptyRecipe } from "@/app/_components/edit";

export default async function CreateRecipe() {
  const { loggedIn, authenticatedClient } = await getAuthClient();

  const ingredients: Ingredient[] = await getIngredients(authenticatedClient);
  const units: Unit[] = await getUnits(authenticatedClient);

  return (
    <>
      <EditRecipe
        ingredients={ingredients}
        units={units}
        recipe={emptyRecipe()}
        // saveAction={() => {}}
        // cancel={() => {}}
      />
    </>
  );
}

function emptyRecipe(): EmptyRecipe {
  return {
    name: "",
    description: "",
    image: "",
    portions: 0,
    ingredients: [],
    steps: [],
    source: null,
    slug: "",
  };
}
