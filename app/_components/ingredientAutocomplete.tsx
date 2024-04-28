"use client";

import React, { useState } from "react";
import { Combobox, InputBase, Modal, useCombobox } from "@mantine/core";
import { $default } from "@/dbschema/interfaces";
import Ingredient = $default.Ingredient;
import Unit = $default.Unit;
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import CreateIngredientForm from "@/app/ingredients/createIngredientComponent";

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
              console.log("change");
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
              if (event.currentTarget.value !== "$create") {
                setSearch(event.currentTarget.value);
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
              <Combobox.Option value="$create">
                + Create {search}
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
        <CreateIngredientForm opened={opened} input={search} close={close} />
      </Modal>
    </>
  );
}
