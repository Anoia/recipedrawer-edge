"use client";

import { $default } from "@/dbschema/interfaces";
import Recipe = $default.Recipe;
import Ingredient = $default.Ingredient;
import Unit = $default.Unit;
import { Text, Title } from "@mantine/core";
import { IngredientAutocomplete } from "@/app/_components/ingredientAutocomplete";
import { useState } from "react";

export type EmptyRecipe = Omit<Omit<Recipe, "author">, "id">;

export default function EditRecipe(props: {
  ingredients: Ingredient[];
  units: Unit[];
  recipe: EmptyRecipe;
  // saveAction: () => void;
  // cancel: () => void;
}) {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    [],
  );

  return (
    <>
      <Title>Create/Edit Recipe</Title>
      <Text>Selected Ingredients</Text>
      <ul>
        {selectedIngredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name} - {ingredient.diet}
          </li>
        ))}
      </ul>
      <IngredientAutocomplete
        ingredients={props.ingredients}
        units={props.units}
        onSelectIngredient={(ingredient: Ingredient) => {
          setSelectedIngredients([...selectedIngredients, ingredient]);
        }}
        input={""}
      />
    </>
  );
}
