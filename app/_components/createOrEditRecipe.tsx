"use client";

import { $default } from "@/dbschema/interfaces";
import Recipe = $default.Recipe;
import Ingredient = $default.Ingredient;
import Unit = $default.Unit;
import {
  Button,
  Center,
  Image,
  NumberInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import NextImage from "next/image";
import {
  IngredientAutocomplete,
  NewRecipeIngredient,
} from "@/app/_components/ingredientAutocomplete";
import { useEffect, useState } from "react";
import DietDisplay from "@/app/_components/standardComponents/diet";
import { testServerAction } from "@/app/create/actions";

export type EmptyRecipe = Omit<Omit<Recipe, "author">, "id">;

export default function CreateOrEditRecipe(props: {
  ingredients: Ingredient[];
  units: Unit[];
  recipe: EmptyRecipe;
  // saveAction: () => void;
  // cancel: () => void;
}) {
  const [selectedIngredients, setSelectedIngredients] = useState<
    NewRecipeIngredient[]
  >([]);

  const [name, setName] = useState(props.recipe.name);
  const [description, setDescription] = useState(
    props.recipe.description ?? "",
  );

  const [slug, setSlug] = useState<string>(props.recipe.slug);

  useEffect(() => {
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[äÄ]/g, "ae")
        .replace(/[öÖ]/g, "oe")
        .replace(/[üÜ]/g, "ue")
        .replace(/ß/g, "ss")
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

    if (!props.recipe.slug) {
      setSlug(slugify(name));
    }
  }, [name, props.recipe.slug]);

  const [source, setSource] = useState(props.recipe.source);

  function getHostname(urlString: string): string {
    try {
      const url = new URL(urlString);
      return url.hostname
        .substring(0, url.hostname.lastIndexOf("."))
        .replace(/^www\./, "");
    } catch (error) {
      return "";
    }
  }

  return (
    <>
      <Title>Create/Edit Recipe</Title>

      <Image
        className="my-5"
        alt={"Recipe Image"}
        radius="lg"
        h={280}
        src="https://recipedrawer.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddqdrc3ak%2Fimage%2Fupload%2Fxhkj2agttx9xzhufvebk&w=1920&q=75"
        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
      />

      <div className="flex flex-col sm:flex-row my-10">
        <div className="flex-grow">
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Rezeptname"
            label="Rezeptname"
            size="xl"
            m={10}
          />
          <TextInput
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Beschreibung"
            label="Beschreibung"
            m={10}
          />
          <TextInput
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="slug"
            label="Slug"
            variant="filled"
            m={10}
          />
        </div>

        <div className="basis-1/3">
          <div className="flex flex-row justify-between items-end">
            <NumberInput defaultValue={2} label="Portionen" m={10} />
            <Center>
              <DietDisplay diet="Vegan" className="m-4" />
            </Center>
          </div>
          <div>
            <TextInput
              label="Quelle"
              mx={10}
              value={source?.name ?? ""}
              onChange={(e) =>
                setSource((s) => {
                  return { name: e.target.value, link: s?.link ?? "" };
                })
              }
            />
            <TextInput
              label="Link"
              mx={10}
              value={source?.link ?? ""}
              onChange={(e) =>
                setSource((s) => {
                  let name = s?.name ?? "";
                  if (name.trim().length === 0) {
                    name = getHostname(e.target.value);
                  }
                  return { link: e.target.value, name: name };
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        <div>
          <Text>Selected Ingredients</Text>
          <ul>
            {selectedIngredients.map((i) => (
              <li key={i.ingredient.id + i.amount + i.unit}>
                {i.amount} {i.unit.short_name} {i.ingredient.name}{" "}
                {i.extra_info}
              </li>
            ))}
          </ul>
          <IngredientAutocomplete
            ingredients={props.ingredients}
            units={props.units}
            onSelectIngredient={(ingredient: NewRecipeIngredient) => {
              setSelectedIngredients([...selectedIngredients, ingredient]);
            }}
            input={""}
          />
        </div>
        <div>Steps</div>
      </div>

      <div className="flex justify-end space-x-5">
        <Button variant={"outline"}>Abbrechen</Button>
        <Button
          onClick={async () =>
            await testServerAction({
              name: name,
              description,
              slug,
              source,
              ingredients: [],
              portions: 2,
              steps: [],
            })
          }
        >
          Speichen
        </Button>
      </div>
    </>
  );
}
