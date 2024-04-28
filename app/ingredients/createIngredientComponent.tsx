"use client";

import React, { useEffect, useState } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Modal, Button, TextInput, Radio, Flex } from "@mantine/core";
import DietDisplay from "../_components/standardComponents/diet";
import { createIngredient } from "./actions";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
  status: "",
};

export function SubmitButton(props: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {props.children}
    </Button>
  );
}

export default function CreateIngredientForm(props: {
  opened: boolean;
  input: string;
  close: () => void;
}) {
  console.log(`props.input: ${props.input}`);
  const [newIngredientName, setNewIngredientName] = useState(props.input);
  const [diet, setDiet] = useState("Vegan");

  useEffect(() => {
    setDiet("Vegan");
    setNewIngredientName(props.input);
  }, [props.opened, props.input]);

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
    <>
      <form id="create-ingredient-form" action={formAction}>
        <TextInput
          data-autofocus
          label="Name der Zutat"
          value={newIngredientName}
          name="ingredientName"
          onChange={(e) => setNewIngredientName(e.target.value)}
        ></TextInput>

        <Radio.Group
          mt="sm"
          name="diet"
          label="Wähle die Diät der Zutat:"
          value={diet}
          onChange={setDiet}
        >
          <Flex direction={{ base: "column", sm: "row" }} gap={{ base: "sm" }}>
            <Radio
              value="Vegan"
              label={<DietDisplay diet="Vegan" />}
              classNames={{ label: "pl-1" }}
            />
            <Radio
              value="Vegetarian"
              label={<DietDisplay diet="Vegetarian" />}
              classNames={{ label: "pl-1" }}
            />
            <Radio
              value="Fish"
              label={<DietDisplay diet="Fish" />}
              classNames={{ label: "pl-1" }}
            />
            <Radio
              value="Meat"
              label={<DietDisplay diet="Meat" />}
              classNames={{ label: "pl-1" }}
            />
          </Flex>
        </Radio.Group>
        <div className="flex flex-row-reverse mt-12 space-x-5 space-x-reverse">
          <SubmitButton>Erstellen</SubmitButton>
          <Button variant="outline" type="button" onClick={() => props.close()}>
            Abbrechen
          </Button>
        </div>
      </form>
    </>
  );
}

export function CreateIngredientButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)");
  return (
    <>
      <Button onClick={open}>Neue Zutat</Button>
      <Modal
        fullScreen={isMobile}
        size="auto"
        opened={opened}
        onClose={close}
        title="Neue Zutat anlegen"
      >
        <CreateIngredientForm opened={opened} input={""} close={close} />
      </Modal>
    </>
  );
}
