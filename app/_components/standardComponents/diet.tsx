const styleForDiet = new Map([
  ["Vegan", "text-green-600"],
  ["Vegetarian", "text-lime-500"],
  ["Fish", "text-blue-500"],
  ["Meat", "text-red-500"],
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
  const dietStyle = styleForDiet.get(diet) || "text-gray-500";

  return (
    <span className={`${dietStyle} ${className}`}>{nameForDiet.get(diet)}</span>
  );
}
