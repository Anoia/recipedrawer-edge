import { auth } from "./edgedb";
import { getRecipes } from "./test-actions";

export default async function Home() {
  const session = auth.getSession();

  const loggedIn = await session.isLoggedIn();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home</h1>

      {loggedIn ? (
        <>
          <div>You are logged in</div>
          {session.client.queryJSON("Select global current_user{*}")}
          {JSON.stringify(getRecipes())}
          <button className="bg-slate-400 px-5 py-2 border border-slate-800">Button</button>
        </>
      ) : (
        <>
          <div>You are not logged in</div>
          <a href={"http://"+auth.getBuiltinUIUrl()}>Sign in with Built-in UI</a>
        </>
      )}
    </main>
  );
}
