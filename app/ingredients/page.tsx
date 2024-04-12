"use server";

import Link from "next/link";
import { getAuthClient, e } from "../_stuff/edgedb";
import DietDisplay from "../_components/standardComponents/diet";
import { CreateIngredientButton } from "./createIngredientComponent";
import {
  Container,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
  Title,
} from "@mantine/core";

export default async function Ingredients() {
  const { loggedIn, authenticatedClient } = await getAuthClient();

  const ingredients = await e
    .select(e.Ingredient, (i) => ({
      id: true,
      name: true,
      diet: true,
    }))
    .run(authenticatedClient);

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
    <div className="container mx-auto my-24 max-w-xl">
      <div className="flex justify-between mb-8">
        <Title order={2}>Ingredients</Title>
        {loggedIn && <CreateIngredientButton />}
      </div>
      <div className="container max-w-xs">
        <Table>
          <TableThead>
            <TableTr>
              <TableTh>Name</TableTh>
              <TableTh>Diet</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>{rows}</TableTbody>
        </Table>
      </div>
    </div>
  );
}
