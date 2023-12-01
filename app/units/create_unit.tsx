"use client";
import StandardInput, {
  StandardInputLabel,
} from "../_components/standardComponents/styledcomponents";
import { useFormState, useFormStatus } from "react-dom";
import { createUnit } from "./actions";
import { useEffect } from "react";

const initialState = {
  message: "",
  status: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="hover:bg-teal-800 focus:bg-teal-800 bg-teal-700 text-white py-3 px-12"
    >
      Speichern
    </button>
  );
}

export default function CreateUnit() {
  const [state, formAction] = useFormState(createUnit, initialState);

  useEffect(() => {
    if (state.status == "Success") {
      (document.getElementById("theform") as HTMLFormElement)?.reset();
    }
  }, [state]);

  return (
    <form action={formAction} className="flex items-end space-x-5" id="theform">
      <div>
        <StandardInputLabel htmlFor="short_name">Short Name</StandardInputLabel>
        <StandardInput type="text" id="short_name" name="short_name" required />
      </div>

      <div>
        <StandardInputLabel htmlFor="long_name">Long Name</StandardInputLabel>
        <StandardInput type="text" id="long_name" name="long_name" required />
      </div>
      <div>
        <SubmitButton />
      </div>
      <p>{state?.status == "Error" && state?.message}</p>
    </form>
  );
}
