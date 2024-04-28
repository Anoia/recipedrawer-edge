"use server";
import { Title, Text, Anchor, Button } from "@mantine/core";
import { Autocomplete } from "@/app/_components/autocomplete";
import { getAuthClient } from "@/app/_stuff/edgedb";
import { getIngredients } from "@/app/_stuff/db";

export default async function CreateRecipe() {
  const { loggedIn, authenticatedClient } = await getAuthClient();

  const ingredients = await getIngredients(authenticatedClient);

  return (
    <>
      <Title>Create Recipe</Title>
      <Autocomplete groceries={ingredients.map((i) => i.name)} />
    </>
  );
}
