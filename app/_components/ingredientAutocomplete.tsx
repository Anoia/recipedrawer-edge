"use client";

import { useState } from "react";
import { Combobox, InputBase, useCombobox } from "@mantine/core";
import { $default } from "@/dbschema/interfaces";
import Ingredient = $default.Ingredient;
import Unit = $default.Unit;

export function IngredientAutocomplete(props: {
  ingredients: Ingredient[];
  units: Unit[];
  onSelectIngredient: (ingredient: Ingredient) => void;
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState("");

  const filteredOptions = props.ingredients.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase().trim()),
  );

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.name} key={item.id}>
      {item.name} - {item.diet}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        console.log(`Option ${val} selected`);
        const selectedOption = props.ingredients.find(
          (item) => item.name === val,
        );
        if (val === "$create") {
          // setData((current) => [...current, search]); // TODO create new ingredient
          console.log("creating new ingredient");
        } else {
          if (selectedOption) {
            props.onSelectIngredient(selectedOption);
            setSearch("");
            combobox.closeDropdown();
          }
        }
      }}
    >
      <Combobox.Target>
        <InputBase
          // rightSection={<Combobox.ClearButton />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={(e) => {
            if (e.target.value === "$create") {
              console.log("creating new ingredient");
            } else {
              combobox.closeDropdown();
              setSearch("");
            }
          }}
          placeholder="Search value"
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={search.length < 2}>
        <Combobox.Options>
          {options}
          {search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
