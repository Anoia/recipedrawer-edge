"use server";

import { EmptyRecipe } from "@/app/_components/createOrEditRecipe";
import { getAuthClient } from "@/app/_stuff/edgedb";
import { insertRecipe } from "@/app/_stuff/db";

export async function testServerAction(r: EmptyRecipe) {
  const { authenticatedClient } = await getAuthClient();

  const result = await insertRecipe(r, authenticatedClient);

  console.log("Hello from the server!" + result);
  return { message: "created:" + result };
}
