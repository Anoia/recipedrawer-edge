import { Title, Text, Anchor, Button } from "@mantine/core";
import { Autocomplete } from "@/app/_components/autocomplete";

export default async function CreateRecipe() {
  return (
    <>
      <Title ta="center">
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "blue", to: "green" }}
        >
          Mantine
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup for server side
        rendering, if you want to learn more on Mantine + Next.js integration
        follow{" "}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit page.tsx file.
      </Text>

      <Button className="text-slate-600 bg-red-500">Hello World!</Button>
      <div className="text-green-500 mt-6">Hello</div>
      <Autocomplete />
    </>
  );
}
