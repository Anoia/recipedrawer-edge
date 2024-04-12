import { Pill } from "@mantine/core";

const styleForDiet = new Map([
  [
    "Vegan",
    "text-[color:var(--mantine-color-green-6)] border-[color:var(--mantine-color-green-3)]",
  ],
  [
    "Vegetarian",
    "text-[color:var(--mantine-color-yellow-6)] border-[color:var(--mantine-color-yellow-3)]",
  ],
  [
    "Fish",
    "text-[color:var(--mantine-color-blue-6)] border-[color:var(--mantine-color-blue-3)]",
  ],
  [
    "Meat",
    "text-[color:var(--mantine-color-red-6)] border-[color:var(--mantine-color-red-3)]",
  ],
]);

const nameForDiet = new Map([
  ["Vegan", "vegan"],
  ["Vegetarian", "vegetarisch"],
  ["Fish", "fisch"],
  ["Meat", "fleisch"],
]);

interface DietProps {
  diet: string;
  className?: string;
}

export default function DietDisplay({ diet, className = "" }: DietProps) {
  const dietStyle = styleForDiet.get(diet) || "";

  return (
    <Pill variant="contrast" className={`${dietStyle} border`}>
      {nameForDiet.get(diet)}
    </Pill>
  );
}
