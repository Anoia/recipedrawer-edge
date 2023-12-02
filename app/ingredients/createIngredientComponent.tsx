"use client";

import { useState } from "react";
import { StandardButton } from "../_components/standardComponents/styledcomponents";
import { $Ingredient } from "@/dbschema/edgeql-js/modules/default";

export default function CreateIngredient(props: {
  isOpen: boolean;
  input: string;
  close: () => void;
  created: (i: $Ingredient) => void;
}) {
  const [diet, setDiet] = useState("vegan");

  const handleKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key == "Escape") {
      e.preventDefault;
      props.close();
    }
    if (e.key == "Enter") {
      e.preventDefault;
      // TODO  create()
    }
  };

  return (
    <dialog
      open={props.isOpen}
      className="fixed inset-x-0 top-48 z-10 overflow-y-auto p-0 w-1/4 min-w-fit"
      onKeyUp={(e) => handleKey(e)}
      tabIndex={-1}
    >
      <div>
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={() => props.close()}
        />
        Dialog
      </div>
    </dialog>
  );
}

export function CreateIngredientButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <StandardButton onClick={() => setDialogOpen(true)}>
        Neue Zutat
      </StandardButton>
      <CreateIngredient
        isOpen={dialogOpen}
        input={""}
        close={() => setDialogOpen(false)}
        created={(i: $Ingredient) => {
          //   setIngredients((ings) => [i, ...ings])
          console.log(`created ${i}`);
          setDialogOpen(false);
        }}
      />
    </>
  );
}
