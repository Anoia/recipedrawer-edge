import { redirect } from "next/navigation";
import { client, auth } from "@/app/edgedb";
import e from "@/dbschema/edgeql-js";

export const { GET, POST } = auth.createAuthRouteHandlers({
  async onBuiltinUICallback({ error, tokenData, isSignUp }) {
    if (error) {
      console.log(JSON.stringify(error));
    }
    if (isSignUp && tokenData) {
      console.log(tokenData.identity_id);
      const r = await e
        .insert(e.User, {
          name: "",
          identity: e.assert_exists(
            e.select(e.ext.auth.Identity, (identity) => ({
              filter_single: { id: tokenData.identity_id },
            }))
          ),
        })
        .run(client);
      console.log(JSON.stringify(r));
      redirect("/api/test");
    }
    redirect("/");
  },
  onSignout() {
    redirect("/");
  },
});
