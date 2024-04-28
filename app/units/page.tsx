"use server";
import { getAuthClient, e } from "../_stuff/edgedb";
import CreateUnit from "./createUnit";

export default async function Units() {
  const { loggedIn, authenticatedClient } = await getAuthClient();

  const units = await e
    .select(e.Unit, (unit) => ({
      id: true,
      short_name: true,
      long_name: true,
    }))
    .run(authenticatedClient);

  return (
    <>
      <h1 className="text-2xl mb-2">Units</h1>
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
    </>
  );
}
