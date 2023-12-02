import Link from "next/link";
import { Fragment } from "react";
import { auth, getAuthClient } from "@/app/_stuff/edgedb";

export default async function Nav() {
  const { loggedIn } = await getAuthClient();

  return (
    <div className="bg-slate-700 text-white flex flex-col w-screen items-center justify-center px-20 text-center">
      <Link href="/" className="mt-6 text-4xl font-bold">
        Welcome to Recipe Drawer
      </Link>
      <div className="m-6">
        <Fragment>
          <Link href="/dashboard" className="m-3 text-lg">
            Dashboard
          </Link>
          <Link href="/create" className="m-3 text-lg">
            Create Recipe
          </Link>
          <Link href="/ingredients" className="m-3 text-lg">
            Ingredients
          </Link>
          <Link href="/units" className="m-3 text-lg">
            Units
          </Link>
          {loggedIn && <a href={auth.getSignoutUrl()}>Logout</a>}
          {!loggedIn && <a href={auth.getBuiltinUIUrl()}>Login</a>}
        </Fragment>
      </div>
    </div>
  );
}
