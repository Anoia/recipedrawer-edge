import { createClient } from "edgedb";
import createAuth from "@edgedb/auth-nextjs/app";

export { default as e } from "@/dbschema/edgeql-js";

export const client = createClient();

export const auth = createAuth(client, {
  baseUrl: "localhost:3000",
});