import { Badge } from "@mantine/core";

const colorForDiet = new Map([
  ["Vegan", "teal"],
  ["Vegetarian", "lime"],
  ["Fish", "blue"],
  ["Meat", "red"],
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
  const dietColor = colorForDiet.get(diet) || "";

  return (
    <Badge variant="outline" color={dietColor} className={className}>
      {nameForDiet.get(diet)}
    </Badge>
  );
}
