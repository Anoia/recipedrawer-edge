import { createClient } from "edgedb";
import createAuth from "@edgedb/auth-nextjs/app";

export { default as e } from "@/dbschema/edgeql-js";

export const client = createClient();

export const auth = createAuth(client, {
  baseUrl: "http://localhost:3000",
});

export async function getAuthClient() {
  const session = auth.getSession();
  const loggedIn = await session.isLoggedIn();

  const authenticatedClient = session.client;
  return { loggedIn, authenticatedClient };
}
