"use server";

import { redirect } from "next/navigation";
import { e, auth } from "@/app/_stuff/edgedb";

export async function getRecipes() {
  const session = auth.getSession();
  if (!(await session.isLoggedIn())) {
    redirect("/");
  }
  const authenticatedClient = session.client;
  console.log("getting recipes");
  return await e
    .select(e.Recipe, (recipe) => ({
      id: true,
      name: true,
    }))
    .run(authenticatedClient);
}
