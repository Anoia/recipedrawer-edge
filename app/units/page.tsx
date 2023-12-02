"use server";
import { auth, e } from "../_stuff/edgedb";
import CreateUnit from "./create_unit";

export default async function Units() {
  const session = auth.getSession();
  const loggedIn = await session.isLoggedIn();

  const authenticatedClient = session.client;

  const units = await e
    .select(e.Unit, (unit) => ({
      id: true,
      short_name: true,
      long_name: true,
    }))
    .run(authenticatedClient);

  return (
    <div className="my-12 max-w-4xl">
      <h1 className="text-2xl my-2">Units</h1>
      <ul>
        {units.map((u) => {
          return (
            <li key={u.id}>
              {u.short_name} - {u.long_name}
            </li>
          );
        })}
      </ul>
      {loggedIn && (
        <>
          <hr className="my-5" />
          <h1 className="text-lg my-2">Create new Unit</h1>
          <CreateUnit />
        </>
      )}
    </div>
  );
}
