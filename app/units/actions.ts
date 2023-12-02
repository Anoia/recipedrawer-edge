"use server";

import { revalidatePath } from "next/cache";
import { e, getAuthClient } from "../_stuff/edgedb";

export async function createUnit(prevState: any, formData: FormData) {
  const d = {
    short_name: formData.get("short_name") as string, // todo validation
    long_name: formData.get("long_name") as string,
  };

  try {
    const { authenticatedClient } = await getAuthClient(); // maybe redirect w.o login?

    await e
      .insert(e.Unit, {
        short_name: d.short_name,
        long_name: d.long_name,
      })
      .run(authenticatedClient);

    revalidatePath("/units");
    return { message: `Added unit ${d.long_name}`, status: "Success" };
  } catch (e) {
    return { message: "Failed to create unit", status: "Error" };
  }
}
