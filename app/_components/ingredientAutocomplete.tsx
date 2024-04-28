"use client";

import React, { useEffect, useState } from "react";
import { Combobox, InputBase, Modal, useCombobox } from "@mantine/core";
import { $default } from "@/dbschema/interfaces";
import Ingredient = $default.Ingredient;
import Unit = $default.Unit;
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import CreateIngredientForm from "@/app/ingredients/createIngredientComponent";
import { extractRecipeMatchResult, Maybe } from "@/app/_stuff/regexParser";

export type IngredientSelection = {
  amount: number;
  unit: Maybe<Unit>;
  ingredientString: string;
  extraInfo: Maybe<string>;
};

export function IngredientAutocomplete(props: {
  ingredients: Ingredient[];
  units: Unit[];
  onSelectIngredient: (ingredient: Ingredient) => void;
}) {
  const [matchResult, setMatchResult] =
    useState<Maybe<IngredientSelection>>(undefined);

  const [userInputString, setUserInputString] = useState("");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [fuzzyIngredients, setFuzzyIngredients] = useState<Array<Ingredient>>(
    props.ingredients,
  );

  useEffect(() => {
    const r = props.ingredients.filter((item) =>
      item.name
        .toLowerCase()
        .includes((matchResult?.ingredientString ?? "").toLowerCase().trim()),
    );
    setFuzzyIngredients(r);
  }, [props.ingredients, matchResult]);

  useEffect(() => {
    function findExactUnitMatch(unitName: string): Maybe<Unit> {
      return props.units.find(
        (u) =>
          u.long_name.toLowerCase() === unitName.toLowerCase() ||
          u.short_name.toLowerCase() === unitName.toLowerCase(),
      );
    }

    const match = extractRecipeMatchResult(userInputString);

    if (match) {
      const possibleUnit = match.unitName
        ? findExactUnitMatch(match.unitName)
        : undefined;

      const rawIngredientString = match.ingredientName.trim();
      const ingredientString =
        match.unitName != undefined &&
        possibleUnit == undefined &&
        rawIngredientString
          ? `${match.unitName} ${rawIngredientString}`
          : rawIngredientString;

      const result: IngredientSelection = {
        amount: match.amount,
        unit: possibleUnit,
        ingredientString: ingredientString,
        extraInfo: match.extra_info,
      };

      setMatchResult(result);
    } else {
      setMatchResult(undefined);
    }
  }, [userInputString, props.units]);

  function escapeReg(i: string) {
    return i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function findPossibleUnits(unitName: string): Unit[] {
    const regexp = new RegExp(escapeReg(unitName.trim()), "i");
    return props.units.filter(
      (u) => u.long_name.match(regexp) || u.short_name.match(regexp),
    );
  }
  function displayDropdown(): boolean {
    const unsureAboutInput =
      matchResult?.unit == undefined &&
      matchResult?.ingredientString != undefined &&
      findPossibleUnits(matchResult.ingredientString).length > 0;
    return (
      !unsureAboutInput &&
      matchResult?.ingredientString != undefined &&
      matchResult?.ingredientString?.length >= 2
    );
  }

  useEffect(() => {
    // we need to wait for options to render before we can select first one
    combobox.selectFirstOption();
  }, [userInputString, combobox]);

  // for create ingredient modal
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)");

  return (
    <>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          console.log(`Option ${val} selected`);
          const selectedOption = props.ingredients.find(
            (item) => item.name === val,
          );
          if (val === "$create") {
            open();
            // setData((current) => [...current, search]); // TODO create new ingredient
            console.log("creating new ingredient");
          } else {
            if (selectedOption) {
              props.onSelectIngredient(selectedOption);
              setUserInputString("");
              combobox.closeDropdown();
            }
          }
        }}
      >
        <Combobox.Target>
          <InputBase
            // rightSection={<Combobox.ClearButton />}
            value={userInputString}
            onChange={(event) => {
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
              if (event.currentTarget.value !== "$create") {
                setUserInputString(event.currentTarget.value);
              }
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={(e) => {
              console.log("blur " + e.target.value);
              if (e.target.value === "$create" || opened) {
                console.log("creating new ingredient");
              } else {
                combobox.closeDropdown();
                setUserInputString("");
              }
            }}
            placeholder="100g Mehl"
            rightSectionPointerEvents="none"
          />
        </Combobox.Target>

        <Combobox.Dropdown hidden={!displayDropdown()}>
          <Combobox.Options>
            {fuzzyIngredients.map((item) => (
              <Combobox.Option value={item.name} key={item.id}>
                {item.name} - {item.diet}
              </Combobox.Option>
            ))}
            {(matchResult?.ingredientString ?? "").trim().length > 0 && (
              <Combobox.Option value="$create">
                + Create {matchResult?.ingredientString ?? ""}
              </Combobox.Option>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      <Modal
        fullScreen={isMobile}
        size="auto"
        opened={opened}
        onClose={close}
        title="Neue Zutat anlegen"
        zIndex={999} // ensure it is displayed over open combobox
      >
        <CreateIngredientForm
          opened={opened}
          input={matchResult?.ingredientString ?? ""}
          close={close}
        />
      </Modal>
    </>
  );
}
