"use server";

import Link from "next/link";
import { getAuthClient } from "../_stuff/edgedb";
import { getIngredients } from "@/app/_stuff/db";
import DietDisplay from "../_components/standardComponents/diet";
import { CreateIngredientButton } from "./createIngredientComponent";
import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Title,
} from "@mantine/core";

export default async function Ingredients() {
  const { loggedIn, authenticatedClient } = await getAuthClient();

  const ingredients = await getIngredients(authenticatedClient);

  const rows = ingredients.map((i) => (
    <TableTr key={i.id}>
      <TableTd>
        <Link href={`/ingredient/${i.id}`}>{i.name}</Link>
      </TableTd>
      <TableTd>
        <DietDisplay diet={i.diet} />
      </TableTd>
    </TableTr>
  ));

  return (
    <>
      <div className="flex justify-between mb-8">
        <Title order={2}>Zutaten</Title>
        {loggedIn && <CreateIngredientButton />}
      </div>
      <div className="container max-w-xs">
        <Table>
          <TableThead>
            <TableTr>
              <TableTh>Name</TableTh>
              <TableTh>Diät</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>{rows}</TableTbody>
        </Table>
      </div>
    </>
  );
}
