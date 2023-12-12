"use client";

import { useEffect, useRef, useState } from "react";
import { StandardButton } from "../_components/standardComponents/styledcomponents";
import { $Ingredient } from "@/dbschema/edgeql-js/modules/default";
import DietDisplay from "../_components/standardComponents/diet";
import { createIngredient } from "./actions";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
  status: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="text-white bg-slate-500 hover:bg-slate-600 disabled:bg-slate-800  p-3 basis-1/2"
    >
      Create
    </button>
  );
}

export default function CreateIngredientDialog(props: {
  isOpen: boolean;
  input: string;
  close: () => void;
}) {
  const [newIngredientName, setNewIngredientName] = useState(props.input);
  const [diet, setDiet] = useState("Vegan");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    setDiet("Vegan");
    setNewIngredientName(props.input);
  }, [props.isOpen, props.input]);

  const handleKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key == "Escape") {
      e.preventDefault;
      props.close();
    }
  };

  const [state, formAction] = useFormState(createIngredient, initialState);

  useEffect(() => {
    if (state.status == "Success") {
      (
        document.getElementById("create-ingredient-form") as HTMLFormElement
      )?.reset();
      state.status = "";
      state.message = "";
      props.close();
    }
  }, [state, props]);

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
        <form
          id="create-ingredient-form"
          action={formAction}
          className="relative w-full mx-auto bg-white rounded p-10 flex flex-col"
        >
          <h1 className="mb-5 text-4xl">Create new Ingredient</h1>
          <p className="my-1">Please enter the ingredient name:</p>
          <input
            className="mb-5 border p-2"
            type="text"
            ref={inputRef}
            value={newIngredientName}
            name="ingredientName"
            onChange={(e) => setNewIngredientName(e.target.value)}
          ></input>

          <div>
            <div className="flex justify-between">
              <div className="flex items-center mx-2">
                <input
                  type="radio"
                  id="Vegan"
                  name="diet"
                  value="Vegan"
                  checked={diet === "Vegan"}
                  onChange={(e) => setDiet(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="Vegan" className="ml-2">
                  <DietDisplay diet="Vegan" />
                </label>
              </div>

              <div className="flex items-center mx-2">
                <input
                  type="radio"
                  id="Vegetarian"
                  name="diet"
                  value="Vegetarian"
                  checked={diet === "Vegetarian"}
                  onChange={(e) => setDiet(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="Vegetarian" className="ml-2">
                  <DietDisplay diet="Vegetarian" />
                </label>
              </div>

              <div className="flex items-center  mx-2">
                <input
                  type="radio"
                  id="Fish"
                  name="diet"
                  value="Fish"
                  checked={diet === "Fish"}
                  onChange={(e) => setDiet(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="Fish" className="ml-2">
                  <DietDisplay diet="Fish" />
                </label>
              </div>

              <div className="flex items-center mx-2">
                <input
                  type="radio"
                  id="Meat"
                  name="diet"
                  value="Meat"
                  checked={diet === "Meat"}
                  onChange={(e) => setDiet(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="Meat" className="ml-2">
                  <DietDisplay diet="Meat" />
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse mt-12 space-x-5 space-x-reverse">
            <SubmitButton />
            <button
              type="button"
              className="text-white bg-slate-300 hover:bg-slate-400 p-3 basis-1/2"
              onClick={() => props.close()}
            >
              Cancel
            </button>
          </div>
        </form>
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
      <CreateIngredientDialog
        isOpen={dialogOpen}
        input={""}
        close={() => setDialogOpen(false)}
      />
    </>
  );
}
