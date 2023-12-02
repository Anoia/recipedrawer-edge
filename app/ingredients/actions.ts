"use server";

import { revalidatePath } from "next/cache";
import { e, getAuthClient } from "../_stuff/edgedb";

export async function createIngredient(prevState: any, formData: FormData) {
  const d = {
    diet: formData.get("diet") as "Vegan" | "Vegetarian" | "Fish" | "Meat", // todo validation
    ingredientName: formData.get("ingredientName") as string,
  };

  try {
    const { authenticatedClient } = await getAuthClient();

    await e
      .insert(e.Ingredient, {
        name: d.ingredientName,
        diet: d.diet,
      })
      .run(authenticatedClient);
    revalidatePath("/ingredients");
    return { message: `Added ${d.ingredientName}`, status: "Success" };
  } catch (e) {
    return {
      message: "Failed to create ingredient: " + d.ingredientName + ": " + e,
      status: "Error",
    };
  }
}
