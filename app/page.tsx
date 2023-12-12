import { auth, getAuthClient, e } from "./_stuff/edgedb";
import { getRecipes } from "./test-actions";

export default async function Home() {
  const { loggedIn, authenticatedClient } = await getAuthClient();
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <h1>Home</h1>

      {loggedIn ? (
        <>
          <div>You are logged in</div>
          <h2>user</h2>
          <p>
            {await authenticatedClient.queryJSON(
              "Select global current_user{*}"
            )}
          </p>
          <h2>recipes</h2>
          <p>{JSON.stringify(await getRecipes())}</p>
          <a href={auth.getSignoutUrl()}>Signout</a>
        </>
      ) : (
        <>
          <div>You are not logged in</div>
          <a href={auth.getBuiltinUIUrl()}>Sign in with Built-in UI</a>
        </>
      )}
    </div>
  );
}
