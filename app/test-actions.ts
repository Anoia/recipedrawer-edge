"use server";

import { redirect } from "next/navigation";
import { e, getAuthClient } from "@/app/_stuff/edgedb";

export async function getRecipes() {
  const { loggedIn, authenticatedClient } = await getAuthClient();

  if (!loggedIn) {
    redirect("/");
  }
  console.log("getting recipes");
  return await e
    .select(e.Recipe, (recipe) => ({
      id: true,
      name: true,
      slug: true,
      source: true,
    }))
    .run(authenticatedClient);
}
